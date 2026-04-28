"use client"

import { GraduationCap } from "lucide-react"
import SubpageHeader from "@/components/shared/subpage-header"

export default function TrainingHubNav() {
  return (
    <SubpageHeader
      theme="emerald"
      icon={<GraduationCap className="h-5 w-5 lg:h-6 lg:w-6" />}
      title="AI 研训活动"
      subtitle="雨花台区教师发展中心 · AI 教师专业发展平台"
      homeHref="/training"
    />
  )
}
