import { useTheme } from "../lib/useTheme";

interface ConfidenceIndicatorProps {
  value: number; // 0-1
  size?: number;
  label?: string;
}

/**
 * Confidence Indicator — the smaller recurring mark derived from the
 * Confidence Mesh. A partial ring whose arc length and color encode
 * a confidence level. Used beside claims, capability cards, and pillars.
 */
export function ConfidenceIndicator({ value, size = 40, label }: ConfidenceIndicatorProps) {
  const { theme } = useTheme();
  const radius = size / 2 - 3;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value);

  const color = theme === "dark" ? "#5EEAD4" : "#0D9488";

  const bgStroke = theme === "dark" ? "#1E2530" : "#E2E8F0";

  return (
    <div className="inline-flex items-center gap-2.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgStroke}
          strokeWidth="2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      {label && <span className="text-sm text-ink-500">{label}</span>}
    </div>
  );
}
