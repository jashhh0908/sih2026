import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import sites from "../data/sites.json";
import facilities from "../data/facilities.json";
import SiteMap from "../components/SiteMap.jsx";
import { useSelectedSite } from "../context/SelectedSiteContext.jsx";
import { pinSvg, NAVY, GREEN, GREY, RED, AMBER } from "../utils/mapIcons.js";

const LEGEND_ITEMS = [
  { label: "Industrial", color: NAVY },
  { label: "Natural", color: GREEN },
  { label: "Unknown", color: GREY },
  { label: "Abnormal", color: RED },
  { label: "Registered facility", color: AMBER },
];

const TYPE_OPTIONS = ["industrial", "natural", "unknown"];
const STATUS_OPTIONS = ["routine", "abnormal"];
const STATE_OPTIONS = [...new Set(sites.map((s) => s.state))].sort();

const EMPTY_FILTERS = { search: "", type: "", state: "", status: "" };

export default function SituationMap() {
  const navigate = useNavigate();
  const { selectedSiteId, setSelectedSiteId } = useSelectedSite();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const thermalDetections = sites.reduce((sum, s) => sum + s.detectionCount, 0);
  const persistentSources = sites.filter(
    (s) => s.type === "industrial" && s.status === "routine"
  ).length;
  const abnormalEpisodes = sites.filter((s) => s.status === "abnormal").length;

  const filteredSites = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    return sites.filter((site) => {
      if (filters.type && site.type !== filters.type) return false;
      if (filters.state && site.state !== filters.state) return false;
      if (filters.status && site.status !== filters.status) return false;
      if (search) {
        const haystack = `${site.id} ${site.facilityName || ""}`.toLowerCase();
        if (!haystack.includes(search)) return false;
      }
      return true;
    });
  }, [filters]);

  function updateFilter(key, value) {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }

  function resetFilters() {
    setFilters(EMPTY_FILTERS);
  }

  function handleSelectSite(siteId) {
    setSelectedSiteId(siteId);
    navigate(`/site-analysis/${siteId}`);
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Situation Map</div>
          <div className="page-subtitle">
            Regional map of thermal sites and registered facilities
          </div>
        </div>
        <span className="data-status-tag">Demo data</span>
      </div>

      <div className="stat-row">
        <div className="stat-tile">
          <div className="stat-tile__value">{thermalDetections}</div>
          <div className="stat-tile__label">Thermal detections</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__value">{sites.length}</div>
          <div className="stat-tile__label">Sites</div>
        </div>
        <div className="stat-tile">
          <div className="stat-tile__value">{persistentSources}</div>
          <div className="stat-tile__label">Persistent sources</div>
        </div>
        <div className="stat-tile stat-tile--abnormal">
          <div className="stat-tile__value">{abnormalEpisodes}</div>
          <div className="stat-tile__label">Abnormal episodes</div>
        </div>
      </div>

      <div className="map-layout">
        <aside className="map-filters card">
          <div className="map-filters__title">Filters</div>

          <div className="map-filters__field">
            <label className="field-label" htmlFor="filter-search">
              Search
            </label>
            <input
              id="filter-search"
              className="text-input"
              type="text"
              placeholder="Site ID or facility"
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
            />
          </div>

          <div className="map-filters__field">
            <label className="field-label" htmlFor="filter-type">
              Type
            </label>
            <select
              id="filter-type"
              className="select-input"
              value={filters.type}
              onChange={(e) => updateFilter("type", e.target.value)}
            >
              <option value="">All types</option>
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t[0].toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="map-filters__field">
            <label className="field-label" htmlFor="filter-state">
              State
            </label>
            <select
              id="filter-state"
              className="select-input"
              value={filters.state}
              onChange={(e) => updateFilter("state", e.target.value)}
            >
              <option value="">All states</option>
              {STATE_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className="map-filters__field">
            <label className="field-label" htmlFor="filter-status">
              Status
            </label>
            <select
              id="filter-status"
              className="select-input"
              value={filters.status}
              onChange={(e) => updateFilter("status", e.target.value)}
            >
              <option value="">All statuses</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s[0].toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <button type="button" className="btn" onClick={resetFilters}>
            Reset filters
          </button>
        </aside>

        <div className="map-panel">
          <div className="map-result-count">
            Showing {filteredSites.length} of {sites.length} sites · {facilities.length}{" "}
            registered facilities
          </div>

          <SiteMap
            sites={filteredSites}
            facilities={facilities}
            selectedSiteId={selectedSiteId}
            onSelectSite={handleSelectSite}
          />

          <div className="map-legend">
            {LEGEND_ITEMS.map((item) => (
              <span className="map-legend__item" key={item.label}>
                <span
                  className="map-legend__swatch"
                  dangerouslySetInnerHTML={{ __html: pinSvg(item.color, 16) }}
                />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
