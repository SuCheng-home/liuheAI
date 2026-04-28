"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Award,
  Search,
  Star,
  Heart,
  GraduationCap,
  User as UserIcon,
  Sparkles,
  Calendar,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  works,
  workTypes,
  workSortOptions,
  type Work,
  type WorkSortId,
  type WorkType,
} from "@/lib/works-data"
import AnimatedElement from "@/components/animated-element"
import { cn } from "@/lib/utils"

const ROLE_FILTERS = ["全部", "教师", "学生"] as const

export default function WorksPortal() {
  const [type, setType] = useState<(typeof workTypes)[number]>("全部")
  const [role, setRole] = useState<(typeof ROLE_FILTERS)[number]>("全部")
  const [sort, setSort] = useState<WorkSortId>("newest")
  const [keyword, setKeyword] = useState("")

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    let result = works.filter((w) => {
      if (type !== "全部" && w.type !== type) return false
      if (role !== "全部" && w.creator.role !== role) return false
      if (k) {
        const haystack = [
          w.title,
          w.summary,
          w.creator.name,
          ...w.tags,
        ]
          .join(" ")
          .toLowerCase()
        if (!haystack.includes(k)) return false
      }
      return true
    })

    if (sort === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating)
    } else if (sort === "likes") {
      result = [...result].sort((a, b) => b.likes - a.likes)
    }
    return result
  }, [type, role, sort, keyword])

  const hasFilters =
    type !== "全部" || role !== "全部" || keyword !== "" || sort !== "newest"

  const clearAll = () => {
    setType("全部")
    setRole("全部")
    setSort("newest")
    setKeyword("")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Page header */}
      <AnimatedElement variant="fade-up" duration={800}>
        <div className="mb-8 text-center lg:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-600">
              雨花台区智雨润教 · 师生 AI 创作精选
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            AI
            <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
              {' '}优秀作品集
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
            汇聚区域师生 AI 创作成果，涵盖图文、音频、视频与智能体应用，展示教学创新与学习成长的真实实践。
          </p>
        </div>
      </AnimatedElement>

      {/* 搜索条 - 与导师页一致的样式 */}
      <AnimatedElement variant="fade-up" delay={100} duration={800}>
        <div className="mb-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="按作品名称、作者、标签搜索..."
              className="h-12 border-slate-200 bg-white/80 pl-11 shadow-sm backdrop-blur-sm"
            />
          </div>
        </div>
      </AnimatedElement>

      {/* 筛选 chips */}
      <AnimatedElement variant="fade-up" delay={150} duration={800}>
        <div className="mb-6 space-y-3 rounded-2xl border border-slate-100 bg-white/60 p-4 backdrop-blur-sm">
          <ChipGroup
            label="作品类型"
            options={workTypes}
            value={type}
            onChange={(v) => setType(v as WorkType | "全部")}
          />
          <ChipGroup
            label="作者身份"
            options={ROLE_FILTERS}
            value={role}
            onChange={(v) => setRole(v as (typeof ROLE_FILTERS)[number])}
          />
          <ChipGroup
            label="排序方式"
            options={workSortOptions.map((o) => o.label)}
            value={
              workSortOptions.find((o) => o.id === sort)?.label ??
              workSortOptions[0].label
            }
            onChange={(v) => {
              const opt = workSortOptions.find((o) => o.label === v)
              if (opt) setSort(opt.id)
            }}
          />
        </div>
      </AnimatedElement>

      {/* 结果统计行 */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-slate-600">
          共找到{" "}
          <span className="font-bold text-amber-600">{filtered.length}</span>{" "}
          件作品
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-8 text-xs text-slate-500 hover:text-amber-600"
          >
            清除筛选
          </Button>
        )}
      </div>

      {/* 作品卡片网格 */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((w, i) => (
            <AnimatedElement
              key={w.id}
              variant="scale"
              delay={i * 60}
              duration={700}
            >
              <WorkCard work={w} />
            </AnimatedElement>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 py-20 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Award className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-700">
            未找到匹配的作品
          </h3>
          <p className="text-sm text-slate-500">
            请尝试调整筛选条件或更换关键词
          </p>
        </div>
      )}
    </div>
  )
}


function ChipGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <div className="w-20 shrink-0 text-sm font-semibold text-slate-700">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all duration-300",
              value === opt
                ? "border-transparent bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25"
                : "border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}

const TYPE_STYLES: Record<WorkType, string> = {
  图片: "bg-pink-50 text-pink-600 border-pink-200",
  音频: "bg-amber-50 text-amber-700 border-amber-200",
  视频: "bg-cyan-50 text-cyan-700 border-cyan-200",
  智能体: "bg-blue-50 text-blue-600 border-blue-200",
}

function WorkCard({ work }: { work: Work }) {
  const isStudent = work.creator.role === "学生"
  return (
    <Link
      href={`/works/${work.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-amber-200 hover:shadow-2xl hover:shadow-amber-500/10"
    >
      {/* 封面 - 仅预览 */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image
          src={work.cover || "/placeholder.svg"}
          alt={work.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {work.award && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white shadow-md">
            <Sparkles className="h-2.5 w-2.5" />
            {work.award}
          </div>
        )}
      </div>

      {/* 内容 */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium",
              TYPE_STYLES[work.type]
            )}
          >
            {work.type}
          </span>
          {isStudent ? (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-pink-50 px-1.5 py-0.5 text-[10px] font-medium text-pink-600">
              <GraduationCap className="h-2.5 w-2.5" />
              学生
            </span>
          ) : (
            <span className="inline-flex items-center gap-0.5 rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
              <UserIcon className="h-2.5 w-2.5" />
              教师
            </span>
          )}
        </div>

        <h3 className="line-clamp-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-amber-600 lg:text-base">
          {work.title}
        </h3>

        <p className="line-clamp-2 text-xs leading-relaxed text-slate-600">
          {work.summary}
        </p>

        {/* 作者 */}
        <div className="text-[11px] text-slate-500">
          <div className="font-medium text-slate-700">
            {(() => {
              const authors = work.authors && work.authors.length > 0 ? work.authors : [work.creator]
              const first = authors[0]
              return (
                <>
                  {first.name}
                  {authors.length > 1 && (
                    <span className="ml-1 text-slate-500">等 {authors.length} 位</span>
                  )}
                  {isStudent && first.grade && (
                    <span className="ml-1 text-slate-500">· {first.grade}</span>
                  )}
                  {!isStudent && first.subject && (
                    <span className="ml-1 text-slate-500">· {first.subject}</span>
                  )}
                </>
              )
            })()}
          </div>
          <div className="truncate">
            {(work.authors && work.authors.length > 0 ? work.authors[0].school : work.creator.school)}
          </div>
        </div>

        {/* 数据 */}
        <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-slate-700">
              {work.rating.toFixed(1)}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Heart className="h-3 w-3 fill-rose-400 text-rose-400" />
            {work.likes.toLocaleString()}
          </span>
          <span className="ml-auto flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {work.createdAt}
          </span>
        </div>
      </div>
    </Link>
  )
}
