import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import PromptCard from "../../components/PromptCard";

const FeaturedPrompts = () => {
  const axiosPublic = useAxiosPublic();

  const { data: prompts = [], isLoading } = useQuery({
    queryKey: ["featuredPrompts"],
    queryFn: async () => (await axiosPublic.get("/prompts/featured")).data,
  });

  return (
    <section className="px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-semibold text-ink">Featured prompts</h2>
        <p className="mt-1 text-sm text-ink-muted">Trending right now across the marketplace.</p>

        {isLoading ? (
          <p className="mt-8 font-mono text-sm text-ink-muted">loading_</p>
        ) : prompts.length === 0 ? (
          <p className="mt-8 font-mono text-sm text-ink-muted">
            no approved prompts yet — add one from your dashboard.
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt, i) => (
              <motion.div
                key={prompt._id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <PromptCard prompt={prompt} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPrompts;
