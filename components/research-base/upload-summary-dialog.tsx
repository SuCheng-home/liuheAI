"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Upload,
  ImagePlus,
  X,
  Star,
  Award,
  FileText,
  CheckCircle2,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { MyBooking } from "@/lib/research-base-data"
import { cn } from "@/lib/utils"

interface Props {
  booking: MyBooking | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: (id: string) => void
}

const presetPhotos = [
  "/research-activity-students-learning.jpg",
  "/research-activity-robotics-workshop.jpg",
  "/research-activity-tea-ceremony.jpg",
  "/research-activity-agriculture-farming.jpg",
]

export default function UploadSummaryDialog({
  booking,
  open,
  onOpenChange,
  onSuccess,
}: Props) {
  const [summary, setSummary] = useState("")
  const [photos, setPhotos] = useState<string[]>([])
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [baseReview, setBaseReview] = useState("")
  const [submitted, setSubmitted] = useState(false)

  if (!booking) return null

  const canSubmit = summary.length > 0 && photos.length > 0 && rating > 0

  const togglePhoto = (src: string) => {
    setPhotos((prev) =>
      prev.includes(src) ? prev.filter((p) => p !== src) : [...prev, src]
    )
  }

  const handleReset = () => {
    setSummary("")
    setPhotos([])
    setRating(0)
    setBaseReview("")
    setSubmitted(false)
  }

  const handleSubmit = () => {
    if (!canSubmit) return
    setSubmitted(true)
    setTimeout(() => {
      onSuccess(booking.id)
      onOpenChange(false)
      handleReset()
    }, 1000)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) handleReset()
      }}
    >
      <DialogContent className="max-h-[92vh] max-w-2xl gap-0 overflow-hidden p-0">
        <div className="border-b border-slate-100 bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10 px-6 py-5 lg:px-8">
          <DialogHeader className="text-left">
            <div className="mb-2 text-sm font-medium text-emerald-700">
              {booking.baseName}
            </div>
            <DialogTitle className="flex items-center gap-2 text-xl font-bold text-slate-900 lg:text-2xl">
              <Award className="h-5 w-5 text-emerald-500" />
              上传活动过程资料
            </DialogTitle>
            <DialogDescription className="mt-1 text-sm text-slate-600">
              「{booking.activityTitle}」· 活动日期 {booking.bookingDate}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="max-h-[calc(92vh-10rem)] overflow-y-auto px-6 py-5 lg:px-8 lg:py-6">
          <div className="space-y-6">
            {/* 活动总结 */}
            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <FileText className="h-3.5 w-3.5 text-emerald-500" />
                活动总结 <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="请从活动规模、流程、学生参与度、教育成效、亮点瞬间、建议改进等维度总结本次研学活动..."
                rows={5}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="border-slate-200 bg-white/60"
              />
              <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400">
                <span>建议 200 字以上，系统会自动同步至基地档案</span>
                <span>{summary.length} 字</span>
              </div>
            </div>

            {/* 上传照片 */}
            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <ImagePlus className="h-3.5 w-3.5 text-emerald-500" />
                上传活动照片 <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {presetPhotos.map((src, idx) => {
                  const active = photos.includes(src)
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => togglePhoto(src)}
                      className={cn(
                        "group relative aspect-[4/3] overflow-hidden rounded-xl border-2 transition-all duration-300",
                        active
                          ? "border-emerald-500 shadow-lg shadow-emerald-500/20"
                          : "border-transparent hover:border-emerald-200"
                      )}
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`备选照片 ${idx + 1}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className={cn(
                          "object-cover transition-transform duration-500",
                          active ? "scale-105" : "group-hover:scale-105"
                        )}
                      />
                      {active && (
                        <div className="absolute inset-0 bg-emerald-500/20">
                          <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
              {photos.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  已选 {photos.length} 张
                  <button
                    onClick={() => setPhotos([])}
                    className="ml-2 text-slate-400 transition-colors hover:text-red-500"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
              <div className="mt-3 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/40 py-4 text-center">
                <Upload className="mx-auto mb-1.5 h-5 w-5 text-slate-400" />
                <div className="text-xs text-slate-500">
                  也可点击从电脑上传，支持 jpg / png，单张 ≤ 10 MB
                </div>
              </div>
            </div>

            {/* 基地评分 */}
            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-700">
                <Star className="h-3.5 w-3.5 text-amber-500" />
                基地评分 <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onMouseEnter={() => setHoverRating(n)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(n)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={cn(
                          "h-7 w-7 transition-colors",
                          (hoverRating || rating) >= n
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        )}
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <span className="ml-2 text-sm font-medium text-amber-600">
                    {rating} 分 ·{" "}
                    {
                      ["", "待改进", "一般", "满意", "优秀", "非常满意"][
                        rating
                      ]
                    }
                  </span>
                )}
              </div>
            </div>

            {/* 基地评价 */}
            <div>
              <Label className="mb-2 block text-sm font-medium text-slate-700">
                基地评价
              </Label>
              <Textarea
                placeholder="从课程设计、讲解质量、服务态度、设施条件等维度对本基地做出评价，帮助其它学校了解与选择..."
                rows={3}
                value={baseReview}
                onChange={(e) => setBaseReview(e.target.value)}
                className="border-slate-200 bg-white/60"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-slate-100 bg-white/80 px-6 py-4 backdrop-blur-sm lg:px-8">
          <div className="text-xs text-slate-500">
            上传后将展示在「我的预约」详情中，并同步至基地档案
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
              className="h-10 gap-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-5 font-medium text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 disabled:opacity-60"
            >
              {submitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  提交成功
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  提交活动资料
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
