import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme")
      const initialTheme = (stored === "light" || stored === "gamedev") ? "gamedev" : "ai"
      const root = window.document.documentElement
      if (initialTheme === "gamedev") {
        root.classList.add("gamedev")
        root.classList.remove("ai")
      } else {
        root.classList.add("ai")
        root.classList.remove("gamedev")
      }
      return initialTheme
    }
    return "ai"
  })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    if (theme === "gamedev") {
      root.classList.add("gamedev")
      root.classList.remove("ai")
    } else {
      root.classList.add("ai")
      root.classList.remove("gamedev")
    }
    localStorage.setItem("theme", theme)
    // Dispatch a custom theme change event to keep other components responsive in real-time
    window.dispatchEvent(new CustomEvent("themechange", { detail: { theme } }))
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "ai" ? "gamedev" : "ai"))
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a
            href="/"
            className="flex items-center font-medium tracking-tight text-lg text-foreground transition-all group"
          >
            <span className="font-semibold tracking-tight text-xl">
              Mohsin<span className="text-primary">.</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {(theme === "gamedev"
              ? [
                  { href: "#about", label: "About" },
                  { href: "#portfolio", label: "Portfolio" },
                  { href: "#experience", label: "Experience" },
                  { href: "#projects", label: "Projects" },
                  { href: "#skills", label: "Skills" },
                  { href: "#education", label: "Education" },
                  { href: "#contact", label: "Contact" },
                ]
              : navLinks
            ).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 border-l border-border pl-4 lg:pl-6">
              <a
                href={theme === "gamedev" ? "/CV/Mohsin_GameDev_CV.pdf" : "/CV/Mohsin_ML_CV.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold uppercase tracking-widest bg-foreground text-background shadow hover:bg-primary hover:text-primary-foreground h-9 px-4 rounded-sm text-xs transition-all duration-300"
              >
                Resume
              </a>
              <div className="relative inline-flex bg-muted/60 backdrop-blur-sm rounded-full p-1 border border-border/80 shadow-inner">
                <button
                  onClick={() => setTheme("ai")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all duration-200 font-mono select-none uppercase cursor-pointer ${
                    theme === "ai"
                      ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,240,255,0.25)] gamedev:shadow-[0_2px_8px_rgba(57,255,20,0.25)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  AI
                </button>
                <button
                  onClick={() => setTheme("gamedev")}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest transition-all duration-200 font-mono select-none uppercase cursor-pointer ${
                    theme === "gamedev"
                      ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,240,255,0.25)] gamedev:shadow-[0_2px_8px_rgba(57,255,20,0.25)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  GAME DEV
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-b border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {(theme === "gamedev"
              ? [
                  { href: "#about", label: "About" },
                  { href: "#portfolio", label: "Portfolio" },
                  { href: "#experience", label: "Experience" },
                  { href: "#projects", label: "Projects" },
                  { href: "#skills", label: "Skills" },
                  { href: "#education", label: "Education" },
                  { href: "#contact", label: "Contact" },
                ]
              : navLinks
            ).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2 border-b border-border"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center gap-4 mt-2">
              <a
                href={theme === "gamedev" ? "/CV/Mohsin_GameDev_CV.pdf" : "/CV/Mohsin_ML_CV.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center font-bold uppercase tracking-widest bg-foreground text-background shadow hover:bg-primary hover:text-primary-foreground h-10 px-4 rounded-sm text-xs w-fit transition-all duration-300"
              >
                Resume
              </a>
              <div className="relative inline-flex bg-muted/60 backdrop-blur-sm rounded-full p-1 border border-border/80 shadow-inner">
                <button
                  onClick={() => setTheme("ai")}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-200 font-mono select-none uppercase cursor-pointer ${
                    theme === "ai"
                      ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,240,255,0.25)] gamedev:shadow-[0_2px_8px_rgba(57,255,20,0.25)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  AI
                </button>
                <button
                  onClick={() => setTheme("gamedev")}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest transition-all duration-200 font-mono select-none uppercase cursor-pointer ${
                    theme === "gamedev"
                      ? "bg-primary text-primary-foreground shadow-[0_2px_8px_rgba(0,240,255,0.25)] gamedev:shadow-[0_2px_8px_rgba(57,255,20,0.25)]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  GAME DEV
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
