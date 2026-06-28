import { motion } from "framer-motion";

const steps = [
  { label: "Search or browse", desc: "Filter by category, AI tool, or difficulty." },
  { label: "Copy or unlock", desc: "Public prompts copy instantly. Premium prompts unlock with one upgrade." },
  { label: "Save and reuse", desc: "Bookmark your favorites and revisit them from your dashboard." },
];

const HowItWorks = () => (
  <section className="px-4 py-14 sm:px-6">
    <div className="mx-auto max-w-6xl">
      <h2 className="font-display text-2xl font-semibold text-ink">How it works</h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <p className="font-mono text-2xl text-accent">0{i + 1}</p>
            <h3 className="mt-2 font-display text-base font-semibold text-ink">{s.label}</h3>
            <p className="mt-1 text-sm text-ink-muted">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
