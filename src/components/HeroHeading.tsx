"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/Button";

const easing = [0.16, 1, 0.3, 1] as const;

/**
 * Line breaks are explicit, not left to the container width, so the headline
 * always reads exactly as composed:
 *   Turnkey design & build / for London's most / distinguished homes.
 * Each line rides up from behind its own clipping box, so the type is uncovered
 * rather than sliding in.
 */
const lines = [
  { text: "Turnkey design & build", italic: false },
  { text: "for London's most", italic: false },
  { text: "distinguished homes.", italic: true },
];

export function HeroHeading() {
  return (
    <>
      {/* 40px / 48px measured off the Figma export (47.8px baseline-to-baseline,
          ~40px ascender band), so the desktop size matches the composition. */}
      <h1 className="text-[28px] leading-[1.2] text-cream sm:text-[34px] md:text-[40px]">
        {lines.map((line, i) => (
          <span key={line.text} className="block overflow-hidden pb-[0.1em]">
            <motion.span
              className={`block will-change-transform ${
                line.italic ? "font-display italic" : ""
              }`}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: easing }}
            >
              {line.text}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: easing }}
        className="flex shrink-0 gap-3"
      >
        <Button href="/portfolio" variant="frosted">Portfolio.</Button>
        <Button href="/contact" variant="solid">Start a project.</Button>
      </motion.div>
    </>
  );
}
