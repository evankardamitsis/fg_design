import { projects, type Project, type ProjectImage } from "@/lib/projects";

type FeaturedProjectOptions = {
  limit?: number;
};

export type ProjectMediaItem = ProjectImage & {
  room: string;
  caption?: string;
  orientation: "landscape" | "portrait";
};

export type ProjectPageSection =
  | {
      id: string;
      type: "overview";
      heading: string;
      paragraphs: string[];
      scopeOfWorks: string[];
    }
  | {
      id: string;
      type: "full-image";
      image: ProjectMediaItem;
    }
  | {
      id: string;
      type: "feature-image";
      image: ProjectMediaItem;
      alignment: "left" | "right";
    }
  | {
      id: string;
      type: "image-pair";
      images: [ProjectMediaItem, ProjectMediaItem];
    };

export type ProjectPageContent = Project & {
  sections: ProjectPageSection[];
};

const portraitImages = new Set([
  "/images/projects/chelsea-house/04-drawing-room.jpg",
  "/images/projects/chelsea-house/06-living-room.jpg",
  "/images/projects/gloucester-walk/02-shower-room.jpg",
  "/images/projects/gloucester-walk/03-dressing.jpg",
  "/images/projects/gloucester-walk/04-reading-nook.jpg",
  "/images/projects/gloucester-walk/06-bedroom.jpg",
  "/images/projects/gloucester-walk/exterior.jpg",
  "/images/projects/kensington-palace/02-wardrobe.jpg",
  "/images/projects/kensington-palace/04-bathroom.jpg",
  "/images/projects/kensington-palace/05-entrance-hall.jpg",
  "/images/projects/kensington-palace/06-detail-one.jpg",
  "/images/projects/notting-hill-house/01-boot-room.jpg",
  "/images/projects/notting-hill-house/04-kids-bathroom.jpg",
  "/images/projects/notting-hill-house/05-stair-hall.jpg",
  "/images/projects/notting-hill-house/06-dressing-room.jpg",
  "/images/projects/notting-hill-house/exterior.jpg",
]);

function normalizeMedia(
  image: ProjectImage & { room: string; caption?: string }
): ProjectMediaItem {
  return {
    ...image,
    orientation: portraitImages.has(image.src) ? "portrait" : "landscape",
  };
}

function buildMediaSections(project: Project): ProjectPageSection[] {
  const sections: ProjectPageSection[] = [];

  if (project.exterior) {
    sections.push({
      id: `${project.slug}-exterior`,
      type: "full-image",
      image: normalizeMedia({ ...project.exterior, room: "Exterior" }),
    });
  }

  if (project.gallery.length === 2) {
    sections.push({
      id: `${project.slug}-pair-1`,
      type: "image-pair",
      images: [normalizeMedia(project.gallery[0]), normalizeMedia(project.gallery[1])],
    });
    return sections;
  }

  const [first, ...remaining] = project.gallery;

  if (first) {
    sections.push({
      id: `${project.slug}-feature-1`,
      type: "feature-image",
      image: normalizeMedia(first),
      alignment: "left",
    });
  }

  for (let index = 0; index < remaining.length; index += 2) {
    const firstImage = remaining[index];
    const secondImage = remaining[index + 1];

    if (secondImage) {
      sections.push({
        id: `${project.slug}-pair-${index + 2}`,
        type: "image-pair",
        images: [normalizeMedia(firstImage), normalizeMedia(secondImage)],
      });
    } else {
      sections.push({
        id: `${project.slug}-feature-${index + 2}`,
        type: "feature-image",
        image: normalizeMedia(firstImage),
        alignment: "right",
      });
    }
  }

  return sections;
}

function normalizeProject(project: Project): ProjectPageContent {
  return {
    ...project,
    sections: [
      {
        id: `${project.slug}-overview`,
        type: "overview",
        heading: project.brief.heading,
        paragraphs: project.brief.paragraphs,
        scopeOfWorks: project.scopeOfWorks,
      },
      ...buildMediaSections(project),
    ],
  };
}

/**
 * Project content gateway.
 *
 * The UI only consumes these normalized queries. When Contentful is connected,
 * replace the local source and map its ordered section entries to
 * ProjectPageSection. The page templates, home gallery and portfolio index do
 * not need to change.
 */
export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getFeaturedProjects({
  limit = 5,
}: FeaturedProjectOptions = {}): Promise<Project[]> {
  const allProjects = await getProjects();
  return allProjects.slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<ProjectPageContent | undefined> {
  const project = projects.find((item) => item.slug === slug);
  return project ? normalizeProject(project) : undefined;
}
