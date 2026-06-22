"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "./SplitText"

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: "React / Next.js", level: 90 },
  { name: "TypeScript", level: 85 },
  { name: "Three.js / R3F", level: 75 },
  { name: "GSAP", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Tailwind CSS", level: 90 },
]

const timeline = [
  { year: "2024", event: "Built first 3D web experience with Three.js" },
  { year: "2023", event: "Started freelance web development" },
  { year: "2022", event: "Discovered GSAP — fell in love with web animation" },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".about-fade", { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        })
      })
      return () => mm.revert()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32">
      <div className="flex w-full max-w-5xl flex-col gap-16">
        <div className="about-fade flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-12">
          <div className="flex-shrink-0">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 p-1 sm:h-40 sm:w-40">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-card text-4xl sm:text-5xl">
                ✦
              </div>
            </div>
          </div>
          <div>
            <SplitText
              text="About"
              as="h2"
              className="text-4xl font-bold text-foreground sm:text-5xl"
              stagger={0.08}
              scrollTrigger
            />
            <p className="drop-cap mt-4 max-w-xl leading-relaxed text-muted-foreground">
              full-stack developer who codes like painting — each line deliberate, each animation
              a brushstroke. Passionate about bringing Ghibli warmth to the web through 3D,
              motion, and craft.
            </p>
          </div>
        </div>

        <div className="about-fade">
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Skills
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.name} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground">{s.name}</span>
                  <span className="text-muted-foreground">{s.level}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-secondary"
                    style={{ width: `${s.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-fade">
          <h3 className="mb-6 text-xl font-bold text-foreground">
            Timeline
          </h3>
          <div className="space-y-6">
            {timeline.map((t, i) => (
              <div key={t.year} className="relative flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">
                    {t.year.slice(2)}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="mt-1 h-full w-px bg-card-border" />
                  )}
                </div>
                <p className="pt-1.5 text-muted-foreground">{t.event}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
