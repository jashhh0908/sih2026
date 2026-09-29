import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import register from "../data/register.json";
import { useSelectedSite } from "../context/SelectedSiteContext.jsx";

const TYPE_OPTIONS = [...new Set(register.map((r) => r.type))].sort();
const STATE_OPTIONS = [...new Set(register.map((r) => r.state))].sort();

const COLUMNS = [
  { key: "siteId", label: "Site ID" },
  { key: "facility", label: "Facility" },
  { key: "type", label: "Type" },
  { key: "state", label: "State" },
  { key: "activeDays", label: "Active days" },
  { key: "detections", label: "Detections" },
  { key: "currentStatus", label: "Current status" },
  { key: "lastObserved", label: "Last observed" },
];

function formatDate(iso) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-GB", { month: "short" });
  return `${day} ${month} ${d.getFullYear()}`;
}

export default function Register() {
  const navigate = useNavigate();
  const { selectedSiteId, setSelectedSiteId } = useSelectedSite();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [sort, setSort] = useState({ key: "siteId", direction: "asc" });

  const selectedRowRef = useRef(null);

  useEffect(() => {
    if (selectedSiteId && selectedRowRef.current) {
      selectedRowRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [selectedSiteId]);

  const rows = useMemo(() => {
    const term = search.trim().toLowerCase();
    let filtered = register.filter((r) => {
      if (typeFilter && r.type !== typeFilter) return false;
      if (stateFilter && r.state !== stateFilter) return false;
      if (term) {
        const haystack = `${r.siteId} ${r.facility}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });
    filtered = [...filtered].sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      let cmp;
      if (typeof av === "number" && typeof bv === "number") {
        cmp = av - bv;
      } else {
        cmp = String(av).localeCompare(String(bv));
      }
      return sort.direction === "asc" ? cmp : -cmp;
    });
    return filtered;
  }, [search, typeFilter, stateFilter, sort]);

  function toggleSort(key) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  }

  function handleView(siteId) {
    setSelectedSiteId(siteId);
    navigate(`/site-analysis/${siteId}`);
  }

  function resetFilters() {
    setSearch("");
    setTypeFilter("");
    setStateFilter("");
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Persistent Thermal Source Register</div>
          <div className="page-subtitle">{register.length} entries — demo data</div>
        </div>
        <span className="data-status-tag">Demo data</span>
      </div>

      <div className="register-controls card">
        <div className="register-controls__field">
          <label className="field-label" htmlFor="register-search">
            Search
          </label>
          <input
            id="register-search"
            className="text-input"
            type="text"
            placeholder="Site ID or facility"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="register-controls__field">
          <label className="field-label" htmlFor="register-type">
            Type
          </label>
          <select
            id="register-type"
            className="select-input"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All types</option>
            {TYPE_OPTIONS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div className="register-controls__field">
          <label className="field-label" htmlFor="register-state">
            State
          </label>
          <select
            id="register-state"
            className="select-input"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
          >
            <option value="">All states</option>
            {STATE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button type="button" className="btn" onClick={resetFilters}>
          Reset filters
        </button>
      </div>

      <div className="map-result-count">
        Showing {rows.length} of {register.length} register entries
      </div>

      <div className="card" style={{ padding: 0, overflowX: "auto" }}>
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className="data-table__sortable"
                >
                  {col.label}
                  {sort.key === col.key ? (sort.direction === "asc" ? " ▲" : " ▼") : ""}
                </th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.siteId}
                ref={row.siteId === selectedSiteId ? selectedRowRef : null}
                className={row.siteId === selectedSiteId ? "is-selected" : ""}
              >
                <td>{row.siteId}</td>
                <td>{row.facility}</td>
                <td>{row.type}</td>
                <td>{row.state}</td>
                <td>{row.activeDays}</td>
                <td>{row.detections}</td>
                <td>{row.currentStatus}</td>
                <td>{formatDate(row.lastObserved)}</td>
                <td>
                  <button type="button" className="btn" onClick={() => handleView(row.siteId)}>
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
