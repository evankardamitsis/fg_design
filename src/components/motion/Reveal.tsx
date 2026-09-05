"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Expo-out. Leaves quickly, settles slowly — how real camera moves behave. */
export const EASE = "power3.out";
/** Symmetrical, for wipes where both ends should feel unhurried. */
export const EASE_IN_OUT = "power2.inOut";

/** Where a reveal fires: when the element's top reaches 85% down the viewport. */
const START = "top 85%";

type Common = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Content reveal — a short rise out of a slight defocus.
 *
 * ScrollTrigger resolves against scroll offsets rather than IntersectionObserver,
 * so this fires correctly even for elements clipped by an `overflow-hidden`
 * ancestor. That was the flaw in the previous implementation: an observer on a
 * translated element inside a clipping box reports zero visible area and can
 * never satisfy a visibility threshold, so titles never appeared.
 */
export function Reveal({ children, className, delay = 0, y = 14 }: Common & { y?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          opacity: 0,
          y,
          duration: 0.85,
          delay,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: START, once: true },
        });
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [delay, y] }
  );

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}

/**
 * Media reveal — a clip wipe with the frame settling out of a slight over-scale.
 * No blur: blurring a large photograph mid-scroll is expensive, and the wipe
 * already carries the motion.
 */
export function RevealMedia({ children, className, delay = 0 }: Common) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          clipPath: "inset(14% 0% 0% 0%)",
          opacity: 0,
          duration: 1.15,
          delay,
          ease: EASE_IN_OUT,
          scrollTrigger: { trigger: ref.current, start: START, once: true },
        });
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [delay] }
  );

  return (
    <div ref={ref} data-reveal className={className}>
      {children}
    </div>
  );
}

/**
 * Staggered group. Children opt in with `data-stagger`, so the group can hold
 * arbitrary markup and only the intended items animate.
 */
export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
}: Common & { stagger?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-stagger]", ref.current);
        if (!items.length) return;

        gsap.from(items, {
          opacity: 0,
          y: 16,
          duration: 0.85,
          ease: EASE,
          stagger,
          scrollTrigger: { trigger: ref.current, start: START, once: true },
        });
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [stagger] }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
