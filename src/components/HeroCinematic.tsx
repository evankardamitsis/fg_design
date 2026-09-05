"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
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
  videoSrc,
  children,
}: {
  src: string;
  alt: string;
  /** Optional motion plate. The still is used as its poster, so first paint is
   *  identical either way and the video simply takes over once buffered. */
  videoSrc?: string;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  const mediaLayer = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    // Setting muted via the DOM property rather than the JSX attribute: React
    // does not always reflect `muted` in time for the browser's autoplay check,
    // which silently blocks playback and leaves the poster frozen on screen.
    el.muted = true;
    el.play().catch(() => {});
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          mediaLayer.current,
          { opacity: 0.72 },
          { opacity: 1, duration: 1.35, ease: "power2.out" }
        );

        const scrollTrigger = {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        };

        gsap.to("[data-hero-content]", {
          yPercent: 45,
          opacity: 0,
          ease: "none",
          scrollTrigger,
        });

        gsap.to("[data-hero-scrim]", {
          opacity: 0.8,
          ease: "none",
          scrollTrigger,
        });
      });

      return () => media.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className="absolute inset-0 overflow-hidden">
      <div ref={mediaLayer} className="absolute inset-0">
        {videoSrc ? (
          <video
            ref={video}
            className="h-full w-full object-cover object-center"
            poster={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
        )}
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
