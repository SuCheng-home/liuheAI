"use client"

import { usePathname } from "next/navigation"
import { GraduationCap, CalendarCheck, Users } from "lucide-react"
import SubpageHeader from "@/components/shared/subpage-header"

export default function MentorsHubNav() {
  const pathname = usePathname() || ""
  const isList = pathname === "/mentors"
  const isBookings = pathname.startsWith("/mentors/bookings")

  return (
    <SubpageHeader
      theme="purple"
      icon={<GraduationCap className="h-5 w-5 lg:h-6 lg:w-6" />}
      title="AI 专家导师"
      subtitle="预约高校与产业专家 · 服务区域教师专业成长"
      homeHref="/mentors"
      navLinks={[
        {
          label: "导师列表",
          href: "/mentors",
          icon: <Users className="h-4 w-4" />,
          active: isList,
        },
        {
          label: "我的预约",
          href: "/mentors/bookings",
          icon: <CalendarCheck className="h-4 w-4" />,
          active: isBookings,
        },
      ]}
    />
  )
}
