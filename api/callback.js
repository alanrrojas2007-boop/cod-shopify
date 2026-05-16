export default async function handler(req, res) {
  const { code, shop } = req.query;
  if (!code || !shop) return res.status(400).send('Error');

  const r = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.SHOPIFY_CLIENT_ID,
      client_secret: process.env.SHOPIFY_CLIENT_SECRET,
      code
    })
  });

  const data = await r.json();

  res.send(`
    <h2>Copiá este token y guardalo en un bloc de notas:</h2>
    <p style="font-size:18px; background:#eee; padding:12px; word-break:break-all">
      ${data.access_token}
    </p>
  `);
}
