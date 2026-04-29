import Link from "next/link"
import Image from "next/image"
import { Star, Users, Calendar, Heart } from "lucide-react"
import type { Agent } from "@/lib/agents-data"
import { Badge } from "@/components/ui/badge"

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agents/${agent.id}`} className="group block h-full">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/60 bg-white/80 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-emerald-300/60 hover:shadow-2xl hover:shadow-emerald-500/10">
        {/* Cover */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-emerald-100 to-teal-100">
          <Image
            src={agent.cover || "/placeholder.svg"}
            alt={agent.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 via-transparent to-transparent" />

          {/* Category badge */}
          <div className="absolute left-3 top-3">
            <Badge className="border-0 bg-white/90 text-xs font-medium text-stone-700 backdrop-blur-sm hover:bg-white/95">
              {agent.category}
            </Badge>
          </div>

          {/* Stage badge */}
          <div className="absolute right-3 top-3">
            <Badge className="border-0 bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-xs font-medium text-white backdrop-blur-sm">
              {agent.stage}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 text-xl">
              {agent.icon}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-bold text-stone-900 transition-colors group-hover:text-emerald-600">
                {agent.title}
              </h3>
              <div className="mt-0.5 flex items-center gap-1 text-xs text-stone-500">
                <span className="truncate">{agent.author}</span>
                <span className="text-stone-300">·</span>
                <span className="truncate">{agent.school}</span>
              </div>
            </div>
          </div>

          <p className="line-clamp-2 text-sm leading-relaxed text-stone-600">
            {agent.description}
          </p>

          {/* Tags */}
          {agent.tags && agent.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {agent.tags.slice(0, 3).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-emerald-100 bg-emerald-50/60 text-[10px] font-medium text-emerald-600"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-3">
            <div className="flex items-center gap-3 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                <span className="font-medium text-stone-700">
                  {agent.rating.toFixed(1)}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
                {(agent.likes ?? Math.round(agent.usageCount * 0.2)).toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {agent.usageCount.toLocaleString()}
              </span>
            </div>
            <span className="flex items-center gap-1 text-xs text-stone-400">
              <Calendar className="h-3 w-3" />
              {agent.publishDate}
            </span>
          </div>
        </div>

        {/* Hover accent */}
        <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 transition-transform duration-500 group-hover:scale-x-100" />
      </article>
    </Link>
  )
}
