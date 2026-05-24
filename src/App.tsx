import { Header } from "./components/Header"
import { FloatingShapes } from "./components/FloatingShapes"
import { Hero } from "./components/Hero"
import { About } from "./components/About"
import { Portfolio } from "./components/Portfolio"
import { Experience } from "./components/Experience"
import { Projects } from "./components/Projects"
import { Skills } from "./components/Skills"
import { Education } from "./components/Education"
import { Certifications } from "./components/Certifications"
import { Contact } from "./components/Contact"
import { PongGame } from "./components/PongGame"

export default function App() {
  return (
    <div className="relative min-h-screen font-sans text-foreground bg-background">
      {/* Decorative Interactive Background Shapes */}
      <FloatingShapes />

      {/* Persistent Navigation */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Portfolio />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Contact />
        <PongGame />
      </main>
    </div>
  )
}
