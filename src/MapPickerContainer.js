import React, { useState, useEffect } from 'react';

const DefaultZoom = 15;

let currentMarker;
const MapPickerContainer = ({ onLocationChange }) => {

  const [clickedLatLng, setClickedLatLng] = useState(null);
  const myLatlng = [33.949771, -83.3722669];

  useEffect(() => {
    console.log("ran");
    if (window.currentMap) {
      window.currentMap.remove();
      window.currentMap = null;
    }
    window.currentMap = window.L.map('map').setView(myLatlng, 16);
    window.L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(window.currentMap);

    window.currentMap.on('click', e => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      if (currentMarker) {
        currentMarker.remove();
        currentMarker = null;
      }
      currentMarker = window.L.marker([lat, lng]);
      currentMarker.addTo(window.currentMap);
      onLocationChange(lat, lng);
    })
    
  }, []);


    

  return (
    <div>
         <div id="map" style={{ height: "400px" }}></div>
     
    </div>
  );
}

export default MapPickerContainer;