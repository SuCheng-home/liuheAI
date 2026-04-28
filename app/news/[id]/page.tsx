import { notFound } from "next/navigation"
import NewsDetail from "@/components/news/news-detail"
import { getNewsById, newsList } from "@/lib/news-data"

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const article = getNewsById(id)
  if (!article) return notFound()

  const related = newsList
    .filter((n) => n.id !== id && n.category === article.category)
    .slice(0, 3)

  return <NewsDetail article={article} related={related} />
}

export function generateStaticParams() {
  return newsList.map((n) => ({ id: n.id }))
}
