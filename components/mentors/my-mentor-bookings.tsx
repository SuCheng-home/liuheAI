"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Clock,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Phone,
  User,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  initialBookings,
  expertMentors,
  type BookingStatus,
} from "@/lib/mentors-data"
import { cn } from "@/lib/utils"

const statusConfig: Record<
  BookingStatus,
  { label: string; icon: typeof Clock; class: string }
> = {
  pending: {
    label: "未审批",
    icon: Clock,
    class: "bg-amber-100 text-amber-700",
  },
  approved: {
    label: "已审批通过",
    icon: CheckCircle2,
    class: "bg-emerald-100 text-emerald-700",
  },
  rejected: {
    label: "已退回",
    icon: XCircle,
    class: "bg-rose-100 text-rose-700",
  },
}

export default function MyMentorBookings() {
  const [filter, setFilter] = useState<BookingStatus | "all">("all")

  const filtered = initialBookings.filter(
    (b) => filter === "all" || b.status === filter
  )

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Hero */}
      <div className="mb-8 lg:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-600">
            雨花台区专家导师协同服务平台
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          我的
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
            {' '}预约记录
          </span>
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
          查看您已提交的导师预约申请，跟进审批进度，并及时掌握后续服务安排。
        </p>
      </div>

      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { key: "all", label: "全部" },
          { key: "pending", label: "未审批" },
          { key: "approved", label: "已审批通过" },
          { key: "rejected", label: "被退回" },
        ].map((opt) => {
          const active = filter === opt.key
          return (
            <button
              key={opt.key}
              onClick={() =>
                setFilter(opt.key as BookingStatus | "all")
              }
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                active
                  ? "border-transparent bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                  : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-600"
              )}
            >
              {opt.label}
            </button>
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 py-20 text-center">
          <CalendarCheck className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">暂无对应预约</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => {
            const mentor = expertMentors.find(
              (m) => m.id === booking.mentorId
            )
            if (!mentor) return null
            const conf = statusConfig[booking.status]
            const StatusIcon = conf.icon
            return (
              <div
                key={booking.id}
                className="rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:border-purple-200 hover:shadow-md"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-white shadow-md">
                    <Image
                      src={mentor.avatar || "/placeholder.svg"}
                      alt={mentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-slate-900">
                        {mentor.name}
                      </h3>
                      <span className="text-xs text-slate-500">
                        {mentor.title}
                      </span>
                      <Badge
                        className={cn(
                          "ml-auto gap-1 border-0 text-xs font-medium",
                          conf.class
                        )}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {conf.label}
                      </Badge>
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-slate-800">
                      {booking.trainingTopic}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <CalendarCheck className="h-3.5 w-3.5" />
                        {booking.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3.5 w-3.5" />
                        {booking.contact}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5" />
                        {booking.phone}
                      </span>
                      <span className="text-slate-400">
                        提交于 {booking.createdAt}
                      </span>
                    </div>

                    {booking.status === "rejected" && booking.rejectReason && (
                      <div className="mt-3 flex gap-2 rounded-2xl bg-rose-50 px-3 py-2 text-xs">
                        <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                        <div>
                          <div className="font-semibold text-rose-700">
                            退回说明
                          </div>
                          <div className="mt-0.5 text-rose-600">
                            {booking.rejectReason}
                          </div>
                        </div>
                      </div>
                    )}

                    {booking.status === "approved" && (
                      <div className="mt-3 flex items-center gap-2 rounded-2xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                        预约已确认，请按时参加。如需调整请提前 24 小时与导师沟通。
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
