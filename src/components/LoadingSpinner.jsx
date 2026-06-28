const LoadingSpinner = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-paper">
      <div className="flex items-center gap-3">
        <span className="loading loading-spinner loading-md text-accent"></span>
        <span className="font-mono text-sm text-ink-muted">loading_</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
