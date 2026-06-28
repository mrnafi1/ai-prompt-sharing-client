// Temporary placeholder so routing works end-to-end today.
// Each of these gets replaced with real content on the day noted in the roadmap.
const PageStub = ({ title, day, description }) => {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center gap-3 px-4 text-center">
      <p className="font-mono text-xs text-accent-ink">build_status_</p>
      <h1 className="font-display text-2xl font-semibold text-ink">{title}</h1>
      <p className="text-sm text-ink-muted">{description}</p>
      <span className="mt-2 rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted">
        ships on day {day}
      </span>
    </div>
  );
};

export default PageStub;
