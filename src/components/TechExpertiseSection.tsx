import { motion } from "framer-motion";
import { Globe, Atom, Hexagon, Zap, Link2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const technologies = [
  { icon: Globe, name: "WORDPRESS" },
  { icon: Atom, name: "REACT.JS" },
  { icon: Hexagon, name: "NODE.JS" },
  { icon: Zap, name: "FLUTTER" },
  { icon: Link2, name: "REDUX" },
];

const TechExpertiseSection = () => {
  const isMobile = useIsMobile();
  const ringSize = isMobile ? 90 : 180;
  const overlap = isMobile ? 20 : 40;
  const iconSize = isMobile ? "w-8 h-8" : "w-16 h-16 md:w-20 md:h-20";
  const totalWidth = technologies.length * ringSize - (technologies.length - 1) * overlap;

  return (
    <section className="bg-[hsl(0,0%,10%)] py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-center text-foreground text-base md:text-xl mb-10 md:mb-16 italic"
        >
          Our Vaedra Global Technology Expertise includes
        </motion.p>

        <div className="flex justify-center">
          <div
            className="relative"
            style={{ width: totalWidth, height: ringSize + (isMobile ? 36 : 60) }}
          >
            {technologies.map((tech, i) => {
              const left = i * (ringSize - overlap);
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute flex flex-col items-center"
                  style={{ left, width: ringSize }}
                >
                  <div
                    className="rounded-full border border-foreground/20 flex items-center justify-center"
                    style={{ width: ringSize, height: ringSize }}
                  >
                    <tech.icon className={`${iconSize} text-foreground`} strokeWidth={1.2} />
                  </div>
                  <span className="font-display text-[10px] md:text-sm font-bold uppercase tracking-wider text-foreground mt-2 md:mt-4 whitespace-nowrap">
                    {tech.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechExpertiseSection;
