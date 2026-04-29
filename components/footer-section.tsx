"use client"

import { Phone, MapPin, Building2, Sparkles } from "lucide-react"
import AnimatedElement from "@/components/animated-element"
import JasmineMark from "@/components/jasmine-mark"

const organizers = [
  "南京市六合区教育局",
  "六合区教师发展中心",
]

export default function FooterSection() {
  return (
    <footer className="relative snap-start snap-always overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-stone-950">
      {/* 顶部装饰线 */}
      <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      {/* 背景装饰 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <AnimatedElement variant="fade-up">
          <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-start lg:justify-between">
            {/* 平台标识 */}
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-400 to-green-500 shadow-lg shadow-emerald-500/30 ring-1 ring-white/30">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.4),transparent_55%)]" />
                  <JasmineMark variant="glyph" className="relative h-9 w-9 text-white" />
                </div>
                <div>
                  <div className="font-serif text-xl font-bold tracking-wide text-white">
                    茉莉智创
                  </div>
                  <div className="text-xs text-emerald-200/80 lg:text-sm">
                    六合区AI教育智能体共创平台
                  </div>
                </div>
              </div>
              <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-emerald-100/70">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                <span>
                  与「茉莉慧学」共同构筑六合区AI教育生态——
                  <span className="text-amber-200">学习平台</span> · 
                  <span className="text-emerald-200"> 共创平台</span>
                  ，让人工智能教育在六合区落地生根、开枝散叶。
                </span>
              </p>
            </div>

            {/* 主办单位 + 联系方式 */}
            <div className="grid w-full max-w-xl gap-5 text-sm text-emerald-100/90 sm:grid-cols-2 lg:w-auto">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20">
                  <Building2 className="h-4 w-4 text-emerald-200" />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-emerald-300/70">
                    主办单位
                  </div>
                  <div className="mt-1 text-sm leading-relaxed text-white/90">
                    {organizers.map((o, i) => (
                      <div key={o}>
                        {o}
                        {i === 0 && (
                          <span className="ml-1 text-emerald-300/60">·</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 ring-1 ring-amber-400/20">
                  <Phone className="h-4 w-4 text-amber-200" />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-amber-300/70">
                    联系电话
                  </div>
                  <div className="mt-1 text-sm text-white/90">
                    025-XXXX-XXXX
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/20">
                  <MapPin className="h-4 w-4 text-emerald-200" />
                </div>
                <div>
                  <div className="text-xs font-medium uppercase tracking-wider text-emerald-300/70">
                    地址
                  </div>
                  <div className="mt-1 text-sm text-white/90">
                    江苏省南京市六合区 · 六合区教师发展中心
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* 版权 */}
        <AnimatedElement variant="fade-up" delay={150}>
          <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-emerald-800/40 pt-6 text-xs text-emerald-200/50 lg:flex-row">
            <p>
              © {new Date().getFullYear()} 茉莉智创 · 六合区AI教育智能体共创平台 · 版权所有
            </p>
            <p>
              主办：{organizers.join(" · ")}
            </p>
          </div>
        </AnimatedElement>
      </div>
    </footer>
  )
}
