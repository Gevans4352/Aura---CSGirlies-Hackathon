import { useNavigate } from "react-router-dom";
import "../../styles/Landing.css"

const Landing = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/register");
  };

  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="landing-brand">
          <p className="landing-eyebrow">Aura</p>
          <p className="landing-eyebrow-sub">
            Your personal Emotional Immune system
          </p>
        </div>

        <div className="landing-sphere" aria-hidden="true" />

        <div className="landing-copy">
          <h1 className="landing-title">Welcome to Aura</h1>
          <p className="landing-subtitle">
            A quiet layer between what you say and what your nervous system is
            telling you.
          </p>
        </div>

        <button type="button" className="landing-btn" onClick={handleStart}>
          Start your journey
        </button>

        <p className="landing-footer">
          Private by design · You stay in control
        </p>
      </div>
    </div>
  );
}

export default Landing
