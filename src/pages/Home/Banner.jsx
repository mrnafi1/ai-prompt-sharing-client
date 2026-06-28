import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TRENDING_TAGS = [
  "midjourney art", "chatgpt seo", "claude coding", "gemini research",
  "copywriting", "resume", "image prompts", "data analysis",
];

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const tags = [...TRENDING_TAGS].sort(() => 0.5 - Math.random()).slice(0, 4);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/all-prompts?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="px-4 pt-16 pb-12 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="font-mono text-sm text-accent-ink">prompt_</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-5xl">
          Find the prompt that gets it right the first time.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink-muted">
          Discover, save, and share high-quality prompts for ChatGPT, Gemini, Claude,
          Midjourney, and every AI tool in between.
        </p>

        <form onSubmit={handleSearch} className="mx-auto mt-8 flex max-w-md gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts, tags, or AI tool…"
            className="flex-1 rounded-md border border-border bg-surface px-4 py-2.5 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="rounded-md bg-accent px-5 py-2.5 font-display text-sm font-medium text-ink hover:opacity-90"
          >
            Search
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => navigate(`/all-prompts?search=${encodeURIComponent(tag)}`)}
              className="rounded-full border border-border px-3 py-1 font-mono text-xs text-ink-muted hover:border-accent hover:text-accent-ink"
            >
              {tag}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/all-prompts")}
          className="mt-8 rounded-md border border-ink px-6 py-2.5 font-display text-sm text-ink hover:bg-ink hover:text-paper"
        >
          Browse all prompts →
        </button>
      </motion.div>
    </section>
  );
};

export default Banner;
