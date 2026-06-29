import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const SummaryCard = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-surface p-5">
    <p className="font-mono text-xs text-ink-muted">{label}</p>
    <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
  </div>
);

const AdminAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["adminAnalytics"],
    queryFn: async () => (await axiosSecure.get("/admin/analytics")).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Platform Analytics</h1>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Users" value={data?.totalUsers ?? 0} />
        <SummaryCard label="Total Prompts" value={data?.totalPrompts ?? 0} />
        <SummaryCard label="Total Reviews" value={data?.totalReviews ?? 0} />
        <SummaryCard label="Total Copies" value={data?.totalCopies ?? 0} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
