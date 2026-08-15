import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, auth } from "../../utils/api";
import { supabase } from "../../lib/supabase";
import "../../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Fill in your name, email, and password to continue.");
      return;
    }

    setLoading(true);
    try {
      const data = await api("/api/v1/auth/register", {
        method: "POST",
        body: { name, email, password },
      });
      auth.setToken(data.access_token);
      auth.setRefreshToken(data.refresh_token);
      navigate("/onboarding");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin + "/login" },
    });
    if (error) setError(error.message);
  };

  return (
    <div className="signup-page">
      <div className="signup-visual">
        <div className="signup-visual-copy">
          <h1 className="signup-title">Find your Aura</h1>
          <p className="signup-subtitle">
            It's time to personalize your experience.
          </p>
        </div>
        <div className="signup-sphere" aria-hidden="true" />
      </div>

      <div className="signup-panel">
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          <div className="signup-field">
            <label htmlFor="name">What's your name?</label>
            <input
              id="name"
              type="text"
              placeholder="Aura will call you"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="signup-field">
            <label htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="signup-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          {error && (
            <p className="signup-error" role="alert">
              {error}
            </p>
          )}

          <div className="signup-divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="signup-btn signup-btn-google"
            onClick={handleGoogleSignUp}
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <button
            type="submit"
            className="signup-btn signup-btn-primary"
            disabled={loading}
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>

          <p className="signup-footer">
            Already have an account?{" "}
            <a href="/login" className="signup-link signup-link-strong">
              Sign In.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.09-1.8 2.73v2.27h2.91c1.7-1.57 2.69-3.88 2.69-6.64z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.27c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.34C2.44 15.98 5.48 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.96 10.7A5.4 5.4 0 013.68 9c0-.59.1-1.17.28-1.7V4.96H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.04l3-2.34z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l3 2.34C4.67 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
