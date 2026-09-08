import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
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
      { label: "Page Speed Score", value: "99/100" },
      { label: "Industry Awards", value: "3x Awwwards" },
      { label: "Organic Traffic", value: "+240%" },
    ],
    order: 2,
  },
  {
    id: "novacore",
    title: "NovaCore",
    category: "Web Development",
    year: "2024",
    image: project2,
    images: [project2, project3, project1],
    tagline: "Mission-critical developer intelligence platform and distributed systems telemetry.",
    description:
      "NovaCore provides engineering organizations with deep insights into code complexity, delivery velocity, and architectural dependencies. Vaedra Global engineered the frontend data visualization suite, rendering complex real-time graphs and live stream processing dashboards.\n\nThe system handles millions of metric events per second using WebSockets and canvas rendering for instant diagnostics.",
    client: "NovaCore Systems",
    timeline: "5 Months",
    liveUrl: "https://novacore.example.com",
    deliverables: [
      "Distributed systems analytics engine & real-time WebSockets",
      "Interactive graph visualization of microservice dependencies",
      "High-throughput log query interface with sub-100ms response",
      "Enterprise single sign-on (SSO) & role-based access control",
    ],
    techStack: ["React", "TypeScript", "D3.js", "GraphQL", "Tailwind CSS", "Go", "Docker"],
    metrics: [
      { label: "Data Processed", value: "2.4B events/day" },
      { label: "Query Latency", value: "<85ms" },
      { label: "Enterprise NPS", value: "+74" },
    ],
    order: 3,
  },
];

const STORAGE_KEY = "vaedra_portfolio_projects";
const EVENT_NAME = "vaedra:portfolio_updated";
const DB_NAME = "vaedra_portfolio_db";
const STORE_NAME = "projects_store";
const DB_VERSION = 1;
const DB_KEY = "portfolio_items";

