import { describe, it, expect, beforeEach } from "vitest";
import {
  getPortfolioProjects,
  addPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  movePortfolioProjectOrder,
  getProjectDetail,
  DEFAULT_PROJECTS,
} from "../lib/portfolioStore";

describe("portfolioStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns default projects when localStorage is empty", () => {
    const projects = getPortfolioProjects();
    expect(projects.length).toBe(DEFAULT_PROJECTS.length);
    expect(projects[0].id).toBe("appverse");
    expect(projects[0].images).toBeDefined();
    expect(projects[0].images!.length).toBeGreaterThanOrEqual(4);
  });

  it("adds a new portfolio project with multiple images", () => {
    const newProject = addPortfolioProject({
      title: "FinTech Mobile Platform",
      category: "Mobile App",
      year: "2024",
      image: "cover.jpg",
      images: ["screen1.jpg", "screen2.jpg", "screen3.jpg", "screen4.jpg"],
      tagline: "Next-gen banking app",
      description: "Comprehensive financial management on mobile",
      client: "FinTech Corp",
      timeline: "5 Months",
      deliverables: ["iOS App", "Android App", "API Integration"],
      techStack: ["React Native", "TypeScript"],
      metrics: [{ label: "Users", value: "50K+" }],
    });

    const projects = getPortfolioProjects();
    expect(projects[0].id).toBe(newProject.id);
    expect(projects[0].title).toBe("FinTech Mobile Platform");
    expect(projects[0].images).toHaveLength(4);
  });

  it("updates an existing portfolio project", () => {
    updatePortfolioProject("appverse", {
      title: "AppVerse Pro Max",
      timeline: "6 Months",
      metrics: [{ label: "Downloads", value: "2M+" }],
    });

    const project = getProjectDetail("appverse");
    expect(project.title).toBe("AppVerse Pro Max");
    expect(project.timeline).toBe("6 Months");
    expect(project.metrics[0].value).toBe("2M+");
  });

  it("deletes a portfolio project", () => {
    deletePortfolioProject("shopelite");
    const projects = getPortfolioProjects();
    expect(projects.some((p) => p.id === "shopelite")).toBe(false);
  });

  it("reorders projects with movePortfolioProjectOrder", () => {
    const initial = getPortfolioProjects();
    const firstId = initial[0].id;
    const secondId = initial[1].id;

    movePortfolioProjectOrder(firstId, "down");

    const reordered = getPortfolioProjects();
    expect(reordered[0].id).toBe(secondId);
    expect(reordered[1].id).toBe(firstId);
  });

  it("retrieves project details by title or slug with image array fallback", () => {
    const project = getProjectDetail("Mastery");
    expect(project.title).toBe("Mastery");
    expect(project.images).toBeDefined();
    expect(project.images!.length).toBeGreaterThanOrEqual(1);

    // Non-existent fallback
    const fallback = getProjectDetail("non-existent-project-xyz");
    expect(fallback.title).toBe("non-existent-project-xyz");
    expect(fallback.images).toBeDefined();
  });
});
