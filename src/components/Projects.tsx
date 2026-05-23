import { Badge } from "./ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { AnimatedHeading } from "./AnimatedHeading"
import { ExternalLink } from "lucide-react"
import { useIsGameDev } from "../hooks/useIsGameDev"

const standardProjects = [
  {
    title: "Real-Time 6D Pose Estimation for Car Disassembly",
    description:
      "Designed a complete vision-to-action robotic pipeline integrating YOLOv8 object detection with 6D pose estimation, managed via ROS 2 Jazzy and Zenoh Action Servers with Kinova Gen3 hardware.",
    image: "/Videos/AI/Robot.webp",
    video: "/Videos/AI/Robot.mp4",
    tags: ["ROS2", "YOLOv8", "Computer Vision", "Zenoh"],
    highlight: "ROS2 & YOLOv8",
    link: "https://github.com/Robots4Sustainability/perception",
  },
  {
    title: "Follow Me TurtleBot",
    description:
      "Programmed a TurtleBot using ROS2 to dynamically track and follow a human target. Integrated real-time planar range scanning via a Lidar Sensor, developing autonomous navigation algorithms to compute linear velocity adjustments for distance control and smooth orientation-alignment rotation.",
    image: "/Videos/AI/Turtlebot.webp",
    video: "/Videos/AI/Turtlebot.mp4",
    tags: ["ROS2", "Lidar Sensor", "TurtleBot", "Target Tracking", "Robotics"],
    highlight: "ROS2 Human Tracking",
    link: "https://github.com/Mohsin-Ali-Mirza/ros-assignments",
  },
  {
    title: "Passenger YOLO Detection",
    description:
      "Developed a real-time object detection system using YOLOv8 to bolster train safety by pinpointing individuals in danger zones near tracks. Implemented an advanced proximity detection system on a polygon-shaped area adjacent to railway tracks, ensuring timely recognition of individuals near approaching trains, resulting in a 40% decrease in potential accidents.",
    image: "/Videos/AI/PassengerDetection.webp",
    video: "/Videos/AI/PassengerDetection.mp4",
    tags: ["YOLOv8", "Computer Vision", "Proximity Alert", "Train Safety"],
    highlight: "YOLOv8 Train Safety",
    link: "https://github.com/Mohsin-Ali-Mirza/Real-time-Object-Detection-for-Train-Safety-YOLOv8",
  },
  {
    title: "Segment Anything (SAM) Auto-Labeling",
    description:
      "Leveraged the Segment Anything Meta (SAM) framework to automatically generate accurate masks for a car in front view footage with minimal manual labeling effort. Demonstrated SAM’s effectiveness in generating masks for complex objects in challenging lighting and weather conditions, significantly reducing manual labeling time and effort.",
    image: "/Videos/AI/SAM.webp",
    video: "/Videos/AI/SAM.mp4",
    tags: ["Meta SAM", "Auto-Labeling", "Segmentation", "AI Vision"],
    highlight: "SAM Auto-Masking",
    link: "https://github.com/Mohsin-Ali-Mirza/sam-segment-anything-meta-traffic",
  },
  {
    title: "Face Recognition Using Generative AI",
    description:
      "Captured multi-faces using YOLOv8, integrated generative adversarial networks (GANs) to synthesize realistic facial variants, and enhanced user tracking accuracy.",
    image: "/Videos/AI/Face Recognition.webp",
    video: "/Videos/AI/Face Recognition.mp4",
    videoClass: "object-cover object-top",
    tags: ["TensorFlow", "YOLOv8", "GANs", "Computer Vision"],
    highlight: "Face Recog & GANs",
    link: "https://github.com/Mohsin-Ali-Mirza/Multiple-Face-Recognition",
  },
  {
    title: "Sign Language Detection",
    description:
      "Engineered an LSTM-based translation model using TensorFlow to preprocess frame sequence labels and decode real-time sign gestures into readable text captions.",
    image: "/Videos/AI/Sign_Detection.webp",
    video: "/Videos/AI/Sign_Detection.mp4",
    tags: ["TensorFlow", "LSTM", "Computer Vision"],
    highlight: "LSTM Sequence",
    link: "https://github.com/Mohsin-Ali-Mirza/Sign-Language-Detection-LSTM",
  },
  {
    title: "Abstractive Text Summarization",
    description:
      "Fine-tuned pre-trained T5, BART, and Pegasus models via Hugging Face, paired with an interactive Streamlit benchmarking dashboard checking latency metrics.",
    image: "/Videos/AI/Abstractive Summarization.webp",
    tags: ["Transformers", "Hugging Face", "Streamlit", "NLP"],
    highlight: "NLP Transformers",
    link: "https://github.com/Mohsin-Ali-Mirza/abstractive-summarization",
  },
  {
    title: "Cycle GANs Style Transfer",
    description:
      "Achieved stable 30-epoch adversarial convergence keeping minimax generator-discriminator balances healthy, successfully preventing mode collapse transitions.",
    image: "/Videos/AI/CycleGan.webp",
    video: "/Videos/AI/CycleGan.mp4",
    videoClass: "object-contain bg-zinc-950/40 object-center",
    tags: ["TensorFlow", "GANs", "Deep Learning"],
    highlight: "Style Transfer",
    link: "https://github.com/Mohsin-Ali-Mirza/Cycle-Gans-Style-Transfer/tree/main",
  },
  {
    title: "Lidl-to-CSV Shared Expense Tracker",
    description:
      "An elegant, mobile-friendly application to track shared expenses. Supports manual entry and automatic receipt document scanning to extract items, costs, and quantities structured with Google Gemini, syncing directly to structured Google Sheets.",
    image: "/Videos/AI/Lidl-to-Csv.png",
    tags: ["Google Gemini", "OCR AI", "Sheets Sync", "React Mobile"],
    highlight: "Structured Gemini Extraction",
    link: "https://github.com/Mohsin-Ali-Mirza/lidl-to-csv",
  },
]

