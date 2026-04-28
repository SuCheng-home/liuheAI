"use client"

import { useState } from "react"
import {
  Sparkles,
  Bot,
  Building2,
  Crown,
  GraduationCap,
  BookOpen,
  Newspaper,
  CalendarCheck,
  Trophy,
  Award,
} from "lucide-react"
import AnimatedElement from "@/components/animated-element"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type ModuleCard = {
  name: string
  desc: string
  icon: typeof Bot
  href: string
  external: boolean
  accent: string
  comingSoon?: boolean
}

const modules: ModuleCard[] = [
  { name: "智能体中心", desc: "聚焦教学全流程的 AI 助教工具", icon: Bot, href: "/agents", external: true, accent: "from-blue-500 to-cyan-500" },
  { name: "研学基地", desc: "连接真实场景的区域研学实践", icon: Building2, href: "/research-base", external: true, accent: "from-purple-500 to-pink-500" },
  { name: "名师工作室", desc: "汇聚名师团队共研共创成果", icon: Crown, href: "/master-studios", external: true, accent: "from-indigo-500 to-blue-500" },
  { name: "AI 专家导师", desc: "链接高校与产业导师协同指导", icon: GraduationCap, href: "/mentors", external: true, accent: "from-fuchsia-500 to-purple-500" },
  { name: "通识教育", desc: "面向未来素养的 AI 课程体系", icon: BookOpen, href: "#", external: false, accent: "from-rose-500 to-orange-500", comingSoon: true },
  { name: "AI 资讯", desc: "聚合政策动态与教育前沿洞察", icon: Newspaper, href: "/news", external: true, accent: "from-sky-500 to-blue-500" },
  { name: "研训活动", desc: "支撑教师成长的常态化研训平台", icon: CalendarCheck, href: "/training", external: true, accent: "from-emerald-500 to-teal-500" },
  { name: "竞赛活动", desc: "打造区域品牌化 AI 赛事生态", icon: Trophy, href: "https://yh.nje.cn/competition/home", external: true, accent: "from-amber-500 to-orange-500" },
  { name: "优秀作品", desc: "展示师生共创的 AI 教育成果", icon: Award, href: "/works", external: true, accent: "from-pink-500 to-rose-500" },
]

const stats = [
  { value: "180", suffix: "+", label: "优质智能体" },
  { value: "14", suffix: "", label: "研学基地" },
  { value: "6", suffix: "", label: "AI 名师工作室" },
  { value: "25", suffix: "", label: "AI 专家导师" },
  { value: "20", suffix: "+", label: "场 / 学期 · 研训" },
  { value: "450", suffix: "", label: "AI 优秀作品" },
]

export default function HeroSection() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)

  return (
    <section
      id="home"
      className="relative flex min-h-screen snap-start snap-always items-center overflow-hidden bg-gradient-to-b from-slate-50 via-blue-50/30 to-white pt-16"
    >
      {/* 装饰背景 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20 blur-3xl" />
        <div
          className="absolute right-1/4 top-1/2 h-80 w-80 animate-pulse rounded-full bg-gradient-to-br from-teal-400/15 to-emerald-400/15 blur-3xl"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-3xl"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 lg:px-8 lg:pb-0">
        {/* 头部：标签 + 标题 + 描述 */}
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedElement variant="fade-up" delay={0}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">
                区域 AI 公共服务平台 · 一站式赋能教师专业成长
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement variant="fade-up" delay={100}>
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 lg:text-4xl xl:text-5xl">
              <span className="block">智雨润教</span>
              <span className="mt-2 block bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                雨花台区AI教育资源集散中心
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement variant="fade-up" delay={200}>
            <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-slate-600 lg:mb-12 lg:text-lg">
              整合全域优质教育 AI 资源，打造覆盖学习成长、研训赋能、实践创新、成果展示的区域教育 AI 一体化服务生态。
            </p>
          </AnimatedElement>

        </div>

        {/* 九大板块快速入口 */}
        <AnimatedElement variant="fade-up" delay={350}>
          <div className="mb-8 grid grid-cols-3 gap-2.5 sm:grid-cols-3 lg:grid-cols-9 lg:gap-3">
            {modules.map((m) => {
              const inner = (
                <div className="group flex h-full flex-col items-center gap-2 rounded-2xl border border-white/70 bg-white/70 p-3 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 lg:p-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${m.accent} shadow-md transition-transform duration-500 group-hover:scale-110 lg:h-11 lg:w-11`}
                  >
                    <m.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-[12px] font-semibold text-slate-900 lg:text-sm">
                    {m.name}
                  </div>
                  <div className="hidden text-[10px] leading-tight text-slate-500 lg:block">
                    {m.desc}
                  </div>
                </div>
              )
              if (m.comingSoon) {
                return (
                  <button
                    key={m.name}
                    type="button"
                    onClick={() => setComingSoonOpen(true)}
                    className="block h-full text-left"
                  >
                    {inner}
                  </button>
                )
              }
              if (m.external && m.href.startsWith("http")) {
                return (
                  <a
                    key={m.name}
                    href={m.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {inner}
                  </a>
                )
              }
              if (m.external) {
                return (
                  <Link key={m.name} href={m.href} className="block h-full">
                    {inner}
                  </Link>
                )
              }
              return (
                <a key={m.name} href={m.href} className="block h-full">
                  {inner}
                </a>
              )
            })}
          </div>
        </AnimatedElement>

        {/* 平台数据 */}
        <AnimatedElement variant="fade-up" delay={450}>
          <div className="mx-auto max-w-5xl rounded-3xl border border-white/60 bg-white/70 p-5 shadow-lg shadow-blue-500/5 backdrop-blur-md lg:p-6">
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="flex items-baseline justify-center gap-0.5">
                    <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-2xl font-extrabold text-transparent lg:text-3xl">
                      {s.value}
                    </span>
                    {s.suffix && (
                      <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-base font-bold text-transparent lg:text-lg">
                        {s.suffix}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[11px] leading-tight text-slate-500 lg:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>

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

      {/* 滚动提示 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] text-slate-400">向下滚动探索更多</span>
          <div className="flex h-7 w-5 items-start justify-center rounded-full border-2 border-slate-300 p-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
          </div>
        </div>
      </div>
    </section>
  )
}
