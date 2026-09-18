export type CurrentProject = {
  index: string;
  title: string;
  location: string;
  postcode: string;
  stage: string;
};

const currentProjects: CurrentProject[] = [
  {
    index: "01",
    title: "41 Castelnau",
    location: "Barnes",
    postcode: "SW13",
    stage: "On site",
  },
  {
    index: "02",
    title: "Flat 11, 3a Palace Green",
    location: "Kensington",
    postcode: "W8",
    stage: "On site",
  },
];

/** Current-projects gateway; swap for Contentful entries after sign-off. */
export async function getCurrentProjects(): Promise<CurrentProject[]> {
  return currentProjects;
}
