"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  Search,
  MapPin,
  Calendar,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { trainingActivities } from "@/lib/training-data"
import AnimatedElement from "@/components/animated-element"

const STATUS_CLASS: Record<string, string> = {
  未开始: "bg-slate-100 text-slate-700 border-slate-200",
  进行中: "bg-amber-100 text-amber-700 border-amber-200",
  已结束: "bg-slate-100 text-slate-500 border-slate-200",
}

function getStatusLabel(status: string) {
  if (status === "报名中") return "未开始"
  return status
}

function getStage(subject: string) {
  if (subject.startsWith("小学")) return "小学"
  if (subject.startsWith("初中")) return "初中"
  if (subject.startsWith("高中")) return "高中"
  return "综合"
}

function getDiscipline(subject: string) {
  if (
    subject.startsWith("小学") ||
    subject.startsWith("初中") ||
    subject.startsWith("高中")
  ) {
    return subject.slice(2)
  }
  return subject
}

export default function TrainingPortal() {
  const [stage, setStage] = useState("全部")
  const [discipline, setDiscipline] = useState("全部")
  const [keyword, setKeyword] = useState("")

  const stageOptions = useMemo(() => {
    const set = new Set(trainingActivities.map((t) => getStage(t.subject)))
    return ["全部", ...Array.from(set)]
  }, [])

  const disciplineOptions = useMemo(() => {
    const set = new Set(trainingActivities.map((t) => getDiscipline(t.subject)))
    return ["全部", ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    return trainingActivities.filter((t) => {
      const matchStage = stage === "全部" || getStage(t.subject) === stage
      const matchDiscipline =
        discipline === "全部" || getDiscipline(t.subject) === discipline
      const matchKeyword = !k || t.title.toLowerCase().includes(k)
      return matchStage && matchDiscipline && matchKeyword
    })
  }, [stage, discipline, keyword])

  return (
    <div className="relative mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <AnimatedElement variant="fade-up" duration={900}>
        <div className="mb-8 text-center lg:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-600">
              雨花台区教师发展中心 · AI 教师专业发展平台
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            AI
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {" "}研训活动
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
            聚焦新课标与课堂实践，围绕 AI 与学科教学融合开展专题研修与实践交流，持续赋能教师专业成长。
          </p>
        </div>
      </AnimatedElement>

      <AnimatedElement variant="fade-up" delay={80} duration={900}>
        <div className="mb-5 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索活动名称"
              className="h-10 border-slate-200 bg-white/80 pl-9 backdrop-blur-sm"
            />
          </div>
        </div>
      </AnimatedElement>

      <AnimatedElement variant="fade-up" delay={100} duration={900}>
        <div className="mb-6 space-y-3 lg:mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">学段：</span>
            {stageOptions.map((s) => (
              <button
                key={s}
                onClick={() => setStage(s)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                  stage === s
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-white/70 text-slate-600 backdrop-blur-sm hover:bg-emerald-50 hover:text-emerald-600"
                )}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-700">学科：</span>
            {disciplineOptions.map((d) => (
              <button
                key={d}
                onClick={() => setDiscipline(d)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                  discipline === d
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25"
                    : "bg-white/70 text-slate-600 backdrop-blur-sm hover:bg-emerald-50 hover:text-emerald-600"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </AnimatedElement>

      {filtered.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 text-sm text-slate-500">
          暂无匹配的研训活动
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/85 backdrop-blur-sm">
          <ul className="divide-y divide-slate-100">
            {filtered.map((activity, index) => {
              const statusLabel = getStatusLabel(activity.status)
              return (
                <AnimatedElement
                  key={activity.id}
                  variant="fade-up"
                  delay={120 + index * 50}
                  duration={700}
                >
                  <li>
                    <Link
                      href={`/training/${activity.id}`}
                      className="group block px-5 py-4 transition-colors hover:bg-emerald-50/50"
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700">
                          {getStage(activity.subject)}
                        </Badge>
                        <Badge className="border border-emerald-200 bg-emerald-50 text-xs font-medium text-emerald-700">
                          {getDiscipline(activity.subject)}
                        </Badge>
                        <Badge
                          className={cn(
                            "border text-xs font-medium",
                            STATUS_CLASS[statusLabel] ?? STATUS_CLASS.已结束
                          )}
                        >
                          {statusLabel}
                        </Badge>
                      </div>

                      <h3 className="text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-emerald-600 lg:text-lg">
                        {activity.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500 lg:text-sm">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                          {activity.startAt}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                          <span className="line-clamp-1">{activity.location}</span>
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-end text-xs text-emerald-600 lg:text-sm">
                        <span className="flex items-center gap-1 transition-transform group-hover:translate-x-0.5">
                          查看详情
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </Link>
                  </li>
                </AnimatedElement>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
