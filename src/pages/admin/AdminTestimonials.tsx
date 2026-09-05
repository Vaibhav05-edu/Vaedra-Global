import React, { useState } from "react";
import { Plus, Trash2, Edit3, Star, Building, User, Quote, X } from "lucide-react";
import { useTestimonials, Testimonial } from "@/lib/testimonialsStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const AdminTestimonials: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields requested by user: ratings, review message, company, founder
  const [rating, setRating] = useState(5);
  const [reviewMessage, setReviewMessage] = useState("");
  const [company, setCompany] = useState("");
  const [founderName, setFounderName] = useState("");
  const [founderRole, setFounderRole] = useState("Founder & CEO");

  const resetForm = () => {
    setRating(5);
    setReviewMessage("");
    setCompany("");
    setFounderName("");
    setFounderRole("Founder & CEO");
    setEditingId(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: Testimonial) => {
    setEditingId(item.id);
    setRating(item.rating || 5);
    setReviewMessage(item.feedback);
    setCompany(item.company || "");
    setFounderName(item.name);
    setFounderRole(item.role || "CEO");
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!founderName.trim()) {
      toast.error("Please enter the founder or client's name.");
      return;
    }
    if (!company.trim()) {
      toast.error("Please enter the company name.");
      return;
    }
    if (!reviewMessage.trim()) {
      toast.error("Please enter the review message.");
      return;
    }

    if (editingId) {
      updateTestimonial(editingId, {
        name: founderName.trim(),
        role: founderRole.trim() || "Founder",
        company: company.trim(),
        feedback: reviewMessage.trim(),
        rating,
      });
      toast.success("Testimonial updated successfully!");
    } else {
      addTestimonial({
        name: founderName.trim(),
        role: founderRole.trim() || "Founder",
        company: company.trim(),
        feedback: reviewMessage.trim(),
        rating,
      });
      toast.success("New client review added to the website!");
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from ${name}?`)) {
      deleteTestimonial(id);
      toast.success("Testimonial deleted.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
            Client Testimonials Manager
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Manage verified client reviews, star ratings, and company founder quotes displayed on the homepage slider.
          </p>
        </div>

        <Button
          onClick={handleOpenCreateModal}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Testimonials Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-card border border-border/80 rounded-2xl p-6 flex flex-col justify-between group hover:border-border transition-all relative overflow-hidden"
          >
            {/* Background quote decoration */}
            <Quote className="w-20 h-20 text-foreground/5 absolute -top-2 -right-2 pointer-events-none" />

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= item.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
                <span className="text-xs font-mono text-muted-foreground ml-2">
                  {item.rating}.0 / 5.0
                </span>
              </div>

              {/* Review message */}
              <p className="font-body text-sm text-foreground/90 leading-relaxed italic mb-6">
                "{item.feedback}"
              </p>
            </div>

            {/* Author / Founder Details */}
            <div className="pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-highlight/20 border border-primary/40 flex items-center justify-center text-foreground font-display font-bold uppercase text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-display text-base font-bold uppercase text-foreground leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {item.role ? `${item.role}, ` : ""}
                    <span className="text-primary font-medium">{item.company}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEditModal(item)}
                  className="h-8 w-8 p-0 text-foreground hover:bg-secondary"
                  title="Edit testimonial"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(item.id, item.name)}
                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/30"
                  title="Delete testimonial"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
            <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-foreground">
                  {editingId ? "Edit Testimonial" : "Add Client Testimonial"}
                </h2>
                <p className="text-xs text-muted-foreground">
                  Ratings, review message, company, and founder details.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                  Star Rating (1 - 5 Stars)
                </label>
                <div className="flex items-center gap-2 p-3 bg-background/50 rounded-xl border border-border">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="p-1 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          num <= rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono text-foreground font-semibold ml-3">
                    {rating} Star{rating > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Founder / Author Name */}
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                  Founder / Client Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="e.g. Sarah Johnson"
                    value={founderName}
                    onChange={(e) => setFounderName(e.target.value)}
                    className="pl-9 bg-background/50 border-border text-foreground text-sm"
                    required
                  />
                </div>
              </div>

              {/* Company & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                    <Input
                      placeholder="e.g. TechStart Inc."
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="pl-9 bg-background/50 border-border text-foreground text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                    Role / Title
                  </label>
                  <Input
                    placeholder="e.g. CEO & Founder"
                    value={founderRole}
                    onChange={(e) => setFounderRole(e.target.value)}
                    className="bg-background/50 border-border text-foreground text-sm"
                  />
                </div>
              </div>

              {/* Review message */}
              <div>
                <label className="block text-xs font-mono uppercase text-muted-foreground mb-1.5">
                  Review Message / Feedback
                </label>
                <Textarea
                  placeholder="e.g. Working with Vaedra Global transformed our digital presence. Their team delivered exceptional results..."
                  value={reviewMessage}
                  onChange={(e) => setReviewMessage(e.target.value)}
                  rows={4}
                  className="bg-background/50 border-border text-foreground text-sm leading-relaxed"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-border text-foreground font-display uppercase tracking-wider"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider"
                >
                  {editingId ? "Update Review" : "Save Testimonial"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};
