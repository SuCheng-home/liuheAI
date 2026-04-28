"use client"

import { useRef, useEffect, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AnimatedElementProps {
  children: ReactNode
  className?: string
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale" | "blur" | "slide-up"
  delay?: number
  duration?: number
}

export default function AnimatedElement({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 700,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const variantStyles = {
    "fade-up": {
      initial: "translate-y-12 opacity-0",
      animate: "translate-y-0 opacity-100",
    },
    "fade-left": {
      initial: "translate-x-12 opacity-0",
      animate: "translate-x-0 opacity-100",
    },
    "fade-right": {
      initial: "-translate-x-12 opacity-0",
      animate: "translate-x-0 opacity-100",
    },
    scale: {
      initial: "scale-90 opacity-0",
      animate: "scale-100 opacity-100",
    },
    blur: {
      initial: "blur-sm opacity-0 scale-98",
      animate: "blur-0 opacity-100 scale-100",
    },
    "slide-up": {
      initial: "translate-y-8 opacity-0",
      animate: "translate-y-0 opacity-100",
    },
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-out",
        isVisible
          ? variantStyles[variant].animate
          : variantStyles[variant].initial,
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
