import L from "leaflet";

// Restrained, government-palette pin colours. One colour per category;
// shape stays a single standard map pin for every marker.
export const NAVY = "#102535";
export const GREEN = "#2a6b3c";
export const GREY = "#5f6b76";
export const RED = "#b3261e";
export const AMBER = "#f5a000";
export const WHITE = "#ffffff";

// Standard "location pin" glyph (24x24 viewBox), used for every marker.
const PIN_PATH =
  "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z";

export function pinSvg(color, size) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="${PIN_PATH}" fill="${color}" stroke="#ffffff" stroke-width="1" />
    <circle cx="12" cy="9" r="2.6" fill="${WHITE}" />
  </svg>`;
}

function pinDivIcon(color, size) {
  return L.divIcon({
    html: pinSvg(color, size),
    className: "ignis-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size - 1],
    popupAnchor: [0, -size],
  });
}

export function categoryColor(type, isAbnormal) {
  if (isAbnormal) return RED;
  if (type === "industrial") return NAVY;
  if (type === "natural") return GREEN;
  return GREY;
}

export function siteIcon(type, isAbnormal) {
  return pinDivIcon(categoryColor(type, isAbnormal), 30);
}

export function facilityIcon() {
  return pinDivIcon(AMBER, 22);
}
