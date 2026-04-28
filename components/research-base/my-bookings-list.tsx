"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Upload,
  Eye,
  AlertCircle,
  CheckCircle2,
  Hourglass,
  XCircle,
  Star,
  FileText,
  ImageIcon,
  Award,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { myBookings as initialBookings } from "@/lib/research-base-data"
import type { MyBooking, BookingStatus } from "@/lib/research-base-data"
import UploadSummaryDialog from "./upload-summary-dialog"
import { cn } from "@/lib/utils"

const statusConfig: Record<
  BookingStatus,
  {
    label: string
    icon: React.ElementType
    gradient: string
    bg: string
    text: string
    border: string
  }
> = {
  pending: {
    label: "未审批",
    icon: Hourglass,
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-100",
  },
  rejected: {
    label: "被退回",
    icon: XCircle,
    gradient: "from-red-500 to-rose-500",
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-100",
  },
  approved: {
    label: "已审批通过",
    icon: CheckCircle2,
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100",
  },
}

const statusFilters: Array<{ value: BookingStatus | "all"; label: string }> = [
  { value: "all", label: "全部" },
  { value: "pending", label: "未审批" },
  { value: "rejected", label: "被退回" },
  { value: "approved", label: "已审批通过" },
]

export default function MyBookingsList() {
  const [bookings, setBookings] = useState<MyBooking[]>(initialBookings)
  const [filter, setFilter] = useState<BookingStatus | "all">("all")
  const [viewBooking, setViewBooking] = useState<MyBooking | null>(null)
  const [uploadBooking, setUploadBooking] = useState<MyBooking | null>(null)

  const filtered =
    filter === "all" ? bookings : bookings.filter((b) => b.status === filter)

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    approved: bookings.filter((b) => b.status === "approved").length,
  }

  const handleUploadSuccess = (id: string) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              uploaded: true,
              summary:
                "本次研学活动共有 260 余名师生参加。通过主题教育、动手体验、分组探究等环节，学生积极参与、表现出色。活动组织紧凑，安全有序，教育成效显著，达到预期目标。",
              photos: [
                "/research-activity-students-learning.jpg",
                "/research-activity-robotics-workshop.jpg",
              ],
              rating: 5,
              baseReview:
                "基地课程设计贴合课标、讲解老师专业耐心、场地设施完善。本次活动非常成功，值得推荐给全区兄弟学校。",
            }
          : b
      )
    )
  }

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {statusFilters.map((f) => {
          const active = filter === f.value
          const count = counts[f.value]
          return (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                active
                  ? "border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-lg shadow-purple-500/25"
                  : "border-slate-200 bg-white text-slate-600 hover:border-purple-200 hover:text-purple-600"
              )}
            >
              {f.label}
              <span
                className={cn(
                  "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-semibold",
                  active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                )}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Empty className="rounded-2xl border border-dashed border-slate-200 bg-white/60">
          <EmptyMedia>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-50">
              <Calendar className="h-6 w-6 text-purple-400" />
            </div>
          </EmptyMedia>
          <EmptyTitle>暂无预约记录</EmptyTitle>
          <EmptyDescription>
            前往「基地信息」浏览研学基地并提交预约吧
          </EmptyDescription>
        </Empty>
      ) : (
        <div className="space-y-3">
          {filtered.map((b) => {
            const sc = statusConfig[b.status]
            const StatusIcon = sc.icon
            const canUpload = b.status === "approved" && !b.uploaded

            return (
              <div
                key={b.id}
                className="group flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white/80 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/10 sm:flex-row"
              >
                <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:h-auto sm:w-36">
                  <Image
                    src={b.baseImage || "/placeholder.svg"}
                    alt={b.baseName}
                    fill
                    sizes="(max-width: 640px) 100vw, 9rem"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge
                      className={cn(
                        "gap-1 border",
                        sc.bg,
                        sc.text,
                        sc.border,
                        "font-medium"
                      )}
                    >
                      <StatusIcon className="h-3 w-3" />
                      {sc.label}
                    </Badge>
                    {b.uploaded && (
                      <Badge className="gap-1 border border-emerald-100 bg-emerald-50 font-medium text-emerald-600">
                        <Award className="h-3 w-3" />
                        已上传总结
                      </Badge>
                    )}
                    <span className="text-xs text-slate-400">
                      · 提交于 {b.submitDate}
                    </span>
                  </div>

                  <h3 className="mb-1 font-bold text-slate-900 lg:text-lg">
                    {b.activityTitle}
                  </h3>
                  <div className="mb-2 text-sm text-slate-500">
                    {b.baseName}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 sm:text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {b.bookingDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {b.timeSlot}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {b.contactPerson}
                    </span>
                  </div>

                  {b.status === "rejected" && b.rejectReason && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/80 p-3 text-xs text-red-700">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <div>
                        <div className="font-semibold">退回原因</div>
                        <div className="mt-0.5 leading-relaxed">
                          {b.rejectReason}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 sm:flex-col sm:items-end sm:justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setViewBooking(b)}
                    className="h-9 gap-1.5 border-slate-200 text-xs text-slate-600 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    查看详情
                  </Button>
                  {canUpload && (
                    <Button
                      size="sm"
                      onClick={() => setUploadBooking(b)}
                      className="h-9 gap-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-xs font-medium text-white shadow-md shadow-emerald-500/25 hover:shadow-lg hover:shadow-emerald-500/30"
                    >
                      <Upload className="h-3.5 w-3.5" />
                      上传活动资料
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* View Dialog */}
      <Dialog
        open={!!viewBooking}
        onOpenChange={(v) => !v && setViewBooking(null)}
      >
        <DialogContent className="max-h-[92vh] max-w-3xl gap-0 overflow-hidden p-0">
          {viewBooking && (
            <>
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={viewBooking.baseImage || "/placeholder.svg"}
                  alt={viewBooking.baseName}
                  fill
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Badge
                    className={cn(
                      "mb-2 gap-1 border",
                      statusConfig[viewBooking.status].bg,
                      statusConfig[viewBooking.status].text,
                      statusConfig[viewBooking.status].border
                    )}
                  >
                    {statusConfig[viewBooking.status].label}
                  </Badge>
                  <DialogHeader>
                    <DialogTitle className="text-left text-lg font-bold text-white lg:text-xl">
                      {viewBooking.activityTitle}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="mt-1 text-xs text-white/80">
                    {viewBooking.baseName}
                  </div>
                </div>
              </div>

              <div className="max-h-[calc(92vh-14rem)] overflow-y-auto px-6 py-5 lg:px-8">
                <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                  <DetailCell
                    icon={<Calendar className="h-3.5 w-3.5 text-purple-500" />}
                    label="活动日期"
                    value={viewBooking.bookingDate}
                  />
                  <DetailCell
                    icon={<Clock className="h-3.5 w-3.5 text-blue-500" />}
                    label="时间段"
                    value={viewBooking.timeSlot}
                  />
                  <DetailCell
                    icon={<User className="h-3.5 w-3.5 text-emerald-500" />}
                    label="联系人"
                    value={viewBooking.contactPerson}
                  />
                  <DetailCell
                    icon={<Phone className="h-3.5 w-3.5 text-amber-500" />}
                    label="联系方式"
                    value={viewBooking.contactPhone}
                  />
                </div>

                <div className="mb-5">
                  <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                    <FileText className="h-3.5 w-3.5 text-slate-500" />
                    活动内容
                  </h4>
                  <p className="rounded-xl border border-slate-100 bg-slate-50/40 p-4 text-sm leading-relaxed text-slate-600">
                    {viewBooking.activityContent}
                  </p>
                </div>

                {viewBooking.status === "rejected" && viewBooking.rejectReason && (
                  <div className="mb-5">
                    <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-red-700">
                      <AlertCircle className="h-3.5 w-3.5" />
                      退回原因
                    </h4>
                    <div className="rounded-xl border border-red-100 bg-red-50/80 p-4 text-sm leading-relaxed text-red-700">
                      {viewBooking.rejectReason}
                    </div>
                  </div>
                )}

                {viewBooking.uploaded && (
                  <div className="space-y-5">
                    <div>
                      <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                        <Award className="h-3.5 w-3.5" />
                        活动总结
                      </h4>
                      <p className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 text-sm leading-relaxed text-slate-700">
                        {viewBooking.summary}
                      </p>
                    </div>

                    {viewBooking.photos && viewBooking.photos.length > 0 && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                          <ImageIcon className="h-3.5 w-3.5 text-slate-500" />
                          活动照片（{viewBooking.photos.length}）
                        </h4>
                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                          {viewBooking.photos.map((src, idx) => (
                            <div
                              key={idx}
                              className="relative aspect-[4/3] overflow-hidden rounded-xl"
                            >
                              <Image
                                src={src || "/placeholder.svg"}
                                alt={`活动照片 ${idx + 1}`}
                                fill
                                sizes="(max-width: 640px) 50vw, 33vw"
                                className="object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {viewBooking.rating && (
                      <div>
                        <h4 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-900">
                          <Star className="h-3.5 w-3.5 text-amber-500" />
                          基地评分
                        </h4>
                        <div className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/50 px-4 py-3">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                              <Star
                                key={n}
                                className={cn(
                                  "h-5 w-5",
                                  (viewBooking.rating ?? 0) >= n
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-300"
                                )}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-amber-600">
                            {viewBooking.rating} 分
                          </span>
                        </div>
                      </div>
                    )}

                    {viewBooking.baseReview && (
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-slate-900">
                          基地评价
                        </h4>
                        <p className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 text-sm leading-relaxed text-slate-700">
                          {viewBooking.baseReview}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {viewBooking.status === "approved" && !viewBooking.uploaded && (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4 text-sm text-emerald-700">
                    <div className="mb-1 font-semibold">
                      活动已审批通过，请及时上传活动过程资料
                    </div>
                    <div className="text-xs text-emerald-600">
                      包括活动总结、现场照片、基地评分与评价
                    </div>
                  </div>
                )}
              </div>

              {viewBooking.status === "approved" && !viewBooking.uploaded && (
                <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-sm lg:px-8">
                  <Button
                    variant="outline"
                    onClick={() => setViewBooking(null)}
                    className="h-10 border-slate-200 px-4"
                  >
                    关闭
                  </Button>
                  <Button
                    onClick={() => {
                      setUploadBooking(viewBooking)
                      setViewBooking(null)
                    }}
                    className="h-10 gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 font-medium text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                  >
                    <Upload className="h-4 w-4" />
                    上传活动资料
                  </Button>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <UploadSummaryDialog
        booking={uploadBooking}
        open={!!uploadBooking}
        onOpenChange={(v) => !v && setUploadBooking(null)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  )
}

function DetailCell({
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
