"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Choice } from "@/lib/story";

type Props = {
  choice: Choice;
  label?: string;
  onChoose: (choice: Choice) => void;
};

export function ChoiceCard({ choice, label, onChoose }: Props) {
  return (
    <motion.button
      type="button"
      onClick={() => onChoose(choice)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className="group w-full rounded-lg border border-parchment/15 bg-night/42 p-4 text-left transition hover:border-antiqueGold/70 hover:bg-antiqueGold/10 hover:shadow-gold"
    >
      <span className="flex items-start justify-between gap-4">
        <span>
          <span className="block font-display text-xl leading-tight text-softWhite">{label ?? choice.text}</span>
          <span className="mt-2 block font-label text-[10px] uppercase tracking-[0.22em] text-silverBlue/70">
            {choice.tendency}
          </span>
        </span>
        <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-antiqueGold transition group-hover:translate-x-1" />
      </span>
    </motion.button>
  );
}
