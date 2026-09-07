import { useRef, useEffect, useState, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowUpRight } from "lucide-react";
import { usePortfolioProjects, ProjectDetail } from "@/lib/portfolioStore";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

// SVG circular progress ring
const ProgressRing = ({ progress, radius }: { progress: number; radius: number }) => {
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      width={radius * 2}
      height={radius * 2}
      className="absolute -rotate-90"
    >
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="hsl(var(--foreground) / 0.1)"
        strokeWidth={stroke}
      />
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-100 ease-out"
      />
    </svg>
  );
};

const PortfolioSection = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const isMobile = useIsMobile();
  const { projects } = usePortfolioProjects();

  // Distribute projects across both tracks with repetition if needed to maintain full scrolling tracks
  const { topRow, bottomRow } = useMemo(() => {
    if (!projects || projects.length === 0) return { topRow: [], bottomRow: [] };

    const ensureMinLength = (items: ProjectDetail[], min = 5): ProjectDetail[] => {
      let result = [...items];
      while (result.length < min) {
        result = result.concat(items);
      }
      return result;
    };

    const top = ensureMinLength(projects, 5);
    const shifted = projects.length > 1 ? [...projects.slice(1), projects[0]] : projects;
    const bottom = ensureMinLength(shifted, 5);

    return { topRow: top, bottomRow: bottom };
  }, [projects]);

  const SCROLL_DISTANCE = isMobile ? 1200 : 2000;

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / SCROLL_DISTANCE));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [SCROLL_DISTANCE]);

  const maxTranslate = isMobile ? 600 : 1200;
  const topTranslate = scrollProgress * maxTranslate;
  const bottomTranslate = -(scrollProgress * maxTranslate);
  const ringRadius = isMobile ? 90 : 155;
  const circleSize = isMobile ? "w-40 h-40" : "w-64 h-64 md:w-72 md:h-72";

  return (
    <>
      <div
        ref={outerRef}
        id="portfolio"
        style={{ height: `calc(100vh + ${SCROLL_DISTANCE}px)` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-background flex flex-col justify-center">
          {/* Center circle with progress ring */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="relative flex items-center justify-center">
              <ProgressRing progress={scrollProgress} radius={ringRadius} />
              <div className={`${circleSize} rounded-full bg-primary flex flex-col items-center justify-center shadow-[0_0_40px_rgba(202,254,0,0.3)]`}>
                <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold uppercase text-primary-foreground tracking-tight text-center">
                  Case Study
                </h2>
                <span className="font-body text-sm sm:text-lg text-primary-foreground/70 mt-1">
                  {Math.round(scrollProgress * 100)}%
                </span>
                <span className="hidden sm:block text-[10px] font-mono text-primary-foreground/60 uppercase tracking-widest mt-1">
                  Click card to view
                </span>
              </div>
            </div>
          </div>

          {/* Top row */}
          <div className="mb-3 sm:mb-4">
            <div
              className="flex gap-3 sm:gap-4 will-change-transform"
              style={{
                transform: `translateX(${topTranslate}px)`,
                marginLeft: isMobile ? "-400px" : "-800px",
              }}
            >
              {topRow.map((project, i) => (
                <div
                  key={`top-${project.id}-${i}`}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
                  }}
                  className="relative flex-shrink-0 w-[220px] sm:w-[300px] md:w-[380px] h-[35vh] sm:h-[42vh] rounded-xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/60 transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(202,254,0,0.25)]"
                >
                  <img
                    src={project.image || (project.images && project.images[0])}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Floating Pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono flex items-center gap-1.5 shadow-lg pointer-events-none">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-background/90 via-background/60 to-transparent pointer-events-none">
                    <h3 className="font-display text-base sm:text-xl uppercase font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-muted-foreground">
                      {project.category} — {project.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom row */}
          <div>
            <div
              className="flex gap-3 sm:gap-4 will-change-transform justify-end"
              style={{
                transform: `translateX(${bottomTranslate}px)`,
                marginRight: isMobile ? "-400px" : "-800px",
              }}
            >
              {bottomRow.map((project, i) => (
                <div
                  key={`bottom-${project.id}-${i}`}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
                  }}
                  className="relative flex-shrink-0 w-[220px] sm:w-[300px] md:w-[380px] h-[35vh] sm:h-[42vh] rounded-xl overflow-hidden group cursor-pointer border border-border/40 hover:border-primary/60 transition-all duration-300 shadow-md hover:shadow-[0_0_30px_rgba(202,254,0,0.25)]"
                >
                  <img
                    src={project.image || (project.images && project.images[0])}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Hover Floating Pill */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-xs font-mono flex items-center gap-1.5 shadow-lg pointer-events-none">
                    <span>View Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-primary" />
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-background/90 via-background/60 to-transparent pointer-events-none">
                    <h3 className="font-display text-base sm:text-xl uppercase font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs sm:text-sm text-muted-foreground">
                      {project.category} — {project.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default PortfolioSection;
