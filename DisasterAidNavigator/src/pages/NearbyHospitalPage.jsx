import React from 'react';
import { useState, useEffect } from 'react';
import Map from '../components/Map';
import { useHospitalContext } from '../context/HospitalContext'
import { useRouteContext } from '../context/RouteContext'

export default function HospitalPage() {
  const [userLocation, setUserLocation] = useState(null);

  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null);
  const city = 'Kalanki'
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

  const { currentHospital } = useHospitalContext();
  const { availableRoute } = useRouteContext();

  console.log(currentHospital)

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours} hr ${minutes} min`;
    }
    return `${minutes} min`;
  };

  const formatDistance = (meters) => {
    return (meters / 1000).toFixed(1) + ' km';
  };

  function checkCall() {
    if (!navigator.userAgent.match(/Mobi/)) {
      alert("This feature is only available on mobile devices.");
    }
  }

  return (
    <div className="flex h-screen">
      <div className="w-3/12 bg-gray-900 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold">DisasterAid</h1>
        </div>


        <nav className="flex-1 p-4 space-y-4">

          {currentHospital && (
            !currentHospital.id ? (
              <div className="p-6 text-gray-400 text-center bg-gray-800 rounded-lg mt-4">
                <span className="text-lg">Please Select a Hospital</span>
              </div>
            ) : (
              <div className="p-6 space-y-6 bg-gray-800 rounded-lg mt-4">
                {/* Hospital Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h3 className="text-lg font-semibold text-white">{currentHospital.name}</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-gray-300">{currentHospital.website}</p>
                  </div>
                </div>

                {/* Available Routes */}
                {availableRoute && availableRoute.length > 0 && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-white flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <span>Available Routes</span>
                    </h2>
                    <div className="space-y-3">
                      {availableRoute.map((route, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition-colors duration-200">
                          <div className="flex justify-between items-center">
                            <span className="text-blue-400 font-medium">Route {index + 1}</span>
                          </div>
                          <div className="mt-3 grid grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                              </svg>
                              <span className="text-gray-300">{formatDistance(route.summary.distance)}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-gray-300">{formatDuration(route.summary.duration)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <a  href="tel:+977 9842136211" onClick={checkCall}>Call Us 📞</a>
              </div>
            )
          )}

          {weatherData && (
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 mx-1 mb-4 border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                    <h2 className="text-lg font-semibold text-white">
                      {weatherData.name}
                    </h2>
                  </div>
                  <p className="text-gray-400 capitalize text-sm">
                    {weatherData.weather[0].description}
                  </p>
                </div>
                <div className="text-3xl font-bold text-white flex items-center">
                  {Math.round(weatherData.main.temp)}
                  <span className="text-white">°C</span>
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