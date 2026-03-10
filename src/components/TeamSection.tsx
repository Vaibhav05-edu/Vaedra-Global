import { motion } from "framer-motion";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";
import team4 from "@/assets/team-4.jpg";

const team = [
  { image: team1, name: "Alex Chen", role: "Lead Developer" },
  { image: team2, name: "Sofia Martinez", role: "UI/UX Designer" },
  { image: team3, name: "Lucas Wright", role: "Creative Director" },
  { image: team4, name: "Maya Torres", role: "UX Researcher" },
];

const TeamSection = () => {
  return (
    <section className="bg-secondary py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] text-foreground"
          >
            Meet our{" "}
            <span className="text-highlight">skilled</span> team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm font-body text-sm text-muted-foreground leading-relaxed"
          >
            Our ability to combine expertise and systems thinking is what fuels us as a team.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden mb-4 bg-card border border-border">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-display text-xl md:text-2xl uppercase font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
