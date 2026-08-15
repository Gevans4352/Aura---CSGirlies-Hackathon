import { useState, useRef, useEffect, useCallback } from "react";
import "../../styles/Onboarding.css";

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
    id: "Privacy",
    title: "To keep your data completely private, Aura never sends raw audio to the cloud. To activate your personalized model, we just need to store your baseline voice fingerprint as anonymous numbers on this device. Do you agree?",
    options: [
      { letter: "A", text: " YES, Activate Aura" },
      { letter: "B", text: "Learn more about how it works" },
    ],
  },
];

export default function GetToKnowMe() {
  const [step, setStep] = useState("intro"); // "intro" | "voice" | "questions" | "done"
  const [voiceSampleUrl, setVoiceSampleUrl] = useState(null);

  const handleVoiceContinue = (audioUrl) => {
    setVoiceSampleUrl(audioUrl);
    setStep("questions");
  };

  const handleQuestionsComplete = (answers) => {
    // TODO: send { answers, voiceSampleUrl } to the backend, e.g.
    // await api.post("/onboarding", { answers, voiceSampleUrl });
    // The backend derives dashboardPriority + baselineMSI from `answers`
    // and returns whatever the dashboard needs to render first.
    console.log("onboarding answers", answers, voiceSampleUrl);
    setStep("done");
  };

  return (
    <div className="gtk-page">
      {step === "intro" && <IntroStep onBegin={() => setStep("voice")} />}
      {step === "voice" && <VoiceStep onContinue={handleVoiceContinue} />}
      {step === "questions" && (
        <QuestionFlow
          questions={QUESTIONS}
          onComplete={handleQuestionsComplete}
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
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
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

function QuestionFlow({ questions, onComplete }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [pulseKey, setPulseKey] = useState(0);

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;

  const handleSelect = (letter) => {
    setAnswers((prev) => ({ ...prev, [question.id]: letter }));
    setPulseKey((k) => k + 1);
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

      <button
        type="button"
        className="gtk-btn gtk-btn-primary"
        disabled={!selected}
        onClick={handleContinue}
      >
        Continue
      </button>
    </div>
  );
}

// Icons

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
