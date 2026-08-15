import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, animate } from "framer-motion";
import NavBar, { SettingsIcon } from "../../components/NavBar/NavBar";
import AmbientQuote from "../../components/AmbientQuote/AmbientQuote";
import PostEventDebrief from "../../components/PostEventDebrief/PostEventDebrief";
import {
  getPendingDebrief,
  clearPendingDebrief,
} from "../../lib/debriefStorage";
import { api } from "../../utils/api";
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

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

// The "day" for pacing purposes — energy passively drains between
// these hours, reaching its lowest natural point by DAY_END_HOUR even
// if the person never starts a session.
const DAY_START_HOUR = 7;
const DAY_END_HOUR = 23;

// How much of the budget passive time-of-day drain accounts for by
// day's end (0.6 = 60%). The rest only depletes from actually running
// sessions, so the bar isn't purely a clock.
const PASSIVE_DRAIN_CEILING = 0.6;

// Energy points a single session costs when started.
const SESSION_COST = 12;

function getElapsedDayFraction() {
  const now = new Date();
  const totalMinutes = (DAY_END_HOUR - DAY_START_HOUR) * 60;
  const nowMinutes =
    now.getHours() * 60 + now.getMinutes() - DAY_START_HOUR * 60;
  return Math.min(Math.max(nowMinutes / totalMinutes, 0), 1);
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [energyBudget, setEnergyBudget] = useState(62);
  const [spent, setSpent] = useState(() =>
    Math.round(62 * getElapsedDayFraction() * PASSIVE_DRAIN_CEILING),
  );
  // Real trigger: if something flagged a debrief before the person
  // left (possibly on a totally different day), it's waiting here.
  const [pendingDebrief] = useState(() => getPendingDebrief());
  const [debriefEventLabel, setDebriefEventLabel] = useState(
    () => pendingDebrief?.eventLabel ?? "tonight's call",
  );
  const [showDebrief, setShowDebrief] = useState(() => pendingDebrief !== null);

  const [eal, setEal] = useState(0);
  const ealMax = 100;
  const energyMax = 100;

  useEffect(() => {
    let active = true;
    api("/api/v1/analysis/latest")
      .then((data) => {
        if (active) setEal(data.emotional_allostatic_load);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Keeps the passive drain moving forward with the real clock while
  // the dashboard is open, without ever walking spent backwards.
  useEffect(() => {
    const id = setInterval(() => {
      setSpent((current) => {
        const passiveTarget = Math.round(
          energyBudget * getElapsedDayFraction() * PASSIVE_DRAIN_CEILING,
        );
        return Math.max(current, passiveTarget);
      });
    }, 30000);
    return () => clearInterval(id);
  }, [energyBudget]);

  const energyRemaining = Math.max(energyBudget - spent, 0);
  const energyPercent =
    energyBudget > 0 ? (energyRemaining / energyBudget) * 100 : 0;
  const energyTone =
    energyPercent > 50 ? "good" : energyPercent > 20 ? "warn" : "danger";

  const handleStartSession = () => {
    setSpent((current) => Math.min(current + SESSION_COST, energyBudget));
    navigate("/session");
  };

  return (
    <div className="dash-page">
      <NavBar />

      <div className="dash-main">
        <motion.header
          className="dash-header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div>
            <p className="dash-brand">Aura</p>
            <p className="dash-brand-sub">Emotional Immune System</p>
          </div>
          <button type="button" className="dash-icon-btn" aria-label="Settings">
            <SettingsIcon />
          </button>
        </motion.header>

        <motion.div
          className="dash-body"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <section className="dash-status-col">
            <motion.div className="dash-status" variants={item}>
              <h1 className="dash-status-title">Your Aura is stable.</h1>
              <p className="dash-status-subtitle">
                Calm — no anomalies detected.
              </p>
            </motion.div>

            <motion.div
              className="dash-sphere-wrap"
              variants={item}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <div className="dash-sphere" aria-hidden="true" />
            </motion.div>

            <motion.div className="dash-stat" variants={item}>
              <p className="dash-stat-label">Emotional Allostatic Load</p>
              <p className="dash-stat-value">
                <AnimatedNumber value={eal} />{" "}
                <span className="dash-stat-max">/ {ealMax}</span>
              </p>
            </motion.div>

            <motion.div className="dash-slider-block" variants={item}>
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

              <div className="dash-energy-remaining">
                <div className="dash-energy-remaining-row">
                  <p className="dash-energy-remaining-label">Remaining today</p>
                  <p
                    className={`dash-energy-remaining-value dash-energy-remaining-value-${energyTone}`}
                  >
                    {energyRemaining} / {energyBudget}
                  </p>
                </div>
                <div className="dash-energy-track">
                  <motion.div
                    className={`dash-energy-fill dash-energy-fill-${energyTone}`}
                    animate={{ width: `${energyPercent}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            <motion.button
              type="button"
              className="dash-btn-primary"
              variants={item}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleStartSession}
            >
              Start Session
            </motion.button>
          </section>

          <section className="dash-insights-col">
            <motion.h2 className="dash-insights-title" variants={item}>
              Today&apos;s Insights
            </motion.h2>
            <div className="dash-insights-list">
              {INSIGHTS.map((insight) => (
                <motion.div
                  key={insight.id}
                  className="dash-insight-card"
                  variants={item}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                >
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
                </motion.div>
              ))}
            </div>

            <AmbientQuote />

            {/* DEMO TRIGGER — keep for showing the flow on demand;
                the real trigger above (useEffect + localStorage) is
                what fires this from an actual flagged analysis. */}
            <button
              type="button"
              className="dash-debrief-demo-btn"
              onClick={() => {
                setDebriefEventLabel("tonight's call");
                setShowDebrief(true);
              }}
            >
              Debrief demo
            </button>
          </section>
        </motion.div>
      </div>

      <PostEventDebrief
        isOpen={showDebrief}
        eventLabel={debriefEventLabel}
        onDismiss={() => {
          setShowDebrief(false);
          clearPendingDebrief();
        }}
        onOutcome={(outcome) => {
          // TODO: feed this back into EAL baseline once you have
          // somewhere real to send it.
          console.log("Debrief outcome:", outcome);
        }}
      />
    </div>
  );
}

function AnimatedNumber({ value, duration = 1.1 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      delay: 0.3, // let the card finish rising in first
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration]);

  return <>{display}</>;
}

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
