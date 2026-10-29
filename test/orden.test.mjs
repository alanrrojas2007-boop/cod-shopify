import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import handler from '../api/orden.js';

const originalFetch = globalThis.fetch;
const originalStore = process.env.SHOPIFY_STORE;
const originalToken = process.env.SHOPIFY_TOKEN;
const originalSheets = process.env.SHEETS_URL;

afterEach(() => {
  globalThis.fetch = originalFetch;
  if (originalStore === undefined) delete process.env.SHOPIFY_STORE;
  else process.env.SHOPIFY_STORE = originalStore;
  if (originalToken === undefined) delete process.env.SHOPIFY_TOKEN;
  else process.env.SHOPIFY_TOKEN = originalToken;
  if (originalSheets === undefined) delete process.env.SHEETS_URL;
  else process.env.SHEETS_URL = originalSheets;
});

function response() {
  return {
    headers: {},
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.statusCode = code; return this; },
    json(data) { this.body = data; return this; },
    end() { return this; }
  };
}

for (const [qty, expectedPrice] of [[1, 229900], [2, 299900], [3, 389900]]) {
  test(`pedido COD de ${qty} unidades descuenta hasta ${expectedPrice} Gs`, async () => {
    process.env.SHOPIFY_STORE = 'test-store';
    process.env.SHOPIFY_TOKEN = 'test-token';
    delete process.env.SHEETS_URL;
    let order;
    globalThis.fetch = async (_url, options) => {
      order = JSON.parse(options.body).order;
      return { ok: true, json: async () => ({ order: { id: 7, name: '#7' } }) };
    };
    const res = response();
    await handler({ method: 'POST', body: {
      nombre: 'Cliente Prueba', telefono: '0981000000', ciudad: 'Luque',
      direccion: 'Calle 123', variantId: '46327007314055', cantidad: qty,
      color: 'Rojo', entregaPrioritaria: true
    } }, res);
    assert.equal(res.statusCode, 200);
    assert.equal(order.line_items[0].quantity, qty);
    assert.equal(order.discount_codes[0].code, `WEVVPRO${qty}`);
    assert.equal(order.discount_codes[0].type, 'fixed_amount');
    assert.equal(Number(order.discount_codes[0].amount), 280000 * qty - expectedPrice);
    assert.equal(Number(order.shipping_lines[0].price), 10000);
    assert.equal(order.shipping_address.phone, '+595981000000');
    assert.doesNotMatch(order.note, /maps\.google\.com\/\?q=,/);
  });
}

test('rechaza cantidades fuera de los packs antes de llamar Shopify', async () => {
  let called = false;
  globalThis.fetch = async () => { called = true; };
  const res = response();
  await handler({ method: 'POST', body: { variantId: '46327007314055', cantidad: 4 } }, res);
  assert.equal(res.statusCode, 400);
  assert.equal(called, false);
});

test('rechaza variantes ajenas al formulario', async () => {
  let called = false;
  globalThis.fetch = async () => { called = true; };
  const res = response();
  await handler({ method: 'POST', body: { variantId: '123456789', cantidad: 1 } }, res);
  assert.equal(res.statusCode, 400);
  assert.equal(called, false);
});

test('conserva el código del producto anterior', async () => {
  process.env.SHOPIFY_STORE = 'test-store';
  process.env.SHOPIFY_TOKEN = 'test-token';
  delete process.env.SHEETS_URL;
  let order;
  globalThis.fetch = async (_url, options) => {
    order = JSON.parse(options.body).order;
    return { ok: true, json: async () => ({ order: { id: 8, name: '#8' } }) };
  };
  const res = response();
  await handler({ method: 'POST', body: { variantId: '45391430910087', cantidad: 1 } }, res);
  assert.equal(res.statusCode, 200);
  assert.equal(order.discount_codes[0].code, 'WEVVPACK1');
});
