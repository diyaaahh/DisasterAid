import React, { useEffect, useState } from 'react';
import { MapContainer,Marker,Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

const HeatmapLayer = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const heatLayer = L.heatLayer(points, {
        radius: 9,
        blur: 25,
        maxZoom: 17,
        gradient: {
          0.2: 'blue',
          0.4: 'lime',
          0.6: 'yellow',
          0.8: 'orange',
          1.0: 'red',
        },
      });

      heatLayer.addTo(map);

      return () => {
        map.removeLayer(heatLayer);
      };
    }
  }, [points, map]);

  return null;
};
const Legend = () => (
  <div style={{
    position: 'absolute',
    bottom: '20px',
    left: '20px',
    backgroundColor: 'white',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000
  }}>
    <h4>Risk Levels</h4>
    <div><span style={{ background: 'blue', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>Low</div>
    <div><span style={{ background: 'green', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>Moderate</div>
    <div><span style={{ background: 'yellow', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>High</div>
    <div><span style={{ background: 'red', width: '10px', height: '10px', display: 'inline-block', marginRight: '5px' }}></span>Severe</div>
  </div>
);

const DisasterHeatmap = () => {
  const [center, setCenter] = useState([27.7172, 85.324]); // Default: Kathmandu28.2104° N, 84.7420° E
  const [disasterPoints, setDisasterPoints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisasterData = async () => {
      try {
        // Fetch current location
        let currentLocation;
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject)
          );
          currentLocation = [position.coords.latitude, position.coords.longitude];
          // currentLocation = [27.6194, 85.5388];
          setCenter(currentLocation);
        } else {
          console.warn('Could not get current location. Using default.');
          currentLocation = [27.7172, 85.324];           
        }

        // Overpass API query for disaster-prone features
        const overpassQuery = `
          [out:json][timeout:25];
          (
            // Flood-prone areas
            way["waterway"="river"](around:1000,${currentLocation[0]},${currentLocation[1]});
            way["natural"="water"](around:1000,${currentLocation[0]},${currentLocation[1]});
            
            // Landslide-prone areas
            way["natural"="cliff"](around:2000,${currentLocation[0]},${currentLocation[1]});
            way["natural"="ridge"](around:2000,${currentLocation[0]},${currentLocation[1]});
            
            // Earthquake fault lines
            way["geological"="fault"](around:2000,${currentLocation[0]},${currentLocation[1]});
          );
          out body;
          >;
          out skel qt;
        `;

        const encodedQuery = encodeURIComponent(overpassQuery);
        const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Parse data into [lat, lon, intensity]
        const points = [];
        data.elements.forEach((element) => {
          if (element.type === 'node' && element.lat && element.lon) {
            points.push([element.lat, element.lon, 0.7]); // Default intensity
          } else if (element.type === 'way' && element.nodes) {
            element.nodes.forEach((nodeId) => {
              const node = data.elements.find((n) => n.id === nodeId && n.type === 'node');
              if (node) {
                points.push([node.lat, node.lon, 0.5]); // Moderate intensity
              }
            });
          }
        });

        setDisasterPoints(points);
      } catch (err) {
        console.error('Error fetching disaster data:', err);
        setError(err.message);
      }
    };

    fetchDisasterData();
  }, []);

  function checkCall() {
    if (!navigator.userAgent.match(/Mobi/)) {
      alert("This feature is only available on mobile devices.");
    }
  }

  return (


    
    <div className="h-screen w-full">
      <MapContainer center={center} zoom={13} className="h-full map-container w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

      <Marker position={center}>
          <Popup>You are here</Popup>
        </Marker>
        {disasterPoints.length > 0 && <HeatmapLayer points={disasterPoints} />}
        {error && <div className="absolute top-0 left-0 bg-red-500 text-white p-2">{error}</div>}

        
      </MapContainer>
      <Legend />
      <a href="tel:+977 9842136211" onClick={checkCall}>Call Us</a>

    </div>
  );
};

export default DisasterHeatmap;