const gameDevProjects = [
  {
    title: "Snatch",
    description:
      "Delivered a modern take on party chaos with competitive fun inspired by Crash Bash. Engineered a decoupled abilities system in Unity via the Strategy Pattern to decouple and streamline player powers (including dashing, warping, and blasting) on a fully launched Steam title.",
    image: "/Videos/GameDev/Snatch.webp",
    video: "/Videos/GameDev/Snatch.mp4",
    tags: ["Unity", "Steam Game", "Strategy Pattern", "Gameplay C#", "Core Abilities"],
    highlight: "Abilities System Architect",
    link: "https://store.steampowered.com/app/3630900/Snatch/",
  },
  {
    title: "Orbit Breakers",
    description:
      "Engineered an immersive 3D platformer inspired by Ratchet & Clank and Super Mario, featuring fluid spatial traversal and gravity mechanics. Developed a highly polished, tactile target-tracking combat engine modeled after the Batman Arkham Knight Beatdown system, alongside custom game-over sequences.",
    image: "/Videos/GameDev/OrbitBreakers.webp",
    video: "/Videos/GameDev/OrbitBreakers.mp4",
    tags: ["Unity", "3D Platformer", "C# Gameplay", "Combat System", "Camera Staging"],
    highlight: "Arkham Beatdown Mechanics",
    link: "https://github.com/Mohsin-Ali-Mirza/orbitbreakers",
  },
  {
    title: "Space Shooter",
    description:
      "Replicated procedural snake/worm movement mechanisms alongside high-speed space shooter maneuvering physics in Unity. Additionally, engineered a custom procedural bipedal walking robot with dynamic leg staging and realistic inverse kinematics animation.",
    image: "/Videos/GameDev/SpaceShip.webp",
    video: "/Videos/GameDev/SpaceShip.mp4",
    tags: ["Unity", "Procedural Animation", "Inverse Kinematics", "C# Gameplay", "Physics"],
    highlight: "Procedural Animation Engine",
    link: "https://www.notion.so/Third-Person-Spaceship-a482e22a52fe44bbbdd51991791ebec7?source=copy_link",
  },
  {
    title: "Call Of Objects",
    description:
      "Individually designed and developed a 2D retro-styled Platformer game with interactive mechanics. Handled system codes, playtesting, and complete documentation, using Photoshop for crafting visually aesthetic pixel displays and custom UI interfaces.",
    image: "/Videos/GameDev/Call_Of_Objects.webp",
    video: "/Videos/GameDev/Call_Of_Objects.mp4",
    tags: ["Unity", "2D Platformer", "Game Jam", "C#", "Photoshop"],
    highlight: "2D Retro Platformer",
    link: "https://mohsinalimirxa.wixsite.com/experience/callofobjects",
  },
  {
    title: "Soft Ball Shooter",
    description:
      "Developed a dedicated virtual reality shooter game on Oculus Rift, experimenting in-depth with standard headset inputs and spatial orientation features to provide sensory immersion and highly pleasant, interactive haptic player feedback.",
    image: "/Videos/GameDev/Softball_Shooter.webp",
    video: "/Videos/GameDev/Softball_Shooter.mp4",
    tags: ["Unity", "VR", "Oculus Rift", "C# Gameplay", "Spatial Audio"],
    highlight: "Oculus Rift VR",
    link: "https://mohsinalimirxa.wixsite.com/experience/softballshooter",
  },
  {
    title: "Mona Lisa AR",
    description:
      "Created an Augmented Reality application for art enthusiasts to interactively review Leonardo da Vinci's masterpieces alongside informative narration. Engineered unique, eye-catching 2D custom transition shaders to blend beautifully between paintings.",
    image: "/Videos/GameDev/Mona Lisa.webp",
    video: "/Videos/GameDev/Mona Lisa.mp4",
    tags: ["Unity", "AR", "Vuforia", "Shaders", "Mobile App"],
    highlight: "Augmented Reality Art",
    link: "https://www.linkedin.com/posts/mohsin-ali-mirza_augmentedreality-technology-development-activity-6960603981882531841-fnFF/?utm_source=share&utm_medium=member_desktop",
  },
  {
    title: "Unity Shader Animation",
    description:
      "Designed and engineered custom vertex and fragment shaders in Unity, creating dynamic animation effects and interactive material transitions for immersive gameplay environments.",
    image: "/Videos/GameDev/Unity Shader Animation.webp",
    video: "/Videos/GameDev/Unity Shader Animation.mp4",
    tags: ["Unity", "Shaders", "C#", "HLSL", "Graphics Engine"],
    highlight: "Custom HLSL Shaders",
    link: "https://www.linkedin.com/in/mohsin-ali-mirza/",
  },
  {
    title: "The Last Of Us Style Cinematic",
    description:
      "Created dramatic third-person cinematic animations inspired by The Last of Us, integrating custom motion capture staging, advanced camera work, dynamic lighting, and seamless gameplay triggers in Unity.",
    image: "/Videos/GameDev/Last Of Us.webp",
    video: "/Videos/GameDev/Last Of Us.mp4",
    tags: ["Unity", "Cinematics", "C# Gameplay", "Animation Rigging", "Blender"],
    highlight: "Cinematic Storytelling",
    link: "https://www.artstation.com/artwork/JvvEoz",
  },
  {
    title: "AR Animation Playground",
    description:
      "Developed an interactive augmented reality staging platform featuring fluid motion-captured character animations. Integrated advanced touch inputs, physics-based environment collisions, and markerless tracking.",
    image: "/Videos/GameDev/AR Animation.webp",
    video: "/Videos/GameDev/AR Animation.mp4",
    tags: ["Unity", "AR Foundation", "AR", "Animation", "Mobile"],
    highlight: "Mobile AR Foundation",
    link: "https://mohsinalimirxa.wixsite.com/experience/ar-demo",
  },
  {
    title: "Fire VFX Animation",
    description:
      "Created highly realistic and stylized real-time fire effects in Unity using visual effect graphs and custom particles, optimizing shader math to maintain excellent performance and consistent 60 FPS gameplay overhead.",
    image: "/Videos/GameDev/Fire Animation.webp",
    video: "/Videos/GameDev/Fire Animation.mp4",
    tags: ["Unity", "VFX Graph", "Shaders", "Particles", "HLSL"],
    highlight: "VFX Particle Shader",
    link: "https://www.linkedin.com/posts/mohsin-ali-mirza_i-decided-to-create-a-short-animation-on-activity-6958441023979032576-hDpI/?utm_source=share&utm_medium=member_desktop",
  },
  {
    title: "Hyper Casual Prototype",
    description:
      "Polished a rapid hyper-casual prototype implementing high-engagement physical micro-mechanics, clean touch gesture listeners, and custom feedback loops to captivate players in short sessions.",
    image: "/Videos/GameDev/Hyper Casual.webp",
    video: "/Videos/GameDev/Hyper Casual.mp4",
    videoClass: "object-cover object-[center_75%]",
    tags: ["Unity", "Mobile Game", "C#", "Gameplay Mechanics", "Hyper-Casual"],
    highlight: "Touch Control Loop",
    link: "https://www.linkedin.com/posts/mohsin-ali-mirza_design-opportunity-experience-activity-6981904027349344256-CEZ4/?utm_source=share&utm_medium=member_desktop",
  },
  {
    title: "Flappy Bird AI",
    description:
      "Deployed a NeuroEvolution of Augmenting Topologies (NEAT) approach, constructing genetic algorithm learning agents capable of mastering complex gameplay patterns by automatically restructuring feed-forward neural networks.",
    image: "/Videos/AI/Flappy Bird.webp",
    video: "/Videos/AI/Flappy Bird.mp4",
    videoClass: "object-contain bg-zinc-950/40 object-center",
    tags: ["NEAT", "Machine Learning", "Genetic Algorithm", "Neural Nets"],
    highlight: "NeuroEvolution NEAT",
    link: "https://mohsinalimirxa.wixsite.com/experience/copy-of-shaders-animation",
  },
]

