import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

const projects = [
  { image: project1, title: "Mastery", category: "Web Design", year: "2024" },
  { image: project2, title: "BrandFlow", category: "Branding", year: "2024" },
  { image: project3, title: "AppVerse", category: "Mobile App", year: "2023" },
  { image: project4, title: "ShopElite", category: "E-Commerce", year: "2023" },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-7xl font-bold uppercase text-foreground">
            Case Study
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href="#"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-display text-2xl md:text-3xl uppercase font-semibold text-foreground">
                      {project.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground">
                      {project.category} — {project.year}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
