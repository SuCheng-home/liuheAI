"use client"

import { useEffect, useRef } from "react"

/**
 * 茉莉花瓣轻飘效果（沿用 RainEffect 命名以减少调用方改动）
 * - 在背景层缓慢下落白色小颗粒，模拟花瓣点点意象
 */
export default function RainEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createPetal = () => {
      const petal = document.createElement("div")
      petal.className = "jasmine-petal"
      petal.style.left = `${Math.random() * 100}%`
      const duration = 10 + Math.random() * 8
      petal.style.animationDuration = `${duration}s`
      petal.style.animationDelay = `${Math.random() * 4}s`
      const size = 4 + Math.random() * 6
      petal.style.width = `${size}px`
      petal.style.height = `${size * 1.4}px`
      petal.style.opacity = `${0.25 + Math.random() * 0.45}`
      container.appendChild(petal)

      setTimeout(() => {
        petal.remove()
      }, (duration + 4) * 1000)
    }

    const interval = setInterval(() => {
      if (container.children.length < 20) {
        createPetal()
      }
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      />
      <style jsx global>{`
        .jasmine-petal {
          position: absolute;
          top: -20px;
          background:
            radial-gradient(
              ellipse at 50% 35%,
              rgba(255, 255, 255, 0.95) 0%,
              rgba(245, 250, 240, 0.7) 60%,
              rgba(220, 234, 219, 0.1) 100%
            );
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
          animation: petalFall linear infinite;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  )
}
