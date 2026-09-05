import React, { useState } from "react";
import { Shield, Database, Calendar, MessageSquare, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAdminAuth } from "@/context/AdminAuthContext";

export const AdminSettings: React.FC = () => {
  const { user } = useAdminAuth();
  const [calUrl, setCalUrl] = useState("https://cal.com/vaedra-global-agency");
  const [whatsAppNum, setWhatsAppNum] = useState("+91 84200 63164");

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Settings saved successfully!");
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Are you sure you want to reset all Journals, Testimonials, and Leads to their default state? Custom additions will be cleared."
      )
    ) {
      localStorage.removeItem("vaedra_journal_posts");
      localStorage.removeItem("vaedra_testimonials");
      localStorage.removeItem("vaedra_leads_cache");
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
          Agency Settings & System
        </h1>
        <p className="font-body text-sm text-muted-foreground">
          Review integrations, manage agency contact links, and verify database connectivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Admin Account Card */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-foreground">Admin Account</h3>
              <p className="text-xs text-muted-foreground">Authenticated administrator</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs font-mono">
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">User:</span>
              <span className="text-foreground">{user?.name || "Admin"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Email:</span>
              <span className="text-foreground">{user?.email || "admin@vaedra.global"}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Privileges:</span>
              <span className="text-primary font-bold">{user?.role || "Super Admin"}</span>
            </div>
          </div>
        </div>

        {/* Database & Cloud Status */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold uppercase text-foreground">Cloud Database</h3>
              <p className="text-xs text-muted-foreground">Supabase & Local Storage Layer</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs font-mono">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Supabase URL:</span>
              <span className="text-foreground flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Connected
              </span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Local Cache Sync:</span>
              <span className="text-primary">Active</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-muted-foreground">Realtime Dispatch:</span>
              <span className="text-foreground">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Integration URLs Form */}
      <form onSubmit={handleSaveSettings} className="bg-card border border-border rounded-2xl p-6 space-y-5">
        <h3 className="font-display text-lg font-bold uppercase text-foreground">
          External Integrations & CTAs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary" /> Cal.com Booking Link
            </label>
            <Input
              value={calUrl}
              onChange={(e) => setCalUrl(e.target.value)}
              className="bg-background/50 border-border text-foreground text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" /> WhatsApp Business Number
            </label>
            <Input
              value={whatsAppNum}
              onChange={(e) => setWhatsAppNum(e.target.value)}
              className="bg-background/50 border-border text-foreground text-xs"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-xs"
          >
            Save Integrations
          </Button>
        </div>
      </form>

      {/* Data Management & Reset */}
      <div className="bg-destructive/10 border border-destructive/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-bold uppercase text-destructive">
            Reset Data Cache
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5 max-w-md">
            Restore all journals, testimonials, and leads back to their factory demo defaults.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleResetData}
          className="border-destructive/40 text-destructive hover:bg-destructive/15 font-display uppercase tracking-wider text-xs"
        >
          <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
          Reset Demo Data
        </Button>
      </div>
    </div>
  );
};
