// Schematic stand-in for a 20 m satellite close-up. No real imagery is
// available in this offline prototype, so a generic, clearly-labelled
// diagram is shown instead of fabricating facility-specific imagery.
export default function EvidencePanel() {
  return (
    <div className="evidence-panel">
      <svg viewBox="0 0 400 260" width="100%" height="260" role="img">
        <defs>
          <pattern id="hatch" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#d5dce2" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="0" y="0" width="400" height="260" fill="url(#hatch)" />

        <rect
          x="40"
          y="30"
          width="320"
          height="200"
          fill="#ffffff"
          stroke="#5f6b76"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />
        <text x="48" y="24" className="evidence-panel__label">
          Facility boundary (indicative)
        </text>

        <rect x="70" y="70" width="70" height="45" fill="#eef2f5" stroke="#8a94a0" />
        <rect x="160" y="60" width="50" height="90" fill="#eef2f5" stroke="#8a94a0" />
        <rect x="230" y="140" width="90" height="50" fill="#eef2f5" stroke="#8a94a0" />

        <rect
          x="165"
          y="95"
          width="38"
          height="30"
          fill="none"
          stroke="#c94b08"
          strokeWidth="2.5"
        />
        <circle cx="184" cy="110" r="3" fill="#c94b08" />
        <text x="184" y="145" textAnchor="middle" className="evidence-panel__hot-label">
          Hot unit (indicative)
        </text>

        <g transform="translate(340,45)">
          <line x1="0" y1="16" x2="0" y2="0" stroke="#17212b" strokeWidth="1.5" />
          <polygon points="0,0 -4,8 4,8" fill="#17212b" />
          <text x="0" y="28" textAnchor="middle" className="evidence-panel__label">
            N
          </text>
        </g>

        <g transform="translate(56,214)">
          <line x1="0" y1="0" x2="40" y2="0" stroke="#17212b" strokeWidth="1.5" />
          <line x1="0" y1="-3" x2="0" y2="3" stroke="#17212b" strokeWidth="1.5" />
          <line x1="40" y1="-3" x2="40" y2="3" stroke="#17212b" strokeWidth="1.5" />
          <text x="20" y="16" textAnchor="middle" className="evidence-panel__label">
            ≈ 20 m
          </text>
        </g>
      </svg>

      <div className="evidence-panel__banner">SIMULATED EVIDENCE — NOT REAL IMAGERY</div>
    </div>
  );
}
