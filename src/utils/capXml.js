// Builds a simplified, illustrative CAP 1.2-shaped XML document for the
// Exercise Mode preview. status is always "Exercise" — CAP's own vocabulary
// includes Exercise precisely for drills like this, so the value is both
// realistic and unambiguous. This is demo output only; nothing is ever sent.

const CAP_SEVERITY = { HIGH: "Severe", MEDIUM: "Moderate", LOW: "Minor" };

function escapeXml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildCapAlert({ id, event, severityLabel, district, area, effective, headline, description }) {
  return {
    identifier: `IGNISEYE-EXERCISE-${id}`,
    event,
    severityLabel,
    capSeverity: CAP_SEVERITY[severityLabel] || "Unknown",
    district,
    area,
    effective,
    headline,
    description,
  };
}

export function capToXml(alert) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<alert xmlns="urn:oasis:names:tc:emergency:cap:1.2">
  <identifier>${escapeXml(alert.identifier)}</identifier>
  <sender>ignis-eye-prototype@exercise.local</sender>
  <sent>${escapeXml(alert.effective)}</sent>
  <status>Exercise</status>
  <msgType>Alert</msgType>
  <scope>Public</scope>
  <info>
    <category>Fire</category>
    <event>${escapeXml(alert.event)}</event>
    <urgency>Immediate</urgency>
    <severity>${escapeXml(alert.capSeverity)}</severity>
    <certainty>Observed</certainty>
    <effective>${escapeXml(alert.effective)}</effective>
    <headline>${escapeXml(alert.headline)}</headline>
    <description>${escapeXml(alert.description)}</description>
    <area>
      <areaDesc>${escapeXml(alert.area)}, ${escapeXml(alert.district)}</areaDesc>
    </area>
  </info>
</alert>
`;
}

export function downloadXml(filename, xmlText) {
  const blob = new Blob([xmlText], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
