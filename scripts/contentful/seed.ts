/* eslint-disable @typescript-eslint/no-explicit-any -- contentful-management's plain-client payload types
   don't accept the partial shapes this one-off migration builds; casts are confined to SDK calls. */
/**
 * Idempotent Contentful seed: migrates local project / press data into the
 * content model in ./model.ts.
 *
 *   npx tsx --env-file=.env.local scripts/contentful/seed.ts [--dry-run] [--types-only] [--overwrite]
 *
 * --dry-run     fully offline: builds + validates every payload, prints a summary.
 * --types-only  only content types + editor interfaces.
 * --overwrite   reset existing entries/assets to the local data. Off by default: once
 *               Fardad edits content in Contentful, a re-run must not undo his changes.
 */
import { createHash } from "node:crypto";
import { basename, extname } from "node:path";
import type { PlainClientAPI } from "contentful-management";
import { projects as localProjects } from "@/lib/projects";
// Raw local arrays on purpose: the get*() gateways read from Contentful when env vars are set.
import { commercialProjects } from "@/lib/commercial-projects";
import { currentProjects } from "@/lib/current-projects";
import { press as localPress } from "@/lib/press";
import { contentTypes, type ContentTypeDef, type FieldDef } from "./model";
import { isStatus, makeClient, pace, sleep, withRetry } from "./lib";

const SITE = "https://fgdesign-weld.vercel.app";
const args = new Set(process.argv.slice(2));
const DRY = args.has("--dry-run");
const TYPES_ONLY = args.has("--types-only");
const CREATE_ONLY = !args.has("--overwrite");

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MIME: Record<string, string> = {
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp", ".avif": "image/avif",
};

// ---------------------------------------------------------------- build payloads

type Fields = Record<string, unknown>; // unlocalised values; localised at write time
type EntryPlan = { typeId: string; id: string; fields: Fields };
type AssetPlan = { id: string; src: string; title: string; description: string; fileName: string; contentType: string; url: string };

const problems: string[] = [];
const problem = (m: string) => problems.push(m);

const trunc = (s: string, n = 255) => (s.length > n ? s.slice(0, n - 1) + "…" : s);

