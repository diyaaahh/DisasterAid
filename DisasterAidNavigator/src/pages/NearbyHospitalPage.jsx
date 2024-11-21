import React from 'react'
import Map from '../components/Map'

export default function HospitalPage() {
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
    
        </nav>
      </div>

      <Map/>
    </div>

  )
}
