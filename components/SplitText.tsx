"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface SplitTextProps {
  text: string
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span"
  className?: string
  delay?: number
  stagger?: number
  scrollTrigger?: boolean
}

export default function SplitText({ text, as: Tag = "h2", className = "", delay = 0, stagger = 0.04, scrollTrigger = false }: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const chars = el.querySelectorAll<HTMLSpanElement>(".split-char")
    if (!chars.length) return

    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const toVars: gsap.TweenVars = {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.5,
        stagger,
      }
      if (scrollTrigger) {
        toVars.scrollTrigger = { trigger: el, start: "top 80%" }
      }

      gsap.fromTo(chars, { y: 30, opacity: 0, rotateX: -30 }, toVars)
    })

    return () => mm.revert()
  }, [delay, stagger, scrollTrigger])

  const words = text.split(" ")

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="split-word">
          {word.split("").map((char, ci) => (
            <span key={ci} className="split-char">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
          {wi < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </Tag>
  )
}
