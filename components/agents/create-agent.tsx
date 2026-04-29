"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  ImageIcon,
  FileText,
  Sparkles,
  CheckCircle2,
  Info,
  Folder,
  FileCode2,
  Package,
  Link2,
  FileUp,
  Bot,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { attributeTagOptions } from "@/lib/agents-data"
import { cn } from "@/lib/utils"

const stages = ["幼儿园", "小学", "初中", "高中", "职校", "其它"]
const audiences = ["教师", "学生"]
const categories = [
  "学科备课",
  "作业批改",
  "学情分析",
  "个性辅导",
  "教研协作",
  "心理辅导",
  "创意表达",
  "科学探究",
]

const agentTypes = [
  {
    id: "html-single",
    label: "HTML 单文件",
    desc: "上传单个 HTML 文件",
    icon: FileCode2,
  },
  {
    id: "html-package",
    label: "HTML 文件包",
    desc: "上传包含多个资源的文件夹",
    icon: Folder,
  },
  {
    id: "kouzi",
    label: "扣子平台",
    desc: "接入扣子智能体",
    icon: Bot,
  },
  {
    id: "adp",
    label: "腾讯 ADP",
    desc: "接入腾讯智能体开发平台",
    icon: Package,
  },
  {
    id: "other-file",
    label: "其它文件",
    desc: "上传其它类型文件",
    icon: FileUp,
  },
  {
    id: "other-url",
    label: "其它 URL 地址",
    desc: "通过访问链接接入",
    icon: Link2,
  },
]

// Tencent ADP sample agents
const adpAgents = [
  { id: "adp-01", name: "智慧课堂助手", desc: "课堂教学全流程辅助" },
  { id: "adp-02", name: "学科知识图谱", desc: "基于知识图谱的个性辅导" },
  { id: "adp-03", name: "学生学情分析", desc: "多维度学情数据分析" },
  { id: "adp-04", name: "教师成长助手", desc: "教师专业发展智能顾问" },
]

export default function CreateAgentPage() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <CreateAgent />
    </Suspense>
  );
}

