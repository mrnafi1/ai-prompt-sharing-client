import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const navLinkClass = ({ isActive }) =>
  `font-display text-sm ${isActive ? "text-accent-ink" : "text-ink-muted hover:text-ink"}`;

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged out"))
      .catch(() => toast.error("Could not log out — try again"));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Wordmark — the "blinking cursor waiting for input" signature */}
        <Link to="/" className="font-display text-lg font-semibold text-ink">
          prompt<span className="text-accent">_</span>
          <span className="cursor-blink text-accent">|</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/all-prompts" className={navLinkClass}>
            All Prompts
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <button
              onClick={handleLogOut}
              className="rounded-md border border-border px-4 py-1.5 font-display text-sm text-ink hover:border-ink"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-md px-4 py-1.5 font-display text-sm text-ink-muted hover:text-ink"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-md bg-accent px-4 py-1.5 font-display text-sm font-medium text-ink hover:opacity-90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* mobile toggle */}
        <button
          className="md:hidden"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="font-mono text-ink">{menuOpen ? "close" : "menu"}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-border px-4 py-4 md:hidden">
          <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/all-prompts" className={navLinkClass} onClick={() => setMenuOpen(false)}>
            All Prompts
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Dashboard
            </NavLink>
          )}
          {user ? (
            <button
              onClick={() => {
                handleLogOut();
                setMenuOpen(false);
              }}
              className="text-left font-display text-sm text-ink"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="font-display text-sm text-ink-muted" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
              <Link to="/register" className="font-display text-sm text-accent-ink" onClick={() => setMenuOpen(false)}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
