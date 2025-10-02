<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Via Rhone Octobre 2025</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Leaflet -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>

  <!-- (optionnel) d3 si tu veux des palettes plus tard -->
  <script src="https://d3js.org/d3.v7.min.js"></script>

  <!-- Données GeoJSON sous forme JS : window.VR = {...} -->
  <script src="VR.js"></script>

  <style>
    :root{
      --card-bg: rgba(255,255,255,.92);
      --muted:#6B7280;
      --accent:#111827;
    }
    html, body { margin: 0; padding: 0; height: 100%; background:#f7f7f9; }
    #map { width: 100%; height: 100vh; }

    .leaflet-control-layers { max-height: 300px; overflow-y: auto; }

    /* Titre + panneau vitesse (Leaflet control) */
    .app-title, .speed-panel{
      background: var(--card-bg);
      backdrop-filter: saturate(120%) blur(2px);
      padding: 10px 14px;
      border-radius: 14px;
      box-shadow: 0 4px 18px rgba(0,0,0,.12);
      font: 500 14px/1.35 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      letter-spacing: .2px;
      color:#111;
    }
    .app-title strong{font-size:16px}
    .app-title small {
      display: block;
      font-weight: 500;
      color: var(--muted);
      letter-spacing: .3px;
      margin-top: 2px;
    }
    .total-distance{
      margin-top:6px;
      font-size:12px;
      color:var(--muted);
    }

    .speed-panel label{display:block; font-size:12px; color:var(--muted); margin-bottom:6px}
    .speed-panel .row{display:flex; align-items:center; gap:8px}
    .speed-panel input[type="range"]{ width:160px }
    .speed-panel .val{ font-weight:600; min-width:46px; text-align:right }

    /* Popups custom */
    .leaflet-popup-content-wrapper{
      border-radius: 14px;
      box-shadow: 0 12px 30px rgba(0,0,0,.18);
    }
    .popup{
      font: 500 14px/1.45 system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
    }
    .popup .title{
      font-weight:700; font-size:15px; color:var(--accent); margin-bottom:8px;
    }
    .badges{ display:flex; gap:8px; flex-wrap:wrap }
    .badge{
      background:#111827; color:white; border-radius:999px; padding:6px 10px; font-weight:600; font-size:12px;
      box-shadow: 0 4px 12px rgba(0,0,0,.12);
    }
    .badge--muted{
      background:#E5E7EB; color:#111827;
    }

    /* Lignes */
    .vr-line { filter: drop-shadow(0 0 1px rgba(0,0,0,.25)); transition: filter .2s, stroke-width .15s, opacity .15s }
    .vr-line:hover { filter: drop-shadow(0 0 6px rgba(0,0,0,.35)); }
  </style>
</head>

<body>
  <div id="map"></div>

  <script>
    // --- Helpers ---
    const R = 6371.0088; // rayon moyen de la Terre en km
    function haversine(lat1, lon1, lat2, lon2){
      const toRad = x => x * Math.PI/180;
      const dLat = toRad(lat2-lat1);
      const dLon = toRad(lon2-lon1);
      const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
      return 2*R*Math.asin(Math.sqrt(a)); // km
    }
    function formatKm(km){
      return km >= 1 ? `${km.toFixed(1)} km` : `${Math.round(km*1000)} m`;
    }
    function formatTime(hoursFloat){
      if (!isFinite(hoursFloat) || hoursFloat<=0) return '—';
      const totalMin = Math.round(hoursFloat*60);
      const h = Math.floor(totalMin/60);
      const m = totalMin%60;
      if (h === 0) return `${m} min`;
      return `${h} h ${m.toString().padStart(2,'0')} min`;
    }

    // --- Carte & fonds ---
    const map = L.map('map', { attributionControl: false });

    // CyclOSM par défaut (base)
    const baseCyclOSM = L.tileLayer(
      'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
      { maxZoom: 20, attribution: '© OpenStreetMap, style © CyclOSM' }
    ).addTo(map);

    // OSM standard en alternative
    const baseOSM = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { maxZoom: 19, attribution: '© OpenStreetMap' }
    );

    // Attribution personnalisée
    L.control.attribution({ position: 'bottomright' }).addTo(map)
      .setPrefix('')
      .addAttribution(`
        <strong>Crédits :</strong>
        <a href="https://leafletjs.com" target="_blank">Leaflet</a> |
        <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> |
        <a href="https://www.cyclosm.org/" target="_blank">CyclOSM</a>
      `);

    // Échelle
    L.control.scale({ imperial:false, position:'bottomleft' }).addTo(map);

    // --- Titre en haut à gauche ---
    const ui = { avgSpeedKmh: 16 }; // vitesse par défaut
    const TitleControl = L.Control.extend({
      options: { position: 'topleft' },
      onAdd: function () {
        const wrap = L.DomUtil.create('div');
        // Titre
        const title = L.DomUtil.create('div', 'app-title', wrap);
        title.innerHTML = `<strong>ViaRhôna</strong><small>Octobre 2025</small><div class="total-distance" id="totalDistance">Calcul des km…</div>`;
        // Panneau vitesse
        const sp = L.DomUtil.create('div', 'speed-panel', wrap);
        sp.innerHTML = `
          <label for="spd">Vitesse moyenne</label>
          <div class="row">
            <input id="spd" type="range" min="12" max="22" step="1" value="${ui.avgSpeedKmh}" />
            <div class="val"><span id="spdVal">${ui.avgSpeedKmh}</span> km/h</div>
          </div>
        `;
        const slider = sp.querySelector('#spd');
        const val = sp.querySelector('#spdVal');
        L.DomEvent.disableClickPropagation(wrap);
        slider.addEventListener('input', () => {
          ui.avgSpeedKmh = Number(slider.value);
          val.textContent = slider.value;
        });
        return wrap;
      }
    });
    map.addControl(new TitleControl());

    // --- Couleurs déterministes par nom de tronçon ---
    const palette = ["#e41a1c","#377eb8","#4daf4a","#984ea3","#ff7f00","#a65628","#f781bf","#1b9e77","#d95f02","#7570b3","#66a61e","#2ca25f"];
    function colorFromName(name = "") {
      let h = 0;
      for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
      return palette[h % palette.length];
    }

    // --- Style "joli" : casing + trait coloré ---
    function styleCasing() {
      return {
        color: 'white',
        weight: 7,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'vr-casing'
      };
    }
    function styleLine(feature) {
      const name = feature?.properties?.name || "";
      return {
        color: colorFromName(name),
        weight: 4,
        opacity: 0.95,
        lineCap: 'round',
        lineJoin: 'round',
        className: 'vr-line'
      };
    }

    // --- Calcul des distances par tronçon ---
    function getFeatureLengthKm(feature){
      if (!feature?.geometry) return 0;
      const g = feature.geometry;
      let km = 0;

      const addSeq = (seq) => {
        for (let i=1;i<seq.length;i++){
          const [lon1, lat1] = seq[i-1];
          const [lon2, lat2] = seq[i];
          km += haversine(lat1, lon1, lat2, lon2);
        }
      };

      if (g.type === 'LineString'){
        addSeq(g.coordinates);
      } else if (g.type === 'MultiLineString'){
        g.coordinates.forEach(addSeq);
      } else if (g.type === 'MultiPolygon' || g.type === 'Polygon'){
        // non pertinent ici, mais on laisse au cas où
      }
      return km;
    }

    // Pré-calcul et enrichissement des features
    if (!window.VR) console.error("VR.js n'a pas chargé la variable globale 'VR'.");
    const features = (window.VR?.features || []).map(f => {
      const km = getFeatureLengthKm(f);
      return {
        ...f,
        properties: { ...f.properties, __km: km }
      };
    });

    // --- Popups & interactions ---
    function popupHtml(feature){
      const name = feature?.properties?.name || "Tronçon";
      const km = feature?.properties?.__km || 0;
      const hours = km / Math.max(1, ui.avgSpeedKmh);
      const html = `
        <div class="popup">
          <div class="title">${name}</div>
          <div class="badges">
            <span class="badge">Distance&nbsp;: ${formatKm(km)}</span>
            <span class="badge badge--muted">Temps estimé&nbsp;: ${formatTime(hours)}</span>
            <span class="badge badge--muted">Vitesse&nbsp;: ${ui.avgSpeedKmh} km/h</span>
          </div>
        </div>
      `;
      return html;
    }

    function onEachFeature(feature, layer) {
      // bind popup à l'ouverture (pour refléter la vitesse courante)
      layer.on('popupopen', (e) => {
        e.popup.setContent(popupHtml(feature));
      });
      // survol
      layer.on({
        mouseover: (e) => {
          e.target.setStyle({ weight: 6, opacity: 1 });
          e.target.bringToFront();
        },
        mouseout: (e) => {
          e.target.setStyle({ weight: 4, opacity: 0.95 });
        },
        click: (e) => {
          // ouverture centrée
          e.target.bindPopup(popupHtml(feature), { maxWidth: 320 }).openPopup();
        }
      });
    }

    // Couche "casing" (halo) en dessous
    const vrCasing = L.geoJSON({ ...VR, features }, {
      style: styleCasing,
      interactive: false
    }).addTo(map);

    // Couche colorée au-dessus
    const vrLine = L.geoJSON({ ...VR, features }, {
      style: styleLine,
      onEachFeature
    }).addTo(map);

    // Contrôles de couches
    L.control.layers(
      { "CyclOSM (vélo)": baseCyclOSM, "OpenStreetMap": baseOSM },
      { "ViaRhôna (tronçons)": L.layerGroup([vrCasing, vrLine]) },
      { collapsed: false }
    ).addTo(map);

    // Adapter la vue aux données
    try {
      const bounds = vrLine.getBounds();
      if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
      else map.setView([46.2, 6.2], 9);
    } catch (e) {
      map.setView([46.2, 6.2], 9);
    }

    // Total km
    const totalKm = features.reduce((s,f)=> s + (f.properties?.__km || 0), 0);
    const totalEl = document.getElementById('totalDistance');
    if (totalEl) totalEl.textContent = `Distance totale des tronçons visibles : ${formatKm(totalKm)}`;
  </script>
</body>
</html>