function slugify(s: string) {
  return s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function parseMonth(s: string, ctx: string): string {
  const m = s.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  const mi = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
  if (!m || mi < 0) throw new Error(`Unparseable date "${s}" (${ctx})`);
  return `${m[2]}-${String(mi + 1).padStart(2, "0")}-01`;
}

function parseTimeline(t: string, ctx: string) {
  const parts = t.split(/\s+[-–—]\s+/);
  if (parts.length !== 2) throw new Error(`Unparseable timeline "${t}" (${ctx})`);
  return { startDate: parseMonth(parts[0], ctx), endDate: parseMonth(parts[1], ctx) };
}

function assetId(src: string) {
  const clean = "img-" + src.replace(/^\/+/, "").replace(/[^A-Za-z0-9\-_.]/g, "-");
  if (clean.length <= 64) return clean;
  const h = createHash("sha1").update(src).digest("hex").slice(0, 10);
  return clean.slice(0, 64 - 11) + "-" + h;
}

const assets = new Map<string, AssetPlan>();
/**
 * One asset per file. The asset Description is the alt text the site uses for
 * cover/hero/exterior images (gallery items carry their own alt), so when a file
 * is used both ways the cover/hero wording wins.
 */
function registerAsset(img: { src: string; alt: string }, primary = false): string {
  const id = assetId(img.src);
  const seenSrc = assets.get(id);
  if (seenSrc && seenSrc.src !== img.src) problem(`asset id collision: ${img.src} vs ${seenSrc.src}`);
  if (seenSrc && primary && img.alt) {
    seenSrc.title = trunc(img.alt);
    seenSrc.description = img.alt;
  }
  if (!seenSrc) {
    const ext = extname(img.src).toLowerCase();
    const contentType = MIME[ext];
    if (!contentType) problem(`asset ${img.src}: unsupported extension "${ext}"`);
    if (!img.alt) problem(`asset ${img.src}: missing alt text`);
    assets.set(id, {
      id, src: img.src, title: trunc(img.alt || basename(img.src)), description: img.alt || basename(img.src),
      fileName: basename(img.src), contentType: contentType ?? "application/octet-stream", url: SITE + encodeURI(img.src),
    });
  }
  return id;
}

async function build() {
  const gallery: EntryPlan[] = [];
  const proj: EntryPlan[] = [];
  const projectIds = new Map<string, string>();

  const addGallery = (slug: string, items: { src: string; alt: string; room: string; caption?: string }[]) =>
    items.map((g, i) => {
      const id = `gallery-${slug}-${String(i + 1).padStart(2, "0")}`;
      gallery.push({
        typeId: "galleryImage", id,
        fields: { room: g.room, image: { asset: registerAsset(g) }, caption: g.caption, alt: g.alt },
      });
      return id;
    });

  for (const p of localProjects) {
    if (p.status === "draft") continue;
    const tl = parseTimeline(p.timeline, p.slug);
    const gal = addGallery(p.slug, p.gallery.map((g) => ({ ...g })));
    projectIds.set(p.slug, `project-${p.slug}`);
    proj.push({
      typeId: "project", id: `project-${p.slug}`,
      fields: {
        title: p.title, slug: p.slug, category: "Residential", location: p.location, postcode: p.postcode,
        ...tl, scope: p.scope, briefHeading: p.brief.heading, brief: p.brief.paragraphs.join("\n\n"),
        scopeOfWorks: p.scopeOfWorks,
        cover: { asset: registerAsset(p.cover, true) }, hero: p.hero && { asset: registerAsset(p.hero, true) },
        exterior: p.exterior && { asset: registerAsset(p.exterior, true) },
        gallery: gal.map((id) => ({ entry: id })),
      },
    });
  }

  for (const c of commercialProjects) {
    const gal = addGallery(c.slug, c.gallery.map((g) => ({ src: g.src, alt: g.alt, room: g.label })));
    const coverSrc = c.cover ?? c.gallery[0];
    if (!c.cover) console.log(`note: ${c.slug} has no cover; using first gallery image`);
    projectIds.set(c.slug, `project-${c.slug}`);
    proj.push({
      typeId: "project", id: `project-${c.slug}`,
      fields: {
        title: c.title, slug: c.slug, category: "Commercial", location: c.location, sector: c.sector, role: c.role,
        briefHeading: c.heading, brief: c.paragraphs.join("\n\n"),
        facts: c.facts.map((f) => `${f.label}: ${f.value}`), scopeOfWorks: c.facilities,
        cover: coverSrc && { asset: registerAsset(coverSrc, true) }, coverLabel: coverSrc?.label,
        gallery: gal.map((id) => ({ entry: id })),
      },
    });
  }

  const current: EntryPlan[] = currentProjects.map((c) => ({
    typeId: "currentProject", id: `current-${c.index}`,
    fields: { title: c.title, location: c.location, postcode: c.postcode, stage: c.stage, order: Number(c.index) },
  }));

  const press: EntryPlan[] = [...localPress].sort((a, b) => b.date.localeCompare(a.date)).map((p) => {
    let project: unknown;
    if (p.project) {
      const pid = projectIds.get(p.project);
      if (!pid) problem(`press "${p.title}": project slug "${p.project}" not found`);
      else project = { entry: pid };
    }
    return {
      typeId: "pressItem", id: `press-${p.date}-${slugify(p.publication)}`,
      fields: { publication: p.publication, title: p.title, summary: p.summary, date: p.date, url: p.href, language: p.language, project },
    };
  });

  return { entries: [...gallery, ...proj, ...current, ...press], gallery, proj, current, press };
}

// ---------------------------------------------------------------- validation (against model.ts)

const ID_RE = /^[A-Za-z0-9\-_.]{1,64}$/;

function validate(entries: EntryPlan[]) {
  const seen = new Set<string>();
  const slugs = new Set<string>();
  const assetIds = new Set(assets.keys());
  const entryIds = new Set(entries.map((e) => e.id));
  for (const a of assets.values()) if (!ID_RE.test(a.id)) problem(`asset id invalid: ${a.id}`);

  const checkValue = (e: EntryPlan, f: FieldDef, v: unknown) => {
    const at = `${e.id}.${f.id}`;
    const link = (x: unknown, lt: string) => {
      const o = x as { asset?: string; entry?: string };
      const target = lt === "Asset" ? o?.asset : o?.entry;
      if (typeof target !== "string") return problem(`${at}: malformed ${lt} link`);
      if (lt === "Asset" && !assetIds.has(target)) problem(`${at}: unknown asset ${target}`);
      if (lt === "Entry" && !entryIds.has(target)) problem(`${at}: unknown entry ${target}`);
    };
    switch (f.type) {
      case "Symbol": case "Text":
        if (typeof v !== "string") return problem(`${at}: expected string`);
        if (f.type === "Symbol" && v.length > 255) problem(`${at}: Symbol > 255 chars (${v.length})`);
        if (f.type === "Text" && v.length > 50000) problem(`${at}: Text too long`);
        break;
      case "Integer": if (!Number.isInteger(v)) problem(`${at}: expected integer`); break;
      case "Boolean": if (typeof v !== "boolean") problem(`${at}: expected boolean`); break;
      case "Date": if (typeof v !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(v)) problem(`${at}: bad date "${String(v)}"`); break;
      case "Link": link(v, f.linkType!); break;
      case "Array":
        if (!Array.isArray(v)) return problem(`${at}: expected array`);
        v.forEach((x) => {
          if (f.items?.type === "Symbol") {
            if (typeof x !== "string") problem(`${at}: item not a string`);
            else if (x.length > 255) problem(`${at}: item > 255 chars`);
          } else link(x, f.items?.linkType ?? "Entry");
        });
        break;
    }
    for (const val of f.validations ?? []) {
      if (Array.isArray(val.in) && !val.in.includes(v as never)) problem(`${at}: "${String(v)}" not in allowed values`);
      const re = (val.regexp as { pattern?: string } | undefined)?.pattern;
      if (re && typeof v === "string" && !new RegExp(re).test(v)) problem(`${at}: "${v}" fails pattern ${re}`);
    }
  };

  for (const e of entries) {
    if (!ID_RE.test(e.id)) problem(`entry id invalid: ${e.id}`);
    if (seen.has(e.id)) problem(`duplicate entry id ${e.id}`);
    seen.add(e.id);
    const ct = contentTypes.find((c) => c.id === e.typeId);
    if (!ct) { problem(`${e.id}: unknown content type ${e.typeId}`); continue; }
    for (const k of Object.keys(e.fields)) if (!ct.fields.some((f) => f.id === k)) problem(`${e.id}: field "${k}" not in model`);
    for (const f of ct.fields) {
      const v = e.fields[f.id];
      const empty = v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);
      if (empty) { if (f.required) problem(`${e.id}: required field "${f.id}" missing`); continue; }
      checkValue(e, f, v);
    }
    if (e.typeId === "project") {
      const s = String(e.fields.slug);
      if (slugs.has(s)) problem(`duplicate project slug ${s}`);
      slugs.add(s);
    }
  }
}

