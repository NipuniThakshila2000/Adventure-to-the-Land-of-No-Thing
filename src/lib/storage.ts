"use client";

import { getInitialProgress, ProgressState } from "@/lib/story";

const key = "stairway-no-thing-progress";

export function loadProgress(): ProgressState {
  if (typeof window === "undefined") return getInitialProgress();

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? { ...getInitialProgress(), ...JSON.parse(raw) } : getInitialProgress();
  } catch {
    return getInitialProgress();
  }
}

export function saveProgress(progress: ProgressState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(progress));
}

export function clearProgress() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}
