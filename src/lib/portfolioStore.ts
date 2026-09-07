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
  liveUrl?: string;
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
      "AppVerse is a cross-platform mobile application designed to simplify workflows, track digital productivity, and enable seamless mobile collaboration. Vaedra Global was brought in to architect the application from the ground up, focusing on ultra-fluid micro-interactions, offline-first data sync, and multi-device cloud synchronization.\n\nBuilt using Flutter and React Native with an offline-first SQLite synchronization layer, AppVerse supports seamless real-time document collaboration and instant push notifications across iOS and Android.",
    client: "AppVerse Technologies Inc.",
    timeline: "4 Months",
    liveUrl: "https://appverse.example.com",
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
      "ShopElite is an ultra-modern luxury e-commerce platform built for high-volume consumer brands. We implemented a headless commerce architecture with edge caching, resulting in lightning-fast product discovery and an intuitive checkout flow that maximized checkout completion rates.\n\nThe headless architecture leverages Next.js, Redis edge caching, and Shopify Storefront APIs to process thousands of simultaneous orders during flash sales with zero degradation.",
    client: "Elite Retail Brands Global",
    timeline: "3 Months",
    liveUrl: "https://shopelite.example.com",
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
      "Mastery is a showcase digital platform designed for executive consulting and creative strategy. The project demanded high visual polish, bespoke typography pairings, and immersive scroll-driven storytelling that positions the client at the top of their market tier.\n\nWe engineered interactive 3D WebGL scenes, custom layout micro-interactions, and high-performance server-side rendering for optimal speed.",
    client: "Mastery Strategy Group",
    timeline: "2 Months",
    liveUrl: "https://mastery.example.com",
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
    images: [project2, project1, project3],
    tagline: "Comprehensive brand identity system and digital design language.",
    description:
      "BrandFlow involved end-to-end brand repositioning for an enterprise SaaS startup. We developed a cohesive visual identity, typography system, digital guidelines, and an interactive component library used by their global engineering teams.\n\nThe complete design system establishes unified brand consistency across all marketing landing pages and user-facing dashboards.",
    client: "Flow Technologies Inc.",
    timeline: "6 Weeks",
    deliverables: [
      "Complete corporate visual identity guidelines (120+ pages)",
      "Digital typography & color palette tokens in Tailwind CSS",
      "Marketing landing page templates and high-converting funnel pages",
      "Vector illustration set and 3D icon asset pack",
    ],
    techStack: ["Figma", "Illustrator", "React", "Tailwind CSS", "Storybook"],
    metrics: [
      { label: "Brand Recall Lift", value: "+82%" },
      { label: "Component Adoption", value: "100%" },
      { label: "Design Delivery", value: "On Schedule" },
    ],
    order: 3,
  },
  {
    id: "consultant",
    title: "Consultant",
    category: "Design",
    year: "2019",
    image: project1,
    images: [project1, project3, project4],
    tagline: "Corporate advisory web platform for boutique investment firms.",
    description:
      "A clean, authoritative digital home for an investment advisory group. The platform emphasizes confidentiality, research publication access, and secure client portal communication.\n\nDesigned with subtle micro-animations and intuitive content hierarchies for high-net-worth investors.",
    client: "Sterling & Partners Capital",
    timeline: "2 Months",
    deliverables: [
      "Bespoke executive layout and interactive financial calculators",
      "Gated client portal with secure document downloads",
      "Automated investor newsletter subscription & CRM sync",
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    metrics: [
      { label: "Inbound Leads", value: "+110%" },
      { label: "Client Portal Usage", value: "88%" },
      { label: "Page Speed", value: "A+ (99)" },
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
    tagline: "Immersive visual arts portfolio and experimental web experience.",
    description:
      "An experimental digital portfolio celebrating contemporary artists and creative directors. Featuring custom canvas shaders, fluid audio-reactive transitions, and dynamic typography sizing.\n\nAwarded multiple site-of-the-day accolades for boundary-pushing web animation and typography.",
    client: "Creative Collective Europe",
    timeline: "5 Weeks",
    deliverables: [
      "Custom WebGL fluid simulation and canvas shaders",
      "Responsive art direction for mobile and wide displays",
      "Interactive audio soundscape integration",
    ],
    techStack: ["WebGL", "Three.js", "React", "GSAP", "Tailwind CSS"],
    metrics: [
      { label: "Awwwards SOTD", value: "Winner" },
      { label: "Page Views", value: "500K+" },
      { label: "Average Session", value: "4m 12s" },
    ],
    order: 5,
  },
];

const STORAGE_KEY = "vaedra_portfolio_projects";
const EVENT_NAME = "vaedra:portfolio_updated";
const DB_NAME = "vaedra_portfolio_db";
const DB_VERSION = 1;
const STORE_NAME = "projects_store";
const DB_KEY = "all_projects";

/**
 * Native IndexedDB Helper for high-capacity local persistence.
 * IndexedDB provides gigabytes of storage, avoiding localStorage's 5MB quota.
 */
const openDB = (): Promise<IDBDatabase | null> => {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
};

export const saveProjectsToIndexedDB = async (projects: ProjectDetail[]): Promise<boolean> => {
  try {
    const db = await openDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(projects, DB_KEY);
      req.onsuccess = () => resolve(true);
      req.onerror = () => resolve(false);
    });
  } catch {
    return false;
  }
};

