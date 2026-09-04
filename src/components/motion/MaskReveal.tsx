"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Slow, weighted deceleration — reads as a camera settling rather than a UI easing. */
export const cinematic = [0.16, 1, 0.3, 1] as const;
/** Gentler in/out, used for wipes where both ends should feel unhurried. */
export const cinematicInOut = [0.65, 0, 0.35, 1] as const;

/**
 * Reveals its children from behind a clip-path wipe while the content itself
 * settles from a slight scale — the two combined read as a shutter opening
 * rather than a plain fade.
 */
export function MaskReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left";
}) {
  const reduced = useReducedMotion();

  const hidden = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 100% 0% 0%)",
  }[direction];

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: hidden, scale: 1.08 }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
        viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
        transition={{
          clipPath: { duration: 1.4, delay, ease: cinematicInOut },
          scale: { duration: 1.8, delay, ease: cinematic },
        }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}

/**
 * Line-by-line mask reveal. Each line rides up from behind its own clipping box,
 * so the text appears to be uncovered rather than sliding in.
 */
export function TextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "h2" | "h3" | "p";
}) {
  const reduced = useReducedMotion();
  if (reduced) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag className={className}>
      <span className="block overflow-hidden pb-[0.12em]">
        <motion.span
          className="block will-change-transform"
          initial={{ y: "110%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.1, delay, ease: cinematic }}
        >
          {children}
        </motion.span>
      </span>
    </Tag>
  );
}
