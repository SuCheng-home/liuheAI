import type React from "react"
import AgentHubNav from "@/components/agents/agent-hub-nav"
import RainEffect from "@/components/effects/rain-effect"

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30">
      {/* Animated background orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-400/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/10 to-teal-400/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-gradient-to-br from-teal-400/10 to-blue-400/10 blur-3xl" />
      </div>

      <RainEffect />
      <AgentHubNav />

      <main className="relative z-10 pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
