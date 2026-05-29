"use client";

import Link from "next/link";
import { Scene } from "@/lib/story";

type Props = {
  scene: Scene;
};

export function SceneCard({ scene }: Props) {
  return (
    <Link
      href="/game"
      className="group min-h-[260px] overflow-hidden rounded-lg border border-parchment/15 bg-deep/70 transition hover:-translate-y-1 hover:border-antiqueGold/60 hover:shadow-gold"
    >
      <div
        className="h-36 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(7,17,31,.18), rgba(7,17,31,.8)), url(${scene.image})`
        }}
      />
      <div className="p-5">
        <p className="font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold">Scene {scene.id}</p>
        <h3 className="mt-2 font-display text-2xl text-softWhite">{scene.imageTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-silverBlue">{scene.story}</p>
      </div>
    </Link>
  );
}
