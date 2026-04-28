import type { ReactNode } from "react"
import ResearchBaseHubNav from "@/components/research-base/research-base-hub-nav"
import RainEffect from "@/components/effects/rain-effect"

export default function ResearchBaseLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Decorative background blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200/30 to-pink-200/20 blur-3xl" />
        <div className="absolute -left-20 bottom-20 h-96 w-96 rounded-full bg-gradient-to-br from-blue-200/30 to-cyan-200/20 blur-3xl" />
      </div>

      <RainEffect />
      <ResearchBaseHubNav />

      <main className="pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
