# AURA
**Emotional Immune System**

A passive, edge-AI concept that listens to micro-tremors in the human voice during web-based calls to build a real-time Emotional Immune System score. Aura predicts depressive episodes and autistic meltdowns up to 72 hours before they manifest.

## Overview

Aura is a proof-of-concept web application developed for a 3-day hackathon sprint. It demonstrates a novel approach to mental health monitoring by shifting the focus from self-reported feelings to involuntary nervous system outputs.

The application presents a simulated yet highly realistic interface where users can experience the core premise: spoken words can say "I am fine" while the vocal nervous system betrays an entirely different reality. Aura visualizes this contradiction through an abstract glowing sphere, a side-by-side audio "lie detector" comparison, and a predictive alert timeline.

The target users are individuals with high-functioning depression or masked autism who have been conditioned to ignore their internal signals until a severe episode occurs. The product aims to provide a silent, non-intrusive early warning system one that gives the user tools to act on that warning without draining the energy they don't have.

## The Problem

Prodromal blindness is Aura's term for the difficulty of recognizing the early signs of emotional or sensory overload before they become overwhelming.

Current mental health tools rely heavily on self-reporting, requiring users to consciously identify and report how they feel. Aura explores a different approach by combining brief self-reports with consented behavioral, environmental, physiological, and vocal signals to identify meaningful changes from a user's personal baseline.

Rather than diagnosing or predicting with certainty, Aura helps users recognize rising load early enough to take action.

## Our Solution

Aura addresses prodromal blindness by turning the voice into a silent, predictive health metric and pairs that prediction with low-effort, actionable tools for the moment it fires.

From the user perspective, the product is a clean, ambient dashboard featuring a central "Aura Sphere." The user initiates a simulated call or explores a demo scenario. As the demo progresses, the sphere animates through three states: Stable (calm blue), Strained (amber-red), and Fractured (chaotic red alert).

The core demonstration is the "Vocal Analysis" screen. This screen plays a perfectly calm audio clip of someone saying, "I'm doing great. The project's on track. Honestly, I feel fine." Simultaneously, Aura displays a chaotic, jagged visualization labeled "Nervous System Output" with a high Emotional Allostatic Load score. This stark contrast forms the emotional shock factor of the pitch.

The solution culminates in a "Meltdown Prodrome Alert" modal, which triggers a "Recalibration Protocol." This protocol suggests a low-demand schedule and provides pre-written templates to decline social commitments, giving the user actionable support before the predicted crash — reinforced by a self-directed "Energy Budget" so the user, not just the algorithm, stays in control of their capacity.

## Why This Is Different

Aura differs from existing mental health applications and voice-biomarker platforms (e.g. clinical screening tools used in call centers and telehealth) across several dimensions.

**Predictive versus Reactive.** Most mental health apps respond to a crisis or ask for a current mood rating. Aura provides a 72-hour forward-looking signal, turning a reactive tool into a preventive one.

**Passive versus Active.** Existing solutions require the user to open an app and type or speak intentionally. Aura operates during existing web calls with minimal added effort from an already strained user.

**Nervous system versus Conscious thought.** Other tools rely on the user's ability to accurately assess their own state, which is notoriously unreliable during high-functioning depression. Aura bypasses the conscious brain entirely by monitoring involuntary vocal micro-tremors.

**Consumer versus Clinical/B2B.** Most voice-biomarker technology today is sold into hospitals, call centers, and insurers monitoring people from the outside. Aura is something the user opens themselves, on their own terms.

**Privacy by physics versus Privacy by promise.** Many health apps ask users to trust that their data will be deleted. Aura is designed around the principle that raw audio never leaves the user's device, and that only the user's own microphone input — never a call's mixed output is ever analyzed, eliminating the need for trust in cloud storage or third-party voices being captured. *(Note: The hackathon MVP simulates this principle, with the architectural vision clearly defined.)*

**Specific targeting of masking.** General mental-health tools often focus on symptoms rather than the potential strain associated with autistic camouflaging. Aura introduces a Masking Strain Index (MSI), a prototype metric designed to estimate changes in masking-related strain using consented signals. It is not a clinical diagnostic measure, but a way to help users recognize when their current social and environmental demands may be exceeding their personal baseline.

