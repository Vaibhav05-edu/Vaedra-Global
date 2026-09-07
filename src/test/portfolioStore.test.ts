import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getPortfolioProjects,
  addPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  movePortfolioProjectOrder,
  getProjectDetail,
  savePortfolioProjects,
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
    expect(projects[0].liveUrl).toBe("https://appverse.example.com");
  });

  it("Test 1: Short description, One image - successfully publishes", () => {
    const project = addPortfolioProject({
      title: "Alpha Web",
      category: "Web Design",
      year: "2024",
      image: "cover.jpg",
      images: ["cover.jpg"],
      tagline: "Short tagline",
      description: "Quick summary",
      client: "Alpha Corp",
      timeline: "1 Month",
      deliverables: ["Website"],
      techStack: ["React"],
      metrics: [{ label: "Speed", value: "100" }],
    });

    expect(project.id).toBeDefined();
    const all = getPortfolioProjects();
    expect(all.some((p) => p.title === "Alpha Web")).toBe(true);
  });

  it("Test 2: Detailed/multiple sentence description, One image - successfully publishes", () => {
    const detailedStory = `
      Vaedra Global was commissioned to architect and engineer the next-generation platform.
      The existing legacy stack suffered from high latency, database connection bottlenecks,
      and poor mobile responsiveness.

      We introduced an event-driven architecture using React, Node.js, and Redis caching.
      Paragraph 2: The conversion rate increased by 48% within 30 days of initial launch.
      Special characters check: "Double quotes", 'Single quotes', backticks, and emojis 🚀 🔥.
    `;

    const project = addPortfolioProject({
      title: "Enterprise Platform",
      category: "Enterprise Software",
      year: "2024",
      image: "cover.jpg",
      images: ["cover.jpg"],
      tagline: "Full enterprise transformation with detailed story",
      description: detailedStory,
      client: "Enterprise Global",
      timeline: "5 Months",
      deliverables: ["Cloud Migration", "Microservices Architecture", "Automated CI/CD"],
      techStack: ["React", "TypeScript", "Node.js", "Redis"],
      metrics: [{ label: "Uptime", value: "99.99%" }],
    });

    expect(project.id).toBeDefined();
    const found = getProjectDetail(project.id);
    expect(found.description).toContain("Special characters check");
    expect(found.description).toContain("Paragraph 2");
  });

  it("Test 3: Detailed description, Multiple images - successfully publishes", () => {
    const project = addPortfolioProject({
      title: "FinTech Mobile Platform",
      category: "Mobile App",
      year: "2024",
      image: "cover.jpg",
      images: ["screen1.jpg", "screen2.jpg", "screen3.jpg", "screen4.jpg", "screen5.jpg"],
      tagline: "Next-gen banking app",
      description: "Comprehensive financial management on mobile with detailed multi-paragraph case study.",
      client: "FinTech Corp",
      timeline: "5 Months",
      deliverables: ["iOS App", "Android App", "API Integration"],
      techStack: ["React Native", "TypeScript"],
      metrics: [{ label: "Users", value: "50K+" }],
    });

    const projects = getPortfolioProjects();
    expect(projects[0].id).toBe(project.id);
    expect(projects[0].title).toBe("FinTech Mobile Platform");
    expect(projects[0].images).toHaveLength(5);
  });

  it("Test 4: Detailed description, Fallback image - successfully publishes", () => {
    const project = addPortfolioProject({
      title: "Zero Image Project",
      category: "Consulting",
      year: "2024",
      image: "",
      images: [],
      tagline: "Pure advisory",
      description: "Detailed description with zero images supplied by admin, expecting graceful fallback.",
      client: "Advisory Partners",
      timeline: "2 Months",
      deliverables: ["Strategic Audit"],
      techStack: ["Next.js"],
      metrics: [{ label: "ROI", value: "10x" }],
    });

    expect(project.id).toBeDefined();
    const stored = getProjectDetail(project.id);
    expect(stored.images).toBeDefined();
  });

  it("Test 5: Live Project URL adding, updating, and removing", () => {
    // 1. Add with Live URL
    const created = addPortfolioProject({
      title: "Live URL Showcase",
      category: "Web App",
      year: "2024",
      image: "cover.jpg",
      images: ["cover.jpg"],
      tagline: "Live app",
      description: "App with public URL",
      client: "Live Client",
      timeline: "2 Months",
      deliverables: ["Web App"],
      techStack: ["React"],
      metrics: [{ label: "Speed", value: "99" }],
      liveUrl: "https://my-live-project.com",
    });

    let detail = getProjectDetail(created.id);
    expect(detail.liveUrl).toBe("https://my-live-project.com");

    // 2. Edit Live URL
    updatePortfolioProject(created.id, {
      liveUrl: "https://updated-domain.org/app",
    });
    detail = getProjectDetail(created.id);
    expect(detail.liveUrl).toBe("https://updated-domain.org/app");

    // 3. Remove Live URL
    updatePortfolioProject(created.id, {
      liveUrl: undefined,
    });
    detail = getProjectDetail(created.id);
    expect(detail.liveUrl).toBeUndefined();
  });

  it("Test 6: Handles localStorage QuotaExceededError without crashing", () => {
    const originalSetItem = localStorage.setItem;
    // Simulate quota exceeded
    localStorage.setItem = vi.fn().mockImplementation(() => {
      throw new DOMException("QuotaExceededError", "QuotaExceededError");
    });

    expect(() => {
      savePortfolioProjects([
        ...DEFAULT_PROJECTS,
        {
          id: "heavy-project",
          title: "Heavy Project",
          category: "Design",
          year: "2024",
          image: "huge.jpg",
          images: ["huge1.jpg", "huge2.jpg"],
          tagline: "Heavy",
          description: "Long story",
          client: "Client",
          timeline: "3 Months",
          deliverables: ["All"],
          techStack: ["React"],
          metrics: [{ label: "X", value: "1" }],
        },
      ]);
    }).not.toThrow();

    localStorage.setItem = originalSetItem;
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

  it("deletes a portfolio project", () => {
    deletePortfolioProject("shopelite");
    const projects = getPortfolioProjects();
    expect(projects.some((p) => p.id === "shopelite")).toBe(false);
  });
});
