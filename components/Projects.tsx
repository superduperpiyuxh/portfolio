"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: "Howl's Moving Castle",
    desc: "Interactive GSAP-animated tribute to Studio Ghibli with walk-cycle limbs, parallax clouds, and mouse-driven speed control.",
    tags: ["GSAP", "jQuery", "CSS3"],
    href: "/howl-s-moving-castle/dist/index.html",
  },
  {
    title: "3D Portfolio",
    desc: "This site — built with Next.js, Three.js (R3F), and GSAP. Features a floating torus knot, particle field, and scroll animations.",
    tags: ["Next.js", "R3F", "Three.js", "GSAP"],
    href: "#",
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".project-card")
    if (!cards) return

    gsap.fromTo(
      cards,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
      }
    )
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <h2 className="mb-16 text-4xl font-bold text-white sm:text-5xl">Projects</h2>
      <div className="grid w-full max-w-5xl gap-8 sm:grid-cols-2">
        {projects.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target={p.href.startsWith("http") ? undefined : "_self"}
            rel="noopener noreferrer"
            className="project-card group rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-purple-500/50 hover:bg-white/10"
          >
            <h3 className="text-xl font-semibold text-white">{p.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">{p.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span key={t} className="rounded-full bg-purple-500/20 px-3 py-1 text-xs font-medium text-purple-300">
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
