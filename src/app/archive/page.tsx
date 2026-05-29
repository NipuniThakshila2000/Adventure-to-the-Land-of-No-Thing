"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";
import { loadProgress } from "@/lib/storage";
import { archiveFragments, falsePaths, getInitialProgress, ProgressState, scenes } from "@/lib/story";

export default function ArchivePage() {
  const [progress, setProgress] = useState<ProgressState>(getInitialProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const unlocked = new Set([...progress.unlockedArchive, ...progress.featheredObjects.map((item) => `Feathered object: ${item}`)]);

  return (
    <main className="min-h-screen px-5 py-16">
      <AtmosphericBackground image="/images/scenes/scene-01-university-of-names.png" intensity="soft" />
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-antiqueGold hover:text-parchment">Return home</Link>
        <h1 className="mt-6 font-display text-6xl text-softWhite">Sinclair&apos;s Archive</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-silverBlue">
          Journal fragments, objects, false paths, ending meanings, Sinclair quotes, and feathered objects unlocked through play.
        </p>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {[...archiveFragments, ...Array.from(unlocked)].map((item) => (
            <article key={item} className="parchment-panel rounded-lg p-5">
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold">Unlocked record</p>
              <p className="mt-3 leading-7 text-softWhite">{item}</p>
            </article>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="font-display text-4xl text-softWhite">False Paths</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {falsePaths.map((path) => {
              const known = progress.unlockedArchive.some((item) => item.includes(path.title)) || progress.path.some((item) => scenes.find((scene) => scene.id === path.sceneId));
              return (
                <article key={path.id} className={`glass-panel rounded-lg p-5 ${known ? "" : "blur-[2px] opacity-60"}`}>
                  <p className="font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold">{known ? "Known false path" : "Locked path"}</p>
                  <h3 className="mt-2 font-display text-2xl text-softWhite">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-silverBlue">{known ? path.realization : "Return to the expedition to uncover this path."}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