// ---------------------------------------------------------------- Contentful writes

type AnyObj = Record<string, any>;
/** Key-order-insensitive: Contentful returns fields in model order, payloads may differ. */
const stable = (value: unknown): unknown =>
  Array.isArray(value)
    ? value.map(stable)
    : value && typeof value === "object"
      ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable((value as AnyObj)[key])]))
      : value;
const sameJson = (a: unknown, b: unknown) => JSON.stringify(stable(a)) === JSON.stringify(stable(b));
const isPublishedClean = (sys: AnyObj) => !!sys.publishedVersion && sys.version === sys.publishedVersion + 1;
const log = (m: string) => console.log(m);

function ctPayload(ct: ContentTypeDef) {
  return {
    name: ct.name,
    description: ct.description,
    displayField: ct.displayField,
    fields: ct.fields.map((f) => ({
      id: f.id, name: f.name, type: f.type, required: !!f.required, localized: false,
      ...(f.linkType ? { linkType: f.linkType } : {}),
      ...(f.items ? { items: f.items } : {}),
      ...(f.validations ? { validations: f.validations } : {}),
    })),
  };
}

async function syncContentTypes(client: PlainClientAPI) {
  for (const ct of contentTypes) {
    await pace();
    const payload = ctPayload(ct) as any;
    let existing: AnyObj | null = null;
    try { existing = await withRetry(() => client.contentType.get({ contentTypeId: ct.id }), `get ${ct.id}`); }
    catch (e) { if (!isStatus(e, 404)) throw e; }
    let saved: AnyObj;
    if (!existing) {
      saved = await withRetry(() => client.contentType.createWithId({ contentTypeId: ct.id }, payload), `create ${ct.id}`);
      log(`content type ${ct.id}: created`);
    } else {
      saved = await withRetry(
        () => client.contentType.update({ contentTypeId: ct.id }, { ...existing!, ...payload, sys: existing!.sys } as any),
        `update ${ct.id}`,
      );
      log(`content type ${ct.id}: updated`);
    }
    await pace();
    await withRetry(() => client.contentType.publish({ contentTypeId: ct.id }, saved as any), `publish ${ct.id}`);
  }
  for (const ct of contentTypes) {
    await pace();
    const ei: AnyObj = await withRetry(() => client.editorInterface.get({ contentTypeId: ct.id }), `get editor ${ct.id}`);
    const controls: AnyObj[] = [...(ei.controls ?? [])];
    for (const f of ct.fields) {
      if (!f.widget && !f.help) continue;
      const settings: AnyObj = { ...(f.widgetSettings ?? {}) };
      if (f.help) settings.helpText = f.help;
      else if (!settings.helpText) delete settings.helpText;
      const i = controls.findIndex((c) => c.fieldId === f.id);
      if (i >= 0) {
        // keep Contentful's default widget unless the model names one
        controls[i] = {
          ...controls[i],
          ...(f.widget ? { widgetNamespace: "builtin", widgetId: f.widget } : {}),
          settings: { ...(controls[i].settings ?? {}), ...settings },
        };
      } else {
        controls.push({ fieldId: f.id, ...(f.widget ? { widgetNamespace: "builtin", widgetId: f.widget } : {}), settings });
      }
    }
    await pace();
    await withRetry(() => client.editorInterface.update({ contentTypeId: ct.id }, { ...ei, controls } as any), `update editor ${ct.id}`);
    log(`editor interface ${ct.id}: updated`);
  }
}

