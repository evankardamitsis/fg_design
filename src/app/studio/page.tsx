import Image from "next/image";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Studio | FG Design Partners",
  description:
    "Founded in 2016 by Fardad Ghodoussi, FG Design Partners is an in-house design and build studio serving London's most distinguished homes.",
};

export default function StudioPage() {
  return (
    <>
      <Nav variant="solid" />

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <Reveal>
          <Eyebrow>The Practice.</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 max-w-3xl text-4xl leading-tight md:text-6xl">
            One studio, one standard, from concept to completion.
          </h1>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <RevealMedia className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/projects/chelsea-house/04-drawing-room.jpg"
              alt="A refined drawing room at Chelsea House"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </RevealMedia>
          <Reveal delay={0.15} className="flex flex-col justify-center gap-6">
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">
              FG Design was founded in 2016 by Fardad Ghodoussi, following a
              fifteen-year tenure at a distinguished design-and-build practice
              specialising in high-end residential, hotel, and commercial work.
            </p>
            <p className="text-base leading-relaxed text-ink/75 md:text-lg">
              We deliver a comprehensive turnkey service — every phase from initial
              design through construction to final completion, held to a single
              standard. With our in-house specialist team we retain full control of
              each project, guaranteeing delivery on time and on budget.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <dl className="mt-20 grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 sm:grid-cols-3">
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">Established</dt>
              <dd className="mt-2 text-4xl font-display italic">2016</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">No. of Projects</dt>
              <dd className="mt-2 text-4xl font-display italic">12+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-ink/50">Specialist Team</dt>
              <dd className="mt-2 text-4xl font-display italic">In-house</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
