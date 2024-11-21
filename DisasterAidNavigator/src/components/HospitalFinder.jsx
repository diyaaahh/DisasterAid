import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import MarkerUrl from "../assets/hospital-marker.png";
import L from "leaflet";
import RoutesPath from './hospitalRoutes';

const HospitalFinder = ({ location }) => {
    const [hospitals, setHospitals] = useState([]);
    const [error, setError] = useState(null);
    const [selectedHospital, setSelectedHospital] = useState({
        id: null,
        lat: null,
        lon: null
    });

    const fetchHospitals = async () => {
        if (!location) return;

        try {
            const query = `
            [out:json][timeout:25];
            (
              node["amenity"="hospital"](around:5000,${location.lat},${location.lon});
              way["amenity"="hospital"](around:5000,${location.lat},${location.lon});
              relation["amenity"="hospital"](around:5000,${location.lat},${location.lon});
            );
            out body;
            >;
            out skel qt;
          `;
            const encodedQuery = encodeURIComponent(query);
            const response = await fetch(`https://overpass-api.de/api/interpreter?data=${encodedQuery}`);

            if (!response.ok) {
                throw new Error('Failed to fetch hospital data');
            }

            const data = await response.json();
            console.log(data);

            const hospitalData = data.elements
                .filter(el => el.type === 'node' && el.tags)
                .map(el => ({
                    id: el.id,
                    name: el.tags.name || 'Unnamed Hospital',
                    lat: el.lat,
                    lon: el.lon,
                    address: el.tags['addr:full'] || el.tags.address || 'No address available',
                    phone: el.tags.phone || 'No phone number available',
                    website: el.tags.website || 'No website available'
                }));

            setHospitals(hospitalData);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
        }
    };

    useEffect(() => {
        fetchHospitals();
    }, [location]);

    const customicon = L.icon({
        iconUrl: MarkerUrl,
        iconSize: [40, 40],
        iconAnchor: [25, 50],
    });

    const handleMarkerClick = (hospitalId, lat, lon) => {
        setSelectedHospital(prev => 
            prev.id === hospitalId 
                ? { id: null, lat: null, lon: null } 
                : { id: hospitalId, lat, lon }
        );
    };

    return (
        <>
            {hospitals.map(hospital => (
                (selectedHospital.id === null || selectedHospital.id === hospital.id) && (
                    <Marker
                        key={hospital.id}
                        position={[hospital.lat, hospital.lon]}
                        icon={customicon}
                        eventHandlers={{
                            click: () => handleMarkerClick(hospital.id, hospital.lat, hospital.lon)
                        }}
                    >
                        <Popup>
                            <div>
                                <h3>{hospital.name}</h3>
                                {selectedHospital.id === hospital.id && (
                                    <RoutesPath 
                                        userlocation={location} 
                                        hospitallocation={{
                                            lat: hospital.lat, 
                                            lon: hospital.lon,
                                        }}
                                    />
                                )}
                            </div>
                        </Popup>
                    </Marker>
                )
            ))}
            {error && <div className="text-red-500">{error}</div>}
        </>
    );
};

export default HospitalFinder;