"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { MapContainer, Marker, Tooltip, ImageOverlay } from "react-leaflet";
import L, { LatLngBounds } from "leaflet";

const markers: { name: string; id: string; position: L.LatLngExpression }[] = [
  {
    name: "Example",
    id: "example",
    position: [579, 490],
  },
  {
    name: "Example",
    id: "example",
    position: [475, 413],
  },
];

export default function Map() {
  const bounds = new LatLngBounds([0, 0], [1000, 1000]);
  const colorlayout = "/map/Map-Layout-by-Section.png";
  const buildings = "map/Map-Buildings.png";
  return (
    <MapContainer
      center={[500, 500]}
      zoom={2}
      minZoom={1.25}
      maxZoom={3.5}
      maxBounds={bounds}
      crs={L.CRS.Simple}
      preferCanvas={true}
      scrollWheelZoom={false}
      markerZoomAnimation={true}
      style={{ background: "white", zIndex: 10 }}
      className="h-[calc(100vh-56px-32px)] w-screen focus:outline-none"
    >
      <ImageOverlay url={colorlayout} bounds={bounds} />
      <ImageOverlay url={buildings} bounds={bounds} />
      {markers.map((marker, index) => (
        <Marker
          title=""
          key={index}
          position={marker.position}
          icon={
            new L.Icon({
              iconUrl: `map/sprites/${marker.id}.png`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
            })
          }
          eventHandlers={{
            click: () => window.open(`puzzle/${marker.id}`, "_blank"),
          }}
        >
          <Tooltip direction="bottom">{marker.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
