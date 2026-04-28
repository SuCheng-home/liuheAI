import { Suspense } from "react"
import WorksPortal from "@/components/works/works-portal"

export default function WorksPage() {
  return (
    <Suspense fallback={null}>
      <WorksPortal />
    </Suspense>
  )
}
