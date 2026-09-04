"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { staggerItem } from "@/components/motion/Reveal";
import { cinematic, cinematicInOut } from "@/components/motion/MaskReveal";
import type { Project } from "@/lib/projects";

export function ProjectTile({
  project,
  aspect = "aspect-[4/5]",
  sizes = "(min-width: 640px) 50vw, 100vw",
}: {
  project: Project;
  aspect?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // The photograph drifts against its frame as the tile crosses the viewport.
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <motion.div variants={staggerItem}>
      <motion.div
        initial={reduced ? undefined : { clipPath: "inset(100% 0% 0% 0%)" }}
        whileInView={reduced ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.3, ease: cinematicInOut }}
      >
        <Link
          ref={ref}
          href={`/portfolio/${project.slug}`}
          className={`group relative block ${aspect} overflow-hidden bg-ink`}
        >
          <motion.div
            style={reduced ? undefined : { y }}
            className="absolute inset-[-8%] will-change-transform"
          >
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              sizes={sizes}
              quality={90}
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/0 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6">
            <motion.div
              initial={reduced ? undefined : { y: 14, opacity: 0 }}
              whileInView={reduced ? undefined : { y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.9, delay: 0.35, ease: cinematic }}
            >
              <span className="font-display italic text-xs text-cream/70">
                {project.index} / 05
              </span>
              <h3 className="mt-1 text-xl text-cream">{project.title}</h3>
              <span className="text-xs text-cream/60">
                {project.location}, {project.postcode}
              </span>
            </motion.div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
