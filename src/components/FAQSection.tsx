import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does your agency offer?",
    answer:
      "We offer a full range of digital services including web design & development, branding & identity, UI/UX design, mobile app development, digital marketing, and SEO optimization.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on scope and complexity. A standard website takes 4–8 weeks, while larger projects like custom web applications or full brand overhauls may take 3–6 months.",
  },
  {
    question: "What is your design and development process?",
    answer:
      "We follow a structured process: Discovery & Research → Strategy & Planning → Design & Prototyping → Development → Testing & QA → Launch & Ongoing Support. We keep you involved at every stage.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "Every project is unique. We provide custom quotes based on your requirements, goals, and timeline. Contact us for a free consultation and detailed estimate.",
  },
  {
    question: "Do you offer ongoing support after launch?",
    answer:
      "Yes, we offer maintenance and support packages that include performance monitoring, security updates, content updates, and technical support to keep your site running smoothly.",
  },
  {
    question: "Can you work with our existing brand guidelines?",
    answer:
      "Absolutely. We seamlessly integrate with your existing brand identity, ensuring consistency across all digital touchpoints while elevating the overall design quality.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We work with modern technologies including React, TypeScript, Next.js, Tailwind CSS, Node.js, and various CMS platforms. We choose the best stack based on your project's needs.",
  },
  {
    question: "How do we get started?",
    answer:
      "Simply reach out through our contact form or email. We'll schedule a free discovery call to discuss your project goals, timeline, and budget, then provide a detailed proposal.",
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
