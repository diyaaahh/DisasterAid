import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import HospitalFinder from './HospitalFinder';

export default function Map() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  function getUserLocation() {
    if ('geolocation' in navigator) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
          setIsLoading(false);
        },
        (err) => {
          setError('Unable to retrieve your location: ' + err.message);
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
    }
  }

  console.log(location);

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className='flex-1 relative'>
      {isLoading && <div>Loading your location...</div>}
      {error && <div>{error}</div>}
      {location && (
        <MapContainer className='map-container'
          center={location ? [location.lat, location.lon] : [51.505, -0.09]} 
          zoom={14} 
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location && (
            <Marker position={[location.lat, location.lon]}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
          <HospitalFinder location={location} />
        </MapContainer>
      )}
    </div>
  );
}