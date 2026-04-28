"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Trophy,
  Award,
  ArrowRight,
  Clock,
  Users,
  Sparkles,
  Building2,
  Star,
  Heart,
  GraduationCap,
  Tag as TagIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import AnimatedElement from "@/components/animated-element"
import ComingSoonDialog from "@/components/agents/coming-soon-dialog"
import { works } from "@/lib/works-data"

// 雨花台区一线赛事数据 — 第一个为已开通赛事，其余暂未开通
type Competition = {
  id: string
  name: string
  organizers: string
  level: "省级" | "市级" | "区级"
  participants: number
  deadline: string
  externalUrl?: string
}

const FEATURED: Competition = {
  id: "yh-maker-1",
  name: "雨花台区第一届智能体创客大赛",
  organizers: "雨花台区教育局 · 雨花台区教师发展中心",
  level: "区级",
  participants: 1280,
  deadline: "2026-12-20",
  externalUrl:
    "https://yh.nje.cn/competition/activities/detail/index?id=7433534103650304&applyCount=0",
}

const OTHERS: Competition[] = [
  {
    id: "yh-app-1",
    name: "2026 年雨花台区中小学人工智能应用创新大赛",
    organizers: "雨花台区教育局",
    level: "区级",
    participants: 2460,
    deadline: "2026-11-30",
  },
  {
    id: "nj-tech-36",
    name: "南京市第三十六届中小学生科技创新大赛",
    organizers: "南京市电化教育馆 · 南京市教育局",
    level: "市级",
    participants: 5640,
    deadline: "2026-11-15",
  },
  {
    id: "js-youth-1",
    name: "江苏省青少年科技创新大赛",
    organizers: "江苏省教育厅 · 江苏省科学技术协会",
    level: "省级",
    participants: 8960,
    deadline: "2026-12-25",
  },
]

const LEVEL_STYLES: Record<Competition["level"], string> = {
  省级: "bg-purple-100 text-purple-600",
  市级: "bg-amber-100 text-amber-700",
  区级: "bg-blue-100 text-blue-600",
}

const COMPETITION_HUB_URL = "https://yh.nje.cn/competition/home"

