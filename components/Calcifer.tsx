"use client"

import { useEffect, useRef } from "react"

export default function Calcifer() {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let frame: number
    let phase = 0
    const el = ref.current
    if (!el) return

    const flicker = () => {
      phase += 0.08
      const s = 1 + Math.sin(phase * 3) * 0.03
      const ty = Math.sin(phase) * 1.5
      el.style.transform = `scale(${s}) translateY(${ty}px)`
      el.style.opacity = String(0.85 + Math.sin(phase * 5) * 0.15)
      frame = requestAnimationFrame(flicker)
    }

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flicker()
    }

    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <button
      ref={ref}
      onClick={() => {
        const el = ref.current
        if (!el) return
        el.style.transform = "scale(1.4)"
        el.style.opacity = "1"
        setTimeout(() => {
          el.style.transform = ""
          el.style.opacity = ""
        }, 300)
      }}
      aria-label="Click Calcifer for a surprise"
      className="fixed bottom-6 left-6 z-40 cursor-pointer select-none text-3xl transition-transform"
      title="Calcifer"
    >
      🔥
    </button>
  )
}
