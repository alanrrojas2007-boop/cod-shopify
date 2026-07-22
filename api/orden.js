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
    total
  } = req.body;

  const qty = Number(cantidad) || 1;
  const telLimpio = String(telefono || '').replace(/\D/g, '');
  const telSinCero = telLimpio.startsWith('0') ? telLimpio.slice(1) : telLimpio;
  const telefonoFinal = telSinCero.startsWith('595') ? `+${telSinCero}` : `+595${telSinCero}`;

  const gpsFinal = gps || `https://maps.google.com/?q=${lat},${lng}`;
  const descTxt = Number(descuento) > 0 ? `\nDescuento aplicado: -${descuento} Gs` : '';

  const nota = `DATOS DEL CLIENTE
Nombre: ${nombre}
Telefono: ${telefonoFinal}
Ciudad: ${ciudad}
Direccion: ${direccion || 'Sin dirección'}
Referencia: ${referencia || 'Sin referencia'}
GPS: ${gpsFinal}${descTxt}`;

  const payload = {
    order: {
      line_items: [
        {
          variant_id: Number(variantId),
          quantity: qty
        }
      ],
      shipping_address: {
        first_name: nombre,
        last_name: '.',
        phone: telefonoFinal,
        city: ciudad,
        address1: direccion || ciudad,
        address2: referencia || '',
        country_code: 'PY'
      },
      financial_status: 'pending',
      tags: 'COD, paga-en-casa',
      note: nota,
      note_attributes: [
        { name: 'Nombre', value: nombre || '' },
        { name: 'Telefono', value: telefonoFinal },
        { name: 'Ciudad', value: ciudad || '' },
        { name: 'Direccion exacta', value: direccion || '' },
        { name: 'Referencia', value: referencia || '' },
        { name: 'GPS', value: gpsFinal }
      ],
      send_receipt: false,
      send_fulfillment_receipt: false
    }
  };

  const r = await fetch(
    `https://${process.env.SHOPIFY_STORE}.myshopify.com/admin/api/2024-01/orders.json`,
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
    try {
      await fetch(process.env.SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_name: data.order.name,
          fecha: new Date().toLocaleString('es-PY'),
          producto: producto || 'Producto',
          cantidad: qty,
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
    }
  }

  return res.status(200).json({
    order_id: data.order.id,
    order_name: data.order.name
  });
}
