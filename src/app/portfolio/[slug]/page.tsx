import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HeroHeadingSimple } from "@/components/HeroHeadingSimple";
import { Nav } from "@/components/Nav";
import { ProjectSections } from "@/components/projects/ProjectSections";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/Eyebrow";
import { TextReveal } from "@/components/motion/TextReveal";
import { WorksTimeline } from "@/components/WorksTimeline";
import { getProjectBySlug, getProjects } from "@/lib/project-content";
import { getPressForProject } from "@/lib/press";
import { getWorksTimeline } from "@/lib/works-timeline";

const pressDate = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} | FG Design Partners`,
    description: project.brief.paragraphs[0],
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, projects, press, worksTimeline] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
    getPressForProject(slug),
    getWorksTimeline(slug),
  ]);

  if (!project) notFound();

  const [overview, ...mediaSections] = project.sections;
  const [startDate, endDate] = project.timeline.split(" - ");

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <div className="relative flex min-h-[560px] h-[86dvh] flex-col justify-end overflow-hidden bg-ink">
        <Image
          src={project.hero.src}
          alt={project.hero.alt}
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/82 via-ink/12 to-ink/18" />
        <Nav variant="overlay" />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-12 md:px-10 md:pb-16 lg:px-14">
          <HeroHeadingSimple
            index={project.index}
            title={project.title}
            location={project.location}
            postcode={project.postcode}
          />
        </div>
      </div>

      <section className="px-5 py-10 md:px-10 md:py-12 lg:px-14">
        <Reveal
          className={`mx-auto grid max-w-[1440px] gap-7 border-b border-ink/12 pb-10 text-sm md:gap-10 md:pb-12 ${
            press.length ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-3"
          }`}
        >
          <div>
            <p className="text-ink/46">Location</p>
            <p className="mt-2 text-ink/78">
              {project.location}, {project.postcode}
            </p>
          </div>
          <div>
            <p className="text-ink/46">Timeline</p>
            <p className="mt-2 text-ink/78">{project.timeline}</p>
          </div>
          <div>
            <p className="text-ink/46">Residence</p>
            <p className="mt-2 text-ink/78">{project.scope}</p>
          </div>
          {press.map((item) => (
            <div key={item.href}>
              <p className="text-ink/46">Featured in</p>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-2 block text-ink/78 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <span className="whitespace-nowrap font-display text-lg italic leading-none text-ink">{item.publication}</span>
                , {pressDate.format(new Date(item.date))}{" "}
                <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          ))}
        </Reveal>
      </section>

      <main>
        <ProjectSections sections={[overview]} />

        {worksTimeline ? (
          <section id="start-to-finish" className="scroll-mt-24 px-5 pb-24 md:px-10 md:pb-36 lg:px-14">
            <div className="mx-auto max-w-[1440px] border-t border-ink/12 pt-20 md:pt-28">
              <Reveal>
                <Eyebrow>{worksTimeline.eyebrow}</Eyebrow>
              </Reveal>
              <TextReveal
                as="h2"
                delay={0.04}
                className="mt-7 max-w-3xl text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl"
              >
                {worksTimeline.heading[0]}{" "}
                <span className="font-display italic tracking-[-0.02em]">{worksTimeline.heading[1]}</span>
              </TextReveal>
              <Reveal delay={0.08} className="mt-6 max-w-2xl">
                <p className="text-base leading-relaxed text-ink/68 md:text-lg">
                  {worksTimeline.intro.replace("{start}", startDate).replace("{end}", endDate)}
                </p>
              </Reveal>
              <Reveal delay={0.12} className="mt-14 md:mt-20">
                <WorksTimeline
                  stages={worksTimeline.stages}
                  title={`${project.title}, ${project.location}`}
                  startLabel={startDate}
                  endLabel={endDate}
                />
              </Reveal>
            </div>
          </section>
        ) : null}

        <ProjectSections sections={mediaSections} />

        <section className="bg-ink px-5 pb-24 pt-32 text-cream md:px-10 md:pb-36 md:pt-44 lg:px-14">
          <div className="mx-auto max-w-[1440px] border-t border-cream/16 pt-10">
            <Reveal>
              <p className="text-sm text-cream/48">Continue to the next residence</p>
            </Reveal>
            <div className="mt-8 grid items-end gap-10 md:grid-cols-12">
              <Reveal className="md:col-span-7">
                <Link
                  href={`/portfolio/${next.slug}`}
                  className="group inline-flex items-end gap-5 font-display text-4xl leading-none tracking-[-0.035em] transition-opacity hover:opacity-70 md:text-6xl lg:text-7xl"
                >
                  {next.title}
                  <span
                    aria-hidden
                    className="mb-1 inline-block font-sans text-2xl transition-transform duration-300 group-hover:translate-x-1 md:mb-2"
                  >
                    →
                  </span>
                </Link>
                <p className="mt-4 text-sm text-cream/48">
                  {next.location}, {next.postcode}
                </p>
              </Reveal>
              <RevealMedia className="relative aspect-[3/2] overflow-hidden md:col-span-4 md:col-start-9">
                <Image
                  src={next.hero.src}
                  alt={next.hero.alt}
                  fill
                  sizes="(min-width: 768px) 34vw, 100vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                />
              </RevealMedia>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
