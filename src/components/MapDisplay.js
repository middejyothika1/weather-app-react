import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import WeatherDisplay from "./WeatherDisplay";
import './MapDisplay.css'; 
import L from 'leaflet';

const MapDisplay = ({ location }) => {
  const [center, setCenter] = useState(location);
  const [markerPosition, setMarkerPosition] = useState(location);
  const [weatherData, setWeatherData] = useState(null);
  const zoomLevel = 9;
  const mapRef = useRef();

  const url = "https://api.maptiler.com/maps/basic-v2/256/{z}/{x}/{y}.png?key=28vPNA6mX5j6YKbwQVPQ";
  const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  useEffect(() => {
    setCenter(location);
    setMarkerPosition(location);
    fetchWeatherData(location.lat, location.lng);
  }, [location]);

  const fetchWeatherData = async (lat, lon) => {
    const apiKey = "19db9f63f6e92167dca6675e8cec1a5b";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(data);
    setWeatherData(data);
  };
  const customIcon = L.icon({
    iconUrl: 'https://e7.pngegg.com/pngimages/791/133/png-clipart-location-pin-logo-orange-map-pin-icons-logos-emojis-pins-thumbnail.png', // Path to your custom icon image
    iconSize: [38, 38], // Size of the icon
    iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -38] // Point from which the popup should open relative to the iconAnchor
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setMarkerPosition(e.latlng);
        setCenter(e.latlng);
        fetchWeatherData(e.latlng.lat, e.latlng.lng);
      },
    });

    return markerPosition ? <Marker position={markerPosition}  icon={customIcon}/> : null;
  };


  

  return (
    <div className="map-display">
      <h1>MapDisplay</h1>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={zoomLevel}
        className="leaflet-map"
        ref={mapRef}
      >
        <TileLayer url={url} attribution={attribution} />
        <LocationMarker />
      </MapContainer>
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default MapDisplay;






