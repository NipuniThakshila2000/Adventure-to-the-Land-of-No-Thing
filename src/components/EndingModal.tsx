"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Ending } from "@/lib/story";

type Props = {
  ending: Ending | null;
  onClose: () => void;
  onRestart: () => void;
};

export function EndingModal({ ending, onClose, onRestart }: Props) {
  return (
    <AnimatePresence>
      {ending ? (
        <motion.div className="fixed inset-0 z-50 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-night/78 backdrop-blur-md" />
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.98 }}
            className="glass-panel relative max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl"
          >
            <div
              className="h-40 bg-cover bg-center sm:h-52"
              style={{ backgroundImage: `linear-gradient(rgba(7,17,31,.1), rgba(7,17,31,.86)), url(${ending.image})` }}
            />
            <div className="p-5 sm:p-7">
              <p className="font-label text-xs uppercase tracking-[0.28em] text-antiqueGold">Ending unlocked</p>
              <h2 className="mt-2 font-display text-3xl text-softWhite sm:text-4xl">{ending.title}</h2>
              <p className="mt-4 text-base leading-7 text-parchment sm:text-lg sm:leading-8">{ending.meaning}</p>
              <p className="mt-3 text-sm leading-6 text-silverBlue">{ending.summary}</p>
              <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
                <Link href="/endings" className="rounded-lg bg-antiqueGold px-5 py-3 text-center font-semibold text-night transition hover:bg-parchment">
                  View Endings
                </Link>
                <button type="button" onClick={onRestart} className="rounded-lg border border-antiqueGold/45 px-5 py-3 text-antiqueGold transition hover:bg-antiqueGold/10">
                  Begin Again
                </button>
                <button type="button" onClick={onClose} className="rounded-lg border border-parchment/20 px-5 py-3 text-silverBlue transition hover:bg-softWhite/10">
                  Stay Here
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
