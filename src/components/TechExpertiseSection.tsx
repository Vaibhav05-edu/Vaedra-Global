import { motion } from "framer-motion";
import { Globe, Atom, Hexagon, Zap, Link2 } from "lucide-react";

const technologies = [
  { icon: Globe, name: "WORDPRESS" },
  { icon: Atom, name: "REACT.JS" },
  { icon: Hexagon, name: "NODE.JS" },
  { icon: Zap, name: "FLUTTER" },
  { icon: Link2, name: "REDUX" },
];

const RING_SIZE = 180; // px
const OVERLAP = 40; // px overlap between rings

const TechExpertiseSection = () => {
  const totalWidth = technologies.length * RING_SIZE - (technologies.length - 1) * OVERLAP;

  return (
    <section className="bg-[hsl(0,0%,10%)] py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-center text-foreground text-lg md:text-xl mb-16 italic"
        >
          Our Vaedra Global Technology Expertise includes
        </motion.p>

        <div className="flex justify-center">
          <div
            className="relative"
            style={{ width: totalWidth, height: RING_SIZE + 60 }}
          >
            {technologies.map((tech, i) => {
              const left = i * (RING_SIZE - OVERLAP);
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="absolute flex flex-col items-center"
                  style={{ left, width: RING_SIZE }}
                >
                  <div
                    className="rounded-full border border-foreground/20 flex items-center justify-center"
                    style={{ width: RING_SIZE, height: RING_SIZE }}
                  >
                    <tech.icon className="w-16 h-16 md:w-20 md:h-20 text-foreground" strokeWidth={1.2} />
                  </div>
                  <span className="font-display text-sm font-bold uppercase tracking-wider text-foreground mt-4 whitespace-nowrap">
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
