import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Building2, CheckCircle2, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import { ProjectDetail } from "@/data/projectsData";
import { Button } from "@/components/ui/button";

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-[100] overflow-y-auto bg-black/85 backdrop-blur-md p-4 sm:p-6 md:p-8"
        >
          <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-card border border-border/90 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/90 transition-colors"
                aria-label="Close case study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cover Hero Image */}
              <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                {/* Floating Badges */}
                <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-display text-xs uppercase tracking-wider font-bold">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 font-mono text-xs">
                    Year: {project.year}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white/90 font-mono text-xs flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {project.timeline}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* Title & Tagline */}
                <div>
                  <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-foreground leading-[0.95] tracking-tight">
                    {project.title}
                  </h2>
                  <p className="font-serif italic text-base sm:text-lg text-primary mt-2">
                    "{project.tagline}"
                  </p>
                </div>

                {/* Metrics Grid */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-secondary/60 border border-border">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="text-center">
                        <div className="font-display text-xl sm:text-3xl font-bold uppercase text-highlight">
                          {metric.value}
                        </div>
                        <div className="text-[11px] sm:text-xs font-mono text-muted-foreground mt-0.5">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Client & Description */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>Client: <strong className="text-foreground">{project.client}</strong></span>
                  </div>
                  <p className="font-body text-sm sm:text-base text-foreground/80 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Key Deliverables */}
                {project.deliverables && project.deliverables.length > 0 && (
                  <div>
                    <h3 className="font-display text-lg uppercase font-bold text-foreground mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      Key Deliverables & Scope
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.deliverables.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-background/50 border border-border/60 text-xs font-body text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technologies Used */}
                {project.techStack && project.techStack.length > 0 && (
                  <div>
                    <h3 className="font-display text-sm uppercase font-mono tracking-wider text-muted-foreground mb-3">
                      Technologies & Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-foreground font-mono text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action CTA Bar */}
                <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider hover:bg-primary/90 transition-colors"
                  >
                    Start Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a
                    href="https://cal.com/vaedra-global-agency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border hover:bg-secondary text-foreground font-display text-sm uppercase tracking-wider transition-colors"
                  >
                    Book a Discovery Call
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
