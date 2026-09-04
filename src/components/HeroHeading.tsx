"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { EASE } from "@/components/motion/Reveal";

/**
 * Line breaks stay explicit so the headline always reads exactly as composed:
 *   Turnkey design & build / for London's most / distinguished homes.
 * SplitText masks each of those rendered lines individually.
 */
export function HeroHeading() {
  const ctas = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(ctas.current, {
      opacity: 0,
      y: 16,
      duration: 1,
      delay: 0.85,
      ease: EASE,
    });
  });

  return (
    <>
      {/* 40px / 48px measured off the Figma export (47.8px baseline-to-baseline,
          ~40px ascender band), so the desktop size matches the composition. */}
      <TextReveal
        as="h1"
        animateOnMount
        delay={0.25}
        className="text-[28px] leading-[1.2] text-cream sm:text-[34px] md:text-[40px]"
      >
        Turnkey design &amp; build
        <br />
        for London&apos;s most
        <br />
        <span className="font-display italic">distinguished homes.</span>
      </TextReveal>

      <div ref={ctas} data-reveal className="flex shrink-0 gap-3">
        <Button href="/portfolio" variant="frosted">Portfolio.</Button>
        <Button href="/contact" variant="solid">Start a project.</Button>
      </div>
    </>
  );
}
