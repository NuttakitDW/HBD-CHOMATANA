"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PixelEnvelope } from "./PixelEnvelope";
import { PixelCake } from "./PixelCake";
import { PixelBalloon } from "./PixelBalloon";
import { Confetti } from "./Confetti";
import {
  isBgmOn,
  sfxBlow,
  sfxFanfare,
  sfxOpen,
  sfxPop,
  startBgm,
  stopBgm,
} from "@/lib/chiptune";

type Phase = "envelope" | "opening" | "card";

const BALLOONS: { id: number; color: "red" | "blue" | "green" | "yellow" | "pink"; x: string; delay: number }[] = [
  { id: 1, color: "red", x: "8%", delay: 0 },
  { id: 2, color: "yellow", x: "22%", delay: 0.4 },
  { id: 3, color: "green", x: "78%", delay: 0.2 },
  { id: 4, color: "blue", x: "92%", delay: 0.5 },
  { id: 5, color: "pink", x: "50%", delay: 0.7 },
];

export function CardScene() {
  const [phase, setPhase] = useState<Phase>("envelope");
  const [candles, setCandles] = useState<boolean[]>([true, true, true, true]);
  const [balloons, setBalloons] = useState<Record<number, boolean>>({});
  const [confettiKey, setConfettiKey] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [bgm, setBgm] = useState(true);
  const [showSecret, setShowSecret] = useState(false);

  const allCandlesOut = candles.every((c) => !c);
  const allBalloonsPopped = BALLOONS.every((b) => balloons[b.id]);

  useEffect(() => {
    if (allCandlesOut && phase === "card") {
      sfxFanfare();
      setConfettiKey((k) => k + 1);
      setShowConfetti(true);
      setShowSecret(true);
      const t = setTimeout(() => setShowConfetti(false), 4500);
      return () => clearTimeout(t);
    }
  }, [allCandlesOut, phase]);

  const openCard = () => {
    if (phase !== "envelope") return;
    sfxOpen();
    if (bgm) startBgm();
    setPhase("opening");
    setTimeout(() => setPhase("card"), 900);
  };

  const blowCandle = (i: number) => {
    sfxBlow();
    setCandles((cs) => cs.map((c, idx) => (idx === i ? false : c)));
  };

  const popBalloon = (id: number) => {
    if (balloons[id]) return;
    sfxPop();
    setBalloons((b) => ({ ...b, [id]: true }));
  };

  const relight = () => {
    sfxOpen();
    setCandles([true, true, true, true]);
    setBalloons({});
    setShowSecret(false);
    setShowConfetti(false);
  };

  const toggleBgm = () => {
    if (isBgmOn()) {
      stopBgm();
      setBgm(false);
    } else {
      startBgm();
      setBgm(true);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-nes-bg">
      <StarField />

      <AnimatePresence mode="wait">
        {phase === "envelope" && (
          <motion.div
            key="envelope"
            className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-10 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-center text-[10px] sm:text-sm md:text-base text-nes-yellow text-pixel-shadow tracking-widest">
              ★ A LETTER HAS ARRIVED ★
            </h1>
            <button
              onClick={openCard}
              className="group relative w-64 sm:w-80 aspect-[4/3] animate-bob transition-transform hover:scale-105 active:scale-95"
              aria-label="Open envelope"
            >
              <PixelEnvelope open={false} />
            </button>
            <p className="text-center text-[8px] sm:text-[10px] text-nes-cream animate-flicker">
              ▶ PRESS [START] / CLICK TO OPEN
            </p>
          </motion.div>
        )}

        {phase === "opening" && (
          <motion.div
            key="opening"
            className="relative z-10 flex min-h-screen items-center justify-center"
            initial={{ scale: 1 }}
            animate={{ scale: 6, rotate: 8, opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeIn" }}
          >
            <div className="w-64 sm:w-80 aspect-[4/3]">
              <PixelEnvelope open={true} />
            </div>
          </motion.div>
        )}

        {phase === "card" && (
          <motion.div
            key="card"
            className="relative z-10 min-h-screen w-full"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
              <div className="relative bg-nes-card pixel-shadow border-4 border-nes-dark p-6 sm:p-10">
                <div className="absolute inset-0 pointer-events-none border-2 border-nes-pink/40 m-2" />

                <header className="text-center space-y-3">
                  <p className="text-[8px] sm:text-[10px] text-nes-blue tracking-widest">
                    -- WORLD 1-1: BIRTHDAY --
                  </p>
                  <h1 className="text-xl sm:text-3xl md:text-4xl font-pixel text-nes-pink text-pixel-shadow-pink animate-pulseTitle leading-tight">
                    HAPPY
                    <br />
                    BIRTHDAY
                    <br />
                    CHOMTANA!
                  </h1>
                  <p className="text-[8px] sm:text-[10px] text-nes-dark mt-2">
                    ★ PLAYER 1 LEVELED UP ★
                  </p>
                  <LevelUpBanner from={25} to={26} />
                  <p className="text-[8px] sm:text-[10px] text-nes-dark/80">
                    ▶ NEW QUEST UNLOCKED · AGE 26
                  </p>
                </header>

                <section className="mt-8 sm:mt-10">
                  <p className="text-center text-[8px] sm:text-[10px] text-nes-dark mb-3">
                    ▶ TAP THE FLAMES TO BLOW OUT THE CANDLES
                  </p>
                  <div className="relative h-72 sm:h-80 w-full">
                    <div className="absolute left-0 right-0 top-0 flex justify-center">
                      <div className="w-64 sm:w-80 h-72 sm:h-80">
                        <PixelCake candles={candles} onBlow={blowCandle} />
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0">
                      {BALLOONS.map((b) => {
                        const popped = !!balloons[b.id];
                        return (
                          <motion.div
                            key={b.id}
                            className="absolute w-12 sm:w-14 pointer-events-auto"
                            style={{ left: b.x, top: popped ? "-10%" : "0%" }}
                            initial={{ y: 20, opacity: 0 }}
                            animate={
                              popped
                                ? { y: -180, opacity: 0 }
                                : { y: [0, -10, 0], opacity: 1 }
                            }
                            transition={
                              popped
                                ? { duration: 0.6, ease: "easeOut" }
                                : {
                                    y: {
                                      duration: 2.4,
                                      repeat: Infinity,
                                      ease: "easeInOut",
                                      delay: b.delay,
                                    },
                                    opacity: { duration: 0.5, delay: b.delay },
                                  }
                            }
                          >
                            <PixelBalloon
                              color={b.color}
                              popped={popped}
                              onPop={() => popBalloon(b.id)}
                            />
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </section>

                <section className="mt-8 grid gap-3 text-center">
                  <div className="flex flex-wrap items-center justify-center gap-3 text-[8px] sm:text-[10px] text-nes-dark">
                    <Stat label="CANDLES" value={`${candles.filter((c) => !c).length}/4`} />
                    <Stat
                      label="BALLOONS"
                      value={`${Object.values(balloons).filter(Boolean).length}/${BALLOONS.length}`}
                    />
                    <Stat label="LV" value="26" />
                    <Stat label="SCORE" value={String(scoreOf(candles, balloons)).padStart(5, "0")} />
                  </div>
                </section>

                <AnimatePresence>
                  {showSecret && (
                    <motion.section
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.5 }}
                      className="mt-8 border-4 border-nes-dark bg-nes-yellow/90 p-4 sm:p-6 pixel-shadow-sm"
                    >
                      <p className="text-[8px] sm:text-[10px] text-nes-dark mb-2">
                        ▶ MESSAGE GET!
                      </p>
                      <p className="text-[10px] sm:text-xs leading-relaxed text-nes-dark">
                        Yo bro! 26 already?! Another year, another commit
                        pushed to the timeline of you. May your builds stay
                        green, your bugs stay shallow, and your coffee stay
                        strong. Keep shipping, legend.
                      </p>
                      <p className="mt-3 text-[8px] sm:text-[10px] text-nes-dark">
                        — from your bro, NUTTAKIT
                      </p>
                    </motion.section>
                  )}
                </AnimatePresence>

                <section className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={relight}
                    className="text-[8px] sm:text-[10px] bg-nes-pink text-nes-card border-4 border-nes-dark pixel-shadow-sm px-4 py-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    ♻ RELIGHT
                  </button>
                  <button
                    onClick={toggleBgm}
                    className="text-[8px] sm:text-[10px] bg-nes-blue text-nes-card border-4 border-nes-dark pixel-shadow-sm px-4 py-3 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                  >
                    {bgm ? "♪ BGM: ON" : "♪ BGM: OFF"}
                  </button>
                </section>

                {allBalloonsPopped && allCandlesOut && (
                  <p className="mt-6 text-center text-[8px] sm:text-[10px] text-nes-red animate-flicker">
                    ★ PERFECT CLEAR! 1-UP ★
                  </p>
                )}
              </div>

              <p className="mt-6 text-center text-[8px] text-nes-cream/70">
                © {new Date().getFullYear()} · MADE WITH 8 BITS OF LOVE
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Confetti active={showConfetti} burstKey={confettiKey} />
    </main>
  );
}

function LevelUpBanner({ from, to }: { from: number; to: number }) {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0, y: 8 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 14 }}
      className="mt-3 inline-flex items-center justify-center gap-2 sm:gap-3 bg-nes-dark text-nes-yellow border-4 border-nes-yellow px-3 py-2 pixel-shadow-sm"
    >
      <span className="text-[8px] sm:text-[10px] tracking-widest">Lv.</span>
      <span className="text-sm sm:text-lg text-nes-cream">{from}</span>
      <span className="text-sm sm:text-lg animate-flicker">▶</span>
      <span className="text-sm sm:text-lg text-nes-yellow text-pixel-shadow">
        {to}
      </span>
    </motion.div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-nes-dark text-nes-cream px-3 py-2 border-2 border-nes-cream">
      <span className="opacity-70">{label}:</span> <span>{value}</span>
    </div>
  );
}

function scoreOf(
  candles: boolean[],
  balloons: Record<number, boolean>,
) {
  const c = candles.filter((x) => !x).length * 250;
  const b = Object.values(balloons).filter(Boolean).length * 100;
  return c + b;
}

function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {stars.map((i) => {
        const left = (i * 137.5) % 100;
        const top = (i * 89.7) % 100;
        const size = (i % 3) + 1;
        const delay = (i % 7) * 0.3;
        return (
          <span
            key={i}
            className="absolute bg-nes-cream animate-flicker"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              width: `${size}px`,
              height: `${size}px`,
              opacity: 0.6,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
}
