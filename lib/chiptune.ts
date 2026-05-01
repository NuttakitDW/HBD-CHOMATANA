"use client";

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let bgmTimer: number | null = null;
let bgmStep = 0;
let bgmEnabled = false;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0.35;
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ToneOpts = {
  freq: number;
  type?: OscillatorType;
  duration?: number;
  attack?: number;
  release?: number;
  volume?: number;
  detune?: number;
};

function tone({
  freq,
  type = "square",
  duration = 0.12,
  attack = 0.005,
  release = 0.06,
  volume = 0.4,
  detune = 0,
}: ToneOpts) {
  const c = getCtx();
  if (!c || !masterGain) return;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.detune.value = detune;
  const now = c.currentTime;
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + attack);
  gain.gain.setValueAtTime(volume, now + duration - release);
  gain.gain.linearRampToValueAtTime(0, now + duration);
  osc.connect(gain).connect(masterGain);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

function noise(duration = 0.18, volume = 0.25) {
  const c = getCtx();
  if (!c || !masterGain) return;
  const buf = c.createBuffer(1, c.sampleRate * duration, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 800;
  const gain = c.createGain();
  gain.gain.value = volume;
  src.connect(filter).connect(gain).connect(masterGain);
  src.start();
}

export function sfxPop() {
  tone({ freq: 880, type: "square", duration: 0.05, volume: 0.3 });
  setTimeout(
    () => tone({ freq: 1320, type: "square", duration: 0.06, volume: 0.25 }),
    40,
  );
  noise(0.12, 0.18);
}

export function sfxBlow() {
  noise(0.35, 0.32);
}

export function sfxOpen() {
  const seq = [523.25, 659.25, 783.99, 1046.5];
  seq.forEach((f, i) => {
    setTimeout(
      () =>
        tone({
          freq: f,
          type: "square",
          duration: 0.12,
          volume: 0.35,
        }),
      i * 80,
    );
  });
}

export function sfxFanfare() {
  const notes: [number, number][] = [
    [523.25, 0],
    [659.25, 110],
    [783.99, 220],
    [1046.5, 330],
    [783.99, 460],
    [1046.5, 540],
    [1318.51, 680],
  ];
  notes.forEach(([freq, t]) => {
    setTimeout(
      () =>
        tone({
          freq,
          type: "square",
          duration: 0.18,
          volume: 0.4,
        }),
      t,
    );
  });
}

const BGM_NOTES = [
  523.25, 659.25, 783.99, 659.25, 523.25, 659.25, 783.99, 1046.5, 880, 783.99,
  659.25, 523.25, 587.33, 659.25, 783.99, 659.25,
];

function tickBgm() {
  if (!bgmEnabled) return;
  const f = BGM_NOTES[bgmStep % BGM_NOTES.length];
  tone({ freq: f, type: "triangle", duration: 0.18, volume: 0.18 });
  if (bgmStep % 4 === 0) {
    tone({ freq: f / 4, type: "square", duration: 0.12, volume: 0.12 });
  }
  bgmStep++;
}

export function startBgm() {
  if (bgmEnabled) return;
  if (!getCtx()) return;
  bgmEnabled = true;
  bgmStep = 0;
  bgmTimer = window.setInterval(tickBgm, 240);
}

export function stopBgm() {
  bgmEnabled = false;
  if (bgmTimer !== null) {
    window.clearInterval(bgmTimer);
    bgmTimer = null;
  }
}

export function isBgmOn() {
  return bgmEnabled;
}
