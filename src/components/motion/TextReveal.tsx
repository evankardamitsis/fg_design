"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { EASE } from "@/components/motion/Reveal";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Tag = "h1" | "h2" | "h3" | "p" | "div";

/**
 * Line-by-line title reveal.
 *
 * SplitText wraps each rendered line in its own masked box and re-splits on
 * resize, so the reveal follows however the copy actually wraps — no hardcoded
 * break points that drift when the type scale or container changes.
 *
 * `autoSplit` + `onSplit` is the supported pattern for re-running the animation
 * after a re-split; returning the tween lets GSAP clean up the previous one.
 */
export function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  animateOnMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
  /** Hero copy plays on load; everything else waits for scroll. */
  animateOnMount?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const split = SplitText.create(el, {
        type: "lines",
        mask: "lines", // each line gets its own clipping box
        linesClass: "reveal-line",
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 108,
            duration: 1.15,
            delay,
            ease: EASE,
            stagger: 0.1,
            ...(animateOnMount
              ? {}
              : { scrollTrigger: { trigger: el, start: "top 85%", once: true } }),
          });
        },
      });

      return () => split.revert();
    },
    { scope: ref, dependencies: [animateOnMount, delay] }
  );

  return (
    <Tag ref={ref as never} data-reveal className={className}>
      {children}
    </Tag>
  );
}
