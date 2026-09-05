import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";

export interface LeadItem {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  source: string;
  created_at: string;
  status: LeadStatus;
}

const STORAGE_KEY = "vaedra_leads_cache";
const EVENT_NAME = "vaedra:leads_updated";

const DEFAULT_SEED_LEADS: LeadItem[] = [
  {
    id: "lead-seed-1",
    name: "Alexander Vance",
    email: "a.vance@solaris-ai.io",
    phone: "+1 (555) 234-5678",
    message: "We need an enterprise-grade AI chatbot and RAG architecture for our customer support platform.",
    source: "contact_form",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    status: "New",
  },
  {
    id: "lead-seed-2",
    name: "Mei-Ling Zhou",
    email: "ml.zhou@fintechflow.com",
    phone: "+44 20 7946 0912",
    message: "Looking for full-stack developers to rebuild our web portal and mobile trading dashboard.",
    source: "contact_form",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    status: "Contacted",
  },
  {
    id: "lead-seed-3",
    name: "Marcus Aurelius",
    email: "marcus@romeo-ventures.co",
    phone: null,
    message: "Requested 15% promotional consultation discount via exit intent.",
    source: "exit_popup",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "Qualified",
  },
  {
    id: "lead-seed-4",
    name: "Elena Rostova",
    email: "elena@nordicdesign.se",
    phone: "+46 8 123 4567",
    message: "Complete redesign of our e-commerce brand identity and Shopify Plus storefront.",
    source: "contact_form",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    status: "Closed",
  },
  {
    id: "lead-seed-5",
    name: "Rohan Sharma",
    email: "rohan.sharma@zenithcloud.in",
    phone: null,
    message: "Subscribed for early access discount code via website exit prompt.",
    source: "exit_popup",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: "New",
  },
];

export const getLeads = (): LeadItem[] => {
  if (typeof window === "undefined") return DEFAULT_SEED_LEADS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SEED_LEADS));
      return DEFAULT_SEED_LEADS;
    }
    return JSON.parse(saved);
  } catch {
    return DEFAULT_SEED_LEADS;
  }
};

export const saveLeads = (leads: LeadItem[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const updateLeadStatus = (id: string, status: LeadStatus) => {
  const leads = getLeads();
  const updated = leads.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  saveLeads(updated);
};

export const deleteLead = (id: string) => {
  const leads = getLeads();
  const filtered = leads.filter((lead) => lead.id !== id);
  saveLeads(filtered);
};

export const addCapturedLead = (lead: Omit<LeadItem, "id" | "created_at" | "status"> & { id?: string }) => {
  const leads = getLeads();
  const newLead: LeadItem = {
    ...lead,
    id: lead.id || `lead-${Date.now()}`,
    created_at: new Date().toISOString(),
    status: "New",
  };
  const updated = [newLead, ...leads];
  saveLeads(updated);
  return newLead;
};

export const exportLeadsToCSV = () => {
  const leads = getLeads();
  if (!leads.length) return;

  const headers = ["ID", "Name", "Email", "Phone", "Source", "Status", "Date", "Message"];
  const rows = leads.map((lead) => [
    lead.id,
    `"${(lead.name || "").replace(/"/g, '""')}"`,
    `"${(lead.email || "").replace(/"/g, '""')}"`,
    `"${(lead.phone || "").replace(/"/g, '""')}"`,
    lead.source,
    lead.status,
    new Date(lead.created_at).toLocaleString(),
    `"${(lead.message || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `vaedra_leads_export_${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const useLeads = () => {
  const [leads, setLeads] = useState<LeadItem[]>(getLeads);
  const [loading, setLoading] = useState(false);

  // Attempt to fetch from Supabase if connected
  useEffect(() => {
    let isMounted = true;
    const fetchFromSupabase = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
        if (!error && data && data.length > 0 && isMounted) {
          const cached = getLeads();
          // Merge database leads with existing local status tracking
          const merged: LeadItem[] = data.map((dbLead: any) => {
            const existing = cached.find((c) => c.id === dbLead.id || c.email === dbLead.email);
            return {
              id: dbLead.id,
              name: dbLead.name || "Anonymous",
              email: dbLead.email,
              phone: dbLead.phone || null,
              message: dbLead.message || null,
              source: dbLead.source || "contact_form",
              created_at: dbLead.created_at,
              status: existing ? existing.status : "New",
            };
          });

          // Combine with any local-only leads
          const dbIds = new Set(data.map((d: any) => d.id));
          const localOnly = cached.filter((c) => !dbIds.has(c.id));
          saveLeads([...merged, ...localOnly]);
        }
      } catch {
        // Fallback safely to cached/demo leads
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFromSupabase();

    const handleUpdate = () => {
      setLeads(getLeads());
    };
    window.addEventListener(EVENT_NAME, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener(EVENT_NAME, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return { leads, loading, updateLeadStatus, deleteLead, exportLeadsToCSV };
};
