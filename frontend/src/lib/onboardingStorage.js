const TYPING_KEY = "aura_typing_baseline";
const CALENDAR_KEY = "aura_calendar_load";

export function setTypingBaseline(baseline) {
  try {
    localStorage.setItem(TYPING_KEY, JSON.stringify(baseline));
  } catch {
    // ignore
  }
}

export function getTypingBaseline() {
  try {
    const raw = localStorage.getItem(TYPING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCalendarLoad(commitments) {
  try {
    localStorage.setItem(CALENDAR_KEY, JSON.stringify(commitments));
  } catch {
    // ignore
  }
}

export function getCalendarLoad() {
  try {
    const raw = localStorage.getItem(CALENDAR_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
