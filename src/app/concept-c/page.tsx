import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ConceptFooter } from "@/components/concepts/ConceptFooter";
import { ConceptHeader } from "@/components/concepts/ConceptHeader";
import { ConceptReveal } from "@/components/concepts/ConceptReveal";
import { EditorialProjectGallery } from "@/components/concepts/EditorialProjectGallery";
import { getFeaturedProjects } from "@/lib/project-content";

export const metadata: Metadata = {
  title: "Concept C | FG Design Partners",
  description: "A refined editorial homepage concept for FG Design Partners.",
};

const services = [
  ["Interior architectural design", "Spatial planning, specification and a complete visual language for the home."],
  ["Construction and building services", "Structural work, mechanical systems and site delivery managed by one team."],
  ["Bespoke craft and completion", "Joinery, stone, marble, decoration and styling resolved through final handover."],
];

export default async function ConceptC() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="bg-cream font-sans text-ink">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src="/images/projects/chelsea-house/01-dining.jpg"
          alt="Dining room at Chelsea House with travertine table and bespoke storage"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/5" />
        <ConceptHeader homeHref="/concept-c" tone="light" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] items-end px-5 pb-14 pt-24 md:px-10 md:pb-20 lg:px-14">
          <div className="max-w-4xl text-cream">
            <h1 className="max-w-[14ch] font-display text-[clamp(3.1rem,6vw,6.25rem)] leading-[0.95] tracking-[-0.045em]">
              Distinctive homes, delivered in full.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-cream/84 md:text-lg">
              We design, build and complete exceptional homes through one accountable, in-house team.
            </p>
            <Link
              href="#projects-c"
              className="mt-8 inline-flex min-h-12 items-center justify-center whitespace-nowrap bg-cream px-6 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-cream/86 active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <ConceptReveal>
            <p className="text-sm text-ink/48">The practice</p>
            <h2 className="mt-6 max-w-5xl font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl lg:text-7xl">
              Design, build and completion under one roof.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/68 md:text-lg">
              From the first drawing to the final fitting, one in-house team protects the quality, programme and intent of every project.
            </p>
          </ConceptReveal>

          <ConceptReveal delay={0.08} className="mt-20 grid gap-10 border-t border-ink/15 pt-8 sm:grid-cols-3 md:mt-28">
            <div>
              <p className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">2016</p>
              <p className="mt-2 text-sm text-ink/48">Established</p>
            </div>
            <div>
              <p className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">12+</p>
              <p className="mt-2 text-sm text-ink/48">Completed projects</p>
            </div>
            <div>
              <p className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">In-house</p>
              <p className="mt-2 text-sm text-ink/48">Specialist team</p>
            </div>
          </ConceptReveal>
        </section>

        <section id="projects-c" className="scroll-mt-6 px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <ConceptReveal>
              <p className="text-sm text-ink/48">Selected residences</p>
              <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl">
                A concise view of the portfolio.
              </h2>
            </ConceptReveal>
            <ConceptReveal delay={0.08} className="mt-12 md:mt-16">
              <EditorialProjectGallery projects={featuredProjects} />
            </ConceptReveal>
            <Link
              href="/portfolio"
              className="mt-7 inline-flex min-h-11 items-center border-b border-ink/40 text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              View the full portfolio
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36 lg:px-14">
          <ConceptReveal className="md:col-span-5 md:pt-12">
            <h2 className="max-w-md font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-5xl">
              One point of responsibility.
            </h2>
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink/66">
              A unified service keeps creative and practical decisions connected from planning through completion.
            </p>

            <div className="mt-12 border-t border-ink/15">
              {services.map(([title, description]) => (
                <div key={title} className="border-b border-ink/12 py-6">
                  <h3 className="text-lg font-medium tracking-[-0.02em]">{title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/58">{description}</p>
                </div>
              ))}
            </div>
          </ConceptReveal>

          <ConceptReveal delay={0.08} className="md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]">
              <Image
                src="/images/projects/kensington-palace/01-kitchen.jpg"
                alt="Sculptural cabinetry and Moroccan mosaic in the Kensington Palace kitchen"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </ConceptReveal>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <ConceptReveal className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="text-sm text-ink/48">About FG Design</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl">
                Experience made personal.
              </h2>
            </div>
            <div className="md:col-span-5">
              <p className="max-w-md text-base leading-relaxed text-ink/68">
                Fardad Ghodoussi founded FG Design in 2016 after fifteen years within a distinguished London design-build practice.
              </p>
              <Link
                href="/studio"
                className="mt-7 inline-flex min-h-11 items-center border-b border-ink/40 text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              >
                Read our story
              </Link>
            </div>
          </ConceptReveal>
        </section>
      </main>

      <ConceptFooter tone="light" />
    </div>
  );
}
