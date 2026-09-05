import { projects, type Project } from "@/lib/projects";

type FeaturedProjectOptions = {
  limit?: number;
};

/**
 * Homepage-facing project query.
 *
 * The concepts depend on this function rather than the local array so a future
 * Contentful integration only needs to replace the implementation here. The
 * components can continue to receive the same normalized Project shape.
 */
export async function getFeaturedProjects({
  limit = 5,
}: FeaturedProjectOptions = {}): Promise<Project[]> {
  return projects.slice(0, limit);
}
