import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ kmlData }) => {
  if (!kmlData || (!kmlData.coordinates.points.length && !kmlData.coordinates.lines.length && !kmlData.coordinates.polygons.length)) {
    return <p className="text-gray-500">Upload a KML file to display the map.</p>;
  }

  return (
    <div className="p-4">
      <MapContainer
        center={[20, 78]}
        zoom={4}
        className="h-[400px] w-full border border-gray-300 rounded-lg"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {kmlData.coordinates.points.map((point, index) => (
          <Marker key={index} position={point} />
        ))}
            
        {kmlData.coordinates.lines.map((path, index) => (
          <Polyline key={index} positions={path} color="blue" />
        ))}

        {kmlData.coordinates.polygons.map((polygon, index) => (
          <Polygon key={index} positions={polygon} color="red" />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
