import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Pagination from "../../../components/Pagination";

const statusBadge = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const AdminAllPrompts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [rejecting, setRejecting] = useState(null);
  const [feedback, setFeedback] = useState("");
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["adminPrompts", status, page],
    queryFn: async () =>
      (await axiosSecure.get("/prompts/admin/all", { params: { status, page, limit } })).data,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["adminPrompts", status, page] });

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/prompts/approve/${id}`);
      toast.success("Prompt approved");
      refresh();
    } catch {
      toast.error("Could not approve prompt");
    }
  };

  const handleReject = async () => {
    try {
      await axiosSecure.patch(`/prompts/reject/${rejecting}`, { feedback });
      toast.success("Prompt rejected");
      setRejecting(null);
      setFeedback("");
      refresh();
    } catch {
      toast.error("Could not reject prompt");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this prompt?")) return;
    try {
      await axiosSecure.delete(`/prompts/${id}`);
      toast.success("Prompt deleted");
      refresh();
    } catch {
      toast.error("Could not delete prompt");
    }
  };

  const handleFeature = async (id) => {
    try {
      await axiosSecure.patch(`/prompts/feature/${id}`);
      toast.success("Featured status toggled");
      refresh();
    } catch {
      toast.error("Could not update featured status");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const prompts = data?.prompts || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-xl font-semibold text-ink">All Prompts</h1>
        <select
          value={status}
          onChange={(e) => { setStatus(e.target.value); setPage(1); }}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-ink-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Creator</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {prompts.map((p) => (
              <tr key={p._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{p.title}</td>
                <td className="px-4 py-3 text-ink-muted">{p.creatorEmail}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 font-mono text-xs ${statusBadge[p.status] || ""}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-ink-muted">{p.featured ? "★" : "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2 text-xs">
                    {p.status !== "approved" && (
                      <button onClick={() => handleApprove(p._id)} className="text-green-700 hover:underline">Approve</button>
                    )}
                    {p.status !== "rejected" && (
                      <button onClick={() => setRejecting(p._id)} className="text-amber-700 hover:underline">Reject</button>
                    )}
                    <button onClick={() => handleFeature(p._id)} className="text-role hover:underline">
                      {p.featured ? "Unfeature" : "Feature"}
                    </button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      {rejecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
          <div className="w-full max-w-sm rounded-xl bg-surface p-6">
            <h2 className="font-display text-lg font-semibold text-ink">Reject with feedback</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={3}
              placeholder="Why is this prompt being rejected?"
              className="mt-3 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setRejecting(null)} className="font-mono text-sm text-ink-muted">cancel</button>
              <button onClick={handleReject} className="rounded-md bg-accent px-4 py-1.5 font-display text-sm font-medium text-ink">
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAllPrompts;
