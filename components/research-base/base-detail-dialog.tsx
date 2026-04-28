"use client"

import { useState } from "react"
import Image from "next/image"
import {
  MapPin,
  Phone,
  Clock,
  Activity,
  Users,
  CalendarCheck,
  CalendarPlus,
  ChevronRight,
  School,
  Sparkles,
  Building2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type {
  ResearchBase,
  ResearchActivity,
  BookingRecord,
} from "@/lib/research-base-data"
import ActivityDetailDialog from "./activity-detail-dialog"

interface Props {
  base: ResearchBase | null
  activities: ResearchActivity[]
  bookings: BookingRecord[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onBook: (base: ResearchBase) => void
}

export default function BaseDetailDialog({
  base,
  activities,
  bookings,
  open,
  onOpenChange,
  onBook,
}: Props) {
  const [selectedActivity, setSelectedActivity] =
    useState<ResearchActivity | null>(null)
  const [activityDialogOpen, setActivityDialogOpen] = useState(false)

  if (!base) return null

  const baseActivities = activities.filter((a) => a.baseId === base.id)
  const baseBookings = bookings.filter((b) => b.baseId === base.id)

  const openActivity = (a: ResearchActivity) => {
    setSelectedActivity(a)
    setActivityDialogOpen(true)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[92vh] max-w-4xl gap-0 overflow-hidden p-0 [&>button]:right-3 [&>button]:top-3 [&>button]:z-50 [&>button]:rounded-full [&>button]:bg-white/95 [&>button]:p-1.5 [&>button]:text-slate-800 [&>button]:shadow-lg [&>button]:shadow-black/15 [&>button]:ring-1 [&>button]:ring-slate-200 [&>button]:opacity-100 hover:[&>button]:bg-white hover:[&>button]:text-slate-900">
          {/* Hero */}
          <div className="relative h-56 w-full overflow-hidden sm:h-64">
            <Image
              src={base.image || "/placeholder.svg"}
              alt={base.name}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <div className="mb-2 flex items-center gap-2">
                <Badge className="border-0 bg-white/20 text-white backdrop-blur-md">
                  {base.category}
                </Badge>
                <Badge className="border-0 bg-white/20 text-white backdrop-blur-md">
                  {base.signedYear} 年签约
                </Badge>
              </div>
              <DialogHeader>
                <DialogTitle className="text-left text-xl font-bold text-white lg:text-2xl">
                  {base.name}
                </DialogTitle>
              </DialogHeader>
              <p className="mt-2 max-w-2xl text-sm text-white/80 lg:text-base">
                {base.description}
              </p>
            </div>
          </div>

          <div className="max-h-[calc(92vh-16rem)] overflow-y-auto px-6 py-6 lg:px-8">
            {/* 关键数据 */}
            <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <MiniStat
                icon={<Activity className="h-4 w-4 text-purple-500" />}
                label="组织活动"
                value={`${base.activityCount} 次`}
              />
              <MiniStat
                icon={<Users className="h-4 w-4 text-emerald-500" />}
                label="累计服务"
                value={
                  base.servedCount >= 10000
                    ? `${(base.servedCount / 10000).toFixed(1)} 万人`
                    : `${base.servedCount.toLocaleString()} 人`
                }
              />
              <MiniStat
                icon={<Users className="h-4 w-4 text-blue-500" />}
                label="最大容纳"
                value={`${base.capacity} 人`}
              />
              <MiniStat
                icon={<Phone className="h-4 w-4 text-amber-500" />}
                label="咨询电话"
                value={base.phone}
              />
            </div>

            {/* 详细说明 */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Building2 className="h-4 w-4 text-purple-500" />
                基地详细介绍
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 lg:text-base">
                {base.fullDescription}
              </p>
            </div>

            {/* 基地信息 */}
            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                <div>
                  <div className="text-xs text-slate-500">基地地址</div>
                  <div className="text-sm font-medium text-slate-900">
                    {base.address}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-purple-500" />
                <div>
                  <div className="text-xs text-slate-500">开放时间</div>
                  <div className="text-sm font-medium text-slate-900">
                    {base.openHours}
                  </div>
                </div>
              </div>
            </div>

            {/* 特色与设施 */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                  特色课程
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {base.features.map((f) => (
                    <Badge
                      key={f}
                      variant="outline"
                      className="border-purple-100 bg-purple-50/60 text-xs font-medium text-purple-600"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                  <Building2 className="h-3.5 w-3.5 text-blue-500" />
                  配套设施
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {base.facilities.map((f) => (
                    <Badge
                      key={f}
                      variant="outline"
                      className="border-blue-100 bg-blue-50/60 text-xs font-medium text-blue-600"
                    >
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 近期预约 */}
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <CalendarCheck className="h-4 w-4 text-purple-500" />
                近期预约清单
                <span className="text-xs font-normal text-slate-400">
                  （{baseBookings.length} 条记录）
                </span>
              </h3>
              {baseBookings.length > 0 ? (
                <div className="overflow-hidden rounded-2xl border border-slate-100">
                  <div className="grid grid-cols-12 gap-3 border-b border-slate-100 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-500">
                    <div className="col-span-5">预约学校</div>
                    <div className="col-span-3">预约时间</div>
                    <div className="col-span-4">活动主题</div>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {baseBookings.map((b) => (
                      <div
                        key={b.id}
                        className="grid grid-cols-12 gap-3 bg-white px-4 py-3 text-sm transition-colors hover:bg-purple-50/30"
                      >
                        <div className="col-span-5 flex items-center gap-1.5 font-medium text-slate-900">
                          <School className="h-3.5 w-3.5 text-slate-400" />
                          <span className="truncate">{b.school}</span>
                        </div>
                        <div className="col-span-3 text-slate-600">
                          <div>{b.date}</div>
                          <div className="text-xs text-slate-500">
                            {b.time}
                          </div>
                        </div>
                        <div className="col-span-4 truncate text-slate-600">
                          {b.activityTitle}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-100 bg-slate-50/40 py-8 text-center text-sm text-slate-500">
                  暂无近期预约，欢迎预约第一场活动
                </div>
              )}
            </div>

            {/* 基地组织活动列表 */}
            {baseActivities.length > 0 && (
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                  <Activity className="h-4 w-4 text-purple-500" />
                  基地组织活动
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {baseActivities.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => openActivity(a)}
                      className="group flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left transition-all duration-500 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-500/10"
                    >
                      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={a.image || "/placeholder.svg"}
                          alt={a.title}
                          fill
                          sizes="6rem"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <h4 className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-purple-600">
                            {a.title}
                          </h4>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            <span>{a.date}</span>
                            <span>·</span>
                            <span className="truncate">{a.school}</span>
                          </div>
                        </div>
                        <div className="mt-1 flex items-center gap-1 text-xs text-purple-500">
                          查看详情
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* 底部 Action */}
          <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-sm lg:px-8">
            <div className="text-xs text-slate-500">
              提交预约需要获得基地审核批准，审批结果将通过电话通知
            </div>
            <Button
              onClick={() => {
                onOpenChange(false)
                onBook(base)
              }}
              className="h-10 gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-5 font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30"
            >
              <CalendarPlus className="h-4 w-4" />
              立即预约
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <ActivityDetailDialog
        activity={selectedActivity}
        open={activityDialogOpen}
        onOpenChange={setActivityDialogOpen}
      />
    </>
  )
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
      <div className="mb-1 flex items-center gap-1 text-xs text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  )
}
