# AURA
**Emotional Immune System**

## Team

- **Project Manager / Front-End Developer:** Genny
- **Back-End Developer:** Camilú
- **Product Designer:** Shana (Yve)
- **AI/ML Engineer:** Shyriri

Everyone pitched in on the core vision, the actual build, and getting the pitch ready for the 3-day sprint.

## Track 

HEALTH TRACK 

## Overview

Aura's a web app we built for a hackathon, three days start to finish. It's basically a different way to think about mental health instead of asking you how you feel, it looks at what your body's actually doing on its own, without you having to say anything.

When you use it, you get this realistic screen that shows the gap between what you're saying and what your body's actually saying. Like you might say "I'm fine," but your body's telling a completely different story. Aura shows that gap using a glowing ball, a sound comparison, and a timeline that predicts what might be coming next.

Who it's for: people who are really good at hiding how they actually feel which maybe either depression, autism, that kind of thing. People who mask so well they don't even clock it themselves until something big hits. Aura's trying to give those people an early warning, basically an alarm that tells them to act before things get bad, so they can take care of themselves without burning through all their energy first.

## The Problem

"Prodromal blindness" is basically what we call it when someone can't recognize the early signs of emotional or sensory overload before it hits them full force.

Most mental health tools rely heavily on self-reporting you have to consciously sit down and identify how you're feeling and report it yourself. Aura's trying a different approach, combining quick self-reports with behavioral, environmental, physiological, and vocal signals (with consent obviously) to actually catch meaningful changes from your own personal baseline.

Aura's not trying to diagnose or predict anything with certainty, it's just trying to help you recognize your load rising early enough that you can actually do something about it.

## Our Solution

Aura tackles prodromal blindness by turning your voice into a quiet, predictive signal, then pairs that with low-effort tools you can actually use in the moment it fires.

From the user's side, it's a clean, ambient dashboard built around a central "Aura Sphere." You start a session or run through a demo scenario, and as it progresses, the sphere animates through three states: Stable (calm blue), Strained (amber-red), and Fractured (chaotic red alert).

The core of the experience is the Vocal Analysis screen, it compares your baseline against your current voice pattern and gives you an Emotional Authenticity Level score, showing how far what you're saying lines up with what your voice is actually doing underneath.

That leads into a Meltdown Prodrome Alert, which triggers a Recalibration Protocol a low-demand schedule and pre-written templates for backing out of social commitments, so you've got actual support before the crash, not just after. There's also an Energy Budget you set yourself, so you (not just the algorithm) stay in control of your own capacity.

## Why This Is Different

Aura's different from most mental health apps and voice-biomarker tools in a few ways:

**Predictive, not reactive:** Most apps only respond once you're already in crisis, or ask for a mood rating in the moment. Aura's trying to give you a heads-up 72 hours ahead, so it's preventive instead of reactive.

**Passive, not active:** Other tools need you to open the app and consciously type or speak into it. Aura's meant to run quietly in the background during calls you're already having, so it's not extra effort on top of everything else.

**Nervous system, not conscious thought:** A lot of tools depend on you accurately reading your own state, which is genuinely hard when you're masking well. Aura skips the conscious brain entirely and looks at involuntary vocal micro-tremors instead.

**Consumer, not clinical/B2B:** Most voice-biomarker tech gets sold into hospitals and call centers to monitor people from the outside. Aura's something you open for yourself, on your own terms.

**Privacy by design, not just a promise:** A lot of health apps just ask you to trust that your data gets deleted. Aura's built around raw audio never leaving your device only your own mic input gets analyzed, never anyone else's voice on a call. *(Note: the hackathon MVP simulates this principle the real architecture is scoped, not fully built yet.)*

**Actually targeting masking:** Most mental health tools focus on symptoms, not the strain that comes from autistic camouflaging specifically. Aura introduces a Masking Strain Index which is not a clinical diagnosis, just a way to notice when your current social/environmental load might be going past your usual baseline.

