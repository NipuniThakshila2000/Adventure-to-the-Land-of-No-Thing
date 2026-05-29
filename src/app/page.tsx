"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Compass, LogOut } from "lucide-react";
import { AppLogo } from "@/components/AppLogo";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";
import { SceneCard } from "@/components/SceneCard";
import { scenes } from "@/lib/story";

const heroImage = "/images/home-background.jpeg";

export default function HomePage() {
  const handleExit = () => {
    window.close();

    if (!window.closed) {
      window.history.back();
    }
  };

  return (
    <main className="min-h-screen">
      <AtmosphericBackground image={heroImage} />
      <div className="fixed left-4 top-4 z-20">
        <AppLogo />
      </div>
      <section className="relative flex min-h-[92vh] items-center px-5 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-4xl">
            <p className="font-label text-xs uppercase tracking-[0.32em] text-antiqueGold">A mystical archaeological visual novel</p>
            <h1 className="mt-5 font-display text-6xl leading-none text-softWhite md:text-8xl lg:text-9xl">
              The Stairway of NO-Thing
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-parchment">
              An explorer searches for a vanished doctor and discovers the passage between mystery and reality.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/game" className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg bg-antiqueGold px-6 py-3 font-semibold text-night transition hover:bg-parchment hover:shadow-gold">
                <Compass className="h-5 w-5" aria-hidden="true" />
                Play Game
              </Link>
              <button type="button" onClick={handleExit} className="inline-flex min-w-36 items-center justify-center gap-2 rounded-lg border border-parchment/20 bg-night/45 px-6 py-3 text-silverBlue transition hover:border-antiqueGold/45 hover:text-antiqueGold">
                <LogOut className="h-5 w-5" aria-hidden="true" />
                Exit
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="glass-panel rounded-2xl p-5">
            <p className="font-label text-xs uppercase tracking-[0.28em] text-antiqueGold">Current expedition</p>
            <h2 className="mt-3 font-display text-3xl text-softWhite">The Ascent and the Descent</h2>
            <p className="mt-3 leading-7 text-silverBlue">
              The entrance is not hidden by stone. It is hidden by meaning.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-5 pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="font-label text-xs uppercase tracking-[0.28em] text-antiqueGold">Seven thresholds</p>
            <h2 className="mt-2 font-display text-4xl text-softWhite">Scene Archive</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {scenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      </section>
    </main>
  );
}
