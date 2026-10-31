export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const {
    nombre,
    telefono,
    ciudad,
    direccion,
    referencia,
    gps,
    lat,
    lng,
    variantId,
    cantidad,
    descuento,
    producto,
    color,
    pack,
    entregaPrioritaria,
    total
  } = req.body;

  const qty = Number(cantidad);
  const packPrices = { 1: 229900, 2: 299900, 3: 389900 };
  const variant = String(variantId || '');
  const allowedVariants = new Set([
    '45391430910087', // WEVV Day & Night System
    '45863304593543', // WEVV Day y Night System Pro
    '46075433255047', // WEVV Day & Night System MAX
    '46327007314055'  // WEVV Day & Night System pro max
  ]);
  if (!Number.isInteger(qty) || !packPrices[qty] || !allowedVariants.has(variant)) {
    return res.status(400).json({ error: 'Pack o producto no válido' });
  }
  const regularPrice = 280000 * qty;
  const packDiscount = regularPrice - packPrices[qty];
  const telLimpio = String(telefono || '').replace(/\D/g, '');
  const telSinCero = telLimpio.startsWith('0') ? telLimpio.slice(1) : telLimpio;
  const telefonoFinal = telSinCero.startsWith('595') ? `+${telSinCero}` : `+595${telSinCero}`;

  const gpsFinal = gps || (lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : '');
  const descTxt = Number(descuento) > 0 ? `\nDescuento aplicado: -${descuento} Gs` : '';
  const colorElegido = String(color || '').trim();
  const packElegido = String(pack || '').trim();
  const colorTxt = colorElegido ? `\nColor elegido: ${colorElegido}` : '';
  const packTxt = packElegido ? `\nPack elegido: ${packElegido}` : '';
  const prioridad = entregaPrioritaria === true;
  const cargoPrioridad = prioridad ? 10000 : 0;
  const prioridadTxt = prioridad ? '\nEntrega prioritaria: +10.000 Gs' : '';

  const nota = `DATOS DEL CLIENTE
Nombre: ${nombre}
Telefono: ${telefonoFinal}
Ciudad: ${ciudad}
Direccion: ${direccion || 'Sin dirección'}
Referencia: ${referencia || 'Sin referencia'}
${gpsFinal ? `GPS: ${gpsFinal}\n` : ''}${packTxt}${colorTxt}${prioridadTxt}${descTxt}`;

  const payload = {
    order: {
      line_items: [
        {
          variant_id: Number(variantId),
          quantity: qty
        }
      ],
      discount_codes: [{
        code: `WEVVPRO${qty}`,
        amount: String(packDiscount),
        type: 'fixed_amount'
      }],
      shipping_address: {
        first_name: nombre,
        last_name: '.',
        phone: telefonoFinal,
        city: ciudad,
        address1: direccion || ciudad,
        address2: referencia || '',
        country_code: 'PY'
      },
      ...(prioridad ? {
        shipping_lines: [{
          title: 'Entrega prioritaria',
          code: 'WEVV_PRIORITARIO',
          price: String(cargoPrioridad)
        }]
      } : {}),
      financial_status: 'pending',
      tags: 'COD, paga-en-casa',
      note: nota,
      note_attributes: [
        { name: 'Nombre', value: nombre || '' },
        { name: 'Telefono', value: telefonoFinal },
        { name: 'Ciudad', value: ciudad || '' },
        { name: 'Direccion exacta', value: direccion || '' },
        { name: 'Referencia', value: referencia || '' },
        { name: 'Pack elegido', value: packElegido },
        { name: 'Color elegido', value: colorElegido },
        { name: 'Entrega prioritaria', value: prioridad ? 'Sí - 10.000 Gs' : 'No' },
        { name: 'GPS', value: gpsFinal }
      ].filter((attr) => String(attr.value || '').trim() !== ''),
      send_receipt: false,
      send_fulfillment_receipt: false
    }
  };

  const r = await fetch(
    `https://${process.env.SHOPIFY_STORE}.myshopify.com/admin/api/2026-07/orders.json`,
    {
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_TOKEN,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }
  );

  const data = await r.json();

  if (!r.ok) {
    console.error('Shopify error:', JSON.stringify(data));
    return res.status(500).json({ error: data.errors });
  }

  if (process.env.SHEETS_URL) {
    const sheetsController = new AbortController();
    const sheetsTimeout = setTimeout(() => sheetsController.abort(), 2500);
    try {
      await fetch(process.env.SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: sheetsController.signal,
        body: JSON.stringify({
          order_name: data.order.name,
          fecha: new Date().toLocaleString('es-PY'),
          producto: producto || 'Producto',
          cantidad: qty,
          pack: packElegido,
          color: colorElegido,
          total: total || '',
          nombre: nombre || '',
          telefono: telefonoFinal,
          ciudad: ciudad || '',
          direccion: direccion || '',
          referencia: referencia || '',
          gps: gpsFinal
        })
      });
    } catch (e) {
      console.error('Sheets error:', e);
    } finally {
      clearTimeout(sheetsTimeout);
    }
  }

  return res.status(200).json({
    order_id: data.order.id,
    order_name: data.order.name
  });
}
