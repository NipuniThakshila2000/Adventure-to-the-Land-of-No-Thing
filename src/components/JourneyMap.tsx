"use client";

import { scenes } from "@/lib/story";

type Props = {
  currentScene: number;
  onSelect?: (sceneId: number) => void;
};

export function JourneyMap({ currentScene, onSelect }: Props) {
  return (
    <nav className="space-y-3">
      <p className="font-label text-xs uppercase tracking-[0.28em] text-antiqueGold">Journey Map</p>
      <div className="space-y-2">
        {scenes.map((scene) => {
          const active = scene.id === currentScene;
          const available = scene.id <= currentScene;
          return (
            <button
              key={scene.id}
              type="button"
              disabled={!available}
              onClick={() => onSelect?.(scene.id)}
              className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition ${
                active
                  ? "border-antiqueGold/70 bg-antiqueGold/12 shadow-gold"
                  : "border-parchment/10 bg-night/28 hover:border-parchment/25"
              } ${available ? "text-softWhite" : "text-silverBlue/35"}`}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-antiqueGold/45 font-label text-xs">
                {scene.id}
              </span>
              <span>
                <span className="block text-sm font-semibold">{scene.title}</span>
                <span className="block text-xs text-silverBlue/70">{scene.imageTitle}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
