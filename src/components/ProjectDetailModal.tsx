import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Clock,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  Smartphone,
  Monitor,
} from "lucide-react";
import { ProjectDetail } from "@/lib/portfolioStore";

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0);
    setIsLightboxOpen(false);
  }, [project]);

  const imagesList = project
    ? project.images && project.images.length > 0
      ? project.images
      : [project.image]
    : [];

  const isMobileApp =
    project?.category.toLowerCase().includes("mobile") ||
    project?.category.toLowerCase().includes("app");

  const currentImage = imagesList[activeImageIndex] || project?.image || "";

  const handlePrevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActiveImageIndex((prev) =>
        prev === 0 ? imagesList.length - 1 : prev - 1
      );
    },
    [imagesList.length]
  );

  const handleNextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setActiveImageIndex((prev) =>
        prev === imagesList.length - 1 ? 0 : prev + 1
      );
    },
    [imagesList.length]
  );

  // Keyboard navigation for modal & lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        if (imagesList.length > 1) {
          setActiveImageIndex((prev) =>
            prev === 0 ? imagesList.length - 1 : prev - 1
          );
        }
      } else if (e.key === "ArrowRight") {
        if (imagesList.length > 1) {
          setActiveImageIndex((prev) =>
            prev === imagesList.length - 1 ? 0 : prev + 1
          );
        }
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, isLightboxOpen, onClose, imagesList.length]);

  return (
    <>
      <AnimatePresence>
        {project && (
          <div
            onClick={onClose}
            className="fixed inset-0 z-[100] overflow-y-auto bg-black/90 backdrop-blur-md p-3 sm:p-6 md:p-8"
          >
            <div className="min-h-full flex items-center justify-center py-4 sm:py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-5xl bg-card border border-border rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/75 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-black transition-colors"
                  aria-label="Close case study"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* EXPANDED PROMINENT GALLERY SECTION */}
                <div className="relative w-full bg-secondary/40 border-b border-border p-4 sm:p-6 lg:p-8">
                  <div className="flex flex-col items-center">
                    {/* Main Active Image Display */}
                    <div
                      onClick={() => setIsLightboxOpen(true)}
                      className={`relative w-full flex items-center justify-center overflow-hidden rounded-2xl cursor-zoom-in group border border-border/70 bg-black/40 ${
                        isMobileApp
                          ? "h-[360px] sm:h-[460px] md:h-[520px]"
                          : "h-[280px] sm:h-[400px] md:h-[480px]"
                      }`}
                    >
                      <img
                        src={currentImage}
                        alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                        className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.02] ${
                          isMobileApp ? "object-contain py-2" : "object-cover sm:object-contain"
                        }`}
                      />

                      {/* Hover Overlay with Lightbox indicator */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-white font-mono text-xs shadow-xl">
                          <Maximize2 className="w-3.5 h-3.5 text-primary" />
                          Click to View Full Screen
                        </span>
                      </div>

                      {/* Image format badge */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90 text-[11px] font-mono pointer-events-none">
                        {isMobileApp ? (
                          <>
                            <Smartphone className="w-3.5 h-3.5 text-primary" />
                            <span>Mobile Screen</span>
                          </>
                        ) : (
                          <>
                            <Monitor className="w-3.5 h-3.5 text-primary" />
                            <span>Web Experience</span>
                          </>
                        )}
                      </div>

                      {/* Screen Counter Badge */}
                      {imagesList.length > 1 && (
                        <div className="absolute bottom-3 right-3 z-10 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white/90 text-xs font-mono">
                          {activeImageIndex + 1} / {imagesList.length} Screens
                        </div>
                      )}

                      {/* Left / Right Carousel Controls */}
                      {imagesList.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black border border-white/15 flex items-center justify-center text-white transition-all opacity-80 hover:opacity-100 hover:scale-105"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/70 hover:bg-black border border-white/15 flex items-center justify-center text-white transition-all opacity-80 hover:opacity-100 hover:scale-105"
                            aria-label="Next image"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Thumbnail Strip */}
                    {imagesList.length > 1 && (
                      <div className="w-full mt-4 flex items-center gap-3 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin">
                        <div className="flex items-center gap-2.5 mx-auto">
                          {imagesList.map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                                idx === activeImageIndex
                                  ? "border-primary shadow-[0_0_15px_rgba(202,254,0,0.35)] scale-105"
                                  : "border-border/60 opacity-60 hover:opacity-100 hover:border-border"
                              }`}
                            >
                              <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* PROJECT CONTENT BODY */}
                <div className="p-6 sm:p-8 lg:p-10 space-y-8">
                  {/* Header Title & Badges */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground font-display text-xs uppercase tracking-wider font-bold">
                          {project.category}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary border border-border text-foreground font-mono text-xs">
                          Year: {project.year}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-secondary border border-border text-foreground font-mono text-xs flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          {project.timeline}
                        </span>
                        {imagesList.length > 1 && (
                          <span className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-mono text-xs flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5" />
                            {imagesList.length} Screens Showcase
                          </span>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 rounded-full bg-primary/20 border border-primary/40 text-primary font-mono text-xs flex items-center gap-1.5 hover:bg-primary/30 transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Visit Live
                          </a>
                        )}
                      </div>

                      <h2 className="font-display text-3xl sm:text-5xl font-bold uppercase text-foreground leading-[0.95] tracking-tight">
                        {project.title}
                      </h2>
                      <p className="font-serif italic text-base sm:text-lg text-primary mt-2">
                        "{project.tagline}"
                      </p>
                    </div>

                    <button
                      onClick={() => setIsLightboxOpen(true)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-border hover:border-primary hover:bg-primary/10 text-xs font-mono text-foreground transition-all flex-shrink-0 self-start"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-primary" />
                      View Screens Fullscreen
                    </button>
                  </div>

                  {/* Metrics Grid */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 p-5 rounded-2xl bg-secondary/60 border border-border">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="text-center">
                          <div className="font-display text-2xl sm:text-4xl font-bold uppercase text-highlight">
                            {metric.value}
                          </div>
                          <div className="text-[11px] sm:text-xs font-mono text-muted-foreground mt-1">
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
                      <span>
                        Client:{" "}
                        <strong className="text-foreground">{project.client}</strong>
                      </span>
                    </div>
                    <div className="font-body text-sm sm:text-base text-foreground/85 leading-relaxed whitespace-pre-line">
                      {project.description}
                    </div>
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
                    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                      {/* Visit Live Project button rendered only when liveUrl is present */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-display text-sm uppercase tracking-wider hover:bg-primary/90 transition-all font-semibold shadow-[0_0_20px_rgba(202,254,0,0.3)] hover:scale-[1.02]"
                        >
                          <span>Visit Live Project</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      <a
                        href="#contact"
                        onClick={onClose}
                        className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-display text-sm uppercase tracking-wider transition-colors ${
                          project.liveUrl
                            ? "border border-border hover:bg-secondary text-foreground"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        Start Similar Project
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>

                    <a
                      href="https://cal.com/vaedra-global-agency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-border hover:bg-secondary text-foreground font-display text-sm uppercase tracking-wider transition-colors"
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

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && project && (
          <div
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 select-none"
          >
            {/* Top Lightbox Bar */}
            <div className="flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <span className="font-display font-bold uppercase text-foreground text-lg sm:text-xl">
                  {project.title}
                </span>
                <span className="text-xs font-mono text-muted-foreground">
                  (Screen {activeImageIndex + 1} of {imagesList.length})
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close fullscreen view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Lightbox Image Viewport */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentImage}
                alt={`${project.title} screen ${activeImageIndex + 1}`}
                className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl transition-transform duration-300"
              />

              {/* Lightbox Prev / Next buttons */}
              {imagesList.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-transform hover:scale-110"
                    aria-label="Previous screen"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-transform hover:scale-110"
                    aria-label="Next screen"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Bottom Thumbnail Strip */}
            {imagesList.length > 1 && (
              <div
                className="flex items-center justify-center gap-2 overflow-x-auto py-2 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                      idx === activeImageIndex
                        ? "border-primary scale-110"
                        : "border-white/20 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Screen ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