function CreateAgent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isCreateMode = searchParams.get("mode") === "create"
  const [stages_, setStages] = useState<string[]>([])
  const [audiences_, setAudiences] = useState<string[]>([])
  const [categories_, setCategories] = useState<string[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [agentType, setAgentType] = useState("html-single")
  const [adpAgent, setAdpAgent] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const toggleMulti = (
    value: string,
    list: string[],
    setter: (v: string[]) => void
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      router.push("/agents/my?tab=uploaded")
    }, 1200)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 lg:px-8 lg:py-14">
      {/* Back */}
      <Link
        href="/agents"
        className="mb-6 inline-flex items-center gap-2 text-sm text-stone-500 transition-colors hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        返回智能体列表
      </Link>

      {/* Header */}
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-emerald-500" />
          <span className="text-sm font-medium text-emerald-600">
            {isCreateMode ? "创建您的教育智能体" : "上传您的教育智能体"}
          </span>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-stone-900 lg:text-4xl">
          {isCreateMode ? "创建智能体" : "上传智能体"} · 分享您的
          <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent">
            {" "}
            教学创新
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-stone-600">
          {isCreateMode
            ? "通过可视化配置与平台接入能力，快速创建可服务教学场景的教育智能体，提交后进入平台审核流程"
            : "填写基本信息，上传智能体文件或接入第三方平台，提交后进入平台审核流程"}
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. 基本信息 */}
        <Section
          number="1"
          title="基本信息"
          description="完善智能体的核心信息，便于教师同事找到并使用"
        >
          <div className="grid gap-5 lg:grid-cols-[180px_1fr]">
            {/* Cover */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-stone-700">
                封面图 <span className="text-red-500">*</span>
              </Label>
              <div className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-stone-200 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 transition-all hover:border-emerald-300 hover:from-emerald-50/60 hover:to-teal-50/60">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 transition-transform group-hover:scale-110">
                  <ImageIcon className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="text-xs font-medium text-stone-700">上传封面</div>
                <div className="px-2 text-center text-[10px] leading-tight text-stone-400">
                  JPG / PNG，最大 5MB
                </div>
              </div>
            </div>

            {/* Name + Description */}
            <div className="space-y-5">
              <div>
                <Label className="mb-2 block text-sm font-medium text-stone-700">
                  智能体名称 <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="例如：古诗词智能鉴赏助手"
                  className="h-11 border-stone-200 bg-white/60"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-stone-700">
                  智能体简介 <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  placeholder="简要介绍智能体的功能、适用场景与使用价值..."
                  rows={4}
                  className="border-stone-200 bg-white/60"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-stone-700">
                  智能体 Logo <span className="text-red-500">*</span>
                  <span className="ml-2 text-xs font-normal text-stone-400">
                    展示在智能体卡片与详情页的圆形头像
                  </span>
                </Label>
                <div className="flex items-center gap-4">
                  <div className="group relative flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-stone-200 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 transition-all hover:border-emerald-300 hover:from-emerald-50/60 hover:to-teal-50/60">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <ImageIcon className="h-5 w-5 text-emerald-500 transition-transform group-hover:scale-110" />
                      <span className="text-[10px] font-medium text-stone-600">
                        上传 Logo
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-1.5 text-xs text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      建议尺寸：256 × 256 像素，正方形
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      支持 PNG / SVG，最大 2MB
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-emerald-400" />
                      建议使用透明底图或品牌主色
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 2. 分类与标签（合并） */}
        <Section
          number="2"
          title="分类与标签"
          description="选择合适的分类与标签（均支持多选），便于精准匹配受众与检索"
        >
          <div className="space-y-6">
            <MultiFilterSelector
              label="适用学段"
              options={stages}
              selected={stages_}
              onToggle={(v) => toggleMulti(v, stages_, setStages)}
              required
            />
            <MultiFilterSelector
              label="应用群体"
              options={audiences}
              selected={audiences_}
              onToggle={(v) => toggleMulti(v, audiences_, setAudiences)}
              required
            />
            <MultiFilterSelector
              label="应用分类"
              options={categories}
              selected={categories_}
              onToggle={(v) => toggleMulti(v, categories_, setCategories)}
              required
            />

            {/* Divider */}
            <div className="border-t border-stone-100" />

            {/* 特性标签 */}
            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-stone-700">
                <Tag className="h-3.5 w-3.5 text-emerald-500" />
                特性标签
              </Label>
              <p className="mb-3 text-xs leading-relaxed text-stone-500">
                标记智能体的独特属性与功能特点，便于其他老师快速识别（可多选）
              </p>
              <div className="flex flex-wrap gap-2">
                {attributeTagOptions.map((tag) => {
                  const active = selectedTags.includes(tag)
                  return (
                    <Badge
                      key={tag}
                      onClick={() =>
                        toggleMulti(tag, selectedTags, setSelectedTags)
                      }
                      className={cn(
                        "cursor-pointer border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
                        active
                          ? "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                          : "border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                      )}
                    >
                      {tag}
                    </Badge>
                  )
                })}
              </div>
              {selectedTags.length > 0 && (
                <div className="mt-3 text-xs text-stone-500">
                  已选 <span className="font-semibold text-emerald-600">{selectedTags.length}</span> 个标签
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* 3. 智能体 */}
        <Section
          number="3"
          title="智能体"
          description="选择智能体的接入方式"
        >
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {agentTypes.map((type) => {
              const Icon = type.icon
              const isActive = agentType === type.id
              return (
                <button
                  key={type.id}
                  onClick={() => setAgentType(type.id)}
                  className={cn(
                    "group flex items-start gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                    isActive
                      ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-500/10"
                      : "border-stone-200 bg-white/60 hover:border-emerald-200"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg transition-all",
                      isActive
                        ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md"
                        : "bg-stone-100 text-stone-600 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-sm font-semibold",
                          isActive ? "text-emerald-600" : "text-stone-800"
                        )}
                      >
                        {type.label}
                      </span>
                      {isActive && (
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500" />
                      )}
                    </div>
                    <span className="mt-0.5 block text-xs leading-relaxed text-stone-500">
                      {type.desc}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Dynamic configuration based on agent type */}
          <div className="mt-6">
            {agentType === "html-single" && (
              <UploadArea
                icon={FileCode2}
                title="上传 HTML 单文件"
                description="选择一个完整的 HTML 文件，包含所有内联样式与脚本"
                accept=".html, .htm"
                buttonText="选择 HTML 文件"
              />
            )}

            {agentType === "html-package" && (
              <div className="space-y-4">
                <UploadArea
                  icon={Folder}
                  title="上传 HTML 文件包"
                  description="选择包含 HTML 及相关资源的文件夹（或 ZIP 压缩包）"
                  accept=".zip"
                  buttonText="选择文件夹"
                  folder
                />
                <div>
                  <Label className="mb-2 block text-sm font-medium text-stone-700">
                    指定首页文件路径 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="例如：index.html 或 pages/home.html"
                    className="h-11 border-stone-200 bg-white/60 font-mono text-sm"
                  />
                  <div className="mt-2 text-xs text-stone-500">
                    请填写文件夹目录下作为首界面的 HTML 文件相对路径
                  </div>
                </div>
              </div>
            )}

            {agentType === "kouzi" && (
              <div className="space-y-4">
                <InfoCallout
                  title="接口配置说明"
                  steps={[
                    "登录扣子平台（coze.cn）完成智能体搭建与调试",
                    "在智能体详情页点击发布，选择 API 发布渠道",
                    "复制智能体的 Bot ID、API Token 等接口参数",
                    "将参数粘贴到下方对应输入框，完成接入",
                  ]}
                />
                <div className="grid gap-4 lg:grid-cols-2">
                  <div>
                    <Label className="mb-2 block text-sm font-medium text-stone-700">
                      Bot ID <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      placeholder="例如：7301234567890123456"
                      className="h-11 border-stone-200 bg-white/60 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-medium text-stone-700">
                      Access Token <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="password"
                      placeholder="pat_xxxxxxxxxxxxxxxx"
                      className="h-11 border-stone-200 bg-white/60 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-medium text-stone-700">
                      API 基础地址
                    </Label>
                    <Input
                      placeholder="https://api.coze.cn"
                      defaultValue="https://api.coze.cn"
                      className="h-11 border-stone-200 bg-white/60 font-mono text-sm"
                    />
                  </div>
                  <div>
                    <Label className="mb-2 block text-sm font-medium text-stone-700">
                      工作空间 ID
                    </Label>
                    <Input
                      placeholder="选填，多空间场景下填写"
                      className="h-11 border-stone-200 bg-white/60 font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            )}

            {agentType === "adp" && (
              <div className="space-y-4">
                <InfoCallout
                  title="选择腾讯 ADP 已注册的智能体"
                  steps={[
                    "平台已对接腾讯 ADP 企业账户，可直接选择已发布的智能体",
                    "选中后系统将自动完成鉴权与通信配置，无需手动填写参数",
                  ]}
                />
                <div>
                  <Label className="mb-3 block text-sm font-medium text-stone-700">
                    选择智能体 <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {adpAgents.map((a) => {
                      const active = adpAgent === a.id
                      return (
                        <button
                          key={a.id}
                          onClick={() => setAdpAgent(a.id)}
                          className={cn(
                            "group flex items-center gap-3 rounded-xl border-2 p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
                            active
                              ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-lg shadow-emerald-500/10"
                              : "border-stone-200 bg-white/60 hover:border-emerald-200"
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg transition-all",
                              active
                                ? "bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-md"
                                : "bg-stone-100 text-stone-600"
                            )}
                          >
                            <Bot className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className={cn(
                                "truncate text-sm font-semibold",
                                active ? "text-emerald-600" : "text-stone-800"
                              )}
                            >
                              {a.name}
                            </div>
                            <div className="truncate text-xs text-stone-500">
                              {a.desc}
                            </div>
                          </div>
                          {active && (
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                          )}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {agentType === "other-file" && (
              <UploadArea
                icon={FileUp}
                title="上传其它类型文件"
                description="支持上传智能体可执行的任意格式文件，由平台引擎识别与运行"
                accept="*"
                buttonText="选择文件"
              />
            )}

            {agentType === "other-url" && (
              <div className="space-y-4">
                <InfoCallout
                  title="请把在智能体平台制作后并可以正常访问的 URL 地址复制到下方"
                  steps={[
                    "在第三方智能体平台（如 Dify、百度千帆、文心一言等）完成制作",
                    "发布并确保该 URL 公网可访问、无需登录或已内嵌鉴权",
                    "将完整访问链接复制粘贴到下方 URL 输入框",
                  ]}
                />
                <div>
                  <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-stone-700">
                    <Link2 className="h-4 w-4 text-emerald-500" />
                    URL 地址 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="https://your-agent-platform.com/agent/xxxx"
                    className="h-11 border-stone-200 bg-white/60 font-mono text-sm"
                  />
                  <div className="mt-2 text-xs text-stone-500">
                    仅支持粘贴 URL 地址，不接受 iframe 或嵌入代码
                  </div>
                </div>
              </div>
            )}
          </div>
        </Section>

        {/* 4. 附件与资源 */}
        <Section
          number="4"
          title="附件与资源"
          description="上传使用说明、教学案例等相关材料（可选）"
        >
          <div className="group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-stone-200 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 p-5 transition-all hover:border-emerald-300 hover:from-emerald-50/60 hover:to-teal-50/60">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 transition-transform group-hover:scale-110">
              <FileText className="h-5 w-5 text-emerald-500" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-stone-700">
                点击选择文件或拖拽上传
              </div>
              <div className="mt-1 text-xs text-stone-500">
                支持 PDF、DOCX、PPT、ZIP 等格式，支持批量上传
              </div>
            </div>
            <Button
              variant="outline"
              className="flex-shrink-0 border-emerald-200 bg-white/80 text-emerald-600 hover:bg-emerald-50"
            >
              选择文件
            </Button>
          </div>
        </Section>

        {/* Actions */}
        <div className="sticky bottom-6 z-20 flex flex-col items-stretch gap-3 rounded-2xl border border-stone-200/60 bg-white/90 px-6 py-4 shadow-xl shadow-emerald-500/5 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-stone-500">
            <Sparkles className="h-4 w-4 text-emerald-500" />
            提交后将进入审核流程，通过后公开展示
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="h-10 hover:border-emerald-300 hover:bg-emerald-50"
            >
              保存草稿
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitted}
              className="h-10 gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 px-5 font-medium text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-80"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  提交成功，跳转中...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  提交审核
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="overflow-hidden rounded-3xl border border-stone-200/60 bg-white/85 p-6 backdrop-blur-md lg:p-8">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-lg font-bold text-white shadow-lg shadow-emerald-500/20">
          {number}
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900">{title}</h2>
          <p className="mt-0.5 text-sm text-stone-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function MultiFilterSelector({
  label,
  options,
  selected,
  onToggle,
  required,
}: {
  label: string
  options: string[]
  selected: string[]
  onToggle: (value: string) => void
  required?: boolean
}) {
  return (
    <div>
      <Label className="mb-2 block text-sm font-medium text-stone-700">
        {label} {required && <span className="text-red-500">*</span>}
        <span className="ml-1.5 text-xs font-normal text-stone-400">可多选</span>
      </Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option)
          return (
            <Badge
              key={option}
              onClick={() => onToggle(option)}
              className={cn(
                "cursor-pointer border px-3 py-1 text-xs font-medium transition-all duration-300 hover:-translate-y-0.5",
                active
                  ? "border-transparent bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md"
                  : "border-stone-200 bg-white text-stone-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
              )}
            >
              {option}
            </Badge>
          )
        })}
      </div>
    </div>
  )
}

function UploadArea({
  icon: Icon,
  title,
  description,
  accept,
  buttonText,
  folder,
}: {
  icon: React.ElementType
  title: string
  description: string
  accept: string
  buttonText: string
  folder?: boolean
}) {
  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-stone-200 bg-gradient-to-br from-emerald-50/30 to-teal-50/30 p-5 transition-all hover:border-emerald-300 hover:from-emerald-50/60 hover:to-teal-50/60">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/10 to-teal-500/10 transition-transform group-hover:scale-110">
        <Icon className="h-6 w-6 text-emerald-500" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-stone-700">{title}</div>
        <div className="mt-1 text-xs text-stone-500">{description}</div>
      </div>
      <Button
        variant="outline"
        className="flex-shrink-0 border-emerald-200 bg-white/80 text-emerald-600 hover:bg-emerald-50"
      >
        {folder ? "选择文件夹" : buttonText}
      </Button>
      <input
        type="file"
        accept={accept}
        {...(folder ? { webkitdirectory: "true", directory: "true" } : {})}
        className="hidden"
      />
    </div>
  )
}

function InfoCallout({
  title,
  steps,
}: {
  title: string
  steps: string[]
}) {
  return (
    <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/60 to-teal-50/60 p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-sm">
          <Info className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="text-sm font-semibold text-emerald-700">{title}</div>
      </div>
      <ol className="ml-8 list-decimal space-y-1 text-xs leading-relaxed text-stone-600">
        {steps.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  )
}
