"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { ProcessTimeline as ProcessTimelineData } from "@/lib/process-timeline";

/**
 * The first card lines up with the page's content column, then the track runs
 * to the viewport edge. Same value drives padding and scroll-padding so snapping
 * lands every card on that column.
 */
const columnInset =
  "[--gutter:1.25rem] md:[--gutter:2.5rem] lg:[--gutter:3.5rem] [--inset:max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))]";

const arrowClass =
  "flex size-12 items-center justify-center border border-ink text-lg transition-colors duration-200 hover:bg-ink hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink disabled:pointer-events-none disabled:border-ink/20 disabled:text-ink/30 motion-reduce:transition-none";

export function ProcessTimeline({ timeline }: { timeline: ProcessTimelineData }) {
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const last = timeline.stages.length - 1;

  const update = useCallback(() => {
    const element = track.current;
    if (!element) return;
    const max = element.scrollWidth - element.clientWidth;
    const progress = max > 0 ? element.scrollLeft / max : 1;
    // Never fully empty: the bar should read as "you are at stage one", not "nothing".
    if (bar.current) bar.current.style.width = `${Math.max(1 / timeline.stages.length, progress) * 100}%`;
    setAtStart(element.scrollLeft <= 2);
    setAtEnd(element.scrollLeft >= max - 2);
  }, [timeline.stages.length]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    update();
    element.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      element.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (direction: 1 | -1) => {
    const element = track.current;
    const card = element?.querySelector<HTMLElement>("li");
    if (!element || !card) return;
    const gap = parseFloat(getComputedStyle(element).columnGap) || 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="process"
      aria-label={timeline.heading}
      className={`scroll-mt-24 pb-24 md:pb-36 ${columnInset}`}
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
        <div className="border-t border-ink/12 pt-20 md:pt-28">
          <Reveal>
            <Eyebrow>{timeline.eyebrow}</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.04}
            className="mt-7 max-w-3xl text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl"
          >
            {timeline.heading}
          </TextReveal>
          <Reveal delay={0.08} className="mt-6 max-w-2xl">
            <p className="text-base leading-relaxed text-ink/68 md:text-lg">{timeline.intro}</p>
          </Reveal>
        </div>
      </div>

      <Reveal delay={0.12} className="mt-14 md:mt-20">
        <ol
          ref={track}
          tabIndex={0}
          aria-label={`${timeline.heading} ${timeline.stages.length} stages, scroll horizontally`}
          className="relative flex flex-col gap-12 pl-14 pr-5 before:absolute before:bottom-0 before:left-7 before:top-0 before:w-px before:bg-ink/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:snap-x md:snap-mandatory md:flex-row md:gap-8 md:overflow-x-auto md:pb-2 md:pl-[var(--inset)] md:pr-[var(--inset)] md:[scroll-padding-inline:var(--inset)] md:[scrollbar-width:none] md:before:hidden md:[&::-webkit-scrollbar]:hidden"
        >
          {timeline.stages.map((stage, position) => {
            const isFinal = position === last;
            return (
              <li
                key={stage.id}
                className={`group relative shrink-0 snap-start before:absolute before:-left-8 before:top-0 before:size-2 before:rounded-full before:bg-ink md:before:hidden ${
                  isFinal ? "md:w-[calc(clamp(16rem,26vw,21rem)*16/9)]" : "md:w-[clamp(16rem,26vw,21rem)]"
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-ink/8 ${
                    isFinal
                      ? "aspect-[4/3] outline outline-1 outline-offset-[6px] outline-ink/35"
                      : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={stage.src}
                    alt={stage.alt}
                    fill
                    quality={90}
                    sizes={isFinal ? "(min-width: 768px) 48vw, 100vw" : "(min-width: 768px) 26vw, 100vw"}
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 border-t border-ink/12 pt-4 text-xs uppercase tracking-[0.14em] text-ink/48">
                  <span className="font-medium text-ink">{stage.step}</span>
                  <time dateTime={stage.date}>{stage.dateLabel}</time>
                </div>
                <h3 className="mt-3 font-display text-2xl italic leading-[1.15] tracking-[-0.015em] md:text-[1.7rem]">
                  {stage.title}
                </h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/62">{stage.caption}</p>
                {stage.credit ? (
                  <p className="mt-3 text-xs tracking-[0.04em] text-ink/42">{stage.credit}</p>
                ) : null}
              </li>
            );
          })}
        </ol>
      </Reveal>

      <div className="mx-auto mt-10 hidden max-w-[1440px] items-center gap-8 px-5 md:flex md:px-10 lg:px-14">
        <div aria-hidden className="relative h-px flex-1 bg-ink/14">
          <span
            ref={bar}
            className="absolute -top-px left-0 h-[3px] w-[12.5%] bg-ink transition-[width] duration-200 motion-reduce:transition-none"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous stage"
          >
            ←
          </button>
          <button
            type="button"
            className={arrowClass}
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next stage"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
