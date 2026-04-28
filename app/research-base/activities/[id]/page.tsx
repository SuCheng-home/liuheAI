import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Calendar,
  School,
  Users,
  MapPin,
  Sparkles,
  Paperclip,
  Clock,
  Images,
} from "lucide-react"
import { recentActivities } from "@/lib/research-base-data"

export default async function ActivityReportDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = recentActivities.find((r) => r.id === id)
  if (!report) notFound()

  const reportPhotos =
    report.photos && report.photos.length > 0
      ? report.photos
      : [report.image]

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8 lg:py-14">
      <Link
        href="/research-base/activities"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回活动报道列表
      </Link>

      <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-sm">
        <div className="relative h-72 w-full overflow-hidden lg:h-96">
          <Image
            src={report.image || "/placeholder.svg"}
            alt={report.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-emerald-700">
              {report.baseName}
            </div>
            <h1 className="text-2xl font-bold lg:text-3xl">{report.title}</h1>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Meta icon={<Calendar />} label="活动时间" value={report.date} />
            <Meta icon={<Clock />} label="活动时长" value={report.duration} />
            <Meta icon={<School />} label="参与学校" value={report.school} />
            <Meta
              icon={<Users />}
              label="参与人数"
              value={`${report.participants} 人`}
            />
          </div>

          <section className="mt-6 border-t border-slate-100 pt-6">
            <h2 className="mb-3 text-base font-semibold text-slate-900">
              活动概述
            </h2>
            <p className="leading-relaxed text-slate-700">{report.content}</p>
          </section>

          {reportPhotos.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Images className="h-4 w-4 text-emerald-500" />
                活动图片（{reportPhotos.length}）
              </h2>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {reportPhotos.map((photo, idx) => (
                  <div
                    key={`${photo}-${idx}`}
                    className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-100"
                  >
                    <Image
                      src={photo || "/placeholder.svg"}
                      alt={`${report.title} 活动图片 ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {report.highlights && report.highlights.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Sparkles className="h-4 w-4 text-amber-500" />
                活动亮点
              </h2>
              <div className="grid gap-2 sm:grid-cols-3">
                {report.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-3 text-sm text-slate-700"
                  >
                    {h}
                  </div>
                ))}
              </div>
            </section>
          )}

          {report.attachments && report.attachments.length > 0 && (
            <section className="mt-6">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
                <Paperclip className="h-4 w-4 text-blue-500" />
                活动附件
              </h2>
              <div className="space-y-2">
                {report.attachments.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <Paperclip className="h-3.5 w-3.5 text-blue-500" />
                      {file.name}
                    </div>
                    <span className="text-xs text-slate-500">{file.size}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  )
}

function Meta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-2xl bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
        <span className="[&_svg]:h-3.5 [&_svg]:w-3.5">{icon}</span>
        {label}
      </div>
      <div className="mt-1 line-clamp-1 text-sm font-semibold text-slate-900">
        {value}
      </div>
    </div>
  )
}
