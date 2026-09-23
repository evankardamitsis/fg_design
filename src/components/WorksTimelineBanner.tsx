import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { Project } from "@/lib/projects";
import type { WorksStage } from "@/lib/works-timeline";

/**
 * Homepage teaser for a project's start-to-finish timeline: a mid-construction
 * stage beside the finished room. The site shot sells the build far better
 * than the dated "as found" photo would.
 */
export function WorksTimelineBanner({ project, stages }: { project: Project; stages: WorksStage[] }) {
  const first = stages.find((stage) => stage.phase === "Structure") ?? stages[0];
  const final = stages[stages.length - 1];
  const [startDate, endDate] = project.timeline.split(" - ");
  const href = `/portfolio/${project.slug}#start-to-finish`;

  const frames = [
    { stage: first, label: "On site", date: startDate },
    { stage: final, label: "Completed", date: endDate },
  ];

  return (
    <section className="bg-ink px-5 py-24 text-cream md:px-10 md:py-32 lg:px-14">
      <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-12 md:items-center md:gap-8">
        <Link
          href={href}
          aria-label={`Watch ${project.title} from start to finish`}
          className="group grid grid-cols-2 gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream md:col-span-7 lg:col-span-6"
        >
          {frames.map(({ stage, label, date }, position) => (
            <RevealMedia key={stage.image} delay={position * 0.08} className="relative aspect-[3/4] overflow-hidden bg-black">
              <Image
                src={stage.image}
                alt={`${project.title}: ${stage.name.toLowerCase()}`}
                fill
                quality={90}
                sizes="(min-width: 1024px) 24vw, (min-width: 768px) 28vw, 50vw"
                className="object-cover object-[center_42%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none group-hover:scale-[1.02]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-2 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10 text-xs">
                <span className="font-display text-base italic">{label}</span>
                <span className="text-cream/70">{date}</span>
              </span>
            </RevealMedia>
          ))}
        </Link>

        <div className="md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
          <Reveal>
            <Eyebrow tone="cream">Start to finish</Eyebrow>
          </Reveal>
          <TextReveal
            as="h2"
            delay={0.04}
            className="mt-7 text-4xl leading-[1.05] tracking-[-0.035em] md:text-5xl lg:text-6xl"
          >
            Watch a home <span className="font-display italic tracking-[-0.02em]">take shape.</span>
          </TextReveal>
          <Reveal delay={0.08} className="mt-6 max-w-md">
            <p className="text-base leading-relaxed text-cream/68 md:text-lg">
              {project.title}, {project.location}: {stages.length} photographs from one viewpoint, from strip-out and steelwork to the finished room.
            </p>
            <Button href={href} variant="solid" className="mt-8">
              Watch the timeline
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
