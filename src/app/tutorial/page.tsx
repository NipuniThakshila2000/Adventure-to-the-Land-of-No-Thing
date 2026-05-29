"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, BookOpen, Compass, MousePointer2, RotateCcw } from "lucide-react";
import { AppLogo } from "@/components/AppLogo";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";

const steps = [
  {
    title: "Read the Scene",
    text: "Each act gives you a place, a quote, and a story moment. Read it like a page from an expedition journal.",
    icon: BookOpen
  },
  {
    title: "Choose a Path",
    text: "Pick one choice card. Your decision changes Elias's inner meters and decides which scene, false path, or ending opens next.",
    icon: MousePointer2
  },
  {
    title: "Watch the Journey",
    text: "Use the map, inventory, and progress meters to understand what your choices are teaching you.",
    icon: Compass
  },
  {
    title: "Restart Anytime",
    text: "A different route can reveal a different ending, so replaying is part of the adventure.",
    icon: RotateCcw
  }
];

const cmsReduxNotice = [
  "Please do not share this with anyone who has not subscribed to CMS Redux.",
  "This experience has been especially designed for those who have completed the last 11 sessions. It is not your average \"choose your own adventure\" game. Much like Tohu Wa Bohu, this is a journey that might be hard to 'define' - hidden from those who do not seek, but filled with familiar signs and symbols for those who have walked the path.",
  "There are multiple endings to this journey, and none of them should be seen as simply \"wrong.\" The goal - if there ever was one - is to stop clutching, grabbing, reacting, and acting from wrath. Instead, the journey invites you to notice, release, and return with a different kind of awareness.",
  "This was designed as a fun experiment for those who have been following CMS Redux - a new way to jog your memory, revisit familiar lessons, and experience the material in a more playful, interactive form.",
  "As you play, you may recognize certain elements from the sessions, woven into the story in a way that invites reflection, discovery, and deeper perception.",
  "Also, please remember that this is the first time we are creating something like this, so there may still be a few errors or rough edges. Thank you for approaching it with grace, curiosity, and the same spirit of exploration that brought you this far."
];

export default function TutorialPage() {
  return (
    <main className="min-h-screen">
      <AtmosphericBackground image="/images/home-background.jpeg" intensity="soft" />
      <div className="fixed left-3 top-3 z-20 sm:left-4 sm:top-4">
        <AppLogo />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-14 pt-28 sm:px-5 sm:py-32">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="max-w-4xl">
          <p className="font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold sm:text-xs sm:tracking-[0.32em]">Tutorial mission</p>
          <h1 className="mt-4 font-display text-4xl leading-none text-softWhite sm:text-5xl md:text-7xl">How to Play</h1>
          <p className="mt-6 max-w-3xl text-lg leading-7 text-parchment sm:text-xl sm:leading-8">
            This is a choose your own adventure game. You guide Elias through mystical scenes by reading the story,
            choosing what he does next, and watching those choices shape the final ending.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.08 }} className="glass-panel mt-8 max-w-4xl rounded-2xl p-4 sm:p-6">
          <p className="font-label text-xs uppercase tracking-[0.26em] text-antiqueGold">CMS Redux note</p>
          <div className="mt-4 space-y-4 text-sm leading-7 text-silverBlue sm:text-base">
            {cmsReduxNotice.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1 }} className="glass-panel rounded-2xl p-4 sm:p-5 md:p-7">
            <div className="rounded-xl border border-antiqueGold/35 bg-night/50 p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-antiqueGold/45 px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold">Act 1</span>
                <span className="text-sm text-silverBlue">Tutorial preview</span>
              </div>
              <h2 className="mt-5 font-display text-3xl text-softWhite sm:text-4xl">The First Door</h2>
              <p className="mt-4 leading-7 text-silverBlue">
                The story appears here. When you are ready, follow the arrow to the choice cards and click the path that feels right.
              </p>
              <ArrowDown className="mx-auto mt-5 h-8 w-8 animate-bounce text-antiqueGold" aria-hidden="true" />
              <div className="mt-4 grid gap-3">
                <div className="rounded-lg border border-antiqueGold/70 bg-antiqueGold/10 p-4 shadow-gold">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-xl leading-tight text-softWhite">Click a choice card to continue.</p>
                      <p className="mt-2 font-label text-[10px] uppercase tracking-[0.22em] text-silverBlue/75">This advances the story</p>
                    </div>
                    <MousePointer2 className="h-5 w-5 shrink-0 text-antiqueGold" aria-hidden="true" />
                  </div>
                </div>
                <div className="rounded-lg border border-parchment/15 bg-night/40 p-4 text-silverBlue">Other choices may lead to different consequences.</div>
              </div>
            </div>
          </motion.div>

          <motion.aside initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.18 }} className="glass-panel rounded-2xl p-5">
            <p className="font-label text-xs uppercase tracking-[0.26em] text-antiqueGold">Mission path</p>
            <div className="mt-5 space-y-4">
              {steps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.title}>
                    <div className="flex gap-3 rounded-lg border border-parchment/12 bg-night/35 p-4">
                      <Icon className="mt-1 h-5 w-5 shrink-0 text-antiqueGold" aria-hidden="true" />
                      <div>
                        <h3 className="font-display text-xl text-softWhite">{step.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-silverBlue">{step.text}</p>
                      </div>
                    </div>
                    {index < steps.length - 1 ? <ArrowDown className="mx-auto my-2 h-5 w-5 text-antiqueGold" aria-hidden="true" /> : null}
                  </div>
                );
              })}
            </div>
            <Link href="/game" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-antiqueGold px-5 py-3 text-center font-semibold text-night transition hover:bg-parchment hover:shadow-gold">
              Start the First Mission
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link href="/" className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-parchment/20 bg-night/35 px-5 py-3 text-silverBlue transition hover:border-antiqueGold/45 hover:text-antiqueGold">
              Back to Menu
            </Link>
          </motion.aside>
        </div>
      </section>
    </main>
  );
}
