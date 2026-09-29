export default function FireApproachDiagram({ direction, distanceKm, arrivalWindow, facilityName }) {
  return (
    <div className="approach-diagram">
      <svg viewBox="0 0 640 130" width="100%" height="130" role="img">
        <line
          x1="70"
          y1="65"
          x2="560"
          y2="65"
          stroke="#b3261e"
          strokeWidth="2"
          strokeDasharray="6 5"
        />
        <polygon points="560,58 578,65 560,72" fill="#b3261e" />

        <circle cx="50" cy="65" r="16" fill="#b3261e" />
        <text x="50" y="70" textAnchor="middle" className="approach-diagram__icon-label">
          F
        </text>

        <rect x="586" y="49" width="32" height="32" fill="#102535" />
        <text x="602" y="70" textAnchor="middle" className="approach-diagram__icon-label">
          FAC
        </text>

        <text x="315" y="45" textAnchor="middle" className="approach-diagram__caption">
          {distanceKm} km · {direction}
        </text>
        <text x="315" y="95" textAnchor="middle" className="approach-diagram__caption">
          Indicative arrival window: {arrivalWindow}
        </text>

        <text x="50" y="105" textAnchor="middle" className="approach-diagram__node-label">
          Fire front
        </text>
        <text x="602" y="105" textAnchor="middle" className="approach-diagram__node-label">
          {facilityName}
        </text>
      </svg>
    </div>
  );
}
