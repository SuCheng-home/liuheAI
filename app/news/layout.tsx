import type { ReactNode } from "react"
import RainEffect from "@/components/effects/rain-effect"
import NewsHubNav from "@/components/news/news-hub-nav"

export const metadata = {
  title: "AI 资讯中心 · 雨花台区智雨润教",
  description:
    "雨花台区智雨润教 AI 人工智能教育资源集散中心 - AI 教育最新政策、技术与应用动态",
}

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50/30">
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainEffect />
      </div>
      <NewsHubNav />
      <main className="relative z-10 pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
