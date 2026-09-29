import { Link, useParams } from "react-router-dom";
import exercises from "../data/exercises.json";
import ExerciseStepper from "../components/ExerciseStepper.jsx";
import FireApproachDiagram from "../components/FireApproachDiagram.jsx";
import CapAlertPreview from "../components/CapAlertPreview.jsx";
import { buildCapAlert } from "../utils/capXml.js";

const DEMO_EFFECTIVE = "29 Sep 2026 12:00 IST";

const E2_STEPS = [
  "Detection",
  "Direction & distance computed",
  "Facility proximity evaluated",
  "Conditional alert",
];

const E3_STEPS = [
  "Detection",
  "No facility match",
  "No known pattern match",
  "Routed for analyst review",
];

function scenarioTeaser(ex) {
  return ex.summary || ex.note || ex.conditionalAlert;
}

function LongEventScenario({ ex }) {
  const alert = buildCapAlert({
    id: ex.id,
    event: "Industrial Fire",
    severityLabel: "HIGH",
    district: ex.state,
    area: ex.facilityName,
    effective: DEMO_EFFECTIVE,
    headline: `EXERCISE — Simulated long-running industrial fire at ${ex.facilityName}`,
    description: ex.summary,
  });

  return (
    <>
      <div className="card">
        <ExerciseStepper steps={ex.sequence} activeIndex={ex.sequence.length - 1} />
        <p style={{ marginTop: 10 }}>{ex.summary}</p>
      </div>

      <div className="card">
        <div className="classification-block__label">Long-event baseline comparison</div>
        <div className="baseline-compare">
          <div className="baseline-compare__block baseline-compare__block--plain">
            <div className="baseline-compare__title">Plain baseline</div>
            <div className="baseline-compare__value">{ex.plainBaselineOutcome}</div>
          </div>
          <div className="baseline-compare__block baseline-compare__block--ignis">
            <div className="baseline-compare__title">IgnisEye baseline</div>
            <div className="baseline-compare__value">{ex.ignisEyeOutcome}</div>
          </div>
        </div>
      </div>

      <div className="card">
        <CapAlertPreview alert={alert} />
      </div>
    </>
  );
}

function ApproachProjectionScenario({ ex }) {
  const alert = buildCapAlert({
    id: ex.id,
    event: "Natural Fire — Facility Threat",
    severityLabel: "HIGH",
    district: ex.state,
    area: ex.facilityName,
    effective: DEMO_EFFECTIVE,
    headline: "EXERCISE — Simulated fire front approaching facility",
    description: `${ex.conditionalAlert} ${ex.disclaimer}`,
  });

  return (
    <>
      <div className="card">
        <ExerciseStepper steps={E2_STEPS} activeIndex={E2_STEPS.length - 1} />

        <FireApproachDiagram
          direction={ex.fireFrontDirection}
          distanceKm={ex.distanceKm}
          arrivalWindow={ex.indicativeArrivalWindow}
          facilityName={ex.facilityName}
        />

        <div className="detail-grid">
          <div className="detail-grid__item">
            <dt>Facility</dt>
            <dd>{ex.facilityName}</dd>
          </div>
          <div className="detail-grid__item">
            <dt>Fire-front direction</dt>
            <dd>{ex.fireFrontDirection}</dd>
          </div>
          <div className="detail-grid__item">
            <dt>Distance</dt>
            <dd>{ex.distanceKm} km</dd>
          </div>
          <div className="detail-grid__item">
            <dt>Indicative arrival window</dt>
            <dd>{ex.indicativeArrivalWindow}</dd>
          </div>
        </div>
      </div>

      <div className="card">
        <div
          className="decision-block decision-block--alert"
          style={{ marginBottom: 10 }}
        >
          <div className="decision-block__label">Decision</div>
          <div className="decision-block__value">{ex.conditionalAlert}</div>
        </div>
        <p className="page-subtitle" style={{ margin: 0 }}>{ex.disclaimer}</p>
      </div>

      <div className="card">
        <CapAlertPreview alert={alert} />
      </div>
    </>
  );
}

function UnknownSourceScenario({ ex }) {
  return (
    <div className="card">
      <ExerciseStepper steps={E3_STEPS} activeIndex={E3_STEPS.length - 1} />

      <div className="detail-grid" style={{ marginTop: 10 }}>
        <div className="detail-grid__item">
          <dt>State</dt>
          <dd>{ex.state}</dd>
        </div>
        <div className="detail-grid__item">
          <dt>Facility match</dt>
          <dd>None</dd>
        </div>
        <div className="detail-grid__item">
          <dt>Status</dt>
          <dd>{ex.status}</dd>
        </div>
      </div>

      <div className="decision-block" style={{ marginTop: 12 }}>
        <div className="decision-block__label">Decision</div>
        <div className="decision-block__value">{ex.action}</div>
      </div>

      <p className="page-subtitle" style={{ marginTop: 10 }}>{ex.note}</p>
    </div>
  );
}

function ScenarioDetail({ ex }) {
  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">
            {ex.code} — {ex.name}
          </div>
          <div className="page-subtitle">{ex.banner}</div>
        </div>
        <Link to="/exercise" className="btn">
          Back to Exercise Mode
        </Link>
      </div>

      {ex.kind === "long-event" && <LongEventScenario ex={ex} />}
      {ex.kind === "approach-projection" && <ApproachProjectionScenario ex={ex} />}
      {ex.kind === "unknown-source" && <UnknownSourceScenario ex={ex} />}
    </div>
  );
}

export default function Exercise() {
  const { scenarioId } = useParams();
  const scenario = scenarioId ? exercises.find((e) => e.id === scenarioId) : null;

  if (scenarioId && scenario) {
    return <ScenarioDetail ex={scenario} />;
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <div className="page-title">Exercise Mode</div>
          <div className="page-subtitle">Simulated scenarios — not real events</div>
        </div>
        <span className="data-status-tag">Simulated</span>
      </div>

      {scenarioId && !scenario ? (
        <div className="placeholder-note">Unknown scenario "{scenarioId}".</div>
      ) : null}

      <div className="exercise-grid">
        {exercises.map((ex) => (
          <div className="card exercise-card" key={ex.id}>
            <div className="exercise-card__code">{ex.code}</div>
            <div className="exercise-card__name">{ex.name}</div>
            <p className="page-subtitle">{scenarioTeaser(ex)}</p>
            <Link to={`/exercise/${ex.id}`} className="btn btn--primary">
              Open scenario
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
