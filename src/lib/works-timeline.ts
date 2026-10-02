export type WorksStage = {
  image: string;
  name: string;
  caption: string;
  /** Grouping shown above the stage name, e.g. Demolition. Optional. */
  phase?: string;
  /** e.g. March 2025. Shown beside the phase when present. */
  dateLabel?: string;
  alt?: string;
  credit?: string;
  /** Pixel size; lets non-portrait photos letterbox instead of being cropped to the tall frame. */
  width?: number;
  height?: number;
};

export type WorksTimelineData = {
  eyebrow: string;
  /** Plain part, then the italic part. */
  heading: [string, string];
  /** `{start}` and `{end}` are replaced with the project's dates. */
  intro: string;
  stages: WorksStage[];
};

/**
 * Start-to-finish site sequence for Notting Hill (Hereford Road, W2),
 * all 15 photos taken from the same viewpoint.
 */
const nottingHill: WorksStage[] = [
  { image: "/images/timeline/01-existing-space.jpg", phase: "Existing", name: "Existing space", caption: "The property as found: a dated, compartmentalised kitchen and family room, with the conservatory cut off from the main space." },
  { image: "/images/timeline/02-strip-out.jpg", phase: "Demolition", name: "Strip-out begins", caption: "Ceilings, finishes and services are opened up, revealing the original construction and the true extent of the works ahead." },
  { image: "/images/timeline/03-structure-exposed.jpg", phase: "Demolition", name: "Structure exposed", caption: "With the fabric stripped back, the original timber floor structure is exposed and the first wall comes down." },
  { image: "/images/timeline/04-temporary-works.jpg", phase: "Structure", name: "Temporary works", caption: "Adjustable props and needles carry the loads above while the new structural openings are formed." },
  { image: "/images/timeline/05-steelwork.jpg", phase: "Structure", name: "Steelwork installed", caption: "New steel beams are lifted, levelled and pinned into place to span the enlarged openings." },
  { image: "/images/timeline/06-walls-removed.jpg", phase: "Structure", name: "Walls removed", caption: "The dividing masonry is taken down section by section, connecting the rooms into one open space." },
  { image: "/images/timeline/07-new-floor-slab.jpg", phase: "Build-up", name: "New floor slab", caption: "Insulation, reinforcement and concrete form the new ground-bearing slab across the whole footprint." },
  { image: "/images/timeline/08-first-fix.jpg", phase: "Build-up", name: "First fix", caption: "New openings are framed out; blockwork, carpentry and services are set out for the new plan." },
  { image: "/images/timeline/09-underfloor-heating.jpg", phase: "Build-up", name: "Underfloor heating", caption: "Heating pipework is laid over insulated panels, zoned to warm the entire open-plan space." },
  { image: "/images/timeline/10-screed.jpg", phase: "Build-up", name: "Screed laid", caption: "A power-floated screed locks in the heating and delivers a dead-level base for the floor finish." },
  { image: "/images/timeline/11-plastering.jpg", phase: "Finishes", name: "Plastering complete", caption: "Walls and ceilings are plastered and the joinery is masked up ahead of the final finishes." },
  { image: "/images/timeline/12-resin-pour.jpg", phase: "Finishes", name: "Resin floor poured", caption: "The liquid resin floor goes down in one continuous pour — a seamless, reflective white surface." },
  { image: "/images/timeline/13-resin-curing.jpg", phase: "Finishes", name: "Resin curing", caption: "The floor self-levels and cures, running uninterrupted from the front of the plan to the garden doors." },
  { image: "/images/timeline/14-final-fit-out.jpg", phase: "Finishes", name: "Final fit-out", caption: "The new roof lantern, bespoke joinery and decorations complete; protection comes up for handover." },
  { image: "/images/timeline/15-completed.jpg", phase: "Complete", name: "The finished home", caption: "One light-filled, open-plan space to the garden — the same view, transformed end to end." },
];

/**
 * Gloucester Walk (Kensington, W2): eight stages from several viewpoints, with
 * Fardad's own dates. The square and landscape shots letterbox in the player.
 */
const gloucesterWalk: WorksStage[] = [
  { image: "/images/projects/gloucester-walk/timeline/01-before.jpg", dateLabel: "June 2024", name: "Before", caption: "The house as we found it: a conventional sequence of separate rooms, with the original cornicing and bay windows still intact.", alt: "Living room at Gloucester Walk before works, with a corner sofa beside the bay window", width: 900, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/02-strip-out.jpg", dateLabel: "January 2025", name: "Strip-out", caption: "Partitions removed back to the timber frame, opening a clear line from the front bay through to the garden.", alt: "Interior stripped back to exposed timber studwork and ceiling joists", width: 900, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/03-structure.jpg", dateLabel: "March 2025", name: "Structural openings", caption: "New steel beams installed on temporary propping to carry the floors above and form the open-plan connection between rooms.", alt: "New steel beams supported on temporary props, with a material lift on site", width: 900, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/04-first-fix.jpg", dateLabel: "August 2025", name: "First fix & boarding", caption: "Services run, ceilings boarded and walls prepared, with the restored bay window framing the end of the room.", alt: "Boarded ceilings and prepared walls looking towards the bay window", width: 900, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/05-underfloor-heating.jpg", dateLabel: "September 2025", name: "Underfloor heating", caption: "Low-profile underfloor heating laid continuously through the enfilade, freeing the walls from radiators.", alt: "Underfloor heating panels laid through the full length of the ground floor", width: 900, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/06-plaster-and-windows.jpg", dateLabel: "November 2025", name: "Plaster & sash windows", caption: "Walls skimmed and the original sash windows and panelled bay refurbished and protected for the finishing trades.", alt: "Freshly plastered front room with refurbished sash bay window", width: 900, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/07-joinery-and-flooring.jpg", dateLabel: "January 2026", name: "Joinery & flooring", caption: "Oak joinery with integrated lighting installed and herringbone parquet laid, with the fireplace and lighting in place for snagging.", alt: "Lit oak shelving beside herringbone parquet leading to the front bay", width: 1600, height: 1600 },
  { image: "/images/projects/gloucester-walk/timeline/08-complete.jpg", dateLabel: "January 2026", name: "Complete", caption: "The finished living room: oak joinery and a stone-ledged fireplace, herringbone parquet, and the bay window returned to its full proportion beside a steel-framed arched glazed screen.", alt: "Completed living room at Gloucester Walk with oak joinery, fireplace, herringbone floor and curtained bay window", width: 2000, height: 1500, credit: "Photography: Atelier NM" },
];

/** Keyed by project slug; a project page renders the timeline when it has one. */
const timelines: Record<string, WorksTimelineData> = {
  "notting-hill-house": {
    eyebrow: "Start to finish",
    heading: ["The extent of", "the works."],
    intro:
      "Fifteen photographs from the same view, {start} to {end}. Press play to watch the room go from the space as found to the finished home.",
    stages: nottingHill,
  },
  "gloucester-walk": {
    eyebrow: "Process",
    heading: ["From strip-out to", "handover."],
    intro:
      "Fifteen months on site, recorded from the same viewpoints as the house was taken back to its structure and rebuilt around a new open plan.",
    stages: gloucesterWalk,
  },
};

export async function getWorksTimeline(slug: string): Promise<WorksTimelineData | undefined> {
  return timelines[slug];
}

/** The project whose timeline is promoted on the homepage. */
export const FEATURED_TIMELINE_SLUG = "notting-hill-house";
