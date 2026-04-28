import type { ReactNode } from "react"
import RainEffect from "@/components/effects/rain-effect"
import WorksHubNav from "@/components/works/works-hub-nav"

export const metadata = {
  title: "AI 优秀作品集 · 雨花台区智雨润教",
  description:
    "雨花台区智雨润教 AI 人工智能教育资源集散中心 · 雨花台区师生 AI 优秀获奖作品展示",
}

export default function WorksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-amber-50/40 via-white to-cyan-50/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainEffect />
      </div>
      <WorksHubNav />
      <main className="relative z-10 pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
