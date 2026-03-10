import { motion } from "framer-motion";
import { Box, Layers, Lightbulb, TrendingUp } from "lucide-react";
import avatarHead from "@/assets/avatar-head.png";

const services = [
  {
    num: "01",
    title: "Project\nManagement",
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    icon: Box,
  },
  {
    num: "02",
    title: "Product\nManagement",
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    icon: Layers,
  },
  {
    num: "03",
    title: "Digital\nMarketing",
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    icon: TrendingUp,
  },
  {
    num: "04",
    title: "Web\nDevelopment",
    description:
      "Creative Design team on demand that can design, build, ship and scale your real has development agency.",
    bullets: ["Mobile & Web Design", "Interation Design", "UX Research & Plan"],
    icon: Lightbulb,
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-6">
        {/* Header area */}
        <div className="relative mb-20">
          {/* Avatar peeking */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-12 z-10">
            <img
              src={avatarHead}
              alt="Avatar"
              className="w-24 md:w-32 object-contain"
            />
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] text-foreground text-center pt-16"
          >
            We provide premium
            <br />
            Arolax service
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm font-body text-sm text-muted-foreground leading-relaxed mt-8 ml-auto mr-0 md:mr-[15%]"
          >
            Our ability to combine expertise and systems thinking is what fuels
            us as a team.
          </motion.p>
        </div>

        {/* Service rows */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group grid grid-cols-1 md:grid-cols-[80px_1fr_1fr_80px] items-start md:items-center gap-6 md:gap-8 py-10 border-t border-border/30 cursor-pointer hover:bg-card/30 transition-colors px-4 -mx-4"
            >
              {/* Number */}
              <span className="font-display text-2xl md:text-3xl font-bold text-muted-foreground">
                {service.num}.
              </span>

              {/* Title */}
              <h3 className="font-display text-2xl md:text-3xl uppercase font-bold text-foreground whitespace-pre-line leading-tight">
                {service.title}
              </h3>

              {/* Description + bullets */}
              <div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </p>
                <ul className="space-y-1.5">
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="font-body text-sm text-foreground flex items-center gap-2"
                    >
                      <span className="text-highlight text-base">+</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Icon */}
              <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full border border-border/40">
                <service.icon className="w-7 h-7 text-foreground" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
