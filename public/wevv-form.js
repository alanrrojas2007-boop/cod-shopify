(function(){
  if (window.__wevvExternalFormLoaded) return;
  window.__wevvExternalFormLoaded = true;

  var html = "<div id=\"wevvTopBanner\" role=\"status\" aria-live=\"polite\">\r\n  <span class=\"wevv-fire-mark\" aria-hidden=\"true\"></span>\r\n  <span>Oferta termina en:</span>\r\n  <strong><span id=\"wevvTopTime\">05:00</span></strong>\r\n</div>\r\n\r\n<div id=\"wevvExitOverlay\">\r\n  <div class=\"wevv-exit-card\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"wevvExitTitle\">\r\n    <button class=\"wevv-close\" type=\"button\" onclick=\"wevvCloseModalAndOffer()\" aria-label=\"Salir sin descuento\">&times;</button>\r\n    <span class=\"wevv-pill light\">Descuento disponible</span>\r\n    <h2 id=\"wevvExitTitle\">Antes de salir, te dejamos 10.000 Gs menos</h2>\r\n    <p>Aplicalo ahora y terminá tu pedido con pago al recibir. No necesitás tarjeta.</p>\r\n    <div class=\"wevv-discount\">\r\n      <strong>10.000 Gs</strong>\r\n      <span>descuento extra automático en este pedido</span>\r\n    </div>\r\n    <button class=\"wevv-primary-btn\" type=\"button\" onclick=\"wevvApplyExitDiscount()\">Aplicar descuento y seguir</button>\r\n    <button class=\"wevv-secondary-btn\" type=\"button\" onclick=\"wevvCloseModalAndOffer()\">Salir sin descuento</button>\r\n  </div>\r\n</div>\r\n\r\n<div id=\"wevvModal\">\r\n  <div class=\"wevv-sheet\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"wevvModalTitle\">\r\n    <button class=\"wevv-close\" type=\"button\" onclick=\"wevvShowExitOffer()\" aria-label=\"Cerrar\">&times;</button>\r\n\r\n    <div class=\"wevv-header\">\r\n      <div class=\"wevv-header-row\">\r\n        <span class=\"wevv-pill\">Sin tarjeta</span>\r\n        <span class=\"wevv-pill\">Reserva <strong id=\"wevvModalTime\">05:00</strong></span>\r\n      </div>\r\n      <h2 id=\"wevvModalTitle\">Pedí ahora y pagá al recibir</h2>\r\n      <p>Completá tus datos reales. El pedido se confirma por WhatsApp.</p>\r\n    </div>\r\n\r\n    <div class=\"wevv-benefits\" aria-label=\"Beneficios del pedido\">\r\n      <div class=\"wevv-benefit\"><span class=\"wevv-checkmark\">✓</span>Envío gratis</div>\r\n      <div class=\"wevv-benefit\"><span class=\"wevv-checkmark\">✓</span>Pago al recibir</div>\r\n      <div class=\"wevv-benefit\"><span class=\"wevv-checkmark\">✓</span>Garantía 30 días</div>\r\n      <div class=\"wevv-benefit\"><span class=\"wevv-checkmark\">✓</span>WhatsApp real</div>\r\n    </div>\r\n\r\n    <div class=\"wevv-content\">\r\n      <section class=\"wevv-card\">\r\n        <div class=\"wevv-card-head\">\r\n          <h3>Elegí tu pack</h3>\r\n          <span>2 unidades es el más pedido</span>\r\n        </div>\r\n\r\n        <div class=\"wevv-pack-list\">\r\n          <button class=\"wevv-qty-card\" type=\"button\" data-qty=\"1\" data-pct=\"22\" onclick=\"wevvSelectQty(this)\">\r\n            <span class=\"wevv-pack-main\">\r\n              <span class=\"wevv-pack-title\"><strong>1 unidad</strong><span>22% OFF</span></span>\r\n              <span class=\"wevv-pack-sub\">Para probar</span>\r\n            </span>\r\n            <strong id=\"wevvPrice1\" class=\"wevv-pack-price\">-</strong>\r\n          </button>\r\n\r\n          <button class=\"wevv-qty-card selected\" type=\"button\" data-qty=\"2\" data-pct=\"29\" onclick=\"wevvSelectQty(this)\">\r\n            <span class=\"wevv-pack-main\">\r\n              <span class=\"wevv-pack-title\"><strong>2 unidades</strong><span>29% OFF</span></span>\r\n              <span class=\"wevv-pack-sub\">Más elegido</span>\r\n            </span>\r\n            <strong id=\"wevvPrice2\" class=\"wevv-pack-price\">-</strong>\r\n          </button>\r\n\r\n          <button class=\"wevv-qty-card\" type=\"button\" data-qty=\"3\" data-pct=\"37\" onclick=\"wevvSelectQty(this)\">\r\n            <span class=\"wevv-pack-main\">\r\n              <span class=\"wevv-pack-title\"><strong>3 unidades</strong><span>37% OFF</span></span>\r\n              <span class=\"wevv-pack-sub\">Mayor ahorro</span>\r\n            </span>\r\n            <strong id=\"wevvPrice3\" class=\"wevv-pack-price\">-</strong>\r\n          </button>\r\n        </div>\r\n        <div id=\"wevvSaving\"></div>\r\n      </section>\r\n\r\n      <section class=\"wevv-card\">\r\n        <div class=\"wevv-card-head\">\r\n          <h3>Datos de entrega</h3>\r\n          <span>Usá WhatsApp activo</span>\r\n        </div>\r\n\r\n        <div class=\"wevv-form-grid\">\r\n          <div class=\"wevv-field\">\r\n            <label for=\"wevvNombre\">Nombre</label>\r\n            <input id=\"wevvNombre\" type=\"text\" placeholder=\"Juan\" autocomplete=\"given-name\">\r\n          </div>\r\n\r\n          <div class=\"wevv-field\">\r\n            <label for=\"wevvApellido\">Apellido</label>\r\n            <input id=\"wevvApellido\" type=\"text\" placeholder=\"Pérez\" autocomplete=\"family-name\">\r\n          </div>\r\n\r\n          <div class=\"wevv-field full\">\r\n            <label for=\"wevvTelefono\">WhatsApp</label>\r\n            <input id=\"wevvTelefono\" type=\"tel\" inputmode=\"numeric\" placeholder=\"0981 000 000\" autocomplete=\"tel\">\r\n          </div>\r\n\r\n          <div class=\"wevv-field\">\r\n            <label for=\"wevvDepartamento\">Departamento</label>\r\n            <div class=\"wevv-select-wrap\">\r\n              <select id=\"wevvDepartamento\" onchange=\"wevvSelectDpto(this.value)\">\r\n                <option value=\"\">Elegí</option>\r\n                <option value=\"ALTO PARANA\">Alto Paraná</option>\r\n                <option value=\"CENTRAL\">Central</option>\r\n                <option value=\"ASUNCION\">Asunción</option>\r\n                <option value=\"CAAGUAZU\">Caaguazú</option>\r\n                <option value=\"ITAPUA\">Itapúa</option>\r\n                <option value=\"AMAMBAY\">Amambay</option>\r\n              </select>\r\n              <span class=\"wevv-select-arrow\">v</span>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"wevv-field\">\r\n            <label for=\"wevvCiudad\">Ciudad</label>\r\n            <div class=\"wevv-select-wrap\">\r\n              <select id=\"wevvCiudad\" disabled>\r\n                <option value=\"\">Primero dpto.</option>\r\n              </select>\r\n              <span class=\"wevv-select-arrow\">v</span>\r\n            </div>\r\n          </div>\r\n\r\n          <div class=\"wevv-field full\">\r\n            <label for=\"wevvDireccion\">Dirección exacta</label>\r\n            <input id=\"wevvDireccion\" type=\"text\" placeholder=\"Calle, número, barrio o zona\" autocomplete=\"street-address\" onblur=\"wevvSearchAddr()\" onkeydown=\"if(event.key==='Enter'){event.preventDefault();wevvSearchAddr();}\">\r\n          </div>\r\n\r\n          <div class=\"wevv-field full\">\r\n            <label for=\"wevvReferencia\">Referencia</label>\r\n            <input id=\"wevvReferencia\" type=\"text\" placeholder=\"Casa azul, portón negro, frente al súper\">\r\n          </div>\r\n        </div>\r\n      </section>\r\n\r\n      <section class=\"wevv-card\">\r\n        <div class=\"wevv-card-head\">\r\n          <h3>Punto de entrega</h3>\r\n          <span>Confirmá el pin</span>\r\n        </div>\r\n        <div class=\"wevv-map-note\">\r\n          <strong>Ayudanos a llegar sin errores</strong>\r\n          Si el pin no queda exacto, tocá el mapa o arrastralo hasta tu ubicación.\r\n        </div>\r\n        <div id=\"wevvMap\"></div>\r\n        <div id=\"wevvMapAddr\"></div>\r\n      </section>\r\n\r\n      <section class=\"wevv-card\">\r\n        <div class=\"wevv-card-head\">\r\n          <h3>Confirmación</h3>\r\n          <span>Filtra pedidos falsos</span>\r\n        </div>\r\n\r\n        <label class=\"wevv-label\" style=\"display:block;margin-bottom:8px;\">Factura</label>\r\n        <div class=\"wevv-choice-row\">\r\n          <button id=\"wevvFactNo\" class=\"wevv-choice active\" type=\"button\" onclick=\"wevvSetFactura(false)\">Sin factura</button>\r\n          <button id=\"wevvFactSi\" class=\"wevv-choice\" type=\"button\" onclick=\"wevvSetFactura(true)\">Con factura</button>\r\n        </div>\r\n\r\n        <div id=\"wevvFacturaFields\">\r\n          <div class=\"wevv-field\">\r\n            <label for=\"wevvRuc\">RUC</label>\r\n            <input id=\"wevvRuc\" type=\"text\" placeholder=\"12345678-9\">\r\n          </div>\r\n          <div class=\"wevv-field\">\r\n            <label for=\"wevvRazon\">Razón social o nombre</label>\r\n            <input id=\"wevvRazon\" type=\"text\" placeholder=\"Nombre para la factura\">\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"wevv-confirm-box\">\r\n          <p>Como el pedido se prepara antes del cobro, necesitamos confirmar que los datos son reales.</p>\r\n          <label class=\"wevv-checkline\" for=\"wevvCompCheck\">\r\n            <input id=\"wevvCompCheck\" type=\"checkbox\" onchange=\"wevvSetCompromiso(this.checked)\">\r\n            <span>\r\n              <strong>Confirmo que quiero recibir este pedido y que mis datos son correctos.</strong>\r\n              <span>Después se abrirá WhatsApp con el mensaje listo.</span>\r\n            </span>\r\n          </label>\r\n        </div>\r\n      </section>\r\n    </div>\r\n\r\n    <div class=\"wevv-footer\">\r\n      <div class=\"wevv-footer-row\">\r\n        <div class=\"wevv-total-meta\">\r\n          <span>Total al recibir</span>\r\n          <span id=\"wevvDiscountRow\">Descuento extra aplicado</span>\r\n          <span id=\"wevvTotalOriginal\">-</span>\r\n        </div>\r\n        <strong id=\"wevvTotalFinal\">-</strong>\r\n      </div>\r\n      <button id=\"wevvSubmitBtn\" type=\"button\" onclick=\"wevvSubmit()\">\r\n        Confirmar por WhatsApp\r\n        <small>pedido con pago al recibir</small>\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"wevv-open-wrap\">\r\n  <button class=\"wevv-open-btn\" type=\"button\" onclick=\"wevvOpenModal()\" aria-label=\"Pagar al recibir, pedir ahora\">\r\n    <span class=\"wevv-open-icon\" aria-hidden=\"true\">\r\n      <svg viewBox=\"0 0 24 24\" fill=\"none\">\r\n        <path d=\"M6 7h12l-1 13H7L6 7Z\"></path>\r\n        <path d=\"M9 7a3 3 0 0 1 6 0\"></path>\r\n        <path d=\"M9 11h6\"></path>\r\n      </svg>\r\n    </span>\r\n    <span>\r\n      <span class=\"wevv-open-copy\">Pagar al recibir - pedir ahora</span>\r\n      <small>sin tarjeta, confirmación por WhatsApp</small>\r\n    </span>\r\n  </button>\r\n</div>";

  function injectWevvHtml() {
    if (document.getElementById('wevvModal')) return;
    var mount = document.createElement('div');
    mount.id = 'wevvExternalMount';
    mount.innerHTML = html;
    var target = document.currentScript && document.currentScript.parentNode ? document.currentScript.parentNode : document.body;
    target.appendChild(mount);
  }

  function initWevvForm() {
    (function() {
  var WHATSAPP = "595973321479";
  var VERCEL = "https://cod-shopify-ochre.vercel.app/api/orden";
  var EXIT_DESCUENTO = 10000;
  var selectedQty = 2;
  var selectedPct = 29;
  var discountApplied = false;
  var exitShown = false;
  var needsInvoice = false;
  var compromisoAceptado = false;
  var map, marker, currentLat = -25.2867, currentLng = -57.647;
  var timerInterval = null;
  var timerSeconds = 300;
  var locationChanged = false;
  var basePrice = window.wevvBasePrice || 0;
  var orderConfirmed = false;

  var CIUDADES = {
    'ALTO PARANA': [
      'Ciudad del Este','Hernandarias','Presidente Franco','Minga Guazú',
      'Minga Porã','Santa Rita','San Alberto','Naranjal','Los Cedrales',
      'Itakyry','Juan E. O\'Leary','Ñacunday','Yguazú','Santa Rosa del Monday',
      'Iruña','Dr. Juan León Mallorquín'
    ],
    'CENTRAL': [
      'Fernando de la Mora','San Lorenzo','Lambaré','Luque','Capiatá',
      'Mariano Roque Alonso','Limpio','Areguá','Ypané','Villa Elisa',
      'Ñemby','Itauguá','Guarambaré','San Antonio','Villeta',
      'Nueva Italia','Ypacaraí','J. Augusto Saldívar','Tobatí'
    ],
    'ASUNCION': ['Asunción'],
    'CAAGUAZU': [
      'Coronel Oviedo','Caaguazú','Yhú','Vaquería','Repatriación',
      'José Domingo Ocampos','San Joaquín','Nueva Londres','Mbutuy',
      'Simón Bolívar','3 de Febrero','Raúl Arsenio Oviedo',
      'Dr. Juan Manuel Frutos','La Pastora','Tembiapora'
    ],
    'ITAPUA': [
      'Encarnación','Coronel Bogado','Hohenau','Bella Vista','Obligado',
      'San Juan del Paraná','Capitán Miranda','Cambyretá','Carmen del Paraná',
      'Carlos Antonio López','Fram','Jesús','Trinidad','La Paz',
      'Mayor Otaño','Natalio','Pirapó','San Cosme y Damián',
      'San Pedro del Paraná','San Rafael del Paraná','Edelira',
      'Nueva Alborada','Tomás Romero Pereira'
    ],
    'AMAMBAY': [
      'Pedro Juan Caballero','Bella Vista Norte','Capitán Bado',
      'Zanja Pytã','Karapaí'
    ]
  };

  function setActive(el, active) {
    if (!el) return;
    if (active) el.classList.add('active');
    else el.classList.remove('active');
  }

  function focusWithAlert(id, message) {
    alert(message);
    var el = document.getElementById(id);
    if (el) {
      el.focus();
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function formatGs(n) {
    return Math.max(0, Math.round(n)).toLocaleString('es-PY') + ' Gs';
  }

  function calcPrice(qty, pct) {
    return basePrice * qty * (1 - pct / 100);
  }

  function updatePrices() {
    var cards = [
      {qty:1,pct:22,el:'wevvPrice1'},
      {qty:2,pct:29,el:'wevvPrice2'},
      {qty:3,pct:37,el:'wevvPrice3'}
    ];

    cards.forEach(function(c) {
      var el = document.getElementById(c.el);
      if (el) el.textContent = basePrice > 0 ? formatGs(calcPrice(c.qty, c.pct)) : '-';
    });

    var subtotal = calcPrice(selectedQty, selectedPct);
    var originalTotal = basePrice * selectedQty;
    var saving = originalTotal - subtotal;
    var finalTotal = subtotal - (discountApplied ? EXIT_DESCUENTO : 0);

    var savingEl = document.getElementById('wevvSaving');
    if (savingEl) savingEl.textContent = basePrice > 0 ? 'Ahorrás ' + formatGs(saving) + ' con este pack' : '';

    var origEl = document.getElementById('wevvTotalOriginal');
    if (origEl) origEl.textContent = basePrice > 0 ? formatGs(originalTotal) : '-';

    var finalEl = document.getElementById('wevvTotalFinal');
    if (finalEl) finalEl.textContent = basePrice > 0 ? formatGs(finalTotal) : '-';

    var dRow = document.getElementById('wevvDiscountRow');
    if (dRow) dRow.style.display = discountApplied ? 'block' : 'none';
  }

  window.wevvSelectDpto = function(dpto) {
    var sel = document.getElementById('wevvCiudad');
    sel.innerHTML = '<option value="">Ciudad</option>';

    if (!dpto || !CIUDADES[dpto]) {
      sel.disabled = true;
      sel.style.background = '#f6f8fb';
      sel.style.color = '#98a2b3';
      sel.style.cursor = 'not-allowed';
      return;
    }

    CIUDADES[dpto].forEach(function(c) {
      var opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      sel.appendChild(opt);
    });

    sel.disabled = false;
    sel.style.background = '#fff';
    sel.style.color = '#111827';
    sel.style.cursor = 'pointer';
  };

  window.wevvSelectQty = function(el) {
    selectedQty = parseInt(el.getAttribute('data-qty'), 10);
    selectedPct = parseInt(el.getAttribute('data-pct'), 10);

    document.querySelectorAll('.wevv-qty-card').forEach(function(c) {
      c.classList.remove('selected');
    });

    el.classList.add('selected');
    updatePrices();
  };

  window.wevvSetFactura = function(val) {
    needsInvoice = val;

    var fields = document.getElementById('wevvFacturaFields');
    var btnNo = document.getElementById('wevvFactNo');
    var btnSi = document.getElementById('wevvFactSi');

    if (fields) fields.style.display = val ? 'flex' : 'none';

    setActive(btnNo, !val);
    setActive(btnSi, val);
  };

  window.wevvSetCompromiso = function(val) {
    compromisoAceptado = !!val;

    var check = document.getElementById('wevvCompCheck');
    if (check) check.checked = compromisoAceptado;
  };

  window.wevvShowExitOffer = function() {
    if (discountApplied) {
      document.getElementById('wevvModal').style.display = 'none';
      document.body.style.overflow = '';
      return;
    }

    document.getElementById('wevvExitOverlay').style.display = 'flex';
  };

  window.wevvCloseModalAndOffer = function() {
    document.getElementById('wevvExitOverlay').style.display = 'none';
    document.getElementById('wevvModal').style.display = 'none';
    document.body.style.overflow = '';
  };

  window.wevvApplyExitDiscount = function() {
    discountApplied = true;
    document.getElementById('wevvExitOverlay').style.display = 'none';
    updatePrices();
    wevvOpenModal();
  };

  function startTimer() {
    if (timerInterval) return;

    timerInterval = setInterval(function() {
      timerSeconds--;

      if (timerSeconds < 0) timerSeconds = 0;

      var m = Math.floor(timerSeconds / 60);
      var s = timerSeconds % 60;
      var str = (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;

      var t1 = document.getElementById('wevvTopTime');
      var t2 = document.getElementById('wevvModalTime');

      if (t1) t1.textContent = str;
      if (t2) t2.textContent = str;

      if (timerSeconds <= 60) {
        if (t1) t1.classList.add('wevv-timer-pulse');
        if (t2) t2.classList.add('wevv-timer-pulse');
      }

      if (timerSeconds === 0) clearInterval(timerInterval);
    }, 1000);
  }

  function initMap() {
    if (map) return;

    map = L.map('wevvMap').setView([currentLat, currentLng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(map);

    marker = L.marker([currentLat, currentLng], {
      draggable: true
    }).addTo(map);

    marker.on('dragend', function(e) {
      var pos = e.target.getLatLng();
      currentLat = pos.lat;
      currentLng = pos.lng;
      locationChanged = true;
      reverseGeocode(currentLat, currentLng);
    });

    map.on('click', function(e) {
      currentLat = e.latlng.lat;
      currentLng = e.latlng.lng;
      locationChanged = true;
      marker.setLatLng(e.latlng);
      reverseGeocode(currentLat, currentLng);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        currentLat = pos.coords.latitude;
        currentLng = pos.coords.longitude;
        map.setView([currentLat, currentLng], 15);
        marker.setLatLng([currentLat, currentLng]);
        locationChanged = true;
        reverseGeocode(currentLat, currentLng);
      });
    }
  }

  function reverseGeocode(lat, lng) {
    var addrEl = document.getElementById('wevvMapAddr');
    if (addrEl) addrEl.textContent = 'Buscando dirección...';

    fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + lng)
      .then(function(r) {
        return r.json();
      })
      .then(function(d) {
        if (addrEl) {
          addrEl.textContent = d.display_name ? 'Ubicación marcada: ' + d.display_name : 'Ubicación marcada';
        }
      })
      .catch(function() {
        if (addrEl) addrEl.textContent = 'Ubicación marcada en el mapa';
      });
  }

  window.wevvOpenModal = function() {
    document.getElementById('wevvModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (typeof fbq !== 'undefined') {
      fbq('track', 'InitiateCheckout', {
        content_ids: [String(window.wevvVariantId)],
        content_type: 'product',
        currency: 'PYG',
        value: basePrice
      });
    }

    if (typeof ttq !== 'undefined') {
      ttq.track('InitiateCheckout', {
        value: basePrice,
        currency: 'PYG'
      });
    }

    setTimeout(function() {
      initMap();
      setTimeout(function() {
        if (map) map.invalidateSize();
      }, 300);
    }, 100);

    updatePrices();

    var selectedCard = document.querySelector('.wevv-qty-card[data-qty="' + selectedQty + '"]');
    if (selectedCard) {
      document.querySelectorAll('.wevv-qty-card').forEach(function(c) {
        c.classList.remove('selected');
      });
      selectedCard.classList.add('selected');
    }
  };

  document.getElementById('wevvModal').addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
      document.body.style.overflow = '';
    }
  });

  window.wevvSearchAddr = function() {
    var q = document.getElementById('wevvDireccion').value.trim();
    if (!q || !map) return;

    var addrEl = document.getElementById('wevvMapAddr');
    if (addrEl) addrEl.textContent = 'Buscando ubicación...';

    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(q + ', Paraguay') + '&limit=1')
      .then(function(r) {
        return r.json();
      })
      .then(function(d) {
        if (!d || !d[0]) {
          if (addrEl) addrEl.textContent = 'No se encontró exacto. Mové el pin manualmente.';
          return;
        }

        currentLat = parseFloat(d[0].lat);
        currentLng = parseFloat(d[0].lon);

        map.setView([currentLat, currentLng], 16);
        marker.setLatLng([currentLat, currentLng]);
        locationChanged = true;

        if (addrEl) addrEl.textContent = 'Ubicación marcada: ' + d[0].display_name;
      })
      .catch(function() {
        if (addrEl) addrEl.textContent = 'No pudimos buscar. Mové el pin manualmente.';
      });
  };

  window.wevvSubmit = async function() {
    var nombreRaw = document.getElementById('wevvNombre').value.trim();
    var apellidoRaw = document.getElementById('wevvApellido').value.trim();
    var nombre = nombreRaw + ' ' + apellidoRaw;
    var telefono = document.getElementById('wevvTelefono').value.trim().replace(/\D/g, '');
    var departamento = document.getElementById('wevvDepartamento').value;
    var ciudad = document.getElementById('wevvCiudad').value;
    var direccion = document.getElementById('wevvDireccion').value.trim();
    var referencia = document.getElementById('wevvReferencia').value.trim();

    if (!nombreRaw) {
      focusWithAlert('wevvNombre', 'Por favor ingresá tu nombre.');
      return;
    }

    if (!apellidoRaw) {
      focusWithAlert('wevvApellido', 'Por favor ingresá tu apellido.');
      return;
    }

    if (!telefono || telefono.length < 7) {
      focusWithAlert('wevvTelefono', 'Por favor ingresá un WhatsApp válido.');
      return;
    }

    if (!departamento) {
      focusWithAlert('wevvDepartamento', 'Por favor seleccioná tu departamento.');
      return;
    }

    if (!ciudad) {
      focusWithAlert('wevvCiudad', 'Por favor seleccioná tu ciudad.');
      return;
    }

    if (!direccion) {
      focusWithAlert('wevvDireccion', 'Por favor ingresá tu dirección exacta.');
      return;
    }

    if (!locationChanged) {
      alert('Por favor confirmá tu ubicación en el mapa o mové el pin manualmente.');
      document.getElementById('wevvMap').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    if (needsInvoice) {
      var ruc = document.getElementById('wevvRuc').value.trim();
      var razon = document.getElementById('wevvRazon').value.trim();

      if (!ruc || !razon) {
        focusWithAlert(!ruc ? 'wevvRuc' : 'wevvRazon', 'Por favor completá el RUC y la razón social.');
        return;
      }
    }

    if (!compromisoAceptado) {
      alert('Marcá la confirmación para reservar una entrega real.');
      document.getElementById('wevvCompCheck').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }

    var btn = document.getElementById('wevvSubmitBtn');
    btn.innerHTML = 'Procesando pedido...<small>aguardá unos segundos</small>';
    btn.disabled = true;

    var descuento = discountApplied ? EXIT_DESCUENTO : 0;
    var subtotal = calcPrice(selectedQty, selectedPct);
    var finalTotal = subtotal - descuento;
    var gpsUrl = 'https://maps.google.com/?q=' + currentLat + ',' + currentLng;

    try {
      var resp = await fetch(VERCEL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre,
          telefono: telefono,
          ciudad: departamento + ' - ' + ciudad,
          direccion: direccion,
          referencia: referencia,
          gps: gpsUrl,
          ubicacionTexto: 'Departamento: ' + departamento
            + '\nCiudad: ' + ciudad
            + '\nDirección: ' + direccion
            + (referencia ? '\nReferencia: ' + referencia : '')
            + '\nGPS: ' + gpsUrl,
          lat: currentLat,
          lng: currentLng,
          variantId: window.wevvVariantId,
          cantidad: selectedQty,
          descuento: descuento,
          producto: window.wevvProductTitle || 'Producto',
          total: formatGs(finalTotal)
        })
      });

      var data = await resp.json();
      if (!resp.ok) throw new Error('Error');

      if (typeof fbq !== 'undefined') {
        fbq('track', 'Purchase', {
          value: finalTotal,
          currency: 'PYG',
          content_ids: [String(window.wevvVariantId)],
          content_type: 'product',
          num_items: selectedQty
        });
      }

      if (typeof ttq !== 'undefined') {
        ttq.track('Purchase', {
          value: finalTotal,
          currency: 'PYG',
          content_id: String(window.wevvVariantId),
          content_type: 'product',
          quantity: selectedQty
        });
      }

      var rucTxt = '';

      if (needsInvoice) {
        rucTxt = '\nFACTURA: Sí'
          + '\nRUC: ' + document.getElementById('wevvRuc').value.trim()
          + '\nRazón social: ' + document.getElementById('wevvRazon').value.trim();
      }

      var descTxt = discountApplied ? '\nDescuento especial aplicado: -' + formatGs(EXIT_DESCUENTO) : '';
      var refTxt = referencia ? '\nReferencia: ' + referencia : '';

      var msg = 'NUEVO PEDIDO - PAGO AL RECIBIR'
        + '\n\nProducto: ' + (window.wevvProductTitle || 'Producto')
        + '\nCantidad: ' + selectedQty + ' unidad' + (selectedQty > 1 ? 'es' : '')
        + '\nDescuento pack: ' + selectedPct + '% OFF'
        + descTxt
        + '\nTOTAL A PAGAR: ' + formatGs(finalTotal)
        + '\n\nNombre: ' + nombre
        + '\nTeléfono: ' + telefono
        + '\nDepartamento: ' + departamento
        + '\nCiudad: ' + ciudad
        + '\nDirección: ' + direccion
        + refTxt
        + '\nUbicación GPS: ' + gpsUrl
        + rucTxt
        + '\n\nPedido #' + (data.order_name || data.order_id);

      orderConfirmed = true;
      window.location.href = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(msg);
    } catch(err) {
      console.error(err);
      btn.innerHTML = 'Confirmar por WhatsApp<small>pedido con pago al recibir</small>';
      btn.disabled = false;
      alert('Hubo un error. Por favor intentá de nuevo.');
    }
  };

  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 5 && !exitShown) {
      exitShown = true;
      wevvSendLead('intento_salir', true);
      document.getElementById('wevvExitOverlay').style.display = 'flex';
    }
  });

  history.pushState(null, '', location.href);

  window.addEventListener('popstate', function() {
    if (!exitShown) {
      exitShown = true;
      history.pushState(null, '', location.href);
      wevvSendLead('boton_atras', true);
      document.getElementById('wevvExitOverlay').style.display = 'flex';
    }
  });

  var LEAD_URL = 'https://cod-shopify-ochre.vercel.app/api/lead';
  var leadTimer = null;
  var lastLeadKey = '';

  function wevvBuildLeadPayload(etapa) {
    var nombreRaw = document.getElementById('wevvNombre') ? document.getElementById('wevvNombre').value.trim() : '';
    var apellidoRaw = document.getElementById('wevvApellido') ? document.getElementById('wevvApellido').value.trim() : '';
    var telefono = document.getElementById('wevvTelefono') ? document.getElementById('wevvTelefono').value.trim().replace(/\D/g, '') : '';
    var departamento = document.getElementById('wevvDepartamento') ? document.getElementById('wevvDepartamento').value : '';
    var ciudad = document.getElementById('wevvCiudad') ? document.getElementById('wevvCiudad').value : '';
    var direccion = document.getElementById('wevvDireccion') ? document.getElementById('wevvDireccion').value.trim() : '';
    var referencia = document.getElementById('wevvReferencia') ? document.getElementById('wevvReferencia').value.trim() : '';
    var descuento = discountApplied ? EXIT_DESCUENTO : 0;
    var subtotal = calcPrice(selectedQty, selectedPct);
    var finalTotal = subtotal - descuento;
    var gpsUrl = 'https://maps.google.com/?q=' + currentLat + ',' + currentLng;

    return {
      etapa: etapa,
      nombre: (nombreRaw + ' ' + apellidoRaw).trim(),
      telefono: telefono,
      ciudad: departamento && ciudad ? departamento + ' - ' + ciudad : departamento || ciudad || '',
      direccion: direccion,
      referencia: referencia,
      gps: gpsUrl,
      lat: currentLat,
      lng: currentLng,
      variantId: window.wevvVariantId,
      cantidad: selectedQty,
      descuento: descuento,
      producto: window.wevvProductTitle || 'Producto',
      total: formatGs(finalTotal)
    };
  }

  function wevvLeadTieneDatos(payload) {
    return (payload.telefono && payload.telefono.length >= 7)
      || (payload.nombre && payload.nombre.length >= 3)
      || (payload.direccion && payload.direccion.length >= 5);
  }

  function wevvSendLead(etapa, usarBeacon) {
    if (orderConfirmed) return;

    var payload = wevvBuildLeadPayload(etapa);
    if (!wevvLeadTieneDatos(payload)) return;

    var key = JSON.stringify([
      payload.etapa,
      payload.nombre,
      payload.telefono,
      payload.ciudad,
      payload.direccion,
      payload.referencia,
      payload.total
    ]);

    if (key === lastLeadKey) return;
    lastLeadKey = key;

    var body = JSON.stringify(payload);

    if (usarBeacon && navigator.sendBeacon) {
      var blob = new Blob([body], { type: 'application/json' });
      navigator.sendBeacon(LEAD_URL, blob);
      return;
    }

    fetch(LEAD_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body,
      keepalive: true
    }).catch(function() {});
  }

  function wevvQueueLead(etapa, delay) {
    clearTimeout(leadTimer);
    leadTimer = setTimeout(function() {
      wevvSendLead(etapa, false);
    }, delay || 12000);
  }

  function wevvAttachLeadCapture() {
    [
      'wevvNombre',
      'wevvApellido',
      'wevvTelefono',
      'wevvDepartamento',
      'wevvCiudad',
      'wevvDireccion',
      'wevvReferencia'
    ].forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;

      el.addEventListener('input', function() {
        wevvQueueLead('llenando_formulario', 12000);
      });

      el.addEventListener('change', function() {
        wevvQueueLead('cambio_datos', 6000);
      });

      el.addEventListener('blur', function() {
        wevvQueueLead('salio_del_campo', 2500);
      });
    });

    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        wevvSendLead('salio_de_la_pagina', true);
      }
    });

    window.addEventListener('pagehide', function() {
      wevvSendLead('salio_de_la_pagina', true);
    });

    var modal = document.getElementById('wevvModal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          wevvSendLead('cerro_tocando_fondo', true);
        }
      });
    }
  }

  var wevvOriginalShowExitOffer = window.wevvShowExitOffer;
  window.wevvShowExitOffer = function() {
    wevvSendLead('toco_la_x', true);
    wevvOriginalShowExitOffer();
  };

  var wevvOriginalCloseModalAndOffer = window.wevvCloseModalAndOffer;
  window.wevvCloseModalAndOffer = function() {
    wevvSendLead('cerro_formulario', true);
    wevvOriginalCloseModalAndOffer();
  };

  wevvAttachLeadCapture();

  updatePrices();
  startTimer();
})();
  }

  function boot() {
    injectWevvHtml();
    initWevvForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
