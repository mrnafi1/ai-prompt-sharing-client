import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PromptCard from "../../components/PromptCard";
import Pagination from "../../components/Pagination";

const CATEGORIES = ["Writing", "Marketing", "Coding", "Image Generation", "Productivity", "Education"];
const AI_TOOLS = ["ChatGPT", "Gemini", "Claude", "Midjourney", "DALL-E"];
const DIFFICULTIES = ["Beginner", "Intermediate", "Pro"];

const AllPrompts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const axiosPublic = useAxiosPublic();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const aiTool = searchParams.get("aiTool") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const sort = searchParams.get("sort") || "latest";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 9;

  const [searchInput, setSearchInput] = useState(search);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.set("page", "1");
    setSearchParams(next);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["prompts", { search, category, aiTool, difficulty, sort, page }],
    queryFn: async () => {
      const res = await axiosPublic.get("/prompts", {
        params: { search, category, aiTool, difficulty, sort, page, limit },
      });
      return res.data;
    },
  });

  const prompts = data?.prompts || [];
  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-2xl font-semibold text-ink">All Prompts</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateParam("search", searchInput);
        }}
        className="mt-6 flex max-w-md gap-2"
      >
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by title, tag, or AI tool…"
          className="flex-1 rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        />
        <button className="rounded-md bg-accent px-4 py-2 font-display text-sm font-medium text-ink">
          Search
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-3">
        <select
          value={category}
          onChange={(e) => updateParam("category", e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          value={aiTool}
          onChange={(e) => updateParam("aiTool", e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="">All AI tools</option>
          {AI_TOOLS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <select
          value={difficulty}
          onChange={(e) => updateParam("difficulty", e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="">All difficulties</option>
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <select
          value={sort}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink"
        >
          <option value="latest">Latest</option>
          <option value="popular">Most Popular (rating)</option>
          <option value="copied">Most Copied</option>
        </select>
      </div>

      {isLoading ? (
        <p className="mt-10 font-mono text-sm text-ink-muted">loading_</p>
      ) : prompts.length === 0 ? (
        <p className="mt-10 font-mono text-sm text-ink-muted">
          no prompts match these filters yet.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(p) => updateParam("page", p)}
      />
    </div>
  );
};

export default AllPrompts;
