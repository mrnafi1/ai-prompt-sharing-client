import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/reviews/user/${user.email}`)).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">My Reviews</h1>

      {reviews.length === 0 ? (
        <p className="mt-6 font-mono text-sm text-ink-muted">you haven't reviewed any prompts yet.</p>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {reviews.map((r) => (
            <div key={r._id} className="rounded-xl border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-accent-ink">{"★".repeat(r.rating)}</p>
                <p className="font-mono text-xs text-ink-muted">
                  {new Date(r.date).toLocaleDateString()}
                </p>
              </div>
              <p className="mt-2 text-sm text-ink">{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
