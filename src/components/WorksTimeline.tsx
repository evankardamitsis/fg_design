"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { WorksStage } from "@/lib/works-timeline";

const PLAY_INTERVAL = 1800;
/** Stages either side of the current one that are mounted, so scrubbing never waits on a request. */
const PRELOAD_RADIUS = 2;

const pad = (value: number) => String(value).padStart(2, "0");

const buttonBase =
  "inline-flex min-h-12 items-center justify-center whitespace-nowrap border px-6 py-3.5 text-sm font-semibold tracking-tight transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none";

const tones = {
  light: {
    outline: `${buttonBase} border-ink hover:bg-ink hover:text-cream focus-visible:outline-ink`,
    primary: `${buttonBase} border-ink bg-ink text-cream hover:bg-ink/85 focus-visible:outline-ink`,
    muted: "text-ink/58 hover:text-ink",
    faint: "text-ink/40",
    strong: "text-ink",
    caption: "text-ink/68",
    label: "text-ink/48",
    rule: "border-ink/12",
    dotOn: "bg-ink",
    dotOff: "bg-ink/18",
    range: "works-range",
  },
  dark: {
    outline: `${buttonBase} border-cream/60 text-cream hover:bg-cream hover:text-ink focus-visible:outline-cream`,
    primary: `${buttonBase} border-cream bg-cream text-ink hover:bg-white focus-visible:outline-cream`,
    muted: "text-cream/58 hover:text-cream",
    faint: "text-cream/40",
    strong: "text-cream",
    caption: "text-cream/68",
    label: "text-cream/48",
    rule: "border-cream/14",
    dotOn: "bg-cream",
    dotOff: "bg-cream/20",
    range: "works-range works-range--dark",
  },
};

type Tone = keyof typeof tones;

