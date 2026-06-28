import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["recentReviews"],
    queryFn: async () => (await axiosPublic.get("/reviews/recent")).data,
  });

  if (!isLoading && reviews.length === 0) return null;

  return (
    <section className="bg-surface px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-semibold text-ink">What creators are saying</h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.div
              key={r._id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-border bg-paper p-5"
            >
              <p className="font-mono text-xs text-accent-ink">{"★".repeat(r.rating || 5)}</p>
              <p className="mt-2 text-sm text-ink">{r.comment}</p>
              <p className="mt-3 text-xs text-ink-muted">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
