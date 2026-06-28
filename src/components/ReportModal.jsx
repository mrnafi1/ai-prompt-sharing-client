import { useState } from "react";

const REASONS = ["Inappropriate Content", "Spam", "Copyright Violation", "Other"];

const ReportModal = ({ onClose, onSubmit }) => {
  const [reason, setReason] = useState(REASONS[0]);
  const [description, setDescription] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-sm rounded-xl bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">Report this prompt</h2>
          <button onClick={onClose} className="font-mono text-sm text-ink-muted">close</button>
        </div>

        <div className="mt-4">
          <label className="font-display text-sm text-ink-muted">Reason</label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm"
          >
            {REASONS.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="mt-3">
          <label className="font-display text-sm text-ink-muted">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-border bg-paper px-3 py-2 text-sm"
          />
        </div>

        <button
          onClick={() => onSubmit({ reason, description })}
          className="mt-4 w-full rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink hover:opacity-90"
        >
          Submit report
        </button>
      </div>
    </div>
  );
};

export default ReportModal;
