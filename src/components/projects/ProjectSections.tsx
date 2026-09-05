import Image from "next/image";
import { Reveal, RevealMedia } from "@/components/motion/Reveal";
import type {
  ProjectMediaItem,
  ProjectPageSection,
} from "@/lib/project-content";

function MediaDetails({ image }: { image: ProjectMediaItem }) {
  return (
    <Reveal className="mt-5 max-w-md">
      <h3 className="text-xl tracking-[-0.02em] text-cream md:text-2xl">
        {image.room}
      </h3>
      {image.caption ? (
        <p className="mt-3 text-sm leading-relaxed text-cream/58 md:text-base">
          {image.caption}
        </p>
      ) : null}
    </Reveal>
  );
}

function OverviewSection({
  section,
}: {
  section: Extract<ProjectPageSection, { type: "overview" }>;
}) {
  return (
    <section className="px-5 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 lg:col-span-6">
          <Reveal>
            <h2 className="max-w-[12ch] font-display text-4xl leading-[1.04] tracking-[-0.035em] md:text-6xl">
              {section.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-8 max-w-xl space-y-5">
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-ink/68 md:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal
          delay={0.12}
          className="md:col-span-4 md:col-start-9 lg:col-span-4 lg:col-start-9"
        >
          <h3 className="border-t border-ink/14 pt-5 text-sm text-ink/52">
            Scope of work
          </h3>
          <ul className="mt-7 grid gap-x-6 gap-y-5 text-sm leading-relaxed text-ink/72 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {section.scopeOfWorks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FullImageSection({
  section,
}: {
  section: Extract<ProjectPageSection, { type: "full-image" }>;
}) {
  const isPortrait = section.image.orientation === "portrait";

  return (
    <section className="bg-ink px-5 pt-24 text-cream md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <RevealMedia
          className={`relative overflow-hidden ${
            isPortrait
              ? "ml-auto aspect-[3/4] w-full max-w-[760px]"
              : "aspect-[3/2] w-full"
          }`}
        >
          <Image
            src={section.image.src}
            alt={section.image.alt}
            fill
            quality={95}
            sizes={isPortrait ? "(min-width: 1024px) 760px, 100vw" : "100vw"}
            className="object-cover"
          />
        </RevealMedia>
        <MediaDetails image={section.image} />
      </div>
    </section>
  );
}

function FeatureImageSection({
  section,
}: {
  section: Extract<ProjectPageSection, { type: "feature-image" }>;
}) {
  const isPortrait = section.image.orientation === "portrait";
  const imageClass = isPortrait
    ? "md:col-span-5 lg:col-span-5"
    : "md:col-span-8 lg:col-span-8";
  const isRight = section.alignment === "right";

  return (
    <section className="bg-ink px-5 pt-24 text-cream md:px-10 md:pt-36 lg:px-14">
      <div
        className={`mx-auto grid max-w-[1440px] items-end gap-8 md:grid-cols-12 ${
          isRight ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <RevealMedia
          className={`relative overflow-hidden ${imageClass} ${
            isPortrait ? "aspect-[3/4]" : "aspect-[3/2]"
          } ${isRight ? "md:col-start-7 lg:col-start-7" : ""}`}
        >
          <Image
            src={section.image.src}
            alt={section.image.alt}
            fill
            quality={95}
            sizes={isPortrait ? "(min-width: 768px) 42vw, 100vw" : "(min-width: 768px) 66vw, 100vw"}
            className="object-cover"
          />
        </RevealMedia>
        <div
          className={`${
            isRight
              ? "md:col-span-4 md:col-start-1"
              : "md:col-span-3 md:col-start-10"
          }`}
        >
          <MediaDetails image={section.image} />
        </div>
      </div>
    </section>
  );
}

function ImagePairSection({
  section,
}: {
  section: Extract<ProjectPageSection, { type: "image-pair" }>;
}) {
  return (
    <section className="bg-ink px-5 pt-24 text-cream md:px-10 md:pt-36 lg:px-14">
      <div className="mx-auto grid max-w-[1440px] gap-16 md:grid-cols-2 md:items-start md:gap-5">
        {section.images.map((image, index) => (
          <div key={image.src} className={index === 1 ? "md:mt-24" : ""}>
            <RevealMedia
              className={`relative overflow-hidden ${
                image.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[3/2]"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                quality={90}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </RevealMedia>
            <MediaDetails image={image} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectSections({ sections }: { sections: ProjectPageSection[] }) {
  return (
    <>
      {sections.map((section) => {
        switch (section.type) {
          case "overview":
            return <OverviewSection key={section.id} section={section} />;
          case "full-image":
            return <FullImageSection key={section.id} section={section} />;
          case "feature-image":
            return <FeatureImageSection key={section.id} section={section} />;
          case "image-pair":
            return <ImagePairSection key={section.id} section={section} />;
        }
      })}
    </>
  );
}
