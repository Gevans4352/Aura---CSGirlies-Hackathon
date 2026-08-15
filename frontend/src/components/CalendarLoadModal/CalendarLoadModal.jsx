import Modal from "../Modal/Modal";
import "../../styles/CalendarLoadModal.css";

// Placeholder data for now — same shape the real calendar-awareness
// integration would eventually populate from the connected calendar.
const COMMITMENTS = [
  {
    id: "event_1",
    label: "Event 1",
    time: "09:00",
    name: "Lecture",
    category: "Academic",
    duration: "30 min",
  },
  {
    id: "event_2",
    label: "Event 2",
    time: "14:00",
    name: "Team Meeting",
    category: "Work",
    duration: "60 min",
  },
  {
    id: "event_3",
    label: "Event 3",
    time: "18:00",
    name: "Club Meeting",
    category: "Social",
    duration: "90 min",
  },
];

const ESTIMATED_LOAD = 72;
const LOAD_MAX = 100;

export default function CalendarLoadModal({ isOpen, onClose }) {
  const loadPercent = Math.min(
    Math.max((ESTIMATED_LOAD / LOAD_MAX) * 100, 0),
    100,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="calendar-load-title"
      className="clm-card"
    >
      <button
        type="button"
        className="clm-close"
        aria-label="Close"
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <div className="clm-sphere" aria-hidden="true" />

      <h2 id="calendar-load-title" className="clm-title">
        Today&apos;s Calendar Load
      </h2>

      <p className="clm-subtitle">
        Aura uses your schedule to understand how much social energy your day
        may require.
      </p>

      <div className="clm-section-header">
        <p className="clm-section-title">Today&apos;s commitments</p>
        <span className="clm-badge">SIMULATED</span>
      </div>

      <ul className="clm-commitment-list">
        {COMMITMENTS.map((commitment) => (
          <li key={commitment.id} className="clm-commitment">
            <p className="clm-commitment-label">{commitment.label}</p>
            <p className="clm-commitment-line">
              {commitment.time} — {commitment.name}
            </p>
            <p className="clm-commitment-meta">
              {commitment.category} · {commitment.duration}
            </p>
          </li>
        ))}
      </ul>

      <div className="clm-load-block">
        <p className="clm-load-label">Estimated Calendar Load</p>
        <p className="clm-load-value">
          {ESTIMATED_LOAD}
          <span className="clm-load-max"> / {LOAD_MAX}</span>
        </p>
        <p className="clm-load-note">High social density today</p>

        <div className="clm-scale">
          <span className="clm-scale-label">LOW</span>
          <div className="clm-scale-track">
            <div
              className="clm-scale-fill"
              style={{ width: `${loadPercent}%` }}
            />
            <div
              className="clm-scale-dot"
              style={{ left: `${loadPercent}%` }}
            />
          </div>
          <span className="clm-scale-label">HIGH</span>
        </div>
      </div>

      <button type="button" className="clm-btn-primary" onClick={onClose}>
        Got it
      </button>
    </Modal>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 5l14 14M19 5L5 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
