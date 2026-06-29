import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const statusBadge = {
  pending: "bg-amber-100 text-amber-700",
  resolved: "bg-green-100 text-green-700",
  dismissed: "bg-gray-100 text-gray-600",
};

const ReportedPrompts = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["allReports"],
    queryFn: async () => (await axiosSecure.get("/reports")).data,
  });

  const handleAction = async (id, action) => {
    try {
      await axiosSecure.patch(`/reports/${id}`, { action });
      toast.success(
        action === "remove" ? "Prompt removed" : action === "warn" ? "Creator warned" : "Report dismissed"
      );
      queryClient.invalidateQueries({ queryKey: ["allReports"] });
    } catch {
      toast.error("Could not update report");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Reported Prompts</h1>

      <div className="mt-6 flex flex-col gap-3">
        {reports.length === 0 ? (
          <p className="font-mono text-sm text-ink-muted">No reports yet.</p>
        ) : reports.map((r) => (
          <div key={r._id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display text-sm font-semibold text-ink">
                  {r.prompt?.title || "(prompt deleted)"}
                </p>
                <p className="mt-1 font-mono text-xs text-ink-muted">
                  reason: {r.reason} · reported by {r.reportedBy}
                </p>
                {r.description && <p className="mt-2 text-sm text-ink-muted">{r.description}</p>}
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-xs ${statusBadge[r.status] || ""}`}>
                {r.status}
              </span>
            </div>

            {r.status === "pending" && (
              <div className="mt-3 flex gap-2 text-xs">
                <button onClick={() => handleAction(r._id, "remove")} className="text-red-600 hover:underline">
                  Remove Prompt
                </button>
                <button onClick={() => handleAction(r._id, "warn")} className="text-amber-700 hover:underline">
                  Warn Creator
                </button>
                <button onClick={() => handleAction(r._id, "dismiss")} className="text-ink-muted hover:underline">
                  Dismiss / Not harmful
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportedPrompts;
