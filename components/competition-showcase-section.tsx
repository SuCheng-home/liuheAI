"use client"

import { useState } from "react"
import {
  Trophy,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  Building2,
  Calendar,
  Target,
  Medal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedElement from "@/components/animated-element"
import ComingSoonDialog from "@/components/agents/coming-soon-dialog"
import JasmineMark from "@/components/jasmine-mark"

type Competition = {
  id: string
  name: string
  organizers: string
  level: "省级" | "市级" | "区级"
  participants: number
  deadline: string
  status: "报名中" | "即将开放" | "筹备中"
  audience: string
  externalUrl?: string
  highlight?: string
}

const FEATURED: Competition = {
  id: "lh-jasmine-1",
  name: "六合区第一届「茉莉杯」中小学AI智能体创客大赛",
  organizers: "南京市六合区教育局 · 六合区教师发展中心",
  level: "区级",
  participants: 1280,
  deadline: "2026-12-20",
  status: "报名中",
  audience: "全区中小学师生",
  highlight:
    "围绕学科教学、校园治理、文化传承三大主题，挑战「让茉莉花在校园绽放」的AI创意命题",
}

const RECENT: Competition = {
  id: "lh-app-1",
  name: "2026年六合区中小学人工智能应用创新大赛",
  organizers: "南京市六合区教育局",
  level: "区级",
  participants: 2460,
  deadline: "2026-11-30",
  status: "即将开放",
  audience: "中小学教师",
  highlight: "聚焦AI技术与学科教学融合，鼓励教师将智能体落地真实课堂场景",
}

const LEVEL_STYLES: Record<Competition["level"], string> = {
  省级: "bg-purple-100 text-purple-700",
  市级: "bg-amber-100 text-amber-800",
  区级: "bg-emerald-100 text-emerald-700",
}

const STATUS_STYLES: Record<Competition["status"], string> = {
  报名中: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  即将开放: "bg-amber-100 text-amber-800 ring-amber-200",
  筹备中: "bg-stone-100 text-stone-600 ring-stone-200",
}

export default function CompetitionShowcaseSection() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [comingSoonName, setComingSoonName] = useState("")

  const handleClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault()
    setComingSoonName(name)
    setComingSoonOpen(true)
  }

  return (
    <section
      id="competitions"
      className="relative overflow-hidden py-16 lg:py-20"
    >
      {/* 背景 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-amber-50/40 to-white" />
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-soft-glow rounded-full bg-amber-300/15 blur-3xl" />
      <div
        className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 animate-soft-glow rounded-full bg-emerald-300/15 blur-3xl"
        style={{ animationDelay: "1.8s" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        {/* 标题 */}
        <AnimatedElement
          variant="fade-up"
          duration={1100}
          className="mb-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left lg:mb-10"
        >
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-50/80 px-3.5 py-1">
              <Trophy className="h-3.5 w-3.5 text-amber-700" />
              <span className="text-xs font-medium text-amber-800">
                板块二 · 竞赛活动
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-stone-900 lg:text-4xl">
              茉莉杯AI赛事 ·
              <span className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-700 bg-clip-text text-transparent">
                {" "}
                师生共创共赛
              </span>
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-600 lg:text-base">
              搭建六合区品牌化AI赛事生态，承载从教师创新到学生作品的层级化竞赛体系。
            </p>
          </div>
          <a
            href="#"
            onClick={(e) => handleClick(e, "六合区赛事总览")}
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-amber-300/70 bg-white/80 px-4 py-2 text-sm font-medium text-amber-800 backdrop-blur-sm transition hover:bg-amber-50"
          >
            查看更多赛事
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </AnimatedElement>

        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-6">
          {/* 重点推荐赛事 */}
          <AnimatedElement variant="fade-up" delay={100} duration={1100}>
            <a
              href={FEATURED.externalUrl || "#"}
              onClick={(e) => {
                if (FEATURED.externalUrl) return
                handleClick(e, FEATURED.name)
              }}
              target={FEATURED.externalUrl ? "_blank" : undefined}
              rel={FEATURED.externalUrl ? "noopener noreferrer" : undefined}
              className="group block h-full overflow-hidden rounded-3xl border border-amber-200/60 bg-gradient-to-br from-amber-50/70 via-white to-emerald-50/50 p-6 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-amber-300 hover:shadow-2xl hover:shadow-amber-500/15 lg:p-8"
            >
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 py-0.5 text-[11px] font-semibold text-white shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  重点推荐
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${LEVEL_STYLES[FEATURED.level]}`}
                >
                  {FEATURED.level}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${STATUS_STYLES[FEATURED.status]}`}
                >
                  {FEATURED.status}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 ring-1 ring-emerald-200">
                  <JasmineMark variant="filled" className="h-3 w-3" />
                  茉莉杯
                </span>
              </div>
              <h3 className="mb-2 font-serif text-2xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-amber-700 lg:text-[26px]">
                {FEATURED.name}
              </h3>
              {FEATURED.highlight && (
                <p className="mb-5 text-sm leading-relaxed text-stone-600 lg:text-[15px]">
                  {FEATURED.highlight}
                </p>
              )}
              <div className="mb-6 grid gap-2 text-xs text-stone-600 sm:grid-cols-2 lg:text-sm">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-emerald-600" />
                  {FEATURED.organizers}
                </span>
                <span className="flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-emerald-600" />
                  {FEATURED.audience}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-amber-600" />
                  截止 {FEATURED.deadline}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-amber-600" />
                  {FEATURED.participants.toLocaleString()} 人意向报名
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 ring-1 ring-amber-200">
                  <Medal className="h-6 w-6 text-white" />
                </div>
                <Button
                  size="default"
                  className="h-11 gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 px-5 text-sm font-medium text-white shadow-lg shadow-amber-500/30 hover:shadow-xl"
                >
                  了解详情
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </a>
          </AnimatedElement>

          {/* 次要赛事 */}
          <AnimatedElement variant="fade-up" delay={200} duration={1100}>
            <a
              href="#"
              onClick={(e) => handleClick(e, RECENT.name)}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-200/70 bg-gradient-to-br from-white via-emerald-50/40 to-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-500/15"
            >
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${LEVEL_STYLES[RECENT.level]}`}
                >
                  {RECENT.level}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ${STATUS_STYLES[RECENT.status]}`}
                >
                  {RECENT.status}
                </span>
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold leading-snug text-stone-900 transition-colors group-hover:text-emerald-700">
                {RECENT.name}
              </h3>
              {RECENT.highlight && (
                <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-stone-600">
                  {RECENT.highlight}
                </p>
              )}
              <div className="mt-auto space-y-2 border-t border-stone-100 pt-3 text-[11px] text-stone-500 lg:text-xs">
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3 w-3 text-emerald-600" />
                  <span className="truncate">{RECENT.organizers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-amber-600" />
                    截止 {RECENT.deadline}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-emerald-700 transition-transform group-hover:translate-x-0.5">
                    了解详情
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </a>
          </AnimatedElement>
        </div>
      </div>

      <ComingSoonDialog
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        title="赛事报名通道筹备中"
        description={
          comingSoonName
            ? `「${comingSoonName}」的报名通道正在与主办单位对接中，敬请关注后续公告。`
            : "该赛事报名通道暂未开通，敬请期待。"
        }
      />
    </section>
  )
}
