const WIDTH = 720;
const HEIGHT = 240;
const PAD_LEFT = 36;
const PAD_RIGHT = 12;
const PAD_TOP = 14;
const PAD_BOTTOM = 26;

function formatShortDate(iso) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${d.toLocaleString("en-GB", { month: "short" })}`;
}

function buildPath(series, key, xScale, yScale) {
  return series
    .map((point, i) => `${i === 0 ? "M" : "L"}${xScale(i)},${yScale(point[key])}`)
    .join(" ");
}

export default function HistoryChart({ series, incidentStartDay, incidentEndDay }) {
  if (!series || series.length === 0) return null;

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const maxValue = Math.max(
    ...series.map((p) => Math.max(p.observed, p.ignisEyeBaseline, p.plainBaseline, p.threshold))
  );
  const yMax = Math.ceil((maxValue * 1.1) / 5) * 5 || 5;

  const xScale = (i) =>
    PAD_LEFT + (series.length === 1 ? 0 : (i / (series.length - 1)) * plotWidth);
  const yScale = (v) => PAD_TOP + plotHeight - (v / yMax) * plotHeight;

  const gridLines = [0, 0.25, 0.5, 0.75, 1].map((frac) => ({
    y: PAD_TOP + plotHeight * (1 - frac),
    value: Math.round(yMax * frac),
  }));

  const hasIncident = incidentStartDay != null && incidentEndDay != null;
  const incidentX1 = hasIncident ? xScale(incidentStartDay) : null;
  const incidentX2 = hasIncident ? xScale(incidentEndDay) : null;

  const labelIdxs = [0, Math.floor((series.length - 1) / 2), series.length - 1];

  return (
    <div className="history-chart">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height={HEIGHT} role="img">
        {gridLines.map((g) => (
          <g key={g.value}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={g.y}
              y2={g.y}
              stroke="#e3e8ec"
              strokeWidth="1"
            />
            <text x={PAD_LEFT - 6} y={g.y + 3} textAnchor="end" className="history-chart__axis-label">
              {g.value}
            </text>
          </g>
        ))}

        {hasIncident && (
          <rect
            x={incidentX1}
            y={PAD_TOP}
            width={incidentX2 - incidentX1}
            height={plotHeight}
            fill="#b3261e"
            fillOpacity="0.08"
          />
        )}

        <path
          d={buildPath(series, "threshold", xScale, yScale)}
          fill="none"
          stroke="#b3261e"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <path
          d={buildPath(series, "plainBaseline", xScale, yScale)}
          fill="none"
          stroke="#8a94a0"
          strokeWidth="1.5"
          strokeDasharray="2 3"
        />
        <path
          d={buildPath(series, "ignisEyeBaseline", xScale, yScale)}
          fill="none"
          stroke="#102535"
          strokeWidth="1.75"
        />
        <path
          d={buildPath(series, "observed", xScale, yScale)}
          fill="none"
          stroke="#f26a10"
          strokeWidth="2"
        />

        {labelIdxs.map((i) => (
          <text
            key={i}
            x={xScale(i)}
            y={HEIGHT - 6}
            textAnchor={i === 0 ? "start" : i === series.length - 1 ? "end" : "middle"}
            className="history-chart__axis-label"
          >
            {formatShortDate(series[i].date)}
          </text>
        ))}
      </svg>

      <div className="history-chart__legend">
        <span className="history-chart__legend-item">
          <svg width="16" height="8" className="history-chart__swatch">
            <line x1="0" y1="4" x2="16" y2="4" stroke="#f26a10" strokeWidth="2.5" />
          </svg>
          Observed thermal activity
        </span>
        <span className="history-chart__legend-item">
          <svg width="16" height="8" className="history-chart__swatch">
            <line x1="0" y1="4" x2="16" y2="4" stroke="#102535" strokeWidth="2.5" />
          </svg>
          IgnisEye baseline
        </span>
        <span className="history-chart__legend-item">
          <svg width="16" height="8" className="history-chart__swatch">
            <line x1="0" y1="4" x2="16" y2="4" stroke="#8a94a0" strokeWidth="2" strokeDasharray="2 2" />
          </svg>
          Plain baseline
        </span>
        <span className="history-chart__legend-item">
          <svg width="16" height="8" className="history-chart__swatch">
            <line x1="0" y1="4" x2="16" y2="4" stroke="#b3261e" strokeWidth="2" strokeDasharray="4 3" />
          </svg>
          Abnormal threshold
        </span>
        {hasIncident && (
          <span className="history-chart__legend-item">
            <svg width="16" height="8" className="history-chart__swatch">
              <rect x="0" y="0" width="16" height="8" fill="#b3261e" fillOpacity="0.25" />
            </svg>
            Incident period
          </span>
        )}
      </div>
    </div>
  );
}
