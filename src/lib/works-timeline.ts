export type WorksStage = {
  image: string;
  phase: string;
  name: string;
  caption: string;
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

/** Keyed by project slug; a project page renders the timeline when it has one. */
const timelines: Record<string, WorksStage[]> = {
  "notting-hill-house": nottingHill,
};

export async function getWorksTimeline(slug: string): Promise<WorksStage[] | undefined> {
  return timelines[slug];
}

/** The project whose timeline is promoted on the homepage. */
export const FEATURED_TIMELINE_SLUG = "notting-hill-house";
