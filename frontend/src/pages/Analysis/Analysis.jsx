import { useState, useEffect } from "react";
import NavBar, { SettingsIcon } from "../../components/NavBar/NavBar";
import MeltdownProdromeAlert from "../../components/MeltdownProdromeAlert/MeltdownProdromeAlert";
import "../../styles/Analysis.css";

// Static bar-height patterns for the two waveforms. Swap for real
// amplitude data from the backend once vocal analysis is wired up.
const BASELINE_BARS = [
  4, 8, 14, 10, 18, 22, 16, 26, 20, 14, 10, 24, 18, 12, 8, 20, 16, 10, 22, 14,
  8, 18, 12, 6,
];
const ANALYSIS_BARS = [
  6, 16, 10, 24, 14, 30, 20, 12, 26, 18, 8, 22, 32, 14, 10, 28, 16, 24, 12, 20,
  8, 26, 14, 6,
];

const EAL_LEGEND = [
  { range: "80-100%", label: "Authentic", color: "#4ade80" },
  { range: "50-79%", label: "Moderate", color: "#f5a623" },
  { range: "0-49%", label: "High Risk", color: "#e5484d" },
];

const KEY_INDICATORS = [
  {
    id: "pitch_variation",
    label: "Pitch Variation",
    value: "-34%",
    tone: "danger",
    note: "Below baseline",
  },
  {
    id: "speech_rate",
    label: "Speech Rate",
    value: "-12%",
    tone: "warn",
    note: "Slightly slow",
  },
  {
    id: "vocal_tension",
    label: "Vocal Tension",
    value: "High",
    tone: "danger",
    note: "Elevated stress",
  },
];

export default function Analysis() {
  // TODO: replace with a real value from the backend's analyze endpoint
  const ealPercent = 18;
  const ealTier = getEalTier(ealPercent);

  // The Meltdown Prodrome Alert fires whenever the backend flags a
  // high-risk pattern — here that's simplified to "EAL is high risk",
  // but the real trigger/probability should come from the analyze
  // endpoint once it exists.
  const [showAlert, setShowAlert] = useState(ealTier.tone === "danger");

  useEffect(() => {
    setShowAlert(ealTier.tone === "danger");
  }, [ealTier.tone]);

  return (
    <div className="an-page">
      <NavBar />

      <MeltdownProdromeAlert
        isOpen={showAlert}
        probability={78}
        autoDismissMs={60000}
        onDismiss={() => setShowAlert(false)}
      />

      <div className="an-main">
        <header className="an-header">
          <div>
            <p className="an-brand">Aura</p>
            <p className="an-brand-sub">Emotional Immune System</p>
          </div>
          <button type="button" className="an-icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </header>

        <div className="an-body">
          <section className="an-intro-section">
            <h1 className="an-title">Vocal Analysis</h1>
            <p className="an-subtitle">
              See how Aura detects changes from your natural baseline.
            </p>

            <div className="an-waveform-grid">
              <Waveform
                bars={BASELINE_BARS}
                color="#6f8dff"
                label="Baseline captured"
                dotColor="#6f8dff"
              />
              <Waveform
                bars={ANALYSIS_BARS}
                color="#e5484d"
                label="Analysis complete"
                dotColor="#e5484d"
              />
            </div>
          </section>

          <section className="an-eal-section">
            <div className="an-eal-card">
              <div className="an-eal-header">
                <h2 className="an-eal-title">
                  Emotional Authenticity Level (EAL)
                </h2>
                <span className="an-badge">SIMULATED</span>
              </div>

              <div className="an-eal-content">
                <div className="an-eal-readout">
                  <p
                    className={`an-eal-percent an-eal-percent-${ealTier.tone}`}
                  >
                    {ealPercent}%<span className="an-eal-cursor">_</span>
                  </p>
                  <p className={`an-eal-tier an-eal-tier-${ealTier.tone}`}>
                    {ealTier.label}
                  </p>
                </div>

                <div className="an-eal-detail">
                  <p className="an-eal-description">
                    Your current response shows low alignment with your baseline
                    emotional pattern.
                  </p>
                  <ul className="an-eal-legend">
                    {EAL_LEGEND.map((item) => (
                      <li key={item.range}>
                        <span
                          className="an-eal-legend-dot"
                          style={{ background: item.color }}
                          aria-hidden="true"
                        />
                        <span className="an-eal-legend-range">
                          {item.range}
                        </span>
                        <span
                          className="an-eal-legend-label"
                          style={{ color: item.color }}
                        >
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="an-indicators-section">
            <h2 className="an-section-title">Key Indicators</h2>
            <div className="an-indicators-grid">
              {KEY_INDICATORS.map((indicator) => (
                <div key={indicator.id} className="an-indicator-card">
                  <p className="an-indicator-label">{indicator.label}</p>
                  <p
                    className={`an-indicator-value an-indicator-value-${indicator.tone}`}
                  >
                    {indicator.value}
                  </p>
                  <p className="an-indicator-note">{indicator.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="an-notice-section">
            <div className="an-notice-card">
              <span className="an-notice-icon" aria-hidden="true">
                <InfoIcon />
              </span>
              <div>
                <p className="an-notice-title">Important Notice</p>
                <p className="an-notice-text">
                  This analysis is for informational purposes only and does not
                  constitute medical advice. Aura&apos;s vocal biomarker
                  technology is experimental. Results may vary based on
                  environmental factors, microphone quality, and individual
                  voice characteristics. Always consult a qualified healthcare
                  professional for mental health concerns.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function Waveform({ bars, color, label, dotColor }) {
  return (
    <div className="an-waveform-card">
      <div className="an-waveform-bars" aria-hidden="true">
        {bars.map((height, i) => (
          <span
            key={i}
            className="an-waveform-bar"
            style={{ height: `${height}px`, background: color }}
          />
        ))}
      </div>
      <p className="an-waveform-label">
        <span
          className="an-waveform-dot"
          style={{ background: dotColor }}
          aria-hidden="true"
        />
        {label}
      </p>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 11v5.5M12 8v.01"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function getEalTier(percent) {
  if (percent >= 80) return { label: "AUTHENTIC", tone: "good" };
  if (percent >= 50) return { label: "MODERATE", tone: "warn" };
  return { label: "HIGH RISK", tone: "danger" };
}
