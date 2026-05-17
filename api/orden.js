export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { nombre, telefono, ciudad, lat, lng, variantId, cantidad, descuento } = req.body;
  const qty = Number(cantidad) || 1;
  const notaDescuento = descuento > 0 ? ` | Descuento: -${descuento} Gs` : '';

  const payload = {
    order: {
      line_items: [{ variant_id: Number(variantId), quantity: qty }],
      shipping_address: {
        first_name: nombre,
        phone: '+595' + telefono,
        city: ciudad,
        address1: 'Ver coordenadas GPS en notas',
        country_code: 'PY'
      },
      financial_status: 'pending',
      tags: 'COD, paga-en-casa',
      note: `GPS: https://maps.google.com/?q=${lat},${lng}${notaDescuento}`,
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
    console.error("Shopify error:", JSON.stringify(data));
    return res.status(500).json({ error: data.errors });
  }

  return res.status(200).json({ order_id: data.order.id, order_name: data.order.name });
}
