"use client"

/**
 * JasmineAvatar · 茉莉数字人
 *
 * 后续替换动画的位置：
 *   - 视频：将 mp4/webm 文件放入 public/digital-human/，并通过 `videoSrc` 传入路径
 *   - 静态图：将图片放入 public/digital-human/，并通过 `imageSrc` 传入路径
 *   - 暂未提供动画时，将自动展示当前的 poster 图（avatar-poster.jpg）
 *
 * 组件结构：
 *   - 左侧：人物画面（视频/图片）
 *   - 右侧：对话气泡 · 快捷指令 · 麦克风/输入入口
 */

import Image from "next/image"
import { useEffect, useMemo, useRef, useState } from "react"
import { Mic, Send, Sparkles, Volume2, Wand2 } from "lucide-react"
import Link from "next/link"
import JasmineMark from "@/components/jasmine-mark"
import { cn } from "@/lib/utils"

type JasmineAvatarProps = {
  /** 数字人形象的视频资源（推荐 webm/mp4，循环静音播放） */
  videoSrc?: string
  /** 数字人形象的静态图资源（无视频时使用） */
  imageSrc?: string
  /** 视频的封面图（视频加载前展示） */
  posterSrc?: string
  /** 数字人姓名 */
  name?: string
  /** 数字人身份头衔 */
  title?: string
  /** 自动循环展示的对话台词（每隔几秒切换一句） */
  scripts?: string[]
  /** 快捷指令 */
  quickActions?: { label: string; href?: string; emoji?: string }[]
  className?: string
}

const DEFAULT_SCRIPTS = [
  "您好！我是茉莉，六合区AI教育智能体共创平台的数字助教。",
  "可以问我：「推荐一个三年级数学备课智能体」",
  "也可以问：「茉莉杯AI智能体大赛怎么报名？」",
  "我还能带您快速进入智能体中心，发现适合您学科的好工具。",
]

const DEFAULT_QUICK_ACTIONS = [
  { label: "推荐智能体", href: "/agents", emoji: "🌱" },
  { label: "茉莉杯报名", href: "#competitions", emoji: "🏆" },
  { label: "上传作品", href: "/agents/create", emoji: "📤" },
] satisfies JasmineAvatarProps["quickActions"]

export default function JasmineAvatar({
  videoSrc,
  imageSrc = "/digital-human/avatar-poster.jpg",
  posterSrc = "/digital-human/avatar-poster.jpg",
  name = "茉莉",
  title = "六合区AI教育数字助教",
  scripts = DEFAULT_SCRIPTS,
  quickActions = DEFAULT_QUICK_ACTIONS,
  className,
}: JasmineAvatarProps) {
  const [scriptIndex, setScriptIndex] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  // 滚动播放的对话气泡
  useEffect(() => {
    if (scripts.length <= 1) return
    const t = setInterval(() => {
      setIsSpeaking(false)
      setTimeout(() => {
        setScriptIndex((i) => (i + 1) % scripts.length)
        setIsSpeaking(true)
      }, 250)
    }, 4200)
    return () => clearInterval(t)
  }, [scripts.length])

  const currentScript = useMemo(() => scripts[scriptIndex], [scriptIndex, scripts])

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/40 to-amber-50/30 shadow-xl shadow-emerald-900/5 backdrop-blur-md",
        className,
      )}
    >
      {/* 背景花瓣装饰 */}
      <div className="pointer-events-none absolute -right-8 -top-8 opacity-20">
        <JasmineMark variant="filled" className="h-40 w-40" />
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-6 opacity-10">
        <JasmineMark variant="outline" className="h-36 w-36" />
      </div>

      <div className="relative grid gap-5 p-5 sm:grid-cols-[minmax(160px,200px)_1fr] sm:gap-6 sm:p-6 lg:p-7">
        {/* 左：数字人画面（替换动画的位置） */}
        <div className="relative">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-emerald-100 via-white to-amber-50 ring-1 ring-emerald-100">
            {videoSrc ? (
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <Image
                src={imageSrc}
                alt={`数字助教 ${name}`}
                fill
                sizes="(max-width: 640px) 60vw, 200px"
                className="object-cover"
                priority
              />
            )}

            {/* 呼吸光晕 */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-soft-glow rounded-2xl ring-1 ring-inset ring-white/40"
              style={{ boxShadow: "inset 0 0 60px rgba(16,185,129,0.15)" }}
            />

            {/* 说话指示 */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-1 text-[10px] font-medium text-emerald-700 shadow-sm ring-1 ring-emerald-100 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              {isSpeaking ? "正在讲述" : "聆听中"}
            </div>
          </div>

          {/* 名牌 */}
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-1.5 font-serif text-base font-bold text-stone-900">
              <JasmineMark variant="filled" className="h-3.5 w-3.5" />
              {name}
            </div>
            <div className="mt-0.5 text-[11px] text-stone-500">{title}</div>
          </div>
        </div>

        {/* 右：对话区 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/60 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
              <Sparkles className="h-3 w-3" />
              茉莉数字人 · 在线
            </div>
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-white/70 text-stone-500 ring-1 ring-stone-200 transition hover:bg-emerald-50 hover:text-emerald-700"
              aria-label="语音播报"
            >
              <Volume2 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* 对话气泡 */}
          <div className="relative">
            <div className="absolute -left-2 top-5 hidden h-4 w-4 rotate-45 border border-emerald-100 bg-white sm:block" />
            <div
              key={scriptIndex}
              className={cn(
                "relative rounded-2xl border border-emerald-100 bg-white px-4 py-3.5 text-sm leading-relaxed text-stone-700 shadow-sm transition-all duration-300",
                isSpeaking ? "opacity-100" : "opacity-30",
              )}
            >
              {currentScript}
            </div>
          </div>

          {/* 快捷指令 */}
          <div className="flex flex-wrap gap-1.5">
            {quickActions?.map((q) => {
              const cls =
                "inline-flex items-center gap-1 rounded-full border border-stone-200/80 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-stone-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
              const inner = (
                <>
                  {q.emoji && <span aria-hidden>{q.emoji}</span>}
                  {q.label}
                </>
              )
              return q.href ? (
                <Link key={q.label} href={q.href} className={cls}>
                  {inner}
                </Link>
              ) : (
                <span key={q.label} className={cls}>
                  {inner}
                </span>
              )
            })}
          </div>

          {/* 输入条 */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-auto flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-1.5 py-1.5 shadow-sm focus-within:border-emerald-300 focus-within:ring-2 focus-within:ring-emerald-200/60"
          >
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm shadow-emerald-600/30 transition hover:shadow-md"
              aria-label="按住说话"
            >
              <Mic className="h-4 w-4" />
            </button>
            <input
              type="text"
              placeholder="向茉莉提问，例如：推荐一个语文阅读智能体"
              className="flex-1 bg-transparent text-sm text-stone-800 placeholder:text-stone-400 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white transition hover:bg-stone-800"
              aria-label="发送"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
            <Wand2 className="h-3 w-3" />
            数字人由六合区教育局与共建团队联合打造，将持续迭代
          </div>
        </div>
      </div>
    </div>
  )
}
