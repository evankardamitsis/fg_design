export type ProjectImage = {
  src: string;
  alt: string;
};

export type Project = {
  slug: string;
  title: string;
  location: string;
  postcode: string;
  timeline: string;
  scope: string;
  index: string;
  brief: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
  };
  scopeOfWorks: string[];
  cover: ProjectImage;
  exterior?: ProjectImage;
  gallery: (ProjectImage & { room: string; caption?: string })[];
};

export const projects: Project[] = [
  {
    slug: "chelsea-house",
    title: "Chelsea House",
    location: "Chelsea Park Gardens",
    postcode: "SW3",
    timeline: "July 2021 — March 2022",
    scope: "Four-storey townhouse",
    index: "01",
    brief: {
      eyebrow: "Project Brief",
      heading: "Tradition and modern luxury, in balance.",
      paragraphs: [
        "A full refurbishment of a four-storey townhouse on one of Chelsea's most sought-after addresses, with direct access to a private garden.",
        "The brief: a luxurious, high-specification family home that elevates both function and aesthetics while preserving the building's historic character.",
      ],
    },
    scopeOfWorks: [
      "Full four-storey refurbishment to a high standard",
      "Bespoke craftsmanship throughout all living spaces",
      "New mechanical, electrical & plumbing systems",
      "Custom joinery, flooring & decorative finishes",
      "Restoration of period elements where appropriate",
      "Landscaping for seamless access to the garden",
      "Full interior design & specification",
    ],
    cover: { src: "/images/projects/chelsea-house/01-dining.jpg", alt: "Dining room with travertine table at Chelsea House" },
    exterior: { src: "/images/projects/chelsea-house/exterior.jpg", alt: "Exterior of Chelsea House, SW3" },
    gallery: [
      { src: "/images/projects/chelsea-house/01-dining.jpg", room: "Dining Room", caption: "A travertine table and sculptural seating set against a wall-hung artwork and bespoke, recessed storage.", alt: "Chelsea House dining room" },
      { src: "/images/projects/chelsea-house/02-kitchen-dining.jpg", room: "Kitchen & Dining", alt: "Chelsea House kitchen and dining hallway" },
      { src: "/images/projects/chelsea-house/03-bedroom.jpg", room: "Principal Bedroom", alt: "Chelsea House principal bedroom" },
      { src: "/images/projects/chelsea-house/04-drawing-room.jpg", room: "Drawing Room", caption: "A textured, sculptural sofa and a bespoke glass-topped table compose a refined setting for artful living, against curated works and layered finishes.", alt: "Chelsea House drawing room" },
      { src: "/images/projects/chelsea-house/05-kitchen-nook.jpg", room: "Kitchen Nook", caption: "A striking marble island and sculptural timber stools pair with custom cabinetry beneath generous natural light.", alt: "Chelsea House kitchen nook" },
    ],
  },
  {
    slug: "kensington-palace",
    title: "Kensington Palace",
    location: "Palace Green",
    postcode: "W8",
    timeline: "September 2021 — January 2023",
    scope: "Lateral apartment",
    index: "02",
    brief: {
      eyebrow: "Project Brief",
      heading: "Contemporary elegance, bespoke craftsmanship.",
      paragraphs: [
        "A full refurbishment of a prestigious lateral apartment on one of London's most secure and sought-after addresses.",
        "The design vision combined contemporary elegance with bespoke craftsmanship to create a luxurious, high-performance home.",
      ],
    },
    scopeOfWorks: [
      "Complete strip-out & high-end refurbishment",
      "Integrated air-conditioning system",
      "Bespoke luxury wardrobes & joinery",
      "SieMatic kitchen with Gaggenau appliances",
      "Feature Moroccan mosaic installations",
      "Premium finishes throughout",
    ],
    cover: { src: "/images/projects/kensington-palace/01-kitchen.jpg", alt: "Kitchen with Moroccan mosaic at Kensington Palace apartment" },
    gallery: [
      { src: "/images/projects/kensington-palace/01-kitchen.jpg", room: "Kitchen", caption: "Sculptural cabinetry and a Moroccan mosaic backsplash, framed by Gaggenau appliances and integrated lighting.", alt: "Kensington Palace kitchen" },
      { src: "/images/projects/kensington-palace/02-wardrobe.jpg", room: "Wardrobe", caption: "Bespoke cabinetry with refined hardware pairs classic with contemporary.", alt: "Kensington Palace wardrobe" },
      { src: "/images/projects/kensington-palace/03-dressing.jpg", room: "Master Dressing", alt: "Kensington Palace master dressing room" },
      { src: "/images/projects/kensington-palace/04-bathroom.jpg", room: "Master Bathroom", caption: "Intricate tiling, an arched recess, and a custom water feature form a serene, spa-like retreat.", alt: "Kensington Palace master bathroom" },
    ],
  },
  {
    slug: "wycombe-square",
    title: "Wycombe Square",
    location: "Kensington & Notting Hill",
    postcode: "W8",
    timeline: "June 2019 — March 2020",
    scope: "Five-storey townhouse",
    index: "03",
    brief: {
      eyebrow: "Project Brief",
      heading: "Understated luxury, a private square.",
      paragraphs: [
        "A full refurbishment of a five-storey townhouse with a private indoor swimming pool, in the heart of Kensington and Notting Hill.",
        "The approach: an understated take on luxury — upgrading key finishes and services while preserving the home's elegant character.",
      ],
    },
    scopeOfWorks: [
      "Refurbishment across five storeys, incl. pool level",
      "New high-quality bathrooms throughout",
      "New high-end kitchen",
      "Complete internal redecoration",
      "Upgraded mechanical, electrical & plumbing",
      "Restoration of original finishes",
    ],
    // 01-pool.jpg is only 600x338 in the source deck — too low-res for a cover.
    cover: { src: "/images/projects/wycombe-square/02-dressing.jpg", alt: "Panelled dressing room at Wycombe Square" },
    exterior: { src: "/images/projects/wycombe-square/exterior.jpg", alt: "Exterior of Wycombe Square, W8" },
    gallery: [
      { src: "/images/projects/wycombe-square/01-pool.jpg", room: "Indoor Pool", caption: "A mosaic-lined pool and natural stone surrounds beneath a glazed wall and soft ambient light — a space made for stillness.", alt: "Wycombe Square indoor pool" },
      { src: "/images/projects/wycombe-square/02-dressing.jpg", room: "Panelled Dressing", alt: "Wycombe Square panelled dressing room" },
      { src: "/images/projects/wycombe-square/03-entrance-hall.jpg", room: "Entrance Hall", caption: "A composed introduction to the home — bespoke, elegant, and effortlessly practical.", alt: "Wycombe Square entrance hall" },
    ],
  },
  {
    slug: "notting-hill-house",
    title: "Notting Hill House",
    location: "Hereford Road",
    postcode: "W2",
    timeline: "September 2023 — December 2024",
    scope: "Five-storey townhouse",
    index: "04",
    brief: {
      eyebrow: "Project Brief",
      heading: "Expansive, modern, full of character.",
      paragraphs: [
        "A full refurbishment of a five-storey period townhouse, with substantial structural alterations and landscaping.",
        "The focus: a modern, expansive family home that retains the elegance and character of the original building.",
      ],
    },
    scopeOfWorks: [
      "Internal & external refurbishment, five floors",
      "Driveway excavation for a guest suite",
      "Rear extension to the basement living areas",
      "Garden excavation & landscaped patio",
      "Molteni kitchen with Gaggenau appliances",
      "Polished-plaster feature walls",
      "Full bespoke joinery package",
    ],
    // 01-boot-room.jpg is only 767x1024 in the source deck — too low-res for a cover.
    cover: { src: "/images/projects/notting-hill-house/02-garden-room.jpg", alt: "Garden room at Notting Hill House" },
    exterior: { src: "/images/projects/notting-hill-house/exterior.jpg", alt: "Exterior of Notting Hill House, W2" },
    gallery: [
      { src: "/images/projects/notting-hill-house/01-boot-room.jpg", room: "Boot Room", caption: "Elegant detailing meets a playful run of colourful hooks against a warm, textured wall — refined architecture and personality, side by side.", alt: "Notting Hill House boot room" },
      { src: "/images/projects/notting-hill-house/02-garden-room.jpg", room: "Garden Room", alt: "Notting Hill House garden room" },
    ],
  },
  {
    slug: "gloucester-walk",
    title: "Gloucester Walk",
    location: "Kensington",
    postcode: "W2",
    timeline: "December 2024 — February 2026",
    scope: "Five-storey residence",
    index: "05",
    brief: {
      eyebrow: "Project Brief",
      heading: "A complete transformation.",
      paragraphs: [
        "A comprehensive refurbishment of a five-storey period residence, with significant structural reconfiguration and considered external works.",
        "The aim: a contemporary, open and functional home, thoughtfully balanced against the property's original charm and architectural integrity.",
      ],
    },
    scopeOfWorks: [
      "Internal & external refurbishment, five floors",
      "Driveway excavation for a utility room",
      "Rear extension to the basement living areas",
      "Garden excavation & landscaped patio",
      "Bespoke kitchen with Gaggenau appliances",
      "Full bespoke joinery package",
      "Complete new flooring throughout",
    ],
    cover: { src: "/images/projects/gloucester-walk/02-shower-room.jpg", alt: "Book-matched marble shower room at Gloucester Walk" },
    exterior: { src: "/images/projects/gloucester-walk/exterior.jpg", alt: "Exterior of Gloucester Walk, W2" },
    gallery: [
      { src: "/images/projects/gloucester-walk/01-living-room.jpg", room: "Living Room", caption: "Timber joinery, stone, and soft textiles compose around a streamlined fireplace and a curved bay window.", alt: "Gloucester Walk living room" },
      { src: "/images/projects/gloucester-walk/02-shower-room.jpg", room: "Shower Room", caption: "Dramatic book-matched marble forms a striking focal point, set off by frameless glazing and matte-black fixtures.", alt: "Gloucester Walk shower room" },
      { src: "/images/projects/gloucester-walk/03-dressing.jpg", room: "Dressing Room", alt: "Gloucester Walk dressing room" },
      { src: "/images/projects/gloucester-walk/04-reading-nook.jpg", room: "Reading Nook", caption: "Soft upholstery, muted tones, and concealed storage form a thoughtfully crafted corner within the room — practical and quietly elegant.", alt: "Gloucester Walk reading nook" },
      { src: "/images/projects/gloucester-walk/05-kitchen.jpg", room: "Kitchen", alt: "Gloucester Walk kitchen" },
      { src: "/images/projects/gloucester-walk/06-bedroom.jpg", room: "Master Bedroom", alt: "Gloucester Walk master bedroom" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
