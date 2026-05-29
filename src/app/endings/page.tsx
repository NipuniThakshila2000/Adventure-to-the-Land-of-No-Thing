"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Trophy } from "lucide-react";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";
import { loadProgress } from "@/lib/storage";
import { endings, getInitialProgress, ProgressState } from "@/lib/story";

export default function EndingsPage() {
  const [progress, setProgress] = useState<ProgressState>(getInitialProgress());

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  return (
    <main className="min-h-screen px-5 py-16">
      <AtmosphericBackground image="/images/scenes/scene-07-stairway-of-sinclair.png" intensity="soft" />
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-antiqueGold hover:text-parchment">Return home</Link>
        <h1 className="mt-6 font-display text-6xl text-softWhite">Unlocked Endings</h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-silverBlue">
          Five possible conclusions shape Elias&apos;s relation to knowledge, identity, surrender, possession, and return.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {endings.map((ending) => {
            const unlocked = progress.unlockedEndings.includes(ending.id);
            return (
              <article key={ending.id} className={`glass-panel overflow-hidden rounded-2xl ${unlocked ? "" : "opacity-70"}`}>
                <div
                  className={`h-44 bg-cover bg-center ${unlocked ? "" : "blur-sm grayscale"}`}
                  style={{ backgroundImage: `linear-gradient(rgba(7,17,31,.05), rgba(7,17,31,.8)), url(${ending.image})` }}
                />
                <div className="p-5">
                  <p className="flex items-center gap-2 font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold">
                    {unlocked ? <Trophy className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    {unlocked ? "Unlocked" : "Locked"}
                  </p>
                  <h2 className="mt-2 font-display text-3xl text-softWhite">{ending.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-silverBlue">{unlocked ? ending.summary : ending.trigger}</p>
                  <p className="mt-4 rounded-lg border border-antiqueGold/25 bg-antiqueGold/8 p-3 text-sm text-parchment">
                    {unlocked ? ending.meaning : "Meaning hidden until unlocked."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
