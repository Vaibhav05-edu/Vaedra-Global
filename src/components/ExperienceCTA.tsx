import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const ExperienceCTA = () => {
  return (
    <section className="bg-background py-8 lg:py-12">
      <div className="container mx-auto px-6">
        <div className="relative bg-card rounded-2xl overflow-hidden min-h-[400px] md:min-h-[480px] flex flex-col items-center justify-center px-8 py-20">
          {/* Decorative neon ribbon */}
          <div className="absolute top-0 right-0 w-[300px] md:w-[450px] h-[400px] md:h-[500px] pointer-events-none overflow-hidden">
            <svg
              viewBox="0 0 450 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <path
                d="M350 -50 C 350 100, 500 150, 400 250 C 300 350, 500 400, 450 550"
                stroke="hsl(var(--primary))"
                strokeWidth="80"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M380 -80 C 380 70, 530 120, 430 220 C 330 320, 530 370, 480 520"
                stroke="hsl(var(--primary))"
                strokeWidth="60"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Content */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] text-foreground text-center relative z-10 max-w-4xl"
          >
            Let's start your
            <br />
            experience with Vaedra Global
          </motion.h2>

          <motion.a
            href="https://cal.com/vaedra-global-agency"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative z-10 mt-10 inline-flex items-center gap-3 font-display text-sm uppercase tracking-wider text-foreground border-b-2 border-foreground pb-2 hover:text-primary hover:border-primary transition-colors"
          >
            Let's get in touch
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceCTA;
