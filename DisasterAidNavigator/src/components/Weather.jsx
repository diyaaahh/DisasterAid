import React, { useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const apiKey = "d0143d8fca60ecdd9951fa6fbd7b4245"; 
  const [latitude, longitude] = [27.6891355, 85.289791]; // Coordinates for location


// Get the user's current location (latitude and longitude)
navigator.geolocation.getCurrentPosition(function(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Build the URL for OpenWeatherMap API using the live location
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  // Fetch weather data
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Parse and log the weather information
      console.log('Weather:', data.weather[0].description);
      console.log('Temperature:', data.main.temp + '°C');
      console.log('Humidity:', data.main.humidity + '%');
      console.log('Wind Speed:', data.wind.speed + ' m/s');
      console.log('Location:', data.name);
    })
    .catch(error => console.log('Error fetching weather data:', error));

}, function(error) {
  // Handle error if geolocation fails (e.g., permission denied or unavailable)
  console.log('Error getting location:', error);
});

  return (
    <div style={{ padding: "20px", color: "black" }}>
      <h1>Weather App</h1>
      <button 
        onClick={fetchWeather} 
        style={{ padding: "10px 20px", margin: "10px 0", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Get Weather
      </button>

      {weather && (
        <div style={{ marginTop: "20px", backgroundColor: "#f0f0f0", padding: "20px", borderRadius: "5px" }}>
          <h2>Weather in {weather.name}</h2>
          <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
          <p><strong>Condition:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
