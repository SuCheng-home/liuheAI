"use client"

import Link from "next/link"
import Image from "next/image"
import {
  Building2,
  ArrowRight,
  Users,
  Activity,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AnimatedElement from "@/components/animated-element"
import { researchBases } from "@/lib/research-base-data"

export default function ResearchBaseSection() {
  const baseCount = researchBases.length
  const activityCount = researchBases.reduce(
    (sum, base) => sum + base.activityCount,
    0
  )
  const totalServed = researchBases.reduce(
    (sum, base) => sum + base.servedCount,
    0
  )
  const featuredBases = researchBases.slice(0, 6)

  return (
    <section
      id="research-base"
      className="relative flex min-h-screen snap-start snap-always items-center bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-10 lg:py-12"
    >
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-40 top-20 h-80 w-80 rounded-full bg-gradient-to-br from-purple-100/60 to-pink-100/40 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-72 w-72 rounded-full bg-gradient-to-br from-blue-100/60 to-cyan-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <AnimatedElement variant="fade-up" duration={1200}>
          <div className="mb-8 text-center lg:mb-10">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5">
              <Building2 className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">
                研学实践基地
              </span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              走进真实场景 · 让学习
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                {" "}
                更有温度
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 lg:text-base">
              雨花台区已签约研学基地覆盖红色教育、科技创新、文化传承、自然生态等多元主题，为中小学搭建课程化、常态化的研学实践体系
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <Link href="/research-base">
                <Button
                  variant="outline"
                  className="h-10 gap-2 border-purple-200 bg-white/80 px-4 text-purple-600 backdrop-blur-sm transition-all duration-500 hover:border-purple-300 hover:bg-purple-50"
                >
                  <BookOpen className="h-4 w-4" />
                  查看全部
                </Button>
              </Link>
              <Link href="/research-base">
                <Button className="h-10 gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-5 font-medium text-white shadow-lg shadow-purple-500/25 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/30">
                  <Sparkles className="h-4 w-4" />
                  基地预约
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedElement>

        {/* 精选基地列表 */}
        <div>
          <AnimatedElement variant="fade-up" delay={200} duration={1200}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 lg:text-xl">
                精选研学基地
              </h3>
              <Link
                href="/research-base"
                className="group flex items-center gap-1 text-sm text-purple-600 transition-colors hover:text-purple-700"
              >
                更多
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </AnimatedElement>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBases.map((base, index) => (
              <AnimatedElement
                key={base.id}
                variant="fade-up"
                delay={300 + index * 60}
                duration={1200}
              >
                <Link href="/research-base">
                  <div className="group flex gap-3 rounded-2xl border border-slate-100 bg-white/80 p-3 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/10">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={base.image || "/placeholder.svg"}
                        alt={base.name}
                        fill
                        sizes="6rem"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <Badge
                          variant="outline"
                          className="mb-1 border-purple-100 bg-purple-50/60 text-[10px] font-medium text-purple-600"
                        >
                          {base.category}
                        </Badge>
                        <h4 className="mb-0.5 truncate text-sm font-semibold text-slate-900 transition-colors group-hover:text-purple-600">
                          {base.name}
                        </h4>
                        <p className="line-clamp-1 text-xs leading-relaxed text-slate-500">
                          {base.description}
                        </p>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-0.5">
                          <Activity className="h-3 w-3" />
                          {base.activityCount} 次
                        </span>
                        <span className="flex items-center gap-0.5 text-emerald-600">
                          <Users className="h-3 w-3" />
                          已服务 {formatServed(base.servedCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* Compact Stats */}
        <AnimatedElement variant="fade-up" delay={100} duration={1200}>
          <div className="mt-8 grid grid-cols-3 gap-2 rounded-2xl border border-slate-100 bg-white/70 p-2 backdrop-blur-sm lg:mt-10 lg:gap-3 lg:p-3">
            <CompactStat
              icon={<Building2 className="h-4 w-4" />}
              label="AI研学基地"
              value={baseCount}
              suffix="家"
              gradient="from-purple-500 to-pink-500"
            />
            <div className="border-x border-slate-100">
              <CompactStat
                icon={<Activity className="h-4 w-4" />}
                label="研学活动次数"
                value={activityCount}
                suffix="次"
                gradient="from-blue-500 to-cyan-500"
              />
            </div>
            <CompactStat
              icon={<Users className="h-4 w-4" />}
              label="累计服务师生"
              value={(totalServed / 10000).toFixed(1)}
              suffix="万人次"
              gradient="from-emerald-500 to-teal-500"
            />
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}

function formatServed(count: number): string {
  if (count >= 10000) return `${(count / 10000).toFixed(1)}万人`
  return `${count.toLocaleString()}人`
}

function CompactStat({
  icon,
  label,
  value,
  suffix,
  gradient,
}: {
  icon: React.ReactNode
  label: string
  value: string | number
  suffix?: string
  gradient: string
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} text-white shadow-md`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <div className="flex items-baseline gap-0.5">
          <span className="text-xl font-bold text-slate-900 lg:text-2xl">
            {value}
          </span>
          {suffix && (
            <span className="text-[11px] font-medium text-slate-500">
              {suffix}
            </span>
          )}
        </div>
        <div className="truncate text-[11px] text-slate-500 lg:text-xs">
          {label}
        </div>
      </div>
    </div>
  )
}
