"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Props = {
  mood: "peaceful" | "dark";
  src: string;
};

const fadeStepMs = 80;
const maxVolume = 0.58;

export function AudioToggleButton({ mood, src }: Props) {
  const [enabled, setEnabled] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const Icon = enabled ? Volume2 : VolumeX;

  useEffect(() => {
    const audio = new Audio(src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    return () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
      audio.pause();
      audioRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeRef.current) window.clearInterval(fadeRef.current);

    if (!enabled) {
      fadeRef.current = window.setInterval(() => {
        audio.volume = Math.max(0, audio.volume - 0.08);
        if (audio.volume === 0) {
          audio.pause();
          if (fadeRef.current) window.clearInterval(fadeRef.current);
        }
      }, fadeStepMs);
      return;
    }

    if (audio.src !== new URL(src, window.location.href).href) {
      audio.pause();
      audio.src = src;
      audio.currentTime = 0;
      audio.volume = 0;
    }

    audio.play().catch(() => undefined);
    fadeRef.current = window.setInterval(() => {
      audio.volume = Math.min(maxVolume, audio.volume + 0.08);
      if (audio.volume >= maxVolume && fadeRef.current) window.clearInterval(fadeRef.current);
    }, fadeStepMs);
  }, [enabled, src]);

  return (
    <button
      type="button"
      aria-label={enabled ? `Disable ${mood} music` : `Enable ${mood} music`}
      title={enabled ? `Disable ${mood} music` : `Enable ${mood} music`}
      onClick={() => setEnabled((value) => !value)}
      className="rounded-full border border-parchment/20 bg-night/45 p-3 text-antiqueGold transition hover:border-antiqueGold/70 hover:shadow-gold"
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}
