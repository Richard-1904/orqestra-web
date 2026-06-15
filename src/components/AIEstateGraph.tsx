import { useTheme } from "../lib/useTheme";

interface NodeData {
  name: string;
  score: number;
  status: "ok" | "warn" | "bad";
  left: number;
  top: number;
}

const NODES: NodeData[] = [
  { name: "HR Assistant", score: 94, status: "ok", left: 258, top: 20 },
  { name: "Support Bot", score: 72, status: "bad", left: 38, top: 120 },
  { name: "Pricing API", score: 68, status: "bad", left: 478, top: 120 },
  { name: "Compliance Agent", score: 81, status: "warn", left: 258, top: 190 },
  { name: "Contract Tool", score: 65, status: "bad", left: 38, top: 280 },
  { name: "Sales Agent", score: 61, status: "bad", left: 478, top: 280 },
];

/**
 * AI Estate — a live-feeling panel showing connected AI systems and the
 * coherence/contradictions between them. Built from the Confidence Mesh
 * motif: neutral edges show agreement, animated dashed red edges show
 * active contradictions between systems.
 */
export function AIEstateGraph() {
  const { theme } = useTheme();

  const colors =
    theme === "dark"
      ? {
          panelBg: "#10151F",
          panelBorder: "#1E2530",
          headerBg: "#0D131C",
          nodeBg: "#161D29",
          textPrimary: "#F5F7FA",
          textMuted: "#94A3B8",
          edgeNeutral: "#2A3340",
        }
      : {
          panelBg: "#FFFFFF",
          panelBorder: "#E0DDD5",
          headerBg: "#F8F7F3",
          nodeBg: "#FFFFFF",
          textPrimary: "#1A1A18",
          textMuted: "#888780",
          edgeNeutral: "#C8C6BC",
        };

  const statusBorder: Record<NodeData["status"], string> = {
    ok: "#5DCAA5",
    warn: "#EF9F27",
    bad: "#F09595",
  };
  const statusDot: Record<NodeData["status"], string> = {
    ok: "#1D9E75",
    warn: "#EF9F27",
    bad: "#E24B4A",
  };
  const statusScore: Record<NodeData["status"], string> = {
    ok: "#0F6E56",
    warn: "#854F0B",
    bad: "#A32D2D",
  };

  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden border flex flex-col"
      style={{ background: colors.panelBg, borderColor: colors.panelBorder, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
    >
      <style>{`
        @keyframes orq-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
        @keyframes orq-border-pulse { 0%, 100% { border-color: #F09595; } 50% { border-color: #E24B4A; } }
        @keyframes orq-flow { to { stroke-dashoffset: -16; } }
        .orq-node-bad { animation: orq-border-pulse 1.8s ease-in-out infinite; }
        .orq-dot-bad { animation: orq-blink 1.6s ease-in-out infinite; }
        .orq-edge-flow { animation: orq-flow 0.7s linear infinite; }
      `}</style>

      {/* Header */}
      <div
        className="flex items-center justify-between px-4 sm:px-5 py-3 border-b flex-wrap gap-2"
        style={{ background: colors.headerBg, borderColor: colors.panelBorder }}
      >
        <div>
          <div className="text-[13px] font-medium" style={{ color: colors.textPrimary }}>
            AI estate
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: colors.textMuted }}>
            6 systems connected · last scanned 4s ago
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: "#FAEEDA", color: "#854F0B" }}>
            Estate coherence: 77%
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={{ background: "#FCEBEB", color: "#A32D2D" }}>
            3 active contradictions
          </span>
        </div>
      </div>

      {/* Graph */}
      <div className="relative w-full flex-1" style={{ aspectRatio: "640 / 380" }}>
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 640 380" preserveAspectRatio="xMidYMid meet">
          {/* Neutral connections */}
          <line x1="320" y1="60" x2="100" y2="160" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="320" y1="60" x2="540" y2="160" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="320" y1="190" x2="320" y2="100" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="100" y1="160" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="540" y1="160" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="100" y1="320" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="540" y1="320" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />

          {/* Animated contradiction edges */}
          <line
            x1="100" y1="200" x2="100" y2="280"
            stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="5 3"
            className="orq-edge-flow"
          />
          <line
            x1="540" y1="200" x2="540" y2="280"
            stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="5 3"
            className="orq-edge-flow"
          />

          {/* Count badges */}
          <circle cx="100" cy="240" r="9" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.5" />
          <text x="100" y="244" textAnchor="middle" fontSize="10" fontWeight="500" fill="#A32D2D" fontFamily="system-ui,sans-serif">2</text>
          <circle cx="540" cy="240" r="9" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.5" />
          <text x="540" y="244" textAnchor="middle" fontSize="10" fontWeight="500" fill="#A32D2D" fontFamily="system-ui,sans-serif">1</text>

          {/* Conflict labels */}
          <text x="100" y="261" textAnchor="middle" fontSize="10" fontWeight="500" fill="#A32D2D" fontFamily="system-ui,sans-serif" opacity="0.85">Refund window</text>
          <text x="540" y="261" textAnchor="middle" fontSize="10" fontWeight="500" fill="#A32D2D" fontFamily="system-ui,sans-serif" opacity="0.85">Pricing tier</text>
        </svg>

        {NODES.map((node) => (
          <div
            key={node.name}
            className={`absolute rounded-lg px-3 py-2.5 ${node.status === "bad" ? "orq-node-bad" : ""}`}
            style={{
              left: `${(node.left / 640) * 100}%`,
              top: `${(node.top / 380) * 100}%`,
              width: `${(124 / 640) * 100}%`,
              background: colors.nodeBg,
              border: `${node.status === "bad" ? "1px" : "0.5px"} solid ${statusBorder[node.status]}`,
            }}
          >
            <div className="flex items-start justify-between mb-1.5">
              <span className="text-[11px] font-medium leading-tight" style={{ color: colors.textPrimary }}>
                {node.name}
              </span>
              <span
                className={`w-[7px] h-[7px] rounded-full flex-shrink-0 mt-0.5 ${node.status === "bad" ? "orq-dot-bad" : ""}`}
                style={{ background: statusDot[node.status] }}
              />
            </div>
            <div className="text-[22px] font-medium leading-none" style={{ color: statusScore[node.status] }}>
              {node.score}<span className="text-[13px]">%</span>
            </div>
            <div className="text-[10px] mt-0.5" style={{ color: colors.textMuted }}>
              coherence
            </div>
          </div>
        ))}
      </div>

      {/* Footer / legend */}
      <div
        className="flex items-center gap-5 flex-wrap px-4 py-2.5 border-t"
        style={{ background: colors.headerBg, borderColor: colors.panelBorder }}
      >
        <Legend color={colors.textMuted}>
          <svg width="20" height="4" viewBox="0 0 20 4">
            <line x1="0" y1="2" x2="20" y2="2" stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          Active contradiction
        </Legend>
        <Legend color={colors.textMuted}>
          <svg width="20" height="2" viewBox="0 0 20 2">
            <line x1="0" y1="1" x2="20" y2="1" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          </svg>
          Coherent connection
        </Legend>
        <Legend color={colors.textMuted}>
          <span className="inline-block w-[7px] h-[7px] rounded-full" style={{ background: "#E24B4A" }} />
          Contradiction active
        </Legend>
        <Legend color={colors.textMuted}>
          <span className="inline-block w-[7px] h-[7px] rounded-full" style={{ background: "#EF9F27" }} />
          Warning
        </Legend>
        <Legend color={colors.textMuted}>
          <span className="inline-block w-[7px] h-[7px] rounded-full" style={{ background: "#1D9E75" }} />
          Coherent
        </Legend>
      </div>
    </div>
  );
}

function Legend({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] flex-nowrap" style={{ color }}>
      {children}
    </div>
  );
}
