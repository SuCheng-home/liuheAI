import NavBar from "@/components/nav-bar"
import HeroSection from "@/components/hero-section"
import SmartBodySection from "@/components/smart-body-section"
import CompetitionShowcaseSection from "@/components/competition-showcase-section"
import FooterSection from "@/components/footer-section"
import RainEffect from "@/components/effects/rain-effect"
import ParticleEffect from "@/components/effects/particle-effect"
import ScrollIndicator from "@/components/scroll-indicator"

const sections = [
  { id: "home", label: "首页" },
  { id: "smart-body", label: "智能体中心" },
  { id: "competitions", label: "竞赛活动" },
]

export default function Home() {
  return (
    <main className="relative h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth bg-background">
      {/* 背景效果 */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainEffect />
        <ParticleEffect />
      </div>

      {/* 导航栏 */}
      <NavBar />

      {/* 右侧滚动指示器 */}
      <ScrollIndicator sections={sections} />

      {/* 主体内容 */}
      <HeroSection />
      <SmartBodySection />
      <CompetitionShowcaseSection />
      <FooterSection />
    </main>
  )
}