async function syncAssets(client: PlainClientAPI, locale: string) {
  let n = 0;
  for (const a of assets.values()) {
    n++;
    await pace();
    let existing: AnyObj | null = null;
    try { existing = await withRetry(() => client.asset.get({ assetId: a.id }), `get ${a.id}`); }
    catch (e) { if (!isStatus(e, 404)) throw e; }
    let current: AnyObj;
    if (!existing) {
      current = await withRetry(() => client.asset.createWithId({ assetId: a.id }, {
        fields: {
          title: { [locale]: a.title }, description: { [locale]: a.description },
          file: { [locale]: { contentType: a.contentType, fileName: a.fileName, upload: a.url } },
        },
      } as any), `create ${a.id}`);
      await pace();
      await withRetry(() => client.asset.processForAllLocales({}, current as any), `process ${a.id}`);
      for (let i = 0; ; i++) {
        await sleep(1500);
        current = await withRetry(() => client.asset.get({ assetId: a.id }), `poll ${a.id}`);
        if (current.fields?.file?.[locale]?.url) break;
        if (i > 40) throw new Error(`asset ${a.id} did not finish processing`);
      }
      await pace();
      await withRetry(() => client.asset.publish({ assetId: a.id }, current as any), `publish ${a.id}`);
      log(`[${n}/${assets.size}] asset ${a.id}: created+published`);
      continue;
    }
    if (CREATE_ONLY) { log(`[${n}/${assets.size}] asset ${a.id}: exists, skipped`); continue; }
    const f = existing.fields ?? {};
    const same = f.title?.[locale] === a.title && f.description?.[locale] === a.description;
    if (same && isPublishedClean(existing.sys)) { log(`[${n}/${assets.size}] asset ${a.id}: up to date`); continue; }
    if (!same) {
      existing = await withRetry(() => client.asset.update({ assetId: a.id }, {
        ...existing!, fields: { ...f, title: { ...f.title, [locale]: a.title }, description: { ...f.description, [locale]: a.description } },
      } as any), `update ${a.id}`);
    }
    await pace();
    await withRetry(() => client.asset.publish({ assetId: a.id }, existing as any), `publish ${a.id}`);
    log(`[${n}/${assets.size}] asset ${a.id}: updated+published`);
  }
}

