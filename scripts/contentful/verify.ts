/**
 * Parity check: Contentful output vs the local data files.
 *
 * Run after seeding: npx tsx --env-file=.env.local scripts/contentful/verify.ts
 * Reads the raw local lists directly; the gateways would return Contentful data.
 * Every gateway shape is compared field by field; images by file name (the CDN
 * URL differs, the file must not). Exits non-zero on any difference.
 */
import { commercialProjects } from "@/lib/commercial-projects";
import {
  fetchCommercialProjects,
  fetchCurrentProjects,
  fetchPress,
  fetchResidentialProjects,
} from "@/lib/contentful/content";
import { currentProjects } from "@/lib/current-projects";
import { press } from "@/lib/press";
import { projects } from "@/lib/projects";

const problems: string[] = [];
const file = (src?: string) => (src ? decodeURIComponent(src.split("/").pop() ?? "") : "");

function compare(scope: string, field: string, local: unknown, remote: unknown) {
  const a = JSON.stringify(local ?? null);
  const b = JSON.stringify(remote ?? null);
  if (a !== b) problems.push(`${scope} · ${field}\n    local:   ${a}\n    content: ${b}`);
}

async function main() {
  // Residential
  const remoteResidential = await fetchResidentialProjects();
  const localResidential = projects.filter((project) => project.status !== "draft");
  compare("residential", "slugs", localResidential.map((p) => p.slug).sort(), remoteResidential.map((p) => p.slug).sort());
  for (const local of localResidential) {
    const remote = remoteResidential.find((p) => p.slug === local.slug);
    if (!remote) continue;
    const scope = `residential/${local.slug}`;
    for (const key of ["title", "location", "postcode", "timeline", "scope"] as const) compare(scope, key, local[key], remote[key]);
    compare(scope, "brief.heading", local.brief.heading, remote.brief.heading);
    compare(scope, "brief.paragraphs", local.brief.paragraphs, remote.brief.paragraphs);
    compare(scope, "scopeOfWorks", local.scopeOfWorks, remote.scopeOfWorks);
    compare(scope, "cover", [file(local.cover.src), local.cover.alt], [file(remote.cover.src), remote.cover.alt]);
    compare(scope, "hero", [file(local.hero.src), local.hero.alt], [file(remote.hero.src), remote.hero.alt]);
    compare(scope, "exterior", file(local.exterior?.src), file(remote.exterior?.src));
    compare(
      scope,
      "gallery",
      local.gallery.map((g) => [file(g.src), g.room, g.caption ?? null, g.alt]),
      remote.gallery.map((g) => [file(g.src), g.room, g.caption ?? null, g.alt])
    );
  }

  // Commercial
  const localCommercial = commercialProjects;
  const remoteCommercial = await fetchCommercialProjects();
  compare("commercial", "slugs in order", localCommercial.map((p) => p.slug), remoteCommercial.map((p) => p.slug));
  for (const local of localCommercial) {
    const remote = remoteCommercial.find((p) => p.slug === local.slug);
    if (!remote) continue;
    const scope = `commercial/${local.slug}`;
    for (const key of ["index", "title", "location", "sector", "role", "heading"] as const) compare(scope, key, local[key], remote[key]);
    compare(scope, "paragraphs", local.paragraphs, remote.paragraphs);
    compare(scope, "facts", local.facts, remote.facts);
    compare(scope, "facilities", local.facilities, remote.facilities);
    compare(
      scope,
      "cover",
      local.cover && [file(local.cover.src), local.cover.alt, local.cover.label],
      remote.cover && [file(remote.cover.src), remote.cover.alt, remote.cover.label]
    );
    compare(
      scope,
      "gallery",
      local.gallery.map((g) => [file(g.src), g.label, g.alt]),
      remote.gallery.map((g) => [file(g.src), g.label, g.alt])
    );
  }

  // Currently on site
  compare("current", "all", currentProjects, await fetchCurrentProjects());

  // Press
  const remotePress = await fetchPress();
  compare(
    "press",
    "all",
    [...press].sort((a, b) => b.date.localeCompare(a.date)),
    remotePress
  );

  if (problems.length) {
    console.log(`\n${problems.length} difference(s):\n`);
    for (const problem of problems) console.log(`- ${problem}`);
    process.exit(1);
  }
  console.log(
    `Parity OK: ${remoteResidential.length} residential, ${remoteCommercial.length} commercial, press and current projects match the local data.`
  );
}

main().catch((error) => {
  console.error("verify failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
