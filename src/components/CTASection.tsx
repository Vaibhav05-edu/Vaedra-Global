import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="contact" className="bg-background py-16 sm:py-24 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-2xl sm:text-3xl md:text-4xl uppercase text-foreground mb-4"
        >
          👋 Hello!
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold uppercase leading-[0.85] text-foreground mb-8 sm:mb-12"
        >
          Let's Talk
        </motion.h2>
        <div className="relative mb-8 sm:mb-10">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-body text-base sm:text-lg text-muted-foreground inline-flex items-center gap-3"
          >
            Connect with the Founder
            <motion.svg
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="w-12 sm:w-16 h-10 sm:h-12 -mb-6"
              viewBox="0 0 64 48"
              fill="none"
            >
              <motion.path
                d="M4 4 C 20 4, 40 8, 48 20 C 56 32, 44 44, 32 44"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              />
              <motion.path
                d="M36 38 L32 46 L26 40"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 0.3 }}
              />
            </motion.svg>
          </motion.p>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-10">
          <motion.a
            href="mailto:vaibhav@vaedraglobal.app"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg sm:text-2xl md:text-4xl lg:text-5xl text-foreground/80 underline underline-offset-4 sm:underline-offset-8 decoration-1 hover:text-highlight transition-colors break-all sm:break-normal"
          >
            vaibhav@vaedraglobal.app
          </motion.a>
          <motion.a
            href="https://cal.com/vaedra-global-agency"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="font-display text-base sm:text-lg uppercase tracking-wider bg-primary text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-primary/90 transition-colors"
          >
            Book a Call
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
