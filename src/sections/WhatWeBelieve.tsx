import { motion } from "framer-motion";

const DRIFT_POINTS = [
  "Policies evolve",
  "Procedures change",
  "Contracts get updated",
  "AI systems learn from snapshots",
  "Teams work in silos.",
  "Systems disagree silently",
];

export function WhatWeBelieve() {
  return (
    <section className="py-24 lg:py-36 border-t border-base-600/60">
      <div className="max-w-content mx-auto container-px">
        <div className="max-w-2xl mb-16 lg:mb-24">
          <div className="section-eyebrow mb-6">What We Believe</div>
          <h2 className="font-display text-display-sm lg:text-display-md font-semibold text-ink-100 tracking-tight">
            Knowledge doesn't fail all at once.
            <br />
            <em>It drifts.</em>
            <div className="text-ink-500 text-2xl lg:text-3xl">
              No single system is broken, the failure lives in the space between them.
            </div>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-base-600/60 rounded-2xl overflow-hidden border border-base-600/60">
          {DRIFT_POINTS.map((point, i) => (
            <motion.div
              key={point}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-base-900 p-8 lg:p-10 flex flex-col justify-center min-h-[120px] lg:min-h-[140px]"
            >
              <h3 className="font-display text-xl lg:text-2xl font-semibold text-ink-100 tracking-tight leading-tight">
                {point}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
