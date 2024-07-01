
import React, { useState } from 'react';
import MapDisplay from './components/MapDisplay';
import "./App.css";
// import Cloud  from "./components/cloud.jpg"

const App = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [location, setLocation] = useState({ lat: 13.084622, lng: 80.248357 });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (lat && lon) {
      setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
    }
  };

  const handleSearch = (query) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setLat(data[0].lat);
          setLon(data[0].lon);
        }
      });
  };

  return (
    <div className="app-container">
      <div className="card">
        <h1>Location Input Form</h1>
        <form onSubmit={handleFormSubmit} className="inputform">
          <label>
            Latitude:
            <input
              type="text"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Enter latitude"
            />
          </label>
          <label>
            Longitude:
            <input
              type="text"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Enter longitude"
            />
          </label>
          <label>
            Search Location:
            <input
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search location"
            />
          </label>
          <button type="submit">Update Location</button>
        </form>
      </div>
      <div className="map-container">
        <MapDisplay location={location} />
      </div>
    </div>
  );
};

export default App;