export function Projects() {
  const isGameDev = useIsGameDev()
  const activeProjects = isGameDev ? gameDevProjects : standardProjects

  return (
    <section id="projects" className="py-20 md:py-32 bg-background-alt relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="flex items-center gap-4 mb-16">
          <span className="text-primary font-mono text-sm">{isGameDev ? "03." : "03."}</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">
            {isGameDev ? "Game Dev Projects" : "Projects"}
          </AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeProjects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <Card
                id={`project-card-${index}`}
                className="hover:border-primary/50 transition-all duration-300 hover:-translate-y-1.5 h-full block bg-card backdrop-blur-md border border-border rounded-xl overflow-hidden shadow-lg cursor-pointer"
              >
                <div className="relative w-full h-44 overflow-hidden bg-background -mb-px z-10">
                  {project.video ? (
                    <video
                      src={project.video}
                      className={`w-full h-full opacity-100 group-hover:scale-105 transition-all duration-500 ease-out transform-gpu ${project.videoClass || "object-cover object-center"}`}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-100 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500 ease-out transform-gpu"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />

                  {/* Centered Hover Action Icon */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 opacity-0 group-hover:opacity-100 transition-all duration-350 ease-out">
                    <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_18px_rgba(0,240,255,0.3)] scale-90 group-hover:scale-100 transition-transform duration-350 ease-out">
                      <ExternalLink className="h-5 w-5 stroke-[2.5]" />
                    </div>
                  </div>
                </div>

                <CardHeader className="pt-5 mr-1">
                  <CardTitle className="text-base font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground mt-2 line-clamp-4">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-secondary/30 border border-border/50 text-[10px] font-bold font-mono text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-default select-none"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
