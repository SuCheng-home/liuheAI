import { notFound } from "next/navigation"
import TrainingDetail from "@/components/training/training-detail"
import { getTrainingById, trainingActivities } from "@/lib/training-data"

export default async function TrainingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const activity = getTrainingById(id)
  if (!activity) return notFound()
  return <TrainingDetail activity={activity} />
}

export function generateStaticParams() {
  return trainingActivities.map((t) => ({ id: t.id }))
}
