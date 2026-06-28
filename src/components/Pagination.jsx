const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-md border border-border px-3 py-1.5 font-mono text-sm text-ink disabled:opacity-40"
      >
        prev
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`rounded-md px-3 py-1.5 font-mono text-sm ${
            p === currentPage ? "bg-accent text-ink" : "border border-border text-ink-muted hover:text-ink"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-md border border-border px-3 py-1.5 font-mono text-sm text-ink disabled:opacity-40"
      >
        next
      </button>
    </div>
  );
};

export default Pagination;
