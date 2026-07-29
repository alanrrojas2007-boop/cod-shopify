export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const {
      etapa,
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
    } = req.body || {};

    const telLimpio = String(telefono || '').replace(/\D/g, '');
    const telSinCero = telLimpio.startsWith('0') ? telLimpio.slice(1) : telLimpio;
    const telefonoFinal = telSinCero
      ? telSinCero.startsWith('595')
        ? `+${telSinCero}`
        : `+595${telSinCero}`
      : '';

    const gpsFinal = gps || (lat && lng ? `https://maps.google.com/?q=${lat},${lng}` : '');

    if (!telefonoFinal && !nombre && !direccion) {
      return res.status(200).json({ ok: true, skipped: true });
    }

    if (process.env.SHEETS_URL) {
      await fetch(process.env.SHEETS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'FORMULARIO_ABANDONADO',
          estado: etapa || 'datos_parciales',
          order_name: 'ABANDONADO',
          fecha: new Date().toLocaleString('es-PY'),
          producto: producto || 'Producto',
          variantId: variantId || '',
          cantidad: Number(cantidad) || '',
          total: total || '',
          descuento: descuento || 0,
          nombre: nombre || '',
          telefono: telefonoFinal,
          ciudad: ciudad || '',
          direccion: direccion || '',
          referencia: referencia || '',
          gps: gpsFinal
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Lead abandonado error:', e);
    return res.status(500).json({ error: 'No se pudo guardar el lead' });
  }
}
