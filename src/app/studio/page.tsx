import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Counter } from "@/components/motion/Counter";
import { Reveal, RevealMedia, StaggerReveal } from "@/components/motion/Reveal";
import { StaggerCard } from "@/components/motion/StaggerCard";
import { TextReveal } from "@/components/motion/TextReveal";

export const metadata: Metadata = {
  title: "About | FG Design Partners",
  description:
    "Founded by Fardad Ghodoussi, FG Design Partners brings interior architecture, construction and completion together under one roof.",
};

const capabilities = [
  {
    title: "Bespoke joinery",
    description: "Custom cabinetry, wardrobes and panelling designed for the architecture of each home.",
  },
  {
    title: "M&E systems",
    description: "Mechanical, electrical and plumbing planned alongside the interior from the outset.",
  },
  {
    title: "Stone and marble",
    description: "Tiling, mosaic and book-matched stonework handled by specialist craftspeople.",
  },
  {
    title: "Interior architectural design",
    description: "Space planning, specification, finishes and styling developed as one complete interior.",
  },
];

const residentialScales = ["Lateral apartments", "Four-storey townhouses", "Five-storey residences"];

export default function StudioPage() {
  return (
    <>
      <Nav variant="solid" />

      <main>
        <section className="mx-auto grid min-h-[calc(100dvh-5rem)] max-w-[1440px] items-center gap-12 px-5 py-16 md:grid-cols-12 md:px-10 md:py-20 lg:px-14">
          <div className="md:col-span-7 md:pr-8 lg:col-span-6">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.18em] text-ink/48">About FG Design</p>
            </Reveal>
            <TextReveal
              as="h1"
              animateOnMount
              delay={0.08}
              className="mt-7 max-w-[12ch] text-[clamp(3rem,6vw,6rem)] leading-[0.98] tracking-[-0.045em]"
            >
              An in-house studio, <span className="font-display italic tracking-[-0.025em]">one standard of quality</span>
            </TextReveal>
            <Reveal delay={0.12} className="mt-8 max-w-lg">
              <p className="text-base leading-relaxed text-ink/68 md:text-lg">
                FG Design brings interior architecture, construction and completion together for distinguished London homes.
              </p>
            </Reveal>
          </div>

          <RevealMedia className="relative aspect-[4/5] overflow-hidden md:col-span-5 lg:col-span-5 lg:col-start-8">
            <Image
              src="/images/projects/chelsea-house/04-drawing-room.jpg"
              alt="Sculptural seating and a bespoke table in a Chelsea drawing room"
              fill
              priority
              quality={95}
              sizes="(min-width: 1024px) 36vw, (min-width: 768px) 42vw, calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </RevealMedia>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <div className="grid gap-12 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 lg:col-span-6">
              <TextReveal
                as="h2"
                className="max-w-[12ch] text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl"
              >
                Experience before the <span className="font-display italic tracking-[-0.02em]">studio</span>
              </TextReveal>
              <Reveal delay={0.08} className="mt-8 max-w-xl space-y-6">
                <p className="text-base leading-relaxed text-ink/68 md:text-lg">
                  Fardad Ghodoussi founded FG Design in 2016 after fifteen years at a distinguished design and build practice. His earlier work covered high-end residential, hotel and commercial projects.
                </p>
                <p className="text-base leading-relaxed text-ink/68 md:text-lg">
                  He created FG Design around a closer relationship between design and delivery. The same team develops the interiors, coordinates the build and completes the home.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12} className="md:col-span-4 md:col-start-9 lg:col-span-3 lg:col-start-10">
              <dl className="grid gap-8 border-t border-ink/12 pt-7 sm:grid-cols-3 md:grid-cols-1">
                <div>
                  <dd className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">2016</dd>
                  <dt className="mt-2 text-sm text-ink/48">Founded</dt>
                </div>
                <div>
                  <dd className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">15 years</dd>
                  <dt className="mt-2 text-sm text-ink/48">Prior experience</dt>
                </div>
                <div>
                  <dd className="font-display text-4xl italic leading-[1.1] pb-1 md:text-5xl">
                    <Counter value={12} suffix="+" />
                  </dd>
                  <dt className="mt-2 text-sm text-ink/48">Completed projects</dt>
                </div>
              </dl>
            </Reveal>
          </div>

          <RevealMedia className="relative mt-16 aspect-[4/3] overflow-hidden md:mt-24 md:aspect-[16/8]">
            <Image
              src="/images/projects/chelsea-house/02-kitchen-dining.jpg"
              alt="An open kitchen and dining room with bespoke cabinetry and a marble island"
              fill
              quality={90}
              sizes="(min-width: 1440px) 1328px, calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </RevealMedia>
        </section>

        <section className="bg-ink px-5 py-24 text-cream md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <TextReveal
              as="h2"
              className="max-w-4xl text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl lg:text-7xl"
            >
              Every decision stays <span className="font-display italic tracking-[-0.02em]">connected</span>
            </TextReveal>
            <Reveal delay={0.08} className="mt-8 max-w-2xl">
              <p className="text-base leading-relaxed text-cream/68 md:text-lg">
                One in-house team manages each phase, giving clients a single point of responsibility from initial concept to final handover.
              </p>
            </Reveal>

            <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:items-start md:gap-8">
              <RevealMedia className="relative aspect-[3/4] overflow-hidden md:col-span-5 md:aspect-[4/5] lg:col-span-5">
                <Image
                  src="/images/projects/kensington-palace/02-wardrobe.jpg"
                  alt="Bespoke wardrobe doors with sculpted handles and integrated lighting"
                  fill
                  quality={90}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 42vw, calc(100vw - 2.5rem)"
                  className="object-cover"
                />
              </RevealMedia>

              <StaggerReveal className="md:col-span-6 md:col-start-7 lg:col-span-6 lg:col-start-7">
                {capabilities.map((capability) => (
                  <StaggerCard key={capability.title} className="border-t border-cream/14 py-7 first:pt-0">
                    <h3 className="text-2xl tracking-[-0.025em] md:text-3xl">{capability.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-cream/58 md:text-base">
                      {capability.description}
                    </p>
                  </StaggerCard>
                ))}
              </StaggerReveal>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <TextReveal
            as="h2"
            className="max-w-4xl text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl"
          >
            From lateral apartments to <span className="font-display italic tracking-[-0.02em]">five-storey homes</span>
          </TextReveal>
          <Reveal delay={0.08} className="mt-8 max-w-2xl">
            <p className="text-base leading-relaxed text-ink/68 md:text-lg">
              Each commission receives the same joined-up approach, whether the work centres on a single interior or a complete structural refurbishment.
            </p>
          </Reveal>

          <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-12 md:items-end md:gap-4">
            <RevealMedia className="relative aspect-[4/3] overflow-hidden md:col-span-8">
              <Image
                src="/images/projects/gloucester-walk/01-living-room.jpg"
                alt="A completed living room with timber joinery, stone and soft textiles"
                fill
                quality={90}
                sizes="(min-width: 1024px) 66vw, calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </RevealMedia>
            <RevealMedia className="relative aspect-[3/4] overflow-hidden md:col-span-4 md:mb-[-4rem]">
              <Image
                src="/images/projects/gloucester-walk/02-shower-room.jpg"
                alt="A book-matched marble shower room with matte black fittings"
                fill
                quality={90}
                sizes="(min-width: 1024px) 32vw, calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </RevealMedia>
          </div>

          <Reveal delay={0.12}>
            <ul className="mt-16 grid gap-5 border-t border-ink/12 pt-7 text-sm text-ink/58 sm:grid-cols-3 md:mt-28">
              {residentialScales.map((scale) => (
                <li key={scale}>{scale}</li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-24 grid gap-5 md:mt-36 md:grid-cols-12 md:items-end md:gap-4">
            <RevealMedia className="relative aspect-[3/4] overflow-hidden md:col-span-4 md:mb-16">
              <Image
                src="/images/projects/kensington-palace/04-bathroom.jpg"
                alt="A serene tiled bathroom with an arched recess in a Kensington residence"
                fill
                quality={90}
                sizes="(min-width: 1024px) 32vw, calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </RevealMedia>
            <RevealMedia className="relative aspect-[4/3] overflow-hidden md:col-span-8">
              <Image
                src="/images/projects/chelsea-house/03-bedroom.jpg"
                alt="A calm principal bedroom with bespoke joinery in Chelsea"
                fill
                quality={90}
                sizes="(min-width: 1024px) 66vw, calc(100vw - 2.5rem)"
                className="object-cover"
              />
            </RevealMedia>
          </div>

          <Reveal className="mt-14 flex justify-end md:mt-20">
            <Link
              href="/portfolio"
              className="group flex items-center gap-5 border-b border-ink/25 pb-3 text-xl transition-colors duration-300 hover:border-ink md:text-2xl"
            >
              View the portfolio
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
