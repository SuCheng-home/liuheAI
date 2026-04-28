"use client"

import Link from "next/link"
import Image from "next/image"
import {
  ArrowLeft,
  Clock,
  Eye,
  User,
  Tag as TagIcon,
  Share2,
  Bookmark,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { NewsItem } from "@/lib/news-data"
import AnimatedElement from "@/components/animated-element"

export default function NewsDetail({
  article,
  related,
}: {
  article: NewsItem
  related: NewsItem[]
}) {
  return (
    <div className="relative mx-auto max-w-4xl px-4 py-10 lg:px-6 lg:py-14">
      {/* 返回 */}
      <Link
        href="/news"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-blue-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回资讯列表
      </Link>

      <AnimatedElement variant="fade-up" duration={900}>
        <article className="overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-lg shadow-blue-500/5 backdrop-blur-sm">
          {/* 封面 */}
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src={article.coverImage || "/placeholder.svg"}
              alt={article.title}
              fill
              sizes="(max-width: 768px) 100vw, 1024px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute left-6 top-6">
              <Badge className="border-0 bg-white/90 text-xs font-medium text-blue-600 backdrop-blur-sm">
                {article.category}
              </Badge>
            </div>
          </div>

          {/* 内容 */}
          <div className="p-6 lg:p-10">
            <h1 className="mb-4 text-2xl font-bold leading-snug tracking-tight text-slate-900 lg:text-3xl">
              {article.title}
            </h1>

            {/* meta */}
            <div className="mb-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {article.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {article.views.toLocaleString()} 阅读
              </span>
              <span className="text-xs">来源：{article.source}</span>
            </div>

            {/* 概要 */}
            <div className="mb-6 rounded-2xl border-l-4 border-blue-500 bg-blue-50/50 p-4 lg:p-5">
              <p className="text-sm leading-relaxed text-slate-700 lg:text-base">
                {article.summary}
              </p>
            </div>

            {/* 正文 */}
            <div className="space-y-5 text-base leading-relaxed text-slate-700 lg:leading-8">
              {article.content.map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>

            {/* 标签 */}
            {article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
                <TagIcon className="h-4 w-4 text-slate-400" />
                {article.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-blue-100 bg-blue-50/70 text-xs text-blue-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* 操作 */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                className="h-9 gap-1.5 border-slate-200 bg-white/80 text-slate-600"
              >
                <Bookmark className="h-4 w-4" />
                收藏
              </Button>
              <Button
                variant="outline"
                className="h-9 gap-1.5 border-slate-200 bg-white/80 text-slate-600"
              >
                <Share2 className="h-4 w-4" />
                分享
              </Button>
            </div>
          </div>
        </article>
      </AnimatedElement>

      {/* 相关推荐 */}
      {related.length > 0 && (
        <AnimatedElement variant="fade-up" delay={200} duration={900}>
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-bold text-slate-900">相关资讯</h3>
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.id}`}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.coverImage || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900 transition-colors group-hover:text-blue-600">
                      {item.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{item.date}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-blue-500 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </AnimatedElement>
      )}
    </div>
  )
}
