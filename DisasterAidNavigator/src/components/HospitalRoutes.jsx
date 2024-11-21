import React, { useState, useEffect } from 'react';
import { Polyline, Popup } from 'react-leaflet';

const RoutesPath = ({ userlocation, hospitallocation }) => {
    const [routeCoordinates, setRouteCoordinates] = useState(null);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(null);

    function decodePolyline(str, precision = 5) {
        let index = 0;
        let lat = 0;
        let lng = 0;
        const coordinates = [];
        let shift = 0;
        let result = 0;
        let byte = null;
        let latitude_change;
        let longitude_change;
        const factor = Math.pow(10, precision);

        while (index < str.length) {
            byte = null;
            shift = 0;
            result = 0;

            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            shift = result = 0;

            do {
                byte = str.charCodeAt(index++) - 63;
                result |= (byte & 0x1f) << shift;
                shift += 5;
            } while (byte >= 0x20);

            longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

            lat += latitude_change;
            lng += longitude_change;

            coordinates.push([lat / factor, lng / factor]);
        }

        return coordinates;
    }

    const fetchRoutes = async () => {
        const API_KEY = '5b3ce3597851110001cf624898b8332429074284946d2e52994116ff';

        try {
            const response = await fetch('https://api.openrouteservice.org/v2/directions/foot-walking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': API_KEY
                },
                body: JSON.stringify({
                    instructions: "true",
                    coordinates: [
                        [userlocation.lon, userlocation.lat],
                        [hospitallocation.lon, hospitallocation.lat]
                    ],
                    alternative_routes: {
                        target_count: 3,
                        weight_factor: 2,
                        share_factor: 0.6
                    },
                    preference: "recommended",
                    options: {
                        avoid_features: [],
                        avoid_borders: "none"
                    }
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} - ${data.error?.message || 'Unknown error'}`);
            }

            const processedRoutes = data.routes.map((route) => {
                const coordinates = decodePolyline(route.geometry);
                return {
                    coordinates,
                    summary: route.summary
                };
            });

            processedRoutes.sort((a, b) => 
                (a.summary?.distance || 0) - (b.summary?.distance || 0)
            );

            setRouteCoordinates(processedRoutes);
        } catch (err) {
            console.error("Error fetching routes", err);
        }
    };

    useEffect(() => {
        fetchRoutes();
    }, [userlocation, hospitallocation]);

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

    const handleRouteClick = (index) => {
        setSelectedRouteIndex(index);
    };

    return (
        <>
            {routeCoordinates && routeCoordinates.map((route, index) => {
                const opacity = routeCoordinates.length > 1 
                    ? 1 - (index * 0.5) 
                    : 1;

                return (
                    <Polyline 
                        key={index}
                        positions={route.coordinates}
                        color={selectedRouteIndex === index ? 'red' : 'blue'}
                        weight={selectedRouteIndex === index ? 4 : 3}
                        opacity={opacity}
                        interactive={true}
                        eventHandlers={{
                            click: () => handleRouteClick(index)
                        }}
                    >
                        {route.summary && (
                            <Popup>
                                <div>
                                    <strong>Route Details:</strong>
                                    <p>Distance: {formatDistance(route.summary.distance)}</p>
                                    <p>Estimated Time: {formatDuration(route.summary.duration)}</p>
                                </div>
                            </Popup>
                        )}
                    </Polyline>
                );
            })}
        </>
    );
}

export default RoutesPath;