export type CommercialProjectImage = {
  src: string;
  alt: string;
  label: string;
};

export type CommercialProject = {
  slug: string;
  index: string;
  title: string;
  location: string;
  sector: string;
  role: string;
  heading: string;
  paragraphs: string[];
  facts: { label: string; value: string }[];
  facilities: string[];
  cover?: CommercialProjectImage;
  gallery: CommercialProjectImage[];
};

const commercialProjects: CommercialProject[] = [
  {
    slug: "newcastle-united-training-ground",
    index: "01",
    title: "Newcastle United Training Ground",
    location: "Darsley Park, Benton, Newcastle",
    sector: "Sports & High-Performance Facilities",
    role: "Project Management & Design Coordination",
    heading: "A contemporary high-performance environment.",
    paragraphs: [
      "FG managed the redevelopment proposals for Newcastle United Football Club's Darsley Park training ground, coordinating the design development of the first-team facilities and supporting spaces.",
      "The proposals retained the character of the existing training ground while introducing contemporary extensions, glazing and darker external materials. Inside, exposed brickwork and existing roof structures were balanced with modern finishes, greenery and references to Newcastle United's identity.",
    ],
    facts: [
      { label: "Client", value: "Newcastle United Football Club" },
      { label: "Location", value: "Darsley Park, Benton, Newcastle" },
      { label: "Sector", value: "Sports & High-Performance Facilities" },
      { label: "FG role", value: "Project Management, Client Brief Development & Design Coordination" },
    ],
    facilities: [
      "First-team changing",
      "Conditioning gym",
      "Hydrotherapy & plunge pools",
      "Medical & physiotherapy",
      "Sports science",
      "Players' lounge",
      "Dining & servery",
      "Coaching & analysis",
      "Main reception",
    ],
    gallery: [],
  },
  {
    slug: "mollies-newcastle",
    index: "02",
    title: "Mollie's Newcastle",
    location: "Newcastle",
    sector: "Hospitality",
    role: "Hotel Design & Development",
    heading: "A complete hospitality concept at city scale.",
    paragraphs: [
      "FG Design Partners developed a comprehensive design proposal for Mollie's Newcastle, a 176-bedroom hotel conceived around the brand's contemporary, relaxed approach to hospitality.",
      "The study focused on an efficient relationship between guestrooms, social spaces and hotel operations. Reception and co-working areas, a diner, bar, outdoor terrace and gym support a varied mix of rooms, suites and an apartment.",
    ],
    facts: [
      { label: "Location", value: "Newcastle" },
      { label: "Bedrooms", value: "176" },
      { label: "Size", value: "Approx. 8,254 sqm GIA" },
      { label: "Scope", value: "Hotel Design & Development" },
    ],
    facilities: [
      "Reception & workspace",
      "Diner",
      "Bar",
      "Outdoor terrace",
      "Gym",
      "Suites & apartment",
      "Back-of-house operations",
    ],
    cover: {
      src: "/images/commercial/mollies-newcastle/massing.jpg",
      alt: "Mollie's Newcastle hotel massing study",
      label: "Hotel massing",
    },
    gallery: [
      {
        src: "/images/commercial/mollies-newcastle/concept-overview.jpg",
        alt: "Mollie's Newcastle concept design overview",
        label: "Concept design",
      },
      {
        src: "/images/commercial/mollies-newcastle/hospitality-level.jpg",
        alt: "Mollie's Newcastle diner and hospitality floor plan",
        label: "Hospitality level",
      },
      {
        src: "/images/commercial/mollies-newcastle/cross-section.jpg",
        alt: "Mollie's Newcastle building cross section",
        label: "Cross section",
      },
    ],
  },
];

/**
 * Commercial content gateway. Replace this local source with Contentful entries
 * after design sign-off; the index and project templates can remain unchanged.
 */
export async function getCommercialProjects(): Promise<CommercialProject[]> {
  return commercialProjects;
}

export async function getCommercialProjectBySlug(
  slug: string
): Promise<CommercialProject | undefined> {
  return commercialProjects.find((project) => project.slug === slug);
}
