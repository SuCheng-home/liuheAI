"use client"

import { Award } from "lucide-react"
import SubpageHeader from "@/components/shared/subpage-header"

export default function WorksHubNav() {
  return (
    <SubpageHeader
      theme="amber"
      icon={<Award className="h-5 w-5 lg:h-6 lg:w-6" />}
      title="AI 优秀作品集"
      subtitle="雨花台区智雨润教 · 师生 AI 创作精选"
      homeHref="/works"
    />
  )
}
