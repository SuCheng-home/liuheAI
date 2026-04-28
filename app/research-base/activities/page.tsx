import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, School, Users } from "lucide-react"
import { recentActivities } from "@/lib/research-base-data"

export const metadata = {
  title: "全部活动报道 - 雨花台区智雨润教AI人工智能教育资源集散中心",
}

export default function ActivityReportsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      <Link
        href="/research-base"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回研学基地
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
          全部活动报道
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          回顾各研学基地组织的研学活动现场报道，共 {recentActivities.length} 篇
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recentActivities.map((report) => (
          <Link
            key={report.id}
            href={`/research-base/activities/${report.id}`}
            className="group overflow-hidden rounded-3xl border border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={report.image || "/placeholder.svg"}
                alt={report.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700 backdrop-blur-sm">
                {report.baseName}
              </div>
            </div>
            <div className="p-5">
              <h3 className="line-clamp-2 text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-emerald-600">
                {report.title}
              </h3>
              <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {report.date} · {report.duration}
                </div>
                <div className="flex items-center gap-1.5">
                  <School className="h-3.5 w-3.5" />
                  {report.school}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" />
                  参与 {report.participants} 人
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
