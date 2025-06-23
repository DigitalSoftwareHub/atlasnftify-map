const map = L.map('map').setView([20, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);
const gridSize = 5;
for (let lat = -85; lat < 85; lat += gridSize) {
  for (let lng = -180; lng < 180; lng += gridSize) {
    const bounds = [[lat, lng], [lat + gridSize, lng + gridSize]];
    L.rectangle(bounds, {
      color: "#ff7800",
      weight: 0.5,
      fillOpacity: 0.05,
    }).addTo(map);
  }
}
const premiumAreas = [
  { name: "Hollywood Hills", latStart: 34.09, lngStart: -118.45, width: 0.2, height: 0.2, rows: 5, cols: 5 },
  { name: "Wembley", latStart: 51.56, lngStart: -0.28, width: 0.5, height: 0.5, rows: 1, cols: 1 }
];
premiumAreas.forEach(area => {
  for (let i = 0; i < area.rows; i++) {
    for (let j = 0; j < area.cols; j++) {
      const lat = area.latStart + i * area.height;
      const lng = area.lngStart + j * area.width;
      const bounds = [[lat, lng], [lat + area.height, lng + area.width]];
      L.rectangle(bounds, {
        color: "gold",
        weight: 1,
        fillOpacity: 0.2
      })
      .addTo(map)
      .bindPopup("<b>" + area.name + "</b><br>Special Area");
    }
  }
});
fetch('./vip_tile_locations.json')
  .then(response => {
    if (!response.ok) throw new Error("VIP JSON konnte nicht geladen werden.");
    return response.json();
  })
  .then(vipLocations => {
    vipLocations.forEach(loc => {
      if (!loc.name || !loc.lat || !loc.lng || typeof loc.tile_size_deg === 'undefined') return;
      const tileSize = parseFloat(loc.tile_size_deg);
      if (isNaN(tileSize)) return;
      const bounds = [[loc.lat, loc.lng], [loc.lat + tileSize, loc.lng + tileSize]];
      const color = loc.importance === "high" ? "gold" : "orange";
      L.rectangle(bounds, {
        color: color,
        weight: 1,
        fillOpacity: 0.3
      })
      .addTo(map)
      .bindPopup(
        "<strong>" + loc.name + "</strong><br>" +
        "Type: " + loc.type + "<br>" +
        "Size: " + tileSize + "°<br>" +
        "Importance: " + loc.importance
      );
    });
  })
  .catch(err => {
    console.error("Fehler beim Laden der VIP-Kacheln:", err);
  });
