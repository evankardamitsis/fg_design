import { Button } from "@/components/Button";
import { EditorialProjectGallery } from "@/components/concepts/EditorialProjectGallery";
import { Eyebrow } from "@/components/Eyebrow";
import { Footer } from "@/components/Footer";
import { HeroCinematic } from "@/components/HeroCinematic";
import { HeroHeading } from "@/components/HeroHeading";
import { Nav } from "@/components/Nav";
import { ProcessSequence } from "@/components/ProcessSequence";
import { Counter } from "@/components/motion/Counter";
import { ParallaxImage } from "@/components/motion/Parallax";
import { Reveal, StaggerReveal } from "@/components/motion/Reveal";
import { StaggerCard } from "@/components/motion/StaggerCard";
import { TextReveal } from "@/components/motion/TextReveal";
import { getFeaturedProjects } from "@/lib/project-content";

const delivery = [
  {
    title: "Design",
    description: "Spatial planning, interior architecture and specification shaped around the way each client lives.",
  },
  {
    title: "Build",
    description: "Construction, building services and specialist trades managed as one coordinated programme.",
  },
  {
    title: "Completion",
    description: "Joinery, finishes and final styling resolved through a considered, ready-to-live-in handover.",
  },
];

const capabilities = [
  ["Bespoke joinery", "Cabinetry, wardrobes and panelling made for each home."],
  ["M&E systems", "Mechanical, electrical and plumbing planned from the outset."],
  ["Stone and marble", "Specialist tiling, mosaic and book-matched stonework."],
  ["Interior architecture", "Spatial design, specification, finishes and styling."],
];

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <>
      <section className="relative min-h-[100dvh] overflow-hidden">
        <HeroCinematic
          src="/images/home/hero.jpg"
          alt="A skylit kitchen and dining room with arched steel windows opening onto a terrace"
        >
          <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1440px] items-end px-5 pb-24 pt-24 md:px-10 md:pb-20 lg:px-14">
            <HeroHeading />
          </div>
        </HeroCinematic>
        <Nav variant="overlay" />
      </section>

      <main>
        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <Reveal>
            <Eyebrow>The practice</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.04}
            className="mt-7 max-w-5xl font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl lg:text-7xl"
          >
            One studio. One standard throughout.
          </TextReveal>
          <Reveal delay={0.12} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-ink/68 md:text-lg">
              Since 2016, FG Design has united interior architecture, construction and specialist craft, keeping every decision connected from first drawing to final handover.
            </p>
            <Button href="/studio" variant="dark" className="mt-8">
              About FG Design
            </Button>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-20 grid grid-cols-1 gap-10 border-t border-ink/12 pt-8 sm:grid-cols-3 md:mt-28">
              <div>
                <dd className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">2016</dd>
                <dt className="mt-2 text-sm text-ink/48">Established</dt>
              </div>
              <div>
                <dd className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">
                  <Counter value={12} suffix="+" />
                </dd>
                <dt className="mt-2 text-sm text-ink/48">Completed projects</dt>
              </div>
              <div>
                <dd className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">In-house</dd>
                <dt className="mt-2 text-sm text-ink/48">Specialist team</dt>
              </div>
            </dl>
          </Reveal>
        </section>

        <section id="selected-projects" className="scroll-mt-6 bg-ink px-5 py-24 text-cream md:px-10 md:py-32 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <Eyebrow tone="cream">Selected residences</Eyebrow>
            </Reveal>
            <TextReveal
              as="h2"
              delay={0.04}
              className="mt-7 max-w-3xl font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl"
            >
              A concise view of the portfolio.
            </TextReveal>
            <div className="mt-12 md:mt-16">
              <EditorialProjectGallery projects={featuredProjects} tone="dark" />
            </div>
            <Reveal delay={0.08}>
              <Button href="/portfolio" variant="frosted" className="mt-8">
                Discover more
              </Button>
            </Reveal>
          </div>
        </section>

        <ProcessSequence steps={delivery} />

        <ParallaxImage
          src="/images/projects/chelsea-house/05-kitchen-nook.jpg"
          alt="A marble island and bespoke cabinetry at Chelsea House"
          sizes="100vw"
          strength={10}
          className="h-[66vh] min-h-[440px] w-full"
        />

        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <TextReveal
            as="h2"
            className="max-w-4xl font-display text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl"
          >
            Experience made personal.
          </TextReveal>
          <Reveal delay={0.08} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-ink/68 md:text-lg">
              Fardad Ghodoussi founded FG Design after fifteen years within a distinguished London design-build practice, bringing deep experience to a more personal studio.
            </p>
          </Reveal>

          <StaggerReveal className="mt-16 grid gap-x-10 gap-y-10 border-t border-ink/12 pt-8 sm:grid-cols-2">
            {capabilities.map(([title, description]) => (
              <StaggerCard key={title}>
                <h3 className="text-lg font-medium tracking-[-0.02em]">{title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink/58">{description}</p>
              </StaggerCard>
            ))}
          </StaggerReveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
