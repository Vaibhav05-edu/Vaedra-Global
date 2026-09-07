import { useState, useEffect } from "react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  images?: string[];
  tagline: string;
  description: string;
  client: string;
  timeline: string;
  deliverables: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  order?: number;
}

export const DEFAULT_PROJECTS: ProjectDetail[] = [
  {
    id: "appverse",
    title: "AppVerse",
    category: "Mobile App",
    year: "2023",
    image: project3,
    images: [project3, project1, project4, project2],
    tagline: "Next-generation mobile ecosystem for digital creators and modern professionals.",
    description:
      "AppVerse is a cross-platform mobile application designed to simplify workflows, track digital productivity, and enable seamless mobile collaboration. Vaedra Global was brought in to architect the application from the ground up, focusing on ultra-fluid micro-interactions, offline-first data sync, and multi-device cloud synchronization.",
    client: "AppVerse Technologies Inc.",
    timeline: "4 Months",
    deliverables: [
      "Cross-platform iOS & Android mobile architecture",
      "Real-time cloud database synchronization & offline storage",
      "Custom design system with 60+ responsive mobile components",
      "Biometric security & end-to-end encrypted user authentication",
      "Mobile analytics dashboard with performance telemetry",
    ],
    techStack: ["Flutter", "React Native", "TypeScript", "Node.js", "PostgreSQL", "Firebase", "Figma"],
    metrics: [
      { label: "Active Users", value: "150K+" },
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Crash-free Rate", value: "99.98%" },
    ],
    order: 0,
  },
  {
    id: "shopelite",
    title: "ShopElite",
    category: "E-Commerce",
    year: "2023",
    image: project4,
    images: [project4, project1, project2],
    tagline: "High-performance headless e-commerce storefront with instantaneous page loads.",
    description:
      "ShopElite is an ultra-modern luxury e-commerce platform built for high-volume consumer brands. We implemented a headless commerce architecture with edge caching, resulting in lightning-fast product discovery and an intuitive checkout flow that maximized checkout completion rates.",
    client: "Elite Retail Brands Global",
    timeline: "3 Months",
    deliverables: [
      "Headless Shopify Plus storefront with Next.js frontend",
      "Dynamic filtering, faceted search, and AI-powered recommendations",
      "One-click multi-currency checkout & international shipping API",
      "Automated inventory management & warehouse webhook integration",
    ],
    techStack: ["React", "Next.js", "Tailwind CSS", "Shopify Storefront API", "Stripe", "Redis"],
    metrics: [
      { label: "Conversion Lift", value: "+38%" },
      { label: "Page Load Time", value: "0.6s" },
      { label: "Annual GMV Processed", value: "$12M+" },
    ],
    order: 1,
  },
  {
    id: "mastery",
    title: "Mastery",
    category: "Web Design",
    year: "2024",
    image: project1,
    images: [project1, project2, project4],
    tagline: "Award-winning agency portfolio and interactive digital experience.",
    description:
      "Mastery is a showcase digital platform designed for executive consulting and creative strategy. The project demanded high visual polish, bespoke typography pairings, and immersive scroll-driven storytelling that positions the client at the top of their market tier.",
    client: "Mastery Strategy Group",
    timeline: "2 Months",
    deliverables: [
      "Interactive 3D scroll animations and page transitions",
      "Full responsive web layout engineered for mobile and 4K displays",
      "Custom CMS integration for seamless case study publishing",
      "Technical SEO strategy delivering top 3 search rankings",
    ],
    techStack: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Three.js", "Vite"],
    metrics: [
      { label: "Time on Site", value: "+65%" },
      { label: "Bounce Rate", value: "24%" },
      { label: "Lighthouse Score", value: "98/100" },
    ],
    order: 2,
  },
  {
    id: "brandflow",
    title: "BrandFlow",
    category: "Branding",
    year: "2024",
    image: project2,
    images: [project2, project1, project4],
    tagline: "Comprehensive corporate identity and digital brand guidelines system.",
    description:
      "BrandFlow represents a complete reimagining of corporate visual identity. Vaedra Global crafted everything from the core visual geometry and color tokens to the design system component library, helping BrandFlow unite their global product ecosystem.",
    client: "BrandFlow Global",
    timeline: "6 Weeks",
    deliverables: [
      "Comprehensive digital brand guidelines and vector assets",
      "Multi-brand Figma design token system and UI kit",
      "Marketing landing page templates and email design framework",
      "Interactive brand portal for enterprise employee onboarding",
    ],
    techStack: ["Figma", "Design Systems", "Tailwind CSS", "React", "SVG Animation"],
    metrics: [
      { label: "Design Consistency", value: "100%" },
      { label: "Global Reach", value: "14 Countries" },
      { label: "Asset Adoption", value: "500+ Team Members" },
    ],
    order: 3,
  },
  {
    id: "consultant",
    title: "Consultant",
    category: "Design",
    year: "2019",
    image: project1,
    images: [project1, project4, project2],
    tagline: "Enterprise advisory portal and client collaboration workspace.",
    description:
      "A clean, executive-level consulting platform tailored for high-stakes business transformations. Built to communicate trust, expertise, and measurable results through data visualizations and strategic case breakdowns.",
    client: "Global Advisory Partners",
    timeline: "8 Weeks",
    deliverables: [
      "Executive client dashboard and report generator",
      "Secure client portal with role-based document access",
      "Interactive consulting ROI calculators",
      "Enterprise lead generation and CRM synchronization",
    ],
    techStack: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "Docker"],
    metrics: [
      { label: "Qualified Leads", value: "+110%" },
      { label: "Client Retention", value: "94%" },
      { label: "Consultation Bookings", value: "3x Growth" },
    ],
    order: 4,
  },
  {
    id: "creative",
    title: "Creative",
    category: "Design",
    year: "2022",
    image: project3,
    images: [project3, project2, project1],
    tagline: "Bold visual design and interactive storytelling for digital products.",
    description:
      "Creative is an exploratory project testing the boundaries of browser rendering, WebGL shading, and kinetic typography to showcase the future of agency storytelling.",
    client: "Creative Studio Labs",
    timeline: "6 Weeks",
    deliverables: [
      "Experimental interactive 3D WebGL scenes",
      "Kinetic typography and variable font animations",
      "High-frame-rate mobile performance optimization",
    ],
    techStack: ["WebGL", "Three.js", "GSAP", "React", "TypeScript"],
    metrics: [
      { label: "Framerate", value: "60 FPS" },
      { label: "Social Shares", value: "45K+" },
      { label: "Design Awards", value: "2 Honors" },
    ],
    order: 5,
  },
];

