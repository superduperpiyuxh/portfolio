import Navbar from "@/components/Navbar"
import Scene3D from "@/components/Scene3D"
import Hero from "@/components/Hero"
import Projects from "@/components/Projects"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <>
      <Scene3D />
      <Navbar />
      <Hero />
      <Projects />
      <Contact />
    </>
  )
}
