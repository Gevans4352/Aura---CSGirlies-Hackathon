import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Onboarding.css";
import { api } from "../../utils/api";

const PROMPT_SENTENCE =
  "The sun is warm on my face, and the meeting is almost over.";
const QUESTIONS = [
  {
    id: "social_drain",
    title: "How does socializing affect you?",
    subtitle:
      "After a typical 1-hour social interaction, how do you usually feel?",
    options: [
      { letter: "A", text: "Energized and ready for more." },
      { letter: "B", text: "Neutral, business as usual." },
      { letter: "C", text: "Noticeably drained, but I push through it." },
      {
        letter: "D",
        text: "Completely exhausted; I need to isolate to recover.",
      },
    ],
  },
  {
    id: "call_time",
    title: "How much time do you spend on calls?",
    subtitle:
      "On a typical day, how much time do you spend on voice or video calls?",
    options: [
      { letter: "A", text: "Under 1 hour" },
      { letter: "B", text: "1–3 hours" },
      { letter: "C", text: "3–5 hours" },
      { letter: "D", text: "More than 5 hours" },
    ],
  },
  {
    id: "communication_style",
    title: "How should aura respond?",
    subtitle: "Choose how Aura communicates with you.",
    options: [
      {
        letter: "A",
        title: "Direct & Factual",
        description: "Clear alerts, concise insights, no sugar-coating.",
      },
      {
        letter: "B",
        title: "Gentle & Supportive",
        description: "Softer language, supportive suggestions, more context.",
      },
    ],
  },
  {
    id: "priority",
    title: "What matters most to you?",
    subtitle: "What would you like Aura to help you with?",
    options: [
      { letter: "A", text: "Managing social energy" },
      { letter: "B", text: "Knowing when I'm overwhelmed" },
      { letter: "C", text: "Communicating when I need space" },
      { letter: "D", text: "All of the above" },
    ],
  },
  {
    id: "privacy_consent",
    title: "Onboarding",
    subtitle:
      "To keep your data completely private, Aura never sends raw audio to the cloud. To activate your personalized model, we just need to store your baseline voice fingerprint as anonymous numbers on this device. Do you agree?",
    options: [
      { letter: "A", text: " YES, Activate Aura" },
      { letter: "B", text: "Learn more about how it works" },
    ],
  },
];

