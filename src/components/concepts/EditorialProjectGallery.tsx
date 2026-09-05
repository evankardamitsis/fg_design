"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/lib/projects";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const desktopPlacement = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

export function EditorialProjectGallery({
  projects,
  tone = "light",
}: {
  projects: Project[];
  tone?: "light" | "dark";
}) {
  const root = useRef<HTMLDivElement>(null);
  const isDark = tone === "dark";

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => {
        const tiles = gsap.utils.toArray<HTMLElement>("[data-project-tile]", root.current);

        tiles.forEach((tile) => {
          gsap.from(tile, {
            clipPath: "inset(0 0 14% 0)",
            opacity: 0,
            y: 22,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: tile,
              start: "top 88%",
              once: true,
            },
          });
        });
      });

      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const tiles = gsap.utils.toArray<HTMLElement>("[data-project-tile]", root.current);

        gsap.from(tiles, {
          clipPath: "inset(0 0 14% 0)",
          opacity: 0,
          y: 22,
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: {
            trigger: root.current,
            start: "top 82%",
            once: true,
          },
        });
      });

      return () => media.revert();
    },
    { scope: root }
  );

  if (!projects.length) {
    return (
      <div className={`border p-8 text-sm ${isDark ? "border-cream/15 text-cream/65" : "border-ink/15 text-ink/65"}`}>
        Featured projects will appear here once they are published.
      </div>
    );
  }

  return (
    <div
      ref={root}
      className="grid gap-5 md:h-[960px] md:grid-cols-12 md:grid-rows-3 md:gap-3 xl:h-[1080px]"
    >
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/portfolio/${project.slug}`}
          data-project-tile
          className={`group flex h-[clamp(19rem,88vw,25rem)] flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:h-auto md:min-h-0 ${
            isDark
              ? "bg-[#282726] focus-visible:outline-cream"
              : "bg-[#e7e3df] focus-visible:outline-ink"
          } ${
            desktopPlacement[index] ?? "md:col-span-4"
          }`}
        >
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes="(min-width: 768px) 58vw, calc(100vw - 3rem)"
              quality={90}
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:scale-[1.018]"
            />
          </div>
          <div
            className={`grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 px-4 ${
              isDark ? "bg-ink text-cream" : "bg-cream text-ink"
            }`}
          >
            <span className="text-base tracking-[-0.02em]">{project.title}</span>
            <span className={`text-xs ${isDark ? "text-cream/52" : "text-ink/52"}`}>{project.postcode}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
