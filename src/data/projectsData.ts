export * from "@/lib/portfolioStore";
export { DEFAULT_PROJECTS as defaultProjectsList } from "@/lib/portfolioStore";

import { DEFAULT_PROJECTS, ProjectDetail } from "@/lib/portfolioStore";

export const projectsData: Record<string, ProjectDetail> = DEFAULT_PROJECTS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<string, ProjectDetail>
);
