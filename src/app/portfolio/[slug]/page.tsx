import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { HeroHeadingSimple } from "@/components/HeroHeadingSimple";
import { Nav } from "@/components/Nav";
import { ProjectSections } from "@/components/projects/ProjectSections";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";
import { getProjectBySlug, getProjects } from "@/lib/project-content";

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
  const [project, projects] = await Promise.all([
    getProjectBySlug(slug),
    getProjects(),
  ]);

  if (!project) notFound();

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
        <Reveal className="mx-auto grid max-w-[1440px] gap-7 border-b border-ink/12 pb-10 text-sm sm:grid-cols-3 md:gap-10 md:pb-12">
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
        </Reveal>
      </section>

      <main>
        <ProjectSections sections={project.sections} />

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
