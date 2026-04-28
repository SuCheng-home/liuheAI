"use client"

import { Phone, MapPin, Building2 } from "lucide-react"
import AnimatedElement from "@/components/animated-element"

const organizers = [
  "南京市雨花台区教育局",
  "雨花台区教师发展中心",
]

export default function FooterSection() {
  return (
    <footer className="relative snap-start snap-always bg-gradient-to-b from-slate-900 to-slate-950">
      {/* 顶部装饰线 */}
      <div className="absolute left-1/4 top-0 h-px w-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
        <AnimatedElement variant="fade-up">
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            {/* 平台标识 */}
            <div className="flex items-center gap-3">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/30 ring-1 ring-white/20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
                <svg
                  viewBox="0 0 48 48"
                  className="relative h-9 w-9 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* 资源集散中心 */}
                  <circle cx="24" cy="18" r="5" />
                  <circle cx="12" cy="10" r="2" />
                  <circle cx="36" cy="10" r="2" />
                  <circle cx="10" cy="27" r="2" />
                  <circle cx="38" cy="27" r="2" />
                  <path d="M16 12l4 3" />
                  <path d="M32 12l-4 3" />
                  <path d="M12 26l7-4" />
                  <path d="M36 26l-7-4" />
                  {/* 教育底座（书本） */}
                  <path d="M14 33c3-2 5.2-3 10-3s7 1 10 3v6c-3-2-5.2-3-10-3s-7 1-10 3z" />
                  <path d="M24 30v9" />
                </svg>
              </div>
              <div>
                <div className="text-base font-bold text-white lg:text-lg">
                  雨花台区智雨润教
                </div>
                <div className="text-xs text-slate-400 lg:text-sm">
                  AI 人工智能教育资源集散中心
                </div>
              </div>
            </div>

            {/* 主办单位 + 联系方式 */}
            <div className="grid gap-3 text-sm text-slate-300 lg:grid-cols-2 lg:gap-x-10">
              <div className="flex items-start gap-2">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-500">主办单位</div>
                  <div className="text-slate-200">{organizers.join(" · ")}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-500">联系电话</div>
                  <div className="text-slate-200">025-XXXX-XXXX</div>
                </div>
              </div>
              <div className="flex items-start gap-2 lg:col-span-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                <div>
                  <div className="text-xs text-slate-500">地址</div>
                  <div className="text-slate-200">
                    江苏省南京市雨花台区雨花台区教师发展中心
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedElement>

        {/* 版权 */}
        <AnimatedElement variant="fade-up" delay={150}>
          <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 lg:flex-row">
            <p>
              © {new Date().getFullYear()} 雨花台区智雨润教 AI 人工智能教育资源集散中心 · 版权所有
            </p>
            <p>
              主办：南京市雨花台区教育局 · 雨花台区教师发展中心
            </p>
          </div>
        </AnimatedElement>
      </div>
    </footer>
  )
}