**Self-report as ground truth, not passive inference alone.** Aura pairs its voice-based signal with fast, optional self-report tools (Energy Budget, Post-Event Debrief) so the system's predictions are checked against and corrected by the user's own read of themselves over time.

## Key Features

### Aura Sphere Visualization
The main dashboard features an abstract, glowing sphere that represents the user's current state. It animates between three distinct conditions: Stable (slow-pulsing deep blue), Strained (frantic amber-red), and Fractured (chaotic pulsing red alert). This provides an immediate, intuitive read on the user's nervous system load without requiring numerical analysis.

### Vocal Analysis Demo (The Lie Detector)
This is the shock-factor feature. It presents two side-by-side visualizations. The first plays a calm audio waveform of a person saying they are fine. The second displays a simultaneous, chaotic visualization labeled "Aura Output" with the alert "Masking Fracture Detected. Emotional Allostatic Load: 94." This feature starkly illustrates the gap between spoken words and nervous system reality.

### Anomaly Event Simulation and Timeline
A pre-populated dashboard timeline shows simulated historical events for a demo character. Examples include "Strain spike detected during Performance Review call" and "Masking fracture detected during Call with Mom." This timeline demonstrates how Aura would track and contextualize strain over time.

### Meltdown Prodrome Alert Simulation
A realistic modal notification that triggers during the demo narrative. It states: "Your Aura is showing strain. Based on your vocal pattern, there is a 78% probability of a sensory meltdown in the next 24-48 hours. A low-demand protocol is suggested." This demonstrates the predictive intervention capability.

### Recalibration Protocol UI
Following the alert, a dedicated screen offers a simulated "social low-power mode" protocol, expanded into a **full template library** (see below) rather than a single message.

### Energy Budget Ledger
Each morning, the user sets their own self-reported capacity on a simple scale (e.g. "3/5 social budget today"). As the day progresses, Aura tracks spend against that budget as a visible, gentle progress bar — not a diagnosis, and not something the system imposes. This puts the user in the driver's seat and gives Aura a real, self-reported baseline to check its own predictions against.

**MVP Implementation:** A slider to set the morning budget, and a progress bar UI that visually depletes as simulated "events" occur through the demo. No backend logic required — state is held client-side for the demo.

### Boundary Templates Library 
Rather than a single scripted decline message, this is a small library of pre-written templates for common situations: rescheduling, shortening a meeting, requesting written follow-up instead of a call, and declining a commitment outright. Each template can be toggled between a blunter or softer tone, so the user always has the right words ready when they don't have the energy to compose them.

**MVP Implementation:** 3–4 static text templates with a tone toggle (blunt/soft). No new logic just additional copy blocks and a UI toggle.

### Quiet / Camouflage Mode 
A fully silent mode that keeps the underlying tracking active but removes all visible output — no glowing sphere, no alert banners — for users who don't want their coping tool visibly on display in public or at work.

**MVP Implementation:** A CSS class toggle that hides the sphere and alert UI, demonstrated live as a settings switch.

### Post-Event Debrief 
After a flagged high-demand event, Aura asks a simple two-question check-in: "How did that actually go?" This closes the loop between what Aura predicted and what the user actually experienced, building trust in the system's accuracy over time rather than treating every alert as a one-shot, unverified prediction.

**MVP Implementation:** A two-button modal ( Went okay /  Went badly) that appears after a simulated flagged event. Fully functional for the demo 

### Typing Pattern Awareness
Typing speed, backspacing/editing frequency, and pause patterns while composing a message can reflect cognitive load without ever reading the content of what's typed sidestepping content-privacy concerns entirely while still surfacing something real ("you've been typing much slower and editing more than usual today").

**MVP Implementation:** Simulated, not live-tracked. A canned insight is displayed at a scripted point in the demo (same technique as the EAL score), rather than instrumenting real keystroke capture — this avoids opening a second, harder-to-explain privacy surface during the hackathon.

