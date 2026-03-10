import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ArrowDownRight, Play } from "lucide-react";
import heroPerson1 from "@/assets/hero-person-1.jpg";
import heroPerson2 from "@/assets/hero-person-2.jpg";
import heroAvatar from "@/assets/hero-avatar.png";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-background pt-20 overflow-hidden">
      <div className="relative w-full px-8 lg:px-12 xl:px-16 pt-10 lg:pt-16">
        <div className="flex flex-col lg:flex-row">
          {/* ===== LEFT SIDE ===== */}
          <div className="relative z-10 flex-1 max-w-[750px]">
            {/* WE ARE / SKILLED IN */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display font-bold uppercase leading-[0.88] tracking-tight text-foreground text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[11rem]"
            >
              WE ARE
              <br />
              SKILLED IN
            </motion.h1>

            {/* WEB DESIGN + AND + development circle + avatar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-end gap-3 md:gap-5 mt-1"
            >
              {/* WEB DESIGN block */}
              <div className="flex-shrink-0 pb-1">
                <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-[0.95] text-foreground block">
                  WEB
                </span>
                <span className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase leading-[0.95] text-foreground block">
                  DESIGN
                </span>
                <div className="flex gap-1.5 mt-2">
                  <div className="w-14 h-[3px] bg-primary" />
                  <div className="w-6 h-[3px] bg-primary" />
                </div>
              </div>

              {/* AND */}
              <span className="font-display text-[4.5rem] sm:text-[6rem] md:text-[7.5rem] lg:text-[9rem] xl:text-[11rem] font-bold uppercase leading-[0.85] tracking-tight text-foreground">
                AND
              </span>

              {/* Green development circle */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mb-2 md:mb-4">
                <span
                  className="font-display text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.15em] text-primary-foreground font-medium"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  development
                </span>
              </div>

              {/* 3D Avatar circle */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-foreground overflow-hidden flex items-center justify-center flex-shrink-0 mb-2 md:mb-4">
                <img
                  src={heroAvatar}
                  alt="3D Avatar"
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
                />
              </div>
            </motion.div>

            {/* Bottom: scroll arrow + text + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-start gap-6 mt-20 md:mt-28 lg:mt-32 ml-8 md:ml-20 lg:ml-32"
            >
              {/* Scroll down arrow */}
              <a
                href="#about"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-muted-foreground/40 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex-shrink-0"
              >
                <ArrowDown className="w-5 h-5" />
              </a>

              {/* Description + CTA */}
              <div className="max-w-[340px]">
                <p className="font-body text-[15px] text-muted-foreground leading-[1.7]">
                  We are a full-service digital agency that builds fascinating user experiences. our team creates and exceptional UI design and functionality.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-6 font-display text-sm uppercase tracking-wider text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
                >
                  GET STARTED NOW
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* ===== RIGHT SIDE - Images ===== */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative flex-shrink-0 w-full lg:w-[480px] xl:w-[540px] h-[550px] md:h-[650px] lg:h-[750px] mt-10 lg:mt-0 lg:ml-auto"
          >
            {/* Decorative hand-drawn scribble */}
            <svg
              className="absolute -left-20 top-0 w-20 h-20 text-foreground hidden lg:block"
              viewBox="0 0 80 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            >
              <path d="M20 60 C25 30, 45 15, 55 25 C65 35, 50 55, 40 45" />
              <path d="M55 25 C58 18, 52 15, 55 25" />
              <path d="M55 25 C60 28, 58 22, 55 25" />
            </svg>

            {/* Red-tinted tall capsule image (left, behind) */}
            <div
              className="absolute left-0 bottom-0 w-[52%] rounded-t-[200px] overflow-hidden"
              style={{ height: "88%" }}
            >
              <div className="absolute inset-0 bg-destructive/50 mix-blend-multiply z-10" />
              <img
                src={heroPerson1}
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Man with tablet - rounded bottom capsule (right, front) */}
            <div
              className="absolute right-0 top-0 w-[55%] rounded-b-[200px] overflow-hidden z-[5]"
              style={{ height: "72%" }}
            >
              <img
                src={heroPerson2}
                alt="Team member with tablet"
                className="w-full h-full object-cover"
              />
            </div>

            {/* WATCH VIDEO play button — positioned at intersection */}
            <div className="absolute z-20 flex items-center gap-3" style={{ right: "0", top: "48%" }}>
              <button className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
                <Play className="w-5 h-5 text-background fill-background ml-0.5" />
              </button>
              <div className="text-foreground">
                <span className="font-display text-xs md:text-sm uppercase font-semibold block leading-tight tracking-wider">
                  WATCH
                </span>
                <span className="font-display text-xs md:text-sm uppercase font-semibold block leading-tight tracking-wider">
                  VIDEO
                </span>
              </div>
            </div>

            {/* Diagonal arrow button */}
            <div className="absolute z-20" style={{ right: "0", bottom: "28%" }}>
              <a
                href="#about"
                className="w-14 h-14 rounded-full border border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <ArrowDownRight className="w-5 h-5" />
              </a>
            </div>

            {/* Customer avatars stack + text */}
            <div className="absolute z-20" style={{ right: "0", bottom: "8%" }}>
              <div className="flex items-center -space-x-3 mb-3">
                <img
                  src={team1}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
                <img
                  src={team2}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
                <img
                  src={team3}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
                <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                  <span className="text-foreground text-sm font-display">+</span>
                </div>
              </div>
              <p className="text-foreground font-display text-sm uppercase tracking-wide">
                We have <span className="text-highlight">18k+</span> customers
              </p>
              <p className="text-foreground font-display text-sm uppercase tracking-wide">
                word-wide
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
