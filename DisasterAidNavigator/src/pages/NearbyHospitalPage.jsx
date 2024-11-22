import React from 'react';
import { useState, useEffect } from 'react';
import Map from '../components/Map';

export default function HospitalPage() {
  const [userLocation, setUserLocation] = useState(null);

  const[weatherData, setWeatherData]=useState(null)
  const [error, setError] = useState(null);
  const city='Kalanki'
  const apiKey = "d0143d8fca60ecdd9951fa6fbd7b4245";
  


      
  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log(`Fetching weather data for ${city}...`);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Weather data successfully fetched:', data);

        setWeatherData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error.message);
        setError(`Error fetching weather data: ${error.message}`);
      }
    };

    fetchWeatherData();
  }, []); 
  

  useEffect(() => {
    if (userLocation?.latitude && userLocation?.longitude) {
      console.log("User location updated, fetching city data...", userLocation);
      getCityFromCoordinates(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  const handleUserLocationUpdate = (location) => {
    console.log("Received location update:", location);
    setUserLocation(location);
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">DisasterAid</h1>
        </div>
        <nav className="flex-1 p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <i className="fas fa-map"></i>
            <span>Disaster Map</span>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-shield-alt"></i>
            <span>Hospital Maps</span>
          </div>
{weatherData && (
  <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto absolute bottom-7">
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-4">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800">
          {weatherData.name}
        </h2>
        <p className="text-gray-600 capitalize">
          {weatherData.weather[0].description}
        </p>
      </div>
    </div>
    <div className="pl-3 text-3xl font-bold text-gray-800">
      {Math.round(weatherData.main.temp)}°C
    </div>
  </div>
</div>
)}
  
        </nav>
      </div>
      
      <Map setUserPosition={handleUserLocationUpdate} />
    </div>
  );
}