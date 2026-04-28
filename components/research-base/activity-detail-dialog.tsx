"use client"

import Image from "next/image"
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  FileText,
  Download,
  Sparkles,
  Building2,
  Images,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { ResearchActivity } from "@/lib/research-base-data"

interface Props {
  activity: ResearchActivity | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ActivityDetailDialog({
  activity,
  open,
  onOpenChange,
}: Props) {
  if (!activity) return null

  const activityPhotos =
    activity.photos && activity.photos.length > 0
      ? activity.photos
      : [activity.image]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl gap-0 overflow-hidden p-0">
        <div className="relative h-52 w-full overflow-hidden sm:h-64">
          <Image
            src={activity.image || "/placeholder.svg"}
            alt={activity.title}
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="mb-2 border-0 bg-white/20 text-white backdrop-blur-md">
              活动报道
            </Badge>
            <DialogHeader>
              <DialogTitle className="text-left text-xl font-bold text-white lg:text-2xl">
                {activity.title}
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        <div className="max-h-[calc(90vh-16rem)] overflow-y-auto p-6 lg:p-8">
          <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <InfoCard
              icon={<Calendar className="h-4 w-4 text-purple-500" />}
              label="活动日期"
              value={activity.date}
            />
            <InfoCard
              icon={<MapPin className="h-4 w-4 text-blue-500" />}
              label="组织学校"
              value={activity.school}
            />
            <InfoCard
              icon={<Users className="h-4 w-4 text-emerald-500" />}
              label="参与人数"
              value={`${activity.participants} 人`}
            />
            <InfoCard
              icon={<Clock className="h-4 w-4 text-amber-500" />}
              label="活动时长"
              value={activity.duration}
            />
          </div>

          <div className="mb-6 rounded-2xl bg-gradient-to-br from-purple-50/60 to-pink-50/40 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-purple-700">
              <Building2 className="h-4 w-4" />
              所属基地
            </div>
            <div className="text-base font-medium text-slate-900">
              {activity.baseName}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="mb-3 text-base font-semibold text-slate-900">
              活动内容
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 lg:text-base">
              {activity.content}
            </p>
          </div>

          {activityPhotos.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Images className="h-4 w-4 text-blue-500" />
                活动照片（{activityPhotos.length}）
              </h3>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {activityPhotos.map((photo, index) => (
                  <div
                    key={`${photo}-${index}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-100"
                  >
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`${activity.title} 活动照片 ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activity.highlights && activity.highlights.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-amber-500" />
                活动亮点
              </h3>
              <div className="flex flex-wrap gap-2">
                {activity.highlights.map((h) => (
                  <Badge
                    key={h}
                    variant="outline"
                    className="border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                  >
                    {h}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {activity.attachments && activity.attachments.length > 0 && (
            <div>
              <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <FileText className="h-4 w-4 text-slate-500" />
                活动附件
              </h3>
              <div className="space-y-2">
                {activity.attachments.map((file) => (
                  <div
                    key={file.name}
                    className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">
                          {file.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {file.size}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-xs text-purple-600 hover:bg-purple-50 hover:text-purple-700"
                    >
                      <Download className="h-3.5 w-3.5" />
                      下载
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
        {icon}
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-900">{value}</div>
    </div>
  )
}
