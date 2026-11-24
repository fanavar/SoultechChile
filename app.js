(function(){
  'use strict';
  // Evita que otro sitio muestre esta página dentro de un iframe (clickjacking).
  if (window.top !== window.self) { try { window.top.location = window.self.location.href; } catch(e) { document.documentElement.hidden = true; } }
  var PHONE  = '56989252018'; // Bot de WhatsApp (atiende, califica y deriva)
  var DIRECT = '56933034894'; // WhatsApp Business de Fabián (línea directa)
  var fmt = function(n){ return '$' + Math.round(n).toLocaleString('es-CL'); };

  // Mensajes prellenados: le dan al bot el contexto para cotizar y derivar más rápido.
  var MSG = {
    general:    'Hola Soultech, vengo de la página web y quiero cotizar un servicio para mi equipo.',
    lento:      'Hola Soultech, vengo de la página web. Mi notebook está lento y me interesa el servicio Acelera 10 veces tu notebook.',
    calor:      'Hola Soultech, vengo de la página web. Mi equipo se calienta y quiero la limpieza interna con cambio de pasta térmica.',
    noenciende: 'Hola Soultech, vengo de la página web. Mi equipo no enciende / tiene una falla y quiero la revisión y diagnóstico ($9.990).',
    fisico:     'Hola Soultech, vengo de la página web. Necesito cotizar un repuesto (pantalla, teclado o batería) para mi equipo.',
    bisagras:   'Hola Soultech, vengo de la página web. Quiero reparar las bisagras de mi notebook ($34.990).',
    formateo:   'Hola Soultech, vengo de la página web. Quiero formatear mi equipo (formateo profesional).',
    ram:        'Hola Soultech, vengo de la página web. Quiero ampliar la memoria RAM de mi equipo.',
    celular:    'Hola Soultech, vengo de la página web. Necesito cotizar una reparación para mi celular / tablet.'
  };

  function track(label){
    try{
      if (window.fbq) fbq('track','Contact',{content_name:label});
      if (window.gtag) gtag('event','whatsapp_click',{event_label:label});
    }catch(e){}
  }
  function waURL(num, text){ return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text); }
  function openWA(text, label, num){
    track(label || 'WhatsApp');
    window.open(waURL(num || PHONE, text), '_blank', 'noopener,noreferrer');
  }

  // Todos los elementos con data-wa
  document.querySelectorAll('[data-wa]').forEach(function(el){
    var key = el.getAttribute('data-wa');
    var msg = Object.prototype.hasOwnProperty.call(MSG, key) ? MSG[key] : MSG.general;
    if (el.tagName === 'A') { el.href = waURL(PHONE, msg); el.target = '_blank'; el.rel = 'noopener noreferrer'; }
    el.addEventListener('click', function(e){
      e.preventDefault();
      openWA(msg, el.getAttribute('data-label'));
    });
  });

  // Línea directa con Fabián (WhatsApp Business)
  var DIRECT_MSG = 'Hola Fabián, vengo de la página web de Soultech y prefiero hablar directamente contigo.';
  document.querySelectorAll('[data-direct]').forEach(function(el){
    el.href = waURL(DIRECT, DIRECT_MSG); el.target = '_blank'; el.rel = 'noopener noreferrer';
    el.addEventListener('click', function(e){
      e.preventDefault();
      openWA(DIRECT_MSG, el.getAttribute('data-label') || 'Directo Fabián', DIRECT);
    });
  });

  // Configurador Acelera
  var ssd = {name:'480GB', price:164990}, ram = {name:'', price:0};
  function pick(group, btn){
    group.querySelectorAll('.opt').forEach(function(b){ b.classList.remove('on'); b.setAttribute('aria-checked','false'); });
    btn.classList.add('on'); btn.setAttribute('aria-checked','true');
  }
  function render(){
    var tot = ssd.price + ram.price;
    document.getElementById('sSsd').textContent = ssd.name;
    document.getElementById('sSsdP').textContent = fmt(ssd.price);
    var rr = document.getElementById('ramRow');
    rr.hidden = !ram.price;
    document.getElementById('sRam').textContent = ram.name;
    document.getElementById('sRamP').textContent = fmt(ram.price);
    document.getElementById('sTot').textContent = fmt(tot);
    document.getElementById('s60').textContent = fmt(tot * 0.6);
    document.getElementById('s40').textContent = fmt(tot * 0.4);
    document.getElementById('cmp').style.display = tot < 300000 ? '' : 'none';
    var txt = 'Hola Soultech, vengo de la página web. Quiero el servicio Acelera 10 veces tu notebook con SSD ' + ssd.name + ' (' + fmt(ssd.price) + ')'
      + (ram.price ? ' + RAM ' + ram.name + ' (' + fmt(ram.price) + '). Total: ' + fmt(tot) : '')
      + '. ¿Me ayudan a coordinar?';
    var b = document.getElementById('cfgBtn');
    b.href = waURL(PHONE, txt);
    b.dataset.msg = txt;
  }
  var ssdG = document.querySelector('.ssd'), ramG = document.querySelector('.ram');
  ssdG.addEventListener('click', function(e){
    var b = e.target.closest('.opt'); if(!b) return;
    pick(ssdG,b); ssd = {name:b.dataset.ssd, price:+b.dataset.price}; render();
  });
  ramG.addEventListener('click', function(e){
    var b = e.target.closest('.opt'); if(!b) return;
    pick(ramG,b); ram = {name:b.dataset.ram, price:+b.dataset.price}; render();
  });
  document.getElementById('cfgBtn').addEventListener('click', function(e){
    e.preventDefault(); openWA(this.dataset.msg, 'Acelera ' + ssd.name + (ram.name ? ' + ' + ram.name : ''));
  });
  render();

  // Formulario de cotización
  document.getElementById('qf').addEventListener('submit', function(e){
    e.preventDefault();
    var eq = qEq.value, pr = qProb.value, co = qCom.value;
    var miss = [[qEq,eq],[qProb,pr],[qCom,co]].filter(function(x){ return !x[1]; });
    [qEq,qProb,qCom].forEach(function(s){ s.style.borderColor=''; });
    if (miss.length){ miss.forEach(function(x){ x[0].style.borderColor='#EC3580'; }); miss[0][0].focus(); return; }
    var lines = ['Hola Soultech, vengo de la página web y quiero cotizar:',
      '• Equipo: ' + eq + (qMarca.value.trim() ? ' (' + qMarca.value.trim() + ')' : ''),
      '• Necesito: ' + pr,
      '• Comuna: ' + co];
    if (qDet.value.trim()) lines.push('• Detalle: ' + qDet.value.trim());
    openWA(lines.join('\n'), 'Formulario: ' + pr);
  });

  // Header que se oculta al bajar (móvil)
  var last = 0, hdr = document.getElementById('hdr');
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if (window.innerWidth < 861) hdr.classList.toggle('hide', y > last && y > 200);
    last = y;
  }, {passive:true});

  // Animaciones al aparecer
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });
  } else {
    document.querySelectorAll('.rv').forEach(function(el){ el.classList.add('in'); });
  }
  document.getElementById('yr').textContent = new Date().getFullYear();
})();
