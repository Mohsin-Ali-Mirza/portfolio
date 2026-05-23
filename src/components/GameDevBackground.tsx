import { useEffect, useRef } from "react"

export function GameDevBackground() {
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

    // Interactive states
    const mouse = { x: 0, y: 0, active: false, lastX: 0, lastY: 0 }
    const shapes: Shape[] = []
    const particles: Spark[] = []
    const lasers: Laser[] = []
    const shockwaves: Shockwave[] = []

    interface Shape {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number
      color: string
      type: "triangle" | "square" | "circle" | "cross"

      update: () => void
      draw: () => void
    }

    interface Spark {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      alpha: number
      decay: number
      color: string
    }

    interface Laser {
      x: number
      y: number
      vx: number
      vy: number
      length: number
      color: string
      alpha: number
    }

    interface Shockwave {
      x: number
      y: number
      radius: number
      maxRadius: number
      alpha: number
      speed: number
    }

    // Colors
    const colors = {
      cyan: "rgba(6, 182, 212, 0.7)",    // Neon cyan
      magenta: "rgba(236, 72, 153, 0.7)", // Neon pink/magenta
      green: "rgba(34, 197, 94, 0.7)",    // Neon green
      yellow: "rgba(234, 179, 8, 0.7)",   // Neon yellow
      purple: "rgba(168, 85, 247, 0.7)",  // Neon purple
    }

    const colorList = Object.values(colors)

    class GameObject implements Shape {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      rotation: number
      rotationSpeed: number
      color: string
      type: "triangle" | "square" | "circle" | "cross"

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 1.6
        this.vy = (Math.random() - 0.5) * 1.6
        this.size = Math.random() * 12 + 8
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.03
        this.color = colorList[Math.floor(Math.random() * colorList.length)]
        
        const types: ("triangle" | "square" | "circle" | "cross")[] = [
          "triangle",
          "square",
          "circle",
          "cross",
        ]
        this.type = types[Math.floor(Math.random() * types.length)]
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.rotation += this.rotationSpeed

        // Elastic bounds collision
        const margin = this.size * 2
        if (this.x < margin) {
          this.x = margin
          this.vx *= -1
        } else if (this.x > width - margin) {
          this.x = width - margin
          this.vx *= -1
        }

        if (this.y < margin) {
          this.y = margin
          this.vy *= -1
        } else if (this.y > height - margin) {
          this.y = height - margin
          this.vy *= -1
        }

        // Keep velocity and apply mild speed stabilization
        const speed = Math.hypot(this.vx, this.vy)
        const targetSpeed = 1.2
        if (speed > 5) {
          // strong drag
          this.vx *= 0.95
          this.vy *= 0.95
        } else if (speed < 0.3) {
          // slight push
          this.vx = (Math.random() - 0.5) * 1.5
          this.vy = (Math.random() - 0.5) * 1.5
        } else {
          // very gradual easing to target speed range
          this.vx = this.vx * 0.995 + (this.vx / speed) * targetSpeed * 0.005
          this.vy = this.vy * 0.995 + (this.vy / speed) * targetSpeed * 0.005
        }

        // Interactive: repelled by mouse if active
        if (mouse.active) {
          const dx = this.x - mouse.x
          const dy = this.y - mouse.y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            const force = (120 - dist) / 100
            this.vx += (dx / dist) * force * 0.5
            this.vy += (dy / dist) * force * 0.5
          }
        }
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1.5
        ctx.shadowBlur = 8
        ctx.shadowColor = this.color

        ctx.beginPath()
        if (this.type === "triangle") {
          ctx.moveTo(0, -this.size)
          ctx.lineTo(this.size * 0.8, this.size * 0.6)
          ctx.lineTo(-this.size * 0.8, this.size * 0.6)
          ctx.closePath()
          ctx.stroke()
        } else if (this.type === "square") {
          ctx.strokeRect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else if (this.type === "circle") {
          ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2)
          ctx.stroke()
        } else if (this.type === "cross") {
          ctx.moveTo(-this.size / 2, 0)
          ctx.lineTo(this.size / 2, 0)
          ctx.moveTo(0, -this.size / 2)
          ctx.lineTo(0, this.size / 2)
          ctx.stroke()
        }

        ctx.restore()
      }
    }

    // Mini retro ship object that steers towards the mouse dynamically
    const playerShip = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      rotation: 0,
      size: 15,
      active: false,

      initialize(startW: number, startH: number) {
        this.x = startW / 2
        this.y = startH / 2
        this.targetX = startW / 2
        this.targetY = startH / 2
      },

      update() {
        if (mouse.active) {
          this.targetX = mouse.x
          this.targetY = mouse.y
          this.active = true
        } else {
          this.active = false
        }

        if (!this.active) return

        // Smooth follow with inertia (spring)
        const dx = this.targetX - this.x
        const dy = this.targetY - this.y
        const dist = Math.hypot(dx, dy)

        if (dist > 5) {
          // Update rotation to face target
          const targetAngle = Math.atan2(dy, dx)
          // Smooth rotation interpolation
          let angleDiff = targetAngle - this.rotation
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2
          this.rotation += angleDiff * 0.15

          const speed = Math.min(dist * 0.08, 6)
          this.vx = Math.cos(this.rotation) * speed
          this.vy = Math.sin(this.rotation) * speed

          this.x += this.vx
          this.y += this.vy

          // Spawn engine trail particles sometimes
          if (Math.random() < 0.4) {
            const rx = this.x - Math.cos(this.rotation) * this.size
            const ry = this.y - Math.sin(this.rotation) * this.size
            const spread = 0.3
            const pAngle = this.rotation + Math.PI + (Math.random() - 0.5) * spread
            const pSpeed = Math.random() * 2 + 1
            particles.push({
              x: rx,
              y: ry,
              vx: Math.cos(pAngle) * pSpeed,
              vy: Math.sin(pAngle) * pSpeed,
              size: Math.random() * 2 + 1,
              alpha: 1.0,
              decay: 0.04,
              color: colors.magenta,
            })
          }
        }
      },

      draw() {
        if (!this.active || !ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.strokeStyle = colors.cyan
        ctx.lineWidth = 2
        ctx.shadowBlur = 12
        ctx.shadowColor = colors.cyan

        // Draw elegant retro wireframe fighter
        ctx.beginPath()
        ctx.moveTo(this.size, 0) // nose
        ctx.lineTo(-this.size, -this.size * 0.7) // back-left tail
        ctx.lineTo(-this.size * 0.4, 0) // wing indent
        ctx.lineTo(-this.size, this.size * 0.7) // back-right tail
        ctx.closePath()
        ctx.stroke()

        // Core thruster light
        ctx.beginPath()
        ctx.arc(-this.size * 0.5, 0, 3, 0, Math.PI * 2)
        ctx.fillStyle = colors.magenta
        ctx.fill()

        ctx.restore()
      }
    }

    const initShapes = () => {
      shapes.length = 0
      const count = width < 640 ? 12 : width < 1024 ? 22 : 35
      for (let i = 0; i < count; i++) {
        shapes.push(new GameObject())
      }
    }

    const triggerExplosion = (x: number, y: number, color: string) => {
      // Spawn 15-20 particles
      const count = Math.floor(Math.random() * 10) + 15
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 3.5 + 1.5
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1,
          alpha: 1.0,
          decay: Math.random() * 0.02 + 0.015,
          color,
        })
      }
    }

    const handleResize = () => {
      if (!canvas || !container) return
      const rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height

      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      initShapes()
      playerShip.initialize(width, height)
    }

    handleResize()

    const resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(container)

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Update & Draw Shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i]
        sw.radius += sw.speed
        sw.alpha -= 0.025

        if (sw.alpha <= 0) {
          shockwaves.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(6, 182, 212, ${sw.alpha * 0.4})`
        ctx.lineWidth = 3
        ctx.shadowBlur = 10
        ctx.shadowColor = colors.cyan
        ctx.stroke()
        ctx.restore()
      }

      // 2. Update & Draw Lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const laser = lasers[i]
        laser.x += laser.vx
        laser.y += laser.vy
        laser.alpha -= 0.03

        if (laser.alpha <= 0 || laser.x < 0 || laser.x > width || laser.y < 0 || laser.y > height) {
          lasers.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(laser.x, laser.y)
        ctx.lineTo(laser.x - (laser.vx / 5) * laser.length, laser.y - (laser.vy / 5) * laser.length)
        ctx.strokeStyle = laser.color
        ctx.lineWidth = 2.5
        ctx.shadowBlur = 10
        ctx.shadowColor = laser.color
        ctx.stroke()
        ctx.restore()

        // Check laser collision with shapes
        for (let sIdx = shapes.length - 1; sIdx >= 0; sIdx--) {
          const shape = shapes[sIdx]
          const dist = Math.hypot(shape.x - laser.x, shape.y - laser.y)
          if (dist < shape.size + 10) {
            // Explode shape partially & repel it violently
            triggerExplosion(shape.x, shape.y, shape.color)
            shape.vx += laser.vx * 0.4
            shape.vy += laser.vy * 0.4
            // Remove laser
            lasers.splice(i, 1)
            break
          }
        }
      }

      // 3. Update & Draw shapes
      shapes.forEach((shape) => {
        shape.update()
        shape.draw()
      })

      // 4. Update & Draw Player Ship
      playerShip.update()
      playerShip.draw()

      // 5. Update & Draw Sparks/Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 6. Draw subtle connection grid lines sometimes
      // To keep a light "grid coordinate system / digital mesh" feel
      ctx.save()
      ctx.strokeStyle = "rgba(63, 63, 70, 0.09)"
      ctx.lineWidth = 0.5
      const gridSize = 64
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }
      ctx.restore()

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Interactive event listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    // Fire laser and shockwave on Mouse Click!
    const handleMouseDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const clickY = e.clientY - rect.top

      // 1. Fire lasers towards outer directions if player ship is active
      if (playerShip.active) {
        // Fire three retro projectile rays in a spread pattern facing mouse movement / ship direction!
        const angles = [playerShip.rotation, playerShip.rotation - 0.2, playerShip.rotation + 0.2]
        angles.forEach((angle) => {
          lasers.push({
            x: playerShip.x + Math.cos(playerShip.rotation) * playerShip.size,
            y: playerShip.y + Math.sin(playerShip.rotation) * playerShip.size,
            vx: Math.cos(angle) * 12,
            vy: Math.sin(angle) * 12,
            length: 8,
            color: colors.cyan,
            alpha: 1.0,
          })
        })
      }

      // 2. Add Shockwave at click location
      shockwaves.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 180,
        alpha: 1.0,
        speed: 4,
      })

      // 3. Explode sparks at click location
      triggerExplosion(clickX, clickY, colorList[Math.floor(Math.random() * colorList.length)])

      // 4. Force push all shapes away from click location
      shapes.forEach((shape) => {
        const dx = shape.x - clickX
        const dy = shape.y - clickY
        const dist = Math.hypot(dx, dy)
        if (dist < 220) {
          const pushForce = ((220 - dist) / 220) * 8
          shape.vx += (dx / dist) * pushForce
          shape.vy += (dy / dist) * pushForce
        }
      })
    }

    // Capture events on parent/container
    const target = container.parentElement || container
    target.addEventListener("mousemove", handleMouseMove)
    target.addEventListener("mouseleave", handleMouseLeave)
    target.addEventListener("mousedown", handleMouseDown)

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      target.removeEventListener("mousemove", handleMouseMove)
      target.removeEventListener("mouseleave", handleMouseLeave)
      target.removeEventListener("mousedown", handleMouseDown)
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
