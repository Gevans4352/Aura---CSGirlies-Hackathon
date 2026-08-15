import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import "../../styles/PostEventDebrief.css";


//  * eventLabel: short description of what triggered this, e.g. "tonight's call"
//  * onDismiss: called whenever the modal closes, regardless of path taken
//  * onOutcome(outcome): optional — fired with "okay" | "badly" once the
//  *   person picks, in case you want to log it or feed it back into EAL
//  *   baseline calibration later.

export default function PostEventDebrief({
  isOpen,
  eventLabel = "that",
  onDismiss,
  onOutcome,
}) {
  const [step, setStep] = useState("ask"); // "ask" | "okay" | "badly"
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) setStep("ask");
  }, [isOpen]);

  const handleSelect = (outcome) => {
    setStep(outcome);
    onOutcome?.(outcome);
  };

  const handleGoToRecalibration = () => {
    onDismiss?.();
    navigate("/protocol");
  };

  return (
    <Modal isOpen={isOpen} onClose={onDismiss} labelledBy="ped-title">
      {step === "ask" && (
        <div className="ped-body">
          <h2 id="ped-title" className="ped-title">
            How did {eventLabel} go?
          </h2>
          <p className="ped-subtitle">
            Aura noticed a strain pattern earlier — this just helps it learn
            what actually happened.
          </p>
          <div className="ped-actions">
            <button
              type="button"
              className="ped-btn ped-btn--okay"
              onClick={() => handleSelect("okay")}
            >
              Went okay
            </button>
            <button
              type="button"
              className="ped-btn ped-btn--badly"
              onClick={() => handleSelect("badly")}
            >
              Went badly
            </button>
          </div>
        </div>
      )}

      {step === "okay" && (
        <div className="ped-body">
          <h2 id="ped-title" className="ped-title">
            Good to know.
          </h2>
          <p className="ped-subtitle">
            Aura will factor this in — a strain signal that resolved on its own
            still matters less than one that didn&apos;t.
          </p>
          <div className="ped-actions ped-actions--single">
            <button
              type="button"
              className="ped-btn ped-btn--neutral"
              onClick={onDismiss}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {step === "badly" && (
        <div className="ped-body">
          <h2 id="ped-title" className="ped-title">
            Noted.
          </h2>
          <p className="ped-subtitle">
            That&apos;s worth acting on now rather than carrying into tomorrow.
            Aura has a lower-demand plan ready.
          </p>
          <div className="ped-actions">
            <button
              type="button"
              className="ped-btn ped-btn--neutral"
              onClick={onDismiss}
            >
              Not now
            </button>
            <button
              type="button"
              className="ped-btn ped-btn--primary"
              onClick={handleGoToRecalibration}
            >
              Open Recalibration Protocol
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
