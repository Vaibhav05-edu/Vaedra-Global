import { useState, useEffect } from "react";

export interface Testimonial {
  id: string;
  name: string;      // Founder / Author name
  role: string;      // Founder / CEO, etc.
  company: string;   // Company name
  feedback: string;  // Review message
  rating: number;    // 1 - 5 stars
  avatar?: string;
  reviewUrl?: string; // Verification URL (e.g. Google Maps, Google Business, Clutch, Trustpilot)
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    name: "Sarah Johnson",
    role: "CEO & Founder",
    company: "TechStart",
    feedback:
      "Working with Vaedra Global transformed our digital presence. Their team delivered exceptional results that exceeded our expectations. The attention to detail and creative approach set them apart.",
    rating: 5,
    reviewUrl: "https://maps.google.com/?q=Vaedra+Global",
  },
  {
    id: "test-2",
    name: "David Park",
    role: "Founder",
    company: "DesignCo",
    feedback:
      "The team's expertise in web design and development is unmatched. They understood our vision perfectly and brought it to life with stunning precision and innovative solutions.",
    rating: 5,
    reviewUrl: "https://maps.google.com/?q=Vaedra+Global",
  },
  {
    id: "test-3",
    name: "Emma Williams",
    role: "Marketing Director",
    company: "GrowthLab",
    feedback:
      "Vaedra Global delivered a complete digital transformation for our brand. Their strategic thinking combined with creative excellence produced remarkable results across all channels.",
    rating: 5,
    reviewUrl: "https://maps.google.com/?q=Vaedra+Global",
  },
];

const STORAGE_KEY = "vaedra_testimonials";
const EVENT_NAME = "vaedra:testimonials_updated";

export const getTestimonials = (): Testimonial[] => {
  if (typeof window === "undefined") return DEFAULT_TESTIMONIALS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TESTIMONIALS));
      return DEFAULT_TESTIMONIALS;
    }
    return JSON.parse(saved);
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
};

export const saveTestimonials = (items: Testimonial[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const addTestimonial = (item: Omit<Testimonial, "id"> & { id?: string }): Testimonial => {
  const list = getTestimonials();
  const newItem: Testimonial = {
    ...item,
    id: item.id || `test-${Date.now()}`,
    rating: Math.max(1, Math.min(5, Number(item.rating) || 5)),
  };
  const updated = [newItem, ...list];
  saveTestimonials(updated);
  return newItem;
};

export const updateTestimonial = (id: string, updatedFields: Partial<Testimonial>) => {
  const list = getTestimonials();
  const updated = list.map((item) => (item.id === id ? { ...item, ...updatedFields } : item));
  saveTestimonials(updated);
};

export const deleteTestimonial = (id: string) => {
  const list = getTestimonials();
  const filtered = list.filter((item) => item.id !== id);
  saveTestimonials(filtered);
};

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(getTestimonials);

  useEffect(() => {
    const handleUpdate = () => {
      setTestimonials(getTestimonials());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { testimonials, addTestimonial, updateTestimonial, deleteTestimonial };
};
