import { motion } from "framer-motion";
import { ConfidenceMesh } from "../components/ConfidenceMesh";

export function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(94,234,212,0.06), transparent)",
        }}
      />

      <div className="max-w-content mx-auto container-px relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-eyebrow mb-6"
            >
              Organizational Knowledge Confidence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-display-md lg:text-display-lg font-semibold text-ink-100 tracking-tight"
            >
              Know what your organization knows.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-lg text-ink-500 max-w-xl leading-relaxed"
            >
              Orqestra helps organizations understand,
              validate, and maintain confidence in the
              knowledge that drives decisions, operations,
              compliance, and AI systems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#early-access"
                className="inline-flex items-center justify-center rounded-full bg-signal text-base-900 px-7 py-3.5 text-sm font-semibold hover:bg-signal-dim transition-colors"
              >
                Request Early Access
              </a>
              <a
                href="#platform"
                className="inline-flex items-center justify-center rounded-full border border-base-600 px-7 py-3.5 text-sm font-medium text-ink-300 hover:border-ink-500 hover:text-ink-100 transition-colors"
              >
                Explore the Platform
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative aspect-[4/3] lg:aspect-square"
          >
            <ConfidenceMesh variant="hero" className="w-full h-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
