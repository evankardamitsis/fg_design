"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Layered cinematic hero.
 *
 * Depth comes from three planes moving at different rates as you scroll:
 *   background (slow) -> scrim -> content (fastest).
 *
 * Motion is scroll-driven only. Pointer-driven tilt was removed deliberately:
 * it makes the frame move under a still cursor, which reads as unsteady rather
 * than composed.
 *
 * The push-in is a GPU transform rather than a baked video — ffmpeg's zoompan
 * crops on integer pixels, which judders on slow moves, and re-encoding a zoomed
 * crop softens the image.
 */
export function HeroCinematic({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // The background does not scale or translate at all: it sits at its natural
  // object-cover framing, matching the Figma composition exactly. Any zoom here
  // compounds with object-cover's crop and reads as "zoomed in".
  // Depth comes from the content plane and scrim moving against a still frame.
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "55%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const scrim = useTransform(scrollYProgress, [0, 1], [0.55, 0.85]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {/* Background plane — static, natural framing */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* NOTE: a defocused duplicate of the photo was trialled here as a foreground
          depth plane. Even masked and blurred it hazes the whole frame and costs
          contrast, so it was removed. Genuine foreground/background separation
          needs a real cut-out (alpha-matted) asset, not a masked copy. */}

      {/* Scrim, deepening as the section leaves */}
      <motion.div
        style={{ opacity: scrim }}
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 via-45% to-transparent"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent via-45% to-transparent" />

      {/* Content plane */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="absolute inset-0 z-10 flex flex-col justify-end"
      >
        {children}
      </motion.div>
    </div>
  );
}
