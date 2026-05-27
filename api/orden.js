export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { nombre, telefono, ciudad, lat, lng, variantId, cantidad, descuento, producto, total } = req.body;
  const qty = Number(cantidad) || 1;
  const descTxt = descuento > 0 ? `\nDescuento aplicado: -${descuento} Gs` : '';

  const nota = `DATOS DEL CLIENTE
Nombre: ${nombre}
Telefono: +595${telefono}
Ciudad: ${ciudad}
GPS: https://maps.google.com/?q=${lat},${lng}${descTxt}`;

  const payload = {
    order: {
      line_items: [{ variant_id: Number(variantId), quantity: qty }],
      shipping_address: {
        first_name: nombre,
        last_name: '.',
        phone: '+595' + telefono,
        city: ciudad,
        address1: ciudad,
        country_code: 'PY'
      },
      financial_status: 'pending',
      tags: 'COD, paga-en-casa',
      note: nota,
      note_attributes: [
        { name: 'Nombre', value: nombre },
        { name: 'Telefono', value: '+595' + telefono },
        { name: 'Ciudad', value: ciudad },
        { name: 'GPS', value: `https://maps.google.com/?q=${lat},${lng}` }
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

  // Enviar a Google Sheets
  try {
    await fetch('https://script.google.com/macros/s/AKfycbyH27fNwHFaa0yl9KTmLPFryPUCrqydT9Q-rH3bh6ytsZdlZv5lAgQ3qA8Ma1TNq75c/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_name: data.order.name,
        fecha: new Date().toLocaleString('es-PY'),
        producto: producto || 'Producto',
        cantidad: qty,
        total: total || '',
        nombre: nombre,
        telefono: '+595' + telefono,
        ciudad: ciudad
      })
    });
  } catch(e) {
    console.error('Sheets error:', e);
  }

  return res.status(200).json({ order_id: data.order.id, order_name: data.order.name });
}
