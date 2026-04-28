import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Crown, Users, Activity, Award } from "lucide-react"
import { studios } from "@/lib/mentors-data"

export default async function StudioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const studio = studios.find((s) => s.id === id)
  if (!studio) notFound()

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
      <Link
        href="/master-studios"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-indigo-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回工作室列表
      </Link>

      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-sm">
        <div className="relative h-64 w-full overflow-hidden lg:h-80">
          <Image
            src={studio.cover || "/placeholder.svg"}
            alt={studio.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-700">
              {studio.subject}
            </div>
            <h1 className="text-2xl font-bold lg:text-3xl">{studio.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <Crown className="h-4 w-4 text-amber-300" />
                主持人：{studio.leader}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {studio.memberCount} 名成员
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 lg:p-8">
          <section>
            <h2 className="mb-3 text-base font-semibold text-slate-900">
              工作室简介
            </h2>
            <p className="leading-relaxed text-slate-700">{studio.description}</p>
          </section>

          <section className="mt-6">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
              <Activity className="h-4 w-4 text-indigo-500" />
              工作室动态
            </h2>
            <div className="space-y-2">
              {studio.recentNews.map((news, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                >
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-indigo-600 shadow-sm">
                    {news.date}
                  </span>
                  <span className="text-sm text-slate-700">{news.title}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-slate-900">
              <Award className="h-4 w-4 text-amber-500" />
              主要成果
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {studio.achievements.map((a, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 px-4 py-3 text-sm text-slate-700"
                >
                  <div className="mb-1 text-xs font-semibold text-indigo-600">
                    成果 {idx + 1}
                  </div>
                  {a}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
