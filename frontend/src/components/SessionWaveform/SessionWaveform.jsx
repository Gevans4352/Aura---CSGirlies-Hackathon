import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import "../../styles/SessionWaveform.css";

const BAR_COUNT = 32;
const RADIUS = 78;
const BAR_FACTORS = Array.from(
  { length: BAR_COUNT },
  () => 0.5 + Math.random() * 0.5,
);

export default function SessionWaveform() {
  const barRefs = useRef([]);
  const rafRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const smoothedAmpRef = useRef(0);
  const [micAvailable, setMicAvailable] = useState(null); 
  useEffect(() => {
    let cancelled = false;

    async function setupMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;

        const AudioContextClass =
          window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContextClass();
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        source.connect(analyser);

        audioCtxRef.current = audioCtx;
        analyserRef.current = analyser;
        setMicAvailable(true);
        runMicLoop();
      } catch {
        // No mic permission / no device — fall back to a smooth simulated
        // pulse so the page still feels alive rather than looking broken.
        setMicAvailable(false);
        runSimulatedLoop();
      }
    }

    function runMicLoop() {
      const analyser = analyserRef.current;
      const data = new Uint8Array(analyser.frequencyBinCount);

      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sumSquares = 0;
        for (let i = 0; i < data.length; i++) {
          const centered = (data[i] - 128) / 128;
          sumSquares += centered * centered;
        }
        const rms = Math.sqrt(sumSquares / data.length);
        const amplitude = Math.min(1, rms * 5);
        smoothedAmpRef.current += (amplitude - smoothedAmpRef.current) * 0.25;
        applyAmplitude(smoothedAmpRef.current);
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    function runSimulatedLoop() {
      let t = 0;
      const tick = () => {
        t += 0.05;
        const amplitude = 0.35 + 0.25 * Math.sin(t) + 0.15 * Math.sin(t * 2.7);
        applyAmplitude(Math.max(0.15, Math.min(1, amplitude)));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }

    function applyAmplitude(amplitude) {
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        const scale = 0.25 + amplitude * BAR_FACTORS[i] * 1.6;
        el.style.transform = `translate(-50%, -100%) rotate(${
          (360 / BAR_COUNT) * i
        }deg) translateY(-${RADIUS}px) scaleY(${scale})`;
      });
    }

    setupMic();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close().catch(() => {});
      if (streamRef.current)
        streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, []);

  return (
    <div className="sw-wrap">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="sw-pulse-ring"
          animate={{ scale: [1, 1.6, 1], opacity: [0.35, 0, 0.35] }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1.05,
          }}
        />
      ))}

      <div className="sw-bars">
        {Array.from({ length: BAR_COUNT }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (barRefs.current[i] = el)}
            className="sw-bar"
            style={{
              transform: `translate(-50%, -100%) rotate(${
                (360 / BAR_COUNT) * i
              }deg) translateY(-${RADIUS}px) scaleY(0.3)`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="sw-core"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <MicIcon />
      </motion.div>

      {micAvailable === false && (
        <p className="sw-fallback-note">Simulated — microphone unavailable</p>
      )}
    </div>
  );
}

function MicIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 15a3 3 0 003-3V6a3 3 0 10-6 0v6a3 3 0 003 3z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M19 11v1a7 7 0 01-14 0v-1M12 19v3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
