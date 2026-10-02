import { createClient, type Asset, type Entry } from "contentful";
import type { CommercialProject, CommercialProjectImage } from "@/lib/commercial-projects";
import type { CurrentProject } from "@/lib/current-projects";
import type { PressItem } from "@/lib/press";
import type { Project, ProjectImage } from "@/lib/projects";

/**
 * Contentful delivery layer. Maps published entries onto the exact shapes the
 * local data files use, so the gateways can swap source without the UI
 * noticing. Field ids come from scripts/contentful/model.ts.
 *
 * Only used when the delivery env vars are present; otherwise the gateways keep
 * reading the local files (handy for local work without credentials). Those
 * files are a frozen snapshot: Contentful is the source of truth.
 */

const env = (name: string) => process.env[name]?.trim() || undefined;

export function contentfulEnabled() {
  const configured = Boolean(env("CONTENTFUL_SPACE_ID") && env("CONTENTFUL_DELIVERY_TOKEN"));
  // Production must never fall back to the local snapshot: it would rebuild with
  // stale data and silently hide every edit made in Contentful. A failed build
  // keeps the current deployment live instead.
  if (!configured && process.env.VERCEL_ENV === "production") {
    throw new Error("Contentful env vars missing in production (CONTENTFUL_SPACE_ID / CONTENTFUL_DELIVERY_TOKEN).");
  }
  return configured;
}

let client: ReturnType<typeof createClient> | null = null;

function getClient() {
  if (!client) {
    client = createClient({
      space: env("CONTENTFUL_SPACE_ID")!,
      environment: env("CONTENTFUL_ENVIRONMENT") ?? "master",
      accessToken: env("CONTENTFUL_DELIVERY_TOKEN")!,
    });
  }
  // Unpublished or deleted links are dropped rather than surfacing as broken objects.
  return client.withoutUnresolvableLinks;
}

/* ---------- field access ---------- */

type Fields = Record<string, unknown>;

const fieldsOf = (entry: unknown): Fields => ((entry as { fields?: Fields } | undefined)?.fields ?? {});
const text = (fields: Fields, id: string) => (typeof fields[id] === "string" ? (fields[id] as string).trim() : "");
const list = (fields: Fields, id: string) =>
  Array.isArray(fields[id]) ? (fields[id] as unknown[]).filter((item): item is string => typeof item === "string") : [];

function image(asset: unknown, fallbackAlt: string): ProjectImage | undefined {
  const file = (asset as Asset | undefined)?.fields?.file as
    | { url?: string; details?: { image?: { width: number; height: number } } }
    | undefined;
  if (!file?.url) return undefined;
  const assetFields = fieldsOf(asset);
  const dimensions = file.details?.image;
  return {
    src: file.url.startsWith("//") ? `https:${file.url}` : file.url,
    // The asset Description is the alt text; Title is the fallback.
    alt: text(assetFields, "description") || text(assetFields, "title") || fallbackAlt,
    width: dimensions?.width,
    height: dimensions?.height,
  };
}

const paragraphs = (value: string) =>
  value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
    .filter(Boolean);

const monthYear = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });
const formatMonth = (value: string) => (value ? monthYear.format(new Date(value)) : "");

/** Same "Month YYYY - Month YYYY" string the local data uses, so ordering and display logic is shared. */
function timeline(fields: Fields) {
  const start = formatMonth(text(fields, "startDate"));
  const end = formatMonth(text(fields, "endDate"));
  return start && end ? `${start} - ${end}` : start || end;
}

/* ---------- queries ---------- */

async function projectEntries(category: "Residential" | "Commercial") {
  const response = await getClient().getEntries({
    content_type: "project",
    "fields.category": category,
    include: 2,
    limit: 200,
    order: ["sys.createdAt"],
  } as Parameters<ReturnType<typeof getClient>["getEntries"]>[0]);
  return response.items as Entry[];
}

function galleryItems(fields: Fields) {
  const items = Array.isArray(fields.gallery) ? fields.gallery : [];
  return items.flatMap((item) => {
    const itemFields = fieldsOf(item);
    const alt = text(itemFields, "alt");
    const media = image(itemFields.image, alt);
    if (!media) return [];
    return [{ ...media, alt: alt || media.alt, room: text(itemFields, "room"), caption: text(itemFields, "caption") || undefined }];
  });
}

