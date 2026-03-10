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
          className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold uppercase leading-[0.85] text-foreground mb-12"
        >
          Let's Talk
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-body text-lg text-muted-foreground mb-6"
        >
          Connect with the Founder
        </motion.p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10">
          <motion.a
            href="mailto:vaibhav@vaedraglobal.app"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-3xl md:text-5xl text-foreground/80 underline underline-offset-8 decoration-1 hover:text-highlight transition-colors"
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
            className="font-display text-lg uppercase tracking-wider bg-primary text-primary-foreground px-8 py-4 rounded-full hover:bg-primary/90 transition-colors"
          >
            Book a Call
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
