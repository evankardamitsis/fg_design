import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";
import {
  getCommercialProjectBySlug,
  getCommercialProjects,
} from "@/lib/commercial-projects";

export async function generateStaticParams() {
  const projects = await getCommercialProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getCommercialProjectBySlug(slug);

  if (!project) return {};

  return {
    title: `${project.title} | FG Design Partners`,
    description: project.paragraphs[0],
  };
}

export default async function CommercialProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, projects] = await Promise.all([
    getCommercialProjectBySlug(slug),
    getCommercialProjects(),
  ]);

  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Nav variant="solid" />

      <header className="px-5 py-16 md:px-10 md:py-24 lg:px-14">
        <div className="mx-auto grid min-h-[66vh] max-w-[1440px] items-end gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6 lg:pb-10">
            <p className="font-display italic text-lg text-ink/48">
              {project.index} / 02 · Commercial
            </p>
            <h1 className="mt-5 max-w-[11ch] text-[clamp(3.2rem,6.5vw,7rem)] leading-[0.94] tracking-[-0.05em]">
              {project.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink/62 md:text-lg">
              {project.role}
            </p>
          </Reveal>

          <RevealMedia className="relative aspect-[4/3] overflow-hidden lg:col-span-6">
            {project.cover ? (
              <Image
                src={project.cover.src}
                alt={project.cover.alt}
                fill
                priority
                quality={95}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between bg-ink p-7 text-cream md:p-10">
                <span className="text-xs uppercase tracking-[0.2em] text-cream/45">
                  Newcastle · High Performance
                </span>
                <div>
                  <span className="block font-display text-[clamp(5rem,12vw,10rem)] italic leading-none text-cream/14">
                    01
                  </span>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/58">
                    Project management, client brief development and design coordination.
                  </p>
                </div>
              </div>
            )}
          </RevealMedia>
        </div>
      </header>

      <section className="border-y border-ink/10 px-5 py-10 md:px-10 lg:px-14">
        <Reveal className="mx-auto grid max-w-[1440px] gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-xs text-ink/42">{fact.label}</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink/76">{fact.value}</p>
            </div>
          ))}
        </Reveal>
      </section>

      <main>
        <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7 lg:col-span-6">
              <Reveal>
                <h2 className="max-w-[13ch] text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl">
                  {project.heading}
                </h2>
              </Reveal>
              <Reveal delay={0.08} className="mt-8 max-w-xl space-y-5">
                {project.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-relaxed text-ink/68 md:text-lg">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>

            <Reveal delay={0.12} className="md:col-span-4 md:col-start-9">
              <h3 className="border-t border-ink/14 pt-5 text-sm text-ink/52">
                Facilities
              </h3>
              <ul className="mt-7 grid gap-x-6 gap-y-4 text-sm leading-relaxed text-ink/72 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {project.facilities.map((facility) => (
                  <li key={facility}>{facility}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {project.gallery.length ? (
          <section className="bg-ink px-5 py-24 text-cream md:px-10 md:py-36 lg:px-14">
            <div className="mx-auto max-w-[1440px] space-y-24 md:space-y-36">
              {project.gallery.map((image, index) => (
                <div
                  key={image.src}
                  className={`grid items-end gap-7 md:grid-cols-12 ${
                    index % 2 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <RevealMedia
                    className={`relative aspect-[7/5] overflow-hidden bg-white md:col-span-9 ${
                      index % 2 ? "md:col-start-4" : ""
                    }`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      quality={94}
                      sizes="(min-width: 768px) 75vw, 100vw"
                      className="object-cover"
                    />
                  </RevealMedia>
                  <Reveal className={index % 2 ? "md:col-span-2 md:col-start-1" : "md:col-span-2 md:col-start-11"}>
                    <p className="font-display text-2xl italic">{image.label}</p>
                  </Reveal>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="bg-ink px-5 py-24 text-cream md:px-10 md:py-36 lg:px-14">
            <div className="mx-auto max-w-[1440px]">
              <Reveal>
                <p className="text-xs uppercase tracking-[0.2em] text-cream/42">Project focus</p>
                <p className="mt-8 max-w-5xl font-display text-4xl italic leading-[1.08] tracking-[-0.025em] text-cream/88 md:text-6xl">
                  Performance, recovery and team operations brought together in one coordinated environment.
                </p>
              </Reveal>
            </div>
          </section>
        )}

        <section className="bg-ink px-5 pb-24 pt-24 text-cream md:px-10 md:pb-36 md:pt-32 lg:px-14">
          <div className="mx-auto max-w-[1440px] border-t border-cream/16 pt-10">
            <Reveal>
              <p className="text-sm text-cream/48">Continue through commercial work</p>
              <Link
                href={`/portfolio/commercial/${next.slug}`}
                className="mt-7 inline-flex items-end gap-4 font-display text-4xl leading-none tracking-[-0.035em] transition-opacity hover:opacity-70 md:text-6xl"
              >
                {next.title}
                <span aria-hidden className="font-sans text-2xl">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
