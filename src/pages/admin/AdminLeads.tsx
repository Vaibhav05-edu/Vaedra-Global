import React, { useState, useMemo } from "react";
import { Search, Filter, Download, Trash2, Phone, Mail, MessageSquare, ExternalLink, Calendar, X } from "lucide-react";
import { useLeads, LeadItem, LeadStatus, exportLeadsToCSV } from "@/lib/leadsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const AdminLeads: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeLead, setActiveLead] = useState<LeadItem | null>(null);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (lead.phone && lead.phone.includes(searchTerm)) ||
        (lead.message && lead.message.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSource = selectedSource === "all" || lead.source === selectedSource;
      const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus;

      return matchesSearch && matchesSource && matchesStatus;
    });
  }, [leads, searchTerm, selectedSource, selectedStatus]);

  const handleStatusChange = (id: string, newStatus: LeadStatus) => {
    updateLeadStatus(id, newStatus);
    toast.success(`Lead marked as ${newStatus}`);
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete lead for ${name}?`)) {
      deleteLead(id);
      if (activeLead?.id === id) setActiveLead(null);
      toast.success("Lead record removed.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Title & CSV Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
            Leads & Inquiries
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            View, filter, and respond to incoming potential clients from the contact form and exit popup.
          </p>
        </div>

        <Button
          onClick={exportLeadsToCSV}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-sm flex-shrink-0"
        >
          <Download className="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-card border border-border/80 rounded-2xl p-4 flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search name, email, phone, message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-background/50 border-border text-foreground text-xs h-10"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Source Filter */}
          <div className="flex items-center gap-1 bg-background/50 border border-border rounded-xl p-1 text-xs">
            <span className="text-muted-foreground px-2 font-mono">Source:</span>
            {["all", "contact_form", "exit_popup"].map((src) => (
              <button
                key={src}
                onClick={() => setSelectedSource(src)}
                className={`px-2.5 py-1 rounded-lg capitalize font-mono text-[11px] transition-colors ${
                  selectedSource === src
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {src === "all" ? "All" : src.replace("_", " ")}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-background/50 border border-border rounded-xl p-1 text-xs">
            <span className="text-muted-foreground px-2 font-mono">Status:</span>
            {["all", "New", "Contacted", "Qualified", "Closed"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2 py-1 rounded-lg font-mono text-[11px] transition-colors ${
                  selectedStatus === st
                    ? "bg-secondary text-foreground font-semibold border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-card border border-border/80 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/60 text-xs font-mono uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Client Name</th>
                <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                <th className="py-3.5 px-4 font-semibold">Source</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground font-body">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-background/40 transition-colors group cursor-pointer"
                    onClick={() => setActiveLead(lead)}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-display font-semibold uppercase text-foreground text-base">
                        {lead.name}
                      </div>
                      {lead.message && (
                        <div className="text-xs text-muted-foreground line-clamp-1 max-w-xs mt-0.5">
                          {lead.message}
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-xs text-foreground font-mono">{lead.email}</div>
                      {lead.phone && (
                        <div className="text-xs text-muted-foreground font-mono mt-0.5">{lead.phone}</div>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full ${
                          lead.source === "contact_form"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                        }`}
                      >
                        {lead.source.replace("_", " ")}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(lead.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs font-mono px-2.5 py-1 rounded-lg bg-background border border-border focus:ring-1 focus:ring-primary cursor-pointer ${
                          lead.status === "New"
                            ? "text-primary font-bold"
                            : lead.status === "Contacted"
                            ? "text-blue-400 font-medium"
                            : lead.status === "Qualified"
                            ? "text-amber-400 font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>

                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setActiveLead(lead)}
                          className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                          title="View Details"
                        >
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(lead.id, lead.name)}
                          className="h-8 w-8 p-0 text-destructive/70 hover:text-destructive hover:bg-destructive/10"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAILS DRAWER / MODAL */}
      {activeLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
            <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-start justify-between pb-4 border-b border-border mb-6">
              <div>
                <span className="text-[10px] font-mono uppercase text-primary tracking-widest font-semibold">
                  Inquiry Details
                </span>
                <h2 className="font-display text-2xl font-bold uppercase text-foreground mt-0.5">
                  {activeLead.name}
                </h2>
                <span className="text-xs text-muted-foreground font-mono">
                  Received on {new Date(activeLead.created_at).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => setActiveLead(null)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Contact information pills */}
              <div className="p-4 rounded-xl bg-background/50 border border-border space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-mono">Email:</span>
                  <a
                    href={`mailto:${activeLead.email}`}
                    className="text-primary hover:underline font-mono font-medium flex items-center gap-1"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {activeLead.email}
                  </a>
                </div>

                {activeLead.phone && (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
                    <span className="text-muted-foreground font-mono">Phone:</span>
                    <a
                      href={`tel:${activeLead.phone}`}
                      className="text-foreground hover:underline font-mono flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {activeLead.phone}
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
                  <span className="text-muted-foreground font-mono">Channel:</span>
                  <span className="font-mono capitalize text-foreground">
                    {activeLead.source.replace("_", " ")}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                  Message / Inquired Requirement:
                </label>
                <div className="p-4 rounded-xl bg-background/70 border border-border text-sm font-body text-foreground leading-relaxed min-h-[90px]">
                  {activeLead.message || "(No message provided by client)"}
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                  Lead Status:
                </label>
                <div className="flex gap-2">
                  {(["New", "Contacted", "Qualified", "Closed"] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => handleStatusChange(activeLead.id, st)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-medium border transition-all ${
                        activeLead.status === st
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Communication Actions */}
              <div className="pt-4 border-t border-border flex flex-wrap gap-2">
                <a
                  href={`mailto:${activeLead.email}?subject=Vaedra%20Global%20-%20Follow%20Up`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-display uppercase tracking-wider text-xs hover:bg-primary/90 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Reply via Email
                </a>

                {activeLead.phone && (
                  <a
                    href={`https://wa.me/${activeLead.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white font-display uppercase tracking-wider text-xs hover:bg-[#1ebe5d] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
