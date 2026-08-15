import { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import "../../styles/StillListeningCheckIn.css";

export default function StillListeningCheckIn({
  isOpen,
  onConfirm,
  onTimeout,
  timeoutMs = 20000,
}) {
  const [secondsLeft, setSecondsLeft] = useState(Math.ceil(timeoutMs / 1000));
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsLeft(Math.ceil(timeoutMs / 1000));

    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    timeoutRef.current = setTimeout(() => {
      onTimeout();
    }, timeoutMs);

    return () => {
      clearInterval(intervalRef.current);
      clearTimeout(timeoutRef.current);
    };
  }, [isOpen, timeoutMs, onTimeout]);

  const handleConfirm = () => {
    clearInterval(intervalRef.current);
    clearTimeout(timeoutRef.current);
    onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={() => {}} labelledBy="slc-title">
      <div className="slc-content">
        <h2 id="slc-title" className="slc-title">
          Still listening?
        </h2>
        <p className="slc-description">
          Aura checks in periodically to confirm your session is still active.
        </p>
        <p className="slc-countdown">
          Session ends in <span>{secondsLeft}s</span> if there&apos;s no
          response.
        </p>
        <button
          type="button"
          className="slc-btn-primary"
          onClick={handleConfirm}
        >
          I&apos;m still here
        </button>
      </div>
    </Modal>
  );
}
