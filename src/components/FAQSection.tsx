import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the agile manifesto address planning?",
    answer:
      "The Agile Manifesto values responding to change over following a plan. While planning is important, Agile emphasizes adaptability and iterative development to deliver value continuously.",
  },
  {
    question: "Reflects your audience's need?",
    answer:
      "Understanding your audience is key to delivering impactful digital solutions. We conduct thorough research and user testing to ensure every project aligns with your target audience's expectations.",
  },
  {
    question: "What is a statement of work in project management?",
    answer:
      "A Statement of Work (SOW) is a formal document that defines project activities, deliverables, timelines, and costs. It serves as the foundation for project execution and stakeholder alignment.",
  },
  {
    question: "When is an FAQ page appropriate?",
    answer:
      "An FAQ page is appropriate when your audience has recurring questions about your products, services, or processes. It reduces support load and improves user experience by providing instant answers.",
  },
  {
    question: "What questions belong on an FAQ page?",
    answer:
      "Include questions that are frequently asked by customers, address common concerns, clarify your services, and help users make informed decisions about working with you.",
  },
  {
    question: "Align with your brand look and feel?",
    answer:
      "We ensure every design element aligns with your brand identity, from color palettes and typography to tone of voice and visual style, creating a cohesive and memorable experience.",
  },
  {
    question: "How to become an agile project manager?",
    answer:
      "Start by understanding Agile methodologies like Scrum and Kanban. Gain certifications such as CSM or PMI-ACP, build hands-on experience, and continuously improve your leadership skills.",
  },
  {
    question: "How to manage agile teams?",
    answer:
      "Effective Agile team management involves fostering collaboration, maintaining transparency, conducting regular retrospectives, and empowering team members to make decisions and deliver value.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-[0.95] text-foreground"
            >
              Frequently
              <br />
              Asked
              <br />
              Questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-sm text-muted-foreground max-w-xs leading-relaxed mt-6"
            >
              Frequently asked question (FAQ) pages to find answers.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-border"
                >
                  <AccordionTrigger className="font-display text-base md:text-lg uppercase font-semibold text-foreground hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
