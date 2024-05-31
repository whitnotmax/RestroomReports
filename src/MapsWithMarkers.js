import React, { useRef, useEffect } from 'react';

const MapWithMarkers = ({ coordinates }) => {
  const mapRef = useRef(null);
  const myLatlng = [33.949771, -83.3722669];
  let map;
  let customIcon = window.L.icon({
    iconUrl: `data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="16">${String.fromCodePoint(0x1F4A9)}</text></svg>`, // URL to your custom image
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});
  useEffect(() => {
    if (!map) {
      map = window.L.map('map');
      map.setView(myLatlng, 15);
      
      window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

      console.log("PASSED COORDINATES");
      console.log(coordinates);
      coordinates.forEach(coord => {
        
        window.L.marker([coord.lat, coord.lng], { icon: customIcon }).addTo(map);

      });
    }
  }, []);

  return <div id="map" style={{ height: '800px', width: '100%' }} />;
};

export default MapWithMarkers;
