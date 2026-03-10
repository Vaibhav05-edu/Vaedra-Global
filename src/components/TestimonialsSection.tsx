import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    feedback:
      "Working with Arolax transformed our digital presence. Their team delivered exceptional results that exceeded our expectations. The attention to detail and creative approach set them apart.",
    rating: 5,
  },
  {
    name: "David Park",
    role: "Founder, DesignCo",
    feedback:
      "The team's expertise in web design and development is unmatched. They understood our vision perfectly and brought it to life with stunning precision and innovative solutions.",
    rating: 5,
  },
  {
    name: "Emma Williams",
    role: "Marketing Director, GrowthLab",
    feedback:
      "Arolax delivered a complete digital transformation for our brand. Their strategic thinking combined with creative excellence produced remarkable results across all channels.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-background py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-5xl md:text-7xl font-bold uppercase leading-[0.95] text-foreground mb-6"
            >
              Trusted clients testimonial
            </motion.h2>
            <p className="font-body text-sm text-muted-foreground max-w-sm leading-relaxed">
              Hear from our satisfied clients about their experience working with our team.
            </p>
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-2xl p-8 border border-border"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-highlight text-highlight" />
                  ))}
                </div>
                <p className="font-serif text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 italic">
                  "{testimonials[current].feedback}"
                </p>
                <div>
                  <p className="font-display text-xl uppercase font-semibold text-foreground">
                    {testimonials[current].name}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">
                    {testimonials[current].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-6">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
