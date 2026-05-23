import { Youtube, ExternalLink, Gamepad2 } from "lucide-react"
import { AnimatedHeading } from "./AnimatedHeading"
import { useIsGameDev } from "../hooks/useIsGameDev"

export function Portfolio() {
  const isGameDev = useIsGameDev()

  if (!isGameDev) return null

  return (
    <section id="portfolio" className="py-20 md:py-32 bg-background relative border-b border-border/10">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono text-sm">01b.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">
            Game Dev Portfolio
          </AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Side: Video Description & Showcase Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded bg-primary/10 text-primary border border-primary/20">
                <Gamepad2 className="h-5 w-5" />
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Featured Game Demo Reel
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-tight leading-snug">
              Interactive Design & Gameplay Showreel
            </h3>

            <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
              A comprehensive showcase displaying gameplay mechanics, VR interactions, and level design built in Unity3D. This reel highlights procedural animation systems, physics-based controls, custom graphics shaders, and immersive environments designed for peak user engagement.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {["Unity3D", "C# Scripting", "Level Design", "Shader Graph", "Gameplay Systems"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-secondary/35 border border-border/50 text-[10px] font-bold font-mono text-muted-foreground hover:text-primary hover:border-primary transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="https://youtu.be/-NrMSBez94A"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-mono font-bold tracking-wider text-xs uppercase rounded-sm hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/30"
              >
                <Youtube className="h-4 w-4 fill-current text-primary-foreground" />
                Watch on YouTube
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Side: Responsive Video Player Frame */}
          <div className="lg:col-span-7">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 bg-black shadow-2xl group/player">
              <iframe
                className="absolute inset-0 w-full h-full border-0"
                src="https://www.youtube.com/embed/-NrMSBez94A?modestbranding=1&rel=0"
                title="Mohsin Ali Mirza - Game Dev Reel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
