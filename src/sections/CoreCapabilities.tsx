import { motion } from "framer-motion";
import { useTheme } from "../lib/useTheme";

const CAPABILITIES = [
  {
    title: "Contradiction Detection",
    body: "Find where trusted sources disagree.",
  },
  {
    title: "Truth Divergence Analysis",
    body: "Understand how knowledge drifts over time.",
  },
  {
    title: "Knowledge Validation",
    body: "Verify information against its source.",
  },
  {
    title: "Risk Intelligence",
    body: "Understand business impact before it spreads.",
  },
  {
    title: "Traceability",
    body: "Track knowledge back to its origin.",
  },
  {
    title: "Resolution Support",
    body: "Help teams resolve issues faster.",
  },
];

export function CoreCapabilities() {
  return (
    <section className="py-24 lg:py-36 border-t border-base-600/60">
      <div className="max-w-content mx-auto container-px">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="section-eyebrow mb-6">Core Capabilities</div>
          <h2 className="font-display text-display-sm lg:text-display-md font-semibold text-ink-100 tracking-tight">
            The building blocks of knowledge confidence.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CAPABILITIES.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group rounded-2xl border border-base-600 bg-base-850 p-8 hover:border-signal/30 hover:bg-base-800 transition-colors"
            >
              <CapabilityGlyph index={i} />
              <h3 className="font-display text-lg font-semibold text-ink-100 mt-6 mb-3 tracking-tight">
                {cap.title}
              </h3>
              <p className="text-sm text-ink-500 leading-relaxed">{cap.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Small mesh-fragment glyph unique to each capability card. */
function CapabilityGlyph({ index }: { index: number }) {
  const { theme } = useTheme();
  const signalColor = theme === "dark" ? "#5EEAD4" : "#0D9488";
  const nodeBg = theme === "dark" ? "#10151F" : "#FFFFFF";
  const nodeStroke = theme === "dark" ? "#5B6B82" : "#94A3B8";

  // Vary the small node cluster slightly per card while keeping the same motif
  const seeds = [
    [[6, 6], [22, 4], [16, 20]],
    [[4, 10], [20, 6], [22, 22], [8, 22]],
    [[12, 4], [4, 18], [22, 16]],
    [[6, 6], [22, 8], [14, 22]],
    [[4, 4], [22, 4], [13, 16], [4, 22]],
    [[8, 6], [22, 14], [6, 22]],
    [[6, 4], [22, 10], [16, 22], [4, 18]],
  ];
  const points = seeds[index % seeds.length];

  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      {points.map((p, i) =>
        points.slice(i + 1).map((q, j) => (
          <line
            key={`${i}-${j}`}
            x1={p[0]}
            y1={p[1]}
            x2={q[0]}
            y2={q[1]}
            stroke={signalColor}
            strokeWidth="1"
            strokeOpacity="0.25"
          />
        ))
      )}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={i === 0 ? 3 : 2}
          fill={i === 0 ? signalColor : nodeBg}
          stroke={i === 0 ? "none" : nodeStroke}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
