"use client";

import { ProgressState, Scene } from "@/lib/story";

type Props = {
  scene: Scene;
  progress: ProgressState;
};

export function InventoryPanel({ scene, progress }: Props) {
  return (
    <section className="space-y-5">
      <div>
        <p className="font-label text-xs uppercase tracking-[0.28em] text-antiqueGold">Inventory</p>
        <div className="mt-3 space-y-2">
          {scene.objects.map((object) => (
            <div key={object} className="rounded-lg border border-parchment/10 bg-night/30 px-3 py-2 text-sm text-softWhite">
              {object}
            </div>
          ))}
        </div>
      </div>
      <div>
        <p className="font-label text-xs uppercase tracking-[0.28em] text-antiqueGold">Inner State</p>
        <div className="mt-3 space-y-3">
          {Object.entries(progress.meters).map(([key, value]) => (
            <div key={key}>
              <div className="mb-1 flex justify-between text-xs capitalize text-silverBlue">
                <span>{key}</span>
                <span>{value}</span>
              </div>
              <div className="h-2 rounded-full bg-softWhite/10">
                <div className="h-2 rounded-full bg-gradient-to-r from-tealMist via-lavenderMist to-antiqueGold" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
