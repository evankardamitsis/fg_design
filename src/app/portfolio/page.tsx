import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/lib/project-content";

export const metadata: Metadata = {
  title: "Portfolio | FG Design Partners",
  description:
    "Five London residences, 2019 to 2026: Chelsea House, Kensington Palace, Wycombe Square, Notting Hill House, and Gloucester Walk.",
};

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <>
      <Nav variant="solid" />

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal>
          <Eyebrow>Selected Works.</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-3xl text-4xl leading-tight tracking-[-0.035em] md:text-6xl">
            Five <span className="font-display italic tracking-[-0.02em]">residences.</span>
          </h1>
          <p className="mt-4 font-display italic text-xl text-ink/70">
            2019 to 2026, London SW3, W8 and W2
          </p>
        </Reveal>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {projects.map((project) => (
              <Reveal key={project.slug} y={20}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-[2rem_18rem_1fr_auto] md:gap-8 md:py-10 lg:grid-cols-[2rem_22rem_1fr_auto] lg:gap-10 xl:grid-cols-[2rem_24rem_1fr_auto]"
                >
                  <span className="font-display italic text-lg text-ink/50">{project.index}</span>
                  <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[3/2]">
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      fill
                      sizes="(min-width: 1280px) 384px, (min-width: 1024px) 352px, (min-width: 768px) 288px, 100vw"
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
