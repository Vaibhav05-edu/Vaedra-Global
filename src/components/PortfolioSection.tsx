import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const topRow = [
  { image: project1, title: "Mastery", category: "Web Design", year: "2024" },
  { image: project2, title: "BrandFlow", category: "Branding", year: "2024" },
  { image: project3, title: "AppVerse", category: "Mobile App", year: "2023" },
  { image: project4, title: "ShopElite", category: "E-Commerce", year: "2023" },
  { image: project1, title: "Consultant", category: "Design", year: "2019" },
];

const bottomRow = [
  { image: project3, title: "AppVerse", category: "Mobile App", year: "2023" },
  { image: project4, title: "ShopElite", category: "E-Commerce", year: "2023" },
  { image: project1, title: "Mastery", category: "Web Design", year: "2024" },
  { image: project2, title: "BrandFlow", category: "Branding", year: "2024" },
  { image: project3, title: "Creative", category: "Design", year: "2022" },
];

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
  const isMobile = useIsMobile();

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
            <div className={`${circleSize} rounded-full bg-primary flex flex-col items-center justify-center`}>
              <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold uppercase text-primary-foreground tracking-tight text-center">
                Case Study
              </h2>
              <span className="font-body text-sm sm:text-lg text-primary-foreground/70 mt-1">
                {Math.round(scrollProgress * 100)}%
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
                key={`top-${i}`}
                className="relative flex-shrink-0 w-[220px] sm:w-[300px] md:w-[380px] h-[35vh] sm:h-[42vh] rounded-xl overflow-hidden group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <h3 className="font-display text-base sm:text-xl uppercase font-semibold text-foreground">
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
                key={`bottom-${i}`}
                className="relative flex-shrink-0 w-[220px] sm:w-[300px] md:w-[380px] h-[35vh] sm:h-[42vh] rounded-xl overflow-hidden group"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-background/80 to-transparent">
                  <h3 className="font-display text-base sm:text-xl uppercase font-semibold text-foreground">
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
  );
};

export default PortfolioSection;
