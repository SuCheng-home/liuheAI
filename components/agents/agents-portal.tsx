"use client"

import { useState, useMemo } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import AgentCard from "@/components/agents/agent-card"
import JasmineMark from "@/components/jasmine-mark"
import {
  agents,
  categories,
  stages,
  audiences,
  sortOptions,
} from "@/lib/agents-data"
import { cn } from "@/lib/utils"

export default function AgentsPortal() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStage, setSelectedStage] = useState<string>("全部")
  const [selectedAudience, setSelectedAudience] = useState<string>("全部")
  const [selectedCategory, setSelectedCategory] = useState<string>("全部")
  const [sortBy, setSortBy] = useState<string>("上架时间")

  const filteredAgents = useMemo(() => {
    const result = agents.filter((agent) => {
      if (
        searchQuery &&
        !agent.title.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      if (selectedStage !== "全部" && agent.stage !== selectedStage) return false
      if (selectedAudience !== "全部" && agent.audience !== selectedAudience)
        return false
      if (selectedCategory !== "全部" && agent.category !== selectedCategory)
        return false
      return true
    })

    if (sortBy === "上架时间") {
      result.sort(
        (a, b) =>
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      )
    } else if (sortBy === "评星") {
      result.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === "使用数") {
      result.sort((a, b) => b.usageCount - a.usageCount)
    }

    return result
  }, [searchQuery, selectedStage, selectedAudience, selectedCategory, sortBy])

  const hasActiveFilters =
    selectedStage !== "全部" ||
    selectedAudience !== "全部" ||
    selectedCategory !== "全部" ||
    searchQuery !== ""

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedStage("全部")
    setSelectedAudience("全部")
    setSelectedCategory("全部")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      {/* 头部 */}
      <div className="mb-10 text-center lg:mb-14">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-white/70 px-4 py-1.5 shadow-sm shadow-emerald-900/5 backdrop-blur-sm">
          <JasmineMark variant="filled" className="h-4 w-4" />
          <span className="text-sm font-medium text-emerald-800">
            茉莉智创 · 六合区智能体共创中心
          </span>
        </div>
        <h1 className="mb-4 font-serif text-3xl font-bold tracking-tight text-stone-900 lg:text-5xl">
          探索教育智能体
          <span className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent">
            {" "}
            激活教学创新
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600 lg:text-lg">
          汇聚六合区优质教育智能体资源，助力教师高效教学、学生个性化学习
        </p>
      </div>

      {/* Search + Sort Bar */}
      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-stone-200/60 bg-white/80 p-5 backdrop-blur-sm lg:flex-row lg:items-center lg:gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <Input
            placeholder="搜索智能体名称..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-11 border-stone-200 bg-white/60 pl-11 text-sm focus-visible:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-stone-400" />
          <span className="text-sm font-medium text-stone-600">排序:</span>
          <div className="flex gap-1">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => setSortBy(option)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300",
                  sortBy === option
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                    : "text-stone-600 hover:bg-stone-100"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-4 rounded-2xl border border-stone-200/60 bg-white/80 p-5 backdrop-blur-sm">
        <FilterGroup
          label="学段"
          options={stages as readonly string[]}
          selected={selectedStage}
          onSelect={setSelectedStage}
        />
        <FilterGroup
          label="应用群体"
          options={audiences as readonly string[]}
          selected={selectedAudience}
          onSelect={setSelectedAudience}
        />
        <FilterGroup
          label="应用分类"
          options={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      {/* Results Info */}
      <div className="mb-6 flex items-center justify-between">
        <div className="text-sm text-stone-600">
          共找到{" "}
          <span className="font-bold text-emerald-600">
            {filteredAgents.length}
          </span>{" "}
          个智能体
        </div>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 gap-1.5 text-xs text-stone-500 hover:text-emerald-600"
          >
            <X className="h-3.5 w-3.5" />
            清除筛选
          </Button>
        )}
      </div>

      {/* Agent Grid */}
      {filteredAgents.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-200 bg-white/60 py-20 text-center backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
            <Search className="h-8 w-8 text-stone-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-stone-700">
            未找到匹配的智能体
          </h3>
          <p className="text-sm text-stone-500">
            尝试调整筛选条件或搜索其他关键词
          </p>
        </div>
      )}
    </div>
  )
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string
  options: readonly string[]
  selected: string
  onSelect: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      <div className="w-20 flex-shrink-0 text-sm font-semibold text-stone-700">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <Badge
            key={option}
            onClick={() => onSelect(option)}
            className={cn(
              "cursor-pointer border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
              selected === option
                ? "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                : "border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
            )}
          >
            {option}
          </Badge>
        ))}
      </div>
    </div>
  )
}
