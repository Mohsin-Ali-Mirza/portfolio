import { Badge } from "./ui/badge"
import { Building2, MapPin, Calendar, ExternalLink } from "lucide-react"
import { AnimatedHeading } from "./AnimatedHeading"

const experiences = [
  {
    title: "Extended Reality (XR) and AI Developer",
    company: "BearingPoint GmbH",
    location: "Hamburg, Germany",
    period: "Dec 2024 – Present",
    current: true,
    description: [
      "Architected an AI-driven Virtual Assistant in Unity with RAG pipeline to surface safety compliance insights in <500ms latency, enabling field teams to access real-time regulatory guidance without context-switching.",
      "Implemented state-of-the-art Speech-to-Text (STT) and Text-to-Speech (TTS) models, optimizing inference latency to ensure seamless, low-latency audio interactions in an immersive XR environment.",
    ],
    tags: ["Unity3D", "RAG Pipeline", "Speech-to-Text", "Text-to-Speech", "XR/AR", "GenAI Engine"],
  },
  {
    title: "Game Developer",
    company: "Pixel Dream Studios",
    location: "Karachi, Pakistan",
    period: "Aug 2024 – Nov 2024",
    current: false,
    description: [
      <span>
        Implemented the Strategy Pattern in Unity to decouple and extend the game’s core ability system, enabling seamless integration of diverse player powers like dashing, warping, and blasting on a shipped{" "}
        <a
          href="https://store.steampowered.com/app/3630900/Snatch/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline inline-flex items-center gap-0.5 group/link"
        >
          Steam title
          <ExternalLink className="h-3 w-3 inline-block" />
        </a>
        .
      </span>,
      "Engineered state-driven AI behaviors for 1v1 and 1v4 single-player challenges, ensuring fast-paced matches.",
    ],
    tags: ["Unity3D", "C# Architecture", "Game Design Patterns", "State-driven AI", "Steam Engine"],
  },
  {
    title: "AI Developer",
    company: "Syslab.Ai",
    location: "Karachi, Pakistan",
    period: "Jun 2023 – Aug 2023",
    current: false,
    description: [
      "Developed a scalable, production-ready Movie Recommendation System using a hybrid recommendation model, boosting Precision@10 and Recall@10 by 80% through hyperparameter tuning.",
      "Containerized and orchestrated the microservices architecture using Docker and Kubernetes, ensuring high availability and seamless horizontal scaling for real-time inference workloads.",
    ],
    tags: ["Python", "Hybrid ML Models", "Docker", "Kubernetes", "Movie Recommendation Engine"],
  },
]

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">02.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">Work Experience</AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="relative border-l border-border/60 ml-4 md:ml-6 pl-8 md:pl-12 space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[38px] md:-left-[54px] top-6 z-10">
                {exp.current ? (
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/40 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_12px_rgba(0,240,255,0.85)]"></span>
                  </div>
                ) : (
                  <div className="h-3 w-3 rounded-full bg-border border-[2px] border-background group-hover:bg-primary transition-all duration-300" />
                )}
              </div>

              {/* Card Container */}
              <div className="relative bg-card backdrop-blur-md border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-300 group shadow-lg flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-zinc-400 mt-2">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Building2 className="h-4 w-4 text-zinc-500" />
                        {exp.company}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-zinc-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 mt-1 sm:mt-0">
                    {exp.current && (
                      <span className="shrink-0 bg-primary/15 text-primary border border-primary/30 rounded-full text-xs font-semibold px-2.5 py-0.5 tracking-wide shadow-[0_0_8px_rgba(0,240,255,0.1)]">
                        Current
                      </span>
                    )}
                    <span className={`inline-flex items-center gap-1.5 text-xs md:text-sm font-medium font-mono tracking-wider ${exp.current ? 'text-primary' : 'text-zinc-500'}`}>
                      <Calendar className="h-4 w-4 text-zinc-500" />
                      {exp.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5 my-2">
                  {exp.description.map((item, i) => (
                    <li key={i} className="text-muted-foreground text-sm leading-relaxed flex items-start gap-2.5">
                      <span className="text-primary font-bold select-none mt-0.5">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Tags/Skills list underneath */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-secondary/30 border border-border/50 text-[10px] font-bold font-mono text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-default select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
