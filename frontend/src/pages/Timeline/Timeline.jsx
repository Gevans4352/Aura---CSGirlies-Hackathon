import NavBar, { SettingsIcon } from "../../components/NavBar/NavBar";
import { useState } from "react";
import "../../styles/Timeline.css";

const TIMELINE_EVENTS = [
  {
    id: "strain_spike",
    dotColor: "#f5a623",
    title: "Strain spike",
    timestamp: "Today · 2:00 PM",
    description: "Increased vocal tension detected.",
    badge: "SIMULATED",
  },
  {
    id: "masking_fracture",
    dotColor: "#e5484d",
    title: "Masking fracture",
    timestamp: "Yesterday · 7:30 PM",
    description: "Spoken affect diverged from your baseline.",
  },
  {
    id: "social_load",
    dotColor: "#4a90e2",
    title: "Social load",
    timestamp: "Monday · 11:15 AM",
    description: "Elevated social load detected.",
  },
];

const CONTEXT_SIGNALS = [
  {
    id: "typing_pattern",
    icon: <KeyboardIcon />,
    title: "Typing pattern",
    badge: "SIMULATED",
    headline: "Increased hesitation",
    stats: ["23% slower typing", "18% more deletions"],
    footnote: "Possible cognitive load",
  },
  {
    id: "calendar_load",
    icon: <CalendarIcon />,
    title: "Calendar load",
    headline: "4 social commitments",
    stats: ["3 meetings", "1 group event"],
    footnote: "High social density today",
  },
];

export default function Timeline() {
  return (
    <div className="tl-page">
      <NavBar />

      <div className="tl-main">
        <header className="tl-header">
          <div>
            <p className="tl-brand">Aura</p>
            <p className="tl-brand-sub">Emotional Immune System</p>
          </div>
          <button type="button" className="tl-icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </header>

        <div className="tl-body">
          <section className="tl-timeline-section">
            <h1 className="tl-title">Anomaly Timeline</h1>
            <p className="tl-subtitle">
              A record of moments when your emotional baseline shifted.
            </p>

            <div className="tl-timeline-card">
              <ol className="tl-timeline-list">
                {TIMELINE_EVENTS.map((event) => (
                  <li key={event.id} className="tl-timeline-item">
                    <span
                      className="tl-timeline-dot"
                      style={{ background: event.dotColor }}
                      aria-hidden="true"
                    />
                    <div className="tl-timeline-content">
                      <div className="tl-timeline-title-row">
                        <p className="tl-timeline-title">{event.title}</p>
                        {event.badge && (
                          <span className="tl-badge">{event.badge}</span>
                        )}
                      </div>
                      <p className="tl-timeline-timestamp">{event.timestamp}</p>
                      <p className="tl-timeline-description">
                        {event.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="tl-summary-section">
            <h2 className="tl-section-title">Pattern Summary</h2>
            <div className="tl-summary-card">
              <p className="tl-summary-headline">Most frequent signal</p>
              <p className="tl-summary-description">
                Social strain appears most often after extended interactions.
              </p>
            </div>
          </section>

          <section className="tl-context-section">
            <h2 className="tl-section-title">Context Signals</h2>
            <div className="tl-context-grid">
              {CONTEXT_SIGNALS.map((signal) => (
                <div key={signal.id} className="tl-context-card">
                  <div className="tl-context-header">
                    <span className="tl-context-icon">{signal.icon}</span>
                    <span className="tl-context-title">{signal.title}</span>
                    {signal.badge && (
                      <span className="tl-badge tl-badge-corner">
                        {signal.badge}
                      </span>
                    )}
                  </div>
                  <p className="tl-context-headline">{signal.headline}</p>
                  <ul className="tl-context-stats">
                    {signal.stats.map((stat) => (
                      <li key={stat}>{stat}</li>
                    ))}
                  </ul>
                  <p className="tl-context-footnote">{signal.footnote}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

//  Icons

function KeyboardIcon() {
  return (
    <svg
      width="16"
      height="16"
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

function CalendarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3 10h18M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
