"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type DeliveryTrackingMapProps = {
  latitude: number;
  longitude: number;
};



const driverIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export function DeliveryTrackingMap({
  latitude,
  longitude,
}: DeliveryTrackingMapProps) {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-2xl">
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        scrollWheelZoom
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[latitude, longitude]}
          icon={driverIcon}
        />
      </MapContainer>
    </div>
  );
}