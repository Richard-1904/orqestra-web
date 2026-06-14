import { useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../lib/useTheme";

type Node = { id: number; x: number; y: number; r: number; label?: string };
type Edge = { from: number; to: number; strength: number };

interface ConfidenceMeshProps {
  className?: string;
  variant?: "hero" | "ambient" | "compact";
}

/**
 * The Confidence Mesh — Orqestra's signature visual element.
 * A network of knowledge nodes connected by edges whose weight/opacity
 * encodes confidence. Strong, consistent connections render as solid
 * bright lines; divergent or weak connections render thin and dashed.
 */
export function ConfidenceMesh({ className = "", variant = "hero" }: ConfidenceMeshProps) {
  const { nodes, edges } = useMemo(() => generateMesh(variant), [variant]);
  const { theme } = useTheme();

  const palette = theme === "dark"
    ? { weak: "#94A3B8", faint: "#5B6B82", nodeBg: "#10151F", signal: "#5EEAD4" }
    : { weak: "#64748B", faint: "#94A3B8", nodeBg: "#FFFFFF", signal: "#0D9488" };

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nodeGlowStrong" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.signal} stopOpacity="0.9" />
          <stop offset="100%" stopColor={palette.signal} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeGlowWeak" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={palette.faint} stopOpacity="0.6" />
          <stop offset="100%" stopColor={palette.faint} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => {
        const a = nodes.find((n) => n.id === e.from)!;
        const b = nodes.find((n) => n.id === e.to)!;
        const isStrong = e.strength > 0.6;
        const isMedium = e.strength > 0.3 && e.strength <= 0.6;
        return (
          <motion.line
            key={`edge-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={isStrong ? palette.signal : isMedium ? palette.weak : palette.faint}
            strokeWidth={isStrong ? 1.5 : 1}
            strokeOpacity={isStrong ? 0.45 : isMedium ? 0.22 : 0.12}
            strokeDasharray={isStrong ? undefined : "3 6"}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3 + i * 0.025, ease: "easeOut" }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const isAnchor = n.r > 5;
        return (
          <g key={`node-${n.id}`}>
            {isAnchor && (
              <circle cx={n.x} cy={n.y} r={n.r * 4} fill="url(#nodeGlowStrong)" />
            )}
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={isAnchor ? palette.signal : palette.nodeBg}
              stroke={isAnchor ? palette.signal : palette.faint}
              strokeWidth={isAnchor ? 0 : 1.25}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.04, ease: "easeOut" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

function generateMesh(variant: "hero" | "ambient" | "compact"): { nodes: Node[]; edges: Edge[] } {
  if (variant === "compact") {
    const nodes: Node[] = [
      { id: 0, x: 60, y: 60, r: 7 },
      { id: 1, x: 160, y: 40, r: 4 },
      { id: 2, x: 150, y: 120, r: 4 },
      { id: 3, x: 40, y: 140, r: 3 },
      { id: 4, x: 180, y: 150, r: 3 },
    ];
    const edges: Edge[] = [
      { from: 0, to: 1, strength: 0.8 },
      { from: 0, to: 2, strength: 0.7 },
      { from: 0, to: 3, strength: 0.5 },
      { from: 2, to: 4, strength: 0.2 },
      { from: 1, to: 2, strength: 0.15 },
    ];
    return { nodes, edges };
  }

  // hero / ambient: larger network
  const anchors: Node[] = [
    { id: 0, x: 240, y: 180, r: 8 },
    { id: 1, x: 520, y: 140, r: 8 },
    { id: 2, x: 420, y: 380, r: 8 },
    { id: 3, x: 640, y: 420, r: 7 },
    { id: 4, x: 160, y: 400, r: 7 },
  ];

  const satellites: Node[] = [
    { id: 10, x: 130, y: 110, r: 3.5 },
    { id: 11, x: 330, y: 100, r: 3.5 },
    { id: 12, x: 460, y: 240, r: 3 },
    { id: 13, x: 600, y: 220, r: 4 },
    { id: 14, x: 700, y: 320, r: 3 },
    { id: 15, x: 540, y: 480, r: 3.5 },
    { id: 16, x: 320, y: 470, r: 3 },
    { id: 17, x: 240, y: 300, r: 4 },
    { id: 18, x: 60, y: 280, r: 3 },
    { id: 19, x: 380, y: 540, r: 3 },
    { id: 20, x: 730, y: 130, r: 3 },
    { id: 21, x: 90, y: 500, r: 3 },
  ];

  const nodes = [...anchors, ...satellites];

  const edges: Edge[] = [
    { from: 0, to: 1, strength: 0.85 },
    { from: 1, to: 2, strength: 0.7 },
    { from: 0, to: 2, strength: 0.5 },
    { from: 2, to: 3, strength: 0.75 },
    { from: 0, to: 4, strength: 0.65 },
    { from: 4, to: 2, strength: 0.3 },
    { from: 0, to: 10, strength: 0.5 },
    { from: 0, to: 11, strength: 0.4 },
    { from: 1, to: 11, strength: 0.55 },
    { from: 1, to: 12, strength: 0.35 },
    { from: 1, to: 13, strength: 0.6 },
    { from: 1, to: 20, strength: 0.2 },
    { from: 13, to: 3, strength: 0.45 },
    { from: 3, to: 14, strength: 0.3 },
    { from: 3, to: 15, strength: 0.5 },
    { from: 2, to: 15, strength: 0.25 },
    { from: 2, to: 16, strength: 0.4 },
    { from: 2, to: 19, strength: 0.15 },
    { from: 4, to: 17, strength: 0.55 },
    { from: 4, to: 18, strength: 0.4 },
    { from: 4, to: 21, strength: 0.2 },
    { from: 17, to: 0, strength: 0.3 },
    { from: 12, to: 2, strength: 0.2 },
    { from: 16, to: 19, strength: 0.15 },
    { from: 14, to: 13, strength: 0.15 },
  ];

  return { nodes, edges };
}
