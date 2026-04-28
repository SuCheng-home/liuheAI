"use client"

import { useEffect, useRef } from "react"

export default function RainEffect() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createRaindrop = () => {
      const drop = document.createElement("div")
      drop.className = "raindrop"
      drop.style.left = `${Math.random() * 100}%`
      drop.style.animationDuration = `${1.5 + Math.random() * 1}s`
      drop.style.animationDelay = `${Math.random() * 2}s`
      drop.style.opacity = `${0.1 + Math.random() * 0.3}`
      container.appendChild(drop)

      setTimeout(() => {
        drop.remove()
      }, 4000)
    }

    const interval = setInterval(() => {
      if (container.children.length < 30) {
        createRaindrop()
      }
    }, 200)

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
        .raindrop {
          position: absolute;
          top: -20px;
          width: 2px;
          height: 20px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(59, 130, 246, 0.4),
            transparent
          );
          border-radius: 50%;
          animation: rainFall linear infinite;
        }

        @keyframes rainFall {
          0% {
            transform: translateY(0) rotate(15deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(15deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}
