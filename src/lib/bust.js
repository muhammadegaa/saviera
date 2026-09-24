const KEY = "saviera-bust";

export function readBust() {
  try {
    const value = Number(localStorage.getItem(KEY));
    return value >= 70 && value <= 140 ? value : null;
  } catch {
    return null;
  }
}

export function saveBust(value) {
  try {
    localStorage.setItem(KEY, String(value));
  } catch {
    // Private mode or blocked storage: the fit finder still works for this page view.
  }
}
