"use client";

import { Feather, Sparkles } from "lucide-react";
import { ProgressState } from "@/lib/story";

export function FeatheringPanel({ progress }: { progress: ProgressState }) {
  return (
    <section className="rounded-lg border border-antiqueGold/25 bg-antiqueGold/8 p-4">
      <div className="flex items-center gap-2 text-antiqueGold">
        <Feather className="h-4 w-4" />
        <p className="font-label text-xs uppercase tracking-[0.22em]">Feathering</p>
      </div>
      <p className="mt-2 text-sm text-silverBlue">
        Objects feathered: <span className="text-softWhite">{progress.featheredObjects.length}</span>
      </p>
      <div className="mt-3 space-y-2">
        {progress.featheredObjects.length ? (
          progress.featheredObjects.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm text-softWhite">
              <Sparkles className="h-3.5 w-3.5 text-antiqueGold" />
              {item}
            </div>
          ))
        ) : (
          <p className="text-sm text-silverBlue/75">No object has been released yet.</p>
        )}
      </div>
    </section>
  );
}
