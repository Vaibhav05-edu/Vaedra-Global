import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import aboutAvatar from "@/assets/about-avatar.png";
import aboutOffice from "@/assets/about-office.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="bg-background py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* ===== TOP: Label + Heading + Geometric shapes ===== */}
        <div className="relative">
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6 lg:gap-10">
            {/* 01 WHO WE ARE label */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-foreground font-display text-xs sm:text-sm md:text-base uppercase tracking-widest font-semibold whitespace-nowrap pt-2 sm:pt-4"
            >
              01 WHO WE ARE
            </motion.p>

            {/* Large heading */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[2rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-bold uppercase leading-[0.9] tracking-tight text-foreground flex-1"
            >
              HAVE A BRILLIANT
              <br />
              IDEA BOOST THE{" "}
              <span className="text-highlight">GROWTH</span>
              <br />
              <span className="text-highlight">DEVELOPMENT</span>{" "}
              AGENCY
              <br />
              YOUR BRANDING!
            </motion.h2>
          </div>

          {/* Geometric shapes - top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
           className="absolute right-4 lg:right-0 top-0 lg:top-4 hidden md:flex items-center gap-0"
          >
            {/* Lime green triangle (left half - pointing right) */}
            <div
              className="w-0 h-0"
              style={{
                borderTop: "50px solid transparent",
                borderBottom: "50px solid transparent",
                borderRight: "45px solid hsl(var(--primary))",
              }}
            />
            {/* White triangle (right half - pointing left) */}
            <div
              className="w-0 h-0"
              style={{
                borderTop: "60px solid transparent",
                borderBottom: "60px solid transparent",
                borderLeft: "60px solid hsl(var(--foreground))",
              }}
            />
          </motion.div>
        </div>

        {/* ===== MIDDLE: Avatars + Text + CTA Circle ===== */}
        <div className="mt-10 sm:mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          {/* Left: Avatars + text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 flex items-start gap-6"
          >
            {/* Avatars */}
            <div>
              <div className="flex -space-x-3 mb-4">
                <img src={team1} alt="Team member 1" loading="lazy" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background object-cover" />
                <img src={team2} alt="Team member 2" loading="lazy" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background object-cover" />
                <img src={team3} alt="Team member 3" loading="lazy" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-background object-cover" />
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                happy
                <br />
                clients of
                <br />
                our Services
              </p>
            </div>

            {/* Vertical divider */}
            <div className="w-px h-24 sm:h-32 bg-muted-foreground/30 flex-shrink-0" />
          </motion.div>

          {/* Center: Paragraph text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4"
          >
            <p className="font-serif text-base lg:text-lg text-muted-foreground leading-relaxed italic">
              Consumers today rely heavily on digital means to research products. We research a brand of blend engaging with it, according to the meanwhile, 51% of consumers.
            </p>
          </motion.div>

          {/* Right: empty space for CTA positioning (handled below) */}
          <div className="lg:col-span-5" />
        </div>

        {/* ===== CTA Circle + Avatar + Bottom Images ===== */}
        <div className="relative mt-8 lg:mt-0">
          {/* Avatar + CTA grouped */}
          <div className="relative flex justify-center lg:justify-start min-h-[260px] sm:min-h-[320px] md:min-h-[400px] lg:min-h-[480px] mb-10 md:mb-10 lg:mb-0">
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="absolute left-2 sm:left-4 md:left-8 lg:left-12 bottom-8 md:bottom-0 z-10"
            >
              <a
                href="#services"
                className="group relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full border border-foreground bg-transparent flex flex-col items-center justify-center text-foreground overflow-hidden hover:border-primary hover:text-primary-foreground transition-colors duration-500 animate-[swing_3s_ease-in-out_infinite]"
              >
                <span className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
                <span className="relative z-10 font-display text-xs sm:text-base md:text-lg uppercase font-bold tracking-wide leading-tight text-center">
                  EXPLORE US
                  <br />
                  MORE
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 mt-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              className="absolute left-16 sm:left-28 md:left-36 lg:left-40 -bottom-4 sm:-bottom-12 md:-bottom-24 lg:-bottom-28 z-20"
            >
              <img
                src={aboutAvatar}
                alt="Avatar character in tuxedo leaning"
                loading="lazy"
                className="w-44 h-44 sm:w-72 sm:h-72 md:w-[380px] md:h-[380px] lg:w-[480px] lg:h-[480px] object-contain drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
              />
            </motion.div>
          </div>

          {/* Bottom images row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-10 lg:mt-16">
            {/* Spacer for avatar area */}
            <div className="lg:col-span-5 lg:col-start-1" />

            {/* Right image + overlapping card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="lg:col-span-5 lg:col-start-7 relative lg:-mt-4"
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={aboutOffice}
                  alt="Modern creative office"
                  loading="lazy"
                  className="w-full h-56 sm:h-72 md:h-80 lg:h-[420px] object-cover"
                />
              </div>

              {/* Overlapping info card */}
              <div className="relative mt-4 sm:absolute sm:top-0 sm:right-0 lg:-right-6 bg-card border border-border rounded-xl p-4 sm:p-6 lg:p-8 w-full sm:w-56 md:w-64 lg:w-72 z-10">
                <div className="flex gap-0.5 mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-highlight">
                    <path d="M9 4L15 12L9 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-highlight -ml-2">
                    <path d="M9 4L15 12L9 20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                  Make your business prosper with our great team of experts. We'll make your.
                </p>
                <div className="flex items-end gap-1">
                  <span className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-none">1.8</span>
                  <span className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-highlight leading-none mb-1">x</span>
                </div>
                <p className="font-display text-sm uppercase tracking-wider text-foreground font-semibold mt-2">
                  FASTER SERVICE
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
