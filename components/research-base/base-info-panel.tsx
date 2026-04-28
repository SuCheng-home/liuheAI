"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  MapPin,
  Users,
  Activity,
  CalendarPlus,
  Building2,
  Calendar,
  School,
  ChevronRight,
  ArrowRight,
  Newspaper,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  researchBases,
  recentActivities,
  baseBookingRecords,
  baseCategories,
} from "@/lib/research-base-data"
import type { ResearchBase } from "@/lib/research-base-data"
import BaseDetailDialog from "./base-detail-dialog"
import BookingDialog from "./booking-dialog"
import { cn } from "@/lib/utils"

export default function BaseInfoPanel() {
  const [category, setCategory] = useState("全部")
  const [search, setSearch] = useState("")
  const [detailBase, setDetailBase] = useState<ResearchBase | null>(null)
  const [bookingBase, setBookingBase] = useState<ResearchBase | null>(null)

  const filteredBases = researchBases.filter((b) => {
    const matchCategory = category === "全部" || b.category === category
    const matchSearch =
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  const sidebarActivities = recentActivities.slice(0, 5)

  return (
    <div>
      {/* Search + categories */}
      <div className="mb-6 space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索基地名称或关键词..."
              className="h-11 border-slate-200 bg-white/80 pl-11 pr-4 backdrop-blur-sm"
            />
          </div>
          <div className="text-sm text-slate-500">
            共找到{" "}
            <span className="font-semibold text-slate-900">
              {filteredBases.length}
            </span>{" "}
            个研学基地
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {baseCategories.map((c) => {
            const active = category === c
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                  active
                    ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-600"
                )}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      {/* Two-column layout: base list + activity sidebar */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:gap-8 xl:grid-cols-[1fr_380px]">
        {/* Base list */}
        <div>
          <div className="grid gap-5 sm:grid-cols-2">
            {filteredBases.map((base) => (
              <BaseCard
                key={base.id}
                base={base}
                onDetail={() => setDetailBase(base)}
                onBook={() => setBookingBase(base)}
              />
            ))}
          </div>

          {filteredBases.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 py-14 text-center">
              <Building2 className="mx-auto mb-3 h-10 w-10 text-slate-300" />
              <div className="mb-1 text-base font-medium text-slate-900">
                暂无匹配的研学基地
              </div>
              <div className="text-sm text-slate-500">
                请尝试切换分类或调整关键词
              </div>
            </div>
          )}
        </div>

        {/* Recent activities sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-slate-100 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 px-4 py-3.5">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md">
                  <Newspaper className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">
                    近期活动
                  </div>
                  <div className="text-[11px] text-slate-500">
                    研学基地活动动态
                  </div>
                </div>
              </div>
              <Link
                href="/research-base/activities"
                className="group flex items-center gap-1 text-xs font-medium text-purple-600 transition-colors hover:text-purple-700"
              >
                更多
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <ul className="divide-y divide-slate-100">
              {sidebarActivities.map((a) => (
                <li key={a.id}>
                  <Link
                    href={`/research-base/activities/${a.id}`}
                    className="group flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50/60"
                  >
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={a.image || "/placeholder.svg"}
                        alt={a.title}
                        fill
                        sizes="5rem"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-xs font-semibold leading-snug text-slate-900 transition-colors group-hover:text-purple-600 lg:text-sm">
                        {a.title}
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500">
                        <span className="flex items-center gap-0.5">
                          <Calendar className="h-2.5 w-2.5" />
                          {a.date}
                        </span>
                        <span className="flex items-center gap-0.5 truncate">
                          <School className="h-2.5 w-2.5" />
                          <span className="truncate">{a.school}</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/research-base/activities"
              className="flex w-full items-center justify-center gap-1 border-t border-slate-100 bg-slate-50/50 py-2.5 text-xs font-medium text-slate-600 transition-colors hover:bg-purple-50 hover:text-purple-600"
            >
              查看全部活动报道
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Other dialogs */}
      <BaseDetailDialog
        base={detailBase}
        activities={recentActivities}
        bookings={baseBookingRecords}
        open={!!detailBase}
        onOpenChange={(v) => !v && setDetailBase(null)}
        onBook={(b) => setBookingBase(b)}
      />
      <BookingDialog
        base={bookingBase}
        existingBookings={baseBookingRecords}
        open={!!bookingBase}
        onOpenChange={(v) => !v && setBookingBase(null)}
      />
    </div>
  )
}

function BaseCard({
  base,
  onDetail,
  onBook,
}: {
  base: ResearchBase
  onDetail: () => void
  onBook: () => void
}) {
  const servedLabel =
    base.servedCount >= 10000
      ? `${(base.servedCount / 10000).toFixed(1)} 万人`
      : `${base.servedCount.toLocaleString()} 人`

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-500/10">
      <button
        onClick={onDetail}
        className="relative block h-44 overflow-hidden text-left"
      >
        <Image
          src={base.image || "/placeholder.svg"}
          alt={base.name}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <Badge className="border-0 bg-white/90 text-xs font-medium text-slate-700 backdrop-blur-sm">
            {base.category}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between gap-2 text-xs text-white">
          <span className="flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 backdrop-blur-sm">
            <Activity className="h-3 w-3" />
            {base.activityCount} 次活动
          </span>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/90 px-2 py-0.5 backdrop-blur-sm">
            <Users className="h-3 w-3" />
            已服务 {servedLabel}
          </span>
        </div>
      </button>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <button onClick={onDetail} className="text-left">
          <h3 className="mb-1 font-bold text-slate-900 transition-colors group-hover:text-purple-600 lg:text-lg">
            {base.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500 lg:text-sm">
            {base.description}
          </p>
        </button>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            可容纳 {base.capacity}
          </span>
          <span className="flex items-center gap-1 truncate">
            <MapPin className="h-3 w-3" />
            <span className="truncate">
              {base.address.replace("南京市雨花台区", "")}
            </span>
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onDetail}
            className="h-9 gap-1 px-3 text-xs text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          >
            查看详情
            <ChevronRight className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            onClick={onBook}
            className="h-9 gap-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-3 text-xs font-medium text-white shadow-md shadow-purple-500/25 hover:shadow-lg hover:shadow-purple-500/30"
          >
            <CalendarPlus className="h-3 w-3" />
            立即预约
          </Button>
        </div>
      </div>
    </div>
  )
}
