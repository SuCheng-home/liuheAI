"use client"

import { ArrowRight, Bot, Trophy, GitBranch, Users, Lightbulb } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AnimatedElement from "@/components/animated-element"
import JasmineMark from "@/components/jasmine-mark"
import JasmineAvatar from "@/components/jasmine-avatar"

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
      className="relative overflow-hidden pb-12 pt-24 lg:pb-16 lg:pt-28"
    >
      {/* 背景层 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/70 via-white to-amber-50/30" />
        <div className="absolute left-1/4 top-1/4 h-80 w-80 animate-soft-glow rounded-full bg-emerald-300/25 blur-3xl" />
        <div
          className="absolute right-1/4 top-1/3 h-72 w-72 animate-soft-glow rounded-full bg-amber-300/20 blur-3xl"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          {/* 左：品牌文案 */}
          <div>
            <AnimatedElement variant="fade-up" delay={0}>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/70 px-4 py-1.5 shadow-sm shadow-emerald-900/5 backdrop-blur-sm">
                <JasmineMark variant="filled" className="h-4 w-4" />
                <span className="text-sm font-medium text-emerald-800">
                  六合区AI教育 · 教师智能体共创平台
                </span>
                <span className="rounded-full bg-amber-400/90 px-1.5 py-0.5 text-[10px] font-bold text-amber-950">
                  NEW
                </span>
              </div>
            </AnimatedElement>

            <AnimatedElement variant="fade-up" delay={100}>
              <h1 className="mb-5 font-serif text-4xl font-bold leading-[1.1] tracking-tight text-stone-900 lg:text-5xl xl:text-[56px]">
                <span className="block">茉莉智创</span>
                <span className="mt-3 block bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-3xl text-transparent lg:text-4xl xl:text-[40px]">
                  六合区AI教育智能体共创平台
                </span>
              </h1>
            </AnimatedElement>

            <AnimatedElement variant="fade-up" delay={200}>
              <p className="mb-7 max-w-xl text-base leading-relaxed text-stone-600 lg:text-lg">
                以茉莉花为名，立足六合区，承「茉莉慧学」之初心——
                连接全区一线教师与AI教育资源，让智能体的创作、共享、应用与赛事在课堂中绽放。
              </p>
            </AnimatedElement>

            <AnimatedElement variant="fade-up" delay={300}>
              <div className="mb-8 flex flex-wrap items-center gap-3">
                <Link href="/agents">
                  <Button
                    size="lg"
                    className="h-12 gap-2 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 px-6 text-sm font-medium text-white shadow-lg shadow-emerald-600/25 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-600/35"
                  >
                    <Bot className="h-4 w-4" />
                    进入智能体中心
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#competitions">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 gap-2 border-amber-200 bg-white/80 px-5 text-sm font-medium text-amber-800 backdrop-blur-sm hover:bg-amber-50"
                  >
                    <Trophy className="h-4 w-4" />
                    查看竞赛活动
                  </Button>
                </a>
              </div>
            </AnimatedElement>

            <AnimatedElement variant="fade-up" delay={400}>
              <div className="grid gap-3 rounded-2xl border border-stone-200/60 bg-white/70 p-4 backdrop-blur-md sm:grid-cols-3">
                {highlights.map((h) => (
                  <div
                    key={h.title}
                    className="flex items-start gap-3 rounded-xl px-2 py-1.5"
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

          {/* 右：数字人 */}
          <AnimatedElement variant="fade-up" delay={150}>
            <JasmineAvatar />
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
