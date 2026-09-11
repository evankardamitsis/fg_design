import Image from "next/image";
import type { Metadata } from "next";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";
import { getDesignPageContent } from "@/lib/service-content";

export const metadata: Metadata = {
  title: "Design | FG Design Partners",
  description:
    "Interior architecture, spatial planning, material development and design studies by FG Design Partners.",
};

export default async function DesignPage() {
  const content = await getDesignPageContent();

  return (
    <>
      <section className="relative flex min-h-[720px] h-[92dvh] flex-col justify-end overflow-hidden bg-[#f7f4ef]">
        <Image
          src={content.project.hero.src}
          alt={content.project.hero.alt}
          fill
          priority
          quality={96}
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#f7f4ef]/95 via-[#f7f4ef]/20 to-[#f7f4ef]/15" />
        <Nav />
        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 pb-14 md:px-10 md:pb-18 lg:px-14">
          <Reveal>
            <p className="font-display italic text-lg text-ink/58">{content.eyebrow}</p>
            <h1 className="mt-4 max-w-[12ch] text-[clamp(3.2rem,7vw,7.5rem)] leading-[0.92] tracking-[-0.05em] text-ink">
              Spaces conceived with <span className="font-display italic">purpose.</span>
            </h1>
          </Reveal>
        </div>
      </section>

      <main>
        <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-12 md:gap-8">
            <Reveal className="md:col-span-5">
              <Eyebrow>Interior architecture</Eyebrow>
            </Reveal>
            <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
              <p className="text-2xl leading-snug tracking-[-0.025em] text-ink/82 md:text-4xl">
                {content.intro}
              </p>
            </Reveal>
          </div>
        </section>

        <section className="bg-ink px-5 py-24 text-cream md:px-10 md:py-36 lg:px-14">
          <div className="mx-auto max-w-[1440px]">
            <Reveal className="grid gap-8 border-b border-cream/14 pb-12 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <p className="text-sm text-cream/45">Design study</p>
                <h2 className="mt-4 text-4xl tracking-[-0.035em] md:text-6xl">
                  {content.project.title}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-cream/58 md:col-span-4 md:col-start-9 md:text-base">
                {content.project.description}
              </p>
            </Reveal>

            <div className="mt-20 space-y-24 md:mt-28 md:space-y-36">
              {content.project.gallery.map((image, index) => (
                <div
                  key={image.src}
                  className={`grid items-end gap-6 md:grid-cols-12 ${
                    index % 2 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <RevealMedia
                    className={`relative aspect-[4/3] overflow-hidden bg-white md:col-span-9 ${
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
          </div>
        </section>

        <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14">
          <Reveal className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2 className="max-w-3xl text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl">
              From first study to <span className="font-display italic">resolved space.</span>
            </h2>
            <Button href="/contact" variant="dark" className="shrink-0">
              Discuss a project
            </Button>
          </Reveal>
        </section>
      </main>

      <Footer />
    </>
  );
}