export function WorksTimeline({
  stages,
  title,
  startLabel = "Start",
  endLabel = "Completion",
}: {
  stages: WorksStage[];
  /** Shown at the top of the full-screen view, e.g. the project name. */
  title?: string;
  startLabel?: string;
  endLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0, 1, 2]));
  const playButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const last = stages.length - 1;
  const stage = stages[index];
  const phases = [...new Set(stages.map((item) => item.phase))];

  const clamp = useCallback((value: number) => Math.max(0, Math.min(last, value)), [last]);

  /** Moves to a stage and mounts its neighbours so the next step is already decoded. */
  const show = useCallback(
    (target: number) => {
      const next = clamp(target);
      setIndex(next);
      setMounted((current) => {
        const updated = new Set(current);
        for (let offset = -PRELOAD_RADIUS; offset <= PRELOAD_RADIUS; offset += 1) {
          const position = next + offset;
          if (position >= 0 && position <= last) updated.add(position);
        }
        return updated.size === current.size ? current : updated;
      });
    },
    [clamp, last]
  );

  // Interaction always wins over playback.
  const go = (target: number) => {
    setPlaying(false);
    show(target);
  };
  const step = (delta: number) => go(index + delta);

  useEffect(() => {
    if (!playing || index >= last) return;
    const timer = window.setTimeout(() => {
      show(index + 1);
      if (index + 1 >= last) setPlaying(false);
    }, PLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [playing, index, last, show]);

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (index >= last) show(0);
    setPlaying(true);
  };

  /** The inline Play opens the full-screen view and runs from the first stage. */
  const playFullScreen = () => {
    show(0);
    setExpanded(true);
    setPlaying(true);
  };

  const close = useCallback(() => {
    setPlaying(false);
    setExpanded(false);
  }, []);

  // Full-screen view: lock page scroll, trap focus, Esc closes.
  useEffect(() => {
    if (!expanded) return;

    const trigger = playButton.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialog.current?.querySelectorAll<HTMLElement>("button:not([disabled]), input, a[href]") ?? []
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const lastFocusable = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      trigger?.focus();
    };
  }, [expanded, close]);

  const handleArrows = (event: React.KeyboardEvent) => {
    // The range input handles its own arrows; this covers the rest of the widget.
    if ((event.target as HTMLElement).tagName === "INPUT") return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  const photos = (sizes: string) => (
    <>
      {stages.map((item, position) =>
        mounted.has(position) ? (
          <Image
            key={item.image}
            src={item.image}
            alt={`${item.name}, stage ${position + 1} of ${stages.length}`}
            fill
            quality={90}
            sizes={sizes}
            aria-hidden={position !== index}
            className={`object-cover object-[center_42%] transition-opacity duration-[450ms] ease-out motion-reduce:transition-none ${
              position === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : null
      )}
      <span className="absolute left-4 top-4 z-10 bg-ink/62 px-3 py-1.5 text-xs tabular-nums tracking-[0.16em] text-cream">
        {pad(index + 1)} / {pad(stages.length)}
      </span>
    </>
  );

  const stageText = (tone: Tone) => (
    <div aria-live="polite">
      <p className={`text-xs uppercase tracking-[0.18em] ${tones[tone].label}`}>{stage.phase}</p>
      <h3 className="mt-4 font-display text-4xl italic leading-[1.08] tracking-[-0.02em] md:text-5xl">
        {stage.name}
      </h3>
      <p className={`mt-5 min-h-[4.8em] max-w-md text-base leading-relaxed ${tones[tone].caption}`}>
        {stage.caption}
      </p>
    </div>
  );

  const stepButtons = (tone: Tone) => (
    <>
      <button type="button" className={tones[tone].outline} onClick={() => step(-1)} disabled={index === 0} aria-label="Previous stage">
        ← Prev
      </button>
      <button type="button" className={tones[tone].outline} onClick={() => step(1)} disabled={index === last} aria-label="Next stage">
        Next →
      </button>
    </>
  );

  const scrubber = (tone: Tone) => {
    const t = tones[tone];
    return (
      <div>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute inset-x-[9px] top-1/2 flex -translate-y-1/2 justify-between">
            {stages.map((item, position) => (
              <span
                key={item.image}
                className={`size-1.5 rounded-full transition-colors duration-300 ${position <= index ? t.dotOn : t.dotOff}`}
              />
            ))}
          </div>
          <input
            type="range"
            min={0}
            max={last}
            step={1}
            value={index}
            onChange={(event) => go(Number(event.target.value))}
            aria-label="Project stage"
            aria-valuetext={`Stage ${index + 1} of ${stages.length}: ${stage.name}`}
            className={`${t.range} relative w-full`}
            style={{ "--progress": `${(index / last) * 100}%` } as React.CSSProperties}
          />
        </div>
        <div className="mt-3 flex justify-between text-sm">
          <button type="button" onClick={() => go(0)} className={`min-h-11 transition-colors ${t.muted}`}>
            {startLabel}
          </button>
          <button type="button" onClick={() => go(last)} className={`min-h-11 transition-colors ${t.muted}`}>
            {endLabel}
          </button>
        </div>
        <ul className={`mt-6 hidden justify-between gap-4 whitespace-nowrap border-t pt-5 text-xs uppercase tracking-[0.18em] md:flex ${t.rule}`}>
          {phases.map((phase) => (
            <li key={phase}>
              <button
                type="button"
                onClick={() => go(stages.findIndex((item) => item.phase === phase))}
                className={`transition-colors ${phase === stage.phase ? t.strong : `${t.faint} ${t.muted}`}`}
              >
                {phase}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const fullScreen = (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title}: start to finish` : "Start to finish"}
      onKeyDown={handleArrows}
      className="works-fullscreen fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-ink text-cream md:flex-row md:overflow-hidden"
    >
      {/* Desktop keeps the photos' native 9:16, so none of the site is cropped away. */}
      <div className="relative h-[58dvh] w-full shrink-0 overflow-hidden bg-black md:aspect-[9/16] md:h-full md:w-auto md:max-w-[56vw]">
        {photos("(min-width: 768px) 57vh, 100vw")}
      </div>

      <div className="flex min-w-0 flex-1 flex-col px-5 pb-8 pt-6 md:px-10 md:py-8 lg:px-14 lg:py-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-display text-lg italic md:text-xl">{title ?? "Start to finish"}</p>
            <p className="mt-1 text-sm text-cream/48">
              {startLabel} to {endLabel}
            </p>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={close}
            className="-mr-1 flex min-h-11 items-center gap-3 px-1 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
          >
            Close
            <span aria-hidden className="relative block size-4">
              <span className="absolute left-0 top-1/2 h-px w-4 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-4 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        <div className="flex flex-1 flex-col justify-center py-10 md:py-8">
          {stageText("dark")}
          <div className="mt-8 flex flex-wrap gap-3">
            {stepButtons("dark")}
            <button type="button" onClick={togglePlay} className={tones.dark.primary}>
              {playing ? "Pause" : index >= last ? "Replay" : "Play"}
            </button>
          </div>
        </div>

        {scrubber("dark")}
      </div>
    </div>
  );

  return (
    <div onKeyDown={handleArrows} data-works-timeline>
      <div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8">
        <div className="relative mx-auto aspect-[2/3] w-full max-w-[min(100%,calc(82dvh*2/3))] overflow-hidden bg-ink md:col-span-6 lg:col-span-5">
          {photos("(min-width: 1024px) 38vw, (min-width: 768px) 48vw, calc(100vw - 2.5rem)")}
        </div>

        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7">
          {stageText("light")}
          <div className="mt-8 flex flex-wrap gap-3">
            {stepButtons("light")}
            <button ref={playButton} type="button" onClick={playFullScreen} className={tones.light.primary}>
              Play start to finish
            </button>
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-20">{scrubber("light")}</div>

      {/* Portalled: Reveal ancestors carry transforms, which would trap a fixed overlay inside them. */}
      {expanded ? createPortal(fullScreen, document.body) : null}
    </div>
  );
}
