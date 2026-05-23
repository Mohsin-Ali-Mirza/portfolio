import { AnimatedHeading } from "./AnimatedHeading"
import { useIsGameDev } from "../hooks/useIsGameDev"

export function About() {
  const isGameDev = useIsGameDev()

  return (
    <section id="about" className="py-20 md:py-32 bg-background-alt relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono text-sm">01.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">About Me</AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-pretty">
              I am an <span className="text-foreground font-medium">AI Engineer</span> and Master’s student at the University of Bremen, specializing in <span className="text-foreground font-medium">Artificial Intelligence and Intelligent Systems</span>. Currently working as an XR & AI Intern at <span className="text-foreground font-medium">BearingPoint GmbH</span>, my expertise lies at the intersection of <span className="text-foreground font-medium">Computer Vision</span>, <span className="text-foreground font-medium">Robotics</span>, and <span className="text-foreground font-medium">Generative AI</span>, backed by over 2 years of deep technical experience in <span className="text-foreground font-medium">Unity3D</span> and AI development.
            </p>
            {isGameDev ? (
              <p className="text-muted-foreground leading-relaxed text-pretty">
                Complementing this, I architect <span className="text-foreground font-medium">Unity3D and XR applications</span> rooted in <span className="text-foreground font-medium">SOLID principles</span> and robust design patterns, with experience developing intelligent, AI-driven 3D avatars. Ultimately, I have found a powerful common ground for my gaming and AI expertise in <span className="text-foreground font-medium">robotics</span>, where I leverage my game development and deep learning background to develop end-to-end real-time vision pipelines using <span className="text-foreground font-medium">ROS2</span> as a middleware.
              </p>
            ) : (
              <p className="text-muted-foreground leading-relaxed text-pretty">
                I specialize in designing and deploying applied AI systems across the full lifecycle from designing <span className="text-foreground font-medium">multimodal architectures</span>, fine-tuning <span className="text-foreground font-medium">Transformers</span>, and implementing <span className="text-foreground font-medium">Retrieval-Augmented Generation (RAG)</span>. I engineer agentic workflows using modern frameworks (<span className="text-foreground font-medium">LangChain</span>, <span className="text-foreground font-medium">n8n</span>, <span className="text-foreground font-medium">PyTorch</span>) alongside LLM APIs (<span className="text-foreground font-medium">Gemini</span>, <span className="text-foreground font-medium">OpenAI</span>, <span className="text-foreground font-medium">Claude</span>) and open-weight models (<span className="text-foreground font-medium">Gemma</span>, <span className="text-foreground font-medium">Qwen</span>), all while deploying containerized services via <span className="text-foreground font-medium">Docker</span> and <span className="text-foreground font-medium">Kubernetes</span> for scalable, high-traffic workflows.
              </p>
            )}
            
            {/* Elegant AI / Game Dev Quote */}
            <div className="pt-2">
              <div className="border-l-[3px] border-primary pl-4 py-1 italic text-primary/90 font-light text-sm md:text-base leading-relaxed">
                {isGameDev
                  ? '"Virtual reality is not just about simulating worlds; it is about engineering new dimensions of human perception, interaction, and somatic agency."'
                  : '"We are not building intelligence to replace human minds, but to build mirrors that reflect our infinite curiosity and extend our capability."'}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border border-border overflow-hidden bg-card flex items-center justify-center shadow-lg transition-all duration-350 hover:border-primary/50">
              <img
                src="/Mohsin.webp"
                alt="Mohsin Ali Mirza"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick Facts Container */}
            <div className="w-full max-w-sm bg-card backdrop-blur-md border border-border rounded-xl p-6 shadow-xl hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center gap-2 pb-4 mb-4 border-b border-border">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping" />
                <h3 className="font-bold text-xs uppercase tracking-widest text-foreground">Quick Facts</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">Current</span>
                  <span className="text-sm font-medium text-foreground">Bearingpoint GmbH</span>
                </div>
                
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">Education</span>
                  <span className="text-sm font-medium text-foreground leading-snug block">
                    MSc Artificial Intelligence & Intelligent Systems, University Bremen
                  </span>
                </div>
                
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">Languages</span>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-secondary text-foreground text-[10px] font-bold rounded-sm border border-border">EN</span>
                    <span className="px-2 py-0.5 bg-secondary text-foreground text-[10px] font-bold rounded-sm border border-border">DE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
