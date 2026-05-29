"use client";

import { motion } from "framer-motion";

type Props = {
  image: string;
  intensity?: "soft" | "strong";
};

export function AtmosphericBackground({ image, intensity = "strong" }: Props) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-night">
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(7,17,31,.52), rgba(7,17,31,.12), rgba(13,27,46,.58)), url(${image})`
        }}
        animate={{ scale: [1, 1.045, 1] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 20% 12%, rgba(200,164,93,.24), transparent 22%), radial-gradient(circle at 76% 8%, rgba(185,167,216,.18), transparent 24%), radial-gradient(circle at 50% 72%, rgba(46,111,115,.23), transparent 34%)"
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(244,239,228,.55) 0 1px, transparent 1.4px), radial-gradient(circle, rgba(200,164,93,.42) 0 1px, transparent 1.2px)",
          backgroundPosition: "0 0, 38px 74px",
          backgroundSize: "120px 120px, 180px 180px",
          animation: "starPulse 6s ease-in-out infinite"
        }}
      />
      <div
        aria-hidden
        className={`absolute -inset-x-20 inset-y-0 ${intensity === "strong" ? "opacity-70" : "opacity-45"}`}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(185,167,216,.12), transparent), radial-gradient(ellipse at 40% 50%, rgba(46,111,115,.22), transparent 55%)",
          filter: "blur(28px)",
          animation: "drift 18s ease-in-out infinite alternate"
        }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/35" />
    </div>
  );
}
