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
      <div className="container mx-auto px-6 lg:px-12 pt-10 lg:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Left Content */}
          <div className="lg:col-span-7 relative z-10">
            {/* Main Typography */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="font-display font-bold uppercase leading-[0.9] tracking-tight text-foreground">
                <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem]">
                  WE ARE
                </span>
                <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem]">
                  SKILLED IN
                </span>
              </h1>
            </motion.div>

            {/* Web Design + AND + Development row */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-end gap-4 md:gap-6 mt-2"
            >
              {/* Web Design with underline */}
              <div className="flex flex-col">
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-[0.9] text-foreground">
                  WEB
                </span>
                <span className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase leading-[0.9] text-foreground">
                  DESIGN
                </span>
                <div className="flex gap-1 mt-2">
                  <div className="w-12 h-1 bg-primary" />
                  <div className="w-6 h-1 bg-primary" />
                </div>
              </div>

              {/* AND */}
              <span className="font-display text-7xl sm:text-8xl md:text-9xl lg:text-[8rem] xl:text-[10rem] font-bold uppercase leading-[0.85] tracking-tight text-foreground">
                AND
              </span>

              {/* Development circle + avatar */}
              <div className="flex items-center gap-2 mb-4 md:mb-8">
                {/* Green circle with rotated "development" */}
                <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-primary flex items-center justify-center">
                  <span
                    className="font-display text-xs md:text-sm uppercase tracking-widest text-primary-foreground"
                    style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                  >
                    development
                  </span>
                </div>

                {/* 3D Avatar */}
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-foreground overflow-hidden flex items-center justify-center">
                  <img
                    src={heroAvatar}
                    alt="3D Avatar"
                    className="w-16 h-16 md:w-24 md:h-24 object-contain"
                  />
                </div>
              </div>
            </motion.div>

            {/* Bottom left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-start gap-6 mt-16 md:mt-24"
            >
              {/* Scroll down arrow */}
              <a
                href="#about"
                className="flex items-center justify-center w-12 h-12 rounded-full border border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-foreground transition-colors flex-shrink-0 mt-1"
              >
                <ArrowDown className="w-5 h-5" />
              </a>

              {/* Description */}
              <div className="max-w-sm">
                <p className="font-body text-base text-muted-foreground leading-relaxed">
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

          {/* Right Content - Images */}
          <div className="lg:col-span-5 relative mt-10 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative h-[500px] md:h-[600px] lg:h-[700px]"
            >
              {/* Decorative scribble/arrow SVG */}
              <svg
                className="absolute -top-4 -left-16 w-24 h-24 text-foreground z-10 hidden lg:block"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M30 70 C40 30, 60 20, 70 30 C80 40, 60 60, 50 50" />
                <path d="M50 50 C55 45, 60 48, 55 55" />
              </svg>

              {/* Red-tinted image */}
              <div className="absolute left-0 bottom-0 w-[55%] h-[85%] rounded-t-full overflow-hidden">
                <div className="absolute inset-0 bg-destructive/40 mix-blend-multiply z-10" />
                <img
                  src={heroPerson1}
                  alt="Team member"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Circular image */}
              <div className="absolute right-0 top-0 w-[55%] h-[65%] rounded-b-full overflow-hidden">
                <img
                  src={heroPerson2}
                  alt="Team member with tablet"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Play button */}
              <div className="absolute right-0 top-[28%] flex items-center gap-3 z-20">
                <button className="w-16 h-16 rounded-full bg-foreground flex items-center justify-center hover:scale-105 transition-transform">
                  <Play className="w-5 h-5 text-background fill-background ml-1" />
                </button>
                <div className="text-foreground">
                  <span className="font-display text-sm uppercase font-semibold block leading-tight">WATCH</span>
                  <span className="font-display text-sm uppercase font-semibold block leading-tight">VIDEO</span>
                </div>
              </div>

              {/* Bottom right: diagonal arrow */}
              <div className="absolute right-0 bottom-[30%] z-20">
                <a
                  href="#about"
                  className="w-14 h-14 rounded-full border border-muted-foreground/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                >
                  <ArrowDownRight className="w-5 h-5" />
                </a>
              </div>

              {/* Customer avatars + text */}
              <div className="absolute right-0 bottom-[8%] z-20">
                <div className="flex items-center -space-x-3 mb-2">
                  <img src={team1} alt="" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                  <img src={team2} alt="" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                  <img src={team3} alt="" className="w-10 h-10 rounded-full border-2 border-background object-cover" />
                  <div className="w-10 h-10 rounded-full border-2 border-background bg-secondary flex items-center justify-center">
                    <span className="text-foreground text-sm font-display">+</span>
                  </div>
                </div>
                <p className="text-foreground font-display text-sm uppercase">
                  We have <span className="text-highlight">18k+</span> customers
                </p>
                <p className="text-foreground font-display text-sm uppercase">word-wide</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