function localise(fields: Fields, locale: string) {
  const out: AnyObj = {};
  const link = (x: any) =>
    x.asset ? { sys: { type: "Link", linkType: "Asset", id: x.asset } } : { sys: { type: "Link", linkType: "Entry", id: x.entry } };
  for (const [k, v] of Object.entries(fields)) {
    if (v === undefined || v === null || v === "") continue;
    const val = Array.isArray(v) ? v.map((x) => (typeof x === "object" ? link(x) : x)) : typeof v === "object" ? link(v) : v;
    out[k] = { [locale]: val };
  }
  return out;
}

async function syncEntries(client: PlainClientAPI, locale: string, list: EntryPlan[], label: string) {
  let n = 0;
  for (const e of list) {
    n++;
    const tag = `[${label} ${n}/${list.length}] ${e.id}`;
    await pace();
    const fields = localise(e.fields, locale);
    let existing: AnyObj | null = null;
    try { existing = await withRetry(() => client.entry.get({ entryId: e.id }), `get ${e.id}`); }
    catch (err) { if (!isStatus(err, 404)) throw err; }
    let saved: AnyObj;
    let action: string;
    if (!existing) {
      saved = await withRetry(() => client.entry.createWithId({ contentTypeId: e.typeId, entryId: e.id }, { fields } as any), `create ${e.id}`);
      action = "created";
    } else if (CREATE_ONLY) { log(`${tag}: exists, skipped`); continue; }
    else if (sameJson(existing.fields, fields) && isPublishedClean(existing.sys)) { log(`${tag}: up to date`); continue; }
    else {
      const ex = existing;
      saved = sameJson(ex.fields, fields)
        ? ex
        : await withRetry(() => client.entry.update({ entryId: e.id }, { ...ex, fields } as any), `update ${e.id}`);
      action = "updated";
    }
    await pace();
    await withRetry(() => client.entry.publish({ entryId: e.id }, saved as any), `publish ${e.id}`);
    log(`${tag}: ${action}+published`);
  }
}

// ---------------------------------------------------------------- main

async function main() {
  const { entries, gallery, proj, current, press } = await build();
  validate(entries);

  const counts: Record<string, number> = {};
  for (const e of entries) counts[e.typeId] = (counts[e.typeId] ?? 0) + 1;
  const summary = () => {
    log("Summary");
    log(`  content types: ${contentTypes.length} (${contentTypes.map((c) => c.id).join(", ")})`);
    for (const [k, v] of Object.entries(counts)) log(`  entries ${k}: ${v}`);
    log(`  assets: ${assets.size} unique images`);
    log(`  residential drafts skipped: ${localProjects.filter((p) => p.status === "draft").length} of ${localProjects.length}`);
    log(problems.length ? `  PROBLEMS (${problems.length}):\n${problems.map((p) => "   - " + p).join("\n")}` : "  validation: clean (0 problems)");
  };

  if (DRY) { log("[dry-run] offline; no requests sent"); summary(); process.exit(problems.length ? 1 : 0); }
  if (problems.length) { summary(); throw new Error("Validation problems; refusing live run."); }

  const client = makeClient();
  const locales = await withRetry(() => client.locale.getMany({}), "locales");
  const locale = locales.items.find((l) => l.default)?.code;
  if (!locale) throw new Error("No default locale found");
  log(`default locale: ${locale}`);

  await syncContentTypes(client);
  if (TYPES_ONLY) { log("--types-only: done"); return; }
  await syncAssets(client, locale);
  await syncEntries(client, locale, gallery, "gallery");
  await syncEntries(client, locale, proj, "project");
  await syncEntries(client, locale, current, "current");
  await syncEntries(client, locale, press, "press");
  summary();
}

main().catch((e) => {
  // Only the error class (and our own messages) are printed; API errors can echo request context.
  const err = e as { name?: string; message?: string };
  console.error(`Failed: ${err?.name ?? "Error"}${err?.name === "Error" ? " " + (err.message ?? "") : ""}`);
  process.exit(1);
});
