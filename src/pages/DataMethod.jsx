const SCREEN_CATEGORIES = [
  { screen: "Situation Map", category: "Demo data" },
  { screen: "Site Analysis", category: "Demo data + Computed (reference classification, decision)" },
  { screen: "Site History", category: "Computed (derived from demo data)" },
  { screen: "Persistent Thermal Source Register", category: "Demo data" },
  { screen: "Alerts", category: "Demo data" },
  { screen: "Exercise Mode (E1 / E2 / E3, CAP preview)", category: "Simulated" },
  { screen: "20 m Facility View", category: "Demo data (facility/site) + Simulated (evidence panel)" },
];

const DECISION_TABLE = [
  { type: "Industrial", routine: "Persistent Thermal Source / register", abnormal: "Industrial Fire / alert" },
  { type: "Natural", routine: "Recorded", abnormal: "Alert if threatening a facility" },
  { type: "Unknown", routine: "Analyst review", abnormal: "Unverified source alert" },
];

const IMPLEMENTED = [
  "Government-style dashboard shell, navigation and prototype/exercise banners",
  "Situation Map with an interactive Leaflet map, filters and a locally bundled marker set",
  "Site Analysis with reference classification, reasons and decision text",
  "Site History with an observed-vs-baseline chart and the long-event baseline comparison",
  "Persistent Thermal Source Register with search, sort, filter and view",
  "Alerts list with severity/status and site linking",
  "Exercise Mode: scenarios E1–E3 with step walkthroughs and a CAP alert preview (view/download)",
  "20 m Facility View evidence panel (schematic, clearly marked as simulated)",
  "Cross-screen selected-site consistency via shared state",
];

const NOT_IMPLEMENTED = [
  "Trained ML model, XGBoost, neural networks or SHAP-based explanations",
  "Model accuracy, precision, recall, F1 or confidence figures of any kind",
  "Live FIRMS, INSAT, Gemini or news-feed ingestion",
  "Real satellite/Earth Engine imagery",
  "Backend, API layer, database or authentication",
  "Real CAP alert dispatch to any system",
  "Operational deployment of any kind",
];

export default function DataMethod() {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Data &amp; Method</div>
          <div className="page-subtitle">
            How this prototype's data and logic should be interpreted
          </div>
        </div>
      </div>

      <div className="card">
        <h3>Data sources</h3>
        <p>
          This prototype is frontend-only and reads exclusively from local JSON files in{" "}
          <code>src/data/</code> (sites, facilities, histories, register, alerts,
          exercises). Nothing is fetched from a network at runtime.
        </p>
        <p style={{ marginBottom: 0 }}>
          In a full deployment, the equivalent inputs would be NASA FIRMS thermal
          detections, OpenStreetMap-derived facility/infrastructure data, and satellite
          imagery (for example Sentinel-2 or INSAT). None of those live sources are
          connected here.
        </p>
      </div>

      <div className="card">
        <h3>Reference classification logic</h3>
        <p>
          Each site's type (Industrial / Natural / Unknown) and status (Routine /
          Abnormal) are pre-assigned in the demo dataset to represent what a rules-based
          reference step would conclude: proximity to a registered facility supports an
          Industrial classification, a vegetation/forest-area pattern supports Natural,
          and no match leaves a site Unknown rather than forcing it into a known class.
        </p>
        <table className="data-table" style={{ marginTop: 8 }}>
          <thead>
            <tr>
              <th>Source type</th>
              <th>Routine</th>
              <th>Abnormal</th>
            </tr>
          </thead>
          <tbody>
            {DECISION_TABLE.map((row) => (
              <tr key={row.type}>
                <td>{row.type}</td>
                <td>{row.routine}</td>
                <td>{row.abnormal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Behaviour logic</h3>
        <p style={{ marginBottom: 0 }}>
          Site History compares observed activity against two baselines. A plain baseline
          keeps averaging in recent activity, so a long-running incident is gradually
          re-absorbed into "normal" and its alert would be silently dropped. The IgnisEye
          baseline excludes the active incident period from that calculation, so an
          abnormal status — and its alert — stay in force for the full duration of the
          event. This is demonstrated on the demo per-site history data (Site History)
          and again, independently, using simulated data in Exercise E1.
        </p>
      </div>

      <div className="card">
        <h3>Decision logic</h3>
        <p style={{ marginBottom: 0 }}>
          The "Decision" shown on Site Analysis, the Register's "Current status" column
          and each Alert are read directly from the demo dataset — they are the
          precomputed output of the reference classification and behaviour rules above,
          not a live computation and not a model output. No confidence score, probability
          or accuracy figure is attached to any decision in this prototype.
        </p>
      </div>

      <div className="card">
        <h3>Demo / simulation status</h3>
        <p>
          <span className="data-status-tag">Demo data</span> Pre-created data used for
          prototype demonstration.
        </p>
        <p>
          <span className="data-status-tag">Computed</span> Values generated by
          deterministic prototype logic from demo data (for example, the baselines in
          Site History).
        </p>
        <p style={{ marginBottom: 0 }}>
          <span className="data-status-tag">Simulated</span> Artificial scenarios used
          only in Exercise Mode and the 20 m Facility View evidence panel, built to
          demonstrate a capability the normal demo dataset does not otherwise show.
          Simulated content is never presented as a real incident or real imagery.
        </p>
      </div>

      <div className="card">
        <h3>Content category by screen</h3>
        <p>
          This prototype contains no live or real-world data feed — everything on screen
          falls into one of the three categories above. The table below shows which
          category (or mix) backs each screen.
        </p>
        <table className="data-table category-table" style={{ marginTop: 8 }}>
          <thead>
            <tr>
              <th>Screen</th>
              <th>Content category</th>
            </tr>
          </thead>
          <tbody>
            {SCREEN_CATEGORIES.map((row) => (
              <tr key={row.screen}>
                <td>{row.screen}</td>
                <td>{row.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <h3>Current prototype vs planned system</h3>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong>Current demo</strong>
            <ul>
              <li>Reference rules</li>
              <li>Precomputed data</li>
              <li>Local dashboard</li>
            </ul>
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <strong>Planned system</strong>
            <ul>
              <li>Trained classifier</li>
              <li>Live FIRMS / INSAT ingestion</li>
              <li>Threat calibration</li>
              <li>Government deployment</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card">
        <h3>What is implemented in this prototype</h3>
        <ul className="method-list">
          {IMPLEMENTED.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h3>What is not implemented</h3>
        <ul className="method-list">
          {NOT_IMPLEMENTED.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
