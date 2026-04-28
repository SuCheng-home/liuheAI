"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Search,
  Clock,
  Eye,
  Building2,
  Pin,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { newsCategories, newsList, type NewsItem } from "@/lib/news-data"
import AnimatedElement from "@/components/animated-element"

// Today's reference date for computing "最新" badge.
// In production this would be `new Date()`; for stable demo behaviour we use a fixed cutoff.
const NOW = new Date("2026-04-26")
const NEW_DAYS_THRESHOLD = 30

function isRecentlyPublished(date: string): boolean {
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return false
  const diffDays = (NOW.getTime() - d.getTime()) / (1000 * 60 * 60 * 24)
  return diffDays <= NEW_DAYS_THRESHOLD && diffDays >= 0
}

const CATEGORY_COLORS: Record<string, string> = {
  政策解读: "bg-amber-50 text-amber-700 border-amber-200",
  技术前沿: "bg-cyan-50 text-cyan-700 border-cyan-200",
  应用案例: "bg-emerald-50 text-emerald-700 border-emerald-200",
  区域动态: "bg-blue-50 text-blue-700 border-blue-200",
  全部: "bg-slate-50 text-slate-600 border-slate-200",
}

export default function NewsPortal() {
  const [category, setCategory] = useState<(typeof newsCategories)[number]>(
    "全部"
  )
  const [keyword, setKeyword] = useState("")

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    return newsList.filter((n) => {
      const matchCategory = category === "全部" || n.category === category
      const matchKeyword =
        !k ||
        n.title.toLowerCase().includes(k) ||
        n.summary.toLowerCase().includes(k) ||
        n.source.toLowerCase().includes(k) ||
        n.tags.some((t) => t.toLowerCase().includes(k))
      return matchCategory && matchKeyword
    })
  }, [category, keyword])

  // Sort with pinned items first, then by date desc
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  }, [filtered])

  return (
    <div className="relative mx-auto max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Page header */}
      <AnimatedElement variant="fade-up" duration={900}>
        <div className="mb-8 text-center lg:mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600">
              雨花台区智雨润教 · AI 人工智能教育资源集散中心
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            AI
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
              {' '}资讯中心
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
            聚合教育人工智能领域政策动态、技术进展与实践案例，服务区域教师教学创新与专业成长。
          </p>
        </div>
      </AnimatedElement>

      {/* Search */}
      <AnimatedElement variant="fade-up" delay={80} duration={900}>
        <div className="mb-5 flex items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="搜索资讯标题 / 来源单位 / 关键词"
              className="h-10 border-slate-200 bg-white/80 pl-9 backdrop-blur-sm"
            />
          </div>
        </div>
      </AnimatedElement>

      {/* Categories */}
      <AnimatedElement variant="fade-up" delay={120} duration={900}>
        <div className="mb-6 flex flex-wrap gap-2 lg:mb-8">
          {newsCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300",
                category === cat
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md shadow-blue-500/25"
                  : "bg-white/70 text-slate-600 backdrop-blur-sm hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </AnimatedElement>

      {sorted.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/50 text-sm text-slate-500">
          暂无匹配的资讯
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/70 backdrop-blur-sm">
          <ul className="divide-y divide-slate-100">
            {sorted.map((news, index) => (
              <NewsRow key={news.id} news={news} index={index} />
            ))}
          </ul>
          <div className="border-t border-slate-100 bg-slate-50/40 px-5 py-3 text-center text-xs text-slate-500">
            共 {sorted.length} 条资讯
          </div>
        </div>
      )}
    </div>
  )
}

function NewsRow({ news, index }: { news: NewsItem; index: number }) {
  const isNew = isRecentlyPublished(news.date)
  const categoryStyle =
    CATEGORY_COLORS[news.category] || CATEGORY_COLORS.全部

  return (
    <AnimatedElement variant="fade-up" delay={index * 40} duration={700}>
      <li>
        <Link
          href={`/news/${news.id}`}
          className="group flex gap-4 px-4 py-4 transition-colors hover:bg-blue-50/40 lg:gap-5 lg:px-5 lg:py-5"
        >
          {/* Thumbnail */}
          <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-slate-100 sm:h-28 sm:w-40">
            <Image
              src={news.coverImage || "/placeholder.svg"}
              alt={news.title}
              fill
              sizes="(max-width: 640px) 128px, 160px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Body */}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            {/* Tags row: pinned + new + category */}
            <div className="flex flex-wrap items-center gap-1.5">
              {news.pinned && (
                <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-1.5 py-0.5 text-[11px] font-semibold text-rose-600">
                  <Pin className="h-3 w-3" />
                  置顶
                </span>
              )}
              {isNew && !news.pinned && (
                <span className="inline-flex items-center gap-1 rounded-md bg-gradient-to-r from-emerald-500 to-cyan-500 px-1.5 py-0.5 text-[11px] font-semibold text-white">
                  <Sparkles className="h-3 w-3" />
                  最新
                </span>
              )}
              <span
                className={cn(
                  "rounded-md border px-1.5 py-0.5 text-[11px] font-medium",
                  categoryStyle
                )}
              >
                {news.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600 lg:text-lg">
              {news.title}
            </h3>

            {/* Summary */}
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 lg:text-sm">
              {news.summary}
            </p>

            {/* Meta */}
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-slate-500 lg:text-xs">
              <span className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{news.source}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {news.date}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {news.views.toLocaleString()}
              </span>
            </div>
          </div>
        </Link>
      </li>
    </AnimatedElement>
  )
}
