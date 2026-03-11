import { useState } from "react";
import { motion } from "framer-motion";
import { Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const LeadCaptureForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in your name and email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("leads").insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        message: formData.message.trim() || null,
        source: "contact_form",
      });

      if (error) throw error;

      toast.success("Thank you! We'll get back to you shortly.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Lead submission error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="get-quote" className="py-20 md:py-28 bg-secondary/30">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 font-teko tracking-wider uppercase">
              Free Consultation
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-teko uppercase leading-tight mb-4">
              Get a Free Quote<br />
              <span className="text-primary">For Your Project</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Tell us about your idea and we'll get back within 24 hours with a tailored plan, timeline, and estimate — completely free.
            </p>
            <div className="mt-6 flex items-center gap-2 text-primary">
              <ArrowRight size={20} />
              <span className="text-sm font-medium">No commitment required</span>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4"
          >
            <Input
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value.slice(0, 100) })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              maxLength={100}
            />
            <Input
              placeholder="Email Address *"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value.slice(0, 255) })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              maxLength={255}
            />
            <Input
              placeholder="Phone Number (optional)"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.slice(0, 20) })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground"
              maxLength={20}
            />
            <Textarea
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 1000) })}
              className="bg-background border-border text-foreground placeholder:text-muted-foreground min-h-[100px]"
              maxLength={1000}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-teko text-lg uppercase tracking-wider"
            >
              <Send size={18} className="mr-2" />
              {isSubmitting ? "Sending..." : "Get My Free Quote"}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default LeadCaptureForm;
