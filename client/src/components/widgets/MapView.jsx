import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// 기본 아이콘 설정을 삭제하지 않아도 됩니다.
// Leaflet은 기본적으로 아이콘 경로를 설정합니다.

const surfSpots = [
  { name: 'Spot 1', lat: 37.5665, lon: 126.9780, conditions: 'Good' },
  { name: 'Spot 2', lat: 37.5705, lon: 126.9760, conditions: 'Moderate' },
  { name: 'Spot 3', lat: 37.5685, lon: 126.9820, conditions: 'Excellent' },
  // Add more spots as needed
];

const MapView = ({ latitude, longitude }) => {
  return (
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "500px", width: "100%" }} id="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {surfSpots.map((spot, index) => (
        <Marker key={index} position={[spot.lat, spot.lon]}>
          <Popup>
            <strong>{spot.name}</strong><br />
            Conditions: {spot.conditions}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
