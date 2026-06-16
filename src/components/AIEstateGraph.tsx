import { useTheme } from "../lib/useTheme";

interface NodeData {
  name: string;
  score: number;
  status: "ok" | "warn" | "bad";
  left: number;
  top: number;
  contradiction?: string;
}

const NODES: NodeData[] = [
  { name: "HR Assistant", score: 94, status: "ok", left: 258, top: 20 },
  { name: "Support Bot", score: 72, status: "bad", left: 38, top: 120, contradiction: "Refund window" },
  { name: "Pricing API", score: 68, status: "bad", left: 478, top: 120, contradiction: "Pricing tier" },
  { name: "Compliance Agent", score: 81, status: "warn", left: 258, top: 190 },
  { name: "Contract Tool", score: 65, status: "bad", left: 38, top: 280 },
  { name: "Sales Agent", score: 61, status: "bad", left: 478, top: 280 },
];

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

  const panelStyle = {
    background: colors.panelBg,
    borderColor: colors.panelBorder,
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  };

  const headerStyle = {
    background: colors.headerBg,
    borderColor: colors.panelBorder,
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border flex flex-col" style={panelStyle}>
      <style>{`
        @keyframes orq-blink        { 0%,100%{opacity:1}       50%{opacity:0.2} }
        @keyframes orq-border-pulse { 0%,100%{border-color:#F09595} 50%{border-color:#E24B4A} }
        @keyframes orq-flow         { to{stroke-dashoffset:-16} }
        .orq-node-bad  { animation: orq-border-pulse 1.8s ease-in-out infinite; }
        .orq-dot-bad   { animation: orq-blink        1.6s ease-in-out infinite; }
        .orq-edge-flow { animation: orq-flow          0.7s linear    infinite; }
      `}</style>

      {/* ── Header (shared) ── */}
      <div
        className="flex items-start sm:items-center justify-between px-4 sm:px-5 py-3 border-b flex-wrap gap-2"
        style={headerStyle}
      >
        <div>
          <div className="text-[13px] font-medium" style={{ color: colors.textPrimary }}>
            AI estate
          </div>
          <div className="text-[11px] mt-0.5" style={{ color: colors.textMuted }}>
            6 systems connected · last scanned 4s ago
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: "#FAEEDA", color: "#854F0B" }}>
            Estate coherence: 77%
          </span>
          <span className="text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: "#FCEBEB", color: "#A32D2D" }}>
            3 active contradictions
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
    MOBILE VIEW (< md) — pure SVG graph
    Everything inside SVG so it scales perfectly.
    ══════════════════════════════════════════════ */}
      <div className="md:hidden w-full" style={{ aspectRatio: "640 / 500" }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 640 500"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* ── Neutral edges ── */}
          <line x1="270" y1="90" x2="150" y2="150" stroke={colors.edgeNeutral} strokeWidth="1" />
          <line x1="370" y1="90" x2="490" y2="150" stroke={colors.edgeNeutral} strokeWidth="1" />
          <line x1="320" y1="90" x2="320" y2="250" stroke={colors.edgeNeutral} strokeWidth="1" />
          <line x1="150" y1="190" x2="270" y2="250" stroke={colors.edgeNeutral} strokeWidth="1" />
          <line x1="490" y1="190" x2="370" y2="250" stroke={colors.edgeNeutral} strokeWidth="1" />
          <line x1="150" y1="350" x2="270" y2="290" stroke={colors.edgeNeutral} strokeWidth="1" />
          <line x1="490" y1="350" x2="370" y2="290" stroke={colors.edgeNeutral} strokeWidth="1" />

          {/* ── Animated contradiction edges ── */}
          <line x1="100" y1="150" x2="100" y2="355"
            stroke="#E24B4A" strokeWidth="2" strokeDasharray="6 4"
            className="orq-edge-flow" />
          <line x1="540" y1="150" x2="540" y2="355"
            stroke="#E24B4A" strokeWidth="2" strokeDasharray="6 4"
            className="orq-edge-flow" />

          {/* ── Contradiction badges ── */}
          <circle cx="100" cy="250" r="12" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.5" />
          <text x="100" y="254" textAnchor="middle" fontSize="12" fontWeight="600"
            fill="#A32D2D" fontFamily="system-ui,sans-serif">2</text>
          <text x="118" y="254" textAnchor="start" fontSize="12" fontWeight="500"
            fill="#E24B4A" fontFamily="system-ui,sans-serif">Refund window</text>

          <circle cx="540" cy="250" r="12" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.5" />
          <text x="540" y="254" textAnchor="middle" fontSize="12" fontWeight="600"
            fill="#A32D2D" fontFamily="system-ui,sans-serif">1</text>
          <text x="558" y="254" textAnchor="start" fontSize="12" fontWeight="500"
            fill="#E24B4A" fontFamily="system-ui,sans-serif">Pricing tier</text>

          {/* ── Nodes (SVG-native, no HTML overlay) ── */}
          {[
            { name: "HR Assistant", score: 94, status: "ok" as const, cx: 320, cy: 50 },
            { name: "Support Bot", score: 72, status: "bad" as const, cx: 100, cy: 150 },
            { name: "Pricing API", score: 68, status: "bad" as const, cx: 540, cy: 150 },
            { name: "Compliance Agent", score: 81, status: "warn" as const, cx: 320, cy: 250 },
            { name: "Contract Tool", score: 65, status: "bad" as const, cx: 100, cy: 350 },
            { name: "Sales Agent", score: 61, status: "bad" as const, cx: 540, cy: 350 },
          ].map((n) => {
            const W = 155, H = 80, rx = 10;
            const x = n.cx - W / 2;
            const y = n.cy - H / 2;
            const isBad = n.status === "bad";
            return (
              <g key={n.name} className={isBad ? "orq-node-bad-svg" : ""}>
                <rect
                  x={x} y={y} width={W} height={H} rx={rx}
                  fill={colors.nodeBg}
                  stroke={statusBorder[n.status]}
                  strokeWidth={isBad ? 1.5 : 0.75}
                />
                {/* Status dot */}
                <circle
                  cx={x + W - 14} cy={y + 14} r={5}
                  fill={statusDot[n.status]}
                  className={isBad ? "orq-dot-bad" : ""}
                />
                {/* Name */}
                <text x={x + 12} y={y + 22}
                  fontSize="13" fontWeight="600"
                  fill={colors.textPrimary}
                  fontFamily="system-ui,sans-serif">
                  {n.name}
                </text>
                {/* Score */}
                <text x={x + 12} y={y + 52}
                  fontSize="26" fontWeight="600"
                  fill={statusScore[n.status]}
                  fontFamily="system-ui,sans-serif">
                  {n.score}
                </text>
                <text x={x + 12 + (n.score >= 100 ? 48 : n.score >= 10 ? 36 : 22)} y={y + 52}
                  fontSize="14" fontWeight="400"
                  fill={statusScore[n.status]}
                  fontFamily="system-ui,sans-serif">
                  %
                </text>
                {/* Label */}
                <text x={x + 12} y={y + 70}
                  fontSize="11"
                  fill={colors.textMuted}
                  fontFamily="system-ui,sans-serif">
                  coherence
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP VIEW  (≥ md) — original SVG graph
          ══════════════════════════════════════════════ */}
      <div className="hidden md:block relative w-full" style={{ aspectRatio: "640 / 380" }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 640 380"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Neutral connections */}
          <line x1="320" y1="60" x2="100" y2="160" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="320" y1="60" x2="540" y2="160" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="320" y1="190" x2="320" y2="100" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="100" y1="160" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="540" y1="160" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="100" y1="320" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />
          <line x1="540" y1="320" x2="320" y2="230" stroke={colors.edgeNeutral} strokeWidth="0.5" />

          {/* Animated contradiction edges */}
          <line x1="100" y1="170" x2="100" y2="280"
            stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="5 3"
            className="orq-edge-flow" />
          <line x1="540" y1="170" x2="540" y2="280"
            stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="5 3"
            className="orq-edge-flow" />

          {/* Count badges */}
          <circle cx="100" cy="240" r="7" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.5" />
          <text x="100" y="243.2" textAnchor="middle" fontSize="9" fontWeight="500"
            fill="#A32D2D" fontFamily="system-ui,sans-serif">2</text>
          <circle cx="540" cy="240" r="7" fill="#FCEBEB" stroke="#F09595" strokeWidth="0.5" />
          <text x="540" y="243.2" textAnchor="middle" fontSize="9" fontWeight="500"
            fill="#A32D2D" fontFamily="system-ui,sans-serif">1</text>

          {/* Conflict labels */}
          <text x="112" y="243" textAnchor="start" fontSize="9" fontWeight="500"
            fill="#e43737" fontFamily="system-ui,sans-serif" opacity="0.85">Refund window</text>
          <text x="574" y="243" textAnchor="middle" fontSize="9" fontWeight="500"
            fill="#e43737" fontFamily="system-ui,sans-serif" opacity="0.85">Pricing tier</text>
        </svg>

        {NODES.map((node) => (
          <div
            key={node.name}
            className={`absolute rounded-xl px-4 py-3.5 ${node.status === "bad" ? "orq-node-bad" : ""}`}
            style={{
              left: `${(node.left / 640) * 100}%`,
              top: `${(node.top / 380) * 100}%`,
              width: `${(124 / 640) * 100}%`,
              background: colors.nodeBg,
              border: `${node.status === "bad" ? "1px" : "0.5px"} solid ${statusBorder[node.status]}`,
            }}
          >
            <div className="flex items-start justify-between mb-1.5">
              <span className="text-xs font-semibold leading-tight" style={{ color: colors.textPrimary }}>
                {node.name}
              </span>
              <span
                className={`w-[7px] h-[7px] rounded-full flex-shrink-0 mt-0.5 ${node.status === "bad" ? "orq-dot-bad" : ""}`}
                style={{ background: statusDot[node.status] }}
              />
            </div>
            <div className="text-2xl font-semibold leading-none" style={{ color: statusScore[node.status] }}>
              {node.score}<span className="text-[14px] font-normal">%</span>
            </div>
            <div className="text-xs mt-0.5" style={{ color: colors.textMuted }}>
              coherence
            </div>
          </div>
        ))}
      </div>

      {/* ── Footer / legend (shared) ── */}
      <div
        className="flex items-center gap-4 flex-wrap px-4 py-2.5 border-t"
        style={headerStyle}
      >
        <Legend color={colors.textMuted}>
          <svg width="18" height="4" viewBox="0 0 18 4">
            <line x1="0" y1="2" x2="18" y2="2" stroke="#E24B4A" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          Active contradiction
        </Legend>
        <Legend color={colors.textMuted}>
          <svg width="18" height="2" viewBox="0 0 18 2">
            <line x1="0" y1="1" x2="18" y2="1" stroke={colors.edgeNeutral} strokeWidth="1" />
          </svg>
          Coherent connection
        </Legend>
        <Legend color={colors.textMuted}>
          <Dot color="#E24B4A" /> Contradiction active
        </Legend>
        <Legend color={colors.textMuted}>
          <Dot color="#EF9F27" /> Warning
        </Legend>
        <Legend color={colors.textMuted}>
          <Dot color="#1D9E75" /> Coherent
        </Legend>
      </div>
    </div>
  );
}

function Dot({ color }: { color: string }) {
  return (
    <span className="inline-block w-[7px] h-[7px] rounded-full flex-shrink-0" style={{ background: color }} />
  );
}

function Legend({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] flex-nowrap" style={{ color }}>
      {children}
    </div>
  );
}