const STORAGE_KEY = "vaedra_portfolio_projects";
const EVENT_NAME = "vaedra:portfolio_updated";

export const getPortfolioProjects = (): ProjectDetail[] => {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      return DEFAULT_PROJECTS;
    }
    const parsed: ProjectDetail[] = JSON.parse(saved);
    // Ensure all projects have valid images array
    return parsed.map((p, idx) => ({
      ...p,
      images: p.images && p.images.length > 0 ? p.images : [p.image],
      order: p.order ?? idx,
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
};

export const savePortfolioProjects = (projects: ProjectDetail[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const addPortfolioProject = (
  project: Omit<ProjectDetail, "id"> & { id?: string }
): ProjectDetail => {
  const list = getPortfolioProjects();
  const slugId =
    project.id?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    project.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const newProject: ProjectDetail = {
    ...project,
    id: slugId,
    images: project.images && project.images.length > 0 ? project.images : [project.image],
    order: list.length,
  };

  const updated = [newProject, ...list.filter((p) => p.id !== slugId)];
  savePortfolioProjects(updated);
  return newProject;
};

export const updatePortfolioProject = (
  id: string,
  updatedFields: Partial<ProjectDetail>
) => {
  const list = getPortfolioProjects();
  const updated = list.map((item) => {
    if (item.id === id) {
      const merged = { ...item, ...updatedFields };
      if (updatedFields.image && (!merged.images || !merged.images.includes(updatedFields.image))) {
        merged.images = [updatedFields.image, ...(merged.images || [])];
      }
      return merged;
    }
    return item;
  });
  savePortfolioProjects(updated);
};

export const deletePortfolioProject = (id: string) => {
  const list = getPortfolioProjects();
  const filtered = list.filter((item) => item.id !== id);
  savePortfolioProjects(filtered);
};

export const movePortfolioProjectOrder = (id: string, direction: "up" | "down") => {
  const list = [...getPortfolioProjects()];
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) return;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= list.length) return;

  // Swap
  const temp = list[index];
  list[index] = list[targetIndex];
  list[targetIndex] = temp;

  // Re-assign order indices
  const reordered = list.map((item, idx) => ({ ...item, order: idx }));
  savePortfolioProjects(reordered);
};

export const getProjectDetail = (titleOrId: string): ProjectDetail => {
  const projects = getPortfolioProjects();
  const key = titleOrId.toLowerCase().trim().replace(/[^a-z0-9]/g, "");
  const found = projects.find(
    (p) =>
      p.id.toLowerCase().replace(/[^a-z0-9]/g, "") === key ||
      p.title.toLowerCase().replace(/[^a-z0-9]/g, "") === key
  );

  if (found) {
    return {
      ...found,
      images: found.images && found.images.length > 0 ? found.images : [found.image],
    };
  }

  // Fallback if not found
  return {
    id: key || "project",
    title: titleOrId || "Agency Project",
    category: "Digital Agency Case Study",
    year: "2024",
    image: project1,
    images: [project1, project2, project4],
    tagline: "Innovative digital development and creative engineering by Vaedra Global.",
    description:
      "A full-scope client collaboration delivering custom digital architecture, premium user experiences, and measurable business growth.",
    client: "Vaedra Global Partner",
    timeline: "3 Months",
    deliverables: [
      "Custom UI/UX interface design and user flow mapping",
      "Modern scalable frontend and backend architecture",
      "Performance optimization and responsive testing",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Figma"],
    metrics: [
      { label: "Client Satisfaction", value: "100%" },
      { label: "Delivery", value: "On Time" },
      { label: "Performance", value: "Top Tier" },
    ],
    order: 99,
  };
};

export const usePortfolioProjects = () => {
  const [projects, setProjects] = useState<ProjectDetail[]>(getPortfolioProjects);

  useEffect(() => {
    const handleUpdate = () => {
      setProjects(getPortfolioProjects());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    projects,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    movePortfolioProjectOrder,
  };
};
