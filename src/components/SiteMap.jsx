import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { siteIcon, facilityIcon } from "../utils/mapIcons.js";

// India-wide bounding box (approximate), used as the fixed map extent.
const INDIA_BOUNDS = L.latLngBounds([6, 66], [38, 98]);

function FitBounds() {
  const map = useMap();
  const didFit = useRef(false);
  useEffect(() => {
    if (!didFit.current) {
      map.fitBounds(INDIA_BOUNDS, { padding: [12, 12] });
      didFit.current = true;
    }
  }, [map]);
  return null;
}

export default function SiteMap({ sites, facilities, selectedSiteId, onSelectSite }) {
  return (
    <MapContainer
      bounds={INDIA_BOUNDS}
      maxBounds={INDIA_BOUNDS.pad(0.15)}
      minZoom={4}
      maxZoom={18}
      className="site-map"
      attributionControl={true}
      zoomControl={true}
    >
      <FitBounds />

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {facilities.map((f) => (
        <Marker key={f.id} position={[f.lat, f.lon]} icon={facilityIcon()} zIndexOffset={-100}>
          <Tooltip direction="top" offset={[0, -20]}>
            <strong>{f.name}</strong>
            <br />
            Registered facility — {f.type}
          </Tooltip>
        </Marker>
      ))}

      {sites.map((site) => (
        <Marker
          key={site.id}
          position={[site.lat, site.lon]}
          icon={siteIcon(site.type, site.status === "abnormal")}
          eventHandlers={{ click: () => onSelectSite(site.id) }}
          zIndexOffset={site.id === selectedSiteId ? 200 : 0}
        >
          <Tooltip direction="top" offset={[0, -26]}>
            <strong>{site.id}</strong> — {site.referenceClassification}
            <br />
            {site.status === "abnormal" ? "Abnormal" : "Routine"} · {site.state}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
