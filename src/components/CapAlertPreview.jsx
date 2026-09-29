import { useState } from "react";
import { capToXml, downloadXml } from "../utils/capXml.js";

export default function CapAlertPreview({ alert }) {
  const [showXml, setShowXml] = useState(false);
  const xml = capToXml(alert);

  return (
    <div className="cap-preview">
      <div className="cap-preview__header">
        <span className="cap-preview__title">CAP ALERT — EXERCISE</span>
        <span className="badge badge--abnormal">EXERCISE</span>
      </div>

      <dl className="cap-preview__fields">
        <div className="cap-preview__field">
          <dt>Status</dt>
          <dd>Exercise</dd>
        </div>
        <div className="cap-preview__field">
          <dt>Event</dt>
          <dd>{alert.event}</dd>
        </div>
        <div className="cap-preview__field">
          <dt>Severity</dt>
          <dd>{alert.severityLabel[0] + alert.severityLabel.slice(1).toLowerCase()}</dd>
        </div>
        <div className="cap-preview__field">
          <dt>District</dt>
          <dd>{alert.district}</dd>
        </div>
        <div className="cap-preview__field">
          <dt>Area</dt>
          <dd>{alert.area}</dd>
        </div>
        <div className="cap-preview__field">
          <dt>Effective</dt>
          <dd>{alert.effective}</dd>
        </div>
      </dl>

      <p className="cap-preview__headline">{alert.headline}</p>
      <p className="cap-preview__description">{alert.description}</p>

      <div className="cap-preview__actions">
        <button type="button" className="btn" onClick={() => setShowXml((v) => !v)}>
          {showXml ? "Hide CAP XML" : "View CAP XML"}
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => downloadXml(`${alert.identifier}.xml`, xml)}
        >
          Download CAP XML
        </button>
      </div>

      {showXml && <pre className="cap-preview__xml">{xml}</pre>}

      <p className="cap-preview__disclaimer">
        This is a simulated exercise message for demonstration only. It is not an actual
        government alert and has not been dispatched to any system.
      </p>
    </div>
  );
}
