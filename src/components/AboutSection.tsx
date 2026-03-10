import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import aboutImg from "@/assets/about-wide.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-highlight font-display text-lg uppercase tracking-widest mb-4"
            >
              01 — Who We Are
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] text-foreground mb-8"
            >
              Have a brilliant idea to boost the{" "}
              <span className="text-highlight">Growth & Development</span> of your branding!
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-6 mt-8"
            >
              <div className="bg-card rounded-2xl p-6 border border-border">
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  Consumers today rely heavily on digital means to research products. We research and blend engaging digital experiences that connect brands with their audiences.
                </p>
                <a
                  href="#services"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 font-display text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  Explore Us More
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src={aboutImg}
                alt="Creative agency workspace"
                className="w-full h-64 lg:h-80 object-cover"
              />
            </motion.div>

            <div className="grid grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <span className="font-display text-5xl font-bold text-highlight">32k+</span>
                <p className="font-display text-lg uppercase text-muted-foreground mt-2">
                  Happy clients of our services
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-card rounded-2xl p-6 border border-border"
              >
                <span className="font-display text-5xl font-bold text-foreground">
                  1.8<span className="text-highlight">x</span>
                </span>
                <p className="font-display text-lg uppercase text-muted-foreground mt-2">
                  Faster Service Delivery
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
