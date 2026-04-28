import { notFound } from "next/navigation"
import AgentDetail from "@/components/agents/agent-detail"
import { getAgentById } from "@/lib/agents-data"

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const agent = getAgentById(id)

  if (!agent) {
    notFound()
  }

  return <AgentDetail agent={agent} />
}
