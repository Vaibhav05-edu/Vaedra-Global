import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Trash2, Edit3, ExternalLink, Image as ImageIcon, Sparkles, BookOpen, Clock, X, Upload } from "lucide-react";
import { useJournalPosts, JournalPost } from "@/lib/journalStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";
import aboutOffice from "@/assets/about-office.jpg";
import teamCollab from "@/assets/about-team-collab.jpg";

const PRESET_PHOTOS = [
  { name: "Tech Project 1", url: project1 },
  { name: "Tech Project 2", url: project2 },
  { name: "Mobile App 3", url: project3 },
  { name: "E-Commerce 4", url: project4 },
  { name: "Agency Office", url: aboutOffice },
  { name: "Team Collab", url: teamCollab },
];

export const AdminJournals: React.FC = () => {
  const { posts, addJournalPost, updateJournalPost, deleteJournalPost } = useJournalPosts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPostSlug, setEditingPostSlug] = useState<string | null>(null);

  // Form State with the 3 required sections: Headlines, Photo, Body
  const [headlines, setHeadlines] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [photoUrl, setPhotoUrl] = useState(project1);
  const [bodyContent, setBodyContent] = useState("");
  const [readTime, setReadTime] = useState("5 min read");

  const resetForm = () => {
    setHeadlines("");
    setExcerpt("");
    setPhotoUrl(project1);
    setBodyContent("");
    setReadTime("5 min read");
    setEditingPostSlug(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (post: JournalPost) => {
    setEditingPostSlug(post.slug);
    setHeadlines(post.title);
    setExcerpt(post.excerpt || "");
    setPhotoUrl(post.image);
    setBodyContent(Array.isArray(post.content) ? post.content.join("\n\n") : (post.content as any) || "");
    setReadTime(post.readTime || "5 min read");
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 3MB for base64 storage)
    if (file.size > 3 * 1024 * 1024) {
      toast.error("File is too large. Please select an image under 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setPhotoUrl(event.target.result as string);
        toast.success("Image uploaded!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!headlines.trim()) {
      toast.error("Please enter a headline/title for the journal.");
      return;
    }

    if (!bodyContent.trim()) {
      toast.error("Please enter the body content for the journal.");
      return;
    }

    // Split body into paragraphs
    const paragraphs = bodyContent
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);

    const generatedExcerpt =
      excerpt.trim() ||
      (paragraphs[0]?.length > 140 ? paragraphs[0].slice(0, 140) + "..." : paragraphs[0]) ||
      "Latest insights from the engineering team at Vaedra Global.";

    if (editingPostSlug) {
      updateJournalPost(editingPostSlug, {
        title: headlines.trim(),
        excerpt: generatedExcerpt,
        image: photoUrl,
        content: paragraphs,
        readTime,
      });
      toast.success("Journal post updated successfully!");
    } else {
      addJournalPost({
        title: headlines.trim(),
        excerpt: generatedExcerpt,
        image: photoUrl,
        content: paragraphs,
        readTime,
      });
      toast.success("New journal published! It is now live on the website.");
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleDelete = (slug: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteJournalPost(slug);
      toast.success("Journal deleted.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground">
            Journal / Blog Manager
          </h1>
          <p className="font-body text-sm text-muted-foreground">
            Publish articles to the public website's Journal Insight section and article reader.
          </p>
        </div>

        <Button
          onClick={handleOpenCreateModal}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Journal Post
        </Button>
      </div>

      {/* Grid of Journal Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.slug}
            className="bg-card border border-border/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-border transition-all"
          >
            <div>
              <div className="aspect-[16/9] w-full relative overflow-hidden bg-secondary">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-white flex items-center gap-1">
                  <Clock className="w-3 h-3 text-primary" />
                  {post.readTime}
                </div>
              </div>

              <div className="p-5">
                <span className="text-[11px] font-mono text-muted-foreground uppercase">{post.date}</span>
                <h3 className="font-display text-lg uppercase font-bold text-foreground mt-1 mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-border/50 flex items-center justify-between mt-4">
              <Link
                to={`/blog/${post.slug}`}
                target="_blank"
                className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
              >
                View Article <ExternalLink className="w-3 h-3" />
              </Link>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleOpenEditModal(post)}
                  className="h-8 px-2.5 text-xs text-foreground hover:bg-secondary"
                  title="Edit post"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(post.slug, post.title)}
                  className="h-8 px-2.5 text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
                  title="Delete post"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-4 sm:p-6">
          <div className="min-h-full flex items-center justify-center py-6 sm:py-10">
            <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-foreground">
                    {editingPostSlug ? "Edit Journal Post" : "Add New Journal"}
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Complete the 3 required sections: Headlines, Photo, and Body.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground p-1.5 rounded-lg hover:bg-secondary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* SECTION 1: HEADLINES */}
              <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">1</span>
                    Section 1: Headlines
                  </label>
                  <span className="text-[11px] text-muted-foreground">Main Title & Summary</span>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                    Headline / Article Title
                  </label>
                  <Input
                    placeholder="e.g. How AI Agents Are Transforming Enterprise Operations in 2026"
                    value={headlines}
                    onChange={(e) => setHeadlines(e.target.value)}
                    className="bg-card border-border text-foreground font-display text-base tracking-wide h-11 focus-visible:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                    Short Excerpt / Teaser (optional)
                  </label>
                  <Input
                    placeholder="Brief 1-2 sentence preview for cards on the homepage"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="bg-card border-border text-foreground text-xs"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                      Read Time Estimate
                    </label>
                    <Input
                      placeholder="e.g. 6 min read"
                      value={readTime}
                      onChange={(e) => setReadTime(e.target.value)}
                      className="bg-card border-border text-foreground text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: PHOTO */}
              <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</span>
                    Section 2: Photo
                  </label>
                  <span className="text-[11px] text-muted-foreground">Cover Image</span>
                </div>

                {/* Photo Preview & Options */}
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="w-full sm:w-40 aspect-[16/9] sm:aspect-square rounded-lg border border-border overflow-hidden bg-secondary flex-shrink-0">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ImageIcon className="w-8 h-8 opacity-40" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                        Image URL (or paste external image link)
                      </label>
                      <Input
                        placeholder="https://images.unsplash.com/..."
                        value={photoUrl.startsWith("data:") ? "(Uploaded local image)" : photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                        className="bg-card border-border text-foreground text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                        Or Upload Image from Laptop
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer py-2 px-3 rounded-lg border border-dashed border-border hover:border-primary transition-colors text-xs text-muted-foreground">
                        <Upload className="w-4 h-4 text-primary" />
                        <span>Choose image file (PNG, JPG, WebP)</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-muted-foreground mb-1">
                        Or Choose from Agency Library:
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_PHOTOS.map((preset) => (
                          <button
                            type="button"
                            key={preset.name}
                            onClick={() => setPhotoUrl(preset.url)}
                            className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all border ${
                              photoUrl === preset.url
                                ? "bg-primary text-primary-foreground border-primary"
                                : "bg-secondary text-foreground/80 border-border hover:border-primary/50"
                            }`}
                          >
                            {preset.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION 3: BODY */}
              <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">3</span>
                    Section 3: Body Content
                  </label>
                  <span className="text-[11px] text-muted-foreground">Full Article Paragraphs</span>
                </div>

                <div>
                  <Textarea
                    placeholder="Write your article body here... Tip: Press enter twice to separate into multiple paragraphs."
                    value={bodyContent}
                    onChange={(e) => setBodyContent(e.target.value)}
                    rows={8}
                    className="bg-card border-border text-foreground font-body text-sm leading-relaxed focus-visible:ring-primary"
                    required
                  />
                </div>
                <div className="flex justify-between items-center text-[11px] text-muted-foreground font-mono">
                  <span>Separate paragraphs with empty line</span>
                  <span>{bodyContent.trim() ? bodyContent.trim().split(/\s+/).length : 0} words</span>
                </div>
              </div>

              {/* Action Buttons */}
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
                  {editingPostSlug ? "Save Changes" : "Publish Journal"}
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
