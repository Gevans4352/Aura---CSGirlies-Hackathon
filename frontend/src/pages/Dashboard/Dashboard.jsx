import { useState } from "react";
import NavBar, { SettingsIcon } from "../../components/NavBar/NavBar";
import "../../styles/Dashboard.css";

const INSIGHTS = [
  {
    id: "social_load",
    icon: <DotIcon color="#f5a623" />,
    title: "Social load",
    description: "Elevated social load detected today.",
  },
  {
    id: "typing_pattern",
    icon: <KeyboardIcon />,
    title: "Typing pattern",
    description: "Increased hesitation detected during your last session.",
    badge: "SIMULATED",
  },
];

export default function Dashboard() {
  const [energyBudget, setEnergyBudget] = useState(62);

  // TODO: replace with real values from the backend once wired up
  const eal = 12;
  const ealMax = 100;
  const energyMax = 100;

  return (
    <div className="dash-page">
      <NavBar />

      <div className="dash-main">
        <header className="dash-header">
          <div>
            <p className="dash-brand">Aura</p>
            <p className="dash-brand-sub">Emotional Immune System</p>
          </div>
          <button type="button" className="dash-icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </header>

        <div className="dash-body">
          <section className="dash-status-col">
            <div className="dash-status">
              <h1 className="dash-status-title">Your Aura is stable.</h1>
              <p className="dash-status-subtitle">
                Calm — no anomalies detected.
              </p>
            </div>

            <div className="dash-sphere-wrap">
              <div className="dash-sphere" aria-hidden="true" />
            </div>

            <div className="dash-stat">
              <p className="dash-stat-label">Emotional Allostatic Load</p>
              <p className="dash-stat-value">
                {eal} <span className="dash-stat-max">/ {ealMax}</span>
              </p>
            </div>

            <div className="dash-slider-block">
              <p className="dash-slider-title">Energy Budget</p>
              <p className="dash-slider-subtitle">
                How much energy do you want to spend today?
              </p>
              <input
                type="range"
                min="0"
                max={energyMax}
                value={energyBudget}
                onChange={(e) => setEnergyBudget(Number(e.target.value))}
                className="dash-slider"
                style={{
                  "--dash-slider-fill": `${(energyBudget / energyMax) * 100}%`,
                }}
                aria-label="Energy budget"
              />
              <p className="dash-slider-value">
                {energyBudget} / {energyMax}
              </p>
            </div>

            <button type="button" className="dash-btn-primary">
              Start Session
            </button>
          </section>

          <section className="dash-insights-col">
            <h2 className="dash-insights-title">Today&apos;s Insights</h2>
            <div className="dash-insights-list">
              {INSIGHTS.map((insight) => (
                <div key={insight.id} className="dash-insight-card">
                  <div className="dash-insight-icon">{insight.icon}</div>
                  <div className="dash-insight-body">
                    <div className="dash-insight-title-row">
                      <p className="dash-insight-title">{insight.title}</p>
                      {insight.badge && (
                        <span className="dash-insight-badge">
                          {insight.badge}
                        </span>
                      )}
                    </div>
                    <p className="dash-insight-description">
                      {insight.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

// Icons

function DotIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <circle cx="9" cy="9" r="7" fill={color} />
    </svg>
  );
}

function KeyboardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="2"
        y="6"
        width="20"
        height="12"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
