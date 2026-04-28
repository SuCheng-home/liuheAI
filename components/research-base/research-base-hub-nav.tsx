"use client"

import { Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { Building2, CalendarCheck, Home } from "lucide-react"
import SubpageHeader from "@/components/shared/subpage-header"

export default function ResearchBaseHubNavPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <ResearchBaseHubNav />
    </Suspense>
  );
}

function ResearchBaseHubNav() {
  const pathname = usePathname() || ""
  const searchParams = useSearchParams()
  const currentTab = searchParams.get("tab")
  const isMyBookings = currentTab === "my-bookings"
  const isHome = pathname === "/research-base" && !isMyBookings
  const isOnActivities = pathname.startsWith("/research-base/activities")

  return (
    <SubpageHeader
      theme="purple"
      icon={<Building2 className="h-5 w-5 lg:h-6 lg:w-6" />}
      title="研学实践基地"
      subtitle="雨花台区中小学研学资源一站式服务平台"
      homeHref="/research-base"
      navLinks={[
        {
          label: "基地首页",
          href: "/research-base",
          icon: <Home className="h-4 w-4" />,
          active: isHome,
        },
        {
          label: "活动报道",
          href: "/research-base/activities",
          icon: <Building2 className="h-4 w-4" />,
          active: isOnActivities,
        },
        {
          label: "我的预约",
          href: "/research-base?tab=my-bookings",
          icon: <CalendarCheck className="h-4 w-4" />,
          active: isMyBookings,
        },
      ]}
    />
  )
}
