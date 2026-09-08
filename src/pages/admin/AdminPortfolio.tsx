import React, { useState } from "react";
import {
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  X,
  Upload,
  Layers,
  Sparkles,
  CheckCircle2,
  Tag,
  Calendar,
  Briefcase,
  Eye,
  Info,
  Loader2,
  Globe,
} from "lucide-react";
import {
  usePortfolioProjects,
  ProjectDetail,
  uploadPortfolioImage,
  compressImage,
} from "@/lib/portfolioStore";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
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

export const AdminPortfolio: React.FC = () => {
  const {
    projects,
    addPortfolioProject,
    updatePortfolioProject,
    deletePortfolioProject,
    movePortfolioProjectOrder,
  } = usePortfolioProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [previewProject, setPreviewProject] = useState<ProjectDetail | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [client, setClient] = useState("");
  const [timeline, setTimeline] = useState("3 Months");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompressingImages, setIsCompressingImages] = useState(false);

  // Multi-image management
  const [coverImage, setCoverImage] = useState(project1);
  const [imageList, setImageList] = useState<string[]>([project1]);
  const [customImageUrl, setCustomImageUrl] = useState("");

  // Deliverables & Tech stack
  const [deliverablesText, setDeliverablesText] = useState("");
  const [techStackText, setTechStackText] = useState("");

  // Metrics (3 pairs)
  const [metric1Label, setMetric1Label] = useState("Active Users");
  const [metric1Value, setMetric1Value] = useState("100K+");
  const [metric2Label, setMetric2Label] = useState("Client Satisfaction");
  const [metric2Value, setMetric2Value] = useState("99%");
  const [metric3Label, setMetric3Label] = useState("Performance Lift");
  const [metric3Value, setMetric3Value] = useState("+45%");

  const resetForm = () => {
    setTitle("");
    setCategory("Web Design");
    setYear(new Date().getFullYear().toString());
    setClient("");
    setTimeline("3 Months");
    setTagline("");
    setDescription("");
    setLiveUrl("");
    setIsSubmitting(false);
    setIsCompressingImages(false);
    setCoverImage(project1);
    setImageList([project1]);
    setCustomImageUrl("");
    setDeliverablesText("Responsive web architecture\nCustom UI/UX component design\nPerformance optimization");
    setTechStackText("React, TypeScript, Tailwind CSS");
    setMetric1Label("Active Users");
    setMetric1Value("100K+");
    setMetric2Label("Client Satisfaction");
    setMetric2Value("99%");
    setMetric3Label("Performance Lift");
    setMetric3Value("+45%");
    setEditingProjectId(null);
  };

  const handleOpenCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: ProjectDetail) => {
    setEditingProjectId(proj.id);
    setTitle(proj.title);
    setCategory(proj.category);
    setYear(proj.year || new Date().getFullYear().toString());
    setClient(proj.client || "");
    setTimeline(proj.timeline || "3 Months");
    setTagline(proj.tagline || "");
    setDescription(proj.description || "");
    setLiveUrl(proj.liveUrl || "");
    setIsSubmitting(false);
    setIsCompressingImages(false);

    const allImages = proj.images && proj.images.length > 0 ? proj.images : [proj.image];
    setImageList(allImages);
    setCoverImage(proj.image || allImages[0]);

    setDeliverablesText((proj.deliverables || []).join("\n"));
    setTechStackText((proj.techStack || []).join(", "));

    const m = proj.metrics || [];
    setMetric1Label(m[0]?.label || "Active Users");
    setMetric1Value(m[0]?.value || "100K+");
    setMetric2Label(m[1]?.label || "Client Satisfaction");
    setMetric2Value(m[1]?.value || "99%");
    setMetric3Label(m[2]?.label || "Performance Lift");
    setMetric3Value(m[2]?.value || "+45%");

    setIsModalOpen(true);
  };

  // Image Upload handler with Supabase Storage upload & client compression
  const handleMultipleFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsCompressingImages(true);
    const toastId = toast.loading(`Uploading and optimizing ${files.length} screenshot(s)...`);

    try {
      const fileArray = Array.from(files);
      const uploadedImages: string[] = [];

      for (const file of fileArray) {
        if (file.size > 15 * 1024 * 1024) {
          toast.error(`"${file.name}" is over 15MB. Please choose an image under 15MB.`);
          continue;
        }
        const uploadedUrl = await uploadPortfolioImage(file, "project");
        if (uploadedUrl) {
          uploadedImages.push(uploadedUrl);
        }
      }

      if (uploadedImages.length > 0) {
        setImageList((prev) => {
          const merged = [...prev, ...uploadedImages];
          if (!coverImage && merged.length > 0) setCoverImage(merged[0]);
          return merged;
        });
        toast.success(`Uploaded ${uploadedImages.length} image(s) to gallery.`, { id: toastId });
      } else {
        toast.dismiss(toastId);
      }
    } catch (err: unknown) {
      console.error("Image upload error:", err);
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      toast.error("Failed to process images: " + errMsg, { id: toastId });
    } finally {
      setIsCompressingImages(false);
      e.target.value = "";
    }
  };

  const handleAddCustomUrl = () => {
    if (!customImageUrl.trim()) return;
    setImageList((prev) => [...prev, customImageUrl.trim()]);
    if (!coverImage) setCoverImage(customImageUrl.trim());
    setCustomImageUrl("");
    toast.success("Image URL added to gallery!");
  };

  const handleAddPreset = (url: string) => {
    setImageList((prev) => [...prev, url]);
    if (!coverImage) setCoverImage(url);
    toast.success("Preset image added to gallery!");
  };

  const handleRemoveImage = (index: number) => {
    if (imageList.length <= 1) {
      toast.error("Portfolio project must have at least one image.");
      return;
    }
    const targetUrl = imageList[index];
    const updated = imageList.filter((_, i) => i !== index);
    setImageList(updated);
    if (coverImage === targetUrl) {
      setCoverImage(updated[0]);
    }
    toast.info("Image removed from gallery.");
  };

  const handleMoveImage = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= imageList.length) return;
    const copy = [...imageList];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    setImageList(copy);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a project title.");
      return;
    }

    // Ensure at least one image with graceful fallback to project1
    const effectiveImages = imageList.length > 0 ? imageList : [project1];
    const effectiveCover = coverImage || effectiveImages[0];

    setIsSubmitting(true);

    try {
      const deliverables = deliverablesText
        .split("\n")
        .map((d) => d.trim())
        .filter(Boolean);

      const techStack = techStackText
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const metrics = [
        { label: metric1Label.trim() || "Active Users", value: metric1Value.trim() || "100K+" },
        { label: metric2Label.trim() || "Client Satisfaction", value: metric2Value.trim() || "99%" },
        { label: metric3Label.trim() || "Performance", value: metric3Value.trim() || "Top Tier" },
      ];

      const projectPayload: Omit<ProjectDetail, "id"> & { id?: string } = {
        title: title.trim(),
        category: category.trim() || "Digital Engineering",
        year: year.trim() || new Date().getFullYear().toString(),
        client: client.trim() || "Vaedra Client Partner",
        timeline: timeline.trim() || "3 Months",
        tagline: tagline.trim() || `${title.trim()} - High performance digital solution.`,
        description: description.trim() || `${title.trim()} custom development and design showcase by Vaedra Global.`,
        image: effectiveCover,
        images: effectiveImages,
        deliverables: deliverables.length > 0 ? deliverables : ["Custom Software Architecture", "UI/UX Interface Design"],
        techStack: techStack.length > 0 ? techStack : ["React", "TypeScript", "Tailwind CSS"],
        metrics,
        liveUrl: liveUrl.trim() || undefined,
      };

      if (editingProjectId) {
        updatePortfolioProject(editingProjectId, projectPayload);
        toast.success(`Project "${title}" updated successfully!`);
      } else {
        addPortfolioProject(projectPayload);
        toast.success(`Project "${title}" published to Portfolio!`);
      }

      setIsModalOpen(false);
      resetForm();
    } catch (error: unknown) {
      console.error("Error publishing portfolio project:", error);
      const errMsg = error instanceof Error ? error.message : "Storage error. Your form data is preserved.";
      toast.error("Failed to save project: " + errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string, projTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${projTitle}" from portfolio?`)) {
      deletePortfolioProject(id);
      toast.success(`"${projTitle}" deleted.`);
    }
  };

  const filteredProjects = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold uppercase text-foreground flex items-center gap-2.5">
            <Briefcase className="w-7 h-7 text-primary" />
            Portfolio Projects Manager
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-0.5">
            Full dynamic control over the Case Study section: reorder projects, edit copy, and manage multi-screen galleries.
          </p>
        </div>

        <Button
          onClick={handleOpenCreateModal}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-sm shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Portfolio Project
        </Button>
      </div>

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-card/60 p-4 rounded-xl border border-border">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search projects by title or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-background/80 border-border text-xs sm:text-sm font-mono"
          />
        </div>
        <div className="text-xs font-mono text-muted-foreground self-start sm:self-auto">
          Showing <span className="text-primary font-bold">{filteredProjects.length}</span> of {projects.length} live projects
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProjects.map((proj, idx) => {
          const totalScreens = proj.images && proj.images.length > 0 ? proj.images.length : 1;
          const isMobileApp =
            proj.category.toLowerCase().includes("mobile") ||
            (proj.techStack && proj.techStack.some((t) => t.toLowerCase().includes("flutter") || t.toLowerCase().includes("react native")));

          return (
            <div
              key={proj.id}
              className="bg-card border border-border/80 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-[0_0_25px_rgba(202,254,0,0.12)]"
            >
              <div>
                {/* Visual Cover Preview */}
                <div className="aspect-[16/10] w-full relative overflow-hidden bg-secondary">
                  <img
                    src={proj.image || (proj.images && proj.images[0])}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category & Screens badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                    <span className="bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-white border border-white/10 font-medium">
                      {proj.category}
                    </span>
                    {isMobileApp && (
                      <span className="bg-primary/90 text-primary-foreground px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase">
                        Mobile App
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-mono text-white border border-white/10 flex items-center gap-1.5 shadow">
                    <ImageIcon className="w-3.5 h-3.5 text-primary" />
                    <span>{totalScreens} screen{totalScreens > 1 ? "s" : ""}</span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-primary font-bold">
                    Order #{idx + 1}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-muted-foreground mb-1.5">
                    <span>{proj.client || "Client Partner"}</span>
                    <span>{proj.year}</span>
                  </div>

                  <h3 className="font-display text-xl uppercase font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {proj.title}
                  </h3>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {proj.tagline || proj.description}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {(proj.techStack || []).slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md bg-secondary/80 text-[10px] font-mono text-muted-foreground border border-border/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {(proj.techStack || []).length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground">
                        +{(proj.techStack || []).length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Actions Bar: Reorder, Preview, Edit, Delete */}
              <div className="p-4 pt-3 border-t border-border/60 bg-card/40 flex items-center justify-between gap-2">
                {/* Reorder Buttons */}
                <div className="flex items-center gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={idx === 0}
                    onClick={() => movePortfolioProjectOrder(proj.id, "up")}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    title="Move project up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={idx === projects.length - 1}
                    onClick={() => movePortfolioProjectOrder(proj.id, "down")}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground disabled:opacity-30"
                    title="Move project down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Actions: Preview, Edit, Delete */}
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setPreviewProject(proj)}
                    className="h-8 px-2.5 text-xs text-foreground hover:bg-secondary border-border"
                    title="Preview Case Study modal & gallery"
                  >
                    <Eye className="w-3.5 h-3.5 mr-1 text-primary" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenEditModal(proj)}
                    className="h-8 px-2.5 text-xs text-foreground hover:bg-secondary border-border"
                    title="Edit project"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(proj.id, proj.title)}
                    className="h-8 px-2.5 text-xs text-destructive hover:bg-destructive/10 border-destructive/30"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16 bg-card/30 border border-dashed border-border rounded-2xl p-8">
          <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
          <h3 className="font-display text-lg uppercase font-bold text-foreground">No Projects Found</h3>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
            {searchQuery ? "No projects matched your search criteria." : "You currently have no portfolio projects published."}
          </p>
          <Button
            onClick={handleOpenCreateModal}
            className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90 font-display uppercase tracking-wider text-xs"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add First Project
          </Button>
        </div>
      )}

      {/* CREATE / EDIT PROJECT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm p-3 sm:p-6">
          <div className="min-h-full flex items-center justify-center py-6">
            <div className="relative w-full max-w-3xl bg-card border border-border rounded-2xl p-5 sm:p-8 shadow-2xl space-y-6">
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold uppercase text-foreground flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    {editingProjectId ? "Edit Portfolio Project" : "Add New Portfolio Project"}
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Configure project details, multiple screenshot assets, deliverables, and metrics.
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
                {/* SECTION 1: BASIC INFORMATION */}
                <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">1</span>
                    Basic Details
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono text-muted-foreground uppercase">Project Title *</label>
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. AppVerse Mobile Platform"
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase">Category / Industry *</label>
                      <Input
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder="e.g. Mobile App, Web Design, E-Commerce"
                        required
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase">Release Year *</label>
                      <Input
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        placeholder="e.g. 2024"
                        required
                        className="bg-background border-border font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase">Client Name</label>
                      <Input
                        value={client}
                        onChange={(e) => setClient(e.target.value)}
                        placeholder="e.g. AppVerse Technologies Inc."
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase">Project Timeline</label>
                      <Input
                        value={timeline}
                        onChange={(e) => setTimeline(e.target.value)}
                        placeholder="e.g. 4 Months"
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-mono text-muted-foreground uppercase">Short Tagline / Summary</label>
                      <Input
                        value={tagline}
                        onChange={(e) => setTagline(e.target.value)}
                        placeholder="e.g. Next-generation mobile ecosystem for digital creators and modern professionals."
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-primary" />
                          Live Project URL (Optional)
                        </label>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Website, web app, or App Store link
                        </span>
                      </div>
                      <Input
                        value={liveUrl}
                        onChange={(e) => setLiveUrl(e.target.value)}
                        placeholder="https://example.com or https://apps.apple.com/..."
                        className="bg-background border-border font-mono text-xs sm:text-sm"
                      />
                      <p className="text-[10px] font-mono text-muted-foreground/70">
                        When provided, an interactive "Visit Live Project" button appears on the case study showcase.
                      </p>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: MULTI-IMAGE & SCREENSHOT GALLERY */}
                <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">2</span>
                      Project Screenshots & Gallery ({imageList.length} loaded)
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Multiple images support app screens & responsive mockups
                    </span>
                  </div>

                  {/* Current Gallery Items list */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-muted-foreground uppercase block">Current Screenshots</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {imageList.map((imgUrl, i) => {
                        const isCover = coverImage === imgUrl;
                        return (
                          <div
                            key={i}
                            className={`relative rounded-xl overflow-hidden border transition-all group bg-card ${
                              isCover ? "border-primary ring-2 ring-primary/30" : "border-border"
                            }`}
                          >
                            <div className="aspect-[4/3] w-full bg-secondary overflow-hidden">
                              <img src={imgUrl} alt={`Screenshot ${i + 1}`} className="w-full h-full object-cover" />
                            </div>

                            {/* Badge */}
                            <div className="absolute top-1.5 left-1.5">
                              {isCover ? (
                                <span className="bg-primary text-primary-foreground px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase">
                                  Cover
                                </span>
                              ) : (
                                <span className="bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-[9px] font-mono">
                                  #{i + 1}
                                </span>
                              )}
                            </div>

                            {/* Controls Overlay */}
                            <div className="p-1.5 bg-background/90 flex items-center justify-between gap-1 border-t border-border/50 text-[10px]">
                              {!isCover ? (
                                <button
                                  type="button"
                                  onClick={() => setCoverImage(imgUrl)}
                                  className="text-[10px] font-mono text-primary hover:underline"
                                >
                                  Make Cover
                                </button>
                              ) : (
                                <span className="text-[10px] font-mono text-muted-foreground">Main</span>
                              )}

                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={i === 0}
                                  onClick={() => handleMoveImage(i, "up")}
                                  className="text-muted-foreground hover:text-foreground disabled:opacity-20 p-0.5"
                                  title="Shift left"
                                >
                                  ←
                                </button>
                                <button
                                  type="button"
                                  disabled={i === imageList.length - 1}
                                  onClick={() => handleMoveImage(i, "down")}
                                  className="text-muted-foreground hover:text-foreground disabled:opacity-20 p-0.5"
                                  title="Shift right"
                                >
                                  →
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(i)}
                                  className="text-destructive hover:text-destructive/80 p-0.5 ml-1"
                                  title="Delete screenshot"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Add Images Methods */}
                  <div className="space-y-3 pt-2 border-t border-border/40">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Method A: Upload Local Files */}
                      <div className="p-3 rounded-lg border border-border/60 bg-card/50 space-y-2">
                        <label className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                          <Upload className="w-3.5 h-3.5 text-primary" />
                          Upload Screenshots (Single or Multiple)
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleMultipleFilesUpload}
                          className="w-full text-xs text-muted-foreground file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 file:cursor-pointer"
                        />
                        <p className="text-[10px] font-mono text-muted-foreground">
                          JPG, PNG, WebP up to 3MB per image. Select multiple to batch upload.
                        </p>
                      </div>

                      {/* Method B: URL input */}
                      <div className="p-3 rounded-lg border border-border/60 bg-card/50 space-y-2">
                        <label className="text-xs font-mono font-medium text-foreground flex items-center gap-1.5">
                          <ImageIcon className="w-3.5 h-3.5 text-primary" />
                          Add Image by Web URL
                        </label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="https://images.unsplash.com/..."
                            value={customImageUrl}
                            onChange={(e) => setCustomImageUrl(e.target.value)}
                            className="bg-background text-xs font-mono"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={handleAddCustomUrl}
                            className="text-xs font-mono"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Method C: Preset Quick Pick */}
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-mono text-muted-foreground block">
                        Or add from agency project presets:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_PHOTOS.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleAddPreset(p.url)}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md border border-border bg-secondary/50 hover:border-primary/50 text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                          >
                            <img src={p.url} alt="" className="w-3.5 h-3.5 rounded-full object-cover" />
                            + {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: DETAILED DESCRIPTION */}
                <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">3</span>
                    Detailed Project Story / Description
                  </div>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Provide full narrative about the problem, our architecture, and the outcome..."
                    className="bg-background border-border text-sm leading-relaxed"
                  />
                </div>

                {/* SECTION 4: DELIVERABLES & TECH STACK */}
                <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">4</span>
                    Scope & Tech Stack
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase block">
                        Key Deliverables (One per line)
                      </label>
                      <Textarea
                        value={deliverablesText}
                        onChange={(e) => setDeliverablesText(e.target.value)}
                        rows={4}
                        placeholder={"Cross-platform iOS architecture\nCloud database sync\nDesign system components"}
                        className="bg-background border-border text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-muted-foreground uppercase block">
                        Technologies Used (Comma-separated)
                      </label>
                      <Textarea
                        value={techStackText}
                        onChange={(e) => setTechStackText(e.target.value)}
                        rows={4}
                        placeholder="Flutter, React Native, TypeScript, Node.js, PostgreSQL, Figma"
                        className="bg-background border-border text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* SECTION 5: METRICS & KPIS */}
                <div className="p-4 rounded-xl bg-background/50 border border-border/80 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[10px]">5</span>
                    Key Performance Metrics / Results
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-2.5 rounded-lg border border-border/60 bg-card/40 space-y-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">Metric 1</span>
                      <Input
                        placeholder="Label (e.g. Active Users)"
                        value={metric1Label}
                        onChange={(e) => setMetric1Label(e.target.value)}
                        className="bg-background text-xs"
                      />
                      <Input
                        placeholder="Value (e.g. 150K+)"
                        value={metric1Value}
                        onChange={(e) => setMetric1Value(e.target.value)}
                        className="bg-background text-xs font-bold font-mono text-primary"
                      />
                    </div>

                    <div className="p-2.5 rounded-lg border border-border/60 bg-card/40 space-y-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">Metric 2</span>
                      <Input
                        placeholder="Label (e.g. Rating)"
                        value={metric2Label}
                        onChange={(e) => setMetric2Label(e.target.value)}
                        className="bg-background text-xs"
                      />
                      <Input
                        placeholder="Value (e.g. 4.9 ★)"
                        value={metric2Value}
                        onChange={(e) => setMetric2Value(e.target.value)}
                        className="bg-background text-xs font-bold font-mono text-primary"
                      />
                    </div>

                    <div className="p-2.5 rounded-lg border border-border/60 bg-card/40 space-y-1.5">
                      <span className="text-[10px] font-mono text-muted-foreground uppercase">Metric 3</span>
                      <Input
                        placeholder="Label (e.g. Performance)"
                        value={metric3Label}
                        onChange={(e) => setMetric3Label(e.target.value)}
                        className="bg-background text-xs"
                      />
                      <Input
                        placeholder="Value (e.g. +45%)"
                        value={metric3Value}
                        onChange={(e) => setMetric3Value(e.target.value)}
                        className="bg-background text-xs font-bold font-mono text-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit & Cancel Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="border-border text-foreground hover:bg-secondary text-xs uppercase tracking-wider font-display"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting || isCompressingImages}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs uppercase tracking-wider font-display font-bold shadow-md min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        Publishing...
                      </>
                    ) : isCompressingImages ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                        Optimizing...
                      </>
                    ) : editingProjectId ? (
                      "Save Changes"
                    ) : (
                      "Publish Project"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Preview Case Study Modal */}
      {previewProject && (
        <ProjectDetailModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}
    </div>
  );
};
