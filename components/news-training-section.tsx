"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Clock,
  Newspaper,
  GraduationCap,
  MapPin,
  Calendar,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedElement from "@/components/animated-element"
import { newsList } from "@/lib/news-data"
import { trainingActivities } from "@/lib/training-data"

export default function NewsTrainingSection() {
  // 只取最新的 4 条新闻 + 4 条研训活动，保证一屏能完整展示
  const featuredNews = newsList.slice(0, 4)
  const featuredTrainings = trainingActivities.slice(0, 4)

  return (
    <section
      id="news-training"
      className="relative flex min-h-screen snap-start snap-always items-center bg-gradient-to-b from-white via-blue-50/30 to-white py-10 lg:py-12"
    >
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-gradient-to-br from-blue-100/40 to-cyan-100/40 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-100/40 to-teal-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        {/* 总标题 */}
        <AnimatedElement
          variant="fade-up"
          duration={1200}
          className="mb-6 text-center lg:mb-8"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-emerald-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Newspaper className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-slate-700">
              资讯 · 研训
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
            AI 前沿动态与
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              {" "}
              教师研训活动
            </span>
          </h2>
        </AnimatedElement>

        {/* 双栏内容 */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* 左栏：AI资讯 */}
          <AnimatedElement variant="fade-up" delay={100} duration={1200}>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm lg:p-6">
              {/* 栏目头 */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25">
                    <Newspaper className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 lg:text-lg">
                      AI 资讯
                    </h3>
                    <p className="text-xs text-slate-500">
                      教育 AI 政策、技术与案例
                    </p>
                  </div>
                </div>
                <Link
                  href="/news"
                  className="group flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  查看更多
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* 新闻列表 */}
              <div className="space-y-3">
                {featuredNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/news/${news.id}`}
                    className="group flex items-start gap-3 rounded-xl p-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50/40"
                  >
                    {/* 封面图（无角标） */}
                    <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg lg:h-[72px] lg:w-24">
                      <Image
                        src={news.coverImage || "/placeholder.svg"}
                        alt={news.title}
                        fill
                        sizes="(max-width: 1024px) 112px, 96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* 文字 */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-1">
                        <span className="inline-flex items-center rounded-md border border-blue-200 bg-blue-50 px-1.5 py-0 text-[10px] font-medium text-blue-700">
                          {news.category}
                        </span>
                        <span className="inline-flex items-center gap-0.5 truncate text-[10px] text-slate-500">
                          <Building2 className="h-2.5 w-2.5" />
                          <span className="truncate">{news.source}</span>
                        </span>
                      </div>
                      <h4 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-600">
                        {news.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {news.date}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedElement>

          {/* 右栏：AI研训活动 */}
          <AnimatedElement variant="fade-up" delay={200} duration={1200}>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm lg:p-6">
              {/* 栏目头 */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 lg:text-lg">
                      AI 研训活动
                    </h3>
                    <p className="text-xs text-slate-500">
                      雨花台区教师发展中心主办
                    </p>
                  </div>
                </div>
                <Link
                  href="/training"
                  className="group flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                >
                  查看更多
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* 活动列表 */}
              <div className="space-y-3">
                {featuredTrainings.map((activity) => (
                  <Link
                    key={activity.id}
                    href={`/training/${activity.id}`}
                    className="group flex items-start gap-3 rounded-xl p-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-50/40"
                  >
                    {/* 封面图（无角标） */}
                    <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-lg lg:h-[72px] lg:w-24">
                      <Image
                        src={activity.coverImage || "/placeholder.svg"}
                        alt={activity.title}
                        fill
                        sizes="(max-width: 1024px) 112px, 96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    {/* 文字 */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-1">
                        <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-1.5 py-0 text-[10px] font-medium text-emerald-700">
                          {activity.subject}
                        </span>
                        <span className="inline-flex items-center gap-0.5 truncate text-[10px] text-slate-500">
                          <MapPin className="h-2.5 w-2.5" />
                          <span className="truncate">
                            {activity.location.split("·")[0].trim()}
                          </span>
                        </span>
                      </div>
                      <h4 className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-emerald-600">
                        {activity.title}
                      </h4>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {activity.startAt}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* 底部 CTA */}
        <AnimatedElement
          variant="fade-up"
          delay={400}
          duration={1200}
          className="mt-6 flex justify-center gap-3 lg:mt-8"
        >
          <Link href="/news">
            <Button
              variant="outline"
              className="h-10 gap-1.5 border-blue-200 bg-white/80 text-blue-600 backdrop-blur-sm hover:border-blue-300 hover:bg-blue-50"
            >
              全部资讯
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/training">
            <Button className="h-10 gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30">
              全部研训活动
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </AnimatedElement>
      </div>
    </section>
  )
}
