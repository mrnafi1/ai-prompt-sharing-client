import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AllPayments = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => (await axiosSecure.get("/payments")).data,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">All Payments</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-ink-muted">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {payments.length === 0 ? (
              <tr><td colSpan={4} className="px-4 py-6 text-center text-ink-muted">No payments yet.</td></tr>
            ) : payments.map((p) => (
              <tr key={p._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-ink">{p.email}</td>
                <td className="px-4 py-3 font-mono text-ink-muted">${p.amount}</td>
                <td className="px-4 py-3 font-mono text-xs text-ink-muted">{p.transactionId}</td>
                <td className="px-4 py-3 text-ink-muted">{new Date(p.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPayments;