**Self-report as the real check, not just passive inference:** Aura pairs its voice signal with quick, optional self-reports (Energy Budget, Post-Event Debrief) so its predictions actually get checked and corrected against how you say things really went.

## Key Features

### Aura Sphere
The main dashboard's centered on an abstract glowing sphere that reflects your current state. It shifts between three conditions: Stable (slow-pulsing blue), Strained (amber-red), and Fractured (chaotic red). One glance tells you where you're at, no numbers needed.

### Vocal Analysis
This is where you actually see the gap. It compares your calm baseline voice against your current one side by side, and flags it with something like "Masking Fracture Detected. Emotional Authenticity Level: 18%." It's the moment that makes the whole point of Aura click.

### Meltdown Prodrome Alert
A realistic alert that pops up mid-demo: "Your Aura is showing strain. Based on your vocal pattern, there's a 78% probability of a sensory meltdown in the next 24–48 hours. A low-demand protocol is suggested." This is the predictive piece in action.

### Recalibration Protocol
After the alert, you land on a "social low-power mode" screen with a full library of boundary templates, not just one canned message.

### Energy Budget
Every morning you set your own capacity for example "3 out of 5 social budget today." Through the day, Aura tracks your spend against it as a gentle progress bar. Not a diagnosis, not something imposed on you not just something to check yourself against.

**MVP version:** A slider to set your morning budget, and a bar that depletes as simulated events happen through the demo. No backend needed, it's all held client-side.

### Boundary Templates
Instead of one scripted "no," this is a small library of pre-written templates for common situations: rescheduling, shortening a meeting, asking for written follow-up instead of a call, or just declining outright. Each one toggles between a blunter or softer tone, so you've got the words ready even when you don't have the energy to write them yourself.

**MVP version:** 3–4 static templates with a blunt/soft toggle.

### Quiet / Camouflage Mode
A fully silent mode tracking still runs underneath, but no glowing sphere, no alert banners. For when you don't want your coping tool visibly on display at work or in public.

**MVP version:** A CSS toggle that hides the sphere and alerts, shown live as a settings switch.

### Post-Event Debrief
After a flagged high-demand event, Aura just asks: "How did that actually go?" This closes the loop between what Aura predicted and what actually happened, so it builds trust over time instead of treating every alert as a one-off guess.

**MVP version:** A two-button modal (Went okay / Went badly) after a simulated flagged event. Fully working for the demo.

### Typing Pattern Awareness
Your typing speed, how much you're backspacing, and your pause patterns can reflect cognitive load without Aura ever reading what you're actually typing so it sidesteps content privacy while still catching something real, like "you've been typing much slower and editing more than usual today."

**MVP version:** Simulated, not live-tracked a insight shown at a scripted point in the demo rather than real keystroke capture, mainly to avoid opening a second privacy question during the hackathon.

### Calendar Awareness
With permission, Aura would notice schedule load, like "3 back-to-back social commitments today" treating a packed calendar as its own predictor of strain, separate from but working alongside the voice signal.

**MVP version:** Simulated with a hardcoded demo calendar, not real OAuth/Calendar integration yet. Real calendar sync is on the roadmap.

## Security, Privacy & Consent

Aura's MVP has authenticated access through email/password and Google sign-in. The demo uses simulated analysis data and doesn't store raw voice recordings. We built the architecture around actual consent principles, not just a privacy policy nobody reads.

**Zero raw audio leaves the device:** In the full vision, voice analysis happens on-device with a local model, and the backend only ever gets the minimum derived data over encrypted communication. The MVP UI reflects this principle even though the current demo simulates the analysis.

**Mic input only, never call output:** Aura's designed to capture only your own mic input through `getUserMedia`, not a call's mixed audio so it's analyzing your voice, not anyone else's. Headphones are recommended to keep speaker bleed out of the mic.

