import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PromptForm from "../../../components/PromptForm";
import LoadingSpinner from "../../../components/LoadingSpinner";

const statusBadge = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const MyPrompts = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [analyticsPrompt, setAnalyticsPrompt] = useState(null);

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["myPrompts", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/prompts/user/${user.email}`)).data,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["myPrompts", user?.email] });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prompt? This can't be undone.")) return;
    try {
      await axiosSecure.delete(`/prompts/${id}`);
      toast.success("Prompt deleted");
      refresh();
    } catch {
      toast.error("Could not delete prompt");
    }
  };

  const handleUpdate = async (data) => {
    try {
      await axiosSecure.patch(`/prompts/${editingPrompt._id}`, data);
      toast.success("Prompt updated");
      setEditingPrompt(null);
      refresh();
    } catch {
      toast.error("Could not update prompt");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">My Prompts</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-ink-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Visibility</th>
              <th className="px-4 py-3">Copies</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-6 text-center text-ink-muted">No prompts yet.</td></tr>
            ) : prompts.map((p) => (
              <tr key={p._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{p.title}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-xs ${statusBadge[p.status] || ""}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted">{p.visibility}</td>
                <td className="px-4 py-3 font-mono text-ink-muted">{p.copyCount ?? 0}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button onClick={() => setEditingPrompt(p)} className="text-accent-ink hover:underline">Update</button>
                    <button onClick={() => setAnalyticsPrompt(p)} className="text-role hover:underline">Analytics</button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Update Prompt</h2>
              <button onClick={() => setEditingPrompt(null)} className="font-mono text-sm text-ink-muted">close</button>
            </div>
            <div className="mt-4">
              <PromptForm
                initialValues={{ ...editingPrompt, tags: (editingPrompt.tags || []).join(", ") }}
                onSubmit={handleUpdate}
                submitLabel="Save changes"
              />
            </div>
          </div>
        </div>
      )}

      {analyticsPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-surface p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-ink">Analytics</h2>
              <button onClick={() => setAnalyticsPrompt(null)} className="font-mono text-sm text-ink-muted">close</button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-ink-muted">Title:</span> {analyticsPrompt.title}</p>
              <p><span className="text-ink-muted">Status:</span> {analyticsPrompt.status}</p>
              <p><span className="text-ink-muted">Visibility:</span> {analyticsPrompt.visibility}</p>
              <p><span className="text-ink-muted">Copy count:</span> {analyticsPrompt.copyCount ?? 0}</p>
              <p><span className="text-ink-muted">Avg rating:</span> {analyticsPrompt.averageRating?.toFixed?.(1) ?? "—"}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPrompts;
