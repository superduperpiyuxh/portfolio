"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import ThemeToggle from "./ThemeToggle"

const links = ["Home", "Projects", "Contact"]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
    })
    return () => mm.revert()
  }, [])

  return (
    <nav ref={navRef} aria-label="Main" className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-black/20">
      <span className="text-lg font-semibold tracking-tight text-white">Portfolio</span>
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a key={link} href={link === "Home" ? "#" : `#${link.toLowerCase()}`} className="text-sm font-medium text-zinc-300 transition-colors hover:text-white">
            {link}
          </a>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  )
}
