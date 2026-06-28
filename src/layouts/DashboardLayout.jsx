import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-2 font-display text-sm ${
    isActive ? "bg-accent/15 text-accent-ink" : "text-ink-muted hover:bg-paper hover:text-ink"
  }`;

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarContent = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <Link to="/" className="mb-4 font-display text-lg font-semibold text-ink">
        prompt<span className="text-accent">_</span>
      </Link>

      <p className="px-3 pt-2 font-mono text-xs uppercase tracking-wide text-ink-muted">User</p>
      <NavLink to="/dashboard/profile" className={linkClass}>Profile</NavLink>
      <NavLink to="/dashboard/add-prompt" className={linkClass}>Add Prompt</NavLink>
      <NavLink to="/dashboard/my-prompts" className={linkClass}>My Prompts</NavLink>
      <NavLink to="/dashboard/saved-prompts" className={linkClass}>Saved Prompts</NavLink>
      <NavLink to="/dashboard/my-reviews" className={linkClass}>My Reviews</NavLink>

      {(role === "Creator" || role === "Admin") && (
        <>
          <p className="px-3 pt-4 font-mono text-xs uppercase tracking-wide text-ink-muted">Creator</p>
          <NavLink to="/dashboard/creator-home" className={linkClass}>Overview</NavLink>
          <NavLink to="/dashboard/creator-add-prompt" className={linkClass}>Add Prompt</NavLink>
          <NavLink to="/dashboard/creator-my-prompts" className={linkClass}>My Prompts</NavLink>
        </>
      )}

      {role === "Admin" && (
        <>
          <p className="px-3 pt-4 font-mono text-xs uppercase tracking-wide text-ink-muted">Admin</p>
          <NavLink to="/dashboard/all-users" className={linkClass}>All Users</NavLink>
          <NavLink to="/dashboard/admin-all-prompts" className={linkClass}>All Prompts</NavLink>
          <NavLink to="/dashboard/all-payments" className={linkClass}>All Payments</NavLink>
          <NavLink to="/dashboard/reported-prompts" className={linkClass}>Reported Prompts</NavLink>
          <NavLink to="/dashboard/admin-analytics" className={linkClass}>Analytics</NavLink>
        </>
      )}

      <div className="mt-auto rounded-md border border-border bg-paper p-3">
        <p className="truncate font-mono text-xs text-ink-muted">{user?.email}</p>
        <p className="font-display text-xs text-accent-ink">{role || "…"}</p>
      </div>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-paper">
      {/* desktop sidebar */}
      <aside className="hidden w-64 border-r border-border bg-surface md:block">
        {sidebarContent}
      </aside>

      {/* mobile sidebar (drawer) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="w-64 bg-surface">{sidebarContent}</div>
          <div className="flex-1 bg-ink/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      <div className="flex-1">
        <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 md:hidden">
          <span className="font-display font-semibold text-ink">Dashboard</span>
          <button className="font-mono text-sm text-ink" onClick={() => setSidebarOpen(true)}>
            menu
          </button>
        </div>
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
