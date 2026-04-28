"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Star,
  Calendar,
  ThumbsUp,
  ArrowLeft,
  Share2,
  Play,
  Pause,
  Image as ImageIcon,
  Video as VideoIcon,
  Music,
  Bot,
  MessageSquare,
  Tag,
  Copy,
  CheckCircle2,
  QrCode,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  works,
  reviewTagOptions,
  type Work,
} from "@/lib/works-data"
import { cn } from "@/lib/utils"

interface WorkDetailProps {
  workId: string
}

const typeIconMap = {
  图片: ImageIcon,
  视频: VideoIcon,
  音频: Music,
  智能体: Bot,
}

const workTypeLabel = {
  图片: "图片作品",
  视频: "视频作品",
  音频: "音频作品",
  智能体: "智能体作品",
} as const

export default function WorkDetail({ workId }: WorkDetailProps) {
  const work = works.find((w) => w.id === workId) ?? works[0]

  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(work.likes)
  const [audioPlaying, setAudioPlaying] = useState(false)

  const [score, setScore] = useState(0)
  const [hoverScore, setHoverScore] = useState(0)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  const authors = work.authors && work.authors.length > 0 ? work.authors : [work.creator]

  useEffect(() => {
    if (typeof window === "undefined") return
    setShareUrl(window.location.href)
  }, [])

  const qrCodeUrl = useMemo(() => {
    if (!shareUrl) return ""
    return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(shareUrl)}`
  }, [shareUrl])

  const handleLike = () => {
    if (liked) {
      setLiked(false)
      setLikes((n) => n - 1)
    } else {
      setLiked(true)
      setLikes((n) => n + 1)
    }
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleSubmit = () => {
    if (score === 0 || selectedTags.length === 0) return
    setSubmitted(true)
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

  const TypeIcon = typeIconMap[work.type]
  const relatedWorks = works
    .filter((w) => w.id !== work.id && w.type === work.type)
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 lg:px-8 lg:py-12">
      <Link
        href="/works"
        className="mb-6 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回作品列表
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Main */}
        <div className="space-y-6">
          {/* Preview area */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
              <Image
                src={work.cover || "/placeholder.svg"}
                alt={work.title}
                fill
                className="object-cover"
              />

              {/* Type-specific overlay controls */}
              {work.type === "视频" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white">
                    <Play className="ml-1 h-9 w-9 fill-current" />
                  </button>
                </div>
              )}

              {work.type === "音频" && (
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/70 to-transparent px-6 py-5">
                  <button
                    onClick={() => setAudioPlaying((p) => !p)}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-slate-900 shadow-lg transition-transform hover:scale-105"
                  >
                    {audioPlaying ? (
                      <Pause className="h-5 w-5 fill-current" />
                    ) : (
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="mb-1 flex items-center justify-between text-xs text-white/80">
                      <span>{audioPlaying ? "正在播放" : "暂停中"}</span>
                      <span>04:28</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-1000",
                          audioPlaying ? "w-2/3" : "w-1/4"
                        )}
                      />
                    </div>
                  </div>
                </div>
              )}

              {work.type === "智能体" && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/60 via-cyan-900/40 to-slate-900/70">
                  <div className="text-center text-white">
                    <Bot className="mx-auto mb-3 h-12 w-12" />
                    <p className="text-sm font-medium opacity-90">智能体作品 · 点击下方"立即体验"启动</p>
                  </div>
                </div>
              )}

              {/* Type label */}
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-slate-700 shadow-md backdrop-blur-sm">
                <TypeIcon className="h-3.5 w-3.5 text-blue-500" />
                {workTypeLabel[work.type]}
              </div>
            </div>

            {/* Title and meta below preview */}
            <div className="border-t border-slate-100 p-6 lg:p-8">
              <h1 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 lg:text-3xl">
                {work.title}
              </h1>
              <div className="mb-5 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-900">
                    {work.rating.toFixed(1)}
                  </span>
                  <span className="text-xs">综合评分</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="h-4 w-4 text-rose-500" />
                  <span className="font-semibold text-slate-900">
                    {work.likes.toLocaleString()}
                  </span>
                  <span className="text-xs">点赞</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {work.createdAt}
                </span>
              </div>

              {/* Tags */}
              {work.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {work.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-blue-100 bg-blue-50/60 text-xs font-medium text-blue-600"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              作品简介
            </h2>
            <p className="text-base leading-relaxed text-slate-700">
              {work.description[0]}
            </p>
            <div className="mt-5 space-y-3 border-t border-slate-100 pt-5 text-sm leading-relaxed text-slate-600">
              {work.description.slice(1).map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </section>

          {/* Review section */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 lg:p-8">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                我要评价
              </h2>
              <span className="text-xs text-slate-400">
                作品评价不公开姓名
              </span>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                <div className="text-base font-semibold text-emerald-700">
                  评价已提交
                </div>
                <div className="text-xs text-emerald-600">
                  感谢您的反馈，我们会持续优化作品质量
                </div>
              </div>
            ) : (
              <>
                {/* Score */}
                <div className="mb-5">
                  <div className="mb-2 text-sm font-medium text-slate-700">
                    评分 <span className="text-red-500">*</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onMouseEnter={() => setHoverScore(n)}
                        onMouseLeave={() => setHoverScore(0)}
                        onClick={() => setScore(n)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={cn(
                            "h-7 w-7 transition-all duration-200",
                            n <= (hoverScore || score)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          )}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-slate-500">
                      {score > 0 ? `${score} 分` : "请点击星星评分"}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-5">
                  <div className="mb-2 text-sm font-medium text-slate-700">
                    选择评价标签 <span className="text-red-500">*</span>
                    <span className="ml-1 text-xs text-slate-400">
                      （请至少选择 1 个）
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {reviewTagOptions.map((tag) => {
                      const active = selectedTags.includes(tag)
                      return (
                        <Badge
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={cn(
                            "cursor-pointer border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
                            active
                              ? "border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md"
                              : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          )}
                        >
                          {tag}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                {/* Comment */}
                <div className="mb-5">
                  <div className="mb-2 text-sm font-medium text-slate-700">
                    更多反馈
                    <span className="ml-1 text-xs text-slate-400">（可选）</span>
                  </div>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="您的具体建议将帮助创作者持续提升作品质量..."
                    rows={3}
                    className="border-slate-200 bg-white"
                  />
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={score === 0 || selectedTags.length === 0}
                  className="h-10 gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-6 font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 disabled:opacity-50"
                >
                  提交评价
                </Button>
              </>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Author */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <div className="mb-3 text-xs font-semibold text-slate-500">
              作品作者
            </div>
            <div className="space-y-3">
              {authors.map((author, idx) => (
                <div key={`${author.name}-${idx}`} className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md",
                      author.role === "教师"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                        : "bg-gradient-to-br from-amber-500 to-rose-500"
                    )}
                  >
                    {author.role === "教师" ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      <GraduationCap className="h-5 w-5" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-900">
                        {author.name}
                      </span>
                      <Badge
                        className={cn(
                          "border-0 text-[10px]",
                          author.role === "教师"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-amber-100 text-amber-700"
                        )}
                      >
                        {author.role}
                      </Badge>
                    </div>
                    <div className="mt-1 text-sm text-slate-600">{author.school}</div>
                    {author.role === "学生" && author.grade && (
                      <div className="mt-0.5 text-xs text-slate-500">{author.grade}</div>
                    )}
                    {author.role === "教师" && author.subject && (
                      <div className="mt-0.5 text-xs text-slate-500">任教学科：{author.subject}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Like + share */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5">
            <Button
              onClick={handleLike}
              variant="outline"
              className={cn(
                "h-11 w-full gap-2 transition-all duration-300",
                liked
                  ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
                  : "border-slate-200 hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
              )}
            >
              <ThumbsUp
                className={cn("h-4 w-4", liked && "fill-rose-500 text-rose-500")}
              />
              {liked ? "已点赞" : "点赞支持"} · {likes}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShareOpen(true)}
              className="mt-2 h-11 w-full gap-2 border-slate-200 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            >
              <Share2 className="h-4 w-4" />
              分享作品
            </Button>
          </div>

          {/* Related */}
          {relatedWorks.length > 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-5">
              <div className="mb-3 text-xs font-semibold text-slate-500">
                同类型推荐
              </div>
              <div className="space-y-3">
                {relatedWorks.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/works/${rel.id}`}
                    className="group flex gap-3"
                  >
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={rel.cover || "/placeholder.svg"}
                        alt={rel.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="line-clamp-2 text-sm font-medium text-slate-900 transition-colors group-hover:text-blue-600">
                        {rel.title}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        {rel.rating.toFixed(1)}
                        <span>·</span>
                        <span className="truncate">{rel.creator.name}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      <Dialog open={shareOpen} onOpenChange={setShareOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-slate-900">
              <Share2 className="h-4 w-4 text-blue-500" />
              分享作品
            </DialogTitle>
            <DialogDescription>
              分两步完成分享：先复制 PC 地址，再扫码在移动端打开。
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-medium text-slate-700">步骤 1：复制 PC 地址</div>
                <Badge variant="outline" className="text-[10px]">PC</Badge>
              </div>
              <div className="truncate rounded-md border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-600">
                {shareUrl || "正在生成链接..."}
              </div>
              <Button
                onClick={handleCopyShareUrl}
                className="mt-2 h-9 w-full gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90"
              >
                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "已复制" : "复制链接"}
              </Button>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="text-xs font-medium text-slate-700">步骤 2：生成二维码扫码访问</div>
                <Badge variant="outline" className="text-[10px]">移动端</Badge>
              </div>
              <div className="flex justify-center rounded-lg border border-dashed border-slate-300 bg-white p-3">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="作品分享二维码" className="h-44 w-44 rounded-md" />
                ) : (
                  <div className="flex h-44 w-44 items-center justify-center text-xs text-slate-400">
                    二维码生成中...
                  </div>
                )}
              </div>
              <p className="mt-2 text-center text-xs text-slate-500">使用微信或浏览器扫码即可在移动端打开</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShareOpen(false)}>
              完成
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
