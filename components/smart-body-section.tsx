"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bot,
  ArrowRight,
  Users,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedElement from "@/components/animated-element"
import ComingSoonDialog from "@/components/agents/coming-soon-dialog"
import { agents } from "@/lib/agents-data"
import { cn } from "@/lib/utils"

const featuredIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
// Stages exposed as quick filter chips on home page (subset of full stages list)
const STAGE_TABS = ["全部", "幼儿园", "小学", "初中", "高中"] as const

export default function SmartBodySection() {
  const [stage, setStage] = useState<(typeof STAGE_TABS)[number]>("全部")
  const [createComingSoonOpen, setCreateComingSoonOpen] = useState(false)

  const featuredAgents = useMemo(() => {
    const pool = agents.filter((a) => featuredIds.includes(a.id))
    if (stage === "全部") return pool.slice(0, 6)
    return pool.filter((a) => a.stage === stage).slice(0, 6)
  }, [stage])

  return (
    <section
      id="smart-body"
      className="relative flex min-h-screen snap-start snap-always items-center overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white py-10 lg:py-12"
    >
      {/* 装饰背景 */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-3xl" />
      <div
        className="pointer-events-none absolute right-0 bottom-1/4 h-72 w-72 animate-pulse rounded-full bg-gradient-to-br from-teal-400/10 to-emerald-400/10 blur-3xl"
        style={{ animationDelay: "1s" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        {/* 标题 */}
        <AnimatedElement
          variant="fade-up"
          duration={1000}
          className="mb-8 text-center lg:mb-10"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
            <Bot className="h-3.5 w-3.5 text-blue-500" />
            <span className="text-xs font-medium text-blue-600">
              智能体集散中心
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
            区级推荐智能体 ·
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              精选赋能教学
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 lg:text-base">
            汇聚雨花台区一线教师共建的教育智能体，覆盖备课、批改、答疑、学情、德育等教学全场景
          </p>
        </AnimatedElement>

        {/* 学段筛选 */}
        <AnimatedElement
          variant="fade-up"
          delay={150}
          duration={1000}
          className="mb-6 flex justify-center lg:mb-8"
        >
          <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-slate-100 bg-white/70 p-1 backdrop-blur-sm">
            {STAGE_TABS.map((s) => {
              const active = stage === s
              return (
                <button
                  key={s}
                  onClick={() => setStage(s)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300 lg:text-sm",
                    active
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                  )}
                >
                  {s}
                </button>
              )
            })}
          </div>
        </AnimatedElement>

        {/* 智能体网格 */}
        <div
          key={stage}
          className="grid min-h-[20rem] gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {featuredAgents.length > 0 ? (
            featuredAgents.map((agent, index) => (
              <AnimatedElement
                key={agent.id}
                variant="scale"
                delay={index * 60}
                duration={800}
              >
                <Link href={`/agents/${agent.id}`}>
                  <div className="group relative flex h-full overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10">
                    {/* 左侧封面图（不再叠图标） */}
                    <div className="relative h-auto w-28 shrink-0 overflow-hidden sm:w-32">
                      <Image
                        src={agent.cover || "/placeholder.svg"}
                        alt={agent.title}
                        fill
                        sizes="(max-width: 640px) 112px, 128px"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/15 to-transparent" />
                    </div>

                    {/* 右侧内容 */}
                    <div className="flex flex-1 flex-col gap-2 p-4">
                      {/* 标题行：图标在标题前 */}
                      <div className="flex items-start gap-2">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-base">
                          {agent.icon}
                        </div>
                        <h3 className="line-clamp-1 flex-1 pt-0.5 text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-600 lg:text-base">
                          {agent.title}
                        </h3>
                        <span className="inline-flex shrink-0 items-center rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                          {agent.stage}
                        </span>
                      </div>
                      <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-slate-600">
                        {agent.description}
                      </p>
                      <div className="flex items-center justify-between border-t border-slate-100 pt-2 text-[11px] text-slate-500">
                        <span className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-slate-700">
                              {agent.rating.toFixed(1)}
                            </span>
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Users className="h-3 w-3" />
                            {agent.usageCount >= 10000
                              ? `${(agent.usageCount / 10000).toFixed(1)}万`
                              : agent.usageCount.toLocaleString()}
                          </span>
                        </span>
                        <span className="flex items-center gap-0.5 text-blue-600 transition-transform group-hover:translate-x-0.5">
                          体验
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))
          ) : (
            <div className="col-span-full flex h-60 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/40 text-sm text-slate-500 backdrop-blur-sm">
              当前学段暂无推荐智能体
            </div>
          )}
        </div>

        {/* 底部 CTA + 轻量统计条 */}
        <AnimatedElement
          variant="fade-up"
          delay={500}
          duration={1000}
          className="mt-10 flex flex-col items-center gap-4 lg:mt-12"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500 lg:text-sm">
            <span className="flex items-center gap-1">
              <Bot className="h-3.5 w-3.5 text-blue-500" />
              平台智能体
              <span className="font-semibold text-slate-800">180+</span>
            </span>
            <span className="hidden h-3 w-px bg-slate-200 sm:block" />
            <span className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5 text-emerald-500" />
              累计使用
              <span className="font-semibold text-slate-800">4754 人次</span>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link href="/agents">
              <Button
                size="default"
                className="h-11 gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-6 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/30"
              >
                进入智能体集散中心
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/agents/create">
              <Button
                size="default"
                variant="outline"
                className="h-11 gap-2 border-blue-200 bg-white/80 px-5 text-sm font-medium text-blue-600 backdrop-blur-sm hover:bg-blue-50"
              >
                上传智能体
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              type="button"
              size="default"
              variant="outline"
              onClick={() => setCreateComingSoonOpen(true)}
              className="h-11 gap-2 border-emerald-200 bg-white/80 px-5 text-sm font-medium text-emerald-600 backdrop-blur-sm hover:bg-emerald-50"
            >
              创建智能体
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </AnimatedElement>
      </div>
      <ComingSoonDialog
        open={createComingSoonOpen}
        onOpenChange={setCreateComingSoonOpen}
        title="创建智能体 · 待上线"
        description="全新的可视化智能体创建工作台正在紧张建设中，敬请期待。您可先使用「上传智能体」功能，将已制作好的智能体发布到集散中心。"
      />
    </section>
  )
}