export async function fetchResidentialProjects(): Promise<Project[]> {
  const entries = await projectEntries("Residential");
  return entries.flatMap((entry) => {
    const fields = fieldsOf(entry);
    const title = text(fields, "title");
    const cover = image(fields.cover, title);
    if (!cover) return [];
    return [
      {
        slug: text(fields, "slug"),
        title,
        location: text(fields, "location"),
        postcode: text(fields, "postcode"),
        timeline: timeline(fields),
        scope: text(fields, "scope"),
        // Display order and numbering are derived in the gateway.
        index: "",
        brief: { eyebrow: "Project Brief", heading: text(fields, "briefHeading"), paragraphs: paragraphs(text(fields, "brief")) },
        scopeOfWorks: list(fields, "scopeOfWorks"),
        cover,
        hero: image(fields.hero, title) ?? cover,
        exterior: image(fields.exterior, title),
        gallery: galleryItems(fields),
      },
    ];
  });
}

export async function fetchCommercialProjects(): Promise<CommercialProject[]> {
  const entries = await projectEntries("Commercial");
  const mapped = entries.map((entry) => {
    const fields = fieldsOf(entry);
    const title = text(fields, "title");
    const cover = image(fields.cover, title);
    return {
      completed: text(fields, "endDate"),
      project: {
        slug: text(fields, "slug"),
        index: "",
        title,
        location: text(fields, "location"),
        sector: text(fields, "sector"),
        role: text(fields, "role"),
        heading: text(fields, "briefHeading"),
        paragraphs: paragraphs(text(fields, "brief")),
        facts: list(fields, "facts").map((fact) => {
          const split = fact.indexOf(":");
          return split === -1
            ? { label: fact, value: "" }
            : { label: fact.slice(0, split).trim(), value: fact.slice(split + 1).trim() };
        }),
        facilities: list(fields, "scopeOfWorks"),
        cover: cover ? { src: cover.src, alt: cover.alt, label: text(fields, "coverLabel") } : undefined,
        gallery: galleryItems(fields).map<CommercialProjectImage>((item) => ({ src: item.src, alt: item.alt, label: item.room })),
      } satisfies CommercialProject,
    };
  });

  // Dated projects newest first, then undated ones in the order they were created.
  return mapped
    .map((item, position) => ({ ...item, position }))
    .sort((a, b) => {
      if (a.completed && b.completed) return b.completed.localeCompare(a.completed);
      if (a.completed || b.completed) return a.completed ? -1 : 1;
      return a.position - b.position;
    })
    .map(({ project }, position) => ({ ...project, index: String(position + 1).padStart(2, "0") }));
}

export async function fetchCurrentProjects(): Promise<CurrentProject[]> {
  const response = await getClient().getEntries({
    content_type: "currentProject",
    order: ["fields.order", "sys.createdAt"],
    limit: 100,
  } as Parameters<ReturnType<typeof getClient>["getEntries"]>[0]);
  return response.items.map((entry, position) => {
    const fields = fieldsOf(entry);
    return {
      index: String(position + 1).padStart(2, "0"),
      title: text(fields, "title"),
      location: text(fields, "location"),
      postcode: text(fields, "postcode"),
      stage: text(fields, "stage"),
    };
  });
}

export async function fetchPress(): Promise<PressItem[]> {
  const response = await getClient().getEntries({
    content_type: "pressItem",
    include: 1,
    order: ["-fields.date"],
    limit: 100,
  } as Parameters<ReturnType<typeof getClient>["getEntries"]>[0]);
  return response.items.map((entry) => {
    const fields = fieldsOf(entry);
    const projectSlug = text(fieldsOf(fields.project), "slug");
    return {
      publication: text(fields, "publication"),
      title: text(fields, "title"),
      summary: text(fields, "summary"),
      date: text(fields, "date").slice(0, 10),
      href: text(fields, "url"),
      language: text(fields, "language") || undefined,
      project: projectSlug || undefined,
    };
  });
}
