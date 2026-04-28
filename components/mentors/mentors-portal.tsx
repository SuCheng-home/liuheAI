"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import {
  Search,
  Star,
  CalendarCheck,
  Eye,
  GraduationCap,
  Sparkles,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { expertMentors, type ExpertMentor } from "@/lib/mentors-data"
import MentorBookingDialog from "@/components/mentors/mentor-booking-dialog"
import MentorProfileDialog from "@/components/mentors/mentor-profile-dialog"

export default function MentorsPortalPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <MentorsPortal />
    </Suspense>
  );
}

function MentorsPortal() {
  const searchParams = useSearchParams()
  const presetId = searchParams.get("id")

  const [keyword, setKeyword] = useState("")
  const [bookingMentor, setBookingMentor] = useState<ExpertMentor | null>(null)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [profileMentor, setProfileMentor] = useState<ExpertMentor | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  // 自动打开预设导师的详情
  useEffect(() => {
    if (presetId) {
      const m = expertMentors.find((x) => x.id === presetId)
      if (m) {
        setProfileMentor(m)
        setProfileOpen(true)
      }
    }
  }, [presetId])

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase()
    if (!k) return expertMentors
    return expertMentors.filter(
      (m) =>
        m.name.toLowerCase().includes(k) ||
        m.expertise.some((e) => e.toLowerCase().includes(k)) ||
        m.organization.toLowerCase().includes(k)
    )
  }, [keyword])

  const openBooking = (mentor: ExpertMentor) => {
    setBookingMentor(mentor)
    setBookingOpen(true)
  }

  const openProfile = (mentor: ExpertMentor) => {
    setProfileMentor(mentor)
    setProfileOpen(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Intro */}
      <div className="mb-8 text-center lg:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-600">
            雨花台区专家导师协同服务平台
          </span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          汇聚高校与产业力量，
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
            {' '}助力教师专业成长
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
          平台面向区域学校提供专家预约、专题指导、案例共创与实践支持，聚焦课堂教学改进、课程建设与教育创新，
          形成“按需预约—精准指导—持续跟进”的常态化服务机制。
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="按姓名、擅长领域、所在单位搜索..."
            className="h-12 border-slate-200 bg-white/80 pl-11 shadow-sm backdrop-blur-sm"
          />
        </div>
      </div>

      {/* List */}
      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((mentor) => (
          <div
            key={mentor.id}
            role="button"
            tabIndex={0}
            onClick={() => openProfile(mentor)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                openProfile(mentor)
              }
            }}
            className="group flex cursor-pointer gap-4 rounded-3xl border border-slate-100 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl ring-2 ring-white shadow-md">
              <Image
                src={mentor.avatar || "/placeholder.svg"}
                alt={mentor.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-base font-bold text-slate-900 lg:text-lg">
                    {mentor.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-600">
                    {mentor.title}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-500">
                    {mentor.organization}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-amber-700">
                    {mentor.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap gap-1">
                {mentor.expertise.slice(0, 4).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-purple-100 bg-purple-50/60 text-[10px] text-purple-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <CalendarCheck className="h-3.5 w-3.5" />
                    预约 {mentor.bookingCount} 次
                  </span>
                  <span className="flex items-center gap-1">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {mentor.serviceYears} 年
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      openProfile(mentor)
                    }}
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1 px-3 text-xs hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    详情
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      openBooking(mentor)
                    }}
                    size="sm"
                    className="h-8 gap-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-3 text-xs text-white hover:opacity-90"
                  >
                    <CalendarCheck className="h-3.5 w-3.5" />
                    立即预约
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-3xl border border-dashed border-slate-200 bg-white/60 py-20 text-center">
          <Search className="mx-auto h-10 w-10 text-slate-300" />
          <p className="mt-3 text-sm text-slate-500">未找到匹配的导师</p>
        </div>
      )}

      <MentorBookingDialog
        mentor={bookingMentor}
        open={bookingOpen}
        onOpenChange={setBookingOpen}
      />
      <MentorProfileDialog
        mentor={profileMentor}
        open={profileOpen}
        onOpenChange={setProfileOpen}
        onBook={(m) => {
          setProfileOpen(false)
          openBooking(m)
        }}
      />
    </div>
  )
}

