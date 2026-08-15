const STORAGE_KEY = "aura_pending_debrief";

//  * Call this whenever an event should trigger a debrief check-in on the
//  * person's next Dashboard visit — not immediately, since they might
//  * still be mid-session or mid-analysis when this fires.

export function setPendingDebrief(eventLabel) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ eventLabel, flaggedAt: Date.now() }),
    );
  } catch {
  }
}

export function getPendingDebrief() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearPendingDebrief() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
