"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, ChevronDown, Menu, X } from "lucide-react"
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

type NavItem = {
  name: string
  href: string
  hasDropdown?: boolean
  external?: boolean
  /** open href in a new tab */
  newTab?: boolean
  /** trigger an info dialog instead of navigation */
  comingSoon?: boolean
}

const navItems: NavItem[] = [
  { name: "首页", href: "#home" },
  { name: "智能体中心", href: "/agents", external: true },
  { name: "研学基地", href: "/research-base", external: true },
  { name: "名师工作室", href: "/master-studios", external: true },
  { name: "AI 专家导师", href: "/mentors", external: true },
  { name: "通识教育", href: "#general-education", comingSoon: true },
  { name: "AI 资讯", href: "/news", external: true },
  { name: "研训活动", href: "/training", external: true },
  {
    name: "竞赛活动",
    href: "https://yh.nje.cn/competition/home",
    external: true,
    newTab: true,
  },
  { name: "优秀作品", href: "/works", external: true },
]

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [loginNoticeOpen, setLoginNoticeOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleComingSoon = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    setComingSoonOpen(true)
  }

  const handleLoginClick = () => {
    setIsMobileMenuOpen(false)
    setLoginNoticeOpen(true)
  }

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 shadow-lg shadow-blue-500/5 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:h-20 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30 ring-1 ring-white/30 lg:h-14 lg:w-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
            <svg
              viewBox="0 0 48 48"
              className="relative h-8 w-8 text-white lg:h-9 lg:w-9"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* 资源集散中心 */}
              <circle cx="24" cy="18" r="5" />
              <circle cx="12" cy="10" r="2" />
              <circle cx="36" cy="10" r="2" />
              <circle cx="10" cy="27" r="2" />
              <circle cx="38" cy="27" r="2" />
              <path d="M16 12l4 3" />
              <path d="M32 12l-4 3" />
              <path d="M12 26l7-4" />
              <path d="M36 26l-7-4" />
              {/* 教育底座（书本） */}
              <path d="M14 33c3-2 5.2-3 10-3s7 1 10 3v6c-3-2-5.2-3-10-3s-7 1-10 3z" />
              <path d="M24 30v9" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-base font-bold leading-tight text-transparent lg:text-lg">
              智雨润教
            </span>
            <span className="hidden text-[11px] leading-tight text-slate-500 lg:block">
              雨花台区AI教育资源集散中心
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            if (item.comingSoon) {
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={handleComingSoon}
                  className="group relative flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all group-hover:w-full" />
                </button>
              )
            }
            if (item.external) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  rel={item.newTab ? "noopener noreferrer" : undefined}
                  className="group relative flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all group-hover:w-full" />
                </Link>
              )
            }
            return (
              <a
                key={item.name}
                href={item.href}
                className="group relative flex items-center gap-1 px-2.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
              >
                {item.name}
                {item.hasDropdown && (
                  <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                )}
                <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all group-hover:w-full" />
              </a>
            )
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Button
            variant="ghost"
            className="hidden h-9 gap-2 px-3 text-slate-600 hover:bg-blue-50 hover:text-blue-600 lg:flex"
            onClick={handleLoginClick}
          >
            <User className="h-4 w-4" />
            <span className="text-sm">登录</span>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-t border-slate-100 bg-white/95 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col px-4 py-4">
            {navItems.map((item) => {
              if (item.comingSoon) {
                return (
                  <button
                    key={item.name}
                    type="button"
                    onClick={handleComingSoon}
                    className="flex items-center justify-between border-b border-slate-100 py-3 text-left text-sm font-medium text-slate-600"
                  >
                    {item.name}
                  </button>
                )
              }
              if (item.external) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    rel={item.newTab ? "noopener noreferrer" : undefined}
                    className="flex items-center justify-between border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
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
                  className="flex items-center justify-between border-b border-slate-100 py-3 text-sm font-medium text-slate-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                  {item.hasDropdown && <ChevronDown className="h-4 w-4" />}
                </a>
              )
            })}
            <div className="mt-4 flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleLoginClick}>
                <User className="mr-2 h-4 w-4" />
                登录
              </Button>
            </div>
          </nav>
        </div>
      )}

      {/* 通识教育 — 建设中提示 */}
      <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>通识教育 · 建设中</DialogTitle>
            <DialogDescription>
              平台建设中，敬请期待。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setComingSoonOpen(false)} className="w-full sm:w-auto">
              知道了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 登录提示 */}
      <Dialog open={loginNoticeOpen} onOpenChange={setLoginNoticeOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>登录功能即将上线</DialogTitle>
            <DialogDescription>
              将对接南京市师生统一身份认证系统，平台正式上线后会完成对接并开放登录。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setLoginNoticeOpen(false)} className="w-full sm:w-auto">
              知道了
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  )
}
