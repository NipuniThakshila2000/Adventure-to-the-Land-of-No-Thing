"use client";

import { CheckCircle2 } from "lucide-react";
import { ProgressState, scenes } from "@/lib/story";

export function SaveProgressBar({ progress }: { progress: ProgressState }) {
  const completion = Math.round(((progress.currentScene - 1) / Math.max(1, scenes.length - 1)) * 100);

  return (
    <div className="glass-panel rounded-lg px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <span className="flex items-center gap-2 text-silverBlue">
          <CheckCircle2 className="h-4 w-4 text-antiqueGold" />
          Progress saved locally
        </span>
        <span className="font-label text-[10px] uppercase tracking-[0.22em] text-antiqueGold">{progress.lastTendency}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-softWhite/10">
        <div className="h-full rounded-full bg-antiqueGold" style={{ width: `${completion}%` }} />
      </div>
    </div>
  );
}
