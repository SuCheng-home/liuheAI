import WorkDetail from "@/components/works/work-detail"

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50/30 to-white">
      <WorkDetail workId={id} />
    </main>
  )
}
