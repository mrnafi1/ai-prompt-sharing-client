import { useQuery } from "@tanstack/react-query";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const SummaryCard = ({ label, value }) => (
  <div className="rounded-xl border border-border bg-surface p-5">
    <p className="font-mono text-xs text-ink-muted">{label}</p>
    <p className="mt-2 font-display text-2xl font-semibold text-ink">{value}</p>
  </div>
);

const CreatorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["creatorStats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => (await axiosSecure.get(`/prompts/creator-stats/${user.email}`)).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">Creator Overview</h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total Prompts" value={stats?.totalPrompts ?? 0} />
        <SummaryCard label="Total Copies" value={stats?.totalCopies ?? 0} />
        <SummaryCard label="Total Bookmarks" value={stats?.totalBookmarks ?? 0} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="font-display text-sm font-semibold text-ink">Copies per prompt</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.copiesBreakdown || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E4EA" />
                <XAxis dataKey="title" tick={{ fontSize: 10 }} hide={false} interval={0} angle={-15} textAnchor="end" height={50} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="copies" fill="#F2A33D" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="font-display text-sm font-semibold text-ink">Prompt growth</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats?.growth || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E1E4EA" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#5B6CFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorHome;
