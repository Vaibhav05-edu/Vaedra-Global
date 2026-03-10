import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import aboutAvatar from "@/assets/about-avatar.png";
import aboutOffice from "@/assets/about-office.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="bg-background py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        {/* ===== TOP: Label + Heading + Geometric shapes ===== */}
        <div className="relative">
          <div className="flex items-start gap-6 lg:gap-10">
            {/* 01 WHO WE ARE label */}
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-foreground font-display text-sm md:text-base uppercase tracking-widest font-semibold whitespace-nowrap pt-4"
            >
              01 WHO WE ARE
            </motion.p>

            {/* Large heading */}
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[3rem] sm:text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-bold uppercase leading-[0.9] tracking-tight text-foreground flex-1"
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
        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
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
                <img src={team1} alt="" className="w-12 h-12 rounded-full border-2 border-background object-cover" />
                <img src={team2} alt="" className="w-12 h-12 rounded-full border-2 border-background object-cover" />
                <img src={team3} alt="" className="w-12 h-12 rounded-full border-2 border-background object-cover" />
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
            <div className="w-px h-32 bg-muted-foreground/30 flex-shrink-0" />
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
          {/* Avatar + CTA grouped together */}
          <div className="relative lg:absolute lg:left-[18%] lg:-top-16 z-20 flex justify-center lg:justify-start mb-10 lg:mb-0">
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              <a
                href="#services"
                className="group relative w-36 h-36 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full border border-foreground bg-transparent flex flex-col items-center justify-center text-foreground overflow-hidden hover:border-primary hover:text-primary-foreground transition-colors duration-500 animate-[swing_3s_ease-in-out_infinite]"
              >
                <span className="absolute inset-0 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-500 origin-center" />
                <span className="relative z-10 font-display text-base md:text-lg uppercase font-bold tracking-wide leading-tight text-center">
                  EXPLORE US
                  <br />
                  MORE
                </span>
                <ArrowUpRight className="relative z-10 w-5 h-5 mt-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Avatar leaning on the button */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
              className="absolute -right-40 md:-right-52 lg:-right-60 -top-32 md:-top-44 lg:-top-52 z-30"
            >
              <img
                src={aboutAvatar}
                alt="Avatar character in tuxedo"
                className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl animate-[float_3s_ease-in-out_infinite]"
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
                  className="w-full h-72 md:h-80 lg:h-[420px] object-cover"
                />
              </div>

              {/* Overlapping info card */}
              <div className="absolute top-0 right-0 lg:-right-6 bg-card border border-border rounded-xl p-6 lg:p-8 w-56 md:w-64 lg:w-72 z-10">
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
                  <span className="font-display text-5xl lg:text-6xl font-bold text-foreground leading-none">1.8</span>
                  <span className="font-display text-2xl lg:text-3xl font-bold text-highlight leading-none mb-1">x</span>
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
