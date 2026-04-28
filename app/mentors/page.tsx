import { Suspense } from "react"
import MentorsPortal from "@/components/mentors/mentors-portal"

export const metadata = {
  title: "AI 专家导师 - 雨花台区智雨润教AI人工智能教育资源集散中心",
}

export default function MentorsPage() {
  return (
    <Suspense fallback={null}>
      <MentorsPortal />
    </Suspense>
  )
}
