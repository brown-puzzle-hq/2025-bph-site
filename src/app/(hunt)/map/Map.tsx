"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import L, { LatLngBounds } from "leaflet";

export default function Map() {
  const bounds = new LatLngBounds([0, 0], [1000, 1000]);
  const colorlayout = "/map/Map-Layout-by-Section.png";
  const layout = "/map/Map-Layout.png";
  const buildings = "map/Map-Buildings.png";
  return (
    <MapContainer
      center={[500, 500]}
      zoom={2}
      minZoom={1.25}
      maxZoom={3.5}
      maxBounds={bounds}
      maxBoundsViscosity={1.0}
      crs={L.CRS.Simple} // Tells Leaflet to use simple coordinate system
      scrollWheelZoom={false}
      style={{ background: "white", zIndex: 10 }}
      className="h-[calc(100vh-56px-32px)] w-screen focus:outline-none"
    >
      <ImageOverlay url={colorlayout} bounds={bounds} />
      {/* <ImageOverlay url={layout} bounds={bounds} /> */}
      <ImageOverlay url={buildings} bounds={bounds} />
      <Marker position={[579, 490]}>
        <Popup>sayles</Popup>
      </Marker>
      <Marker position={[475, 413]}>
        <Popup>ratty</Popup>
      </Marker>
      <Marker
        position={[483, 160]}
        icon={
          new L.Icon({
            iconUrl: "/map/cloud.png",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          })
        }
      >
        <Popup>keeney</Popup>
      </Marker>
      <Marker position={[740, 365]}>
        <Popup>museum</Popup>
      </Marker>
      <Marker position={[320, 575]}>
        <Popup>bdh</Popup>
      </Marker>
      <Marker position={[560, 699]}>
        <Popup>scili</Popup>
      </Marker>
    </MapContainer>
  );
}
