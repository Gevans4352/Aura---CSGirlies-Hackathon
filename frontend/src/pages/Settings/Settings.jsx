import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { api, auth } from "../../utils/api";
import { supabase } from "../../lib/supabase";
import "../../styles/Settings.css";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

function ToggleSwitch({ checked, onChange, disabled = false, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      className={`toggle ${checked ? "toggle--on" : ""} ${disabled ? "toggle--disabled" : ""}`}
      onClick={() => !disabled && onChange(!checked)}
    >
      <motion.span
        className="toggle__thumb"
        layout
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      />
    </button>
  );
}

function SelectField({ value, onChange, options }) {
  return (
    <select
      className="select-field"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

function SliderField({ value, onChange, min, max, step, unit }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider-field">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${pct}%` }}
      />
      <span className="slider-field__value">
        {value}
        {unit}
      </span>
    </div>
  );
}

function SettingRow({ label, description, control, locked }) {
  return (
    <motion.div className="setting-row" variants={item}>
      <div className="setting-row__text">
        <div className="setting-row__label">
          {label}
          {locked && <span className="setting-row__badge">ALWAYS ON</span>}
        </div>
        {description && <p className="setting-row__desc">{description}</p>}
      </div>
      <div className="setting-row__control">{control}</div>
    </motion.div>
  );
}

function SettingsSection({ title, description, children }) {
  return (
    <motion.section className="settings-section" variants={item}>
      <div className="settings-section__header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      <div className="settings-section__body">{children}</div>
    </motion.section>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [micStatus] = useState("granted"); // wire to real getUserMedia permission state later
  const [consentBuffer, setConsentBuffer] = useState(30);
  const [tone, setTone] = useState("gentle");
  const [checkInFreq, setCheckInFreq] = useState("daily");
  const [quietModeDefault, setQuietModeDefault] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [textSize, setTextSize] = useState("medium");
  const [highContrast, setHighContrast] = useState(false);
  const [alerts, setAlerts] = useState({ meltdown: true, debrief: true });
  const [email, setEmail] = useState("");

  useEffect(() => {
    let active = true;
    api("/api/v1/onboarding")
      .then((data) => {
        if (!active) return;
        setQuietModeDefault(Boolean(data.quiet_mode_default));
        setTone(data.answers.communication_style === "A" ? "direct" : "gentle");
      })
      .catch(() => {});
    api("/api/v1/auth/me")
      .then((data) => {
        if (active) setEmail(data.email || "");
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await api("/api/v1/auth/logout", { method: "POST" });
    } catch {
      // clear the local session regardless of the backend result
    }
    await supabase.auth.signOut().catch(() => {});
    auth.clearToken();
    navigate("/");
  };

  return (
    <div className="settings-page">
      <header className="settings-page__header">
        <h1>Settings</h1>
        <p>Manage how Aura works for you.</p>
      </header>

      <motion.div
        className="settings-list"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <SettingsSection
          title="Account"
          description="Your sign-in and profile details."
        >
          <SettingRow
            label="Email"
            description={email || "—"}
            control={<button className="text-btn">Change</button>}
          />
          <SettingRow
            label="Password"
            control={<button className="text-btn">Change</button>}
          />
          <SettingRow
            label="Google account"
            description="Connected"
            control={
              <button className="text-btn text-btn--danger">Disconnect</button>
            }
          />
          <SettingRow
            label="Sign out"
            control={
              <button
                type="button"
                className="text-btn"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Session & privacy"
          description="Aura only listens to your own mic input, never a call's mixed audio, and only while a session is active."
        >
          <SettingRow
            label="Microphone access"
            description={
              micStatus === "granted"
                ? "Aura can listen when you start a session."
                : "Aura needs microphone access to work."
            }
            control={
              <span
                className={`status-pill status-pill--${micStatus === "granted" ? "on" : "off"}`}
              >
                {micStatus === "granted" ? "Granted" : "Not granted"}
              </span>
            }
          />
          <SettingRow
            label="Listening indicator"
            description="Shown on screen the entire time Aura is listening."
            locked
            control={
              <ToggleSwitch
                checked
                disabled
                label="Listening indicator"
                onChange={() => {}}
              />
            }
          />
          <SettingRow
            label='"Still listening?" check-in'
            description="How long Aura waits before confirming you're still there."
            control={
              <SliderField
                value={consentBuffer}
                onChange={setConsentBuffer}
                min={15}
                max={90}
                step={5}
                unit="s"
              />
            }
          />
          <SettingRow
            label="Clear stored session data"
            control={
              <button className="text-btn text-btn--danger">Clear data</button>
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Aura's personality"
          description="How Aura talks to you."
        >
          <SettingRow
            label="Tone"
            control={
              <SelectField
                value={tone}
                onChange={setTone}
                options={[
                  { value: "gentle", label: "Gentle" },
                  { value: "direct", label: "Direct" },
                  { value: "clinical", label: "Clinical" },
                ]}
              />
            }
          />
          <SettingRow
            label="Check-in frequency"
            control={
              <SelectField
                value={checkInFreq}
                onChange={setCheckInFreq}
                options={[
                  { value: "daily", label: "Once daily" },
                  { value: "twice", label: "Twice daily" },
                  { value: "custom", label: "Custom" },
                ]}
              />
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Quiet mode"
          description="Hides the sphere and alerts so Aura runs silently in the background."
        >
          <SettingRow
            label="Default to Quiet Mode"
            description="Start every session with visible output turned off."
            control={
              <ToggleSwitch
                checked={quietModeDefault}
                onChange={setQuietModeDefault}
                label="Default to Quiet Mode"
              />
            }
          />
        </SettingsSection>

        <SettingsSection title="Accessibility">
          <SettingRow
            label="Reduce motion"
            control={
              <ToggleSwitch
                checked={reducedMotion}
                onChange={setReducedMotion}
                label="Reduce motion"
              />
            }
          />
          <SettingRow
            label="Text size"
            control={
              <SelectField
                value={textSize}
                onChange={setTextSize}
                options={[
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ]}
              />
            }
          />
          <SettingRow
            label="High contrast"
            control={
              <ToggleSwitch
                checked={highContrast}
                onChange={setHighContrast}
                label="High contrast"
              />
            }
          />
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Which alerts Aura is allowed to show you."
        >
          <SettingRow
            label="Meltdown Prodrome Alert"
            control={
              <ToggleSwitch
                checked={alerts.meltdown}
                onChange={(v) => setAlerts((a) => ({ ...a, meltdown: v }))}
                label="Meltdown Prodrome Alert"
              />
            }
          />
          <SettingRow
            label="Post-Event Debrief"
            control={
              <ToggleSwitch
                checked={alerts.debrief}
                onChange={(v) => setAlerts((a) => ({ ...a, debrief: v }))}
                label="Post-Event Debrief"
              />
            }
          />
        </SettingsSection>

        <motion.div className="settings-danger" variants={item}>
          <div>
            <h3>Delete account</h3>
            <p>
              Permanently deletes your account and all Aura data. This can't be
              undone.
            </p>
          </div>
          <button className="text-btn text-btn--danger text-btn--outline">
            Delete account
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
