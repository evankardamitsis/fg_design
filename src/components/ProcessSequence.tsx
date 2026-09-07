"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type ProcessStep = {
  title: string;
  description: string;
};

export function ProcessSequence({ steps }: { steps: ProcessStep[] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top 72%",
            once: true,
          },
        });

        timeline
          .from("[data-process-title]", {
            clipPath: "inset(0 0 100% 0)",
            yPercent: 22,
            duration: 0.9,
            ease: "power3.out",
          })
          .from(
            "[data-process-line]",
            { scaleX: 0, transformOrigin: "left center", duration: 1.1, ease: "power3.inOut" },
            "-=0.38"
          )
          .from(
            "[data-process-step]",
            { opacity: 0, y: 22, duration: 0.65, stagger: 0.11, ease: "power3.out" },
            "-=0.72"
          );
      });

      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-process-title]", {
          clipPath: "inset(0 0 100% 0)",
          yPercent: 22,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
        });

        gsap.from("[data-process-line]", {
          scaleY: 0,
          transformOrigin: "center top",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: "[data-process-list]", start: "top 82%", once: true },
        });

        gsap.utils.toArray<HTMLElement>("[data-process-step]", root.current).forEach((step) => {
          gsap.from(step, {
            opacity: 0,
            y: 18,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 88%", once: true },
          });
        });
      });

      return () => media.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="overflow-hidden">
        <h2
          data-process-title
          className="text-4xl leading-[1.02] tracking-[-0.04em] md:whitespace-nowrap md:text-[clamp(3.25rem,5.5vw,5.75rem)]"
        >
          One point of <span className="font-display italic tracking-[-0.02em]">responsibility.</span>
        </h2>
      </div>
      <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/68 md:text-lg">
        A unified service keeps creative and practical decisions connected from planning through completion.
      </p>

      <div data-process-list className="relative mt-16 md:mt-24">
        <span
          aria-hidden
          className="absolute bottom-0 left-[5px] top-1 w-px bg-ink/12 md:bottom-auto md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto"
        />
        <span
          data-process-line
          aria-hidden
          className="absolute bottom-0 left-[5px] top-1 w-px bg-ink md:bottom-auto md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto"
        />

        <ol className="grid md:grid-cols-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              data-process-step
              className="relative grid grid-cols-[12px_1fr] gap-5 pb-12 last:pb-0 md:block md:pb-0 md:pr-12"
            >
              <span aria-hidden className="relative z-10 mt-0.5 block h-3 w-3 border border-ink bg-cream" />
              <div className="md:mt-8">
                <span className="text-xs tracking-[0.16em] text-ink/42">0{index + 1}</span>
                <h3 className="mt-3 text-3xl tracking-[-0.03em] md:text-4xl">{step.title}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/60 md:text-base">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
