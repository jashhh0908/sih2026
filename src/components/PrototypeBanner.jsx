import { useLocation } from "react-router-dom";

export default function PrototypeBanner() {
  const location = useLocation();
  const isExercise = location.pathname.startsWith("/exercise");

  if (isExercise) {
    return (
      <div className="proto-banner proto-banner--exercise">
        <strong>EXERCISE</strong>
        <span>— Simulated scenario. Not a real event.</span>
      </div>
    );
  }

  return (
    <div className="proto-banner">
      <strong>PROTOTYPE</strong>
      <span>— Reference classification logic. No trained model or accuracy claim is used in this demonstration.</span>
    </div>
  );
}
