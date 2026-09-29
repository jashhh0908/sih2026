import { Link, useNavigate, useParams } from "react-router-dom";
import facilities from "../data/facilities.json";
import sites from "../data/sites.json";
import EvidencePanel from "../components/EvidencePanel.jsx";

export default function FacilityView() {
  const { facilityId } = useParams();
  const navigate = useNavigate();

  const facility = facilityId ? facilities.find((f) => f.id === facilityId) : null;
  const relatedSites = facility ? sites.filter((s) => facility.siteIds.includes(s.id)) : [];

  function handlePickFacility(e) {
    const id = e.target.value;
    if (!id) return;
    navigate(`/facility-view/${id}`);
  }

  return (
    <div>
      <div className="page-header">
        <div className="site-analysis-header" style={{ width: "100%" }}>
          <div>
            <div className="page-title">20 m Facility View</div>
            <div className="page-subtitle">
              {facility ? `${facility.name} · ${facility.state}` : "No facility selected"}
            </div>
          </div>
          <div className="site-picker">
            <label className="field-label" htmlFor="facility-picker" style={{ marginBottom: 0 }}>
              Facility
            </label>
            <select
              id="facility-picker"
              className="select-input"
              value={facility ? facility.id : ""}
              onChange={handlePickFacility}
            >
              <option value="" disabled>
                Select a facility…
              </option>
              {facilities.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.state})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {!facility ? (
        <div className="placeholder-note">
          No facility selected. Choose a facility above, or open "20 m facility view" from
          an industrial site's Site Analysis page.
        </div>
      ) : (
        <>
          <div className="card">
            <div className="site-id-row">
              <span className="site-id-row__id">{facility.name}</span>
              <span className="data-status-tag">Demo data</span>
            </div>
            <div className="detail-grid">
              <div className="detail-grid__item">
                <dt>Type</dt>
                <dd>{facility.type}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>District</dt>
                <dd>{facility.district}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>State</dt>
                <dd>{facility.state}</dd>
              </div>
              <div className="detail-grid__item">
                <dt>Coordinates</dt>
                <dd>
                  {facility.lat.toFixed(4)}, {facility.lon.toFixed(4)}
                </dd>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="classification-block__label">Relevant thermal source(s)</div>
            {relatedSites.length === 0 ? (
              <p className="page-subtitle" style={{ margin: 0 }}>
                No associated thermal site in the current demo dataset.
              </p>
            ) : (
              <ul className="reason-list" style={{ listStyle: "none" }}>
                {relatedSites.map((s) => (
                  <li key={s.id} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <Link to={`/site-analysis/${s.id}`}>{s.id}</Link>
                    <span className={s.status === "abnormal" ? "badge badge--abnormal" : "badge badge--routine"}>
                      {s.status === "abnormal" ? "Abnormal" : "Routine"}
                    </span>
                    <span className="page-subtitle" style={{ margin: 0 }}>
                      {s.detectionCount} detections · {s.activeDays} active days · last
                      observed {new Date(s.lastObserved).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card">
            <div className="site-id-row">
              <span className="classification-block__label" style={{ margin: 0 }}>
                Evidence panel
              </span>
              <span className="data-status-tag" style={{ marginLeft: "auto" }}>
                Simulated
              </span>
            </div>
            <EvidencePanel />
            <p className="page-subtitle" style={{ marginTop: 10 }}>
              No real satellite imagery is bundled with this offline prototype. The panel
              above is a generic schematic, not imagery of this specific facility. In a
              full deployment, this stage would display precomputed close-up imagery (for
              example Sentinel-2, or an equivalent source) pinpointed to approximately 20 m
              resolution around the detected thermal source — see{" "}
              <Link to="/data-method">Data &amp; Method</Link> for the current-vs-planned
              breakdown.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
