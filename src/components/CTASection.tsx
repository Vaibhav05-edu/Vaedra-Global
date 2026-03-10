import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section id="contact" className="bg-background py-24 lg:py-40">
      <div className="container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl md:text-4xl uppercase text-foreground mb-4"
        >
          👋 Hello!
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold uppercase leading-[0.85] text-foreground mb-8"
        >
          Let's Talk
        </motion.h2>
        <motion.a
          href="mailto:hello@example.com"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-3xl md:text-5xl text-foreground/80 underline underline-offset-8 decoration-1 hover:text-highlight transition-colors"
        >
          hello@example.com
        </motion.a>
      </div>
    </section>
  );
};

export default CTASection;
