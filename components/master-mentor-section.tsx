"use client"

import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  ArrowRight,
  Users,
  Star,
  CalendarCheck,
  Sparkles,
  Crown,
  Activity,
  Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedElement from "@/components/animated-element"
import { studios, expertMentors } from "@/lib/mentors-data"

export default function MasterMentorSection() {
  const totalMembers = studios.reduce((sum, s) => sum + s.memberCount, 0)
  const totalBookings = expertMentors.reduce((sum, m) => sum + m.bookingCount, 0)

  return (
    <section
      id="master-mentor"
      className="relative flex min-h-screen snap-start snap-always items-center overflow-hidden bg-gradient-to-b from-white via-indigo-50/30 to-white py-8 lg:py-10"
    >
      {/* decorative */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-1/4 top-20 h-72 w-72 rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="absolute bottom-20 left-1/4 h-80 w-80 rounded-full bg-purple-500/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedElement variant="fade-up" duration={1200} className="mb-6 text-center lg:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5">
            <Crown className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-indigo-600">名师 · 导师</span>
          </div>
          <h2 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
            汇聚区域名师智慧
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {" · "}AI 专家伴随成长
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-slate-600 lg:text-base">
            雨花台区名师工作室与高校 / 教科研专家共同构成的成长支持网络
          </p>
        </AnimatedElement>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* === 名师工作室 === */}
          <AnimatedElement variant="fade-up" delay={100} duration={1200}>
            <div className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white/70 p-5 shadow-sm backdrop-blur-sm lg:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-500" />
                    <h3 className="text-lg font-bold text-slate-900 lg:text-xl">
                      AI 名师工作室
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Crown className="h-3.5 w-3.5 text-amber-500" />
                      共 {studios.length} 个工作室
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-indigo-500" />
                      {totalMembers} 名成员
                    </span>
                  </div>
                </div>
                <Link href="/master-studios">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 px-3 text-xs text-indigo-600 hover:bg-indigo-50"
                  >
                    查看全部
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

              <div className="grid flex-1 gap-2.5 sm:grid-cols-2">
                {studios.slice(0, 3).map((studio) => (
                  <Link
                    key={studio.id}
                    href={`/master-studios/${studio.id}`}
                    className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-500/10"
                  >
                    <div className="relative h-20 w-full overflow-hidden">
                      <Image
                        src={studio.cover || "/placeholder.svg"}
                        alt={studio.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 backdrop-blur-sm">
                        {studio.subject}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="line-clamp-1 text-sm font-semibold text-slate-900 transition-colors group-hover:text-indigo-600">
                        {studio.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                        <Users className="h-3 w-3" />
                        {studio.memberCount} 成员
                        <span className="text-slate-300">·</span>
                        <Activity className="h-3 w-3" />
                        最新动态
                      </div>
                      <div className="mt-1.5 line-clamp-1 text-[11px] text-slate-500">
                        {studio.recentNews[0]?.title}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedElement>

          {/* === AI 专家导师 === */}
          <AnimatedElement variant="fade-up" delay={200} duration={1200}>
            <div className="flex h-full flex-col rounded-3xl border border-slate-100 bg-white/70 p-5 shadow-sm backdrop-blur-sm lg:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-purple-500" />
                    <h3 className="text-lg font-bold text-slate-900 lg:text-xl">
                      AI 专家导师
                    </h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-purple-500" />
                      {expertMentors.length} 位专家
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarCheck className="h-3.5 w-3.5 text-emerald-500" />
                      {totalBookings} 次预约服务
                    </span>
                  </div>
                </div>
                <Link href="/mentors">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1 px-3 text-xs text-purple-600 hover:bg-purple-50"
                  >
                    查看全部
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>

              <div className="flex-1 space-y-2">
                {expertMentors.slice(0, 3).map((mentor) => (
                  <Link
                    key={mentor.id}
                    href={`/mentors?id=${mentor.id}`}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-white p-3 transition-all duration-500 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-md hover:shadow-purple-500/10"
                  >
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl ring-2 ring-white">
                      <Image
                        src={mentor.avatar || "/placeholder.svg"}
                        alt={mentor.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <span className="truncate font-semibold text-slate-900 transition-colors group-hover:text-purple-600">
                          {mentor.name}
                        </span>
                        <span className="truncate text-xs text-slate-500">
                          {mentor.title}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-1 text-[11px] text-slate-500">
                        <Building2 className="h-3 w-3 shrink-0 text-purple-400" />
                        <span className="truncate">{mentor.organization}</span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="font-semibold text-slate-700">
                          {mentor.rating.toFixed(1)}
                        </span>
                        <span>·</span>
                        <span>{mentor.bookingCount} 次预约</span>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {mentor.expertise.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="border-purple-100 bg-purple-50/60 px-1.5 py-0 text-[10px] font-medium text-purple-600"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <Link href="/mentors" className="mt-3 block">
                <Button
                  variant="outline"
                  className="h-10 w-full gap-2 border-purple-200 text-purple-600 hover:border-purple-300 hover:bg-purple-50"
                >
                  <CalendarCheck className="h-4 w-4" />
                  预约 AI 专家导师
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