### Calendar Awareness 
With permission, Aura would notice environmental/schedule load patterns such as "3 back-to-back social commitments today" treating schedule density as a measurable predictor of strain, distinct from and complementary to the voice signal.

**MVP Implementation:** Simulated with a hardcoded demo calendar (e.g. "3 back-to-back meetings"), not a real OAuth/Calendar API integration. Real calendar sync is scoped as a post-hackathon milestone (see Roadmap).

## Security, Privacy & Consent

Aura's MVP implements authenticated access through **email/password and Google sign-in**. The demo uses simulated analysis data and does not store raw voice recordings. The product architecture is built around concrete, structural consent principles rather than privacy being treated as a policy-only promise.

**Zero raw audio leaves this device.** In the envisioned production architecture, voice analysis occurs on the edge device using a local model. The backend receives only the minimum necessary derived data, using encrypted communication. The MVP UI communicates this privacy-first architecture, while the current demo uses simulated audio analysis.

**Mic-input only, never call output.** Aura is designed to capture only the user's local microphone input through `getUserMedia`, rather than a call platform's mixed or system audio. This is intended to ensure Aura analyzes the user's own voice rather than other participants' audio. Headphones are recommended to reduce speaker bleed into the microphone.

**Consent Buffer.** Every active Aura session includes a fixed listening period, after which a blocking "Still listening?" check-in appears. If the user does not respond within the timeout window, the session ends and microphone access is released.

**Persistent listening indicator.** While a session is active, a persistent, non-dismissible indicator remains visible so the user always knows Aura is actively listening.

**Manual session start.** Aura requires an explicit "Start Session" action and does not silently begin background listening. This reduces the risk of unintended microphone use.

**User-controlled data.** Aura is designed around data minimization, explicit consent, and user control. Optional integrations and future data sources such as calendars, wearables, and capacity sharing require explicit user permission.

The MVP demonstrates these principles through its authentication flow, session controls, privacy UX, and simulated data pipeline. Production deployment would add the necessary encryption, secure storage, retention, deletion, and access-control infrastructure required for handling sensitive wellbeing data.

## Accessibility and UX

The application follows a dark-mode "Aurora" theme designed to be ambient and beautiful, avoiding a clinical aesthetic. The color palette uses deep blues and purples with alarming ambers and reds reserved for high-strain alerts.

Accessibility considerations include:

- **Keyboard navigation:** All interactive elements are reachable via keyboard.
- **Screen reader support:** The shocking "Aura Output" visualization has a text-based description for screen readers (e.g., "Alert: high strain detected").
- **Color contrast:** Text and UI elements maintain sufficient contrast ratios against the dark background.
- **Clear feedback:** Button states, loading indicators, and error messages provide immediate feedback to user actions.
- **Personalized communication:** During onboarding, users can choose Aura's preferred communication style and tone.
- **Notification preferences:** Users choose how frequently Aura checks in, such as once daily, twice daily, or at custom intervals.
- **Quiet Mode:** Users can choose whether Quiet Mode is enabled by default, reducing visual notifications and interruptions.
- **Text preferences:** Users can customize text size, readability, and other supported display preferences.
- **User-controlled check-ins:** Check-ins are configurable and can be changed, paused, or disabled at any time.
- **Reduced-motion support:** Users who prefer less animation can reduce or disable non-essential motion and visual effects.
- **No critical information through color alone:** Aura's states and alerts use text, icons, or other indicators alongside color.
- 
The UX is designed around a three-act narrative: Calm, Crisis, and Rescue. Every click advances a clear human story of being rescued rather than a dry feature tour.


## Architecture

The architecture for the hackathon MVP is intentionally lightweight to fit the 3-day sprint, focusing on UI fidelity and a convincing narrative flow.

