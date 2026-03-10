import { motion } from "framer-motion";
import { Lightbulb, Clock, ClipboardCheck, DollarSign } from "lucide-react";
import aboutTeamCollab from "@/assets/about-team-collab.jpg";

const skills = [
  { icon: Lightbulb, title: "CREATIVITY", description: "Add the best talent on the market, an agile skilled management & seamless involvement" },
  { icon: Clock, title: "RELATIONSHIPS", description: "Add the best talent on the market, an agile skilled management & seamless involvement" },
  { icon: ClipboardCheck, title: "RESPONSIBILITY", description: "Add the best talent on the market, an agile skilled management & seamless involvement" },
  { icon: DollarSign, title: "COST EFFECTIVE", description: "Add the best talent on the market, an agile skilled management & seamless involvement" },
];

const EmpoweringSection = () => {
  return (
    <section className="bg-foreground py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        {/* Top: Heading + description */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 lg:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] text-background max-w-2xl"
          >
            EMPOWERING SKILLS
            <br />
            TO HELP YOU!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-sm text-background/60 max-w-xs leading-relaxed lg:pt-4"
          >
            Add the best talent on the market, an agile skilled management & seamless involvement
          </motion.p>
        </div>

        {/* Content: Skills list + Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Skills with vertical line */}
          <div className="relative pl-8 border-l border-background/20">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-12 last:mb-0 flex items-start gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-highlight/15 border border-highlight/30 flex items-center justify-center text-highlight">
                  <skill.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-background mb-2">
                    {skill.title}
                  </h3>
                  <p className="font-body text-sm text-background/50 leading-relaxed max-w-sm">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Overlapping images */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative min-h-[400px] lg:min-h-[500px]"
          >
            {/* Chart card */}
            <div className="absolute top-0 left-0 w-64 md:w-72 bg-muted/90 backdrop-blur-sm rounded-xl p-5 z-10 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-highlight/20 flex items-center justify-center">
                    <span className="text-highlight text-xs">✦</span>
                  </div>
                  <span className="font-body text-sm text-background font-medium">Weekly dinamycs</span>
                </div>
                <span className="text-background/40 text-lg">•••</span>
              </div>
              {/* Bar chart */}
              <div className="flex items-end gap-1.5 h-28 mb-3">
                {[45, 65, 30, 80, 55, 70, 40, 90, 60, 75, 50, 85].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-background/30"
                    style={{ height: `${h}%` }}
                  />
                ))}
                {/* Highlight bar */}
                <div className="flex-1 relative">
                  <div className="w-full rounded-sm bg-highlight" style={{ height: "95%" }} />
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-body text-highlight bg-highlight/20 px-1.5 py-0.5 rounded">42%</span>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-body text-background/40">
                <span>JUL 05-12</span>
                <span>JUL 13-20</span>
              </div>
            </div>

            {/* Team photo */}
            <div className="absolute top-16 right-0 left-20 md:left-28 bottom-0 rounded-xl overflow-hidden">
              <img
                src={aboutTeamCollab}
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmpoweringSection;
