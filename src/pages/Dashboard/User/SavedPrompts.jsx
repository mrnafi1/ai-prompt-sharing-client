import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const SavedPrompts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ["bookmarks", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/bookmarks/${user.email}`)).data,
  });

  const handleRemove = async (promptId) => {
    try {
      await axiosSecure.post("/bookmarks", { promptId });
      toast.success("Bookmark removed");
      queryClient.invalidateQueries({ queryKey: ["bookmarks", user?.email] });
    } catch {
      toast.error("Could not remove bookmark");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Saved Prompts</h1>

      {bookmarks.length === 0 ? (
        <p className="mt-6 font-mono text-sm text-ink-muted">no saved prompts yet.</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((b) => (
            <div key={b._id} className="rounded-xl border border-border bg-surface p-4">
              <p className="font-display text-sm font-semibold text-ink">{b.prompt.title}</p>
              <p className="mt-1 font-mono text-xs text-ink-muted">{b.prompt.aiTool} · {b.prompt.category}</p>
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => navigate(`/prompt/${b.promptId}`)}
                  className="rounded-md border border-border px-3 py-1.5 font-display text-xs text-ink"
                >
                  View Details
                </button>
                <button
                  onClick={() => handleRemove(b.promptId)}
                  className="rounded-md border border-border px-3 py-1.5 font-display text-xs text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPrompts;
