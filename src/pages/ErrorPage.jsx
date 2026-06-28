import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const message = error?.statusText || error?.message || "Unknown error";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper px-4 text-center">
      <p className="font-mono text-sm text-accent-ink">error_</p>
      <h1 className="font-display text-2xl font-semibold text-ink">This page failed to load.</h1>
      <p className="max-w-md font-mono text-sm text-ink-muted">{message}</p>
      <Link
        to="/"
        className="mt-2 rounded-md bg-accent px-5 py-2 font-display text-sm font-medium text-ink hover:opacity-90"
      >
        Back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
