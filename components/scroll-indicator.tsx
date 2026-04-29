"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ScrollIndicatorSection {
  id: string
  label: string
}

/**
 * 首页右侧悬浮分页指示器
 * - 监听 main 容器滚动，计算当前可见 section
 * - 显示当前页码、总页码，并提供圆点快速跳转
 */
export default function ScrollIndicator({
  sections,
}: {
  sections: ScrollIndicatorSection[]
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // main 容器是首页的滚动容器
    const container = document.querySelector<HTMLElement>(
      "main.snap-y.snap-mandatory"
    )
    if (!container) return
    containerRef.current = container

    const compute = () => {
      const center = container.scrollTop + container.clientHeight / 2
      let best = 0
      let bestDist = Number.POSITIVE_INFINITY
      sections.forEach((s, i) => {
        const el = document.getElementById(s.id)
        if (!el) return
        const top = el.offsetTop
        const sectionCenter = top + el.offsetHeight / 2
        const dist = Math.abs(sectionCenter - center)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActiveIndex(best)
    }

    compute()
    container.addEventListener("scroll", compute, { passive: true })
    window.addEventListener("resize", compute)
    return () => {
      container.removeEventListener("scroll", compute)
      window.removeEventListener("resize", compute)
    }
  }, [sections])

  const handleJump = (index: number) => {
    const section = sections[index]
    if (!section) return
    const el = document.getElementById(section.id)
    if (!el) return
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const handleBackToTop = () => {
    const container = containerRef.current
    if (container) {
      container.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const total = sections.length

  return (
    <>
      <div
        aria-label="页面滚动指示器"
        className="pointer-events-none fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
      >
        <div className="pointer-events-auto flex flex-col items-center gap-3 rounded-full border border-stone-200/70 bg-white/75 px-2 py-3 shadow-lg shadow-emerald-900/5 backdrop-blur-md">
          {/* 页码 */}
          <div className="flex flex-col items-center leading-none">
            <span className="text-sm font-bold text-stone-900 tabular-nums">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium text-stone-400 tabular-nums">
              / {String(total).padStart(2, "0")}
            </span>
          </div>

          <div className="h-2 w-px bg-stone-200" />

          {/* 圆点 */}
          <nav className="flex flex-col items-center gap-2.5">
            {sections.map((section, i) => {
              const active = i === activeIndex
              const hovered = hoveredIndex === i
              return (
                <button
                  key={section.id}
                  type="button"
                  aria-label={`跳转到 ${section.label}`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => handleJump(i)}
                  className={cn(
                    "group relative flex h-2.5 w-2.5 items-center justify-center rounded-full transition-all duration-300",
                    active
                      ? "h-2.5 w-6 bg-gradient-to-r from-emerald-600 to-amber-500 shadow-md shadow-emerald-600/30"
                      : "bg-stone-300 hover:bg-emerald-400"
                  )}
                >
                  {/* hover 标签 */}
                  <span
                    className={cn(
                      "pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-stone-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 transition-all duration-200",
                      hovered && "opacity-100"
                    )}
                  >
                    {section.label}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* 回到顶部按钮 */}
      {activeIndex > 0 && (
        <button
          type="button"
          aria-label="回到顶部"
          onClick={handleBackToTop}
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/40"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </>
  )
}
