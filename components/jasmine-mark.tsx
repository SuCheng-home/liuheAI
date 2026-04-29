import { cn } from "@/lib/utils"

type JasmineMarkProps = {
  className?: string
  /** Render as a glyph (white petals on transparent) for use on colored badges */
  variant?: "glyph" | "filled"
}

/**
 * 茉莉花标识 SVG
 * - 5 片花瓣环绕花蕊，呈现六合区茉莉花意象
 * - variant="glyph"：仅描线，用于深色徽章上反白显示
 * - variant="filled"：完整填色，用于浅色背景的独立标识
 */
export default function JasmineMark({
  className,
  variant = "glyph",
}: JasmineMarkProps) {
  if (variant === "glyph") {
    return (
      <svg
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className={cn("h-6 w-6", className)}
      >
        <g fill="currentColor" fillOpacity="0.95">
          {[0, 72, 144, 216, 288].map((angle) => (
            <ellipse
              key={angle}
              cx="24"
              cy="14"
              rx="5"
              ry="8"
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
        </g>
        <circle cx="24" cy="24" r="3.2" fill="#fbbf24" />
        <circle cx="24" cy="24" r="1.4" fill="#f59e0b" />
      </svg>
    )
  }

  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={cn("h-6 w-6", className)}
    >
      <defs>
        <radialGradient id="jasmine-petal" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="80%" stopColor="#f5f9f1" />
          <stop offset="100%" stopColor="#dceadb" />
        </radialGradient>
        <radialGradient id="jasmine-center" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="60%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </radialGradient>
      </defs>
      <g>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="24"
            cy="14"
            rx="5.5"
            ry="8.5"
            fill="url(#jasmine-petal)"
            stroke="#cfdcc7"
            strokeWidth="0.6"
            transform={`rotate(${angle} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="3.6" fill="url(#jasmine-center)" />
    </svg>
  )
}
