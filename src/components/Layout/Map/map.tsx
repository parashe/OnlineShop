import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface MapProps {
  initialLatLng: [number, number];
}

const Map: React.FC<MapProps> = ({ initialLatLng }) => {
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        if (!mapRef.current) {
          mapRef.current = L.map("map").setView(initialLatLng, 16);

          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
            maxZoom: 18,
          }).addTo(mapRef.current);

          // Create a custom icon with CSS styling
          const customIcon = L.divIcon({
            className: "custom-marker", // CSS class for the custom marker

            iconSize: [30, 30], // Adjust the size as needed
          });

          // Add the marker with the custom icon to the map
          L.marker(initialLatLng, { icon: customIcon })
            .addTo(mapRef.current)
            .bindPopup("<b>Hello, World!</b><br>We are in West Bromwich.")
            .openPopup();
        }
      });
    }
  }, [initialLatLng]);

  return <div id="map" style={{ height: "700px" }} />;
};

export default Map;
