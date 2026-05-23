import { lazy, Suspense } from "react"
import { Header } from "./components/Header"
import { FloatingShapes } from "./components/FloatingShapes"

// Lazy load all main section components dynamically to optimize initial bundle size and speed
const Hero = lazy(() => import("./components/Hero").then(m => ({ default: m.Hero })))
const About = lazy(() => import("./components/About").then(m => ({ default: m.About })))
const Portfolio = lazy(() => import("./components/Portfolio").then(m => ({ default: m.Portfolio })))
const Experience = lazy(() => import("./components/Experience").then(m => ({ default: m.Experience })))
const Projects = lazy(() => import("./components/Projects").then(m => ({ default: m.Projects })))
const Skills = lazy(() => import("./components/Skills").then(m => ({ default: m.Skills })))
const Education = lazy(() => import("./components/Education").then(m => ({ default: m.Education })))
const Certifications = lazy(() => import("./components/Certifications").then(m => ({ default: m.Certifications })))
const Contact = lazy(() => import("./components/Contact").then(m => ({ default: m.Contact })))
const PongGame = lazy(() => import("./components/PongGame").then(m => ({ default: m.PongGame })))

// Beautiful, minimal skeleton loader to preserve section layout structures during progressive load
function SectionLoader() {
  return (
    <div className="w-full min-h-[400px] flex items-center justify-center py-24 animate-pulse bg-zinc-950/20 rounded-2xl border border-zinc-900/40 my-8 max-w-5xl mx-auto px-4">
      <div className="flex flex-col items-center gap-4">
        <div className="w-9 h-9 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Loading section...</span>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen font-sans text-foreground bg-background">
      {/* Decorative Interactive Background Shapes */}
      <FloatingShapes />

      {/* Persistent Navigation */}
      <Header />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <Suspense fallback={<SectionLoader />}>
          <Hero />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <About />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Portfolio />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Experience />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Projects />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Skills />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Education />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Certifications />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Contact />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <PongGame />
        </Suspense>
      </main>
    </div>
  )
}
