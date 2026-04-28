"use client"

import { useRef, useEffect, useState, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollSectionProps {
  children: ReactNode
  className?: string
  id?: string
  variant?: "fade-up" | "fade-left" | "fade-right" | "scale" | "blur"
  delay?: number
  bgColor?: string
}

export default function ScrollSection({
  children,
  className,
  id,
  variant = "fade-up",
  delay = 0,
  bgColor = "bg-white",
}: ScrollSectionProps) {
  const ref = useRef<HTMLElement>(null)
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
        rootMargin: "-50px",
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const variantStyles = {
    "fade-up": {
      initial: "translate-y-20 opacity-0",
      animate: "translate-y-0 opacity-100",
    },
    "fade-left": {
      initial: "translate-x-20 opacity-0",
      animate: "translate-x-0 opacity-100",
    },
    "fade-right": {
      initial: "-translate-x-20 opacity-0",
      animate: "translate-x-0 opacity-100",
    },
    scale: {
      initial: "scale-95 opacity-0",
      animate: "scale-100 opacity-100",
    },
    blur: {
      initial: "blur-sm opacity-0",
      animate: "blur-0 opacity-100",
    },
  }

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
        bgColor,
        className
      )}
      style={{
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <div
        className={cn(
          "w-full transition-all duration-1000 ease-out",
          isVisible
            ? variantStyles[variant].animate
            : variantStyles[variant].initial
        )}
        style={{
          transitionDelay: `${delay}ms`,
        }}
      >
        {children}
      </div>
    </section>
  )
}
