"use client"

import { Rocket, Hourglass } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function ComingSoonDialog({
  open,
  onOpenChange,
  title = "待上线",
  description = "该功能正在紧张建设中，敬请期待！",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md overflow-hidden border-blue-100 bg-white/95 p-0 backdrop-blur-xl">
        <div className="relative">
          {/* Gradient banner */}
          <div className="h-24 bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500">
            <div className="absolute left-1/2 top-12 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 shadow-xl shadow-blue-500/30">
              <Rocket className="h-10 w-10 text-white" />
            </div>
            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
              <span className="absolute left-10 top-4 h-2 w-2 animate-pulse rounded-full bg-white/60" />
              <span className="absolute right-16 top-8 h-1.5 w-1.5 animate-pulse rounded-full bg-white/60 [animation-delay:0.3s]" />
              <span className="absolute left-24 top-16 h-1 w-1 animate-pulse rounded-full bg-white/60 [animation-delay:0.6s]" />
              <span className="absolute right-10 top-14 h-1.5 w-1.5 animate-pulse rounded-full bg-white/60 [animation-delay:0.9s]" />
            </div>
          </div>

          <div className="px-8 pb-8 pt-16 text-center">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-center gap-2 text-xl font-bold text-slate-900">
                <Hourglass className="h-5 w-5 text-blue-500" />
                {title}
              </DialogTitle>
              <DialogDescription className="mt-3 text-sm leading-relaxed text-slate-600">
                {description}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => onOpenChange(false)}
                className="h-10 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 px-8 font-medium text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
              >
                我知道了
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
