import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import sites from "../data/sites.json";
import histories from "../data/histories.json";
import HistoryChart from "../components/HistoryChart.jsx";
import { useSelectedSite } from "../context/SelectedSiteContext.jsx";

export default function SiteHistory() {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const { selectedSiteId, setSelectedSiteId } = useSelectedSite();

  const activeSiteId = siteId || selectedSiteId;
  const site = activeSiteId ? sites.find((s) => s.id === activeSiteId) : null;
  const history = activeSiteId ? histories[activeSiteId] : null;

  useEffect(() => {
    if (siteId && siteId !== selectedSiteId) {
      setSelectedSiteId(siteId);
    }
  }, [siteId, selectedSiteId, setSelectedSiteId]);

  function handlePickSite(e) {
    const id = e.target.value;
    if (!id) return;
    navigate(`/site-history/${id}`);
  }

  const reabsorptionDate =
    history?.hasIncident && history.series[Math.min(history.incidentStartDay + 10, history.incidentEndDay)]
      ? history.series[Math.min(history.incidentStartDay + 10, history.incidentEndDay)].date
      : null;

  return (
    <div>
      <div className="page-header">
        <div className="site-analysis-header" style={{ width: "100%" }}>
          <div>
            <div className="page-title">Site History</div>
            <div className="page-subtitle">
              {site ? `${site.id} · ${site.state}` : "No site selected"}
            </div>
          </div>
          <div className="site-picker">
            <label className="field-label" htmlFor="history-site-picker" style={{ marginBottom: 0 }}>
              Site
            </label>
            <select
              id="history-site-picker"
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

      {!site || !history ? (
        <div className="placeholder-note">
          No site selected. Choose a site above, or select one from the Situation Map,
          Site Analysis or the Register.
        </div>
      ) : (
        <>
          <div className="card">
            <div className="site-id-row">
              <span className="site-id-row__id">{site.id}</span>
              <span className={`badge badge--${site.type}`}>{site.referenceClassification}</span>
              <span className={site.status === "abnormal" ? "badge badge--abnormal" : "badge badge--routine"}>
                {site.status === "abnormal" ? "Abnormal" : "Routine"}
              </span>
              <span className="data-status-tag">Computed</span>
            </div>
            <p className="page-subtitle" style={{ margin: "4px 0 12px 0" }}>
              Thermal activity over the last {history.days} days, compared against the
              site's own historical baseline.
            </p>

            <HistoryChart
              series={history.series}
              incidentStartDay={history.incidentStartDay}
              incidentEndDay={history.incidentEndDay}
            />
          </div>

          {history.hasIncident ? (
            <div className="card">
              <div className="classification-block__label">Long-event baseline comparison</div>
              <div className="baseline-compare">
                <div className="baseline-compare__block baseline-compare__block--plain">
                  <div className="baseline-compare__title">Plain baseline</div>
                  <div className="baseline-compare__value">
                    Alert lost after Day 10{reabsorptionDate ? ` (${reabsorptionDate})` : ""}
                  </div>
                  <p className="page-subtitle" style={{ margin: "6px 0 0 0" }}>
                    A baseline that keeps averaging in recent activity gradually re-absorbs a
                    sustained incident into "normal," and the alert would be dropped even
                    though the incident is still active.
                  </p>
                </div>
                <div className="baseline-compare__block baseline-compare__block--ignis">
                  <div className="baseline-compare__title">IgnisEye baseline</div>
                  <div className="baseline-compare__value">Alert maintained until incident end</div>
                  <p className="page-subtitle" style={{ margin: "6px 0 0 0" }}>
                    IgnisEye excludes the active incident period from the baseline
                    calculation, so the abnormal status — and the alert — remain in force
                    for the full duration of the event.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="placeholder-note">
              No abnormal incident recorded for this site — activity has stayed within its
              historical baseline throughout the observed period.
            </div>
          )}
        </>
      )}
    </div>
  );
}
