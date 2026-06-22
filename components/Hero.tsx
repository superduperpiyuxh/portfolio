"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

export default function Hero() {
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.fromTo(subRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "+=0.6")
        .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.3")
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <iframe
        src="/castle"
        className="absolute inset-0 h-full w-full border-0"
        style={{ pointerEvents: "none" }}
        title="Howl's Moving Castle animation playing in the background"
        tabIndex={-1}
        allow="autoplay 'none'"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-4xl text-5xl font-bold leading-tight tracking-tight text-white sm:text-7xl">
          <span className="text-glow">Building digital worlds</span>
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400 bg-clip-text text-transparent text-glow">
            with code & wonder
          </span>
        </h1>
        <p ref={subRef} className="mt-6 max-w-xl text-lg text-zinc-300 sm:text-xl">
          Full-stack developer passionate about 3D web, animations, and crafting beautiful interfaces.
        </p>
        <a
          ref={ctaRef}
          href="#about"
          className="link-underline mt-10 rounded-full border border-amber-400/30 bg-white/5 px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:border-amber-400/60 hover:bg-amber-400/10"
        >
          Explore my work
        </a>
      </div>
    </section>
  )
}
