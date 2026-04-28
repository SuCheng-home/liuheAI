"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  CalendarCheck,
  GraduationCap,
  Building2,
  Award,
  Briefcase,
} from "lucide-react"
import type { ExpertMentor } from "@/lib/mentors-data"

interface MentorProfileDialogProps {
  mentor: ExpertMentor | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onBook: (mentor: ExpertMentor) => void
}

export default function MentorProfileDialog({
  mentor,
  open,
  onOpenChange,
  onBook,
}: MentorProfileDialogProps) {
  if (!mentor) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader className="sr-only">
          <DialogTitle>{mentor.name} 导师详情</DialogTitle>
        </DialogHeader>

        {/* Header */}
        <div className="flex gap-5">
          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-3xl shadow-lg ring-4 ring-white">
            <Image
              src={mentor.avatar || "/placeholder.svg"}
              alt={mentor.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-900">{mentor.name}</h2>
            <p className="mt-1 text-sm text-slate-700">{mentor.title}</p>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
              <Building2 className="h-3.5 w-3.5" />
              {mentor.organization}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <MiniStat
                icon={<Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />}
                label="评分"
                value={mentor.rating.toFixed(1)}
              />
              <MiniStat
                icon={<CalendarCheck className="h-3.5 w-3.5 text-purple-500" />}
                label="预约"
                value={`${mentor.bookingCount} 次`}
              />
              <MiniStat
                icon={<GraduationCap className="h-3.5 w-3.5 text-emerald-500" />}
                label="服务"
                value={`${mentor.serviceYears} 年`}
              />
            </div>
          </div>
        </div>

        {/* Intro */}
        <section className="mt-6 rounded-2xl bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Briefcase className="h-3.5 w-3.5" />
            导师简介
          </div>
          <p className="text-sm leading-relaxed text-slate-600">{mentor.intro}</p>
        </section>

        {/* Expertise */}
        <section className="mt-4">
          <div className="mb-2 text-xs font-semibold text-slate-700">擅长领域</div>
          <div className="flex flex-wrap gap-1.5">
            {mentor.expertise.map((tag) => (
              <Badge
                key={tag}
                className="border-0 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </section>

        {/* Honors */}
        <section className="mt-4">
          <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            主要成就 / 荣誉
          </div>
          <ul className="space-y-1.5 text-sm leading-relaxed text-slate-600">
            {mentor.honors.map((h, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-400" />
                {h}
              </li>
            ))}
          </ul>
        </section>

        {/* Service review summary */}
        <section className="mt-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 p-4">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-slate-900">
              服务评价 · {mentor.rating.toFixed(1)} 分
            </span>
            <span className="text-xs text-slate-500">
              · 共 {mentor.reviewCount} 条评价
            </span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            "讲解透彻，案例贴近教学一线，非常实用" · "回应及时，培训方案设计专业" ·
            "启发性强，给我们带来很多新思路"
          </p>
        </section>

        <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10"
          >
            关闭
          </Button>
          <Button
            onClick={() => onBook(mentor)}
            className="h-10 gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-6 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl"
          >
            <CalendarCheck className="h-4 w-4" />
            立即预约
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MiniStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl bg-white px-2 py-2">
      <div className="flex items-center gap-1 text-[10px] text-slate-500">
        {icon}
        {label}
      </div>
      <div className="mt-0.5 text-sm font-bold text-slate-900">{value}</div>
    </div>
  )
}
