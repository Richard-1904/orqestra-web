import { motion } from "framer-motion";
import { AIEstateGraph } from "../components/AIEstateGraph";

export function Platform() {
  return (
    <section id="platform" className="py-24 lg:py-36 border-t border-base-600/60 overflow-hidden">
      <div className="max-w-content mx-auto container-px">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
          <div className="section-eyebrow mb-6">The Orqestra Platform</div>
          <h2 className="font-display text-display-sm lg:text-display-md font-semibold text-ink-100 tracking-tight mb-6">
            A continuous view of organizational knowledge.
          </h2>
          <p className="text-ink-500 leading-relaxed text-lg lg:text-xl max-w-2xl mx-auto">
            Orqestra connects the systems organizations already rely on and continuously analyzes how information relates, changes, and conflicts across them.
          </p>
        </div>

        {/* Visual Block (AI Estate Graph) */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto w-full"
        >
          <AIEstateGraph />
        </motion.div>
      </div>
    </section>
  );
}
