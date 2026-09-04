"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASE, EASE_IN_OUT } from "@/components/motion/Reveal";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function ProjectTile({
  project,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // One timeline, one trigger. This previously had a variant-driven fade
      // from the parent *and* its own independent in-view clip animation — two
      // triggers with different geometry, so a tile could open its wipe while
      // still fully transparent.
      gsap
        .timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        })
        .from(root.current, {
          clipPath: "inset(18% 0% 0% 0%)",
          opacity: 0,
          duration: 1.25,
          ease: EASE_IN_OUT,
        })
        .from(
          root.current!.querySelector("[data-caption]"),
          { y: 12, opacity: 0, duration: 0.8, ease: EASE },
          "-=0.7"
        );

      // The photograph drifts against its frame as the tile crosses the viewport.
      gsap.fromTo(
        frame.current,
        { yPercent: -6 },
        {
          yPercent: 6,
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
    { scope: root }
  );

  return (
    <div ref={root} data-reveal>
      <Link
        href={`/portfolio/${project.slug}`}
        className={`group relative block ${aspect} overflow-hidden bg-ink`}
      >
        <div ref={frame} className="absolute inset-[-6%] will-change-transform">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes={sizes}
            quality={90}
            className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6">
          <div data-caption>
            <span className="font-display italic text-xs text-cream/70">
              {project.index} / 05
            </span>
            <h3 className="mt-1 text-xl text-cream">{project.title}</h3>
            <span className="text-xs text-cream/60">
              {project.location}, {project.postcode}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
