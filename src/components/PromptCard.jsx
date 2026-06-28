import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PromptCard = ({ prompt }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/prompt/${prompt._id}` } } });
      return;
    }
    navigate(`/prompt/${prompt._id}`);
  };

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-role/10 px-3 py-1 font-mono text-xs text-role">
          {prompt.aiTool}
        </span>
        <span className="font-mono text-xs text-ink-muted">{prompt.category}</span>
      </div>

      <h3 className="mt-3 font-display text-base font-semibold text-ink line-clamp-2">
        {prompt.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-ink-muted">{prompt.description}</p>

      <div className="mt-4 flex items-center justify-between text-xs text-ink-muted">
        <span>by {prompt.creatorName || "Unknown"}</span>
        <span className="font-mono">{prompt.copyCount ?? 0} copies</span>
      </div>

      <button
        onClick={handleViewDetails}
        className="mt-4 rounded-md border border-border py-2 font-display text-sm text-ink hover:border-accent hover:text-accent-ink"
      >
        View Details
      </button>
    </div>
  );
};

export default PromptCard;
