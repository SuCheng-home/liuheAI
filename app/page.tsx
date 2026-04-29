import NavBar from "@/components/nav-bar"
import HeroSection from "@/components/hero-section"
import SmartBodySection from "@/components/smart-body-section"
import CompetitionShowcaseSection from "@/components/competition-showcase-section"
import FooterSection from "@/components/footer-section"
import ParticleEffect from "@/components/effects/particle-effect"

export default function Home() {
  return (
    <main className="relative scroll-smooth bg-background">
      {/* 背景效果（轻量花瓣粒子） */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleEffect />
      </div>

      {/* 导航栏 */}
      <NavBar />

      {/* 主体内容 */}
      <div className="relative z-10">
        <HeroSection />
        <SmartBodySection />
        <CompetitionShowcaseSection />
        <FooterSection />
      </div>
    </main>
  )
}
