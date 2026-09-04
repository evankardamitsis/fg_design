"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Layered cinematic hero.
 *
 * The background sits at its natural object-cover framing and does not scale —
 * any zoom here compounds with object-cover's crop and reads as "zoomed in".
 * Depth instead comes from the content plane and scrim moving against a still
 * frame as the section leaves.
 *
 * Scroll-linked work is GSAP rather than framer's useScroll so it shares a
 * ticker with Lenis; two independent scroll systems resolve against positions a
 * frame apart, which shows up as jitter.
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
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scrollTrigger = {
        trigger: root.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      gsap.to("[data-hero-content]", {
        yPercent: 55,
        opacity: 0,
        ease: "none",
        scrollTrigger,
      });

      gsap.to("[data-hero-scrim]", {
        opacity: 0.85,
        ease: "none",
        scrollTrigger,
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden">
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

      <div
        data-hero-scrim
        className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 via-45% to-transparent opacity-55"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent via-45% to-transparent" />

      <div
        data-hero-content
        className="absolute inset-0 z-10 flex flex-col justify-end"
      >
        {children}
      </div>
    </div>
  );
}
