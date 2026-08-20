export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metodo no permitido' });

  try {
    const body = req.body || {};
    const qty = Math.max(1, Number(body.cantidad) || 1);
    const variantId = Number(body.variantId);
    const requestedDiscount = Math.max(0, Math.round(Number(body.descuento) || 0));

    if (!variantId) return res.status(400).json({ error: 'Falta variantId' });
    if (!process.env.SHOPIFY_STORE || !process.env.SHOPIFY_TOKEN) {
      return res.status(500).json({ error: 'Faltan variables SHOPIFY_STORE o SHOPIFY_TOKEN en Vercel' });
    }

    const nombre = String(body.nombre || 'Cliente').trim();
    const telefonoRaw = String(body.telefono || '').replace(/\D/g, '');
    const telSinCero = telefonoRaw.startsWith('0') ? telefonoRaw.slice(1) : telefonoRaw;
    const telefono = telSinCero.startsWith('595') ? `+${telSinCero}` : `+595${telSinCero}`;
    const ciudad = String(body.ciudad || '').trim();
    const direccion = String(body.direccion || ciudad || '').trim();
    const referencia = String(body.referencia || '').trim();
    const producto = String(body.producto || 'Producto').trim();
    const lat = body.lat || '';
    const lng = body.lng || '';
    const gps = lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : String(body.gps || '');
    const detalle = Array.isArray(body.descuentosDetalle) ? body.descuentosDetalle : [];
    const detalleTxt = detalle.length ? detalle.map((d) => `${d.nombre}: -${d.monto} Gs`).join('\n') : '';

    const nota = `DATOS DEL CLIENTE
Nombre: ${nombre}
Telefono: ${telefono}
Ciudad: ${ciudad}
Direccion: ${direccion}
Referencia: ${referencia}
GPS: ${gps}
Forma de pago: Pago online con Pagopar
Producto: ${producto}
Cantidad: ${qty}
Descuento real aplicado: -${requestedDiscount} Gs${detalleTxt ? `\n${detalleTxt}` : ''}`;

    const draftOrder = {
      line_items: [{ variant_id: variantId, quantity: qty }],
      shipping_address: {
        first_name: nombre,
        last_name: '.',
        phone: telefono,
        city: ciudad,
        address1: direccion,
        address2: referencia,
        country_code: 'PY'
      },
      billing_address: {
        first_name: nombre,
        last_name: '.',
        phone: telefono,
        city: ciudad,
        address1: direccion,
        address2: referencia,
        country_code: 'PY'
      },
      tags: 'pago-online, pagopar, formulario',
      note: nota,
      note_attributes: [
        { name: 'Nombre', value: nombre },
        { name: 'Telefono', value: telefono },
        { name: 'Ciudad', value: ciudad },
        { name: 'Direccion', value: direccion },
        { name: 'Referencia', value: referencia },
        { name: 'GPS', value: gps },
        { name: 'Forma de pago', value: 'Pago online con Pagopar' },
        { name: 'Descuento real', value: `-${requestedDiscount} Gs` },
        { name: 'Total formulario', value: String(body.total || '') }
      ]
    };

    if (requestedDiscount > 0) {
      draftOrder.applied_discount = {
        title: 'Descuento formulario',
        description: detalleTxt || 'Pack, cupon o premio aplicado desde el formulario',
        value_type: 'fixed_amount',
        value: String(requestedDiscount),
        amount: String(requestedDiscount)
      };
    }

    const shop = String(process.env.SHOPIFY_STORE).replace(/^https?:\/\//, '').replace(/\.myshopify\.com$/, '');
    const apiVersion = process.env.SHOPIFY_API_VERSION || '2024-01';
    const r = await fetch(`https://${shop}.myshopify.com/admin/api/${apiVersion}/draft_orders.json`, {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ draft_order: draftOrder })
    });

    const data = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('Shopify draft order error:', JSON.stringify(data));
      return res.status(500).json({ error: data.errors || data.error || data });
    }

    const draft = data.draft_order || {};
    if (!draft.invoice_url) {
      return res.status(500).json({ error: 'Shopify no devolvio invoice_url', draft_order_id: draft.id || '' });
    }

    if (process.env.SHEETS_URL) {
      try {
        await fetch(process.env.SHEETS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            order_name: draft.name || '',
            fecha: new Date().toLocaleString('es-PY'),
            producto,
            cantidad: qty,
            total: body.total || draft.total_price || '',
            nombre,
            telefono,
            ciudad,
            forma_pago: 'Pago online con Pagopar',
            link_pago: draft.invoice_url,
            confirmado: 'link_pago_generado'
          })
        });
      } catch (e) {
        console.error('Sheets error:', e);
      }
    }

    return res.status(200).json({
      draft_order_id: draft.id,
      draft_order_name: draft.name,
      invoice_url: draft.invoice_url,
      total: draft.total_price
    });
  } catch (e) {
    console.error('Pago online error:', e);
    return res.status(500).json({ error: e.message || 'No se pudo crear el link de pago' });
  }
}
