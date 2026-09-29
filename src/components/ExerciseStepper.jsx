export default function ExerciseStepper({ steps, activeIndex }) {
  return (
    <ol className="stepper">
      {steps.map((step, i) => (
        <li
          className={
            "stepper__step" + (activeIndex != null && i === activeIndex ? " is-active" : "")
          }
          key={step}
        >
          <span className="stepper__node">{i + 1}</span>
          <span className="stepper__label">{step}</span>
        </li>
      ))}
    </ol>
  );
}
