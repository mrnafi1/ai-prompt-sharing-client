const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-base font-semibold text-ink">
            prompt<span className="text-accent">_</span>
          </p>
          <p className="mt-1 max-w-xs text-sm text-ink-muted">
            Find, save, and ship better prompts for ChatGPT, Gemini, Claude, Midjourney, and more.
          </p>
        </div>

        <div className="flex gap-6 text-sm text-ink-muted">
          <a href="/all-prompts" className="hover:text-ink">All Prompts</a>
          <a href="/register" className="hover:text-ink">Join</a>
          <a href="mailto:hello@promptmarketplace.app" className="hover:text-ink">Contact</a>
        </div>
      </div>
      <div className="border-t border-border px-4 py-4 text-center text-xs text-ink-muted sm:px-6">
        © {new Date().getFullYear()} prompt_. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
