"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  BookOpen,
  Phone,
  Building2,
  Sparkles,
  Clock,
  User,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { TrainingActivity } from "@/lib/training-data"
import AnimatedElement from "@/components/animated-element"

const statusColors: Record<string, string> = {
  报名中: "bg-emerald-500 text-white",
  进行中: "bg-amber-500 text-white",
  已结束: "bg-slate-400 text-white",
}

export default function TrainingDetail({
  activity,
}: {
  activity: TrainingActivity
}) {

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-14">
      {/* 返回 */}
      <Link
        href="/training"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回研训活动列表
      </Link>

      <AnimatedElement variant="fade-up" duration={900}>
        {/* 头图 */}
        <div className="relative mb-8 aspect-[16/6] overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-lg shadow-emerald-500/5 backdrop-blur-sm">
          <Image
            src={activity.coverImage || "/placeholder.svg"}
            alt={activity.title}
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
            <div className="mb-3 flex flex-wrap gap-2">
              <Badge className="border-0 bg-emerald-500 text-xs font-medium text-white">
                {activity.subject}
              </Badge>
              <Badge
                className={cn(
                  "border-0 text-xs font-medium",
                  statusColors[activity.status]
                )}
              >
                {activity.status}
              </Badge>
              {activity.highlights.slice(0, 2).map((h) => (
                <Badge
                  key={h}
                  className="border border-white/30 bg-white/15 text-[10px] font-medium text-white backdrop-blur-sm"
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  {h}
                </Badge>
              ))}
            </div>
            <h1 className="max-w-3xl text-2xl font-bold leading-tight text-white lg:text-3xl xl:text-4xl">
              {activity.title}
            </h1>
          </div>
        </div>
      </AnimatedElement>

      <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* 主体 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 活动介绍 */}
          <AnimatedElement variant="fade-up" delay={150} duration={900}>
            <div className="rounded-2xl border border-slate-100 bg-white/90 p-6 backdrop-blur-sm lg:p-8">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-900 lg:text-xl">
                <BookOpen className="h-5 w-5 text-emerald-500" />
                活动介绍
              </h2>
              <div className="space-y-4 text-sm leading-relaxed text-slate-700 lg:text-base lg:leading-8">
                {activity.introduction.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {activity.highlights.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
                  {activity.highlights.map((h) => (
                    <Badge
                      key={h}
                      variant="outline"
                      className="border-emerald-100 bg-emerald-50/70 text-xs text-emerald-600"
                    >
                      <Sparkles className="mr-1 h-3 w-3" />
                      {h}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </AnimatedElement>

          {/* 课程安排 */}
          <AnimatedElement variant="fade-up" delay={250} duration={900}>
            <div className="rounded-2xl border border-slate-100 bg-white/90 p-6 backdrop-blur-sm lg:p-8">
              <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-slate-900 lg:text-xl">
                <Clock className="h-5 w-5 text-emerald-500" />
                课程安排
                <span className="text-sm font-normal text-slate-500">
                  · 共 {activity.courses.length} 节
                </span>
              </h2>
              <div className="relative space-y-4">
                {/* 时间线 */}
                <div className="absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-emerald-200 via-emerald-100 to-transparent" />

                {activity.courses.map((course, i) => (
                  <div key={i} className="relative flex gap-4 pl-8">
                    <div className="absolute left-0 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 border-emerald-500 bg-white text-[11px] font-bold text-emerald-600 shadow-sm">
                      {i + 1}
                    </div>
                    <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-colors hover:border-emerald-200 hover:bg-emerald-50/30">
                      <div className="mb-1.5 text-xs font-semibold text-emerald-600">
                        {course.time}
                      </div>
                      <h3 className="mb-2 font-semibold leading-snug text-slate-900">
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 lg:text-sm">
                        <User className="h-3.5 w-3.5" />
                        <span className="font-medium text-slate-700">
                          {course.speaker}
                        </span>
                        <span className="text-slate-400">·</span>
                        <span>{course.speakerTitle}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* 侧栏 */}
        <AnimatedElement variant="fade-up" delay={200} duration={900}>
          <div className="sticky top-6 space-y-4">
            {/* 基本信息 */}
            <div className="rounded-2xl border border-slate-100 bg-white/90 p-5 backdrop-blur-sm">
              <h3 className="mb-4 text-sm font-semibold text-slate-500">
                活动信息
              </h3>
              <div className="space-y-4 text-sm">
                <InfoRow
                  icon={<Calendar className="h-4 w-4 text-emerald-500" />}
                  label="开始时间"
                  value={activity.startAt}
                />
                <InfoRow
                  icon={<Clock className="h-4 w-4 text-emerald-500" />}
                  label="结束时间"
                  value={activity.endAt}
                />
                <InfoRow
                  icon={<MapPin className="h-4 w-4 text-emerald-500" />}
                  label="活动地点"
                  value={activity.location}
                />
                <InfoRow
                  icon={<Building2 className="h-4 w-4 text-emerald-500" />}
                  label="主办单位"
                  value={activity.organizer}
                />
                <InfoRow
                  icon={<Phone className="h-4 w-4 text-emerald-500" />}
                  label="联系方式"
                  value={activity.contact}
                />
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="mt-0.5 text-sm font-medium text-slate-800">{value}</div>
      </div>
    </div>
  )
}
