const map = L.map('map').setView([20, 0], 2); // Weltkarte zentrieren

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors',
}).addTo(map);

// Beispiel-Grid generieren
const gridSize = 10; // 10 Grad in jede Richtung

for (let lat = -80; lat < 80; lat += gridSize) {
  for (let lng = -180; lng < 180; lng += gridSize) {
    const bounds = [[lat, lng], [lat + gridSize, lng + gridSize]];
    const rect = L.rectangle(bounds, {
      color: "#ff7800",
      weight: 1,
      fillOpacity: 0.05,
    }).addTo(map);

    rect.on('click', () => {
      L.popup()
        .setLatLng(rect.getBounds().getCenter())
        .setContent(`
          <strong>Tile:</strong><br>
          Lat: ${lat}, Lng: ${lng}<br>
          <button onclick="alert('Später: Kaufen oder Spenden')">Feld kaufen</button>
        `)
        .openOn(map);
    });
  }
}
