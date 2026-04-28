"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type SubpageNavLink = {
  label: string
  href: string
  icon?: ReactNode
  active?: boolean
}

export type SubpageHeaderProps = {
  /** Theme color preset, controls accent gradient & active state */
  theme?: "blue" | "purple" | "emerald" | "orange" | "indigo" | "amber"
  /** Icon shown inside the brand badge */
  icon: ReactNode
  /** Section title, e.g. 智能体集散中心 */
  title: string
  /** Section subtitle, kept consistent across pages */
  subtitle?: string
  /** Section homepage href */
  homeHref: string
  /** In-section navigation links */
  navLinks?: SubpageNavLink[]
  /** Extra right-side actions (rendered before login button) */
  rightActions?: ReactNode
  /** Whether to show login button */
  showLogin?: boolean
}

const THEME: Record<
  NonNullable<SubpageHeaderProps["theme"]>,
  {
    grad: string
    text: string
    activeBg: string
    activeText: string
    hoverBg: string
    hoverText: string
    shadow: string
  }
> = {
  blue: {
    grad: "from-blue-500 via-cyan-500 to-teal-500",
    text: "from-blue-600 via-cyan-600 to-teal-600",
    activeBg: "bg-blue-50",
    activeText: "text-blue-600",
    hoverBg: "hover:bg-blue-50",
    hoverText: "hover:text-blue-600",
    shadow: "shadow-blue-500/5",
  },
  purple: {
    grad: "from-purple-500 via-pink-500 to-rose-500",
    text: "from-purple-600 via-pink-600 to-rose-600",
    activeBg: "bg-purple-50",
    activeText: "text-purple-600",
    hoverBg: "hover:bg-purple-50",
    hoverText: "hover:text-purple-600",
    shadow: "shadow-purple-500/5",
  },
  emerald: {
    grad: "from-emerald-500 via-teal-500 to-cyan-500",
    text: "from-emerald-600 via-teal-600 to-cyan-600",
    activeBg: "bg-emerald-50",
    activeText: "text-emerald-600",
    hoverBg: "hover:bg-emerald-50",
    hoverText: "hover:text-emerald-600",
    shadow: "shadow-emerald-500/5",
  },
  orange: {
    grad: "from-orange-500 via-amber-500 to-rose-500",
    text: "from-orange-600 via-amber-600 to-rose-600",
    activeBg: "bg-orange-50",
    activeText: "text-orange-600",
    hoverBg: "hover:bg-orange-50",
    hoverText: "hover:text-orange-600",
    shadow: "shadow-orange-500/5",
  },
  indigo: {
    grad: "from-indigo-500 via-blue-500 to-cyan-500",
    text: "from-indigo-600 via-blue-600 to-cyan-600",
    activeBg: "bg-indigo-50",
    activeText: "text-indigo-600",
    hoverBg: "hover:bg-indigo-50",
    hoverText: "hover:text-indigo-600",
    shadow: "shadow-indigo-500/5",
  },
  amber: {
    grad: "from-amber-500 via-orange-500 to-pink-500",
    text: "from-amber-600 via-orange-600 to-pink-600",
    activeBg: "bg-amber-50",
    activeText: "text-amber-600",
    hoverBg: "hover:bg-amber-50",
    hoverText: "hover:text-amber-600",
    shadow: "shadow-amber-500/5",
  },
}

export default function SubpageHeader({
  theme = "blue",
  icon,
  title,
  subtitle,
  homeHref,
  navLinks = [],
  rightActions,
  showLogin = true,
}: SubpageHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const t = THEME[theme]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? `bg-white/85 shadow-lg backdrop-blur-xl ${t.shadow}`
          : "bg-white/60 backdrop-blur-md"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:h-20 lg:px-8">
        {/* Left: back + brand */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <Link
            href="/"
            className={cn(
              "flex shrink-0 items-center gap-1.5 text-sm text-slate-600 transition-colors",
              t.hoverText
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">返回首页</span>
          </Link>
          <div className="hidden h-6 w-px shrink-0 bg-slate-200 sm:block" />
          <Link
            href={homeHref}
            className="flex min-w-0 items-center gap-3"
          >
            <div
              className={cn(
                "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br text-white shadow-md lg:h-11 lg:w-11",
                t.grad
              )}
            >
              {icon}
            </div>
            <div className="flex min-w-0 flex-col">
              <span
                className={cn(
                  "truncate bg-gradient-to-r bg-clip-text text-base font-bold text-transparent lg:text-lg",
                  t.text
                )}
              >
                {title}
              </span>
              <span className="hidden truncate text-xs text-slate-500 lg:block">
                {subtitle || "雨花台区智雨润教 · AI 人工智能教育资源集散中心"}
              </span>
            </div>
          </Link>
        </div>

        {/* Center: nav links (desktop only) */}
        {navLinks.length > 0 && (
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  link.active
                    ? `${t.activeBg} ${t.activeText}`
                    : `text-slate-600 ${t.hoverBg} ${t.hoverText}`
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Right: actions */}
        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          {rightActions}
          {showLogin && (
            <Button
              variant="ghost"
              className={cn(
                "hidden h-9 gap-2 px-3 text-slate-600 md:flex",
                t.hoverBg,
                t.hoverText
              )}
            >
              <User className="h-4 w-4" />
              <span className="text-sm">登录</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
