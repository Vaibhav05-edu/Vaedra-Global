import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-lg md:text-xl uppercase tracking-widest text-muted-foreground mb-6"
          >
            We are Skilled in
          </motion.p>

          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold uppercase leading-[0.85] tracking-tight text-foreground"
            >
              Web Design
            </motion.h1>

            <div className="flex items-center gap-4 md:gap-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="font-display text-2xl md:text-4xl uppercase text-muted-foreground"
              >
                and
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="bg-primary text-primary-foreground px-6 py-2 rounded-full"
              >
                <span className="font-display text-2xl md:text-4xl uppercase font-semibold">
                  Development
                </span>
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mt-16 gap-8"
          >
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-px h-16 bg-muted-foreground/30" />
                <span className="font-body text-xs uppercase tracking-wider text-muted-foreground">Scroll</span>
              </div>
              <p className="max-w-xs font-body text-sm text-muted-foreground leading-relaxed">
                Consumers today rely heavily on digital means to research products. We build engaging digital experiences.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right">
                <span className="text-highlight font-display text-lg">We have 18k+</span>
                <p className="font-display text-xl uppercase text-foreground">customers worldwide</p>
              </div>
              <a
                href="#about"
                className="group flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-6 py-4 font-display text-lg uppercase tracking-wide hover:bg-primary/90 transition-colors"
              >
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