**Consent Buffer:** Every active session has a fixed listening window, after which a blocking "Still listening?" check-in pops up. No response within the timeout, and the session ends and mic access gets released.

**Persistent listening indicator:** While a session's active, there's a non-dismissible indicator always visible so you know Aura's actually listening.

**Manual session start:** Aura needs an explicit "Start Session" click, so it never silently starts listening in the background.

**User-controlled data:** Built around data minimization, explicit consent, and user control throughout.

The MVP demonstrates all of this through the auth flow, session controls, privacy UX, and the simulated data pipeline. A real production version would need proper encryption, secure storage, retention rules, and access control on top of this.

Aura's interface focuses on one main agenda: it reflects what the user tells it, it will not diagnose, infer, or detect. Every visual connection, decision, and implementation follows back to this main line. Its color palette ambience delivers a low sensory load, and its UI makes sure to avoid any sort of cognitive load.

The lens for this project aims to reach something far beyond what can be built in 48 hours; however, we put in all efforts to deliver something that implements our vision: to help, to comfort, and mainly to never judge.

### Screen Inventory

**Auth & Onboarding**
- Welcome / Sign Up / Sign In
- New user: a few questions for Aura to know you better
- "Let Aura hear your voice" — vocal baseline capture
- "Find Your Typing Baseline" — typing pattern baseline capture
- Privacy ("Your data. Your rules.")
- "How should Aura respond?" — tone preference (Direct & Factual / Gentle & Supportive) + Quiet Mode default

**Core App**
- **Dashboard** — orb, Emotional Allostatic Load score, Energy Budget slider, Today's Insights, quick links to Calendar and Typing Baseline flows
- **Active Listening** — live session state, recording your voice and tracking speech patterns, Run Voice Analysis to break down the session
- **Vocal Analysis (Analysis tab)** — baseline vs. current waveform comparison, Emotional Authenticity Level (EAL) score with risk banding, Key Indicators (Pitch Variation, Speech Rate, Vocal Tension, etc.)
- **Meltdown Prodrome Alert** — modal triggered from the analysis flow, showing predicted overload probability and a link to the Recalibration Protocol
- **Calendar Load** — today's commitments pulled from a (simulated) calendar, Estimated Calendar Load score for calibration
- **Timeline** — anomaly history (strain spikes, masking fracture events, social load spikes), Pattern Summary, Context Signals (typing pattern, calendar load)
- **Recalibration Protocol** — current state summary, recommended actions, boundary-setting message templates

### Design System

- Dark navy blue background, orb gradient (cool → warm colors to signal different states), purple for primary actions and selected states.
- Warm colors reserved for "alert" states, so they actually stand out and mean something at a glance.
- Simple, bold fonts to keep cognitive load low.
- Orb with a radial gradient and a soft outer glow, shifting color depending on state.
- SIMULATED tags on calendar load, typing pattern insights, and other non-live data points on Home and Timeline, to visually separate demo data from the parts of the flow that are actually live and interactive.

### Tools Used for Research & Design

