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

// No fake default leads - all leads are 100% real
const DEFAULT_SEED_LEADS: LeadItem[] = [];

export const getLeads = (): LeadItem[] => {
  if (typeof window === "undefined") return DEFAULT_SEED_LEADS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return DEFAULT_SEED_LEADS;
    const parsed: LeadItem[] = JSON.parse(saved);
    // Automatically purge any old mock seed leads
    const cleaned = parsed.filter((lead) => !lead.id.startsWith("lead-seed-"));
    if (cleaned.length !== parsed.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
    }
    return cleaned;
  } catch {
    return DEFAULT_SEED_LEADS;
  }
};

export const saveLeads = (leads: LeadItem[]) => {
  if (typeof window === "undefined") return;
  // Clean out any seed leads before saving
  const cleaned = leads.filter((lead) => !lead.id.startsWith("lead-seed-"));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
};

export const updateLeadStatus = async (id: string, status: LeadStatus) => {
  const leads = getLeads();
  const updated = leads.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  saveLeads(updated);

  // Also attempt updating in Supabase if supported
  try {
    await supabase.from("leads").update({ status } as any).eq("id", id);
  } catch {
    // Local update already persisted
  }
};

export const deleteLead = async (id: string) => {
  const leads = getLeads();
  const filtered = leads.filter((lead) => lead.id !== id);
  saveLeads(filtered);

  // Also attempt deleting from Supabase
  try {
    await supabase.from("leads").delete().eq("id", id);
  } catch {
    // Local deletion already persisted
  }
};

export const addCapturedLead = (lead: Omit<LeadItem, "id" | "created_at" | "status"> & { id?: string }) => {
  const leads = getLeads();
  const newLead: LeadItem = {
    ...lead,
    id: lead.id || `lead-${Date.now()}`,
    created_at: new Date().toISOString(),
    status: "New",
  };
  const updated = [newLead, ...leads.filter((l) => l.id !== newLead.id)];
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

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch real leads from Supabase database
    const fetchFromSupabase = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("leads")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data && isMounted) {
          const cached = getLeads();
          const merged: LeadItem[] = data.map((dbLead: any) => {
            const existing = cached.find((c) => c.id === dbLead.id || c.email === dbLead.email);
            return {
              id: dbLead.id,
              name: dbLead.name || "Anonymous",
              email: dbLead.email,
              phone: dbLead.phone || null,
              message: dbLead.message || null,
              source: dbLead.source || "contact_form",
              created_at: dbLead.created_at || new Date().toISOString(),
              status: existing ? existing.status : "New",
            };
          });

          // Combine with any local leads
          const dbIds = new Set(data.map((d: any) => d.id));
          const localOnly = cached.filter((c) => !dbIds.has(c.id));
          saveLeads([...merged, ...localOnly]);
        }
      } catch (err) {
        console.warn("Supabase fetch skipped/error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFromSupabase();

    // 2. Realtime listener: new leads inserted into Supabase appear live
    const channel = supabase
      .channel("realtime-leads")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "leads" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            const newDbLead: any = payload.new;
            const newLead: LeadItem = {
              id: newDbLead.id,
              name: newDbLead.name || "Anonymous",
              email: newDbLead.email,
              phone: newDbLead.phone || null,
              message: newDbLead.message || null,
              source: newDbLead.source || "contact_form",
              created_at: newDbLead.created_at || new Date().toISOString(),
              status: "New",
            };
            const current = getLeads();
            if (!current.some((l) => l.id === newLead.id)) {
              saveLeads([newLead, ...current]);
            }
          } else if (payload.eventType === "DELETE") {
            const oldId = (payload.old as any)?.id;
            if (oldId) {
              const current = getLeads();
              saveLeads(current.filter((l) => l.id !== oldId));
            }
          }
        }
      )
      .subscribe();

    // 3. Local update listener
    const handleUpdate = () => {
      setLeads(getLeads());
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

  return { leads, loading, updateLeadStatus, deleteLead, exportLeadsToCSV };
};
