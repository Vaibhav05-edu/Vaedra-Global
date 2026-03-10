import { motion } from "framer-motion";
import { Palette, Code, Megaphone, BarChart3 } from "lucide-react";

const services = [
  {
    num: "01",
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive and visually stunning interfaces that delight users and drive engagement.",
  },
  {
    num: "02",
    icon: Code,
    title: "Web Development",
    description: "Building high-performance, scalable web applications using cutting-edge technologies.",
  },
  {
    num: "03",
    icon: Megaphone,
    title: "Digital Marketing",
    description: "Strategic digital campaigns that amplify your brand reach and maximize ROI.",
  },
  {
    num: "04",
    icon: BarChart3,
    title: "SEO Optimization",
    description: "Data-driven strategies to improve visibility and organic search rankings.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] text-foreground"
            >
              We <span className="text-highlight">provide</span> premium service
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm font-body text-sm text-muted-foreground leading-relaxed"
          >
            Our ability to combine expertise and systems thinking is what fuels us as a team.
          </motion.p>
        </div>

        <div className="space-y-0">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-8 border-t border-border hover:bg-card/50 transition-colors px-4 -mx-4 rounded-lg cursor-pointer"
            >
              <span className="font-display text-xl text-muted-foreground">{service.num}.</span>
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-highlight group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display text-3xl md:text-4xl uppercase font-semibold text-foreground flex-1">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
