"use client"

import { Newspaper } from "lucide-react"
import SubpageHeader from "@/components/shared/subpage-header"

export default function NewsHubNav() {
  return (
    <SubpageHeader
      theme="blue"
      icon={<Newspaper className="h-5 w-5 lg:h-6 lg:w-6" />}
      title="AI 资讯中心"
      subtitle="雨花台区智雨润教 · AI 人工智能教育资源集散中心"
      homeHref="/news"
    />
  )
}
