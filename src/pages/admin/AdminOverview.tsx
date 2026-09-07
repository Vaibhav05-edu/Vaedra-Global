import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, Star, TrendingUp, ArrowRight, Download, Plus, Mail, MessageSquare, Briefcase } from "lucide-react";
import { useLeads, exportLeadsToCSV } from "@/lib/leadsStore";
import { useJournalPosts } from "@/lib/journalStore";
import { useTestimonials } from "@/lib/testimonialsStore";
import { usePortfolioProjects } from "@/lib/portfolioStore";
import { Button } from "@/components/ui/button";

interface AdminOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab }) => {
  const { leads } = useLeads();
  const { posts } = useJournalPosts();
  const { testimonials } = useTestimonials();
  const { projects } = usePortfolioProjects();

  const newLeadsCount = leads.filter((l) => l.status === "New").length;
  const contactFormCount = leads.filter((l) => l.source === "contact_form").length;
  const exitPopupCount = leads.filter((l) => l.source === "exit_popup").length;

  const averageRating = testimonials.length
    ? (testimonials.reduce((acc, curr) => acc + curr.rating, 0) / testimonials.length).toFixed(1)
    : "5.0";

  const stats = [
    {
      title: "Total Inquiries",
      value: leads.length.toString(),
      subtext: `${newLeadsCount} new unread leads`,
      icon: Users,
      color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
    },
    {
      title: "Portfolio Projects",
      value: projects.length.toString(),
      subtext: "Live case studies",
      icon: Briefcase,
      color: "from-lime-500/20 to-emerald-500/20 text-lime-400 border-lime-500/30",
    },
    {
      title: "Published Journals",
      value: posts.length.toString(),
      subtext: "Live on website",
      icon: BookOpen,
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
    },
    {
      title: "Client Reviews",
      value: testimonials.length.toString(),
      subtext: `Avg. ${averageRating} / 5.0 Rating`,
      icon: Star,
      color: "from-amber-500/20 to-yellow-500/20 text-amber-400 border-amber-500/30",
    },
    {
      title: "Inquiry Breakdown",
      value: `${contactFormCount} Form / ${exitPopupCount} Exit`,
      subtext: "Contact form & Exit intent",
      icon: TrendingUp,
      color: "from-emerald-500/20 to-green-500/20 text-emerald-400 border-emerald-500/30",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-card via-card/80 to-secondary p-6 sm:p-8 rounded-2xl border border-border">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
            Administrative Control Center
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-bold uppercase text-foreground mt-1">
            Welcome, Vaedra Admin
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1 max-w-xl">
            Manage your digital agency's incoming leads, publish interactive portfolio case studies, publish tech journal insights, and showcase verified client reviews.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={() => onNavigateTab("portfolio")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-xs sm:text-sm"
          >
            <Briefcase className="w-4 h-4 mr-1.5" />
            Add Project
          </Button>
          <Button
            onClick={() => onNavigateTab("journals")}
            variant="outline"
            className="border-border text-foreground hover:bg-secondary font-display uppercase tracking-wider text-xs sm:text-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Add Journal
          </Button>
          <Button
            onClick={() => onNavigateTab("testimonials")}
            variant="outline"
            className="border-border text-foreground hover:bg-secondary font-display uppercase tracking-wider text-xs sm:text-sm"
          >
            <Star className="w-4 h-4 mr-1.5 text-amber-400" />
            Add Review
          </Button>
          <Button
            onClick={exportLeadsToCSV}
            variant="secondary"
            className="bg-secondary text-foreground hover:bg-secondary/80 font-display uppercase tracking-wider text-xs sm:text-sm"
          >
            <Download className="w-4 h-4 mr-1.5" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-card border border-border/80 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-border transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase text-muted-foreground">{stat.title}</span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center border bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {stat.subtext}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Two-column layout: Recent Leads + Recent Journals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Leads (2 cols) */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-display text-xl font-bold uppercase text-foreground">
                Recent Inquiries
              </h2>
              <p className="text-xs text-muted-foreground">Latest client form submissions</p>
            </div>
            <button
              onClick={() => onNavigateTab("leads")}
              className="text-xs font-mono uppercase text-primary hover:underline flex items-center gap-1"
            >
              View All ({leads.length}) <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl bg-background/50 border border-border/50 gap-3 hover:border-border transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-foreground font-display font-bold uppercase flex-shrink-0 text-sm">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base uppercase font-semibold text-foreground">
                        {lead.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full font-medium ${
                          lead.status === "New"
                            ? "bg-primary/20 text-primary border border-primary/40"
                            : lead.status === "Contacted"
                            ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                            : lead.status === "Qualified"
                            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {lead.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                      <span>{lead.email}</span>
                      {lead.phone && (
                        <>
                          <span>•</span>
                          <span>{lead.phone}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right flex sm:flex-col items-center sm:items-end justify-between sm:justify-center text-xs text-muted-foreground">
                  <span className="font-mono text-[11px]">
                    {new Date(lead.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                  <span className="capitalize text-[10px] text-muted-foreground/70">
                    {lead.source.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Review / Journals Feed (1 col) */}
        <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold uppercase text-foreground">
                Active Journals
              </h2>
              <button
                onClick={() => onNavigateTab("journals")}
                className="text-xs font-mono uppercase text-primary hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <div key={post.slug} className="group flex gap-3 items-center">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-14 h-14 rounded-lg object-cover flex-shrink-0 border border-border"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display text-sm uppercase font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      {post.excerpt}
                    </p>
                    <span className="text-[10px] font-mono text-muted-foreground/60">{post.readTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-border">
            <Link
              to="/#blog"
              target="_blank"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-secondary text-xs uppercase font-display tracking-wider text-foreground hover:bg-secondary/80 transition-colors"
            >
              Preview Live Journal Section <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
