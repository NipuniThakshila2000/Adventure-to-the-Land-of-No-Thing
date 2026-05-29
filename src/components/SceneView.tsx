"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Map, PanelRight, RotateCcw } from "lucide-react";
import { AppLogo } from "@/components/AppLogo";
import { AtmosphericBackground } from "@/components/AtmosphericBackground";
import { AudioToggleButton } from "@/components/AudioToggleButton";
import { ChoiceCard } from "@/components/ChoiceCard";
import { EndingModal } from "@/components/EndingModal";
import { FeatheringPanel } from "@/components/FeatheringPanel";
import { InventoryPanel } from "@/components/InventoryPanel";
import { JourneyMap } from "@/components/JourneyMap";
import { MobileDrawer } from "@/components/MobileDrawer";
import { SaveProgressBar } from "@/components/SaveProgressBar";
import { clearProgress, loadProgress, saveProgress } from "@/lib/storage";
import { Choice, clampMeter, endingForState, endings, falsePaths, getInitialProgress, ProgressState, scenes } from "@/lib/story";

export function SceneView() {
  const [progress, setProgress] = useState<ProgressState>(getInitialProgress());
  const [loaded, setLoaded] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [falsePath, setFalsePath] = useState<string | null>(null);
  const [endingId, setEndingId] = useState<string | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveProgress(progress);
  }, [loaded, progress]);

  const scene = scenes.find((item) => item.id === progress.currentScene) ?? scenes[0];
  const activeFalsePath = falsePaths.find((item) => item.id === falsePath);
  const ending = endings.find((item) => item.id === endingId) ?? null;

  const archiveCount = useMemo(
    () => progress.unlockedArchive.length + progress.featheredObjects.length + progress.unlockedEndings.length,
    [progress]
  );

  function choose(choice: Choice) {
    const nextMeters = { ...progress.meters };
    Object.entries(choice.effect).forEach(([key, value]) => {
      nextMeters[key as keyof typeof nextMeters] = clampMeter(nextMeters[key as keyof typeof nextMeters] + value);
    });

    const nextArchive = new Set(progress.unlockedArchive);
    const nextFeathered = new Set(progress.featheredObjects);
    choice.unlocks?.forEach((unlock) => {
      if (unlock.startsWith("Feathered object: ")) nextFeathered.add(unlock.replace("Feathered object: ", ""));
      else nextArchive.add(unlock);
    });

    const base: ProgressState = {
      ...progress,
      meters: nextMeters,
      path: [...progress.path, `${scene.id}:${choice.id}`],
      unlockedArchive: Array.from(nextArchive),
      featheredObjects: Array.from(nextFeathered),
      lastTendency: choice.tendency
    };

    if (choice.falsePathId) {
      setProgress(base);
      setFalsePath(choice.falsePathId);
      return;
    }

    if (scene.id === 7) {
      const finalState = { ...base, currentScene: 7 };
      const unlockedEnding = endingForState(finalState);
      const unlockedEndings = Array.from(new Set([...finalState.unlockedEndings, unlockedEnding]));
      setProgress({ ...finalState, unlockedEndings });
      setEndingId(unlockedEnding);
      return;
    }

    setProgress({ ...base, currentScene: Math.min(scene.id + 1, scenes.length) });
  }

  function restart() {
    clearProgress();
    setFalsePath(null);
    setEndingId(null);
    setProgress(getInitialProgress());
  }

  function returnFromFalsePath() {
    if (!activeFalsePath) return;
    const reward = `${activeFalsePath.title}: ${activeFalsePath.reward}`;
    setProgress((state) => ({
      ...state,
      unlockedArchive: Array.from(new Set([...state.unlockedArchive, reward])),
      meters: { ...state.meters, surrender: clampMeter(state.meters.surrender + 6), wonder: clampMeter(state.meters.wonder + 4) },
      lastTendency: "A false path was released."
    }));
    setFalsePath(null);
  }

  return (
    <main className="min-h-screen">
      <AtmosphericBackground image={scene.image} />

      <div className="fixed left-4 top-4 z-20">
        <AppLogo />
      </div>

      <div className="fixed right-4 top-4 z-20 flex gap-2">
        <AudioToggleButton mood={scene.mood} src={scene.music} />
        <button
          type="button"
          title="Restart"
          onClick={restart}
          className="rounded-full border border-parchment/20 bg-night/45 p-3 text-antiqueGold transition hover:border-antiqueGold/70 hover:shadow-gold"
        >
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto grid min-h-screen max-w-[1560px] gap-5 px-4 py-20 lg:grid-cols-[300px_minmax(0,1fr)_320px] lg:px-6">
        <aside className="glass-panel hidden rounded-2xl p-5 lg:block">
          <JourneyMap currentScene={progress.currentScene} onSelect={(sceneId) => setProgress((state) => ({ ...state, currentScene: sceneId }))} />
        </aside>

        <section className="space-y-4">
          <div className="flex gap-2 lg:hidden">
            <button className="glass-panel flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm text-antiqueGold" onClick={() => setMapOpen(true)}>
              <Map className="h-4 w-4" />
              Map
            </button>
            <button className="glass-panel flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm text-antiqueGold" onClick={() => setInventoryOpen(true)}>
              <PanelRight className="h-4 w-4" />
              Inventory
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={scene.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45 }}
              className="glass-panel overflow-hidden rounded-2xl"
            >
              <div
                className="min-h-[260px] bg-cover bg-center md:min-h-[360px]"
                style={{ backgroundImage: `linear-gradient(rgba(7,17,31,.08), rgba(7,17,31,.86)), url(${scene.image})` }}
              />
              <div className="p-5 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-antiqueGold/40 px-3 py-1 font-label text-[10px] uppercase tracking-[0.24em] text-antiqueGold">
                    Act {scene.id}
                  </span>
                  <span className="rounded-full border border-parchment/15 px-3 py-1 text-xs text-silverBlue">
                    Archive {archiveCount}
                  </span>
                </div>
                <h1 className="mt-5 font-display text-5xl leading-none text-softWhite md:text-7xl">{scene.title}</h1>
                <p className="mt-2 font-label text-xs uppercase tracking-[0.3em] text-antiqueGold">{scene.imageTitle}</p>
                <blockquote className="mt-6 border-l border-antiqueGold/60 pl-4 font-display text-2xl italic text-parchment">
                  {scene.quote}
                </blockquote>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-silverBlue">{scene.story}</p>

                <div className="mt-8 grid gap-3">
                  {scene.choices.map((choice) => (
                    <ChoiceCard key={choice.id} choice={choice} onChoose={choose} />
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <SaveProgressBar progress={progress} />
        </section>

        <aside className="hidden space-y-4 lg:block">
          <div className="glass-panel rounded-2xl p-5">
            <InventoryPanel scene={scene} progress={progress} />
          </div>
          <FeatheringPanel progress={progress} />
        </aside>
      </div>

      <MobileDrawer title="Journey Map" open={mapOpen} onClose={() => setMapOpen(false)}>
        <JourneyMap currentScene={progress.currentScene} onSelect={(sceneId) => {
          setProgress((state) => ({ ...state, currentScene: sceneId }));
          setMapOpen(false);
        }} />
      </MobileDrawer>
      <MobileDrawer title="Inventory" open={inventoryOpen} onClose={() => setInventoryOpen(false)}>
        <InventoryPanel scene={scene} progress={progress} />
        <div className="mt-4">
          <FeatheringPanel progress={progress} />
        </div>
      </MobileDrawer>

      <AnimatePresence>
        {activeFalsePath ? (
          <motion.div className="fixed inset-0 z-40 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-night/78 backdrop-blur-md" />
            <motion.div
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              className="glass-panel relative max-w-xl rounded-2xl p-7"
            >
              <div className="flex items-center gap-2 text-antiqueGold">
                <BookOpen className="h-5 w-5" />
                <p className="font-label text-xs uppercase tracking-[0.26em]">False Path</p>
              </div>
              <h2 className="mt-3 font-display text-4xl text-softWhite">{activeFalsePath.title}</h2>
              <div className="mt-5 grid gap-2">
                {activeFalsePath.choices.map((item) => (
                  <div key={item} className="rounded-lg border border-parchment/12 bg-night/35 px-4 py-3 text-sm text-silverBlue">
                    {item}
                  </div>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-parchment">This was not false because it was meaningless. It was false because Elias clung to it.</p>
              <p className="mt-3 text-sm leading-6 text-silverBlue">{activeFalsePath.realization}</p>
              <button type="button" onClick={returnFromFalsePath} className="mt-6 rounded-lg bg-antiqueGold px-5 py-3 font-semibold text-night transition hover:bg-parchment">
                Return to the moment of gripping
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <EndingModal ending={ending} onClose={() => setEndingId(null)} onRestart={restart} />
    </main>
  );
}
