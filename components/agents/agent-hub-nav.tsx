"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bookmark, Upload, Sparkles, Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import SubpageHeader from "@/components/shared/subpage-header"
import ComingSoonDialog from "@/components/agents/coming-soon-dialog"

export default function AgentHubNav() {
  const [comingSoonOpen, setComingSoonOpen] = useState(false)
  const pathname = usePathname() || ""

  return (
    <>
      <SubpageHeader
        theme="blue"
        icon={
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 lg:h-6 lg:w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        }
        title="智能体集散中心"
        subtitle="雨花台区智雨润教 · AI 人工智能教育资源集散中心"
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
                className="hidden h-9 gap-1.5 border-blue-200 bg-white/80 px-3 text-sm font-medium text-blue-600 backdrop-blur-sm hover:border-blue-300 hover:bg-blue-50 md:flex"
              >
                <Upload className="h-4 w-4" />
                上传智能体
              </Button>
            </Link>
            <Button
              onClick={() => setComingSoonOpen(true)}
              className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-3 text-sm font-medium text-white shadow-md shadow-blue-500/25 transition-all hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Sparkles className="h-4 w-4" />
              创建智能体
            </Button>
          </>
        }
      />

      <ComingSoonDialog
        open={comingSoonOpen}
        onOpenChange={setComingSoonOpen}
        title="创建智能体 · 待上线"
        description="全新的可视化智能体创建工作台正在紧张建设中，敬请期待。您可先使用「上传智能体」功能，将已制作好的智能体发布到集散中心。"
      />
    </>
  )
}
