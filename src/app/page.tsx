import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Button } from "@/components/Button";
import { HeroCinematic } from "@/components/HeroCinematic";
import { HeroHeading } from "@/components/HeroHeading";
import { ProjectTile } from "@/components/ProjectTile";
import { Reveal, StaggerReveal } from "@/components/motion/Reveal";
import { StaggerCard } from "@/components/motion/StaggerCard";
import { TextReveal } from "@/components/motion/MaskReveal";
import { ParallaxImage } from "@/components/motion/Parallax";
import { Counter } from "@/components/motion/Counter";
import { projects } from "@/lib/projects";

const topRow = projects.slice(0, 2);
const middle = projects[2];
const bottomRow = projects.slice(3);

const phases = [
  {
    phase: "Phase 01",
    title: "Design",
    description:
      "Concept, spatial planning, and full interior specification, developed in close collaboration with each client.",
  },
  {
    phase: "Phase 02",
    title: "Build",
    description:
      "Structural works, building services, and bespoke joinery — executed by our in-house specialist team under one roof.",
  },
  {
    phase: "Phase 03",
    title: "Completion",
    description:
      "Finishing, styling, and handover, delivered on schedule and to budget, ready to be lived in.",
  },
];

const capabilities = [
  {
    title: "Bespoke Joinery",
    description:
      "Custom cabinetry, wardrobes & panelling, built to the same standard as the rest of the home — not sourced, but made.",
  },
  {
    title: "M&E Systems",
    description:
      "Mechanical, electrical & plumbing, planned from the outset so the finished home performs as well as it looks.",
  },
  {
    title: "Stone & Marble",
    description:
      "Tiling, mosaic & book-matched stone, sourced and set by specialists who work exclusively within our own projects.",
  },
  {
    title: "Interior Architectural Design",
    description:
      "Specification, finishes & styling carried through from first sketch to the last cushion on the sofa.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative min-h-[92vh] overflow-hidden">
        <HeroCinematic
          src="/images/home/hero.jpg"
          alt="A skylit kitchen and dining room with arched steel windows opening onto a terrace"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 pb-16 md:flex-row md:items-end md:justify-between md:px-10 md:pb-20">
            <HeroHeading />
          </div>
        </HeroCinematic>
        <Nav variant="overlay" />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <Eyebrow>The Practice.</Eyebrow>
        </Reveal>
        <TextReveal as="h2" delay={0.05} className="mt-8 max-w-3xl text-4xl leading-tight md:text-6xl">
          An in-house studio, one standard of quality.
        </TextReveal>
        <Reveal delay={0.2} className="mt-12 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-ink/75 md:text-lg">
            We deliver a comprehensive turnkey service — every phase from initial design
            through construction to final completion, held to a single standard. With
            our in-house specialist team we retain full control of each project,
            guaranteeing delivery on time and on budget.
          </p>
          <Button href="/studio" variant="dark" className="shrink-0">
            More about us.
          </Button>
        </Reveal>

        <Reveal delay={0.1}>
          <dl className="mt-20 grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">Established</dt>
              <dd className="mt-2 text-4xl font-display italic">2016</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">No. of Projects</dt>
              <dd className="mt-2 text-4xl font-display italic">
                <Counter value={12} suffix="+" />
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">Specialist Team</dt>
              <dd className="mt-2 text-4xl font-display italic">In-house</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <section className="bg-ink py-24 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Reveal>
            <Eyebrow tone="cream">Selected Works.</Eyebrow>
          </Reveal>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <TextReveal as="h2" className="max-w-2xl text-4xl leading-tight md:text-6xl">
              Five residences, one standard of craft.
            </TextReveal>
            <Reveal delay={0.2} className="shrink-0">
              <Button href="/portfolio" variant="frosted">
                Discover all work.
              </Button>
            </Reveal>
          </div>

          <StaggerReveal className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
            {topRow.map((project) => (
              <ProjectTile key={project.slug} project={project} aspect="aspect-[4/3]" />
            ))}
          </StaggerReveal>
          <StaggerReveal className="mt-3 md:mt-4">
            <ProjectTile project={middle} aspect="aspect-[21/9]" sizes="100vw" />
          </StaggerReveal>
          <StaggerReveal className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-4 md:gap-4">
            {bottomRow.map((project) => (
              <ProjectTile key={project.slug} project={project} aspect="aspect-[4/3]" />
            ))}
          </StaggerReveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <Eyebrow>Scope of Service.</Eyebrow>
        </Reveal>
        <TextReveal as="h2" delay={0.05} className="mt-8 max-w-3xl text-4xl leading-tight md:text-6xl">
          A single point of delivery.
        </TextReveal>
        <Reveal delay={0.15}>
          <p className="mt-6 font-display italic text-xl text-ink/70">
            Turnkey Design &rarr; Build &rarr; Completion
          </p>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink/75 md:text-lg">
            One team carries every project from first sketch to final handover. Because
            design, construction, and finishing sit under one roof, nothing is lost in
            translation between separate contractors — and nothing falls outside our
            control.
          </p>
        </Reveal>

        <StaggerReveal className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 border-t border-ink/10 pt-12 md:grid-cols-3">
          {phases.map((item) => (
            <StaggerCard key={item.title}>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/50">{item.phase}</span>
              <h3 className="mt-3 text-3xl">{item.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ink/70 md:text-base">
                {item.description}
              </p>
            </StaggerCard>
          ))}
        </StaggerReveal>
      </section>

      {/* Full-bleed craft shot: bespoke joinery and stone, which is what the
          capabilities below are actually describing. */}
      <ParallaxImage
        src="/images/projects/chelsea-house/05-kitchen-nook.jpg"
        alt="A marble island and bespoke cabinetry, built in-house"
        sizes="100vw"
        strength={14}
        className="h-[60vh] min-h-[380px] w-full"
      />

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10 md:py-32">
        <Reveal>
          <Eyebrow>In-House Capabilities.</Eyebrow>
        </Reveal>
        <TextReveal as="h2" delay={0.05} className="mt-8 max-w-2xl text-4xl leading-tight md:text-5xl">
          Specialist trades, kept under one roof.
        </TextReveal>
        <StaggerReveal className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 border-t border-ink/10 pt-10 sm:grid-cols-2">
          {capabilities.map((item) => (
            <StaggerCard key={item.title}>
              <h3 className="text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70 md:text-base">
                {item.description}
              </p>
            </StaggerCard>
          ))}
        </StaggerReveal>
      </section>

      <Footer />
    </>
  );
}
