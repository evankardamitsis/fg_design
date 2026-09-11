export type ServicePageImage = {
  src: string;
  alt: string;
  label: string;
};

export const constructionPageContent = {
  eyebrow: "Construction",
  title: "Built with control, care and accountability.",
  intro:
    "FG Design brings construction into the same conversation as design, coordinating specialist trades, building services, finishes and programme delivery through one accountable team.",
  phases: [
    {
      index: "01",
      title: "Pre-construction",
      description:
        "The team resolves scope, sequencing, procurement and technical coordination before work begins on site.",
    },
    {
      index: "02",
      title: "Delivery",
      description:
        "FG manages the programme, site coordination and specialist trades while protecting the intent of the design.",
    },
    {
      index: "03",
      title: "Completion",
      description:
        "Joinery, services and finishes are checked through to a considered, ready-to-use handover.",
    },
  ],
  capabilities: [
    "Programme management",
    "Contractor & trade coordination",
    "Mechanical, electrical & plumbing",
    "Bespoke joinery",
    "Stone, tiling & specialist finishes",
    "Quality control & handover",
  ],
};

export const designPageContent = {
  eyebrow: "Design",
  title: "Spaces conceived with purpose.",
  intro:
    "FG Design develops the spatial plan, interior architecture and material language together, giving each project a clear identity before it moves into construction.",
  project: {
    title: "Princess Gate Court",
    type: "Interior design study",
    description:
      "A residential concept study exploring circulation, room planning, joinery, material palettes and the relationship between classical proportions and contemporary living.",
    hero: {
      src: "/images/design/princess-gate-court/entrance-concept.png",
      alt: "Princess Gate Court entrance perspective drawing",
      label: "Entrance concept",
    },
    gallery: [
      {
        src: "/images/design/princess-gate-court/entrance-study.jpg",
        alt: "Princess Gate Court entrance concept study",
        label: "Entrance study",
      },
      {
        src: "/images/design/princess-gate-court/kitchen-study.jpg",
        alt: "Princess Gate Court kitchen concept study",
        label: "Kitchen study",
      },
      {
        src: "/images/design/princess-gate-court/living-study.jpg",
        alt: "Princess Gate Court living room concept study",
        label: "Living room study",
      },
      {
        src: "/images/design/princess-gate-court/material-study.jpg",
        alt: "Princess Gate Court material and mood study",
        label: "Material study",
      },
    ] satisfies ServicePageImage[],
  },
};

/** These queries form the hand-off point for the future Contentful models. */
export async function getConstructionPageContent() {
  return constructionPageContent;
}

export async function getDesignPageContent() {
  return designPageContent;
}
