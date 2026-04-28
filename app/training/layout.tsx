import type { ReactNode } from "react"
import RainEffect from "@/components/effects/rain-effect"
import TrainingHubNav from "@/components/training/training-hub-nav"

export const metadata = {
  title: "AI 研训活动 · 雨花台区智雨润教",
  description:
    "雨花台区教师发展中心 AI 研训活动中心 · 雨花台区智雨润教 AI 人工智能教育资源集散中心",
}

export default function TrainingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-emerald-50/40 via-white to-teal-50/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainEffect />
      </div>
      <TrainingHubNav />
      <main className="relative z-10 pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