// Open high-capacity IndexedDB for reliable local offline caching
const openDB = (): Promise<IDBDatabase | null> => {
  if (typeof window === "undefined" || !("indexedDB" in window)) {
    return Promise.resolve(null);
  }
  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
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
 */
export const compressImage = (
  fileOrDataUrl: File | Blob | string,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<string> => {
  return new Promise((resolve, reject) => {
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
      } catch {
        // Fallback to JPEG if WebP is unsupported
      }

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
 * Uploads an image file or blob to Supabase Storage bucket 'portfolio-images'.
 * Returns the public CDN URL to store in the database (never stores Base64 in DB).
 */
export const uploadPortfolioImage = async (
  fileOrBlob: File | Blob | string,
  prefix: string = "portfolio"
): Promise<string> => {
  // If already a remote URL or asset path, return directly
  if (typeof fileOrBlob === "string") {
    if (!fileOrBlob.startsWith("data:")) {
      return fileOrBlob;
    }
  }

  try {
    const ext = "webp";
    const cleanId = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${ext}`;

    let uploadPayload: Blob;
    if (typeof fileOrBlob === "string" && fileOrBlob.startsWith("data:")) {
      const res = await fetch(fileOrBlob);
      uploadPayload = await res.blob();
    } else if (fileOrBlob instanceof Blob) {
      // Compress to optimized webp data url first then convert to blob
      const compressedDataUrl = await compressImage(fileOrBlob, 1920, 1920, 0.85);
      if (compressedDataUrl && compressedDataUrl.startsWith("data:")) {
        const res = await fetch(compressedDataUrl);
        uploadPayload = await res.blob();
      } else {
        uploadPayload = fileOrBlob;
      }
    } else {
      uploadPayload = fileOrBlob as unknown as Blob;
    }

    const { data, error } = await supabase.storage
      .from("portfolio-images")
      .upload(cleanId, uploadPayload, {
        contentType: "image/webp",
        cacheControl: "31536000",
        upsert: true,
      });

    if (!error && data?.path) {
      const { data: urlData } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(data.path);
      if (urlData?.publicUrl) {
        return urlData.publicUrl;
      }
    }
  } catch (err) {
    console.warn("Supabase Storage upload warning:", err);
  }

  // Graceful fallback for preview if Supabase Storage bucket is awaiting migration execution
  if (typeof fileOrBlob === "string") return fileOrBlob;
  return compressImage(fileOrBlob, 1600, 1600, 0.82);
};

// Helper: Safely save array to localStorage cache
const saveToLocalCache = (projects: ProjectDetail[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // Graceful fallback to compact cache if quota is constrained
    try {
      const compact = projects.map((p) => ({
        ...p,
        images: (p.images || [p.image]).slice(0, 2),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(compact));
    } catch {
      // Storage fully exhausted
    }
  }
};

/**
 * Returns cached portfolio projects from localStorage.
 * Returns null if no valid cached array exists.
 */
export const getCachedProjects = (): ProjectDetail[] | null => {
  if (typeof window === "undefined") return null;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((p, idx) => ({
        ...p,
        images: p.images && p.images.length > 0 ? p.images : [p.image],
        order: p.order ?? idx,
      }));
    }
  } catch (err) {
    console.warn("Failed to read portfolio cache:", err);
  }
  return null;
};

/**
 * Synchronous fetch for instant component hydration.
 * Prefers the last successfully cached portfolio data.
 * Falls back to DEFAULT_PROJECTS only for fresh installations where no cloud or cached data exists.
 */
export const getPortfolioProjects = (): ProjectDetail[] => {
  const cached = getCachedProjects();
  if (cached && cached.length > 0) {
    return cached;
  }
  return DEFAULT_PROJECTS;
};

/**
 * Asynchronously persists portfolio projects to Supabase production database.
 */
export const persistToSupabaseCloud = async (projects: ProjectDetail[]): Promise<void> => {
  try {
    const dbRows = projects.map((p, idx) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      year: p.year,
      image: p.image,
      images: p.images && p.images.length > 0 ? p.images : [p.image],
      tagline: p.tagline || null,
      description: p.description || null,
      client: p.client || null,
      timeline: p.timeline || null,
      deliverables: p.deliverables || [],
      tech_stack: p.techStack || [],
      metrics: p.metrics || [],
      display_order: p.order ?? idx,
      live_url: p.liveUrl || null,
      is_published: true,
      updated_at: new Date().toISOString(),
    }));

    const { error } = await supabase.from("portfolio").upsert(dbRows);
    if (error && error.code !== "PGRST205") {
      console.warn("Supabase portfolio persistence notice:", error.message);
    }
  } catch (err) {
    console.warn("Could not sync portfolio to cloud:", err);
  }
};

/**
 * Resilient save function:
 * 1. Saves to local cache and IndexedDB immediately for instant zero-latency UI update.
 * 2. Persists to central Supabase cloud database in background.
 * 3. Dispatches update event.
 */
export const savePortfolioProjects = (projects: ProjectDetail[]) => {
  if (typeof window === "undefined") return;

  // 1. Immediately cache locally
  saveToLocalCache(projects);
  saveProjectsToIndexedDB(projects).catch(() => {});
  window.dispatchEvent(new CustomEvent(EVENT_NAME));

  // 2. Persist to Supabase cloud database
  persistToSupabaseCloud(projects).catch((err) => {
    console.warn("Background cloud sync notice:", err);
  });
};

/**
 * Normal Supabase persistence fetch:
 * Requests published projects directly from Supabase database.
 * Updates local cache upon successful fetch.
 * Preserves existing cache if Supabase is temporarily unreachable (NO blind fallback to DEFAULT_PROJECTS).
 */
export const fetchPortfolioFromCloud = async (): Promise<ProjectDetail[]> => {
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("is_published", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      const mapped: ProjectDetail[] = data.map((row: any) => {
        const rawImages = row.images;
        let imagesArray: string[] = [];
        if (Array.isArray(rawImages)) {
          imagesArray = rawImages;
        } else if (typeof rawImages === "string") {
          try {
            imagesArray = JSON.parse(rawImages);
          } catch {
            imagesArray = [row.image];
          }
        } else {
          imagesArray = [row.image];
        }

        const parseJsonArray = (val: any) => {
          if (Array.isArray(val)) return val;
          if (typeof val === "string") {
            try { return JSON.parse(val); } catch { return []; }
          }
          return [];
        };

        return {
          id: row.id,
          title: row.title,
          category: row.category,
          year: row.year,
          image: row.image,
          images: imagesArray.length > 0 ? imagesArray : [row.image],
          tagline: row.tagline || "",
          description: row.description || "",
          client: row.client || "",
          timeline: row.timeline || "",
          deliverables: parseJsonArray(row.deliverables),
          techStack: parseJsonArray(row.tech_stack),
          metrics: parseJsonArray(row.metrics),
          order: row.display_order ?? 0,
          liveUrl: row.live_url || undefined,
        };
      });

      // Cache latest successfully fetched cloud data
      saveToLocalCache(mapped);
      return mapped;
    }

    if (error && error.code !== "PGRST205") {
      console.warn("Notice querying Supabase portfolio table:", error.message);
    }
  } catch (err) {
    console.warn("Network error fetching portfolio from Supabase:", err);
  }

  // Preserve last cached data, or fallback to DEFAULT_PROJECTS only if fresh install
  return getPortfolioProjects();
};

export const addPortfolioProject = (
  project: Omit<ProjectDetail, "id"> & { id?: string }
): ProjectDetail => {
  const list = getPortfolioProjects();
  const slugId =
    project.id?.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    project.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-") ||
    `project-${Date.now()}`;

  const finalImages = project.images && project.images.length > 0 ? project.images : [project.image];
  const newProject: ProjectDetail = {
    ...project,
    id: slugId,
    images: finalImages,
    image: project.image || finalImages[0],
    order: project.order ?? list.length,
    deliverables: project.deliverables || [],
    techStack: project.techStack || [],
    metrics: project.metrics || [],
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
  const updated = list.map((p) => {
    if (p.id !== id) return p;
    const finalImages =
      updatedFields.images && updatedFields.images.length > 0
        ? updatedFields.images
        : updatedFields.image
        ? [updatedFields.image]
        : p.images;
    return {
      ...p,
      ...updatedFields,
      images: finalImages,
      image: updatedFields.image || (finalImages && finalImages[0]) || p.image,
    };
  });
  savePortfolioProjects(updated);
};

export const deletePortfolioProject = (id: string) => {
  const list = getPortfolioProjects();
  const filtered = list.filter((p) => p.id !== id);
  savePortfolioProjects(filtered);

  // Also remove from Supabase
  supabase
    .from("portfolio")
    .delete()
    .eq("id", id)
    .then(({ error }) => {
      if (error && error.code !== "PGRST205") {
        console.warn("Notice deleting portfolio from Supabase:", error.message);
      }
    })
    .catch((err) => {
      console.warn("Cloud deletion notice:", err);
    });
};

export const movePortfolioProjectOrder = (id: string, direction: "up" | "down") => {
  const list = [...getPortfolioProjects()];
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) return;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= list.length) return;

  const [moved] = list.splice(index, 1);
  list.splice(targetIndex, 0, moved);

  const reordered = list.map((p, idx) => ({ ...p, order: idx }));
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    // 1. Initial Cloud Fetch from Supabase (Core persistence & universal fetching across devices)
    setIsLoading(true);
    fetchPortfolioFromCloud()
      .then((cloudData) => {
        if (isMounted && cloudData && cloudData.length > 0) {
          setProjects(cloudData);
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    // 2. Realtime Subscription (for instantly updating any open tabs on other devices)
    const channel = supabase
      .channel("public:portfolio")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio" },
        () => {
          fetchPortfolioFromCloud().then((refreshed) => {
            if (isMounted && refreshed && refreshed.length > 0) {
              setProjects(refreshed);
            }
          });
        }
      )
      .subscribe();

    // 3. Reconcile with IndexedDB on mount for local offline persistence
    getProjectsFromIndexedDB().then((idbProjects) => {
      if (isMounted && idbProjects && idbProjects.length > 0) {
        setProjects((prev) => {
          // If already populated by cloud, keep cloud; otherwise hydrate from IDB
          return prev.length > DEFAULT_PROJECTS.length ? prev : idbProjects;
        });
      }
    });

    // 4. Local update event listeners
    const handleUpdate = () => {
      setProjects(getPortfolioProjects());
    };

    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    projects,
    isLoading,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    movePortfolioProjectOrder,
  };
};
