import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PromptForm from "../../../components/PromptForm";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AddPrompt = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["myProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/users/${user.email}`)).data,
  });

  if (isLoading) return <LoadingSpinner />;

  const limitReached = profile?.subscription !== "Premium" && profile?.totalPrompts >= 3;

  const handleSubmit = async (data) => {
    try {
      await axiosSecure.post("/prompts", {
        ...data,
        creatorEmail: user.email,
        creatorName: user.displayName,
      });
      toast.success("Prompt submitted — pending admin review");
      navigate("/dashboard/my-prompts");
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not submit prompt");
    }
  };

  if (limitReached) {
    return (
      <div className="mx-auto max-w-md rounded-xl border border-border bg-surface p-6 text-center">
        <p className="font-mono text-xs text-accent-ink">limit_reached_</p>
        <h2 className="mt-2 font-display text-lg font-semibold text-ink">
          Free plan limit: 3 prompts
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Upgrade to Premium to add unlimited prompts.
        </p>
        <button
          onClick={() => navigate("/payment")}
          className="mt-4 rounded-md bg-accent px-5 py-2 font-display text-sm font-medium text-ink"
        >
          Upgrade to Premium
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-xl font-semibold text-ink">Add Prompt</h1>
      <p className="mt-1 text-sm text-ink-muted">
        New prompts start as <span className="font-mono">pending</span> until an admin approves them.
      </p>
      <div className="mt-6">
        <PromptForm onSubmit={handleSubmit} submitLabel="Submit for review" />
      </div>
    </div>
  );
};

export default AddPrompt;
