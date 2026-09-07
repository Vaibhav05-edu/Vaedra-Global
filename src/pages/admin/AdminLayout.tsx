import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Star,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import logo from "@/assets/logo.webp";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { AdminOverview } from "./AdminOverview";
import { AdminPortfolio } from "./AdminPortfolio";
import { AdminJournals } from "./AdminJournals";
import { AdminTestimonials } from "./AdminTestimonials";
import { AdminLeads } from "./AdminLeads";
import { AdminSettings } from "./AdminSettings";

type AdminTab = "overview" | "portfolio" | "journals" | "testimonials" | "leads" | "settings";

const AdminLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "portfolio", label: "Portfolio Projects", icon: Briefcase },
    { id: "journals", label: "Journals / Blog", icon: BookOpen },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "leads", label: "Leads & Inquiries", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[hsl(0,0%,5%)] text-foreground flex">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden lg:flex flex-col justify-between w-64 border-r border-border bg-card/50 backdrop-blur-md p-6 fixed inset-y-0 left-0 z-30">
        <div>
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8 group">
            <img src={logo} alt="Vaedra Global" className="w-8 h-8 object-contain" />
            <div>
              <span className="font-display text-lg font-bold uppercase tracking-wider text-foreground block leading-tight">
                Vaedra Global
              </span>
              <span className="text-[10px] font-mono text-primary uppercase tracking-widest font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Admin Panel
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-display text-sm uppercase tracking-wider transition-all text-left ${
                    isActive
                      ? "bg-primary text-primary-foreground font-bold shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom actions */}
        <div className="pt-6 border-t border-border/60 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary/40 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-mono text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-64 h-full bg-card border-r border-border p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <Link to="/" className="flex items-center gap-2">
                  <img src={logo} alt="Vaedra Global" className="w-7 h-7 object-contain" />
                  <span className="font-display text-base font-bold uppercase tracking-wider text-foreground">
                    Vaedra Admin
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as AdminTab);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-display text-sm uppercase tracking-wider transition-all text-left ${
                        isActive
                          ? "bg-primary text-primary-foreground font-bold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-border space-y-2">
              <Link
                to="/"
                target="_blank"
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs font-mono text-muted-foreground"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-mono text-destructive"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/30 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-muted-foreground hover:text-foreground p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="hidden sm:inline">Admin</span>
              <span className="hidden sm:inline">/</span>
              <span className="text-foreground capitalize font-semibold">{activeTab}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 text-xs font-mono text-foreground hover:bg-secondary transition-colors"
            >
              <ExternalLink className="w-3 h-3 text-primary" />
              View Website
            </Link>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-display text-xs font-bold uppercase">
                {user?.name?.charAt(0) || "A"}
              </div>
              <div className="hidden md:block text-left">
                <span className="text-xs font-display font-semibold block text-foreground leading-tight">
                  {user?.name || "Admin"}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground block leading-none">
                  {user?.email || "admin@vaedra.global"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Viewport content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {activeTab === "overview" && (
            <AdminOverview onNavigateTab={(tab) => setActiveTab(tab as AdminTab)} />
          )}
          {activeTab === "portfolio" && <AdminPortfolio />}
          {activeTab === "journals" && <AdminJournals />}
          {activeTab === "testimonials" && <AdminTestimonials />}
          {activeTab === "leads" && <AdminLeads />}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
