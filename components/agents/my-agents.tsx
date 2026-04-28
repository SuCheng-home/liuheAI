"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  Clock,
  Bookmark,
  Upload,
  History,
  Star,
  Users,
  Package,
  Eye,
  Pencil,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import UploadedAgentDialog from "@/components/agents/uploaded-agent-dialog"
import {
  agents,
  uploadedAgents,
  type UploadedAgent,
  type UploadStatus,
} from "@/lib/agents-data"
import { cn } from "@/lib/utils"

// Simulated user data
const usedAgents = agents.slice(0, 6).map((agent, i) => ({
  ...agent,
  lastUsed: ["2小时前", "今天", "昨天", "3天前", "1周前", "2周前"][i],
  useTimes: [42, 31, 28, 19, 15, 8][i],
}))

const favoritedAgents = agents.slice(2, 8).map((agent, i) => ({
  ...agent,
  favoriteTime: ["2025-10-20", "2025-10-15", "2025-10-10", "2025-10-05", "2025-09-28", "2025-09-20"][i],
}))

type Tab = "used" | "favorited" | "uploaded"

const statusFilterOptions: Array<"全部" | UploadStatus> = [
  "全部",
  "待审批",
  "审批被退回",
  "审批通过",
  "已上架",
  "已下架",
]

const statusColor: Record<UploadStatus, string> = {
  待审批: "border-amber-200 bg-amber-50 text-amber-700",
  审批被退回: "border-red-200 bg-red-50 text-red-700",
  审批通过: "border-blue-200 bg-blue-50 text-blue-700",
  已上架: "border-emerald-200 bg-emerald-50 text-emerald-700",
  已下架: "border-slate-200 bg-slate-50 text-slate-600",
}

