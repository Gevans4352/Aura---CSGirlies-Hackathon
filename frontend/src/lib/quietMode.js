const KEY = "aura_quiet_mode";

export function getQuietMode() {
  return localStorage.getItem(KEY) === "true";
}

export function setQuietMode(enabled) {
  localStorage.setItem(KEY, String(enabled));
  window.dispatchEvent(new Event("quiet-mode-change"));
}
