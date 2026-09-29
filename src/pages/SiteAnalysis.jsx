import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import sites from "../data/sites.json";
import facilities from "../data/facilities.json";
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

function statusLabel(site) {
  if (site.type === "unknown") return "Unknown";
  return site.status === "abnormal" ? "Abnormal" : "Routine";
}

function statusBadgeClass(site) {
  if (site.type === "unknown") return "badge badge--unknown";
  return site.status === "abnormal" ? "badge badge--abnormal" : "badge badge--routine";
}

export default function SiteAnalysis() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { selectedSiteId, setSelectedSiteId } = useSelectedSite();

  const activeSiteId = siteId || selectedSiteId;
  const site = activeSiteId ? sites.find((s) => s.id === activeSiteId) : null;
  const facility = site?.facilityId
    ? facilities.find((f) => f.id === site.facilityId)
    : null;

  useEffect(() => {
    if (siteId && siteId !== selectedSiteId) {
      setSelectedSiteId(siteId);
    }
  }, [siteId, selectedSiteId, setSelectedSiteId]);

  function handlePickSite(e) {
    const id = e.target.value;
    if (!id) return;
    navigate(`/site-analysis/${id}`);
  }

  return (
    <div>
      <div className="page-header">
        <div className="site-analysis-header" style={{ width: "100%" }}>
          <div>
            <div className="page-title">Site Analysis</div>
            <div className="page-subtitle">
              {site ? `${site.state} · ${site.district}` : "No site selected"}
            </div>
          </div>
          <div className="site-picker">
            <label className="field-label" htmlFor="site-picker-select" style={{ marginBottom: 0 }}>
              Site
            </label>
            <select
              id="site-picker-select"
              className="select-input"
              value={site ? site.id : ""}
              onChange={handlePickSite}
            >
              <option value="" disabled>
                Select a site…
              </option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.id} — {s.referenceClassification} ({s.state})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!site ? (
        <div className="placeholder-note">
          No site selected. Choose a site above, or select one from the Situation Map.
        </div>
      ) : (
        <>
          <div className="card">
            <div className="site-id-row">
              <span className="site-id-row__id">{site.id}</span>
              <span className={`badge badge--${site.type}`}>
                {site.referenceClassification}
              </span>
              <span className={statusBadgeClass(site)}>{statusLabel(site)}</span>
              <span className="site-id-row__links">
                <Link to={`/site-history/${site.id}`} className="btn">
                  View history
                </Link>
                <Link to="/register" className="btn">
                  View in register
                </Link>
                {facility && (
                  <Link to={`/facility-view/${facility.id}`} className="btn">
                    View 20 m evidence
                  </Link>
                )}
              </span>
            </div>

            <div className="classification-block">
              <div className="classification-block__label">Reference classification</div>
              <div className="classification-block__value">{site.referenceClassification}</div>
            </div>

            <div className="detail-grid">
              <div className="detail-grid__item">
                <dt>Coordinates</dt>
                <dd>
                  {site.lat.toFixed(4)}, {site.lon.toFixed(4)}
                </dd>
              </div>
              <div className="detail-grid__item">
                <dt>State</dt>
                <dd>{site.state}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Detection count</dt>
                <dd>{site.detectionCount}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Active days</dt>
                <dd>{site.activeDays}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Facility match</dt>
                <dd>{facility ? facility.name : "None"}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Registry source</dt>
                <dd>{site.registrySource}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Approx. distance</dt>
                <dd>{site.approxDistanceKm != null ? `${site.approxDistanceKm} km` : "—"}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Last observed</dt>
                <dd>{formatDate(site.lastObserved)}</dd>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="classification-block__label">Reasons</div>
            <ul className="reason-list">
              {site.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <div
              className={
                "decision-block" + (site.status === "abnormal" ? " decision-block--alert" : "")
              }
            >
              <div className="decision-block__label">Decision</div>
              <div className="decision-block__value">{site.decision}</div>
            </div>
          </div>

          {facility && (
            <div className="card">
              <div className="classification-block__label">Facility context</div>
              <p>
                <strong>{facility.name}</strong> — {facility.type}, {facility.district},{" "}
                {facility.state}
              </p>
              <p className="page-subtitle" style={{ margin: 0 }}>
                Facility coordinates: {facility.lat.toFixed(4)}, {facility.lon.toFixed(4)}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
