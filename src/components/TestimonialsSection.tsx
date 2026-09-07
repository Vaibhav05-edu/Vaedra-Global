import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ExternalLink, ShieldCheck } from "lucide-react";

import { useTestimonials } from "@/lib/testimonialsStore";

const getReviewLabel = (url?: string) => {
  if (!url) return "Verify Review";
  const lower = url.toLowerCase();
  if (lower.includes("google") || lower.includes("maps.app")) return "View on Google";
  if (lower.includes("clutch")) return "View on Clutch";
  if (lower.includes("trustpilot")) return "View on Trustpilot";
  if (lower.includes("linkedin")) return "View on LinkedIn";
  return "Verify Review";
};

const TestimonialsSection = () => {
  const { testimonials } = useTestimonials();
  const [current, setCurrent] = useState(0);

  const safeIndex = testimonials.length > 0 ? current % testimonials.length : 0;
  const activeItem = testimonials[safeIndex];

  const next = () => {
    if (testimonials.length) setCurrent((c) => (c + 1) % testimonials.length);
  };
  const prev = () => {
    if (testimonials.length) setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-background py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl sm:text-5xl md:text-7xl font-bold uppercase leading-[0.95] text-foreground mb-4 sm:mb-6"
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
                className="bg-card rounded-2xl p-5 sm:p-8 border border-border"
              >
                {activeItem ? (
                  <>
                    <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                      <div className="flex gap-1">
                        {Array.from({ length: activeItem.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-highlight text-highlight" />
                        ))}
                      </div>

                      {activeItem.reviewUrl && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-primary uppercase tracking-wider font-semibold">
                          <ShieldCheck className="w-3 h-3" />
                          Verified Client
                        </span>
                      )}
                    </div>

                    <p className="font-serif text-base sm:text-lg md:text-xl text-foreground/90 leading-relaxed mb-6 sm:mb-8 italic">
                      "{activeItem.feedback}"
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-border/60">
                      <div>
                        <p className="font-display text-lg sm:text-xl uppercase font-semibold text-foreground">
                          {activeItem.name}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          {activeItem.role}
                          {activeItem.company ? ` • ${activeItem.company}` : ""}
                        </p>
                      </div>

                      {activeItem.reviewUrl && (
                        <a
                          href={activeItem.reviewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-200 group/btn self-start sm:self-auto shadow-sm"
                          title="Open original verified review"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-primary group-hover/btn:text-primary-foreground transition-colors" />
                          <span>{getReviewLabel(activeItem.reviewUrl)}</span>
                          <ExternalLink className="w-3 h-3 text-primary group-hover/btn:text-primary-foreground transition-colors" />
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground">No testimonials available.</p>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-3 mt-4 sm:mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
