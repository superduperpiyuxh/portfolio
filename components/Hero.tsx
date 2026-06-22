"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
    tl.fromTo(textRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2 })
      .fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
  }, [])

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <iframe
        src="/castle"
        className="absolute inset-0 h-full w-full border-0"
        style={{ pointerEvents: "none" }}
        title="Howl's Moving Castle"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1
          ref={textRef}
          className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl"
        >
          Building digital experiences
          <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
            with code & creativity
          </span>
        </h1>
        <p ref={subRef} className="mt-6 max-w-xl text-lg text-zinc-300 sm:text-xl">
          Full-stack developer passionate about 3D web, animations, and crafting beautiful interfaces.
        </p>
        <a
          ref={ctaRef}
          href="#projects"
          className="mt-10 rounded-full bg-white/10 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
        >
          View my work
        </a>
      </div>
    </section>
  )
}
