import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import type { PressItem } from "@/lib/press";

const dateFormat = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

export function PressSection({ items }: { items: PressItem[] }) {
  if (!items.length) return null;

  return (
    <section id="press" className="scroll-mt-28 border-t border-ink/12 px-5 py-24 md:px-10 md:py-36 lg:px-14">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <Eyebrow>Press</Eyebrow>
        </Reveal>
        <TextReveal
          as="h2"
          delay={0.04}
          className="mt-7 max-w-3xl text-4xl leading-[1.05] tracking-[-0.035em] md:text-6xl"
        >
          Recent <span className="font-display italic tracking-[-0.02em]">coverage.</span>
        </TextReveal>

        <ul className="mt-14 divide-y divide-ink/12 border-y border-ink/12 md:mt-20">
          {items.map((item) => (
            <li key={item.href}>
              <Reveal y={20} className="grid gap-4 py-8 md:grid-cols-[14rem_1fr_auto] md:items-baseline md:gap-10 md:py-10">
                <div>
                  <p className="font-display text-3xl italic leading-[1.1] md:text-4xl">{item.publication}</p>
                  <p className="mt-2 text-sm text-ink/48">
                    <time dateTime={item.date}>{dateFormat.format(new Date(item.date))}</time>
                    {item.language ? ` · ${item.language}` : null}
                  </p>
                </div>
                <div>
                  <p lang={item.language === "Italian" ? "it" : undefined} className="max-w-2xl text-xl leading-snug tracking-[-0.02em] md:text-2xl">
                    {item.title}
                  </p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/58">{item.summary}</p>
                </div>
                <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium md:flex-col md:items-end">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-11 items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:min-h-0"
                  >
                    Read the article
                    <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                  {item.project ? (
                    <Link
                      href={`/portfolio/${item.project}`}
                      className="group inline-flex min-h-11 items-center gap-3 text-ink/58 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink md:min-h-0"
                    >
                      View the project
                      <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  ) : null}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
