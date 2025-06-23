const gridSize = 5; // Standardgröße

const premiumAreas = [
  {
    name: "Hollywood Hills",
    latStart: 34.09,
    lngStart: -118.45,
    width: 0.2, // kleinere Kacheln
    height: 0.2,
    rows: 5,
    cols: 5,
  },
  {
    name: "Wembley",
    latStart: 51.56,
    lngStart: -0.28,
    width: 0.5, // größere Fläche
    height: 0.5,
    rows: 1,
    cols: 1,
  }
];

// Standardgrid (großflächig)
for (let lat = -85; lat < 85; lat += gridSize) {
  for (let lng = -180; lng < 180; lng += gridSize) {
    const bounds = [[lat, lng], [lat + gridSize, lng + gridSize]];
    L.rectangle(bounds, { color: "#ff7800", weight: 1, fillOpacity: 0.05 }).addTo(map);
  }
}

// Individuelle Premiumgrids
premiumAreas.forEach(area => {
  for (let i = 0; i < area.rows; i++) {
    for (let j = 0; j < area.cols; j++) {
      const lat = area.latStart + i * area.height;
      const lng = area.lngStart + j * area.width;
      const bounds = [[lat, lng], [lat + area.height, lng + area.width]];
      L.rectangle(bounds, { color: "gold", weight: 1, fillOpacity: 0.2 }).addTo(map);
    }
  }
});
