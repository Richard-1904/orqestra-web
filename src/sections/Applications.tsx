import { motion } from "framer-motion";

const APPLICATIONS = [
  "Healthcare",
  "Finance",
  "Insurance",
  "Legal",
  "Government",
  "Enterprise Operations",
];

export function Applications() {
  return (
    <section id="applications" className="py-24 lg:py-36 border-t border-base-600/60">
      <div className="max-w-content mx-auto container-px">
        <div className="max-w-2xl mb-12 lg:mb-16">
          <div className="section-eyebrow mb-6">Applications</div>
          <h2 className="font-display text-display-sm lg:text-display-md font-semibold text-ink-100 tracking-tight">
            Built for environments where knowledge matters.
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {APPLICATIONS.map((app, i) => (
            <motion.span
              key={app}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-full border border-base-600 px-5 py-2.5 text-sm text-ink-300"
            >
              {app}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
