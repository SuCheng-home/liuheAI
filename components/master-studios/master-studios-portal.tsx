"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Users, Crown, ArrowRight, Sparkles } from "lucide-react"
import { Input } from "@/components/ui/input"
import { studios } from "@/lib/mentors-data"

export default function MasterStudiosPortal() {
  const [keyword, setKeyword] = useState("")

  const filteredStudios = useMemo(() => {
    const key = keyword.trim().toLowerCase()
    if (!key) return studios
    return studios.filter(
      (studio) =>
        studio.name.toLowerCase().includes(key) ||
        studio.subject.toLowerCase().includes(key) ||
        studio.leader.toLowerCase().includes(key) ||
        studio.school.toLowerCase().includes(key)
    )
  }, [keyword])

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Intro */}
      <div className="mb-8 text-center lg:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <span className="text-sm font-medium text-indigo-600">
            雨花台区名师工作室协同发展平台
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          名师领衔共研共创，
          <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {' '}引领教师专业成长
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
          平台汇聚区域名师工作室资源，围绕学科建设、课堂改进与教学创新开展协同研究，
          通过专题研修、课例共创、成果展示等方式，推动教师队伍高质量发展。
        </p>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="按工作室名称、主持人、学校、学科搜索..."
            className="h-12 border-slate-200 bg-white/80 pl-11 shadow-sm backdrop-blur-sm"
          />
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {filteredStudios.map((studio) => (
          <Link
            key={studio.id}
            href={`/master-studios/${studio.id}`}
            className="group overflow-hidden rounded-3xl border border-slate-100 bg-white/80 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={studio.cover || "/placeholder.svg"}
                alt={studio.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-indigo-700">
                  {studio.subject}
                </span>
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs backdrop-blur-md">
                  <Users className="h-3.5 w-3.5" />
                  {studio.memberCount} 成员
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                {studio.name}
              </h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <Crown className="h-3.5 w-3.5 text-amber-500" />
                主持人：{studio.leader} · {studio.school}
              </p>
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {studio.description}
              </p>
              <div className="mt-4 border-t border-slate-100 pt-3">
                <div className="mb-1.5 text-[11px] font-semibold text-slate-500">
                  最新动态
                </div>
                <div className="space-y-1">
                  {studio.recentNews.slice(0, 2).map((news, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-slate-600"
                    >
                      <span className="text-slate-400">{news.date}</span>
                      <span className="line-clamp-1 flex-1">{news.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-100">
                查看工作室详情
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredStudios.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 py-20 text-center">
          <Search className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">未找到匹配的工作室</p>
        </div>
      )}
    </div>
  )
}
