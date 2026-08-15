import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ConsentBanner from "../../components/ConsentBanner/ConsentBanner";
import StillListeningCheckIn from "../../components/StillListeningCheckIn/StillListeningCheckIn";
import SessionWaveform from "../../components/SessionWaveform/SessionWaveform";
import "../../styles/Session.css";

// TODO: tune to your demo's real pacing — short here so it's easy to see
// fire during a walkthrough. 90s buffer, 20s to respond.
const BUFFER_MS = 90000;
const CHECKIN_TIMEOUT_MS = 20000;

export default function Session() {
  const navigate = useNavigate();
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showCheckIn, setShowCheckIn] = useState(false);

  const elapsedIntervalRef = useRef(null);
  const bufferTimeoutRef = useRef(null);

  const armCheckInTimer = () => {
    clearTimeout(bufferTimeoutRef.current);
    bufferTimeoutRef.current = setTimeout(() => {
      setShowCheckIn(true);
    }, BUFFER_MS);
  };

  useEffect(() => {
    elapsedIntervalRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    armCheckInTimer();

    return () => {
      clearInterval(elapsedIntervalRef.current);
      clearTimeout(bufferTimeoutRef.current);
    };
  }, []);

  const endSession = () => {
    clearInterval(elapsedIntervalRef.current);
    clearTimeout(bufferTimeoutRef.current);
    navigate("/dashboard");
  };

  const handleCheckInConfirm = () => {
    setShowCheckIn(false);
    armCheckInTimer();
  };

  return (
    <div className="session-page">
      <ConsentBanner
        elapsedLabel={formatElapsed(elapsedSeconds)}
        onEndSession={endSession}
      />

      <StillListeningCheckIn
        isOpen={showCheckIn}
        timeoutMs={CHECKIN_TIMEOUT_MS}
        onConfirm={handleCheckInConfirm}
        onTimeout={endSession}
      />

      <div className="session-content">
        <div className="session-sphere-wrap">
          <SessionWaveform />
        </div>

        <h1 className="session-title">Session in progress</h1>
        <p className="session-subtitle">
          Aura is quietly tracking your vocal baseline in the background.
        </p>

        <p className="session-timer">{formatElapsed(elapsedSeconds)}</p>

        <button
          type="button"
          className="session-btn-primary"
          onClick={() => navigate("/analysis")}
        >
          Run Vocal Analysis
        </button>

        <button
          type="button"
          className="session-btn-secondary"
          onClick={endSession}
        >
          End Session
        </button>
      </div>
    </div>
  );
}

function formatElapsed(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
