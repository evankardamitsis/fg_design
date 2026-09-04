"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Full-bleed image that drifts slower than the page as it crosses the viewport.
 * The image is over-scanned by the travel distance so the frame never exposes an
 * empty edge at either end of the scrub.
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
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        inner.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope: root, dependencies: [strength] }
  );

  return (
    <div ref={root} className={`relative overflow-hidden ${className}`}>
      <div
        ref={inner}
        className="absolute will-change-transform"
        style={{ top: `-${strength}%`, bottom: `-${strength}%`, left: 0, right: 0 }}
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
    </div>
  );
}
