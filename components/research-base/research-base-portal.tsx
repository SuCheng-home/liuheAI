"use client"

import { useSearchParams } from "next/navigation"
import { Sparkles } from "lucide-react"
import BaseInfoPanel from "./base-info-panel"
import MyBookingsList from "./my-bookings-list"

export default function ResearchBasePortal() {
  const searchParams = useSearchParams()
  const tab = searchParams.get("tab")
  const view = tab === "my-bookings" ? "my-bookings" : "info"

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Hero */}
      <div className="mb-8 text-center lg:mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-purple-600">
            雨花台区研学实践资源平台
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
          {view === "my-bookings" ? (
            <>
              我的
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                {" "}
                预约记录
              </span>
            </>
          ) : (
            <>
              研学实践
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                {" "}
                基地服务平台
              </span>
            </>
          )}
        </h1>
        <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
          {view === "my-bookings"
            ? "查看您已提交的预约申请，跟进审批进度，并在活动结束后上传总结与评价"
            : "一站式浏览雨花台区已签约研学基地，在线发起预约、跟进审批、上传活动总结，让每一次研学都留下印记"}
        </p>
      </div>

      {/* Content */}
      {view === "info" ? <BaseInfoPanel /> : <MyBookingsList />}
    </div>
  )
}
