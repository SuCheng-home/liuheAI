"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Menu, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import JasmineMark from "@/components/jasmine-mark"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type NavItem = {
  name: string
  href: string
  external?: boolean
  newTab?: boolean
}

const navItems: NavItem[] = [
  { name: "首页", href: "#home" },
  { name: "智能体中心", href: "/agents", external: true },
  { name: "竞赛活动", href: "#competitions" },
]

const COMPANION_LINK = {
  label: "茉莉慧学",
  href: "#",
}

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [loginNoticeOpen, setLoginNoticeOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    // 监听 main 容器（首页 snap 滚动）
    const main = document.querySelector<HTMLElement>("main.snap-y")
    const handleMainScroll = () => {
      if (!main) return
      setIsScrolled(main.scrollTop > 20)
    }
    main?.addEventListener("scroll", handleMainScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      main?.removeEventListener("scroll", handleMainScroll)
    }
  }, [])

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false)
    setLoginNoticeOpen(true)
  }

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/85 shadow-lg shadow-emerald-900/5 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Logo + 品牌 */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-green-600 shadow-lg shadow-emerald-700/25 ring-1 ring-white/40 lg:h-14 lg:w-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_55%)]" />
            <JasmineMark
              variant="glyph"
              className="relative h-7 w-7 text-white lg:h-9 lg:w-9"
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold tracking-wide text-emerald-800 lg:text-xl">
              茉莉智创
            </span>
            <span className="hidden text-[11px] text-stone-500 lg:block">
              六合区AI教育智能体共创平台
            </span>
          </div>
        </Link>

        {/* 桌面端导航 */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const className =
              "group relative px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:text-emerald-700"
            const underline = (
              <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-300 group-hover:w-6" />
            )
            if (item.external) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noopener noreferrer" : undefined}
                  className={className}
                >
                  {item.name}
                  {underline}
                </Link>
              )
            }
            return (
              <a key={item.name} href={item.href} className={className}>
                {item.name}
                {underline}
              </a>
            )
          })}

          <span className="mx-1.5 h-5 w-px bg-stone-200" />

          <a
            href={COMPANION_LINK.href}
            onClick={(e) => {
              e.preventDefault()
              setLoginNoticeOpen(true)
            }}
            className="group flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50/70 px-3 py-1 text-xs font-medium text-amber-700 transition-all hover:bg-amber-100"
          >
            {COMPANION_LINK.label}
            <ExternalLink className="h-3 w-3 opacity-70 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* 右侧操作 */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Button
            variant="ghost"
            className="hidden h-9 gap-2 px-3 text-stone-700 hover:bg-emerald-50 hover:text-emerald-700 lg:flex"
            onClick={handleLoginClick}
          >
            <User className="h-4 w-4" />
            <span className="text-sm">登录</span>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            aria-label="切换菜单"
            className="h-9 w-9 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-t border-stone-100 bg-white/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) => {
              if (item.external) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="border-b border-stone-100 py-3 text-sm font-medium text-stone-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              }
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="border-b border-stone-100 py-3 text-sm font-medium text-stone-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              )
            })}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setIsMobileMenuOpen(false)
                setLoginNoticeOpen(true)
              }}
              className="flex items-center justify-between border-b border-stone-100 py-3 text-left text-sm font-medium text-amber-700"
            >
              {COMPANION_LINK.label}
              <ExternalLink className="h-4 w-4" />
            </button>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                onClick={handleLoginClick}
              >
                <User className="mr-2 h-4 w-4" />
                登录
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* 登录提示 */}
      <Dialog open={loginNoticeOpen} onOpenChange={setLoginNoticeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>登录功能即将上线</DialogTitle>
            <DialogDescription>
              将与「茉莉慧学」打通，对接南京市六合区师生统一身份认证。平台正式上线后开放登录。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setLoginNoticeOpen(false)}
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
