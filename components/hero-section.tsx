"use client"

import {
  Sparkles,
  Bot,
  Trophy,
  ArrowRight,
  Users,
  GitBranch,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"
import AnimatedElement from "@/components/animated-element"
import JasmineMark from "@/components/jasmine-mark"

const modules = [
  {
    name: "智能体中心",
    desc: "汇聚六合区一线教师共创的教育智能体，覆盖备课、批改、答疑、学情、德育等教学全场景。",
    icon: Bot,
    href: "/agents",
    external: true,
    accent: "emerald",
    metrics: [
      { label: "上架智能体", value: "180+" },
      { label: "覆盖学段", value: "全学段" },
      { label: "累计使用", value: "4.7K+" },
    ],
  },
  {
    name: "竞赛活动",
    desc: "六合区品牌化AI赛事生态，承载师生作品展示、教学创新评比、人工智能素养挑战。",
    icon: Trophy,
    href: "#competitions",
    external: false,
    accent: "amber",
    metrics: [
      { label: "在办赛事", value: "4" },
      { label: "覆盖学段", value: "K-12" },
      { label: "意向参赛", value: "1.2K+" },
    ],
  },
] as const

const highlights = [
  {
    icon: GitBranch,
    title: "区域共创",
    desc: "教师人人可创作、可上传、可共享，沉淀六合本土教学智慧",
  },
  {
    icon: Users,
    title: "茉莉双平台",
    desc: "与「茉莉慧学」打通，覆盖师生学习与教师创作两端",
  },
  {
    icon: Lightbulb,
    title: "面向未来",
    desc: "以人工智能反哺课堂，形成 AI 时代区域教育新范式",
  },
]

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen snap-start snap-always items-center overflow-hidden pt-16"
    >
      {/* 背景层 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/60 via-white to-amber-50/40" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-soft-glow rounded-full bg-emerald-300/25 blur-3xl" />
        <div
          className="absolute right-1/4 top-1/2 h-80 w-80 animate-soft-glow rounded-full bg-amber-300/20 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 h-72 w-72 animate-soft-glow rounded-full bg-green-300/15 blur-3xl"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 pb-12 lg:px-8 lg:pb-0">
        {/* 顶部标识 + 标题 */}
        <div className="mx-auto max-w-4xl text-center">
          <AnimatedElement variant="fade-up" delay={0}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/70 px-4 py-1.5 shadow-sm shadow-emerald-900/5 backdrop-blur-sm">
              <JasmineMark
                variant="filled"
                className="h-4 w-4"
              />
              <span className="text-sm font-medium text-emerald-800">
                六合区AI教育 · 教师智能体共创平台
              </span>
              <span className="rounded-full bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-bold text-amber-950">
                NEW
              </span>
            </div>
          </AnimatedElement>

          <AnimatedElement variant="fade-up" delay={100}>
            <h1 className="mb-5 font-serif text-4xl font-bold leading-[1.15] tracking-tight text-stone-900 lg:text-5xl xl:text-6xl">
              <span className="block">茉莉智创</span>
              <span className="mt-3 block bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-3xl text-transparent lg:text-4xl xl:text-5xl">
                六合区AI教育智能体共创平台
              </span>
            </h1>
          </AnimatedElement>

          <AnimatedElement variant="fade-up" delay={200}>
            <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-stone-600 text-pretty lg:mb-12 lg:text-lg">
              以茉莉花为名，立足六合区，承「茉莉慧学」之初心——
              连接全区一线教师与AI教育资源，让智能体的创作、共享、应用与赛事在课堂中绽放。
            </p>
          </AnimatedElement>
        </div>

        {/* 两大核心板块 */}
        <AnimatedElement variant="fade-up" delay={300}>
          <div className="mb-10 grid gap-5 md:grid-cols-2 lg:gap-7">
            {modules.map((m) => {
              const isEmerald = m.accent === "emerald"
              const cardCls = isEmerald
                ? "border-emerald-200/70 bg-gradient-to-br from-white via-emerald-50/40 to-white hover:border-emerald-400/70 hover:shadow-emerald-500/15"
                : "border-amber-200/70 bg-gradient-to-br from-white via-amber-50/40 to-white hover:border-amber-400/70 hover:shadow-amber-500/15"
              const iconBoxCls = isEmerald
                ? "from-emerald-500 via-emerald-600 to-green-600 shadow-emerald-500/30"
                : "from-amber-400 via-amber-500 to-orange-500 shadow-amber-500/30"
              const linkCls = isEmerald
                ? "text-emerald-700 group-hover:text-emerald-800"
                : "text-amber-700 group-hover:text-amber-800"

              const Inner = (
                <div
                  className={`group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl lg:p-7 ${cardCls}`}
                >
                  {/* 背景花瓣 */}
                  <div className="pointer-events-none absolute -right-6 -top-6 opacity-15 transition-transform duration-700 group-hover:rotate-45 group-hover:opacity-25">
                    <JasmineMark variant="filled" className="h-32 w-32" />
                  </div>

                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg transition-transform duration-500 group-hover:scale-110 lg:h-16 lg:w-16 ${iconBoxCls}`}
                    >
                      <m.icon className="h-7 w-7 text-white lg:h-8 lg:w-8" />
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full bg-stone-100/80 px-3 py-1 text-xs font-medium ${linkCls}`}
                    >
                      立即进入
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <div className="relative">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 lg:text-[26px]">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-stone-600 lg:text-[15px]">
                      {m.desc}
                    </p>
                  </div>

                  <div className="relative mt-auto grid grid-cols-3 gap-2 border-t border-stone-200/70 pt-4">
                    {m.metrics.map((s) => (
                      <div key={s.label} className="text-center">
                        <div
                          className={`font-serif text-xl font-bold lg:text-2xl ${isEmerald ? "text-emerald-700" : "text-amber-700"}`}
                        >
                          {s.value}
                        </div>
                        <div className="mt-0.5 text-[11px] text-stone-500">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )

              return m.external ? (
                <Link key={m.name} href={m.href} className="block h-full">
                  {Inner}
                </Link>
              ) : (
                <a key={m.name} href={m.href} className="block h-full">
                  {Inner}
                </a>
              )
            })}
          </div>
        </AnimatedElement>

        {/* 平台亮点 */}
        <AnimatedElement variant="fade-up" delay={450}>
          <div className="mx-auto grid max-w-5xl gap-3 rounded-2xl border border-stone-200/60 bg-white/70 p-4 backdrop-blur-md sm:grid-cols-3 sm:gap-2 lg:p-5">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="flex items-start gap-3 rounded-xl px-3 py-2"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-50 to-amber-50 ring-1 ring-emerald-100">
                  <h.icon className="h-4 w-4 text-emerald-700" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-stone-900">
                    {h.title}
                  </div>
                  <div className="text-[11px] leading-relaxed text-stone-500 lg:text-xs">
                    {h.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedElement>
      </div>

      {/* 滚动提示 */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] text-stone-400">向下滚动探索</span>
          <div className="flex h-7 w-5 items-start justify-center rounded-full border-2 border-stone-300 p-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-emerald-500" />
          </div>
        </div>
      </div>
    </section>
  )
}
