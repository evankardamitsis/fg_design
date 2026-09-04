import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Portfolio | FG Design Partners",
  description:
    "Five London residences, 2019—2026 — Chelsea House, Kensington Palace, Wycombe Square, Notting Hill House, and Gloucester Walk.",
};

export default function PortfolioPage() {
  return (
    <>
      <Nav variant="solid" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <Eyebrow>Selected Works.</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-3xl text-4xl leading-tight md:text-6xl">
            Five residences.
          </h1>
          <p className="mt-4 font-display italic text-xl text-ink/70">
            2019 — 2026, London SW3 &middot; W8 &middot; W2
          </p>
        </Reveal>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {projects.map((project) => (
              <Reveal key={project.slug} y={20}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-[auto_1fr_auto_auto] md:gap-10 md:py-10"
                >
                  <span className="font-display italic text-lg text-ink/50">{project.index}</span>
                  <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[4/3] md:w-56">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      sizes="(min-width: 768px) 224px, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl">{project.title}</h2>
                    <p className="mt-1 text-sm text-ink/60">
                      {project.location}, {project.postcode}
                    </p>
                  </div>
                  <div className="text-sm text-ink/50 md:text-right">
                    <p>{project.scope}</p>
                    <p className="mt-1">{project.timeline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
