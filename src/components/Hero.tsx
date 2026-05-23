import { Button } from "./ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { AnimatedHeading } from "./AnimatedHeading"
import { PlexusBackground } from "./PlexusBackground"
import { GameDevBackground } from "./GameDevBackground"
import { useIsGameDev } from "../hooks/useIsGameDev"

export function Hero() {
  const isGameDev = useIsGameDev()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 overflow-hidden">
      {/* Dynamic Backgrounds based on Theme Mode */}
      {isGameDev ? <GameDevBackground /> : <PlexusBackground />}

      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pb-10 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-mono text-xs md:text-sm mb-6 uppercase tracking-[0.3em]">
            {isGameDev ? "Unity XR / VR & Game Developer" : "AI Engineer & Gen AI Enthusiast"}
          </p>
          <AnimatedHeading as="h1" className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight">
            Mohsin Ali Mirza
          </AnimatedHeading>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty font-light leading-relaxed">
            {isGameDev ? (
              <>
                Crafting virtual worlds and immersive experiences with a focus on{" "}
                <span className="text-foreground font-medium">gameplay mechanics</span>, performance optimization, and spatial UI. Specializing in{" "}
                <span className="text-foreground font-medium">Unity XR / VR</span> and{" "}
                <span className="text-foreground font-medium">C# Game Architecture</span>.
              </>
            ) : (
              <>
                Crafting digital products with a focus on <span className="text-foreground font-medium">precision</span> and performance. Specializing in{" "}
                <span className="text-foreground font-medium">Machine Learning</span> and{" "}
                <span className="text-foreground font-medium">Backend Systems</span>.
              </>
            )}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <a href="#contact">
                Get in touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </a>
      </div>
    </section>
  )
}
