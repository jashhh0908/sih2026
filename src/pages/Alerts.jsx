import { useNavigate } from "react-router-dom";
import alerts from "../data/alerts.json";
import { useSelectedSite } from "../context/SelectedSiteContext.jsx";

function formatDate(iso) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short" });
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${year} ${hh}:${mm} IST`;
}

function severityBadgeClass(severity) {
  if (severity === "HIGH") return "badge badge--severity-high";
  if (severity === "MEDIUM") return "badge badge--severity-medium";
  return "badge badge--severity-low";
}

export default function Alerts() {
  const navigate = useNavigate();
  const { setSelectedSiteId } = useSelectedSite();

  function handleViewSite(siteId) {
    setSelectedSiteId(siteId);
    navigate(`/site-analysis/${siteId}`);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Alerts</div>
          <div className="page-subtitle">{alerts.length} prototype alerts — demo data</div>
        </div>
        <span className="data-status-tag">Demo data</span>
      </div>

      <div className="placeholder-note" style={{ marginBottom: 12 }}>
        These are prototype alerts generated from demonstration data using reference
        classification logic. They are not live incidents.
      </div>

      <div className="alert-list">
        {alerts.map((alert) => (
          <div className="alert-card" key={alert.id}>
            <div className="alert-card__header">
              <span className="alert-card__id">{alert.id}</span>
              <span className="alert-card__title">{alert.title}</span>
              <span className="badge badge--abnormal">{alert.status}</span>
              <span className={severityBadgeClass(alert.severity)}>{alert.severity}</span>
            </div>

            <div className="detail-grid">
              <div className="detail-grid__item">
                <dt>Site</dt>
                <dd>{alert.siteId}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Facility</dt>
                <dd>{alert.facilityName || "None"}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>State</dt>
                <dd>{alert.state}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Detected</dt>
                <dd>{formatDate(alert.detectedAt)}</dd>
              </div>
            </div>

            <div className="alert-card__reason">
              <div className="classification-block__label">Reason</div>
              <p style={{ margin: 0 }}>{alert.reason}</p>
            </div>

            <div className="alert-card__actions">
              <button type="button" className="btn" onClick={() => handleViewSite(alert.siteId)}>
                View site
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
