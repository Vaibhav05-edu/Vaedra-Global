import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "vaedra_exit_popup_shown";

const ExitIntentPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 5 && !sessionStorage.getItem(STORAGE_KEY)) {
      setIsOpen(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        name: "Exit Intent Lead",
        email: email.trim(),
        source: "exit_popup",
      };

      const { error } = await supabase.from("leads").insert(leadData);
      if (error) throw error;

      // Send email notification (fire & forget)
      supabase.functions.invoke("notify-lead", { body: leadData }).catch(console.error);

      toast.success("Thanks! We'll be in touch soon.");
      setEmail("");
      setIsOpen(false);
    } catch (err) {
      console.error("Exit popup submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="relative w-full max-w-md bg-card border border-border rounded-2xl p-8 text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles size={28} className="text-primary" />
              </div>
            </div>

            <h3 className="text-2xl md:text-3xl font-bold text-foreground font-teko uppercase mb-2">
              Wait! Don't Go Yet
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Get a <span className="text-primary font-semibold">free strategy call</span> with our founder. Drop your email and we'll reach out within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.slice(0, 255))}
                className="bg-background border-border text-foreground placeholder:text-muted-foreground flex-1"
                maxLength={255}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-teko uppercase tracking-wider px-6"
              >
                {isSubmitting ? "..." : "Claim"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground mt-4">No spam. Unsubscribe anytime.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;
