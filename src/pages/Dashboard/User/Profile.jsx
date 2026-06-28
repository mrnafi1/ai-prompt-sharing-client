import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["myProfile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/users/${user.email}`)).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-xl font-semibold text-ink">Profile</h1>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6 text-center">
        <img
          src={profile?.photoURL || "https://api.dicebear.com/7.x/initials/svg?seed=" + profile?.name}
          alt={profile?.name}
          className="mx-auto h-20 w-20 rounded-full object-cover"
        />
        <p className="mt-3 font-display text-lg font-semibold text-ink">{profile?.name}</p>
        <p className="text-sm text-ink-muted">{profile?.email}</p>

        <div className="mt-4 flex justify-center gap-2">
          <span className="rounded-full border border-border px-3 py-1 font-mono text-xs text-role">
            {profile?.role}
          </span>
          <span
            className={`rounded-full px-3 py-1 font-mono text-xs ${
              profile?.subscription === "Premium" ? "bg-accent/20 text-accent-ink" : "border border-border text-ink-muted"
            }`}
          >
            {profile?.subscription}
          </span>
        </div>

        <p className="mt-4 font-mono text-sm text-ink-muted">
          {profile?.totalPrompts ?? 0} prompts published
        </p>

        {profile?.subscription !== "Premium" && (
          <button
            onClick={() => navigate("/payment")}
            className="mt-5 w-full rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink hover:opacity-90"
          >
            Upgrade to Premium
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
