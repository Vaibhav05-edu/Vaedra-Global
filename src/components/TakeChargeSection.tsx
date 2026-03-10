import { motion } from "framer-motion";
import aboutAvatar from "@/assets/about-avatar.png";

const teams = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="20" />
        <path d="M16 28c4-6 12-6 16 0" strokeLinecap="round" />
        <circle cx="24" cy="18" r="4" />
      </svg>
    ),
    title: "DEDICATED\nTEAM",
    description:
      "Find the best fit engineers led by senior, seasoned, and skilled our tech- lead.",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="20" />
        <path d="M14 24h20M24 14v20" strokeLinecap="round" />
        <circle cx="24" cy="24" r="6" />
      </svg>
    ),
    title: "PRODUCT\nTEAM",
    description:
      "Get top-notch service from an experienced Product Designer Manager team.",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="20" cy="16" r="6" />
        <circle cx="32" cy="20" r="4" />
        <path d="M8 36c0-8 8-12 12-12s8 2 12 4" strokeLinecap="round" />
      </svg>
    ),
    title: "END-TO-END\nTEAM",
    description:
      "Hire an elite squad of leading have professionals to turn idea into an ready-to-market product",
  },
];

const TakeChargeSection = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        {/* Avatar peeking from top */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-4"
        >
          <img
            src={aboutAvatar}
            alt="Avatar peeking"
            className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg -mt-8"
          />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-display text-[2.5rem] sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-bold uppercase leading-[0.95] tracking-tight text-center"
        >
          TAKE CHARGE STEERING
          <br />
          YOUR PRODUCT
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="font-body text-base md:text-lg max-w-md ml-auto mr-0 md:mr-16 lg:mr-24 mt-8 mb-16 lg:mb-24 leading-relaxed"
        >
          Our ability to combine expertise and systems thinking is what fuels us
          as a team.
        </motion.p>

        {/* 3-Column Teams */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
          {teams.map((team, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="px-6 lg:px-10 py-8 md:py-0 group cursor-pointer"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">{team.icon}</div>
              <h3 className="font-display text-xl md:text-2xl font-bold uppercase leading-tight whitespace-pre-line mb-4 transition-colors duration-300 group-hover:text-background">
                {team.title}
              </h3>
              <p className="font-body text-sm md:text-base leading-relaxed opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                {team.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TakeChargeSection;
