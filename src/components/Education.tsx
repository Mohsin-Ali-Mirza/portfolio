import { GraduationCap, MapPin } from "lucide-react"
import { Card } from "./ui/card"
import { AnimatedHeading } from "./AnimatedHeading"

const educationData = [
  {
    institution: "University of Bremen",
    location: "Bremen, Germany",
    degree: "Master of Science in Artificial Intelligence and Intelligent Systems",
    period: "Oct 2024 – Present",
    details: [
      "Currently pursuing Master's focusing on deep learning, reasoning, and autonomous agents.",
      "Academic Performance: 1.2 German Grade"
    ]
  },
  {
    institution: "FAST-NUCES",
    location: "Karachi, Pakistan",
    degree: "Bachelor of Science in Computer Science",
    period: "2020 – 2024",
    details: [
      "Graduated in June 2024 with high distinctions.",
      "Academic Performance: CGPA 3.81 / 4.00 (1.2 German Grade equivalent)"
    ]
  }
]

export function Education() {
  return (
    <section id="education" className="py-20 md:py-32 bg-background-alt relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">05.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">
            Education
          </AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="max-w-3xl space-y-6">
          {educationData.map((edu, idx) => (
            <Card key={idx} className="hover:border-primary/50 transition-all duration-300 bg-card backdrop-blur-md border border-border rounded-xl overflow-hidden shadow-lg p-6 md:p-8">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 border border-primary/20 rounded-lg text-primary">
                      <GraduationCap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-tight">
                        {edu.institution}
                      </h3>
                      <p className="flex items-center gap-1 text-xs text-zinc-400 mt-1">
                        <MapPin className="h-3.5 w-3.5 text-zinc-500" />
                        {edu.location}
                      </p>
                    </div>
                  </div>

                  <div className="pl-0 sm:pl-14">
                    <h4 className="text-base font-semibold text-foreground">
                      {edu.degree}
                    </h4>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {edu.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <span className="text-primary font-bold select-none">▹</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-primary shadow-[0_0_8px_rgba(0,240,255,0.05)]">
                    {edu.period}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
