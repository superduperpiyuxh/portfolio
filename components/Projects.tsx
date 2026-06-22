"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "./SplitText"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Howl's Moving Castle",
    desc: "Interactive GSAP-animated tribute to Studio Ghibli with walk-cycle limbs, parallax clouds, and mouse-driven speed control.",
    tags: ["GSAP", "jQuery", "CSS3"],
    href: "/castle",
  },
  {
    title: "3D Portfolio",
    desc: "This site — built with Next.js, Three.js (R3F), and GSAP. Ghibli-inspired design with Calcifer, soot sprites, and scroll animations.",
    tags: ["Next.js", "R3F", "Three.js", "GSAP"],
    href: "/",
  },
  {
    title: "Calcifer Fire Effect",
    desc: "Real-time fire animation using requestAnimationFrame. Responds to clicks with a warm glow pulse.",
    tags: ["CSS", "JavaScript", "Canvas"],
    href: "#",
  },
  {
    title: "3D Scene Explorer",
    desc: "Drag-and-drop 3D scene builder with lighting, materials, and object manipulation via React Three Fiber.",
    tags: ["R3F", "Three.js", "React"],
    href: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll(".project-card")
      if (!cards) return

      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cards,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          }
        )
      })
      return () => mm.revert()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <SplitText
        text="Projects"
        as="h2"
        className="mb-16 text-4xl font-bold text-foreground sm:text-5xl"
        stagger={0.08}
        scrollTrigger
      />
      <div className="grid w-full max-w-5xl gap-8 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target={p.href.startsWith("http") ? undefined : "_self"}
            rel="noopener noreferrer"
            className="project-card group relative overflow-hidden rounded-2xl border border-card-border bg-card p-8 transition-all hover:border-accent/40 hover:shadow-[0_0_30px_-5px] hover:shadow-accent/10"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-accent/5 to-secondary/5 blur-xl transition-all group-hover:from-accent/15 group-hover:to-secondary/15" />
            <h3 className="relative text-xl font-semibold text-foreground">{p.title}</h3>
            <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            <div className="relative mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                  {t}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
