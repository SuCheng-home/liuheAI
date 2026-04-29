"use client"

import { useEffect, useState, type ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export type SubpageNavLink = {
  label: string
  href: string
  icon?: ReactNode
  active?: boolean
}

export type SubpageHeaderProps = {
  /** 主题色（默认 jasmine：茉莉绿 + 花蕊金） */
  theme?: "jasmine" | "amber"
  icon: ReactNode
  title: string
  subtitle?: string
  homeHref: string
  navLinks?: SubpageNavLink[]
  rightActions?: ReactNode
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
  jasmine: {
    grad: "from-emerald-600 via-emerald-500 to-green-500",
    text: "from-emerald-700 via-emerald-600 to-amber-600",
    activeBg: "bg-emerald-50",
    activeText: "text-emerald-700",
    hoverBg: "hover:bg-emerald-50",
    hoverText: "hover:text-emerald-700",
    shadow: "shadow-emerald-700/5",
  },
  amber: {
    grad: "from-amber-500 via-amber-600 to-orange-500",
    text: "from-amber-600 via-amber-700 to-emerald-700",
    activeBg: "bg-amber-50",
    activeText: "text-amber-700",
    hoverBg: "hover:bg-amber-50",
    hoverText: "hover:text-amber-700",
    shadow: "shadow-amber-500/5",
  },
}

export default function SubpageHeader({
  theme = "jasmine",
  icon,
  title,
  subtitle,
  homeHref,
  navLinks = [],
  rightActions,
  showLogin = true,
}: SubpageHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
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
        {/* 左：返回 + 品牌 */}
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <Link
            href="/"
            className={cn(
              "flex shrink-0 items-center gap-1.5 text-sm text-stone-600 transition-colors",
              t.hoverText
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">返回首页</span>
          </Link>
          <div className="hidden h-6 w-px shrink-0 bg-stone-200 sm:block" />
          <Link href={homeHref} className="flex min-w-0 items-center gap-3">
            <div
              className={cn(
                "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br text-white shadow-md ring-1 ring-white/40 lg:h-11 lg:w-11",
                t.grad
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_55%)]" />
              <span className="relative">{icon}</span>
            </div>
            <div className="flex min-w-0 flex-col">
              <span
                className={cn(
                  "truncate bg-gradient-to-r bg-clip-text font-serif text-base font-bold text-transparent lg:text-lg",
                  t.text
                )}
              >
                {title}
              </span>
              <span className="hidden truncate text-xs text-stone-500 lg:block">
                {subtitle || "茉莉智创 · 六合区AI教育智能体共创平台"}
              </span>
            </div>
          </Link>
        </div>

        {/* 中：导航 */}
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
                    : `text-stone-600 ${t.hoverBg} ${t.hoverText}`
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* 右：操作 */}
        <div className="flex shrink-0 items-center gap-2 lg:gap-3">
          {rightActions}
          {showLogin && (
            <Button
              variant="ghost"
              onClick={() => setLoginOpen(true)}
              className={cn(
                "hidden h-9 gap-2 px-3 text-stone-600 md:flex",
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

      <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>登录功能即将上线</DialogTitle>
            <DialogDescription>
              将与「茉莉慧学」打通，对接南京市六合区师生统一身份认证。平台正式上线后开放登录。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setLoginOpen(false)}
              className="w-full bg-emerald-600 hover:bg-emerald-700 sm:w-auto"
            >
              知道了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
