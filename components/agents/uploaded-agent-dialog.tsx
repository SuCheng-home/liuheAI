"use client"

import Image from "next/image"
import {
  AlertCircle,
  CheckCircle2,
  Calendar,
  Star,
  Users,
  Tag,
  FileText,
  User,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { UploadedAgent } from "@/lib/agents-data"
import { cn } from "@/lib/utils"

const statusBadgeStyles: Record<UploadedAgent["status"], string> = {
  待审批: "border-amber-200 bg-amber-50 text-amber-700",
  审批被退回: "border-red-200 bg-red-50 text-red-700",
  审批通过: "border-blue-200 bg-blue-50 text-blue-700",
  已上架: "border-emerald-200 bg-emerald-50 text-emerald-700",
  已下架: "border-slate-200 bg-slate-50 text-slate-600",
}

export default function UploadedAgentDialog({
  open,
  onOpenChange,
  agent,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  agent: UploadedAgent | null
}) {
  if (!agent) return null

  const isRejected = agent.status === "审批被退回"
  const isPending = agent.status === "待审批"

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto bg-white/95 backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
            智能体详情
            <Badge
              variant="outline"
              className={cn("text-xs font-medium", statusBadgeStyles[agent.status])}
            >
              {agent.status}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            查看您提交的智能体详细信息与审核状态
          </DialogDescription>
        </DialogHeader>

        {/* Rejected alert */}
        {isRejected && agent.rejectReason && (
          <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50/80 p-4">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-500" />
            <div className="flex-1">
              <div className="mb-1 text-sm font-semibold text-red-700">
                退回原因
              </div>
              <p className="text-sm leading-relaxed text-red-600">
                {agent.rejectReason}
              </p>
              {agent.reviewer && agent.reviewDate && (
                <div className="mt-2 text-xs text-red-500/80">
                  {agent.reviewer} · {agent.reviewDate}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Approved hint */}
        {agent.status === "审批通过" && (
          <div className="flex gap-3 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
            <div className="flex-1 text-sm text-emerald-700">
              审批已通过，等待平台完成上架流程
              {agent.reviewer && agent.reviewDate && (
                <div className="mt-1 text-xs text-emerald-600/80">
                  {agent.reviewer} · {agent.reviewDate}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-6 py-2">
          {/* Basic info */}
          <div className="flex gap-5">
            <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100">
              <Image
                src={agent.cover || "/placeholder.svg"}
                alt={agent.title}
                fill
                className="object-cover"
                sizes="112px"
              />
            </div>
            <div className="flex-1">
              <h3 className="mb-1 text-xl font-bold text-slate-900">
                {agent.title}
              </h3>
              <p className="mb-3 text-sm text-slate-500">{agent.subtitle}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="border-0 bg-gradient-to-r from-blue-500 to-cyan-500 text-xs text-white">
                  {agent.stage}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-200 bg-slate-50 text-xs text-slate-600"
                >
                  {agent.audience}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-slate-200 bg-slate-50 text-xs text-slate-600"
                >
                  {agent.category}
                </Badge>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <FileText className="h-4 w-4 text-blue-500" />
              智能体描述
            </div>
            <p className="rounded-xl bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-600">
              {agent.description}
            </p>
          </div>

          {/* Tags */}
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
              <Tag className="h-4 w-4 text-blue-500" />
              特性标签
            </div>
            <div className="flex flex-wrap gap-2">
              {agent.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-blue-100 bg-blue-50/60 text-xs font-medium text-blue-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetaCard
              icon={<Calendar className="h-4 w-4" />}
              label="提交日期"
              value={agent.submitDate}
            />
            <MetaCard
              icon={<User className="h-4 w-4" />}
              label="审核人"
              value={agent.reviewer || "待分配"}
            />
            <MetaCard
              icon={<Star className="h-4 w-4" />}
              label="评分"
              value={agent.rating > 0 ? agent.rating.toFixed(1) : "暂无"}
              accent="amber"
            />
            <MetaCard
              icon={<Users className="h-4 w-4" />}
              label="使用量"
              value={agent.usageCount.toLocaleString()}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="h-10"
          >
            关闭
          </Button>
          {(isPending || isRejected) && (
            <Button className="h-10 gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-5 font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30">
              {isRejected ? "修改并重新提交" : "编辑提交"}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MetaCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: "amber"
}) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white/60 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-xs text-slate-500">
        {icon}
        {label}
      </div>
      <div
        className={cn(
          "text-sm font-bold",
          accent === "amber" ? "text-amber-600" : "text-slate-800"
        )}
      >
        {value}
      </div>
    </div>
  )
}
