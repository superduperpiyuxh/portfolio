"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    tl.fromTo(textRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section ref={containerRef} id="home" className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1
        ref={textRef}
        className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl"
      >
        Building digital experiences
        <br />
        <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">with code & creativity</span>
      </h1>
      <p ref={subRef} className="mt-6 max-w-xl text-lg text-zinc-400 sm:text-xl">
        Full-stack developer passionate about 3D web, animations, and crafting beautiful interfaces.
      </p>
      <a
        href="#projects"
        className="mt-10 rounded-full bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
      >
        View my work
      </a>
    </section>
  )
}
