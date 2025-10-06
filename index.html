<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Via Rhôna — géoloc, distances, temps, mobile ++</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />

  <!-- Leaflet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

  <!-- Données GeoJSON: doit définir VR (FeatureCollection) -->
  <script src="VR.js"></script>

  <style>
    :root{
      --font: 14px/1.45 "Segoe UI","Helvetica Neue",Arial,sans-serif;
      --bg: #ffffff;
      --border: #e6e6e6;
      --brand: #2d6cdf;
    }
    html, body { height:100%; margin:0; }
    .app{ display:flex; height:100%; width:100%; overflow:hidden; background:#f7f8fb; }
    #map{ flex: 1 1 80%; min-width:0; }

    /* ===== Panneau 20% (desktop) ===== */
    #tronconPanel{
      width:20%;
      min-width:280px;
      background: var(--bg);
      border-left:1px solid var(--border);
      display:flex;
      flex-direction:column;
      z-index: 1000;
      box-shadow: -2px 0 12px rgba(17,24,39,0.06);
    }
    #tronconPanel header{
      padding:10px 12px;
      border-bottom:1px solid var(--border);
      font: var(--font); font-weight:700; letter-spacing:.2px;
      display:flex; align-items:center; gap:8px; justify-content:space-between;
    }
    #panelTitle{ display:flex; align-items:baseline; gap:6px; }
    #panelTitle small{ font-weight:500; color:#6b7280; }

    .tools{
      padding:10px 10px 8px 10px;
      border-bottom:1px solid var(--border);
      display:flex; gap:8px; align-items:center; flex-wrap:wrap;
    }
    .btn{
      padding:8px 12px; border:1px solid #d9d9d9; border-radius:8px; background:#fff; cursor:pointer; font: var(--font);
    }
    .btn:hover{ background:#f3f4f6; }
    .speed{
      display:flex; align-items:center; gap:8px; width:100%;
      padding-top:4px;
    }
    .speed input[type="range"]{ flex:1; }
    .speed .val{ min-width:64px; text-align:right; font-weight:600; color:#111827; }

    #tronconList{
      list-style:none; margin:0; padding:8px; overflow:auto; font: var(--font); height:100%;
    }
    .item{
      border:1px solid #edf0f5; border-radius:10px; padding:10px 12px; margin:0 0 8px 0;
      background:#fff; cursor:pointer; transition: background .15s ease, border-color .15s ease, transform .06s ease;
      box-shadow: 0 1px 0 rgba(17,24,39,0.03);
    }
    .item:hover{ background:#f7fbff; border-color:#d8e4ff; }
    .item:active{ transform: translateY(1px); }
    .row1{
      display:flex; align-items:center; justify-content:space-between; gap:10px; margin-bottom:4px;
    }
    .title{
      font-weight:650; margin:0; color:#111827;
      display:flex; align-items:center; gap:8px;
    }
    .badge{
      font-size:12px; padding:2px 8px; border-radius:999px; border:1px solid #e5e7eb;
      background:#eef2ff; color:#4338ca;
    }
    .pill{
      font-size:12px; padding:2px 8px; border-radius:999px; border:1px solid #e5e7eb;
      background:#ecfdf5; color:#065f46;
    }
    .metrics{ color:#374151; font-size:13px; }
    .desc{ color:#4b5563; font-size:13px; margin-top:4px; }
    #empty{ padding:12px; color:#666; font: var(--font); }

    /* Lignes: halo + trait */
    .vr-line { filter: drop-shadow(0 0 1px rgba(0,0,0,.25)); }
    .vr-line:hover { filter: drop-shadow(0 0 4px rgba(0,0,0,.35)); }

    /* ===== Mobile ===== */
    @media (max-width: 768px){
      .app{ flex-direction: column; }
      #map{ order: 2; height: 50vh; }
      #tronconPanel{
        order: 1; width:100%; min-width:0; height:50vh;
        border-left:none; border-bottom:1px solid var(--border); box-shadow: 0 2px 10px rgba(17,24,39,0.06);
      }
      #collapseBtn, #resizeBtn, #fullscreenBtn{ display:inline-flex; }
    }
    @supports (height: 100dvh) {
      @media (max-width: 768px){
        #map{ height: 50dvh; }
        #tronconPanel{ height: 50dvh; }
      }
    }

    /* Boutons header (mobile) */
    #collapseBtn, #resizeBtn, #fullscreenBtn{
      display:none;
      align-items:center; gap:6px;
      padding:6px 10px; border:1px solid #d9d9d9; border-radius:8px; background:#fff; cursor:pointer; font: var(--font);
    }
    #tronconPanel.collapsed{ height:auto; }
    #tronconPanel.collapsed #tronconList, #tronconPanel.collapsed .speed{ display:none; }

    /* Modes carte (mobile) */
    @media (max-width: 768px){
      body.mobile-bigmap #map{ height: 75vh; }
      body.mobile-bigmap #tronconPanel{ height: 25vh; }
      body.mobile-fullmap #map{ height: 100vh; }
      body.mobile-fullmap #tronconPanel{ display:none; }
      body.mobile-fullmap .fab-show-panel{ display:flex; }
    }
    @supports (height: 100dvh){
      @media (max-width: 768px){
        body.mobile-bigmap #map{ height: 75dvh; }
        body.mobile-bigmap #tronconPanel{ height: 25dvh; }
        body.mobile-fullmap #map{ height: 100dvh; }
      }
    }

    /* FAB (bouton flottant) pour (dé)masquer le panneau en plein écran */
    .fab-show-panel{
      position: fixed; right: 12px; bottom: 12px; z-index: 1200;
      display:none; align-items:center; gap:8px;
      padding:10px 12px; border:1px solid #d1d5db; border-radius:999px; background:#fff; box-shadow: 0 6px 18px rgba(0,0,0,.15);
      font: var(--font); cursor:pointer;
    }

    /* Petit contrôle Leaflet custom pour géoloc + bascule carte */
    .leaflet-control.custom-tools{
      background:#fff; border:1px solid #d1d5db; border-radius:8px; box-shadow: 0 2px 10px rgba(0,0,0,.1);
      overflow:hidden;
    }
    .custom-tools button{ display:block; width:32px; height:32px; border:0; background:#fff; cursor:pointer; }
    .custom-tools button + button{ border-top:1px solid #e5e7eb; }
  </style>
</head>
<body>
<div class="app">
  <div id="map"></div>

  <!-- Panneau -->
  <aside id="tronconPanel">
    <header>
      <div id="panelTitle">Tronçons (ordre) <small>(<span id="count">0</span> visibles)</small></div>
      <div style="display:flex; gap:6px;">
        <button id="resizeBtn" class="btn" aria-pressed="false" title="Agrandir la carte (mobile)">Agrandir carte</button>
        <button id="fullscreenBtn" class="btn" aria-pressed="false" title="Carte plein écran (mobile)">Carte plein écran</button>
        <button id="collapseBtn" class="btn" aria-expanded="true" title="Replier / déplier la liste">Replier</button>
      </div>
    </header>

    <div class="tools">
      <button id="locateBtn" class="btn" title="Me localiser">📍 Me localiser</button>
      <div class="speed" title="Vitesse moyenne à vélo pour l'estimation des temps">
        <span>Vitesse:</span>
        <input id="speedRange" type="range" min="8" max="28" step="1" value="15" />
        <span class="val"><span id="speedVal">15</span> km/h</span>
      </div>
    </div>

    <ul id="tronconList"></ul>
    <div id="empty" style="display:none;">Aucun tronçon visible dans la vue actuelle.</div>
  </aside>
</div>

<!-- FAB visible en plein écran mobile pour réouvrir la liste -->
<button class="fab-show-panel" id="showPanelFab" title="Afficher la liste">🧭 Afficher la liste</button>

<script>
  /* =========================
     1) Récupération & normalisation des données
     ========================= */
  const VR_DATA = (typeof VR !== "undefined") ? VR : (window.VR ?? null);
  if (!VR_DATA) {
    alert("VR.js n'a pas exposé la variable globale 'VR'.\nDans VR.js, utilise par ex.: var VR = { ... };");
  }

  function isLat(x){ return x > 41 && x < 51; }   // France approx
  function isLon(x){ return x > -5 && x < 10; }
  function maybeSwap(pair){ const [a,b] = pair; return (isLat(a) && isLon(b)) ? [b,a] : pair; }
  function deepFixCoords(geom){
    if (!geom) return geom;
    const t = geom.type, c = geom.coordinates;
    if (!c) return geom;
    if (t === "Point") geom.coordinates = maybeSwap(c);
    else if (t === "LineString") geom.coordinates = c.map(maybeSwap);
    else if (t === "MultiLineString") geom.coordinates = c.map(line => line.map(maybeSwap));
    else if (t === "Polygon") geom.coordinates = c.map(ring => ring.map(maybeSwap));
    else if (t === "MultiPolygon") geom.coordinates = c.map(poly => poly.map(ring => ring.map(maybeSwap)));
    return geom;
  }
  function normalizeGeoJSON(fc){
    if (!fc || fc.type !== "FeatureCollection") return fc;
    const out = { type:"FeatureCollection", features: [] };
    for (const f of fc.features || []) {
      const nf = { type:"Feature", properties: {...(f.properties||{})}, geometry: JSON.parse(JSON.stringify(f.geometry)) };
      nf.geometry = deepFixCoords(nf.geometry);
      out.features.push(nf);
    }
    return out;
  }
  const VR_FIXED = normalizeGeoJSON(VR_DATA);

  /* =========================
     2) Helpers: ordre, couleurs, longueurs
     ========================= */
  function getOrderProp(p){
    const keys = ["order","ordre","numero","num","index","idx","rank","seq","segment","troncon"];
    for (const k of keys){
      if (p && p[k] != null && p[k] !== "") {
        const v = Number(String(p[k]).match(/-?\d+/)?.[0]);
        if (Number.isFinite(v)) return v;
      }
    }
    return null;
  }
  function orderFromName(name){
    const m = String(name||"").match(/(\d+)/);
    return m ? Number(m[1]) : null;
  }
  function getOrder(feature){
    const p = feature?.properties || {};
    return getOrderProp(p) ?? orderFromName(p.name || p.nom) ?? null;
  }

  const palette = ["#277da1","#577590","#4d908e","#43aa8b","#90be6d","#f9c74f","#f8961e","#f9844a","#f3722c","#f94144","#b5179e","#7209b7","#3a0ca3","#4361ee","#4cc9f0"];
  function hashName(name=""){ let h=0; for(let i=0;i<name.length;i++) h=(h*31+name.charCodeAt(i))>>>0; return h; }
  function colorForFeature(f){
    const ord = getOrder(f);
    if (Number.isFinite(ord) && ord>0) return palette[(ord-1) % palette.length];
    const name = f?.properties?.name || f?.properties?.nom || "";
    return palette[ hashName(name) % palette.length ];
  }

  // Distances
  function segLenMeters(a, b){
    const R = 6371000, toRad = t => t*Math.PI/180; const [lon1, lat1] = a, [lon2, lat2] = b;
    const dLat = toRad(lat2 - lat1), dLon = toRad(lon2 - lon1);
    const s1 = Math.sin(dLat/2), s2 = Math.sin(dLon/2);
    const aa = s1*s1 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*s2*s2; const c = 2 * Math.atan2(Math.sqrt(aa), Math.sqrt(1-aa));
    return R * c;
  }
  function lengthMeters(geom){
    if (!geom || !geom.coordinates) return 0; const t = geom.type; let sum = 0;
    if (t === "LineString") { const c = geom.coordinates; for (let i=1;i<c.length;i++) sum += segLenMeters(c[i-1], c[i]); }
    else if (t === "MultiLineString") { for (const line of geom.coordinates) { for (let i=1;i<line.length;i++) sum += segLenMeters(line[i-1], line[i]); } }
    else if (t === "Polygon" || t === "MultiPolygon") { const rings = (t === "Polygon") ? geom.coordinates : geom.coordinates.flat(); for (const ring of rings) { for (let i=1;i<ring.length;i++) sum += segLenMeters(ring[i-1], ring[i]); } }
    return sum;
  }
  function fmtKm(m){ return (m/1000).toFixed(2); }
  function fmtTime(hoursFloat){ const totalMin = Math.round(hoursFloat*60); const h = Math.floor(totalMin/60); const m = totalMin%60; if (h <= 0) return `${m} min`; if (m === 0) return `${h} h`; return `${h} h ${m} min`; }

  /* =========================
     3) Carte Leaflet + basemaps vélo
     ========================= */
  const map = L.map('map', { attributionControl:false });

  const baseCyclOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', { maxZoom: 20, attribution: '© OpenStreetMap, style © CyclOSM' }).addTo(map);
  const baseOSM = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' });
  const baseOpenTopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', { maxZoom: 17, attribution: '© OpenStreetMap, SRTM | © OpenTopoMap' });
  const baseCartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 20, attribution: '© OpenStreetMap, © CARTO' });

  // Overlay cyclable (routes façon Waymarked Trails)
  const overlayCycling = L.tileLayer('https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.8, attribution: '© waymarkedtrails.org, © OpenStreetMap' });

  L.control.attribution({ position:'bottomright' }).addTo(map)
   .setPrefix('')
   .addAttribution('© OpenStreetMap | © CyclOSM | © Leaflet');

  function styleCasing(){ return { color:'#fff', weight:7, opacity:0.9, lineCap:'round', lineJoin:'round' }; }
  function styleLine(f){ return { color: colorForFeature(f), weight:4, opacity:0.95, lineCap:'round', lineJoin:'round', className:'vr-line' };}

  function onEachFeature(feature, layer){
    const p = feature?.properties || {}; const name = p.name || p.nom || "Tronçon"; const desc = p.description || p.desc || ""; const lenM = p.__lenM ?? 0; const km = Number(fmtKm(lenM)); const ord = getOrder(feature); const prefix = Number.isFinite(ord) ? `#${ord} – ` : "";
    layer.bindPopup(`<strong>${prefix}${name}</strong>${desc ? "<br>"+desc : ""}${km>0 ? "<br><small>"+km.toFixed(2)+" km</small>" : ""}`);
    layer.on({ mouseover: e => { e.target.setStyle({weight:6, opacity:1}); e.target.bringToFront(); }, mouseout:  e => { e.target.setStyle({weight:4, opacity:0.95}); } });
  }

  const VR_FIXED_WITHLEN = { type: "FeatureCollection", features: (VR_FIXED?.features || []).map(f => { const len = lengthMeters(f.geometry); const p = {...(f.properties||{}), __lenM: len}; return {type:"Feature", properties:p, geometry:f.geometry}; }) };
  const vrCasing = L.geoJSON(VR_FIXED_WITHLEN, { style: styleCasing, interactive:false }).addTo(map);
  const vrLine   = L.geoJSON(VR_FIXED_WITHLEN, { style: styleLine, onEachFeature }).addTo(map);

  const baseLayers = { "CyclOSM (vélo)": baseCyclOSM, "OpenStreetMap": baseOSM, "OpenTopoMap": baseOpenTopo, "CARTO Voyager": baseCartoVoyager };
  const overlays = { "ViaRhôna (tronçons)": L.layerGroup([vrCasing, vrLine]), "Réseaux cyclables (overlay)": overlayCycling };

  L.control.layers(baseLayers, overlays, { collapsed:false }).addTo(map);

  (function fitSafe(){ try{ const b = vrLine.getBounds(); if (b && b.isValid()) { map.fitBounds(b, { padding:[20,20] }); return; } }catch{} map.setView([45.5, 5.0], 7); })();

  /* =========================
     4) Panneau: liste
     ========================= */
  const $list  = document.getElementById('tronconList');
  const $empty = document.getElementById('empty');
  const $count = document.getElementById('count');
  const $speedRange = document.getElementById('speedRange');
  const $speedVal = document.getElementById('speedVal');
  const $collapseBtn = document.getElementById('collapseBtn');
  const $panel = document.getElementById('tronconPanel');
  const $resizeBtn = document.getElementById('resizeBtn');
  const $fullscreenBtn = document.getElementById('fullscreenBtn');
  const $locateBtn = document.getElementById('locateBtn');
  const $showPanelFab = document.getElementById('showPanelFab');

  function getVisibleTroncons(){
    const bounds = map.getBounds(); const items = [];
    vrLine.eachLayer(layer => {
      const b = layer.getBounds?.(); if (!b || !bounds.intersects(b)) return;
      const f = layer.feature; const p = f?.properties || {}; const nom = p.name || p.nom || 'Tronçon'; const desc = p.description || p.desc || ''; const lenM = p.__lenM ?? 0; const ord = getOrder(f);
      items.push({ layer, nom, desc, lenM, ord, color: colorForFeature(f) });
    });
    items.sort((a,b)=>{ const ao = Number.isFinite(a.ord), bo = Number.isFinite(b.ord); if (ao && bo && a.ord !== b.ord) return a.ord - b.ord; if (ao && !bo) return -1; if (!ao && bo) return 1; if (a.lenM !== b.lenM) return a.lenM - b.lenM; return a.nom.localeCompare(b.nom,'fr',{sensitivity:'base'}); });
    return items;
  }

  function renderList(){
    const items = getVisibleTroncons(); const speedKmh = Number($speedRange.value || 15); $speedVal.textContent = speedKmh; $list.innerHTML = '';
    if (items.length === 0) { $empty.style.display = 'block'; $count.textContent = '0'; return; }
    $empty.style.display = 'none'; $count.textContent = String(items.length);

    items.forEach(({layer, nom, desc, lenM, ord, color}) => {
      const km = Number(fmtKm(lenM)); const hours = km / speedKmh; const eta = fmtTime(hours);
      const li = document.createElement('li'); li.className = 'item';
      const row1 = document.createElement('div'); row1.className = 'row1';
      const title = document.createElement('div'); title.className='title';
      const badge = document.createElement('span'); badge.className='badge'; badge.textContent = Number.isFinite(ord) ? `#${ord}` : '—';
      badge.style.background = color + '1a'; badge.style.borderColor = color + '55'; badge.style.color = color;
      const nameEl = document.createElement('span'); nameEl.textContent = nom;
      const pillKm = document.createElement('span'); pillKm.className='pill'; pillKm.textContent = `${km.toFixed(2)} km`;
      title.appendChild(badge); title.appendChild(nameEl); title.appendChild(pillKm);
      const metrics = document.createElement('div'); metrics.className='metrics'; metrics.textContent = `~ ${eta} @ ${speedKmh} km/h`;
      row1.appendChild(title); row1.appendChild(metrics);
      li.appendChild(row1);
      if (desc) { const p = document.createElement('div'); p.className='desc'; p.textContent = desc; li.appendChild(p); }
      li.addEventListener('click', () => { const b = layer.getBounds(); map.fitBounds(b.pad(0.2), { animate:true }); layer.openPopup(b.getCenter()); layer.setStyle({weight:6, opacity:1, color}); setTimeout(()=> layer.setStyle({weight:4, opacity:0.95, color}), 1500); });
      $list.appendChild(li);
    });
  }

  map.on('moveend zoomend', renderList);
  $speedRange.addEventListener('input', renderList);

  // Replier / déplier
  $collapseBtn.addEventListener('click', () => {
    const nowCollapsed = !$panel.classList.contains('collapsed');
    $panel.classList.toggle('collapsed', nowCollapsed);
    $collapseBtn.textContent = nowCollapsed ? 'Déplier' : 'Replier';
    $collapseBtn.setAttribute('aria-expanded', String(!nowCollapsed));
    setTimeout(()=> map.invalidateSize(), 250);
  });

  // Mobile: agrandir carte (75% carte / 25% panneau)
  $resizeBtn.addEventListener('click', () => {
    const on = !document.body.classList.contains('mobile-bigmap');
    document.body.classList.toggle('mobile-bigmap', on);
    if (on) document.body.classList.remove('mobile-fullmap');
    $resizeBtn.textContent = on ? 'Taille normale' : 'Agrandir carte';
    $resizeBtn.setAttribute('aria-pressed', String(on));
    setTimeout(()=> map.invalidateSize(), 250);
  });

  // Mobile: plein écran (carte 100%, panneau masqué) + FAB pour revenir
  function setFullMap(on){
    document.body.classList.toggle('mobile-fullmap', on);
    if (on) document.body.classList.remove('mobile-bigmap');
    $fullscreenBtn.textContent = on ? 'Quitter plein écran' : 'Carte plein écran';
    $fullscreenBtn.setAttribute('aria-pressed', String(on));
    setTimeout(()=> map.invalidateSize(), 250);
  }
  $fullscreenBtn.addEventListener('click', () => setFullMap(!document.body.classList.contains('mobile-fullmap')));
  $showPanelFab.addEventListener('click', () => setFullMap(false));

  /* =========================
     5) Géolocalisation utilisateur
     ========================= */
  let userMarker = null, userCircle = null;
  function showUserLocation(latlng, accuracy){
    if (!userMarker){ userMarker = L.marker(latlng, {title:'Vous êtes ici'}).addTo(map); }
    else { userMarker.setLatLng(latlng); }
    if (!userCircle){ userCircle = L.circle(latlng, {radius: accuracy || 0, color:'#2d6cdf', fillColor:'#2d6cdf', fillOpacity:0.1}).addTo(map); }
    else { userCircle.setLatLng(latlng); userCircle.setRadius(accuracy || 0); }
  }
  function locateOnce(){ map.locate({ setView:true, enableHighAccuracy:true, maxZoom:15, timeout:10000 }); }
  map.on('locationfound', (e) => {
    showUserLocation(e.latlng, e.accuracy);
    try{ let best = null, bestDist = Infinity; vrLine.eachLayer(layer => { const d = layer.getBounds().getCenter().distanceTo(e.latlng); if (d < bestDist){ bestDist = d; best = layer; } }); if (best){ best.setStyle({weight:6, opacity:1}); setTimeout(()=> best.setStyle({weight:4, opacity:0.95}), 1500); } }catch{}
  });
  map.on('locationerror', (err) => { alert('Géolocalisation impossible. Autorise la localisation dans ton navigateur.\n(' + err.message + ')'); });

  $locateBtn.addEventListener('click', locateOnce);

  /* =========================
     6) Petit contrôle compact sur la carte (géoloc, bigmap, fullscreen)
     ========================= */
  const CustomTools = L.Control.extend({
    options: { position: 'topleft' },
    onAdd: function(){
      const c = L.DomUtil.create('div', 'leaflet-control custom-tools');
      const btnLocate = L.DomUtil.create('button', '', c); btnLocate.title = 'Me localiser'; btnLocate.textContent = '📍';
      const btnBig = L.DomUtil.create('button', '', c); btnBig.title = 'Agrandir carte'; btnBig.textContent = '🗖';
      const btnFull = L.DomUtil.create('button', '', c); btnFull.title = 'Plein écran carte'; btnFull.textContent = '⛶';
      L.DomEvent.on(btnLocate, 'click', (e)=>{ L.DomEvent.stop(e); locateOnce(); });
      L.DomEvent.on(btnBig, 'click', (e)=>{ L.DomEvent.stop(e); $resizeBtn.click(); });
      L.DomEvent.on(btnFull, 'click', (e)=>{ L.DomEvent.stop(e); $fullscreenBtn.click(); });
      return c;
    }
  });
  map.addControl(new CustomTools());

  // 1er rendu
  renderList();

  // Aide debug rapide
  window.checkVR = function(){ const f = VR_FIXED?.features?.length ?? 0; const b = vrLine.getBounds(); console.log({features:f, boundsValid:b?.isValid?.() ?? false, sample:VR_FIXED?.features?.[0]}); return "OK (regarde la console)."; };
</script>
</body>
</html>
