import {
  MapContainer,
  TileLayer,
  Marker,
  // Popup
} from "react-leaflet";
import { truckIcon } from "./MaptruckIcon";
import { type ReactNode } from "react";

interface MapProps {
  latitude: number;
  longitude: number;
  mapHeight: string;
  mapWidth: string;
  truckLatitude?: number;
  truckLongitude?: number;
  zoom?: number;
  pins?: Array<{ lat: number; lng: number }>;
  children?: ReactNode;
}

const Map = ({
  latitude,
  longitude,
  mapHeight,
  mapWidth,
  truckLatitude,
  truckLongitude,
  zoom = 13,
  children,
}: MapProps) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: mapHeight, width: mapWidth, overflow: "hidden" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {truckLatitude && truckLongitude && (
        <Marker position={[truckLatitude, truckLongitude]} icon={truckIcon} />
      )}
      {children}
    </MapContainer>
  );
};

export default Map;
