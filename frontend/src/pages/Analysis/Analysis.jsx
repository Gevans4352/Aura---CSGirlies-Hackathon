import { useState } from "react";
import NavBar, { SettingsIcon } from "../../components/NavBar/NavBar";
import MeltdownProdromeAlert from "../../components/MeltdownProdromeAlert/MeltdownProdromeAlert";
import VocalAnalysisReveal from "../../components/VocalAnalysisReveal/VocalAnalysisReveal";
import { setPendingDebrief } from "../../lib/debriefStorage";
import "../../styles/Analysis.css";

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
  // null = analysis hasn't run yet this visit — the EAL card stays in
  // a placeholder state until VocalAnalysisReveal reports a result.
  const [ealPercent, setEalPercent] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const ealTier = ealPercent !== null ? getEalTier(ealPercent) : null;

  const handleAnalysisComplete = (finalEal) => {
    setEalPercent(finalEal);
    if (getEalTier(finalEal).tone === "danger") {
      setShowAlert(true);
      setPendingDebrief("your last vocal analysis");
    }
  };

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

            {/*
              Swap audioSrc for a real calm-voice clip once you have one,
              e.g. "/audio/baseline-sample.mp3". With no audioSrc it falls
              back to a synthetic calm sway, so this still demos fine
              without a real recording.
            */}
            <VocalAnalysisReveal
              audioSrc={null}
              durationMs={6500}
              targetEal={18}
              onComplete={handleAnalysisComplete}
            />
          </section>

          <section className="an-eal-section">
            <div className="an-eal-card">
              <div className="an-eal-header">
                <h2 className="an-eal-title">
                  Emotional Authenticity Level (EAL)
                </h2>
                <span className="an-badge">SIMULATED</span>
              </div>

              {ealTier ? (
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
                      Your current response shows low alignment with your
                      baseline emotional pattern.
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
              ) : (
                <p className="an-eal-empty">
                  Run vocal analysis above to see your score.
                </p>
              )}
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
