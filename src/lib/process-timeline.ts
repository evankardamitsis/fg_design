export type ProcessStage = {
  id: string;
  step: string;
  /** ISO year-month, for <time dateTime>. */
  date: string;
  dateLabel: string;
  title: string;
  caption: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  credit?: string;
};

export type ProcessTimeline = {
  eyebrow: string;
  heading: string;
  intro: string;
  stages: ProcessStage[];
};

const base = "/images/projects/gloucester-walk/timeline";

/**
 * Multi-viewpoint construction record, shown as a horizontal card track.
 * Unlike the Notting Hill works timeline, these photos are not taken from one
 * fixed view, so they are laid out side by side rather than cross-faded.
 */
const gloucesterWalk: ProcessTimeline = {
  eyebrow: "Process",
  heading: "From strip-out to handover.",
  intro:
    "Eighteen months on site, recorded from the same viewpoints as the house was taken back to its structure and rebuilt around a new open plan.",
  stages: [
    {
      id: "before",
      step: "01",
      date: "2024-06",
      dateLabel: "June 2024",
      title: "Before",
      caption: "The house as we found it: a conventional sequence of separate rooms, with the original cornicing and bay windows still intact.",
      src: `${base}/01-before.jpg`,
      alt: "Living room at Gloucester Walk before works, with a corner sofa beside the bay window",
      width: 900,
      height: 1600,
    },
    {
      id: "strip-out",
      step: "02",
      date: "2025-01",
      dateLabel: "January 2025",
      title: "Strip-out",
      caption: "Partitions removed back to the timber frame, opening a clear line from the front bay through to the garden.",
      src: `${base}/02-strip-out.jpg`,
      alt: "Interior stripped back to exposed timber studwork and ceiling joists",
      width: 900,
      height: 1600,
    },
    {
      id: "structure",
      step: "03",
      date: "2025-03",
      dateLabel: "March 2025",
      title: "Structural openings",
      caption: "New steel beams installed on temporary propping to carry the floors above and form the open-plan connection between rooms.",
      src: `${base}/03-structure.jpg`,
      alt: "New steel beams supported on temporary props, with a material lift on site",
      width: 900,
      height: 1600,
    },
    {
      id: "first-fix",
      step: "04",
      date: "2025-08",
      dateLabel: "August 2025",
      title: "First fix & boarding",
      caption: "Services run, ceilings boarded and walls prepared, with the restored bay window framing the end of the room.",
      src: `${base}/04-first-fix.jpg`,
      alt: "Boarded ceilings and prepared walls looking towards the bay window",
      width: 900,
      height: 1600,
    },
    {
      id: "underfloor-heating",
      step: "05",
      date: "2025-09",
      dateLabel: "September 2025",
      title: "Underfloor heating",
      caption: "Low-profile underfloor heating laid continuously through the enfilade, freeing the walls from radiators.",
      src: `${base}/05-underfloor-heating.jpg`,
      alt: "Underfloor heating panels laid through the full length of the ground floor",
      width: 900,
      height: 1600,
    },
    {
      id: "plaster-and-windows",
      step: "06",
      date: "2025-11",
      dateLabel: "November 2025",
      title: "Plaster & sash windows",
      caption: "Walls skimmed and the original sash windows and panelled bay refurbished and protected for the finishing trades.",
      src: `${base}/06-plaster-and-windows.jpg`,
      alt: "Freshly plastered front room with refurbished sash bay window",
      width: 900,
      height: 1600,
    },
    {
      id: "joinery-and-flooring",
      step: "07",
      date: "2026-01",
      dateLabel: "January 2026",
      title: "Joinery & flooring",
      caption: "Oak joinery with integrated lighting installed and herringbone parquet laid, with the fireplace and lighting in place for snagging.",
      src: `${base}/07-joinery-and-flooring.jpg`,
      alt: "Lit oak shelving beside herringbone parquet leading to the front bay",
      width: 1600,
      height: 1600,
    },
    {
      id: "complete",
      step: "08",
      date: "2026-01",
      dateLabel: "January 2026",
      title: "Complete",
      caption: "The finished living room: oak joinery and a stone-ledged fireplace, herringbone parquet, and the bay window returned to its full proportion beside a steel-framed arched glazed screen.",
      src: `${base}/08-complete.jpg`,
      alt: "Completed living room at Gloucester Walk with oak joinery, fireplace, herringbone floor and curtained bay window",
      width: 2000,
      height: 1500,
      credit: "Photography: Atelier NM",
    },
  ],
};

/** Keyed by project slug; a project page renders the track when it has one. */
const timelines: Record<string, ProcessTimeline> = {
  "gloucester-walk": gloucesterWalk,
};

export async function getProcessTimeline(slug: string): Promise<ProcessTimeline | undefined> {
  return timelines[slug];
}