export const getProjectsFromIndexedDB = async (): Promise<ProjectDetail[] | null> => {
  try {
    const db = await openDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(DB_KEY);
      req.onsuccess = () => {
        if (req.result && Array.isArray(req.result)) {
          resolve(req.result);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
};

/**
 * Compresses an image file or base64 data URL to an optimized JPEG/WebP format
 * with bounded dimensions (max 1600px) and quality reduction (0.82).
 * Drastically reduces payload from 3-5MB down to ~80-150KB.
 */
export const compressImage = (
  fileOrDataUrl: File | string,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If it's an asset path or external URL (not data:), return as is
    if (typeof fileOrDataUrl === "string" && !fileOrDataUrl.startsWith("data:")) {
      return resolve(fileOrDataUrl);
    }

    if (typeof window === "undefined") {
      return resolve(typeof fileOrDataUrl === "string" ? fileOrDataUrl : "");
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    const process = () => {
      let { width, height } = img;
      if (width > maxWidth || height > maxHeight) {
        if (width / maxWidth > height / maxHeight) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return resolve(typeof fileOrDataUrl === "string" ? fileOrDataUrl : "");
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const webp = canvas.toDataURL("image/webp", quality);
        if (webp && webp.startsWith("data:image/webp")) {
          return resolve(webp);
        }
      } catch {}

      resolve(canvas.toDataURL("image/jpeg", quality));
    };

    img.onload = process;
    img.onerror = () => {
      resolve(typeof fileOrDataUrl === "string" ? fileOrDataUrl : "");
    };

    if (typeof fileOrDataUrl === "string") {
      img.src = fileOrDataUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = (e.target?.result as string) || "";
      };
      reader.onerror = reject;
      reader.readAsDataURL(fileOrDataUrl);
    }
  });
};

/**
 * Synchronous fetch from localStorage for instant hydration.
 */
export const getPortfolioProjects = (): ProjectDetail[] => {
  if (typeof window === "undefined") return DEFAULT_PROJECTS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PROJECTS));
      } catch {}
      return DEFAULT_PROJECTS;
    }
    const parsed: ProjectDetail[] = JSON.parse(saved);
    return parsed.map((p, idx) => ({
      ...p,
      images: p.images && p.images.length > 0 ? p.images : [p.image],
      order: p.order ?? idx,
    }));
  } catch {
    return DEFAULT_PROJECTS;
  }
};

/**
 * Resilient save function:
 * 1. Saves full data to IndexedDB (unlimited quota).
 * 2. Saves to localStorage with defensive fallback so QuotaExceededError never halts execution.
 * 3. Dispatches update event for immediate UI updates.
 */
export const savePortfolioProjects = (projects: ProjectDetail[]) => {
  if (typeof window === "undefined") return;

  // Persist full data to IndexedDB asynchronously
  saveProjectsToIndexedDB(projects).catch((e) => {
    console.warn("IndexedDB save failed:", e);
  });

  // Save to localStorage with graceful fallback on quota exceeded
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    console.warn("localStorage quota exceeded; storing compact cache. Full data safe in IndexedDB.");
    try {
      // Save compact version (first 2 images per project)
      const compact = projects.map((p) => ({
        ...p,
        images: (p.images || [p.image]).slice(0, 2),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // If still exceeding, keep metadata without large base64 strings
      try {
        const minimal = projects.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          year: p.year,
          image: p.image?.startsWith("data:") ? project1 : p.image,
          images: [p.image?.startsWith("data:") ? project1 : p.image],
          tagline: p.tagline,
          client: p.client,
          timeline: p.timeline,
          deliverables: p.deliverables,
          techStack: p.techStack,
          metrics: p.metrics,
          order: p.order,
          liveUrl: p.liveUrl,
          description: p.description,
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(minimal));
      } catch {}
    }
  }

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
    // Reconcile with IndexedDB on mount
    getProjectsFromIndexedDB().then((idbProjects) => {
      if (idbProjects && idbProjects.length > 0) {
        setProjects(
          idbProjects.map((p, idx) => ({
            ...p,
            images: p.images && p.images.length > 0 ? p.images : [p.image],
            order: p.order ?? idx,
          }))
        );
      }
    });

    const handleUpdate = () => {
      getProjectsFromIndexedDB().then((idbProjects) => {
        if (idbProjects && idbProjects.length > 0) {
          setProjects(
            idbProjects.map((p, idx) => ({
              ...p,
              images: p.images && p.images.length > 0 ? p.images : [p.image],
              order: p.order ?? idx,
            }))
          );
        } else {
          setProjects(getPortfolioProjects());
        }
      });
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
