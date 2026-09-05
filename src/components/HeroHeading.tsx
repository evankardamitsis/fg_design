"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/Button";
import { TextReveal } from "@/components/motion/TextReveal";
import { EASE } from "@/components/motion/Reveal";

export function HeroHeading() {
  const supporting = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-support]", {
          opacity: 0,
          y: 16,
          duration: 0.72,
          delay: 0.5,
          ease: EASE,
          stagger: 0.08,
        });
      });

      return () => media.revert();
    },
    { scope: supporting }
  );

  return (
    <div className="max-w-4xl">
      <TextReveal
        as="h1"
        animateOnMount
        delay={0.16}
        className="max-w-[17ch] text-[clamp(2.2rem,4vw,4rem)] leading-[1.02] tracking-[-0.045em] text-cream"
      >
        Turnkey design &amp; build for London&apos;s most{" "}
        <span className="font-display italic tracking-[-0.025em]">distinguished homes.</span>
      </TextReveal>

      <div ref={supporting} className="mt-6">
        <div data-hero-support data-reveal>
          <Button href="#selected-projects" variant="solid">
            View projects
          </Button>
        </div>
      </div>
    </div>
  );
}