- [Calming Color Palette Psychology](https://color-analysis.app/blog/calming-color-palette-psychology) — for the comprehensive color palette
- [Neurodiversity Design System](https://www.neurodiversity.design/) — referenced for component-level guidance (typography, motion, etc.)
- Figma — main prototype design process for static screens, using auto-layout to reuse components across multiple screens instead of remaking them each time

## Accessibility and UX

The app follows a dark-mode "Aurora" theme, meant to feel ambient rather than clinical. Deep blues and purples throughout, with ambers and reds saved specifically for high-strain alerts.

Accessibility considerations include:

- **Keyboard navigation:** every interactive element is reachable via keyboard
- **Screen reader support:** the "Aura Output" visualization has a text description for screen readers (e.g. "Alert: high strain detected")
- **Color contrast:** text and UI elements keep sufficient contrast against the dark background
- **Clear feedback:** button states, loading indicators, and error messages give immediate feedback
- **Personalized communication:** during onboarding, users pick Aura's preferred communication style and tone
- **Notification preferences:** users choose check-in frequency — once daily, twice daily, or custom
- **Quiet Mode:** users can choose whether Quiet Mode is on by default
- **Text preferences:** customizable text size and readability settings
- **User-controlled check-ins:** configurable, pausable, or fully disable-able at any time
- **Reduced-motion support:** users who prefer less animation can turn down or off non-essential motion
- **No critical info through color alone:** states and alerts always pair color with text or icons

The UX is built around a three-act narrative: Calm, Crisis, and Rescue. Every click moves the story forward instead of feeling like a dry feature tour.

## Architecture

The hackathon MVP's architecture stayed intentionally lightweight to fit the 3-day sprint — focused on UI fidelity and a convincing flow over deep infrastructure.

- **Frontend (React, Three.js/React Three Fiber, Framer Motion):** handles UI rendering, Aura Sphere animations, audio playback, auth, onboarding, consent/session controls, accessibility, and user interactions. Talks to the backend for simulated score retrieval.
- **Backend (Python FastAPI, Supabase):** handles Supabase-backed auth and the vocal analysis endpoints. The analysis endpoint takes a dummy file upload (ignored for now), returns a pre-configured JSON payload, and persists the result per user — the scaffolding's there for a real analysis pipeline down the line.
- **Data Layer:** onboarding responses live in the `profiles` table, vocal analysis results in the `analyses` table. Everything else timeline, energy budget, alerts is hardcoded or held in client-side state and resets on refresh.
- **AI/ML Simulation:** not running in real time. Offline Python scripts using Librosa and Matplotlib generated the spectral centroid graphs, jitter visualizations, and the "nervous system output" audio track used in the demo. Typing-pattern and calendar-awareness insights are similarly canned for now.

## Technical Implementation

### Frontend
Built with React for quick component development and clean state management. Three.js (via React Three Fiber) powers the Aura Sphere across its three states. Framer Motion handles the UI transitions and modal presentations, including the persistent consent banner and "Still listening?" check-in.

The Vocal Analysis screen uses `useEffect` to sync audio playback, waveform animation, and the score display all on the same timing.

### Backend
The backend's written in Python with FastAPI, mainly because it's simple, quick to build with, and generates its own API docs automatically. It's organized into routers, each with one clear job auth, service health, onboarding, and speech analysis. Config loads from `.env` for both the frontend and backend, and CORS is enabled so the frontend can call it without issues.

Supabase powers the whole data and identity layer. The backend runs two separate clients: one with the public key for standard auth stuff (registration, login, token renewal), and another with the service key used internally to read and write users' protected data neither client is ever exposed to the browser, the frontend only ever talks to the API. Auth itself supports email/password registration, logging in with email or Google, logging out, and refreshing tokens. Every protected endpoint checks the JWT in the request header before doing anything if it's invalid or expired, the API just errors out without touching any data. That's what keeps each user locked to only their own information.

### AI/ML (Simulation Strategy)
The AI/ML work here was about generating assets, not running real-time inference we ended up with two voice recordings, a calm one and a distorted one. Librosa pulled Spectral Centroid and Jitter features from the calm audio offline. Spectral Centroid basically measures the "center point" of a voice's frequency range how bright or sharp it sounds. Jitter measures how unstable the pitch is over time — how much vibration is actually in the voice. We measured both on the calm and distorted versions and visualized them with Matplotlib for the comparison graphs used in the Vocal Analysis demo.

## How It Works (Hackathon MVP)

1. You land on the app, the Aura Sphere dashboard and core UI load up
2. You set your Energy Budget for the day on a simple slider
3. You click "Start Session" to begin a simulated call 
4. You trigger the Vocal Analysis demo a timed animation runs through calm audio + the "Aura Output" visualization + a pre-calculated score
5. You explore the simulated timeline (hardcoded), and any simulated typing-pattern or calendar-load insights
6. You trigger the Meltdown Prodrome Alert, which shows a predictive probability
7. You view the Recalibration Protocol and browse the boundary-templates library
8. Later, a Post-Event Debrief checks whether the flagged event actually matched what happened
9. If a session buffer runs out, a "Still listening?" check-in fires no response ends the session automatically
10. Mock API call: the frontend sends a dummy request to `/api/v1/analyze`, and the backend returns the pre-configured EAL/MSI payload

## Limitations

This is a proof-of-concept, not a production-ready app.

- **Simulated AI:** All voice analysis, scoring, typing-pattern insight, calendar awareness, and predictions run on pre-rendered assets and hardcoded JSON, not real-time feature extraction or inference.
- **No real data persistence:** Timeline, energy budget, and most user state don't persist across sessions.
- **Limited device testing:** Mostly tested on modern desktop browsers.
- **Predictive claims:** The 72-hour window and probability percentages (like 78%) are illustrative for the demo, not pulled from clinical data or validated models.
- **No real video call integration:** No Zoom, Teams, or Meet integration yet the "call" is simulated, and the mic-only capture architecture is a design principle we haven't fully implemented against a live call yet.
- **API integration:** In the demo, analysis runs as a local simulation in the browser, the backend endpoint exists and responds, but actually sending the audio file from the frontend isn't wired up yet.

## Roadmap

**Completed (Hackathon MVP)**
- Aura Sphere with three states
- Vocal Analysis side-by-side demo
- Simulated Anomaly Timeline
- Meltdown Prodrome Alert modal
- Recalibration Protocol with the expanded boundary-templates library
- Energy Budget ledger
- Quiet/Camouflage mode
- Post-Event Debrief
- Consent Buffer + persistent listening banner
- Simulated typing-pattern and calendar-awareness insights
- Mock backend API endpoint

**Next Steps (Post-Hackathon)**
- Move from simulated audio to real-time mic input
- Build the real feature extraction pipeline in JavaScript/WebAssembly
- Real calendar awareness via OAuth/Calendar API
- Real, privacy-preserving typing-pattern tracking (opt-in, content never read)
- "Translate this for me" — optional gentler-rephrase suggestions for outgoing messages

**Vision**
- Full edge-AI deployment, zero data leakage
- Wearable integration (resting heart rate, sleep) as supporting context, not the primary signal
- Optional, user-controlled sharing of capacity status with trusted contacts
- Real mic-only capture validated against live Zoom/Meet calls

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm
- Python (v3.10 or higher; 3.12 recommended)
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
pip install -r requirements.txt
```

### Environment Variables

Create a `.env` file in the `frontend` directory:

| Variable | Required | Description |
|---|---|---|
| `VITE_API_URL` | Yes | The URL of the backend server. Default: `http://localhost:8000` |
| `VITE_SUPABASE_URL` | Yes | The URL of the Supabase project (Project Settings → API) |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Yes | The Supabase publishable (anon) key |

Create a `.env` file in the `backend` directory:

| Variable | Required | Description |
|---|---|---|
| `SUPABASE_URL` | Yes | The URL of your Supabase project |
| `SUPABASE_ANON_KEY` | Yes | The Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | The Supabase service role key |

### Development Server
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```
```bash
cd frontend
npm run dev
```
The app runs at `http://localhost:5173`.

### Build for Production
```bash
cd frontend
npm run build
```

## Usage

1. **Dashboard:** see the Aura Sphere in its default "Stable" state
2. **Set Energy Budget:** use the morning slider to set today's capacity
3. **Start Session:** click "Start Session" to see the persistent listening banner
4. **Vocal Analysis Demo:** click "Run Vocal Analysis" and watch the side-by-side comparison
5. **Timeline:** scroll through the pre-populated "Anomaly Events"
6. **Trigger Alert:** click "Simulate Strain" to force the Meltdown Prodrome Alert modal
7. **Recalibration:** browse the boundary-templates library and toggle tone (blunt/soft)
8. **Quiet Mode:** toggle Quiet/Camouflage mode to see the silent UI state
9. **Debrief:** respond to the Post-Event Debrief modal after a flagged event
10. **Consent Buffer:** wait out the demo buffer to see the "Still listening?" check-in fire

## API Documentation
> Best experience is running the backend locally and checking out http://127.0.0.1:8000/docs

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Creates a user and returns session tokens. Body: `{name, email, password}` | None |
| POST | `/api/v1/auth/login` | Signs in a user and returns session tokens. Body: `{email, password}` | None |
| GET | `/api/v1/auth/me` | Returns the current authenticated user | Bearer token |
| POST | `/api/v1/auth/logout` | Ends the current session | Bearer token |
| POST | `/api/v1/auth/refresh` | Rotates the access token. Body: `{refresh_token}` | None |
| GET | `/api/v1/health` | Health check | None |
| POST | `/api/v1/analyze` | Simulated vocal analysis. Persists the result and returns a pre-calculated stress score. | Bearer token |
| GET | `/api/v1/analysis/latest` | Returns the authenticated user's most recent vocal analysis | Bearer token |
| GET | `/api/v1/onboarding` | Returns the authenticated user's onboarding profile and derived baseline | Bearer token |
| POST | `/api/v1/onboarding` | Saves onboarding answers and derives baseline MSI. Body: `{answers: {...}, quiet_mode_default?: boolean}` | Bearer token |

**Auth Response (200 OK):** `register` and `login` return session tokens:

```json
{
  "access_token": "...",
  "refresh_token": "...",
  "user": {
    "id": "...",
    "email": "...",
    "name": "..."
  }
}
```

**Analyze Request:** returns `500 {"detail": "Analysis service unavailable"}` when the backend runs with `ANALYZE_ENABLED=false`.

**Request Body:** Form-data with a `file` field (optional, ignored).

**Response (200 OK):**
```json
{
  "emotional_allostatic_load": 18,
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
│   ├── requirements.txt        # Python dependencies
│   ├── sql/                    # Tables + RLS
│   └── app/
│       ├── main.py             # FastAPI app, CORS, routers
│       ├── core/config.py      # Settings from .env
│       ├── deps.py             # Supabase clients + JWT validation
│       ├── schemas.py          # Pydantic models
│       └── routers/            # auth, health, analyze, onboarding
├── frontend/
│   ├── public/
│   │   └── audio/                 # Pre-recorded demo audio
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   │   ├── AmbientQuote/
│   │   │   ├── AuraSphere/
│   │   │   ├── CalendarLoadModal/
│   │   │   ├── ConsentBanner/
│   │   │   ├── MeltdownProdromeAlert/
│   │   │   ├── Modal/
│   │   │   ├── NavBar/
│   │   │   ├── PostEventDebrief/
│   │   │   ├── StillListeningCheckIn/
│   │   │   ├── Timeline/
│   │   │   └── VocalAnalysisReveal/
│   │   ├── pages/                 # Page-level components
│   │   │   ├── Analysis/
│   │   │   ├── Dashboard/
│   │   │   ├── Landing/
│   │   │   ├── Login/
│   │   │   ├── NotFound/
│   │   │   ├── Onboarding/
│   │   │   ├── Recalibration/
│   │   │   ├── Register/
│   │   │   ├── Session/
│   │   │   └── Settings/
│   │   ├── hooks/                 # Reusable React hooks
│   │   ├── utils/                 # API client and utility functions
│   │   ├── styles/                # Global styles and theme
│   │   ├── lib/
│   │   │   ├── debriefStorage.js
│   │   │   ├── onboardingStorage.js
│   │   │   ├── quietMode.js
│   │   │   └── supabase.js        # Supabase client (Google OAuth)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── aura-simulation-strategy/   # Offline audio/graph generation scripts
└── README.md
```

## Technical Decisions

- **React** — component-based architecture made sense for rapid development and clean state management for the demo flow
- **Framer Motion** — handles UI transitions and modal animations, including the consent banner and check-in modal, at a smooth 60fps without hand-rolling animation logic
- **Python with FastAPI** — simple and fast to build with. Given the 3-day timeline, setting up something heavier like microservices or Kubernetes would've just slowed us down
- **Simulated AI/ML, typing-pattern, and calendar signals** — necessary given the sprint length, so we could focus energy on UX, narrative, and visual fidelity instead

## Challenges and Solutions

**Challenge:** creating a believable analysis effect without real-time AI.
**Solution:** used Librosa offline to generate realistic spectral centroid and jitter graphs from a real voice sample, animated and timed precisely against the pre-recorded audio.

**Challenge:** balancing technical honesty with an ambitious vision.
**Solution:** clearly labeled MVP components vs. the future production vision throughout the architecture and README, while treating the privacy and predictive concepts as the actual core IP.

**Challenge:** stopping the mic from being left on by accident, and protecting the privacy of anyone else on a call.
**Solution:** built a mic-input-only capture architecture, a persistent non-dismissible listening indicator, and a Consent Buffer that auto-ends sessions with no response.

**Challenge:** keeping animations smooth at 60fps across different hardware.
**Solution:** optimized the sphere's animation states with simple geometry and efficient shaders, used Framer Motion's hardware-accelerated transforms, and tested across multiple devices.

## Testing

- **UI/UX Testing:** all animations, transitions, and modal triggers checked across Chrome, Firefox, and Safari
- **Integration Testing:** frontend/backend connection tested through login, onboarding, retrieving the latest analysis, and displaying that data correctly on the dashboard
- **Accessibility Spot Checks:** basic keyboard navigation and screen reader text descriptions verified

A full testing suite (unit, integration, end-to-end) hasn't been built out yet for the hackathon version. Next step would be Jest and React Testing Library on the frontend, pytest on the backend.

## Deployment

- **Frontend:** Static Site on Render
- **Backend:** Web Service on Render

## Demo

- **Repository:** https://github.com/Gevans4352/Aura---CSGirlies-Hackathon
- **Demo Video:** https://youtu.be/ZDCayvEf-5E?si=uCGcdAL5eGu_HKyU
- **Screenshots / Prototype:** https://www.figma.com/design/baxvRCmi870K5NN8ZzMN99/AURA---Prototype?node-id=0-1

## Hackathon Context

This project was built for CS Girlies. The challenge was Technology for Wellness.

Aura tackles it by applying voice analysis to mental health, specifically for high-masking and high-functioning people  a group most generic mental health tools tend to miss which belongs to the Health track. The simulation strategy let the team deliver a high-fidelity experience and a real narrative within the sprint, while still showing the technical scope and product vision behind it.

## Impact

Aura's trying to shift mental health monitoring from a reactive, self-reported model to something more proactive and physiologically-informed, while keeping the user — not the algorithm — in control of their own capacity and what they choose to disclose.

For people with high-functioning depression, it's a reason to rest before exhaustion forces it on them. For autistic people who mask, it validates the actual physical cost of that performance and gives a structured way to step back without guilt. Fewer unexpected meltdowns and crashes could mean preserved relationships, more stable employment, and less personal distress overall. The privacy-first, consent-forward design means people don't have to trade their own safety, or the privacy of people around them, just to get that kind of insight.

## License

MIT License

## Acknowledgements

The Aura team acknowledges the following libraries and tools used in development:

- React and React DOM
- Framer Motion
- FastAPI and Uvicorn
- Python and Librosa
- Matplotlib
- Vite

The conceptual framework for prosodic analysis and allostatic load draws on established research in psychophysiology and speech science.
