"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export function MobileDrawer({ title, open, onClose, children }: Props) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-50 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label="Close drawer" className="absolute inset-0 bg-night/70" onClick={onClose} />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            className="glass-panel absolute inset-x-0 bottom-0 max-h-[82vh] overflow-y-auto rounded-t-2xl p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl">{title}</h2>
              <button type="button" onClick={onClose} className="rounded-full border border-parchment/20 p-2 text-silverBlue">
                <X className="h-5 w-5" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
