"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

const links = ["Home", "Projects", "Contact"]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })
  }, [])

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 backdrop-blur-md bg-black/20">
      <span className="text-lg font-semibold tracking-tight text-white">Portfolio</span>
      <div className="flex gap-8 text-sm font-medium text-zinc-300">
        {links.map((link) => (
          <a key={link} href={link === "Home" ? "#" : `#${link.toLowerCase()}`} className="transition-colors hover:text-white">
            {link}
          </a>
        ))}
      </div>
    </nav>
  )
}
