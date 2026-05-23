import { Badge } from "./ui/badge"
import { AnimatedHeading } from "./AnimatedHeading"

const skillCategories = [
  {
    title: "Technical Skills",
    skills: ["C", "C++", "C#", "Python", "MLOps", "SQL (Postgres)", "MongoDB (NoSQL)", "HTML/CSS"],
  },
  {
    title: "Frameworks",
    skills: ["PyTorch", "TensorFlow", "LangChain", "FastAPI"],
  },
  {
    title: "Game Engines & Tools",
    skills: ["Unity3D", "Unreal Engine 5", "Blender"],
  },
  {
    title: "Robotics",
    skills: ["ROS2", "ISAAC Sim"],
  },
  {
    title: "AR & VR Frameworks",
    skills: ["AR Foundation", "Vuforia", "Oculus", "OpenXR"],
  },
  {
    title: "Developer Tools",
    skills: ["Git", "GitLab", "Docker", "Kafka", "Grafana", "Nginx", "AWS", "Azure", "RESTful APIs", "Microservices", "CI/CD Pipelines"],
  },
]

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono text-sm">04.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">Skills</AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-4 p-6 bg-card backdrop-blur-sm border border-border rounded-sm hover:border-primary/50 transition-all duration-300 group">
              <h3 className="font-bold text-xs uppercase tracking-widest text-white group-hover:text-primary transition-colors pb-2 border-b border-border">{category.title}</h3>
              <div className="flex flex-wrap gap-2 pt-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-secondary/35 border border-border/50 text-[10px] font-bold font-mono text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-default select-none uppercase tracking-wide"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