- **Frontend (React, Three.js/React Three Fiber, Framer Motion):** Handles UI rendering, Aura Sphere animations, audio playback, authentication, onboarding, consent/session controls, accessibility, and user interactions. Communicates with the backend for simulated score retrieval.
- **Backend (Python FastAPI):** Provides a single endpoint (`POST /api/v1/analyze`). Accepts a dummy file upload (ignored) and immediately returns a pre-configured JSON payload. Serves to demonstrate the technical scaffolding for a future real analysis pipeline.
- **Data Layer:** No persistent database in the MVP. All data for the timeline, scores, energy budget, and alerts is hard-coded or held in client-side state, reset on refresh.
- **AI/ML Simulation:** Not running in real-time. Offline Python scripts using Librosa and Matplotlib generated the spectral centroid graphs, jitter visualizations, and the chaotic "nervous system output" audio track for the demo assets. Typing-pattern and calendar-awareness insights are similarly canned for the demo.

## Technical Implementation

### Frontend
Built with React for rapid component development and clean state management. Three.js (via React Three Fiber) powers the Aura Sphere across its three core states. Framer Motion handles UI transitions and modal presentations, including the persistent consent banner and "Still listening?" check-in modal.

The "Lie Detector" screen uses coordinated timing via `useEffect` to synchronize audio playback, waveform animation, and simulated score display.

### Backend
Implemented in Python with FastAPI, chosen for simplicity, speed, and automatic OpenAPI documentation. The critical endpoint, `POST /api/v1/analyze`, ignores any uploaded file and returns a static payload:

```json
{
  "emotional_allostatic_load": 94,
  "masking_strain_index": 87,
  "timestamp": "2026-07-03T14:00:00Z"
}
```

This validates that the frontend/backend integration functions correctly, proving the system could ingest real data in a future iteration.

### AI/ML (Simulation Strategy)
For the hackathon, the AI/ML role focused on asset generation rather than real-time inference. Librosa was used offline to extract spectral centroid and jitter features from a real voice sample, visualized with Matplotlib for the pitch deck. A secondary "nervous system output" audio track was created by applying distortion and spectral shift effects to the calm voice track.

## How It Works (Hackathon MVP)

1. User navigates to the web application. The frontend loads the Aura Sphere dashboard and core UI components.
2. User sets their **Energy Budget** for the day via a simple slider.
3. User clicks "Start Session" to begin a simulated call — the **persistent listening banner** appears.
4. User clicks the "Vocal Analysis Demo" trigger, initiating a timed, pre-scripted animation sequence (calm audio + chaotic "Aura Output" visualization + high pre-calculated score).
5. User explores the simulated timeline, populated by hard-coded JSON, and any simulated typing-pattern or calendar-load insights.
6. User triggers the "Meltdown Prodrome Alert," revealing a realistic modal with a predictive probability.
7. User views the **Recalibration Protocol**, selecting from the expanded boundary-templates library.
8. Later, a **Post-Event Debrief** modal checks whether the flagged event matched reality.
9. If a session buffer period elapses, a **"Still listening?" check-in** appears; no response auto-ends the session.
10. Mock API integration: the frontend sends a dummy request to `/api/v1/analyze`; the backend returns the pre-configured EAL/MSI payload.

## Limitations

This is a proof-of-concept simulation, not a production-ready application.

- **Simulated AI.** All voice analysis, scoring, typing-pattern insight, calendar awareness, and predictions are simulated with pre-rendered assets and hard-coded JSON responses. There is no real-time feature extraction or machine learning inference.
- **No real data persistence.** The timeline, energy budget, and user state are not stored across sessions.
- **Limited device testing.** Primarily tested on modern desktop browsers.
- **Predictive claims.** The 72-hour predictive window and probability percentages (e.g., 78%) are illustrative for the demo, not derived from clinical data or validated models.
- **No integration with actual video call platforms.** The MVP does not integrate with Zoom, Teams, or Google Meet. The "call" is simulated within the demo flow, and the mic-only capture architecture is a stated design principle, not yet implemented against a live call.

## Roadmap

### Completed (Hackathon MVP)
- Aura Sphere visualization with three distinct states
- Vocal Analysis "Lie Detector" side-by-side demo
- Simulated Anomaly Event Timeline
- Meltdown Prodrome Alert modal
- Recalibration Protocol UI with expanded boundary-templates library
- Energy Budget ledger
- Quiet/Camouflage mode
- Post-Event Debrief
- Consent Buffer + persistent listening banner
- Simulated typing-pattern and calendar-awareness insights
- Mock backend API endpoint

