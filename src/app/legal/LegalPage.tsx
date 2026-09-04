import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";

export type LegalSection = { heading: string; body: string[] };

/**
 * Shared shell for the legal pages.
 *
 * The section structure below is correct for a UK/GDPR site, but the wording is
 * scaffolding only — it has not been through legal review. The `pending` notice
 * is deliberate: it makes it impossible to publish placeholder policy text by
 * accident. Remove it once FG Design supplies the approved copy.
 */
export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
  pending = true,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
  pending?: boolean;
}) {
  return (
    <>
      <Nav variant="solid" />

      <section className="mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-8 text-4xl leading-tight md:text-6xl">{title}</h1>
          <p className="mt-4 text-sm text-ink/50">Last updated: {updated}</p>
        </Reveal>

        {pending ? (
          <Reveal delay={0.15}>
            <p className="mt-10 border border-ink/20 bg-ink/[0.03] p-5 text-sm leading-relaxed text-ink/70">
              <strong className="font-medium text-ink">Draft — not yet legally reviewed.</strong>{" "}
              The sections below outline what this policy needs to cover. The final
              wording should be supplied or approved by FG Design&apos;s legal adviser
              before launch.
            </p>
          </Reveal>
        ) : null}

        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="text-xl md:text-2xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-sm leading-relaxed text-ink/75 md:text-base"
                >
                  {paragraph}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
