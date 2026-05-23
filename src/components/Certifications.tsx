import { useState, useEffect, useRef } from "react"
import { Award, ShieldCheck, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import { AnimatedHeading } from "./AnimatedHeading"
import { useIsGameDev } from "../hooks/useIsGameDev"

interface TimelineItem {
  id: string
  title: string
  issuer: string
  date: string
  type: "award" | "certification"
  badge: string
  description: string
  image: string
  link?: string
}

const items: TimelineItem[] = [
  // Awards / Hackathons
  {
    id: "bmw-hackathon",
    title: "Participation Agentic AI Hackathon",
    issuer: "BMW Group",
    date: "Mar 2026",
    type: "award",
    badge: "Hackathon",
    description: "Collaborated on creating advanced AI agentic systems for industrial automotive scenarios at the BMW Agentic AI Hackathon.",
    image: "/Certificates/Participation Agentic AI Hackhathon.webp",
  },
  {
    id: "bremen-hackathon",
    title: "Winner AI Toolbox Hackathon",
    issuer: "U Bremen Alliance",
    date: "Dec 2025",
    type: "award",
    badge: "Champion",
    description: "Awarded first place for designing and building innovative AI toolbox utilities.",
    image: "/Certificates/Winner Ai Toolbox Hackhathon.webp",
  },
  {
    id: "ki-hackathon",
    title: "Participation KI Hackathon",
    issuer: "Digital University Hub",
    date: "Sep 2024",
    type: "award",
    badge: "Hackathon",
    description: "Developed creative machine learning models solving critical educational problems.",
    image: "/Certificates/Participation KI Hackhathon.webp",
  },
  {
    id: "fast-gold-medalist",
    title: "Gold Medalist x2 — FAST Bachelors",
    issuer: "FAST-NUCES",
    date: "Jun 2024",
    type: "award",
    badge: "Gold Medal",
    description: "Received two gold medals for outstanding academic performance and department achievements.",
    image: "/Certificates/Gold Medalist Bachelors.webp",
  },
  {
    id: "data-science-winner",
    title: "Winner Data Science",
    issuer: "DevDay FAST",
    date: "Apr 2024",
    type: "award",
    badge: "First Place",
    description: "Conquered the predictive analytics challenge by presenting state-of-the-art predictive accuracy.",
    image: "/Certificates/Data Science Winner.webp",
  },
  {
    id: "game-jam-winner",
    title: "Winner Game Jam",
    issuer: "Procom",
    date: "Apr 2022",
    type: "award",
    badge: "First Place",
    description: "Designed, animated, and compiled a high-speed physics platformer game within 48 hours.",
    image: "/Certificates/Game Jam Procom Winner.png",
  },
  // Certifications
  {
    id: "unreal-engine",
    title: "Introduction to Unreal Engine",
    issuer: "RealityForge / Epic Games",
    date: "Nov 2023",
    type: "certification",
    badge: "Game Dev",
    description: "Comprehensive introduction to Unreal Engine, learning Blueprints, asset integration, and 3D level design.",
    image: "/Certificates/Certificate_RealityForge-Introduction_To_Unreal_Engine-1.webp",
  },
  {
    id: "msla2",
    title: "Microsoft Student Learn Ambassador Level 2",
    issuer: "Microsoft",
    date: "Sep 2023",
    type: "certification",
    badge: "Ambassador",
    description: "Advanced leadership, technical lecturing, and cloud platform evangelism as an MS Learn Ambassador.",
    image: "/Certificates/Certificate_MSLA2.webp",
  },
  {
    id: "msla1",
    title: "Microsoft Student Learn Ambassador Level 1",
    issuer: "Microsoft",
    date: "Aug 2023",
    type: "certification",
    badge: "Ambassador",
    description: "Entry level technical advocacy, student community engagement, and technical storytelling.",
    image: "/Certificates/Certificate_MSLA1.webp",
  },
  {
    id: "ea-swe",
    title: "EA Software Engineering Virtual Experience",
    issuer: "Electronic Arts (EA)",
    date: "Jul 2023",
    type: "certification",
    badge: "Software Eng",
    description: "Simulated software engineering challenges including game feedback analysis and class designs at EA.",
    image: "/Certificates/Certificate_EA-Software_Engineering_Virtual_Experience-1.webp",
  },
  {
    id: "folio3-bootcamp",
    title: "Data Science Bootcamp",
    issuer: "Folio3",
    date: "Aug 2023",
    type: "certification",
    badge: "Data Science",
    description: "Intensive training program in statistical learning, classification, modeling algorithms, and data optimization.",
    image: "/Certificates/Certificate_Folio_3_ata_Science_Bootcamp.webp",
  },
  {
    id: "mindstorm-summer",
    title: "Summer Program Experience",
    issuer: "Mindstorm Studios",
    date: "Aug 2022",
    type: "certification",
    badge: "Game Dev",
    description: "Immersive exploration of modern game design loops, monetization vectors, and gameplay programming concepts.",
    image: "/Certificates/Certificate_Mindstorm-Summer_Program-1.webp",
  },
  {
    id: "neural-networks",
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Nov 2023",
    type: "certification",
    badge: "Deep Learning",
    description: "Foundational neural network design, vectorization with NumPy, backpropagation, and multi-layer DNN structures.",
    image: "/Certificates/Certificate_Neural_Network_And_Deep_Learning_SF2UQZ4TUC2E-1.webp",
  },
  {
    id: "aws-cloud-essentials",
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon",
    date: "Oct 2023",
    type: "certification",
    badge: "Cloud AWS",
    description: "Foundational and architecting aspects of AWS networking, IAM, databases, and compute nodes.",
    image: "/Certificates/Certificate_AWS_Cloud 75YMNM6W2KHW-1.webp",
  },
  {
    id: "google-tensorflow",
    title: "Introduction to TensorFlow for AI, ML, and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Oct 2023",
    type: "certification",
    badge: "TensorFlow",
    description: "Structured computer vision and feedforward neural design setups using the TensorFlow 2.x API.",
    image: "/Certificates/Certificate_Tensorflow VHK79L92ZH6D-1.webp",
  },
  {
    id: "ml-production",
    title: "Introduction to Machine Learning in Production",
    issuer: "DeepLearning.AI",
    date: "Sep 2023",
    type: "certification",
    badge: "MLOps",
    description: "Structuring, deploying, monitoring, and debugging deep learning workflows in active production loops.",
    image: "/Certificates/Certificate_Introduction_to_Machine Learning_in_Production_CKD249G59UY8-1.webp",
  },
  {
    id: "scrum-foundation",
    title: "Scrum Foundation Professional Certificate",
    issuer: "CertiProf",
    date: "Jul 2023",
    type: "certification",
    badge: "Agile",
    description: "Validating core knowledge of Scrum framework rules, workflows, artifact boards, and ceremony management.",
    image: "/Certificates/Certificate_Scrum_Foundation-1.webp",
  },
  {
    id: "google-genai",
    title: "Generative AI",
    issuer: "Google",
    date: "Aug 2023",
    type: "certification",
    badge: "Generative AI",
    description: "Large Language Models, attention mechanisms, and stable AI alignment principles.",
    image: "/Certificates/Generative AI Google.webp",
  },
]

const parseDateString = (dateStr: string): number => {
  const parts = dateStr.trim().split(" ")
  if (parts.length === 2) {
    const monthStr = parts[0]
    const year = parseInt(parts[1], 10)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = months.indexOf(monthStr)
    if (month !== -1) {
      return new Date(year, month).getTime()
    }
  }
  return 0
}

const sortByDateRecentFirst = (a: TimelineItem, b: TimelineItem) => {
  return parseDateString(b.date) - parseDateString(a.date)
}

export function Certifications() {
  const isGameDev = useIsGameDev()
  const [activeIndex, setActiveIndex] = useState(0)
  const autoPlayRef = useRef<(() => void) | null>(null)

  // Smart Sorting based on Active Theme Toggle, nested-sorted by Date
  const currentItems = isGameDev
    ? [
        ...items.filter((item) => ["unreal-engine", "ea-swe", "mindstorm-summer", "game-jam-winner", "scrum-foundation"].includes(item.id)).sort(sortByDateRecentFirst),
        ...items.filter((item) => !["unreal-engine", "ea-swe", "mindstorm-summer", "game-jam-winner", "scrum-foundation"].includes(item.id)).sort(sortByDateRecentFirst),
      ]
    : [
        ...items.filter((item) => ["bmw-hackathon", "bremen-hackathon", "ki-hackathon", "data-science-winner", "neural-networks", "google-tensorflow", "ml-production", "google-genai", "folio3-bootcamp"].includes(item.id)).sort(sortByDateRecentFirst),
        ...items.filter((item) => !["bmw-hackathon", "bremen-hackathon", "ki-hackathon", "data-science-winner", "neural-networks", "google-tensorflow", "ml-production", "google-genai", "folio3-bootcamp"].includes(item.id)).sort(sortByDateRecentFirst),
      ]

  // Reset active slide index when switching between modes to prevent array out-of-bounds crashes
  useEffect(() => {
    setActiveIndex(0)
  }, [isGameDev])

  const handleNext = () => {
    setActiveIndex((prev) => (prev === currentItems.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? currentItems.length - 1 : prev - 1))
  }

  // Auto-play cycling effect
  useEffect(() => {
    autoPlayRef.current = handleNext
  })

  useEffect(() => {
    const play = () => {
      if (autoPlayRef.current) autoPlayRef.current()
    }
    const interval = setInterval(play, 6000)
    return () => clearInterval(interval)
  }, [])

  // Sort lists explicitly by date (recent first)
  const awards = currentItems.filter((item) => item.type === "award").sort(sortByDateRecentFirst)
  const certs = currentItems.filter((item) => item.type === "certification").sort(sortByDateRecentFirst)

  const handleItemSelect = (id: string) => {
    const targetIdx = currentItems.findIndex((item) => item.id === id)
    if (targetIdx !== -1) {
      setActiveIndex(targetIdx)
    }
  }

  return (
    <section id="certifications" className="py-20 md:py-32 bg-background relative">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        {/* Heading */}
        <div className="flex items-center gap-4 mb-12">
          <span className="text-primary font-mono text-sm">06.</span>
          <AnimatedHeading className="text-2xl md:text-3xl font-bold text-foreground">
            Honors & Accreditations
          </AnimatedHeading>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </div>

        {/* Centralized Big Carousel */}
        <div className="max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <div className="relative aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/11] w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl group/carousel">
            {/* Slide Background Visual with professional center display */}
            <div className="absolute inset-0 z-0 bg-zinc-950 flex items-center justify-center">
              {/* Blurred Ambient Background Backdrop */}
              <img
                src={currentItems[activeIndex].image}
                alt=""
                className="w-full h-full object-cover opacity-25 blur-xl scale-110 pointer-events-none select-none transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              {/* Sharp, Crisp Main Certificate Image */}
              <img
                src={currentItems[activeIndex].image}
                alt={currentItems[activeIndex].title}
                className="absolute inset-0 w-full h-full object-contain p-2 sm:p-4 md:p-6 z-10 transition-transform duration-500 group-hover/carousel:scale-[1.01] select-none"
                referrerPolicy="no-referrer"
              />
              {/* Soft visual shadows overlay to guarantee caption readability */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-15 pointer-events-none" />
            </div>

            {/* Dynamic Badge Overlays */}
            <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase text-primary bg-primary/15 border border-primary/30 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.25)]">
                {currentItems[activeIndex].badge}
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-medium tracking-wide text-zinc-100 bg-zinc-900/90 backdrop-blur-md rounded-full border border-zinc-850">
                {currentItems[activeIndex].issuer}
              </span>
            </div>

            {/* Dynamic Slide Content */}
            <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 z-20 flex flex-col gap-1 justify-end">
              <span className="text-[10px] uppercase font-mono font-semibold tracking-widest text-primary flex items-center gap-1.5">
                <Calendar className="h-3 w-3 stroke-[2.5]" />
                {currentItems[activeIndex].date}
              </span>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight leading-snug drop-shadow-md">
                {currentItems[activeIndex].title}
              </h4>
              <p className="text-[11px] sm:text-xs md:text-sm text-zinc-250 leading-relaxed font-light mt-0.5 max-w-2xl drop-shadow-sm">
                {currentItems[activeIndex].description}
              </p>
            </div>

            {/* Slide Nav Buttons */}
            <button
              onClick={handlePrev}
              aria-label="Previous reward"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-zinc-950/85 border border-zinc-800 text-zinc-300 hover:text-white hover:border-primary/55 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next reward"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-zinc-950/85 border border-zinc-800 text-zinc-300 hover:text-white hover:border-primary/55 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Dots navigation */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {currentItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activeIndex
                    ? "w-8 bg-primary shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                    : "w-2 bg-zinc-400 dark:bg-zinc-650 hover:bg-zinc-350 dark:hover:bg-zinc-500"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Layout below: Side-by-Side Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Awards Block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-primary flex items-center gap-2.5 pb-2 border-b border-border/60">
              <Award className="h-4 w-4 text-primary" />
              Awards & Accomplishments
            </h3>
            <ul className="space-y-3">
              {awards.map((award) => {
                const isActive = currentItems[activeIndex].id === award.id
                return (
                  <li
                    key={award.id}
                    onClick={() => handleItemSelect(award.id)}
                    className={`group/item flex items-start gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-accent/40 dark:bg-zinc-950/75 border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.03)]"
                        : "bg-transparent border-transparent hover:bg-muted/40 dark:hover:bg-zinc-950/30 hover:border-border/60 dark:hover:border-zinc-900"
                    }`}
                  >
                    <span className="text-primary font-bold text-sm select-none mt-0.5 leading-none transition-transform group-hover/item:translate-x-0.5">
                      ▹
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <h4
                          className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-foreground group-hover/item:text-primary dark:text-zinc-300 dark:group-hover/item:text-zinc-100"
                          }`}
                        >
                          {award.title}
                        </h4>
                        <span
                          className={`text-xs font-mono tracking-wide shrink-0 transition-colors duration-300 ${
                            isActive ? "text-primary font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {award.date}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-zinc-400 mt-1 leading-snug">
                        {award.issuer}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Certifications Block */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold font-mono uppercase tracking-[0.2em] text-primary flex items-center gap-2.5 pb-2 border-b border-border/60">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Professional Certifications
            </h3>
            <ul className="space-y-3">
              {certs.map((cert) => {
                const isActive = currentItems[activeIndex].id === cert.id
                return (
                  <li
                    key={cert.id}
                    onClick={() => handleItemSelect(cert.id)}
                    className={`group/item flex items-start gap-4 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-accent/40 dark:bg-zinc-950/75 border-primary/30 shadow-[0_0_12px_rgba(0,240,255,0.03)]"
                        : "bg-transparent border-transparent hover:bg-muted/40 dark:hover:bg-zinc-950/30 hover:border-border/60 dark:hover:border-zinc-900"
                    }`}
                  >
                    <span className="text-primary font-bold text-sm select-none mt-0.5 leading-none transition-transform group-hover/item:translate-x-0.5">
                      ▹
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 flex-wrap sm:flex-nowrap">
                        <h4
                          className={`text-sm font-bold tracking-tight transition-colors duration-300 ${
                            isActive ? "text-primary" : "text-foreground group-hover/item:text-primary dark:text-zinc-300 dark:group-hover/item:text-zinc-100"
                          }`}
                        >
                          {cert.title}
                        </h4>
                        <span
                          className={`text-xs font-mono tracking-wide shrink-0 transition-colors duration-300 ${
                            isActive ? "text-primary font-semibold" : "text-muted-foreground"
                          }`}
                        >
                          {cert.date}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-zinc-400 mt-1 leading-snug">
                        {cert.issuer}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
