"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        sectionRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      )
    })
    return () => mm.revert()
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
      <h2 className="text-4xl font-bold text-foreground sm:text-5xl">Get in touch</h2>
      <p className="mt-4 max-w-md text-muted-foreground">
        Have a project in mind or just want to say hi? Drop me a message.
      </p>
      <a
        href="mailto:hello@piyuxhh.dev"
        className="mt-8 rounded-full bg-accent px-10 py-3 text-sm font-medium text-accent-foreground transition-all hover:scale-105"
      >
        Say hello
      </a>
    </section>
  )
}