export default function CompetitionShowcaseSection() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const [comingSoonName, setComingSoonName] = useState("")

  const handleOtherClick = (e: React.MouseEvent, name: string) => {
    e.preventDefault()
    setComingSoonName(name)
    setComingSoonOpen(true)
  }

  const featuredWorks = works.slice(0, 4)

  return (
    <section
      id="competition-showcase"
      className="relative flex min-h-screen snap-start snap-always items-center bg-gradient-to-b from-white via-orange-50/30 to-white py-10 lg:py-12"
    >
      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-80 w-80 rounded-full bg-gradient-to-br from-orange-100/40 to-amber-100/40 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-gradient-to-br from-cyan-100/40 to-teal-100/40 blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 lg:px-8">
        {/* 总标题 */}
        <AnimatedElement
          variant="fade-up"
          duration={1100}
          className="mb-6 text-center lg:mb-8"
        >
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500/10 to-cyan-500/10 px-4 py-1.5 backdrop-blur-sm">
            <Trophy className="h-4 w-4 text-orange-500" />
            <span className="text-sm font-medium text-slate-700">
              竞赛 · 作品
            </span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
            AI 竞赛活动与
            <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-cyan-600 bg-clip-text text-transparent">
              {" "}
              优秀作品展示
            </span>
          </h2>
        </AnimatedElement>

        {/* 双栏内容 */}
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* 左栏：AI 竞赛活动 */}
          <AnimatedElement variant="fade-up" delay={100} duration={1100}>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm lg:p-6">
              {/* 栏目头 */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg shadow-orange-500/25">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 lg:text-lg">
                      AI 竞赛活动
                    </h3>
                    <p className="text-xs text-slate-500">
                      区级 · 市级 · 省级公益赛事
                    </p>
                  </div>
                </div>
                <a
                  href={COMPETITION_HUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-xs font-medium text-orange-600 hover:text-orange-700"
                >
                  查看更多
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>

              {/* 重点推荐赛事 */}
              <a
                href={FEATURED.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mb-3 block overflow-hidden rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50/60 to-amber-50/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/10"
              >
                <div className="mb-2 flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
                    <Sparkles className="h-2.5 w-2.5" />
                    重点推荐
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${LEVEL_STYLES[FEATURED.level]}`}
                  >
                    {FEATURED.level}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                    报名中
                  </span>
                </div>
                <h4 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-orange-600 lg:text-base">
                  {FEATURED.name}
                </h4>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 truncate">
                    <Building2 className="h-3 w-3 shrink-0" />
                    <span className="truncate">{FEATURED.organizers}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    截止 {FEATURED.deadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {FEATURED.participants.toLocaleString()} 报名
                  </span>
                </div>
              </a>

              {/* 其它赛事列表 */}
              <ul className="space-y-2">
                {OTHERS.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={(e) => handleOtherClick(e, c.name)}
                      className="group flex w-full items-start gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-200 hover:shadow-md hover:shadow-orange-500/5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-50">
                        <Trophy className="h-4 w-4 text-orange-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="line-clamp-1 text-sm font-semibold text-slate-900 transition-colors group-hover:text-orange-600">
                          {c.name}
                        </h4>
                        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-500">
                          <span
                            className={`rounded-full px-1.5 py-0 text-[10px] font-medium ${LEVEL_STYLES[c.level]}`}
                          >
                            {c.level}
                          </span>
                          <span className="truncate">{c.organizers}</span>
                          <span className="flex items-center gap-0.5">
                            <Clock className="h-2.5 w-2.5" />
                            {c.deadline}
                          </span>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedElement>

          {/* 右栏：AI 优秀作品 */}
          <AnimatedElement variant="fade-up" delay={200} duration={1100}>
            <div className="rounded-2xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm lg:p-6">
              {/* 栏目头 */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/25">
                    <Award className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 lg:text-lg">
                      AI 优秀作品
                    </h3>
                    <p className="text-xs text-slate-500">
                      师生优秀获奖 AI 作品集
                    </p>
                  </div>
                </div>
                <Link
                  href="/works"
                  className="group flex items-center gap-1 text-xs font-medium text-cyan-600 hover:text-cyan-700"
                >
                  查看更多
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* 作品列表 */}
              <div className="space-y-3">
                {featuredWorks.map((w) => (
                  <Link
                    key={w.id}
                    href={`/works/${w.id}`}
                    className="group flex items-start gap-3 rounded-xl p-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-cyan-50/40"
                  >
                    <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg lg:h-[72px] lg:w-24">
                      <Image
                        src={w.cover || "/placeholder.svg"}
                        alt={w.title}
                        fill
                        sizes="(max-width: 1024px) 112px, 96px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-1">
                        <span className="inline-flex items-center rounded-md border border-cyan-200 bg-cyan-50 px-1.5 py-0 text-[10px] font-medium text-cyan-700">
                          {w.type}
                        </span>
                        {w.creator.role === "学生" ? (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-pink-50 px-1.5 py-0 text-[10px] font-medium text-pink-600">
                            <GraduationCap className="h-2.5 w-2.5" />
                            学生
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 rounded-md bg-blue-50 px-1.5 py-0 text-[10px] font-medium text-blue-600">
                            <TagIcon className="h-2.5 w-2.5" />
                            教师
                          </span>
                        )}
                      </div>
                      <h4 className="mb-0.5 line-clamp-1 text-sm font-semibold leading-snug text-slate-900 transition-colors group-hover:text-cyan-600">
                        {w.title}
                      </h4>
                      <p className="line-clamp-1 text-[11px] text-slate-500">
                        {w.creator.name} · {w.creator.school}
                        {w.creator.grade ? ` · ${w.creator.grade}` : ""}
                      </p>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500">
                        <span className="flex items-center gap-0.5">
                          <Star className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                          {w.rating.toFixed(1)}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Heart className="h-2.5 w-2.5 fill-rose-400 text-rose-400" />
                          {w.likes.toLocaleString()}
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
          duration={1100}
          className="mt-6 flex justify-center gap-3 lg:mt-8"
        >
          <a
            href={COMPETITION_HUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="h-10 gap-1.5 border-orange-200 bg-white/80 text-orange-600 backdrop-blur-sm hover:border-orange-300 hover:bg-orange-50"
            >
              全部赛事
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <Link href="/works">
            <Button className="h-10 gap-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30">
              全部作品
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </AnimatedElement>
      </div>

      <ComingSoonDialog
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        title="赛事暂未开通"
        description={
          comingSoonName
            ? `「${comingSoonName}」暂未在本平台开通报名通道，敬请关注后续公告。`
            : "该赛事暂未开通，敬请期待。"
        }
      />
    </section>
  )
}
