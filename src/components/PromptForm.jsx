import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import uploadImage from "../utils/imageUpload";

const CATEGORIES = ["Writing", "Marketing", "Coding", "Image Generation", "Productivity", "Education"];
const AI_TOOLS = ["ChatGPT", "Gemini", "Claude", "Midjourney", "DALL-E"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Pro"];

// Used by Add Prompt (User + Creator) and the Update modal in My Prompts.
// onSubmit receives the assembled prompt object; the caller decides
// whether that means POST /prompts or PATCH /prompts/:id.
const PromptForm = ({ initialValues, onSubmit, submitLabel = "Submit Prompt" }) => {
  const [uploading, setUploading] = useState(false);
  const [thumbnail, setThumbnail] = useState(initialValues?.thumbnail || "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues || {
      title: "",
      description: "",
      promptContent: "",
      category: CATEGORIES[0],
      aiTool: AI_TOOLS[0],
      tags: "",
      difficulty: "Beginner",
      visibility: "public",
    },
  });

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      setThumbnail(url);
      toast.success("Thumbnail uploaded");
    } catch {
      toast.error("Image upload failed — check VITE_IMGBB_API_KEY");
    } finally {
      setUploading(false);
    }
  };

  const submit = (data) => {
    const tags = typeof data.tags === "string"
      ? data.tags.split(",").map((t) => t.trim()).filter(Boolean)
      : data.tags;

    onSubmit({ ...data, tags, thumbnail });
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
      <div>
        <label className="font-display text-sm text-ink-muted">Prompt Title</label>
        <input
          {...register("title", { required: "Title is required" })}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
      </div>

      <div>
        <label className="font-display text-sm text-ink-muted">Description</label>
        <textarea
          {...register("description", { required: "Description is required" })}
          rows={2}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="font-display text-sm text-ink-muted">Prompt Content</label>
        <textarea
          {...register("promptContent", { required: "Prompt content is required" })}
          rows={4}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 font-mono text-sm outline-none focus:border-accent"
        />
        {errors.promptContent && <p className="mt-1 text-xs text-red-600">{errors.promptContent.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-display text-sm text-ink-muted">Category</label>
          <select {...register("category")} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="font-display text-sm text-ink-muted">AI Tool</label>
          <select {...register("aiTool")} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
            {AI_TOOLS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="font-display text-sm text-ink-muted">Difficulty</label>
          <select {...register("difficulty")} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
            {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="font-display text-sm text-ink-muted">Visibility</label>
          <select {...register("visibility")} className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm">
            <option value="public">Public</option>
            <option value="private">Private (Premium)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="font-display text-sm text-ink-muted">Tags (comma separated)</label>
        <input
          {...register("tags")}
          placeholder="seo, blogging, outline"
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="font-display text-sm text-ink-muted">Usage Instructions</label>
        <textarea
          {...register("usageInstructions")}
          rows={2}
          className="mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="font-display text-sm text-ink-muted">Thumbnail Image</label>
        <input type="file" accept="image/*" onChange={handleThumbnailChange} className="mt-1 w-full text-sm" />
        {thumbnail && <img src={thumbnail} alt="thumbnail" className="mt-2 h-20 w-20 rounded-md object-cover" />}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || uploading}
        className="mt-2 rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink hover:opacity-90 disabled:opacity-50"
      >
        {uploading ? "Uploading thumbnail…" : isSubmitting ? "Saving…" : submitLabel}
      </button>
    </form>
  );
};

export default PromptForm;
