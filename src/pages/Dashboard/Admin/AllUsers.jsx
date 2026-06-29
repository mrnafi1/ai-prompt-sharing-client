import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner";
import Pagination from "../../../components/Pagination";

const ROLES = ["User", "Creator", "Admin"];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["allUsers", page],
    queryFn: async () => (await axiosSecure.get("/users", { params: { page, limit } })).data,
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["allUsers", page] });

  const handleRoleChange = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/role/${id}`, { role });
      toast.success(`Role updated to ${role}`);
      refresh();
    } catch {
      toast.error("Could not update role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user? This can't be undone.")) return;
    try {
      await axiosSecure.delete(`/users/${id}`);
      toast.success("User deleted");
      refresh();
    } catch {
      toast.error("Could not delete user");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  const users = data?.users || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  return (
    <div>
      <h1 className="font-display text-xl font-semibold text-ink">All Users</h1>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-ink-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Subscription</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{u.name}</td>
                <td className="px-4 py-3 text-ink-muted">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="rounded-md border border-border bg-paper px-2 py-1 text-xs"
                  >
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </td>
                <td className="px-4 py-3 text-ink-muted">{u.subscription}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AllUsers;
