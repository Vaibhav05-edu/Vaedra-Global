import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when section top hits viewport bottom, 1 when section bottom hits viewport top
      const totalScrollDistance = sectionHeight + windowHeight;
      const scrolled = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Max horizontal translate in pixels
  const maxTranslate = 600;
  const topTranslate = scrollProgress * maxTranslate; // moves right
  const bottomTranslate = -(scrollProgress * maxTranslate); // moves left

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="relative bg-background py-24 lg:py-32 overflow-hidden"
    >
      {/* Center circle with CASE STUDY */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-primary flex items-center justify-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-primary-foreground tracking-tight">
            Case Study
          </h2>
        </div>
      </div>

      {/* Top row - scrolls right */}
      <div className="mb-4">
        <div
          className="flex gap-4 will-change-transform"
          style={{ transform: `translateX(${topTranslate}px)`, marginLeft: "-200px" }}
        >
          {topRow.map((project, i) => (
            <div
              key={`top-${i}`}
              className="relative flex-shrink-0 w-[300px] md:w-[380px] h-[85vh] rounded-xl overflow-hidden group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <h3 className="font-display text-xl uppercase font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {project.category} — {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row - scrolls left */}
      <div>
        <div
          className="flex gap-4 will-change-transform justify-end"
          style={{ transform: `translateX(${bottomTranslate}px)`, marginRight: "-200px" }}
        >
          {bottomRow.map((project, i) => (
            <div
              key={`bottom-${i}`}
              className="relative flex-shrink-0 w-[300px] md:w-[380px] h-[85vh] rounded-xl overflow-hidden group"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <h3 className="font-display text-xl uppercase font-semibold text-foreground">
                  {project.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground">
                  {project.category} — {project.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
