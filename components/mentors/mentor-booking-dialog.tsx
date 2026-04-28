"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CalendarCheck, CheckCircle2 } from "lucide-react"
import type { ExpertMentor } from "@/lib/mentors-data"

interface MentorBookingDialogProps {
  mentor: ExpertMentor | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function MentorBookingDialog({
  mentor,
  open,
  onOpenChange,
}: MentorBookingDialogProps) {
  const router = useRouter()

  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [topic, setTopic] = useState("")
  const [plan, setPlan] = useState("")
  const [contact, setContact] = useState("")
  const [phone, setPhone] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!date || !time || !topic || !plan || !contact || !phone) return
    setSubmitted(true)
    setTimeout(() => {
      onOpenChange(false)
      router.push("/mentors/bookings")
    }, 1500)
  }

  if (!mentor) return null

  const canSubmit = date && time && topic && plan && contact && phone

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            预约 {mentor.name} · {mentor.title}
          </DialogTitle>
          <DialogDescription>
            填写预约信息，导师将在 1 - 3 个工作日内回复您的预约请求
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-12">
            <CheckCircle2 className="h-14 w-14 text-emerald-500" />
            <div className="text-lg font-semibold text-emerald-700">
              预约请求已提交
            </div>
            <div className="text-sm text-slate-500">即将跳转到「我的预约」</div>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-700">
                  预约日期 <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="h-11"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-700">
                  预约时间 <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  step={300}
                  className="h-11"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                培训内容 / 主题 <span className="text-red-500">*</span>
              </Label>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="例如：AI 赋能小学语文整本书阅读教学"
                className="h-11"
              />
            </div>

            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                培训方案 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                placeholder="请说明此次预约的培训对象、人数、培训目标、希望导师提供的内容形式（讲座 / 工作坊 / 听评课）等..."
                rows={4}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-700">
                  联系人 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="预约联系人姓名"
                  className="h-11"
                />
              </div>
              <div>
                <Label className="mb-2 block text-sm font-medium text-slate-700">
                  联系电话 <span className="text-red-500">*</span>
                </Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="11 位手机号"
                  className="h-11"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="h-10"
              >
                取消
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="h-10 gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 px-6 text-white shadow-lg shadow-purple-500/25 hover:shadow-xl disabled:opacity-50"
              >
                <CalendarCheck className="h-4 w-4" />
                确认预约
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
