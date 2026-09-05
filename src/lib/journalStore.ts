import { useState, useEffect } from "react";
import { blogPosts as defaultBlogPosts } from "./blogPosts";
import type { BlogPost } from "./blogData";

const STORAGE_KEY = "vaedra_journal_posts";
const EVENT_NAME = "vaedra:journals_updated";

export interface JournalPost extends BlogPost {
  id?: string;
  category?: string;
  author?: string;
}

export const getJournalPosts = (): JournalPost[] => {
  if (typeof window === "undefined") return defaultBlogPosts;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultBlogPosts));
      return defaultBlogPosts;
    }
    return JSON.parse(saved);
  } catch {
    return defaultBlogPosts;
  }
};

export const saveJournalPosts = (posts: JournalPost[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const addJournalPost = (post: Omit<JournalPost, "slug"> & { slug?: string }): JournalPost => {
  const posts = getJournalPosts();
  const slug = post.slug?.trim() || post.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const newPost: JournalPost = {
    ...post,
    slug,
    date: post.date || new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: post.readTime || "5 min read",
  };

  const updated = [newPost, ...posts.filter((p) => p.slug !== slug)];
  saveJournalPosts(updated);
  return newPost;
};

export const updateJournalPost = (slug: string, updatedFields: Partial<JournalPost>) => {
  const posts = getJournalPosts();
  const updated = posts.map((post) => (post.slug === slug ? { ...post, ...updatedFields } : post));
  saveJournalPosts(updated);
};

export const deleteJournalPost = (slug: string) => {
  const posts = getJournalPosts();
  const filtered = posts.filter((p) => p.slug !== slug);
  saveJournalPosts(filtered);
};

export const useJournalPosts = () => {
  const [posts, setPosts] = useState<JournalPost[]>(getJournalPosts);

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getJournalPosts());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { posts, addJournalPost, updateJournalPost, deleteJournalPost };
};
