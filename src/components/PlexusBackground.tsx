import { useEffect, useRef } from "react"

export function PlexusBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0

    // Configuration
    const mouse = { x: 0, y: 0, active: false }
    const particles: Particle[] = []
    
    // Scale particle count based on screen size
    const getParticleCount = (w: number) => {
      if (w < 640) return 30 // Mobile
      if (w < 1024) return 60 // Tablet
      return 100 // Desktop
    }

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
      color: string

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        // Random velocity between -0.4 and 0.4
        this.vx = (Math.random() - 0.5) * 0.8
        this.vy = (Math.random() - 0.5) * 0.8
        this.radius = Math.random() * 2 + 1
        // Cool subtle cyan / violet / teal glow colors
        const colors = [
          "rgba(6, 182, 212, 0.6)",   // cyan-500
          "rgba(59, 130, 246, 0.5)",   // blue-500
          "rgba(14, 165, 233, 0.55)",  // sky-500
          "rgba(139, 92, 246, 0.45)",  // violet-500
        ]
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy

        // Bounce off bounds with small offset to avoid stuck particles
        if (this.x < 0) {
          this.x = 0
          this.vx *= -1
        } else if (this.x > width) {
          this.x = width
          this.vx *= -1
        }

        if (this.y < 0) {
          this.y = 0
          this.vy *= -1
        } else if (this.y > height) {
          this.y = height
          this.vy *= -1
        }

        // Slight force toward mouse if close
        if (mouse.active) {
          const dx = mouse.x - this.x
          const dy = mouse.y - this.y
          const dist = Math.hypot(dx, dy)
          if (dist < 180) {
            const force = (180 - dist) / 10000
            this.vx += dx * force
            this.vy += dy * force
            
            // Speed limiter
            const speed_limit = 1.2
            const current_speed = Math.hypot(this.vx, this.vy)
            if (current_speed > speed_limit) {
              this.vx = (this.vx / current_speed) * speed_limit
              this.vy = (this.vy / current_speed) * speed_limit
            }
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const initParticles = () => {
      particles.length = 0
      const count = getParticleCount(width)
      for (let i = 0; i < count; i++) {
        particles.push(new Particle())
      }
    }

    const handleResize = () => {
      if (!canvas || !container) return
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height

      // Update canvas resolution considering device-pixel-ratio for crisp rendering
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      initParticles()
    }

    // Set initial size
    handleResize()

    // Resize observer for container to be accurate on resize
    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(container)

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw lines first so particles sit on top nicely
      const connectionDist = 120
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i]
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.hypot(dx, dy)

          if (dist < connectionDist) {
            // Stronger opacity the closer they are
            const alpha = (1 - dist / connectionDist) * 0.16
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw lines between mouse and close particles
      if (mouse.active) {
        const mouseConnectionDist = 180
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i]
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.hypot(dx, dy)

          if (dist < mouseConnectionDist) {
            const alpha = (1 - dist / mouseConnectionDist) * 0.25
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            // Cyan colored lines to mouse
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`
            ctx.lineWidth = 1.0
            ctx.stroke()
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Event handlers for interactivity
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    // Bind to parent element as container has pointer-events-none
    const target = container.parentElement || container
    target.addEventListener("mousemove", handleMouseMove)
    target.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      target.removeEventListener("mousemove", handleMouseMove)
      target.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-5 overflow-hidden select-none pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    >
      <canvas
        ref={canvasRef}
        className="block opacity-70 transition-opacity duration-1000"
      />
    </div>
  )
}
