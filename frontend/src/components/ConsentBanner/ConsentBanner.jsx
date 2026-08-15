import "../../styles/ConsentBanner.css";

export default function ConsentBanner({ elapsedLabel, onEndSession }) {
  return (
    <div className="cb-banner" role="status" aria-live="polite">
      <div className="cb-left">
        <span className="cb-dot" aria-hidden="true" />
        <span className="cb-text">Aura is listening</span>
        {elapsedLabel && <span className="cb-elapsed"> · {elapsedLabel}</span>}
      </div>
      <button type="button" className="cb-end-btn" onClick={onEndSession}>
        End Session
      </button>
    </div>
  );
}
