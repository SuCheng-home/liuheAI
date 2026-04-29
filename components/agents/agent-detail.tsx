"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import {
  Star,
  Users,
  Calendar,
  Download,
  FileText,
  ArrowLeft,
  Bookmark,
  Share2,
  Heart,
  Play,
  MessageSquare,
  Tag,
  Copy,
  CheckCircle2,
  QrCode,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Agent } from "@/lib/agents-data"
import { reviewTags } from "@/lib/agents-data"
import { cn } from "@/lib/utils"

export default function AgentDetail({ agent }: { agent: Agent }) {
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(agent.likes ?? Math.round(agent.usageCount * 0.2))
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    if (typeof window === "undefined") return
    setShareUrl(window.location.href)
  }, [])

  const qrCodeUrl = useMemo(() => {
    if (!shareUrl) return ""
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(shareUrl)}`
  }, [shareUrl])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const canSubmit = selectedRating > 0 && selectedTags.length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => {
      setSelectedRating(0)
      setSelectedTags([])
      setSubmitted(false)
    }, 2500)
  }

  const handleCopyShareUrl = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikes((n) => n - 1)
      return
    }
    setLiked(true)
    setLikes((n) => n + 1)
  }

  const reviews = agent.reviews || []

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-12">
      {/* Back */}
      <Link
        href="/agents"
        className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回智能体列表
      </Link>

      {/* Header Card */}
      <div className="mb-8 overflow-hidden rounded-3xl border border-stone-200/60 bg-white/85 backdrop-blur-md">
        <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-start lg:gap-8 lg:p-8">
          {/* Icon */}
          <div className="relative flex h-20 w-20 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 text-4xl shadow-xl shadow-emerald-500/20 lg:h-24 lg:w-24">
            <div className="absolute inset-0 bg-white/10" />
            <span className="relative">{agent.icon}</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Badge className="border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                {agent.stage}
              </Badge>
              <Badge
                variant="outline"
                className="border-stone-200 bg-stone-50 text-stone-600"
              >
                {agent.audience}
              </Badge>
              <Badge
                variant="outline"
                className="border-stone-200 bg-stone-50 text-stone-600"
              >
                {agent.category}
              </Badge>
            </div>
            <h1 className="mb-3 text-2xl font-bold text-stone-900 lg:text-3xl">
              {agent.title}
            </h1>
            <p className="mb-4 text-base leading-relaxed text-stone-600">
              {agent.longDescription || agent.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-stone-700">
                  {agent.rating.toFixed(1)}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 fill-rose-400 text-rose-400" />
                <span className="font-semibold text-stone-700">{likes.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {agent.usageCount.toLocaleString()} 次使用
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {agent.publishDate}
              </span>
            </div>

            {/* Tags */}
            {agent.tags && agent.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <Tag className="mr-1 h-3.5 w-3.5 text-stone-400" />
                {agent.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-emerald-100 bg-emerald-50/60 text-xs font-medium text-emerald-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            <div className="mt-4 text-sm text-stone-500">
              作者：
              <span className="font-medium text-stone-700">{agent.author}</span>
              <span className="mx-2 text-stone-300">·</span>
              <span>{agent.school}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-2 lg:w-40">
            <Button className="h-11 w-full gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 font-medium text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30">
              <Play className="h-4 w-4" />
              立即使用
            </Button>
            <Button
              variant="outline"
              onClick={handleLike}
              className={cn(
                "h-11 w-full gap-2 transition-all",
                liked
                  ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                  : "hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
              )}
            >
              <Heart className={cn("h-4 w-4", liked && "fill-rose-500 text-rose-500")} />
              {liked ? "已点赞" : "点赞"} · {likes}
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsFavorited(!isFavorited)}
              className={cn(
                "h-11 w-full gap-2 transition-all",
                isFavorited
                  ? "border-emerald-300 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                  : "hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
              )}
            >
              <Bookmark
                className={cn("h-4 w-4", isFavorited && "fill-emerald-600")}
              />
              {isFavorited ? "已收藏" : "收藏"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShareOpen(true)}
              className="h-11 w-full gap-2 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
            >
              <Share2 className="h-4 w-4" />
              分享
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        {/* Iframe Container */}
        <div className="overflow-hidden rounded-3xl border border-stone-200/60 bg-white/85 backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-stone-100 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
              </div>
              <span className="ml-3 text-sm font-medium text-stone-700">
                {agent.title} - 交互界面
              </span>
            </div>
            <Badge className="border-0 bg-green-100 text-xs text-green-700">
              运行中
            </Badge>
          </div>
          <div className="relative aspect-[16/10] w-full bg-gradient-to-br from-stone-50 via-emerald-50/40 to-teal-50/40">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
                <span className="relative text-5xl">{agent.icon}</span>
              </div>
              <div className="text-center">
                <h3 className="mb-2 text-xl font-bold text-stone-800">
                  智能体交互界面
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-stone-500">
                  {agent.description}
                </p>
              </div>
              <Button className="gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 px-6 font-medium text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30">
                <Play className="h-4 w-4" />
                启动智能体
              </Button>
            </div>
          </div>
        </div>

        {/* Resources */}
        <aside className="overflow-hidden rounded-3xl border border-stone-200/60 bg-white/85 p-6 backdrop-blur-md">
          <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-stone-900">
            <FileText className="h-4 w-4 text-emerald-500" />
            相关附件与资源
          </h2>
          <div className="space-y-3">
            {(
              agent.attachments || [
                { name: "使用说明.pdf", format: "PDF", size: "1.2 MB" },
                { name: "教学案例.docx", format: "DOCX", size: "2.1 MB" },
              ]
            ).map((file, i) => (
              <div
                key={i}
                className="group flex items-center gap-3 rounded-xl border border-stone-100 bg-white/60 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50/60"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <FileText className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-stone-800">
                    {file.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-stone-500">
                    <Badge
                      variant="outline"
                      className="h-4 border-stone-200 px-1.5 text-[10px] font-medium"
                    >
                      {file.format}
                    </Badge>
                    <span>{file.size}</span>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 flex-shrink-0 text-stone-400 hover:bg-emerald-100 hover:text-emerald-600"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 p-4">
            <div className="mb-3 text-xs font-semibold text-stone-500">
              使用数据
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-2xl font-bold text-emerald-600">
                  {agent.usageCount.toLocaleString()}
                </div>
                <div className="text-xs text-stone-500">累计使用</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-teal-600">
                  {agent.rating.toFixed(1)}
                </div>
                <div className="text-xs text-stone-500">综合评分</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Reviews Section */}
      <section className="mt-10 overflow-hidden rounded-3xl border border-stone-200/60 bg-white/85 p-6 backdrop-blur-md lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900">
            <MessageSquare className="h-5 w-5 text-emerald-500" />
            用户评价 ({reviews.length})
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(agent.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-stone-200"
                  )}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-stone-800">
              {agent.rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Review List */}
        <div className="mb-8 space-y-4">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-stone-100 bg-white/60 p-5 transition-all hover:border-emerald-200 hover:bg-emerald-50/20"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 text-sm font-bold text-white">
                      {review.name.slice(0, 1)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-stone-800">
                        {review.name}
                      </div>
                      <div className="text-xs text-stone-500">
                        {review.school} · {review.time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-3.5 w-3.5",
                          i < review.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-stone-200"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-emerald-100 bg-emerald-50/60 text-xs font-medium text-emerald-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-stone-200 py-12 text-center">
              <p className="text-sm text-stone-500">暂无评价，快来成为第一个评价者</p>
            </div>
          )}
        </div>

        {/* Review Input */}
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 p-6">
          <h3 className="mb-4 text-sm font-bold text-stone-800">发表评价</h3>

          {/* Star Rating */}
          <div className="mb-4">
            <div className="mb-2 text-xs font-medium text-stone-600">
              选择评分 <span className="text-red-500">*</span>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setSelectedRating(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      "h-7 w-7 transition-colors",
                      i < (hoverRating || selectedRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-stone-300"
                    )}
                  />
                </button>
              ))}
              {selectedRating > 0 && (
                <span className="ml-2 text-sm font-medium text-stone-600">
                  {selectedRating} 星
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="mb-2 text-xs font-medium text-stone-600">
              选择标签 <span className="text-red-500">*</span>（至少选择 1 个）
            </div>
            <div className="flex flex-wrap gap-2">
              {reviewTags.map((tag) => (
                <Badge
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    "cursor-pointer border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
                    selectedTags.includes(tag)
                      ? "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                      : "border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:text-emerald-600"
                  )}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || submitted}
            className={cn(
              "gap-2 transition-all",
              canSubmit
                ? "bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
                : "bg-stone-200 text-stone-400"
            )}
          >
            {submitted ? "提交成功！感谢您的反馈" : "提交评价"}
          </Button>
        </div>
      </section>

      {/* Share Dialog */}
      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>分享智能体</DialogTitle>
            <DialogDescription>
              按以下两个环节完成分享：先复制 PC 访问地址，再扫码在移动端访问。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">
                  1
                </span>
                复制 PC 地址
              </div>
              <div className="flex gap-2">
                <div className="flex-1 truncate rounded-md border border-stone-200 bg-white px-3 py-2 text-xs text-stone-600">
                  {shareUrl || "正在获取链接..."}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCopyShareUrl}
                  disabled={!shareUrl}
                  className="gap-1.5"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      已复制
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      复制
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4">
              <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-stone-800">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-600 text-xs text-white">
                  2
                </span>
                生成二维码，扫码访问
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="flex h-52 w-52 items-center justify-center overflow-hidden rounded-xl border border-stone-200 bg-white">
                  {qrCodeUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={qrCodeUrl} alt="智能体分享二维码" className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex items-center gap-2 text-sm text-stone-500">
                      <QrCode className="h-4 w-4" />
                      二维码生成中...
                    </div>
                  )}
                </div>
                <p className="text-xs text-stone-500">使用微信或浏览器扫码即可在移动端打开</p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShareOpen(false)} className="w-full sm:w-auto">
              完成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
