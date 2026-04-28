import { Suspense } from "react"
import ResearchBasePortal from "@/components/research-base/research-base-portal"

export const metadata = {
  title: "研学实践基地 | 智雨润教",
  description:
    "雨花台区中小学研学实践基地一站式服务平台，在线预约、查看活动、上传活动资料",
}

export default function ResearchBasePage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-slate-400">加载中...</div>}>
      <ResearchBasePortal />
    </Suspense>
  )
}
