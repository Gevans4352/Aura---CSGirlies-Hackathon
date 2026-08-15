import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import "../../styles/MeltdownProdromeAlert.css";

//  * Shows when a high-risk score is detected (e.g. EAL in the "high risk"
//  * tier). Auto-dismisses after `autoDismissMs` if the user doesn't act —
//  * defaults to 60s; pass a different value to tune it (45000 for 45s, etc).
//  * Usage:
//  *   <MeltdownProdromeAlert
//  *     isOpen={showAlert}
//  *     probability={78}
//  *     onDismiss={() => setShowAlert(false)}
//  *   />
//  */

export default function MeltdownProdromeAlert({
  isOpen,
  probability,
  onDismiss,
  autoDismissMs = 60000,
  protocolPath = "/protocol",
}) {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    timerRef.current = setTimeout(() => {
      onDismiss();
    }, autoDismissMs);

    return () => clearTimeout(timerRef.current);
  }, [isOpen, autoDismissMs, onDismiss]);

  const handleViewProtocol = () => {
    clearTimeout(timerRef.current);
    onDismiss();
    navigate(protocolPath);
  };

  const handleDismiss = () => {
    clearTimeout(timerRef.current);
    onDismiss();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleDismiss} labelledBy="mpa-title">
      <div className="mpa-content">
        <span className="mpa-icon" aria-hidden="true">
          <WarningIcon />
        </span>

        <h2 id="mpa-title" className="mpa-title">
          Meltdown Prodrome Alert
        </h2>

        <p className="mpa-description">
          Your Aura is showing significant strain.
        </p>
        <p className="mpa-subdescription">
          A high-risk pattern has been detected based on your current simulated
          signals.
        </p>

        <p className="mpa-probability">{probability}%</p>
        <p className="mpa-probability-label">predicted overload probability</p>

        <p className="mpa-recommendation">
          A low-demand recalibration protocol is recommended.
        </p>

        <button
          type="button"
          className="mpa-btn-primary"
          onClick={handleViewProtocol}
        >
          View Recalibration Protocol
        </button>

        <button type="button" className="mpa-dismiss" onClick={handleDismiss}>
          Dismiss
        </button>
      </div>
    </Modal>
  );
}

function WarningIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 7v6M12 16.5v.01"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
