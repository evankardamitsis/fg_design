"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: reduce)", () => {
        element.textContent = `${value}${suffix}`;
      });

      media.add("(prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: element,
          start: "top 88%",
          once: true,
          onEnter: () => {
            const counter = { current: 0 };

            gsap.to(counter, {
              current: value,
              duration: 1.3,
              ease: "power3.out",
              snap: { current: 1 },
              onStart: () => {
                element.textContent = `0${suffix}`;
              },
              onUpdate: () => {
                element.textContent = `${Math.round(counter.current)}${suffix}`;
              },
            });
          },
        });
      });

      return () => media.revert();
    },
    { scope: ref, dependencies: [suffix, value] }
  );

  return <span ref={ref} aria-label={`${value}${suffix}`}>{value}{suffix}</span>;
}
