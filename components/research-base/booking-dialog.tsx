"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Building2,
  CalendarPlus,
  Upload,
  FileText,
  User,
  Phone,
  Clock,
  X,
  AlertCircle,
  CheckCircle2,
  Users,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { ResearchBase, BookingRecord } from "@/lib/research-base-data"

interface Props {
  base: ResearchBase | null
  existingBookings: BookingRecord[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

// 将时间文本（如 "上午 09:00 - 11:30"、"全天 09:00 - 16:00"）解析为分钟范围
function parseTimeRange(text: string): [number, number] | null {
  const match = text.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/)
  if (!match) return null
  const start = parseInt(match[1], 10) * 60 + parseInt(match[2], 10)
  const end = parseInt(match[3], 10) * 60 + parseInt(match[4], 10)
  return [start, end]
}

function toMinutes(time: string): number | null {
  if (!time) return null
  const [h, m] = time.split(":").map(Number)
  if (isNaN(h) || isNaN(m)) return null
  return h * 60 + m
}

export default function BookingDialog({
  base,
  existingBookings,
  open,
  onOpenChange,
}: Props) {
  const router = useRouter()
  const [bookingDate, setBookingDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [participants, setParticipants] = useState("")
  const [contactName, setContactName] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)

  if (!base) return null

  const baseBookings = existingBookings.filter((r) => r.baseId === base.id)

  // 检查时间冲突
  const startMin = toMinutes(startTime)
  const endMin = toMinutes(endTime)
  const hasValidRange =
    startMin !== null && endMin !== null && endMin > startMin
  const timeOrderInvalid =
    startMin !== null && endMin !== null && endMin <= startMin

  const conflict =
    bookingDate && hasValidRange
      ? baseBookings.some((b) => {
          if (b.date !== bookingDate) return false
          const range = parseTimeRange(b.time)
          if (!range) return false
          const [bStart, bEnd] = range
          return startMin! < bEnd && endMin! > bStart
        })
      : false

  const participantNum = Number(participants)
  const participantsValid =
    !!participants && !isNaN(participantNum) && participantNum > 0
  const overCapacity = participantsValid && participantNum > base.capacity

  const handleAddAttachment = () => {
    const fake = `活动方案-${attachments.length + 1}.pdf`
    setAttachments([...attachments, fake])
  }

  const canSubmit =
    !!bookingDate &&
    hasValidRange &&
    !conflict &&
    !!title &&
    !!content &&
    participantsValid &&
    !overCapacity &&
    !!contactName &&
    !!contactPhone

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => {
      onOpenChange(false)
      setSubmitted(false)
      router.push("/research-base?tab=my-bookings")
    }, 1200)
  }

  const handleReset = () => {
    setBookingDate("")
    setStartTime("")
    setEndTime("")
    setTitle("")
    setContent("")
    setParticipants("")
    setContactName("")
    setContactPhone("")
    setAttachments([])
    setSubmitted(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) handleReset()
      }}
    >
      <DialogContent className="flex max-h-[92vh] max-w-2xl flex-col gap-0 overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 px-6 py-5 lg:px-8">
          <DialogHeader className="text-left">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-purple-700">
              <Building2 className="h-4 w-4" />
              {base.name}
            </div>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 lg:text-2xl">
              <CalendarPlus className="h-5 w-5 text-purple-500" />
              基地预约申请
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-slate-600">
              请填写完整的预约信息，提交后进入基地审批流程
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5 lg:px-8 lg:py-6">
          <div className="space-y-5">
            {/* 预约日期 + 时分 */}
            <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr]">
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Clock className="h-3.5 w-3.5 text-purple-500" />
                  预约日期 <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="h-10 border-slate-200 bg-white/60"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-700">
                  开始时间 <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  step={300}
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="h-10 border-slate-200 bg-white/60"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-700">
                  结束时间 <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  step={300}
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="h-10 border-slate-200 bg-white/60"
                />
              </div>
            </div>

            {/* 时间校验提示 */}
            {timeOrderInvalid && (
              <div className="flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50/80 p-3 text-sm text-amber-700">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <div className="font-medium">时间顺序有误</div>
                  <div className="mt-0.5 text-xs text-amber-600">
                    结束时间需晚于开始时间，请重新设置。
                  </div>
                </div>
              </div>
            )}

            {conflict && (
              <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50/80 p-3 text-sm text-red-600">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div>
                  <div className="font-medium">该时间段已被预约</div>
                  <div className="mt-0.5 text-xs text-red-500">
                    与现有预约冲突，请选择其它时间段后再次提交。
                  </div>
                </div>
              </div>
            )}

            {/* 活动标题 */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                活动标题 <span className="text-red-500">*</span>
              </Label>
              <Input
                placeholder="例如：五年级「AI 第一课」人工智能启蒙研学"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 border-slate-200 bg-white/60"
              />
            </div>

            {/* 活动内容 */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                活动内容 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="简要说明活动目标、参与年级、流程安排、教育期望等..."
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="border-slate-200 bg-white/60"
              />
            </div>

            {/* 参加人数 */}
            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Users className="h-3.5 w-3.5 text-purple-500" />
                参加活动人数 <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-3">
                <Input
                  type="number"
                  min={1}
                  max={base.capacity}
                  placeholder={`含学生、教师、家长在内的总人数（≤${base.capacity}）`}
                  value={participants}
                  onChange={(e) => setParticipants(e.target.value)}
                  className="h-10 border-slate-200 bg-white/60"
                />
                <div className="shrink-0 text-xs text-slate-500">
                  该基地可容纳{" "}
                  <span className="font-semibold text-slate-700">
                    {base.capacity}
                  </span>{" "}
                  人
                </div>
              </div>
              {overCapacity && (
                <div className="mt-2 flex items-start gap-1.5 text-xs text-red-500">
                  <AlertCircle className="mt-0.5 h-3 w-3 shrink-0" />
                  活动人数已超过基地最大容量，请调整后再提交。
                </div>
              )}
            </div>

            {/* 附件 */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                活动相关附件
              </Label>
              <button
                type="button"
                onClick={handleAddAttachment}
                className="group flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/40 py-6 transition-all duration-300 hover:border-purple-300 hover:bg-purple-50/40"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-400 transition-colors group-hover:text-purple-500">
                  <Upload className="h-4 w-4" />
                </div>
                <div className="text-sm font-medium text-slate-600 transition-colors group-hover:text-purple-600">
                  点击上传活动方案、任务单等
                </div>
                <div className="text-xs text-slate-400">
                  支持 PDF、Word、Excel、压缩包，单个文件 ≤ 20 MB
                </div>
              </button>
              {attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {attachments.map((name, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/60 px-3 py-2 text-sm"
                    >
                      <div className="flex items-center gap-2 text-slate-700">
                        <FileText className="h-4 w-4 text-purple-500" />
                        {name}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setAttachments(
                            attachments.filter((_, i) => i !== idx)
                          )
                        }
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 联系信息 */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <User className="h-3.5 w-3.5 text-purple-500" />
                  活动联系人 <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="请输入联系老师姓名"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="h-10 border-slate-200 bg-white/60"
                />
              </div>
              <div>
                <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                  <Phone className="h-3.5 w-3.5 text-purple-500" />
                  联系方式 <span className="text-red-500">*</span>
                </Label>
                <Input
                  placeholder="手机号或办公电话"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="h-10 border-slate-200 bg-white/60"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-stretch gap-3 border-t border-slate-100 bg-white/80 px-6 py-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="text-xs text-slate-500">
            提交后需等待基地审核通过，我们将通过电话通知审批结果
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 border-slate-200 px-4"
            >
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || submitted}
              className="h-10 gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-5 font-medium text-white shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 disabled:opacity-60"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  预约成功，跳转中...
                </>
              ) : (
                <>
                  <CalendarPlus className="h-4 w-4" />
                  确认预约
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
