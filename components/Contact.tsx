"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitText from "./SplitText"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          [sectionRef.current?.querySelector(".contact-form")],
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
          }
        )
      })
      return () => mm.revert()
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(data)),
      headers: { "Content-Type": "application/json" },
    })
    if (res.ok) {
      setSent(true)
      form.reset()
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center">
      <SplitText
        text="Get in touch"
        as="h2"
        className="text-4xl font-bold text-foreground sm:text-5xl"
        stagger={0.08}
        scrollTrigger
      />
      <p className="mt-4 max-w-md text-muted-foreground">
        Have a project in mind or just want to say hi? Drop me a message.
      </p>
      <div className="contact-form w-full max-w-md">
        {sent ? (
          <p className="mt-12 text-lg text-accent">Message sent! I&apos;ll get back to you soon.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-10 flex w-full flex-col gap-4 text-left">
            <input
              name="name"
              type="text"
              placeholder="Your name"
              required
              className="rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
            />
            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
              className="rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Your message"
              required
              className="rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-accent"
            />
            <button
              type="submit"
              className="link-underline mt-2 cursor-pointer self-start rounded-full bg-accent px-10 py-3 text-sm font-medium text-accent-foreground transition-all hover:scale-105"
            >
              Send message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
