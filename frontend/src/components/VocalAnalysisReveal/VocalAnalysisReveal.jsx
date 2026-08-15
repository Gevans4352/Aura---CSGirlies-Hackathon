import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import "../../styles/VocalAnalysisReveal.css";

const BAR_COUNT = 28;

// Stays deceptively calm for the first third of the reveal (matches
// what the audio actually sounds like), then spikes hard — this delay
// is the whole point, it's what makes the reveal feel like a reveal
// instead of an obvious animation from the first second.
function chaosAmount(progress) {
  if (progress < 0.35) return progress * 0.3;
  const t = (progress - 0.35) / 0.65;
  return 0.3 + Math.pow(t, 1.6) * 0.9;
}

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function mixColor(progress) {
  const from = [111, 141, 255]; // matches your --an-blue / #6f8dff
  const to = [229, 72, 77]; // matches your --an-red / #e5484d
  const t = Math.min(progress * 1.4, 1);
  const rgb = from.map((c, i) => Math.round(c + (to[i] - c) * t));
  return `rgb(${rgb.join(",")})`;
}


//  * audioSrc: optional path to a real calm-voice clip, e.g. "/audio/baseline.mp3".
//  *   If omitted, uses a synthetic calm sway instead — the component
//  *   still works for demoing, just without real mic analysis behind it.
//  * durationMs: how long the reveal takes if there's no audioSrc (or as
//  *   a fallback if audio metadata hasn't loaded yet).
//  * targetEal: the score the reveal lands on when it finishes.
//  * onComplete(finalEal): fired once, when the reveal ends.
 
export default function VocalAnalysisReveal({
  audioSrc = null,
  durationMs = 6500,
  targetEal = 18,
  onComplete,
}) {
  const [phase, setPhase] = useState("idle"); // idle | playing | done
  const [progress, setProgress] = useState(0);
  const [displayEal, setDisplayEal] = useState(100);
  const [runKey, setRunKey] = useState(0);

  const rafRef = useRef(null);
  const startRef = useRef(null);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);

  const idleBars = useMemo(
    () =>
      Array.from(
        { length: BAR_COUNT },
        (_, i) => 8 + seededRandom(i * 3.1) * 10,
      ),
    [],
  );

  const [baselineBars, setBaselineBars] = useState(idleBars);
  const [outputBars, setOutputBars] = useState(idleBars);

  const cleanupAudio = useCallback(() => {
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
  }, []);

  useEffect(() => cleanupAudio, [cleanupAudio]);
  useEffect(
    () => () => rafRef.current && cancelAnimationFrame(rafRef.current),
    [],
  );

  const tick = useCallback(
    (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const total = audioRef.current?.duration
        ? audioRef.current.duration * 1000
        : durationMs;
      const p = Math.min(elapsed / total, 1);
      setProgress(p);

      // Baseline side: real frequency data off the actual audio when
      // we have it, otherwise a calm sway — either way this side is
      // meant to look steady the entire time.
      let baseline;
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        baseline = Array.from({ length: BAR_COUNT }, (_, i) => {
          const v = dataArrayRef.current[i % dataArrayRef.current.length] / 255;
          return 6 + v * 14;
        });
      } else {
        baseline = Array.from({ length: BAR_COUNT }, (_, i) => {
          const sway = Math.sin(elapsed / 260 + i * 0.5) * 4;
          return 10 + sway + seededRandom(i + elapsed * 0.001) * 3;
        });
      }
      setBaselineBars(baseline);

      // Output side: scripted chaos curve, deliberately decoupled from
      // the real audio — this is the "what's actually underneath" line.
      const chaos = chaosAmount(p);
      const output = Array.from({ length: BAR_COUNT }, (_, i) => {
        const spike = seededRandom(i * 7.7 + elapsed * 0.01) * 26 * chaos;
        const base = 8 + Math.sin(elapsed / 200 + i) * 3;
        return Math.max(4, base + spike);
      });
      setOutputBars(output);

      const eal = Math.round(100 - (100 - targetEal) * Math.pow(p, 1.3));
      setDisplayEal(eal);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("done");
        onComplete?.(targetEal);
      }
    },
    [durationMs, targetEal, onComplete],
  );

  const start = () => {
    if (phase === "playing") return;
    setPhase("playing");
    startRef.current = null;

    if (audioSrc && audioRef.current) {
      try {
        audioCtxRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
        const source = audioCtxRef.current.createMediaElementSource(
          audioRef.current,
        );
        const analyser = audioCtxRef.current.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyser.connect(audioCtxRef.current.destination);
        analyserRef.current = analyser;
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      } catch (err) {
        console.warn(
          "Audio analysis unavailable, falling back to simulated baseline.",
          err,
        );
      }
    }

    rafRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    setPhase("idle");
    setProgress(0);
    setDisplayEal(100);
    setBaselineBars(idleBars);
    setOutputBars(idleBars);
    setRunKey((k) => k + 1);
    cleanupAudio();
  };

  const outputColor = phase === "idle" ? "#6f8dff" : mixColor(progress);

  return (
    <div className="var-wrap">
      {audioSrc && (
        <audio key={runKey} ref={audioRef} src={audioSrc} preload="auto" />
      )}

      <div className="var-grid">
        <div className="var-card">
          <div className="var-bars" aria-hidden="true">
            {baselineBars.map((h, i) => (
              <span
                key={i}
                className="var-bar"
                style={{ height: `${h}px`, background: "#6f8dff" }}
              />
            ))}
          </div>
          <p className="var-card-label">
            <span className="var-dot" style={{ background: "#6f8dff" }} />
            What you sound like
          </p>
        </div>

        <div className="var-card">
          <div className="var-bars" aria-hidden="true">
            {outputBars.map((h, i) => (
              <span
                key={i}
                className="var-bar"
                style={{ height: `${h}px`, background: outputColor }}
              />
            ))}
          </div>
          <p className="var-card-label">
            <span className="var-dot" style={{ background: outputColor }} />
            {phase === "idle" && "Aura Output"}
            {phase === "playing" && "Aura Output — analyzing"}
            {phase === "done" && "Aura Output — complete"}
          </p>
        </div>
      </div>

      <div className="var-controls">
        {phase === "idle" && (
          <button type="button" className="var-run-btn" onClick={start}>
            Run Vocal Analysis
          </button>
        )}
        {phase === "playing" && (
          <div className="var-progress-row">
            <div className="var-progress-track">
              <div
                className="var-progress-fill"
                style={{ width: `${progress * 100}%` }}
              />
            </div>
            <span className="var-eal-live">{displayEal}%</span>
          </div>
        )}
        {phase === "done" && (
          <button
            type="button"
            className="var-run-btn var-run-btn--ghost"
            onClick={reset}
          >
            Run again
          </button>
        )}
      </div>
    </div>
  );
}
