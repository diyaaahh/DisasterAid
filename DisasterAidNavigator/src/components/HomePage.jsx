import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapMarker.css';

const createCustomIcon = (animate) => {
  return L.divIcon({
    className: `custom-marker-icon ${animate ? 'marker-enter' : 'marker-leave'}`,
    html: `
      <div class="marker-icon-wrapper">
        <div class="marker-icon"></div>
        <div class="marker-pulse"></div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

function LocationFocuser({ position, zoom = 13 }) {
  const map = useMap();
  
  useEffect(() => {
    if (position) {
      map.setView(position, zoom, {
        animate: true,
        duration: 1 
      });
    }
  }, [position, map, zoom]);
  
  return null;
}

export default function HomePage() {
  const [position, setPosition] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [error, setError] = useState(null);
  const [markerAnimate, setMarkerAnimate] = useState(true);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    setPosition([lat, lng]);
    setAccuracy(accuracy);
    setError(null);
    
    // Stop marker animation after a few seconds
    setTimeout(() => {
      setMarkerAnimate(false);
    }, 3000);
  };

  const handleError = (err) => {
    console.error(err);
    if (err.code === 1) {
      setError("Please allow geolocation access");
    } else if (err.code === 2) {
      setError("Position unavailable");
    } else if (err.code === 3) {
      setError("Geolocation request timed out");
    } else {
      setError("An unknown error occurred");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success, handleError, options);

    const geoWatch = navigator.geolocation.watchPosition(success, handleError, options);

    return () => {
      navigator.geolocation.clearWatch(geoWatch);
    };
  }, []);

  if (!position) {
    return (
      <div className="flex justify-center items-center h-screen">
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div>Loading location...</div>
        )}
      </div>
    );
  }

  return (
    <MapContainer 
      center={position} 
      zoom={13} 
      style={{ height: '100vh', width: '100%' }}
    >
      <LocationFocuser position={position} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker 
        position={position}
        icon={createCustomIcon(markerAnimate)}
      >
        <Popup>
          You are here! <br />
          Accuracy: {accuracy ? `${accuracy.toFixed(2)} meters` : 'Calculating...'}
        </Popup>
      </Marker>
      {accuracy && (
        <Circle
          center={position}
          radius={accuracy}
          pathOptions={{ 
            color: 'blue', 
            fillColor: 'blue', 
            fillOpacity: 0.2,
          }}
        />
      )}
    </MapContainer>
  );
}