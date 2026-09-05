"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import type { Project } from "@/lib/projects";

const easing = [0.16, 1, 0.3, 1] as const;

export function CinematicProjectGallery({ projects }: { projects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const reduceMotion = useReducedMotion();
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];

  if (!activeProject) {
    return (
      <div className="border border-white/15 p-8 text-sm text-white/65">
        Featured projects will appear here once they are published.
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-12 md:items-end lg:gap-12">
      <Link
        href={`/portfolio/${activeProject.slug}`}
        className="group relative block aspect-[4/3] overflow-hidden bg-[#202326] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8e8e4] md:col-span-8"
        aria-label={`View ${activeProject.title}`}
      >
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={activeProject.slug}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: easing }}
            className="absolute inset-0"
          >
            <Image
              src={activeProject.cover.src}
              alt={activeProject.cover.alt}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:scale-[1.018]"
            />
          </motion.div>
        </AnimatePresence>
      </Link>

      <div className="md:col-span-4">
        <div className="border-t border-white/18">
          {projects.map((project) => {
            const isActive = project.slug === activeProject.slug;

            return (
              <Link
                key={project.slug}
                href={`/portfolio/${project.slug}`}
                onMouseEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                className={`group grid min-h-16 grid-cols-[1fr_auto] items-center gap-4 border-b border-white/12 py-3 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#e8e8e4] ${
                  isActive ? "text-[#eeeeea]" : "text-[#eeeeea]/48 hover:text-[#eeeeea]/82"
                }`}
              >
                <span className="text-lg tracking-[-0.02em] md:text-xl">{project.title}</span>
                <span className="text-xs tracking-[0.08em]">{project.postcode}</span>
              </Link>
            );
          })}
        </div>
        <Link
          href="/portfolio"
          className="mt-6 inline-flex min-h-11 items-center border-b border-[#eeeeea]/45 text-sm font-medium text-[#eeeeea] transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          View the full portfolio
        </Link>
      </div>
    </div>
  );
}
