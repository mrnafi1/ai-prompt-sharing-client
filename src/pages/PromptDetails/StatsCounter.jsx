import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const StatsCounter = () => (
  <section className="bg-ink px-4 py-14 sm:px-6">
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left"
    >
      <div>
        <p className="font-mono text-xs text-accent">join_the_marketplace</p>
        <h2 className="mt-2 font-display text-2xl font-semibold text-paper">
          Your best prompt could be someone else's shortcut.
        </h2>
      </div>
      <Link
        to="/register"
        className="shrink-0 rounded-md bg-accent px-6 py-3 font-display text-sm font-medium text-ink hover:opacity-90"
      >
        Start sharing prompts
      </Link>
    </motion.div>
  </section>
);

export default StatsCounter;
