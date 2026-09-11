import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Eyebrow } from "@/components/Eyebrow";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { PortfolioCategoryNav } from "@/components/PortfolioCategoryNav";
import { Reveal } from "@/components/motion/Reveal";
import { getCommercialProjects } from "@/lib/commercial-projects";

export const metadata: Metadata = {
  title: "Commercial Portfolio | FG Design Partners",
  description:
    "Commercial design, development and project coordination by FG Design Partners.",
};

export default async function CommercialPortfolioPage() {
  const projects = await getCommercialProjects();

  return (
    <>
      <Nav variant="solid" />

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal>
          <Eyebrow>Selected Works.</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-4xl text-4xl leading-tight tracking-[-0.035em] md:text-6xl">
            Beyond the home, <span className="font-display italic tracking-[-0.02em]">the same attention.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink/62 md:text-lg">
            Hospitality and high-performance environments shaped through design,
            development and close project coordination.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <PortfolioCategoryNav active="commercial" />
        </Reveal>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-14">
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {projects.map((project) => (
              <Reveal key={project.slug} y={20}>
                <Link
                  href={`/portfolio/commercial/${project.slug}`}
                  className="group grid grid-cols-1 items-center gap-6 py-8 md:grid-cols-[2rem_18rem_1fr_auto] md:gap-8 md:py-10 lg:grid-cols-[2rem_22rem_1fr_auto] lg:gap-10 xl:grid-cols-[2rem_24rem_1fr_auto]"
                >
                  <span className="font-display italic text-lg text-ink/50">{project.index}</span>
                  {project.cover ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-white md:aspect-[3/2]">
                      <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        fill
                        sizes="(min-width: 1280px) 384px, (min-width: 1024px) 352px, (min-width: 768px) 288px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[16/10] w-full flex-col justify-between overflow-hidden bg-ink p-5 text-cream md:aspect-[3/2] md:p-6">
                      <span className="text-[0.65rem] uppercase tracking-[0.18em] text-cream/48">
                        Sports &amp; performance
                      </span>
                      <span className="max-w-[10ch] font-display text-3xl italic leading-[0.96] tracking-[-0.03em] md:text-4xl">
                        Newcastle
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl md:text-3xl">{project.title}</h2>
                    <p className="mt-1 text-sm text-ink/60">{project.location}</p>
                  </div>
                  <div className="text-sm text-ink/50 md:max-w-48 md:text-right">
                    <p>{project.sector}</p>
                    <p className="mt-1">{project.role}</p>
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
