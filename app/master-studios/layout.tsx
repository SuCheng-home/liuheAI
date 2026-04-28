import MasterStudiosHubNav from "@/components/master-studios/master-studios-hub-nav"
import RainEffect from "@/components/effects/rain-effect"

export default function MasterStudiosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainEffect />
      </div>
      <MasterStudiosHubNav />
      <main className="relative z-10 pt-16 lg:pt-20">{children}</main>
    </div>
  )
}
