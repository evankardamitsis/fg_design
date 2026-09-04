import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { HeroHeadingSimple } from "@/components/HeroHeadingSimple";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
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
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <div className="relative flex h-[70vh] min-h-[480px] flex-col justify-end overflow-hidden">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <Nav variant="overlay" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 md:px-10">
          <HeroHeadingSimple index={project.index} title={project.title} location={project.location} postcode={project.postcode} />
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 border-b border-ink/10 pb-16 text-sm md:grid-cols-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Location</span>
              <p className="mt-2">{project.location}, {project.postcode}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Timeline</span>
              <p className="mt-2">{project.timeline}</p>
            </div>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Scope</span>
              <p className="mt-2">{project.scope}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <Eyebrow>{project.brief.eyebrow}</Eyebrow>
            <h2 className="mt-8 text-3xl leading-tight md:text-5xl">{project.brief.heading}</h2>
            {project.brief.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-6 text-base leading-relaxed text-ink/75 md:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.15}>
            <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Scope of Works</span>
            <ul className="mt-6 space-y-4">
              {project.scopeOfWorks.map((item) => (
                <li key={item} className="flex gap-4 border-b border-ink/10 pb-4 text-sm md:text-base">
                  <span className="font-display italic text-ink/40">&mdash;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink/[0.03] py-16 md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 md:px-10">
          {project.exterior ? (
            <Reveal className="relative aspect-[16/9] w-full overflow-hidden">
              <Image src={project.exterior.src} alt={project.exterior.alt} fill sizes="100vw" className="object-cover" />
            </Reveal>
          ) : null}
          {project.gallery.map((image, i) => (
            <Reveal
              key={image.src}
              className={`grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-ink/50">
                  {project.postcode} &middot; 0{i + 1}
                </span>
                <h3 className="mt-3 text-2xl md:text-3xl">{image.room}</h3>
                {image.caption ? (
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/70 md:text-base">
                    {image.caption}
                  </p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-ink/50">Next Project</span>
          <Link href={`/portfolio/${next.slug}`} className="mt-2 block text-3xl hover:opacity-70 md:text-5xl">
            {next.title} &rarr;
          </Link>
        </div>
      </Reveal>

      <Footer />
    </>
  );
}
