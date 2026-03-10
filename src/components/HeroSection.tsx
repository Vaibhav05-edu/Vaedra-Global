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
    <section id="home" className="relative min-h-screen bg-background pt-20 overflow-x-hidden">
      <div className="relative w-full px-4 sm:px-8 lg:px-12 xl:px-16 pt-4 lg:pt-8">
        <div className="flex flex-col lg:flex-row items-start">
          {/* ===== LEFT SIDE ===== */}
          <div className="relative z-10 flex-1 min-w-0">
            {/* WE ARE / SKILLED IN */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-display font-bold uppercase leading-[0.85] tracking-tight text-foreground text-[2.8rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[7.5rem] xl:text-[9rem]"
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
              className="flex items-end gap-2 sm:gap-3 md:gap-4 mt-0"
            >
              {/* WEB DESIGN block */}
              <div className="flex-shrink-0 pb-2">
                <span className="font-display text-lg sm:text-3xl md:text-[2.2rem] font-bold uppercase leading-[0.95] text-foreground block">
                  WEB
                </span>
                <span className="font-display text-lg sm:text-3xl md:text-[2.2rem] font-bold uppercase leading-[0.95] text-foreground block">
                  DESIGN
                </span>
                <div className="flex gap-1.5 mt-2">
                  <div className="w-10 sm:w-14 h-[3px] bg-primary" />
                  <div className="w-4 sm:w-6 h-[3px] bg-primary" />
                </div>
              </div>

              {/* AND */}
              <span className="font-display text-[2.8rem] sm:text-[5.5rem] md:text-[7rem] lg:text-[7.5rem] xl:text-[9rem] font-bold uppercase leading-[0.85] tracking-tight text-foreground">
                AND
              </span>

              {/* Green development circle */}
              <div className="relative w-12 h-12 sm:w-20 sm:h-20 md:w-[6.5rem] md:h-[6.5rem] rounded-full bg-primary flex items-center justify-center flex-shrink-0 mb-2 sm:mb-3 md:mb-5">
                <span
                  className="font-display text-[8px] sm:text-xs md:text-[13px] uppercase tracking-[0.15em] text-primary-foreground font-medium"
                  style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                >
                  development
                </span>
              </div>

              {/* 3D Avatar circle */}
              <div className="w-12 h-12 sm:w-20 sm:h-20 md:w-[6.5rem] md:h-[6.5rem] rounded-full bg-foreground overflow-hidden flex items-center justify-center flex-shrink-0 mb-2 sm:mb-3 md:mb-5">
                <img
                  src={heroAvatar}
                  alt="3D Avatar"
                  className="w-9 h-9 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                />
              </div>
            </motion.div>

            {/* Bottom: scroll arrow + text + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-start gap-4 sm:gap-6 mt-8 sm:mt-10 md:mt-14 lg:mt-16 ml-0 sm:ml-8 md:ml-16 lg:ml-28"
            >
              <a
                href="#about"
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-muted-foreground/40 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex-shrink-0"
              >
                <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              <div className="max-w-[300px] sm:max-w-[340px]">
                <p className="font-body text-sm sm:text-[15px] text-muted-foreground leading-[1.75]">
                  We are a full-service digital agency that builds fascinating user experiences. our team creates and exceptional UI design and functionality.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 mt-4 sm:mt-6 font-display text-sm uppercase tracking-wider text-foreground border-b border-foreground pb-1 hover:text-primary hover:border-primary transition-colors"
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
            className="relative flex-shrink-0 w-full lg:w-[420px] xl:w-[480px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] mt-8 lg:mt-0"
          >
            {/* Decorative scribble */}
            <svg
              className="absolute -left-16 top-2 w-16 h-16 text-foreground hidden lg:block"
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
              className="absolute left-0 bottom-0 w-[50%] sm:w-[55%] rounded-t-[120px] sm:rounded-t-[180px] overflow-hidden"
              style={{ height: "85%" }}
            >
              <div className="absolute inset-0 bg-destructive/50 mix-blend-multiply z-10" />
              <img
                src={heroPerson1}
                alt="Team member"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Man with tablet - rounded bottom capsule (right, overlapping) */}
            <div
              className="absolute right-0 top-0 w-[55%] sm:w-[58%] rounded-b-[120px] sm:rounded-b-[180px] overflow-hidden z-[5]"
              style={{ height: "70%" }}
            >
              <img
                src={heroPerson2}
                alt="Team member with tablet"
                className="w-full h-full object-cover"
              />
            </div>

            {/* WATCH VIDEO play button */}
            <div className="absolute z-20 flex items-center gap-2 sm:gap-3" style={{ right: "5%", top: "48%" }}>
              <button className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-background fill-background ml-0.5" />
              </button>
              <div className="text-foreground">
                <span className="font-display text-[10px] sm:text-xs uppercase font-semibold block leading-tight tracking-wider">WATCH</span>
                <span className="font-display text-[10px] sm:text-xs uppercase font-semibold block leading-tight tracking-wider">VIDEO</span>
              </div>
            </div>

            {/* Diagonal arrow button */}
            <div className="absolute z-20 hidden sm:block" style={{ right: "5%", bottom: "32%" }}>
              <a
                href="#about"
                className="w-12 h-12 rounded-full border border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              >
                <ArrowDownRight className="w-4 h-4" />
              </a>
            </div>

            {/* Customer avatars + text */}
            <div className="absolute z-20" style={{ right: "5%", bottom: "5%" }}>
              <div className="flex items-center -space-x-3 mb-2">
                <img src={team1} alt="" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background object-cover" />
                <img src={team2} alt="" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background object-cover" />
                <img src={team3} alt="" className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background object-cover" />
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                  <span className="text-foreground text-[10px] sm:text-xs font-display">+</span>
                </div>
              </div>
              <p className="text-foreground font-display text-[10px] sm:text-xs uppercase tracking-wide">
                We have <span className="text-highlight">18k+</span> customers
              </p>
              <p className="text-foreground font-display text-[10px] sm:text-xs uppercase tracking-wide">
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