function MyAgentsInner() {
  const searchParams = useSearchParams()
  const initialTab = (searchParams.get("tab") as Tab) || "used"
  const [activeTab, setActiveTab] = useState<Tab>(initialTab)
  const [selectedAgent, setSelectedAgent] = useState<UploadedAgent | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<"全部" | UploadStatus>("全部")

  const filteredUploaded = useMemo(() => {
    if (statusFilter === "全部") return uploadedAgents
    return uploadedAgents.filter((a) => a.status === statusFilter)
  }, [statusFilter])

  const openDetail = (agent: UploadedAgent) => {
    setSelectedAgent(agent)
    setDetailOpen(true)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      {/* Header */}
      <div className="mb-8 lg:mb-10">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          我的智能体
        </h1>
        <p className="text-sm text-slate-600 lg:text-base">
          管理您使用、收藏与上传的智能体，打造专属教学资产
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-2 border-b border-slate-200/60">
        <TabButton
          active={activeTab === "used"}
          onClick={() => setActiveTab("used")}
          icon={<History className="h-4 w-4" />}
          label="我使用的"
          count={usedAgents.length}
        />
        <TabButton
          active={activeTab === "favorited"}
          onClick={() => setActiveTab("favorited")}
          icon={<Bookmark className="h-4 w-4" />}
          label="我收藏的"
          count={favoritedAgents.length}
        />
        <TabButton
          active={activeTab === "uploaded"}
          onClick={() => setActiveTab("uploaded")}
          icon={<Package className="h-4 w-4" />}
          label="我上传的"
          count={uploadedAgents.length}
        />
      </div>

      {/* Used */}
      {activeTab === "used" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usedAgents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="group block"
            >
              <article className="flex gap-4 rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
                  <Image
                    src={agent.cover || "/placeholder.svg"}
                    alt={agent.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="96px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div>
                    <h3 className="truncate text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {agent.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="h-3 w-3" />
                      最后使用：{agent.lastUsed}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge className="border-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-xs text-blue-600">
                      使用 {agent.useTimes} 次
                    </Badge>
                    <span className="flex items-center gap-0.5 text-xs text-slate-400">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {agent.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Favorited */}
      {activeTab === "favorited" && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoritedAgents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="group block"
            >
              <article className="flex gap-4 rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-500/10">
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
                  <Image
                    src={agent.cover || "/placeholder.svg"}
                    alt={agent.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="96px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                  <div>
                    <h3 className="truncate text-base font-bold text-slate-900 transition-colors group-hover:text-blue-600">
                      {agent.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                      <Bookmark className="h-3 w-3 fill-blue-400 text-blue-400" />
                      收藏于 {agent.favoriteTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="border-slate-200 bg-white/60 text-xs"
                    >
                      {agent.category}
                    </Badge>
                    <span className="flex items-center gap-0.5 text-xs text-slate-400">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {agent.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}

      {/* Uploaded */}
      {activeTab === "uploaded" && (
        <>
          {/* Status filter */}
          <div className="mb-5 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur-sm">
            <span className="mr-2 text-sm font-semibold text-slate-700">
              审批状态
            </span>
            {statusFilterOptions.map((option) => (
              <Badge
                key={option}
                onClick={() => setStatusFilter(option)}
                className={cn(
                  "cursor-pointer border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
                  statusFilter === option
                    ? "border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-600"
                )}
              >
                {option}
                {option !== "全部" && (
                  <span className="ml-1 text-[10px] opacity-70">
                    {uploadedAgents.filter((a) => a.status === option).length}
                  </span>
                )}
              </Badge>
            ))}
          </div>

          {/* List */}
          {filteredUploaded.length > 0 ? (
            <div className="space-y-3">
              {filteredUploaded.map((agent) => {
                const canEdit =
                  agent.status === "待审批" || agent.status === "审批被退回"
                return (
                  <article
                    key={agent.id}
                    className="group relative flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white/80 p-5 backdrop-blur-sm transition-all duration-500 hover:border-blue-300/60 hover:shadow-xl hover:shadow-blue-500/10 lg:flex-row lg:items-center"
                  >
                    {/* Cover */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100">
                      <Image
                        src={agent.cover || "/placeholder.svg"}
                        alt={agent.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900">
                          {agent.title}
                        </h3>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[11px] font-medium",
                            statusColor[agent.status]
                          )}
                        >
                          {agent.status}
                        </Badge>
                        {agent.status === "审批被退回" && (
                          <span className="flex items-center gap-1 text-[11px] text-red-500">
                            <AlertCircle className="h-3 w-3" />
                            请查看退回原因
                          </span>
                        )}
                      </div>
                      <p className="mb-2 truncate text-xs text-slate-500">
                        {agent.subtitle}
                      </p>
                      <p className="mb-3 line-clamp-1 text-sm text-slate-600">
                        {agent.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          评分{" "}
                          <span className="font-semibold text-slate-700">
                            {agent.rating > 0 ? agent.rating.toFixed(1) : "暂无"}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          使用量{" "}
                          <span className="font-semibold text-slate-700">
                            {agent.usageCount.toLocaleString()}
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          提交 {agent.submitDate}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex flex-shrink-0 items-center gap-2 lg:flex-col lg:items-stretch">
                      {canEdit ? (
                        <Button
                          onClick={() => openDetail(agent)}
                          className="h-9 gap-1.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-4 text-sm font-medium text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          编辑修改
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => openDetail(agent)}
                          className="h-9 gap-1.5 border-blue-200 text-blue-600 hover:border-blue-300 hover:bg-blue-50"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          查看详情
                        </Button>
                      )}
                    </div>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white/60 py-20 text-center backdrop-blur-sm">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                <Package className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-700">
                暂无该状态的智能体
              </h3>
              <p className="mb-5 text-sm text-slate-500">
                点击&ldquo;上传智能体&rdquo;，分享您的教学创造力
              </p>
              <Link href="/agents/create">
                <Button className="gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 text-white shadow-lg shadow-blue-500/25">
                  <Upload className="h-4 w-4" />
                  上传智能体
                </Button>
              </Link>
            </div>
          )}
        </>
      )}

      <UploadedAgentDialog
        open={detailOpen}
        onOpenChange={setDetailOpen}
        agent={selectedAgent}
      />
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
  count,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
  count: number
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex items-center gap-2 px-5 py-3 text-sm font-medium transition-colors",
        active ? "text-blue-600" : "text-slate-600 hover:text-slate-800"
      )}
    >
      {icon}
      {label}
      <Badge
        className={cn(
          "ml-1 h-5 min-w-5 rounded-full border-0 px-1.5 text-[10px] font-bold",
          active ? "bg-blue-500 text-white" : "bg-slate-200 text-slate-600"
        )}
      >
        {count}
      </Badge>
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
      )}
    </button>
  )
}

export default function MyAgents() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10" />}>
      <MyAgentsInner />
    </Suspense>
  )
}
