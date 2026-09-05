import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CinematicProjectGallery } from "@/components/concepts/CinematicProjectGallery";
import { ConceptFooter } from "@/components/concepts/ConceptFooter";
import { ConceptHeader } from "@/components/concepts/ConceptHeader";
import { ConceptReveal } from "@/components/concepts/ConceptReveal";
import { getFeaturedProjects } from "@/lib/project-content";

export const metadata: Metadata = {
  title: "Concept A | FG Design Partners",
  description: "A dark cinematic homepage concept for FG Design Partners.",
};

const delivery = [
  {
    title: "Design",
    description: "Architecture, spatial planning and interior specification shaped around the way each client lives.",
  },
  {
    title: "Build",
    description: "Construction, building services and specialist trades managed as one coordinated programme.",
  },
  {
    title: "Completion",
    description: "Joinery, finishes and final styling resolved before a considered, ready-to-live-in handover.",
  },
];

export default async function ConceptA() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="bg-[#111315] font-sans text-[#ecece7]">
      <section className="relative min-h-[100dvh] overflow-hidden">
        <Image
          src="/images/projects/gloucester-walk/01-living-room.jpg"
          alt="Living room at Gloucester Walk with bespoke timber joinery and stone"
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#111315]/28" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111315]/88 via-[#111315]/34 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111315]/80 via-transparent to-[#111315]/10" />
        <ConceptHeader homeHref="/concept-a" tone="light" />

        <div className="relative mx-auto flex min-h-[100dvh] max-w-[1440px] items-end px-5 pb-14 pt-24 md:px-10 md:pb-20 lg:px-14">
          <div className="max-w-5xl">
            <h1 className="max-w-[18ch] text-[clamp(2.6rem,6.2vw,6.5rem)] leading-[0.96] tracking-[-0.055em]">
              From first sketch to finished home.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#ecece7]/82 md:text-lg">
              Turnkey design and build, delivered by one in-house team across London&apos;s most considered residences.
            </p>
            <Link
              href="#projects-a"
              className="mt-8 inline-flex min-h-12 items-center justify-center whitespace-nowrap border border-[#ecece7] px-6 text-sm font-semibold transition-colors duration-200 hover:bg-[#ecece7] hover:text-[#111315] active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ecece7]"
            >
              View projects
            </Link>
          </div>
        </div>
      </section>

      <main>
        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <ConceptReveal>
            <h2 className="max-w-5xl text-4xl leading-[1.03] tracking-[-0.04em] md:text-6xl lg:text-7xl">
              One studio carries the whole home.
            </h2>
            <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#ecece7]/62 md:text-lg">
              Design, construction and finishing sit under one roof. Decisions remain connected, responsibility stays clear and every detail serves the same vision.
            </p>
          </ConceptReveal>

          <ConceptReveal delay={0.08} className="mt-20 grid gap-10 border-t border-white/15 pt-8 sm:grid-cols-3 md:mt-28">
            <div>
              <p className="text-4xl tracking-[-0.04em] md:text-5xl">2016</p>
              <p className="mt-2 text-sm text-[#ecece7]/48">Founded in London</p>
            </div>
            <div>
              <p className="text-4xl tracking-[-0.04em] md:text-5xl">12+</p>
              <p className="mt-2 text-sm text-[#ecece7]/48">Completed projects</p>
            </div>
            <div>
              <p className="text-4xl tracking-[-0.04em] md:text-5xl">One</p>
              <p className="mt-2 text-sm text-[#ecece7]/48">Accountable team</p>
            </div>
          </ConceptReveal>
        </section>

        <section id="projects-a" className="scroll-mt-6 px-5 py-24 md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <ConceptReveal>
              <p className="text-sm text-[#ecece7]/48">Selected residences</p>
              <h2 className="mt-5 max-w-3xl text-4xl leading-[1.02] tracking-[-0.04em] md:text-6xl">
                Five homes. One focused gallery.
              </h2>
            </ConceptReveal>
            <ConceptReveal delay={0.08} className="mt-12 md:mt-16">
              <CinematicProjectGallery projects={featuredProjects} />
            </ConceptReveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36 lg:px-14">
          <ConceptReveal className="md:col-span-7">
            <div className="relative aspect-[5/6] overflow-hidden md:aspect-[4/5]">
              <Image
                src="/images/projects/chelsea-house/05-kitchen-nook.jpg"
                alt="Marble island and bespoke cabinetry at Chelsea House"
                fill
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </ConceptReveal>

          <ConceptReveal delay={0.08} className="md:col-span-5 md:self-end md:pb-8">
            <h2 className="max-w-md text-4xl leading-[1.03] tracking-[-0.04em] md:text-5xl">
              Designed once. Delivered together.
            </h2>
            <div className="mt-12 border-t border-white/15">
              {delivery.map((item) => (
                <div key={item.title} className="grid gap-2 border-b border-white/12 py-6 sm:grid-cols-[7rem_1fr] md:grid-cols-1 lg:grid-cols-[7rem_1fr]">
                  <h3 className="text-lg">{item.title}</h3>
                  <p className="max-w-sm text-sm leading-relaxed text-[#ecece7]/55">{item.description}</p>
                </div>
              ))}
            </div>
          </ConceptReveal>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <ConceptReveal>
            <p className="max-w-5xl text-3xl leading-[1.12] tracking-[-0.035em] text-[#ecece7]/88 md:text-5xl lg:text-6xl">
              Founded by Fardad Ghodoussi in 2016, FG Design brings design leadership and delivery discipline into one close-knit practice.
            </p>
            <Link
              href="/studio"
              className="mt-10 inline-flex min-h-11 items-center border-b border-[#ecece7]/45 text-sm font-medium transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
            >
              Meet the studio
            </Link>
          </ConceptReveal>
        </section>
      </main>

      <ConceptFooter tone="dark" />
    </div>
  );
}
