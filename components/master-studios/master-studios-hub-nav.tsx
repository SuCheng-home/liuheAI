"use client"

import { Crown } from "lucide-react"
import SubpageHeader from "@/components/shared/subpage-header"

export default function MasterStudiosHubNav() {
  return (
    <SubpageHeader
      theme="indigo"
      icon={<Crown className="h-5 w-5 lg:h-6 lg:w-6" />}
      title="AI 名师工作室"
      subtitle="区域名师领衔 · 引领教师专业成长"
      homeHref="/master-studios"
    />
  )
}