### Next Steps (Post-Hackathon)
- Transition from simulated audio to real-time microphone input
- Develop the core feature extraction pipeline in JavaScript/WebAssembly
- Implement real calendar awareness via OAuth/Calendar API
- Implement real, privacy-preserving typing-pattern tracking (opt-in, content never read)
- "Translate this for me" — optional gentler-rephrase suggestions for outgoing messages

### Vision
- Full Edge-AI deployment with zero data leakage
- Wearable integration (resting heart rate, sleep quality) as supporting, non-primary context
- Optional, user-controlled sharing of capacity status with trusted contacts
- Real mic-only capture architecture validated against live Zoom/Meet calls

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- Python (v3.9 or higher)
- pip

### Clone the Repository
```bash
git clone https://github.com/Gevans4352/Aura---CSGirlies-Hackathon
cd aura
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install fastapi uvicorn python-multipart
```

### Environment Variables

Create a `.env` file in the `frontend` directory:

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | The URL of the backend server. Default: `http://localhost:8000` |

Create a `.env` file in the `backend` directory:

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | The port for the backend server. Default: `8000` |

### Development Server
```bash
cd backend
uvicorn main:app --reload --port 8000
```
```bash
cd frontend
npm run dev
```
The application will be available at `http://localhost:5173`.

### Build for Production
```bash
cd frontend
npm run build
```

## Usage

1. **Dashboard:** Observe the Aura Sphere in its default "Stable" state.
2. **Set Energy Budget:** Use the morning slider to set today's capacity.
3. **Start Session:** Click "Start Session" to see the persistent listening banner.
4. **Lie Detector Demo:** Click "Run Vocal Analysis." Watch the side-by-side comparison of calm spoken words versus chaotic nervous system output.
5. **Timeline:** Scroll through the pre-populated "Anomaly Events."
6. **Trigger Alert:** Click "Simulate Strain" to force the Meltdown Prodrome Alert modal.
7. **Recalibration:** Browse the expanded boundary-templates library and toggle tone (blunt/soft).
8. **Quiet Mode:** Toggle Quiet/Camouflage mode to see the silent UI state.
9. **Debrief:** Respond to the Post-Event Debrief modal after a flagged event.
10. **Consent Buffer:** Wait out the demo buffer period to see the "Still listening?" check-in fire.

