"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark, Upload, Wand2, Layers, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import SubpageHeader from "@/components/shared/subpage-header"
import ComingSoonDialog from "@/components/agents/coming-soon-dialog"
import JasmineMark from "@/components/jasmine-mark"

export default function AgentHubNav() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const pathname = usePathname() || ""

  return (
    <>
      <SubpageHeader
        theme="jasmine"
        icon={<JasmineMark variant="glyph" className="h-6 w-6 lg:h-7 lg:w-7" />}
        title="智能体中心"
        subtitle="茉莉智创 · 六合区AI教育智能体共创平台"
        homeHref="/agents"
        navLinks={[
          {
            label: "全部智能体",
            href: "/agents",
            icon: <Layers className="h-4 w-4" />,
            active: pathname === "/agents",
          },
          {
            label: "我的智能体",
            href: "/agents/my",
            icon: <Bookmark className="h-4 w-4" />,
            active: pathname.startsWith("/agents/my"),
          },
        ]}
        rightActions={
          <>
            <Link href="/agents/create">
              <Button
                variant="outline"
                className="hidden h-9 gap-1.5 border-emerald-200 bg-white/80 px-3 text-sm font-medium text-emerald-700 backdrop-blur-sm hover:border-emerald-300 hover:bg-emerald-50 md:flex"
              >
                <Upload className="h-4 w-4" />
                上传智能体
              </Button>
            </Link>
            <Button
              onClick={() => setComingSoonOpen(true)}
              className="h-9 gap-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-500 px-3 text-sm font-medium text-white shadow-md shadow-emerald-600/25 transition-all hover:shadow-xl hover:shadow-emerald-600/30"
            >
              <Wand2 className="h-4 w-4" />
              创建智能体
              <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            </Button>
          </>
        }
      />

      <ComingSoonDialog
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        title="创建智能体 · 待上线"
        description="可视化智能体创建工作台正在紧张建设中，敬请期待。您可先使用「上传智能体」功能，将已制作好的智能体发布到中心。"
      />
    </>
  )
}
