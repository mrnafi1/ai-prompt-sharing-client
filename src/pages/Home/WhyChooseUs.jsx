const benefits = [
  {
    title: "Built for every AI tool",
    desc: "ChatGPT, Gemini, Claude, Midjourney, and more — one place to find prompts that work.",
  },
  {
    title: "Quality, not noise",
    desc: "Every prompt goes through admin review before it reaches the marketplace.",
  },
  {
    title: "Track what works",
    desc: "Copy counts and ratings surface the prompts the community actually uses.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-surface px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display text-2xl font-semibold text-ink">Why prompt_</h2>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-xl border border-border bg-paper p-5">
              <p className="font-mono text-xs text-accent-ink">0{benefits.indexOf(b) + 1}</p>
              <h3 className="mt-2 font-display text-base font-semibold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm text-ink-muted">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