## API Documentation

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/v1/analyze` | Simulates vocal analysis and returns a pre-calculated stress score. | None |

**Request Body:** Form-data with a `file` field (optional, ignored).

**Response (200 OK):**
```json
{
  "emotional_allostatic_load": 94,
  "masking_strain_index": 87,
  "timestamp": "2026-07-03T14:00:00Z"
}
```

**Error Response (500 Internal Server Error):**
```json
{
  "detail": "Analysis service unavailable"
}
```

## Project Structure
```
aura/
├── backend/
│   ├── main.py              # FastAPI application and endpoint logic
│   └── requirements.txt     # Python dependencies
├── frontend/
├── public/
│   └── audio/                 # Pre-recorded demo audio
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── AuraSphere/
│   │   ├── Timeline/
│   │   ├── Modal/
│   │   ├── ConsentBanner/
│   │   └── ...
│   ├── pages/                 # Page-level components
│   │   ├── Login/
│   │   ├── Signup/
│   │   ├── Dashboard/
│   │   ├── LieDetector/
│   │   └── Recalibration/
│   ├── hooks/                 # Reusable React hooks
│   ├── utils/                 # API client and utility functions
│   ├── styles/                # Global styles and theme
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
└── README.md
```

## Technical Decisions

- **React** was chosen for the frontend to leverage component-based architecture, enabling rapid development and clean state management for the demo narrative flow.*
-  **Three.js (React Three Fiber)** was selected for the Aura Sphere to create smooth, lightweight 3D animations across its three core states. The visual transitions help communicate Aura's high-tech, neural-inspired experience while remaining suitable for a responsive web interface.
- **Framer Motion** handles UI transitions and modal animations, including the consent banner and check-in modal, at a smooth 60fps without complex manual animation code.
- **Python with FastAPI** was chosen for the backend for its simplicity and rapid prototyping capabilities.
- **Simulated AI/ML, typing-pattern, and calendar signals** were chosen out of necessity for the 3-day sprint, allowing the team to focus on UX, narrative, and visual fidelity within the sprint timeline.

## Challenges and Solutions

**Challenge:** Creating a believable "lie detector" effect without real-time AI.
**Solution:** Librosa was used offline to generate realistic spectral centroid and jitter graphs from a real voice sample, animated and timed precisely to the pre-recorded audio clip.

**Challenge:** Balancing technical honesty with an ambitious vision.
**Solution:** The architecture and README clearly label MVP components versus the future production vision, while positioning the privacy and predictive concepts as the core intellectual property.

**Challenge:** Preventing the mic from being left on unintentionally, and protecting non-users' privacy during calls.
**Solution:** Designed a mic-input-only capture architecture, a persistent non-dismissible listening indicator, and a Consent Buffer that auto-ends sessions without a response — see Security, Privacy & Consent above.

**Challenge:** Maintaining smooth 60fps animations across different hardware.
**Solution:** Optimized sphere animation states using simple geometry and efficient shader techniques; used Framer Motion's hardware-accelerated transforms; tested on multiple devices.

## Testing

- **UI/UX Testing:** All animations, transitions, and modal triggers validated across Chrome, Firefox, and Safari.
- **Integration Testing:** Frontend/backend connection to `/api/v1/analyze` tested; frontend correctly renders updated state from a successful response.
- **Accessibility Spot Checks:** Basic keyboard navigation and screen reader text descriptions verified.

A comprehensive testing suite (unit, integration, end-to-end) has not been implemented for the hackathon. A recommended future plan would use Jest and React Testing Library for the frontend and pytest for the backend.

## Deployment

Not currently deployed to production. Intended deployment strategy:

- **Frontend:** Static site on Render.
- **Backend:** Containerized service on Render.

For the hackathon demo, the application is run locally from development servers.

## Demo

- **Live Application:** [NEEDS INPUT: URL]
- **Repository:** https://github.com/Gevans4352/Aura---CSGirlies-Hackathon
- **Demo Video:** [NEEDS INPUT: YouTube URL]
- **Screenshots:** [NEEDS INPUT: Link to screenshots or images]

## Team

- **Project Manager / Front-End Developer:** Genny
- **Back-End Developer:** Camilú
- **Product Designer:** yve
- **AI/ML Engineer:** shyriri

Each team member contributed to the core vision, execution, and pitch preparation for the 3-day hackathon sprint.

## Hackathon Context

This project was developed for Computer science girlies. The hackathon challenge focused on Technology for wellness

Aura addresses the challenge by applying advanced voice analysis concepts to mental health, specifically tailored for high-masking and high-functioning individuals, a demographic underserved by generic mental health tools. The simulation strategy allowed the team to deliver a high-fidelity user experience and a compelling narrative within the sprint, demonstrating both technical scoping and product vision.

## Impact

Aura has the potential to shift the paradigm of mental health monitoring from a reactive, self-reported model to a proactive, physiologically-informed one, while keeping the user, not the algorithm, in control of their own capacity and disclosure.

For individuals with high-functioning depression, it offers a reason to rest before exhaustion forces it upon them. For autistic individuals who mask, it validates the physical cost of their social performance and offers a structured way to step back without guilt. By reducing the incidence of unexpected meltdowns and depressive crashes, Aura could preserve relationships, maintain employment stability, and reduce personal distress. The privacy-first, consent-forward architecture ensures users do not have to trade their personal safety or the privacy of people around them — for predictive insight.

## License

MIT License

## Acknowledgements

The Aura team acknowledges the following libraries and tools used in development:

- React and React DOM
- Three.js and React-Three-Fiber
- Framer Motion
- FastAPI and Uvicorn
- Python and Librosa
- Matplotlib
- Vite

The conceptual framework for prosodic analysis and allostatic load draws on established research in psychophysiology and speech science.
