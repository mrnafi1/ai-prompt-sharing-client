import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReportModal from "../../components/ReportModal";

const PromptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [showReport, setShowReport] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: prompt, isLoading } = useQuery({
    queryKey: ["prompt", id],
    queryFn: async () => (await axiosSecure.get(`/prompts/${id}`)).data,
  });

  const { data: bookmarkStatus } = useQuery({
    queryKey: ["bookmarkCheck", id],
    queryFn: async () => (await axiosSecure.get(`/bookmarks/check/${id}`)).data,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ["promptReviews", id],
    queryFn: async () => (await axiosSecure.get(`/reviews/${id}`)).data,
  });

  if (isLoading) return <LoadingSpinner />;
  if (!prompt) return null;

  const handleCopy = async () => {
    try {
      await axiosSecure.patch(`/prompts/${id}/copy`);
      await navigator.clipboard.writeText(prompt.promptContent);
      queryClient.setQueryData(["prompt", id], (old) => ({
        ...old,
        copyCount: (old.copyCount || 0) + 1,
      }));
      toast.success("Prompt copied to clipboard");
    } catch {
      toast.error("Could not copy prompt");
    }
  };

  const handleBookmark = async () => {
    try {
      const { data } = await axiosSecure.post("/bookmarks", { promptId: id });
      queryClient.setQueryData(["bookmarkCheck", id], { bookmarked: data.bookmarked });
      toast.success(data.bookmarked ? "Prompt bookmarked" : "Bookmark removed");
    } catch {
      toast.error("Could not update bookmark");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/reviews", {
        promptId: id,
        name: user.displayName,
        email: user.email,
        rating: Number(rating),
        comment,
      });
      setComment("");
      toast.success("Review submitted");
      queryClient.invalidateQueries({ queryKey: ["promptReviews", id] });
    } catch {
      toast.error("Could not submit review");
    }
  };

  const handleReportSubmit = async ({ reason, description }) => {
    try {
      await axiosSecure.post("/reports", { promptId: id, reason, description });
      toast.success("Report submitted — our team will review it");
      setShowReport(false);
    } catch {
      toast.error("Could not submit report");
    }
  };

  const handleSubscribe = () => {
    navigate("/payment", { state: { from: location } });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <span className="rounded-full bg-role/10 px-3 py-1 font-mono text-xs text-role">
        {prompt.aiTool}
      </span>
      <h1 className="mt-3 font-display text-2xl font-semibold text-ink">{prompt.title}</h1>
      <p className="mt-2 text-sm text-ink-muted">{prompt.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted">
          {prompt.category}
        </span>
        <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted">
          {prompt.difficulty}
        </span>
        {(prompt.tags || []).map((tag) => (
          <span key={tag} className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted">
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-5">
        <p className="font-mono text-xs text-ink-muted">prompt_content</p>
        {prompt.locked ? (
          <div className="relative mt-2">
            <p className="select-none blur-sm">
              This is premium content. Subscribe to unlock the full prompt text and usage instructions
              for every private prompt on the marketplace, instantly.
            </p>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handleSubscribe}
                className="rounded-md bg-accent px-5 py-2 font-display text-sm font-medium text-ink hover:opacity-90"
              >
                Subscribe to Premium — $5
              </button>
            </div>
          </div>
        ) : (
          <pre className="mt-2 whitespace-pre-wrap font-mono text-sm text-ink">{prompt.promptContent}</pre>
        )}
      </div>

      {prompt.usageInstructions && !prompt.locked && (
        <div className="mt-4">
          <p className="font-display text-sm font-semibold text-ink">Usage instructions</p>
          <p className="mt-1 text-sm text-ink-muted">{prompt.usageInstructions}</p>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between rounded-xl border border-border bg-surface p-4">
        <div className="text-sm text-ink-muted">
          <p>by {prompt.creatorName}</p>
          <p className="font-mono text-xs">{prompt.copyCount ?? 0} copies</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleBookmark}
            className="rounded-md border border-border px-3 py-1.5 font-display text-sm text-ink hover:border-ink"
          >
            {bookmarkStatus?.bookmarked ? "Bookmarked ✓" : "Bookmark"}
          </button>
          <button
            onClick={prompt.locked ? handleSubscribe : handleCopy}
            className="rounded-md bg-accent px-3 py-1.5 font-display text-sm font-medium text-ink hover:opacity-90"
          >
            {prompt.locked ? "Unlock to copy" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-display text-sm font-semibold text-ink">Reviews & ratings</p>

        {!prompt.locked && (
          <form onSubmit={handleReviewSubmit} className="mt-3 rounded-xl border border-border bg-surface p-4">
            <div className="flex items-center gap-3">
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="rounded-md border border-border bg-paper px-2 py-1 text-sm"
              >
                {[5, 4, 3, 2, 1].map((r) => <option key={r} value={r}>{r} ★</option>)}
              </select>
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                placeholder="Share your experience with this prompt…"
                className="flex-1 rounded-md border border-border bg-paper px-3 py-2 text-sm outline-none focus:border-accent"
              />
              <button className="rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink">
                Post
              </button>
            </div>
          </form>
        )}

        <div className="mt-4 flex flex-col gap-3">
          {reviews.map((r) => (
            <div key={r._id} className="rounded-lg border border-border bg-paper p-3">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-accent-ink">{"★".repeat(r.rating)}</p>
                <p className="font-mono text-xs text-ink-muted">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-1 text-sm text-ink">{r.comment}</p>
              <p className="mt-1 font-mono text-xs text-ink-muted">{r.name} · {r.email}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setShowReport(true)}
        className="mt-6 font-mono text-xs text-ink-muted hover:text-ink"
      >
        report this prompt
      </button>

      {showReport && (
        <ReportModal onClose={() => setShowReport(false)} onSubmit={handleReportSubmit} />
      )}
    </div>
  );
};

export default PromptDetails;
