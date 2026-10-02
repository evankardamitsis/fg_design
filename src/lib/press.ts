import { contentfulEnabled, fetchPress } from "@/lib/contentful/content";

export type PressItem = {
  publication: string;
  title: string;
  summary: string;
  /** ISO date, rendered as "September 2026". */
  date: string;
  href: string;
  language?: string;
  /** Slug of the residence the piece covers; links the two both ways. */
  project?: string;
};

/**
 * Press coverage, newest first. Contentful when configured, otherwise this
 * local list; the Press section only consumes getPress().
 */
export const press: PressItem[] = [
  {
    publication: "AD Italia",
    title: "Il pied-à-terre a Londra di una interior designer, costruito attorno ad affetti e passioni",
    summary: "18 Stanhope Terrace, a pied-à-terre in a Victorian building overlooking Hyde Park.",
    date: "2026-09-11",
    href: "https://www.ad-italia.it/article/pied-a-terre-londra-pezzi-vintage-italiani-arredi-iran-minimalismo-contemporaneo/",
    language: "Italian",
    project: "stanhope-terrace",
  },
];

export async function getPress(): Promise<PressItem[]> {
  const items = contentfulEnabled() ? await fetchPress() : press;
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPressForProject(slug: string): Promise<PressItem[]> {
  return (await getPress()).filter((item) => item.project === slug);
}