export default function GetToKnowMe() {
  const [step, setStep] = useState("intro"); // "intro" | "voice" | "typing" | "calendar" | "questions" | "done"
  const [voiceSampleUrl, setVoiceSampleUrl] = useState(null);
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleVoiceContinue = (audioUrl) => {
    setVoiceSampleUrl(audioUrl);
    setStep("typing");
  };

  const handleTypingContinue = (baseline) => {
    setTypingBaseline(baseline);
    setStep("calendar");
  };

  const handleCalendarContinue = (commitments) => {
    setCalendarLoad(commitments);
    setStep("questions");
  };

  const handleQuestionsComplete = async (answers) => {
    setSubmitting(true);
    setSubmitError("");
    try {
      await api("/api/v1/onboarding", { method: "POST", body: { answers } });
      setStep("done");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Once onboarding wraps up, hold on the confirmation for a beat so
  // it reads as intentional rather than a flash, then move on.
  useEffect(() => {
    if (step !== "done") return undefined;
    const timer = setTimeout(() => navigate("/dashboard"), 2200);
    return () => clearTimeout(timer);
  }, [step, navigate]);

  return (
    <div className="gtk-page">
      {step === "intro" && <IntroStep onBegin={() => setStep("voice")} />}
      {step === "voice" && <VoiceStep onContinue={handleVoiceContinue} />}
      {step === "typing" && (
        <TypingBaselineStep onContinue={handleTypingContinue} />
      )}
      {step === "calendar" && (
        <CalendarLoadStep onContinue={handleCalendarContinue} />
      )}
      {step === "questions" && (
        <QuestionFlow
          questions={QUESTIONS}
          onComplete={handleQuestionsComplete}
          disabled={submitting}
          error={submitError}
        />
      )}
      {step === "done" && (
        <div className="gtk-step gtk-step-done">
          <div className="gtk-copy">
            <h1 className="gtk-title">You&apos;re all set</h1>
            <p className="gtk-subtitle">
              Aura is calibrating to what you told it.
            </p>
          </div>
          <button
            type="button"
            className="gtk-btn gtk-btn-primary"
            onClick={() => navigate("/dashboard")}
          >
            Continue to Aura
          </button>
        </div>
      )}
    </div>
  );
}

//  Intro

function IntroStep({ onBegin }) {
  return (
    <div className="gtk-step gtk-step-intro">
      <div className="gtk-copy">
        <h1 className="gtk-title">Let&apos;s get to know you</h1>
        <p className="gtk-subtitle">Aura wants to understand your normal.</p>
      </div>

      <div className="gtk-sphere gtk-sphere-breathe" aria-hidden="true" />

      <button
        type="button"
        className="gtk-btn gtk-btn-primary"
        onClick={onBegin}
      >
        Let&apos;s Begin
      </button>
    </div>
  );
}

// Voice baseline recording

function VoiceStep({ onContinue }) {
  const [recordingState, setRecordingState] = useState("idle"); // idle | recording | recorded | error
  const [amplitude, setAmplitude] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const rafRef = useRef(null);

  const stopVisualizer = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setAmplitude(0);
  }, []);

  const stopStream = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopVisualizer();
      stopStream();
    };
  }, [stopVisualizer, stopStream]);

  const runVisualizer = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);

    const tick = () => {
      analyser.getByteTimeDomainData(data);
      let sumSquares = 0;
      for (let i = 0; i < data.length; i++) {
        const centered = (data[i] - 128) / 128;
        sumSquares += centered * centered;
      }
      const rms = Math.sqrt(sumSquares / data.length);
      setAmplitude(Math.min(1, rms * 4));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const startRecording = async () => {
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      source.connect(analyser);
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      runVisualizer();

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        // Use the mimeType the browser actually recorded with, not a
        // hardcoded guess — Safari and Chrome pick different codecs by
        // default (audio/mp4 vs audio/webm), and labeling the Blob
        // wrong makes it record fine but play back silently, no error.
        const blob = new Blob(chunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        setAudioUrl(URL.createObjectURL(blob));
        setRecordingState("recorded");
        stopVisualizer();
        stopStream();
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecordingState("recording");
    } catch (err) {
      setErrorMsg(
        "Aura couldn't access your microphone. Check your browser permissions.",
      );
      setRecordingState("error");
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleMicTap = () => {
    if (recordingState === "recording") {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleReRecord = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setRecordingState("idle");
  };

  const micLabel =
    recordingState === "recording"
      ? "Tap to stop"
      : recordingState === "recorded"
        ? "Recorded"
        : "Tap to record";

  return (
    <div className="gtk-step gtk-step-voice">
      <div className="gtk-copy">
        <h1 className="gtk-title">Let Aura hear your voice</h1>
        <p className="gtk-subtitle">
          A short voice sample helps Aura understand your natural speaking
          baseline.
        </p>
      </div>

      <div
        className={`gtk-sphere gtk-sphere-breathe ${
          recordingState === "recording" ? "gtk-sphere-listening" : ""
        }`}
        style={{ "--amplitude": amplitude }}
        aria-hidden="true"
      />

      <p className="gtk-prompt-label">
        Read this sentence aloud in your normal, relaxed voice:
      </p>
      <p className="gtk-prompt-sentence">&ldquo;{PROMPT_SENTENCE}&rdquo;</p>

      <div className="gtk-mic-wrap">
        <button
          type="button"
          className={`gtk-mic-btn ${recordingState === "recording" ? "is-recording" : ""} ${
            recordingState === "recorded" ? "is-recorded" : ""
          }`}
          onClick={handleMicTap}
          aria-pressed={recordingState === "recording"}
          disabled={recordingState === "recorded"}
        >
          <MicIcon />
        </button>
        <span className="gtk-mic-label">{micLabel}</span>
      </div>

      {recordingState === "recorded" && audioUrl && (
        <div className="gtk-playback">
          <audio className="gtk-audio" controls src={audioUrl} />
          <button
            type="button"
            className="gtk-link-btn"
            onClick={handleReRecord}
          >
            Re-record
          </button>
        </div>
      )}

      {errorMsg && (
        <p className="gtk-error" role="alert">
          {errorMsg}
        </p>
      )}

      <p className="gtk-privacy">
        <LockIcon /> This audio is processed entirely on your device and never
        stored or sent anywhere.
      </p>

      <button
        type="button"
        className="gtk-btn gtk-btn-primary"
        disabled={recordingState !== "recorded"}
        onClick={() => onContinue(audioUrl)}
      >
        Continue
      </button>
    </div>
  );
}

//  Five-question flow

function QuestionFlow({ questions, onComplete, disabled = false, error = "" }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pulseKey, setPulseKey] = useState(0);
  const [quietModeDefault, setQuietModeDefault] = useState(false);

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;

  const handleSelect = (letter) => {
    setAnswers((prev) => ({ ...prev, [question.id]: letter }));
    setPulseKey((k) => k + 1);
  };

  const handleQuietModeChange = (value) => {
    setQuietModeDefault(value);
    setAnswers((prev) => ({ ...prev, quiet_mode_default: value }));
  };

  const handleContinue = () => {
    if (!selected) return;
    if (isLast) {
      onComplete(answers);
    } else {
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="gtk-step gtk-step-question">
      <div
        className="gtk-progress"
        role="progressbar"
        aria-valuenow={index + 1}
        aria-valuemin={1}
        aria-valuemax={questions.length}
      >
        {questions.map((q, i) => (
          <span
            key={q.id}
            className={`gtk-progress-dot ${i === index ? "is-active" : ""} ${
              i < index ? "is-done" : ""
            }`}
          />
        ))}
      </div>

      <div className="gtk-copy">
        <h1 className="gtk-title">{question.title}</h1>
        <p className="gtk-subtitle">{question.subtitle}</p>
      </div>

      <div
        key={pulseKey}
        className="gtk-sphere gtk-sphere-breathe gtk-sphere-confirm"
        aria-hidden="true"
      />

      {question.layout === "toneCard" ? (
        <>
          <div className="gtk-tone-list">
            {question.options.map((opt) => (
              <button
                key={opt.letter}
                type="button"
                className={`gtk-tone-card ${
                  selected === opt.letter ? "is-selected" : ""
                }`}
                onClick={() => handleSelect(opt.letter)}
                aria-pressed={selected === opt.letter}
              >
                <span className="gtk-tone-indicator" aria-hidden="true">
                  {selected === opt.letter && <CheckIcon />}
                </span>
                <span className="gtk-tone-text">
                  <span className="gtk-tone-title">{opt.title}</span>
                  <span className="gtk-tone-desc">{opt.description}</span>
                </span>
              </button>
            ))}
          </div>

          <div className="gtk-quiet-row">
            <div>
              <p className="gtk-quiet-title">Quiet Mode</p>
              <p className="gtk-quiet-desc">
                Minimize visible alerts when you&apos;re in public.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={quietModeDefault}
              className={`gtk-toggle ${quietModeDefault ? "is-on" : ""}`}
              onClick={() => handleQuietModeChange(!quietModeDefault)}
            >
              <span className="gtk-toggle-thumb" />
            </button>
          </div>
        </>
      ) : (
        <div className="gtk-options">
          {question.options.map((opt) => (
            <button
              key={opt.letter}
              type="button"
              className={`gtk-option ${selected === opt.letter ? "is-selected" : ""}`}
              onClick={() => handleSelect(opt.letter)}
              aria-pressed={selected === opt.letter}
            >
              <span className="gtk-option-letter">{opt.letter}</span>
              <span className="gtk-option-text">{opt.text}</span>
            </button>
          ))}
        </div>
      )}

      <button
        type="button"
        className="gtk-btn gtk-btn-primary"
        disabled={!selected || disabled}
        onClick={handleContinue}
      >
        Continue
      </button>
      {error && (
        <p className="gtk-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Icons

function CheckIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 12.5l5 5L20 6.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MicIcon() {
  return (
    <svg
      width="26"
      height="26"
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

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path d="M8 11V7a4 4 0 018 0v4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

// Typing baseline capture

// Any gap between keystrokes longer than this counts as a "pause"
// rather than normal typing rhythm.
const PAUSE_THRESHOLD_MS = 600;
const MIN_CHARS_TO_CONTINUE = 20;

function formatTimer(totalSeconds) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function TypingBaselineStep({ onContinue }) {
  const [text, setText] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [corrections, setCorrections] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const lastKeystrokeRef = useRef(null);
  const pausesRef = useRef([]);

  useEffect(() => {
    if (!isRecording) return undefined;
    const id = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [isRecording]);

  const handleKeyDown = (e) => {
    const now = performance.now();

    if (lastKeystrokeRef.current === null) {
      setIsRecording(true);
    } else {
      const gap = now - lastKeystrokeRef.current;
      if (gap > PAUSE_THRESHOLD_MS) pausesRef.current.push(gap);
    }
    lastKeystrokeRef.current = now;

    if (e.key === "Backspace" || e.key === "Delete") {
      setCorrections((c) => c + 1);
    }
  };

  // Character-based WPM (chars / 5 = words) — more stable than a
  // word-count split in the first few seconds, when word boundaries
  // are still sparse.
  const minutesElapsed = Math.max(elapsedSeconds / 60, 1 / 60);
  const wpm =
    text.trim().length > 0
      ? Math.round(text.trim().length / 5 / minutesElapsed)
      : 0;

  const avgPauseSec = pausesRef.current.length
    ? (
        pausesRef.current.reduce((sum, g) => sum + g, 0) /
        pausesRef.current.length /
        1000
      ).toFixed(1)
    : "0.0";

  const canContinue = text.trim().length >= MIN_CHARS_TO_CONTINUE;

  const handleContinue = () => {
    if (!canContinue) return;
    onContinue({
      wpm,
      avgPauseSec: Number(avgPauseSec),
      corrections,
      sampleLength: text.trim().length,
    });
  };

  return (
    <div className="gtk-step gtk-step-typing">
      <div className="gtk-copy">
        <h1 className="gtk-title">Find Your Typing Baseline</h1>
        <p className="gtk-subtitle">
          Aura learns how you naturally type so it can recognize changes later.
        </p>
      </div>

      <div className="gtk-sphere gtk-sphere-breathe" aria-hidden="true" />

      <div className="gtk-typing-block">
        <p className="gtk-typing-label">Type naturally</p>
        <p className="gtk-typing-hint">
          Don&apos;t worry about speed or accuracy. Just write the way you
          normally would.
        </p>

        <textarea
          className="gtk-typing-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Today feels like a pretty normal day."
          rows={3}
        />

        <div className="gtk-typing-status-row">
          <span className="gtk-typing-status-text">
            <span
              className={`gtk-typing-dot ${isRecording ? "is-active" : ""}`}
              aria-hidden="true"
            />
            Recording typing pattern
          </span>
          <span className="gtk-typing-timer">
            {formatTimer(elapsedSeconds)}
          </span>
        </div>

        <div className="gtk-typing-metrics">
          <div className="gtk-typing-metric">
            <p className="gtk-typing-metric-label">Typing Speed</p>
            <p className="gtk-typing-metric-value">
              {wpm}
              <span className="gtk-typing-metric-unit"> WPM</span>
            </p>
          </div>
          <div className="gtk-typing-metric">
            <p className="gtk-typing-metric-label">Pauses</p>
            <p className="gtk-typing-metric-value">
              {avgPauseSec}
              <span className="gtk-typing-metric-unit"> sec</span>
            </p>
          </div>
          <div className="gtk-typing-metric">
            <p className="gtk-typing-metric-label">Corrections</p>
            <p className="gtk-typing-metric-value">{corrections}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="gtk-btn gtk-btn-primary"
        disabled={!canContinue}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

// Calendar load capture

let commitmentIdCounter = 0;
function nextCommitmentId() {
  commitmentIdCounter += 1;
  return `commitment_${commitmentIdCounter}`;
}

function CalendarLoadStep({ onContinue }) {
  const [commitments, setCommitments] = useState([
    { id: nextCommitmentId(), text: "" },
  ]);

  const handleChange = (id, value) => {
    setCommitments((list) =>
      list.map((c) => (c.id === id ? { ...c, text: value } : c)),
    );
  };

  const handleAddRow = () => {
    setCommitments((list) => [...list, { id: nextCommitmentId(), text: "" }]);
  };

  const handleRemoveRow = (id) => {
    setCommitments((list) => list.filter((c) => c.id !== id));
  };

  const handleContinue = () => {
    const filled = commitments
      .map((c) => c.text.trim())
      .filter((text) => text.length > 0);
    onContinue(filled);
  };

  return (
    <div className="gtk-step gtk-step-calendar">
      <div className="gtk-copy">
        <h1 className="gtk-title">Understand your Calendar Load</h1>
        <p className="gtk-subtitle">
          Aura uses your schedule to understand how much social energy your day
          may require.
        </p>
      </div>

      <div className="gtk-sphere gtk-sphere-breathe" aria-hidden="true" />

      <div className="gtk-calendar-block">
        <p className="gtk-typing-label">Today&apos;s commitments</p>

        <div className="gtk-calendar-list">
          {commitments.map((c, i) => (
            <div key={c.id} className="gtk-calendar-row">
              <input
                type="text"
                className="gtk-calendar-input"
                value={c.text}
                onChange={(e) => handleChange(c.id, e.target.value)}
                placeholder={`Event ${i + 1}`}
              />
              {commitments.length > 1 && (
                <button
                  type="button"
                  className="gtk-calendar-remove"
                  aria-label="Remove commitment"
                  onClick={() => handleRemoveRow(c.id)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          className="gtk-calendar-add"
          onClick={handleAddRow}
        >
          + Add another commitment
        </button>
      </div>

      <button
        type="button"
        className="gtk-btn gtk-btn-primary"
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}
