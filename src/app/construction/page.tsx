import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal, StaggerReveal } from "@/components/motion/Reveal";
import { StaggerCard } from "@/components/motion/StaggerCard";
import { TextReveal } from "@/components/motion/TextReveal";
import { getConstructionPageContent } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Construction | FG Design Partners",
  description:
    "Construction delivery, specialist trade coordination and quality control by FG Design Partners.",
};

export default async function ConstructionPage() {
  const content = await getConstructionPageContent();

  return (
    <>
      <Nav variant="solid" />

      <main>
        <section className="px-5 py-20 md:px-10 md:py-28 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <Eyebrow>{content.eyebrow}</Eyebrow>
            </Reveal>
            <TextReveal
              as="h1"
              delay={0.04}
              className="mt-8 max-w-5xl text-[clamp(3.25rem,7vw,7.5rem)] leading-[0.94] tracking-[-0.05em]"
            >
              Built with control, <span className="font-display italic tracking-[-0.025em]">care and accountability.</span>
            </TextReveal>
            <Reveal delay={0.12} className="ml-auto mt-10 max-w-2xl">
              <p className="text-base leading-relaxed text-ink/68 md:text-lg">{content.intro}</p>
            </Reveal>
          </div>
        </section>

        <section className="bg-ink px-5 py-24 text-cream md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <Reveal>
              <Eyebrow tone="cream">From programme to handover</Eyebrow>
            </Reveal>
            <StaggerReveal className="mt-12 divide-y divide-cream/14 border-y border-cream/14">
              {content.phases.map((phase) => (
                <StaggerCard key={phase.index} className="grid gap-5 py-9 md:grid-cols-12 md:items-start md:gap-8 md:py-12">
                  <span className="font-display italic text-cream/42 md:col-span-1">{phase.index}</span>
                  <h2 className="text-3xl tracking-[-0.03em] md:col-span-4 md:text-5xl">
                    {phase.title}
                  </h2>
                  <p className="max-w-xl text-sm leading-relaxed text-cream/58 md:col-span-5 md:col-start-8 md:text-base">
                    {phase.description}
                  </p>
                </StaggerCard>
              ))}
            </StaggerReveal>
          </div>
        </section>

        <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <h2 className="text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl">
                One team on <span className="font-display italic">every detail.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5 md:col-start-8">
              <ul className="divide-y divide-ink/12 border-y border-ink/12">
                {content.capabilities.map((capability) => (
                  <li key={capability} className="py-4 text-sm text-ink/72 md:text-base">
                    {capability}
                  </li>
                ))}
              </ul>
              <Button href="/contact" variant="dark" className="mt-8">
                Discuss a project
              </Button>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
