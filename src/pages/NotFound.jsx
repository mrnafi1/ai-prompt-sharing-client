import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="font-mono text-sm text-accent-ink">404_</p>
      <h1 className="font-display text-2xl font-semibold text-ink">
        No matching prompt found at this address.
      </h1>
      <p className="max-w-md text-sm text-ink-muted">
        Check the URL, or head back and search the marketplace directly.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-accent px-5 py-2 font-display text-sm font-medium text-ink hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
