import NavBar from "@/components/nav-bar"
import HeroSection from "@/components/hero-section"
import SmartBodySection from "@/components/smart-body-section"
import ResearchBaseSection from "@/components/research-base-section"
import MasterMentorSection from "@/components/master-mentor-section"
import NewsTrainingSection from "@/components/news-training-section"
import CompetitionShowcaseSection from "@/components/competition-showcase-section"
import FooterSection from "@/components/footer-section"
import RainEffect from "@/components/effects/rain-effect"
import ParticleEffect from "@/components/effects/particle-effect"
import ScrollIndicator from "@/components/scroll-indicator"

const sections = [
  { id: "home", label: "首页" },
  { id: "smart-body", label: "智能体中心" },
  { id: "research-base", label: "研学基地" },
  { id: "master-mentor", label: "名师与导师" },
  { id: "news-training", label: "资讯与研训" },
  { id: "competition-showcase", label: "竞赛与作品" },
]

export default function Home() {
  return (
    <main className="relative h-screen snap-y snap-mandatory overflow-y-auto scroll-smooth">
      {/* 背景效果 */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <RainEffect />
        <ParticleEffect />
      </div>

      {/* 导航栏 */}
      <NavBar />

      {/* 右侧滚动指示器 */}
      <ScrollIndicator sections={sections} />

      {/* 主要内容区块 */}
      <HeroSection />
      <SmartBodySection />
      <ResearchBaseSection />
      <MasterMentorSection />
      <NewsTrainingSection />
      <CompetitionShowcaseSection />
      <FooterSection />
    </main>
  )
}
