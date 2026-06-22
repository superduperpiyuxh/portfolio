"use client"

import { useEffect, useRef } from "react"

const SOOT_COUNT = 8

export default function SootSprites() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const sprites: HTMLDivElement[] = []
    const velocities: { x: number; y: number }[] = []

    for (let i = 0; i < SOOT_COUNT; i++) {
      const el = document.createElement("div")
      el.textContent = "●"
      el.style.cssText = `position:fixed;pointer-events:none;z-index:9998;font-size:${8 + Math.random() * 10}px;color:hsl(var(--accent) / 0.3);transition:none;`
      el.style.left = `${Math.random() * 100}vw`
      el.style.top = `${Math.random() * 100}vh`
      container.appendChild(el)
      sprites.push(el)
      velocities.push({
        x: (Math.random() - 0.5) * 0.3,
        y: (Math.random() - 0.5) * 0.3 - 0.15,
      })
    }

    let mouseX = -1000
    let mouseY = -1000

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener("mousemove", onMouse)

    let frame: number
    const animate = () => {
      sprites.forEach((el, i) => {
        let x = parseFloat(el.style.left)
        let y = parseFloat(el.style.top)
        const dx = mouseX - x
        const dy = mouseY - y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 200) {
          const flee = (200 - dist) / 200
          velocities[i].x -= (dx / dist) * flee * 0.5
          velocities[i].y -= (dy / dist) * flee * 0.5
        }

        velocities[i].x += (Math.random() - 0.5) * 0.05
        velocities[i].y += (Math.random() - 0.5) * 0.05
        velocities[i].x *= 0.98
        velocities[i].y *= 0.98

        x += velocities[i].x
        y += velocities[i].y

        if (x < -5) x = 105
        if (x > 105) x = -5
        if (y < -5) y = 105
        if (y > 105) y = -5

        el.style.left = `${x}vw`
        el.style.top = `${y}vw`
      })
      frame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMouse)
      sprites.forEach((el) => el.remove())
    }
  }, [])

  return <div ref={containerRef} />
}
