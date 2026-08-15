import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import NavBar, { SettingsIcon } from "../../components/NavBar/NavBar";
import Toast from "../../components/Toast/Toast";
import "../../styles/Recalibration.css";

const RECOMMENDATIONS = [
  {
    id: "reduce_load",
    title: "Reduce social load",
    description: "Consider postponing non-essential interactions.",
  },
  {
    id: "recovery_space",
    title: "Create a recovery space",
    description: "Allow 20-30 minutes of uninterrupted downtime.",
  },
  {
    id: "boundary_template",
    title: "Use a boundary template",
    description: "Communicate your limits without explaining everything.",
  },
];

// Each template carries both a soft and a blunt version of the same
const BOUNDARY_TEMPLATES = [
  {
    id: "social_event",
    title: "Social Event",
    soft: "I need to step back tonight. I'll follow up tomorrow.",
    blunt: "Can't make it tonight. I'll reach out when I'm ready.",
  },
  {
    id: "work_meeting",
    title: "Work / Meeting",
    soft: "I need some time to recharge and won't be able to join this one.",
    blunt: "I'm not joining this one. I need the time.",
  },
];

export default function Recalibration() {
  // TODO: replace with real values from the backend
  const eal = 94;
  const ealMax = 100;

  const [tone, setTone] = useState("soft"); // "soft" | "blunt"
  const [toastMessage, setToastMessage] = useState(null);

  const handleUseTemplate = (message) => {
    // TODO: also consider opening the person's messaging app directly
    // (mailto:/sms: links or a share-sheet API) instead of just clipboard.
    navigator.clipboard
      ?.writeText(message)
      .then(() => setToastMessage("Copied to clipboard"))
      .catch(() => setToastMessage("Couldn't copy — select the text manually"));
  };

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(null), 2200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <div className="rc-page">
      <NavBar />

      <div className="rc-main">
        <header className="rc-header">
          <div>
            <p className="rc-brand">Aura</p>
            <p className="rc-brand-sub">Emotional Immune System</p>
          </div>
          <button type="button" className="rc-icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </header>

        <div className="rc-body">
          <section className="rc-intro-section">
            <span className="rc-badge">RECOMMENDED</span>
            <h1 className="rc-title">Re-calibration Protocol</h1>
            <p className="rc-subtitle">
              A lower-demand plan based on your current state.
            </p>

            <div className="rc-state-card">
              <p className="rc-state-label">Current State</p>
              <p className="rc-state-value">High Strain</p>
              <p className="rc-state-detail">
                EAL {eal} / {ealMax} · Recalibration recommended
              </p>
            </div>
          </section>

          <section className="rc-recommend-section">
            <h2 className="rc-section-title">What Aura recommends</h2>
            <ol className="rc-recommend-list">
              {RECOMMENDATIONS.map((rec, i) => (
                <li key={rec.id} className="rc-recommend-item">
                  <span className="rc-recommend-number">{i + 1}</span>
                  <div>
                    <p className="rc-recommend-title">{rec.title}</p>
                    <p className="rc-recommend-description">
                      {rec.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="rc-templates-section">
            <div className="rc-templates-heading-row">
              <div>
                <h2 className="rc-section-title">Boundary Templates</h2>
                <p className="rc-templates-subtitle">
                  Choose a message that fits your situation.
                </p>
              </div>

              <div
                className="rc-tone-toggle"
                role="radiogroup"
                aria-label="Message tone"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={tone === "soft"}
                  className={`rc-tone-btn ${tone === "soft" ? "is-active" : ""}`}
                  onClick={() => setTone("soft")}
                >
                  Soft
                </button>
                <button
                  type="button"
                  role="radio"
                  aria-checked={tone === "blunt"}
                  className={`rc-tone-btn ${tone === "blunt" ? "is-active" : ""}`}
                  onClick={() => setTone("blunt")}
                >
                  Blunt
                </button>
              </div>
            </div>

            <div className="rc-templates-list">
              {BOUNDARY_TEMPLATES.map((template) => (
                <div key={template.id} className="rc-template-card">
                  <p className="rc-template-title">{template.title}</p>
                  <p className="rc-template-message">
                    &ldquo;{template[tone]}&rdquo;
                  </p>
                  <button
                    type="button"
                    className="rc-template-btn"
                    onClick={() => handleUseTemplate(template[tone])}
                  >
                    Use template
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <AnimatePresence>
        {toastMessage && <Toast message={toastMessage} />}
      </AnimatePresence>
    </div>
  );
}
