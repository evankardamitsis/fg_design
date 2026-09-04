"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

/**
 * Image that drifts slower than the page as it passes through the viewport, and
 * is revealed behind a clip-path wipe. The image is over-sized by the travel
 * distance so the frame never shows an empty edge.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  strength = 12,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  /** Travel distance as a percentage of the frame height. */
  strength?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${strength}%`, `${strength}%`]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={reduced ? undefined : { y }}
        className="absolute inset-0 will-change-transform"
        // Over-scan so the parallax travel never exposes the frame edge.
        initial={false}
      >
        <div
          className="absolute"
          style={{
            top: `-${strength}%`,
            bottom: `-${strength}%`,
            left: 0,
            right: 0,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            quality={90}
            priority={priority}
            className="object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
