import { useEffect, useRef, useState, useCallback } from "react"
import { Play, Pause, RotateCcw, Gamepad2, Trophy, Sparkles, Volume2, VolumeX } from "lucide-react"
import { AnimatedHeading } from "./AnimatedHeading"
import { Button } from "./ui/button"

type GameMode = "pong" | "breakout" | "cosmo"

export function PongGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameMode, setGameMode] = useState<GameMode>("pong")
  const [isPlaying, setIsPlaying] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [score, setScore] = useState({ player: 0, ai: 0, breakoutHighScore: 0, cosmoHighScore: 0 })
  const [currentBreakoutScore, setCurrentBreakoutScore] = useState(0)
  const [currentCosmoScore, setCurrentCosmoScore] = useState(0)
  const [gameStatus, setGameStatus] = useState<"ready" | "playing" | "gameover" | "victory">("ready")

  // State reference to pass values into requestAnimationFrame loop seamlessly without re-binding variables
  const gameRef = useRef({
    // General Canvas settings & interactions
    width: 600,
    height: 300,
    mouse: { x: 300, y: 150, active: false },
    particles: [] as any[],

    // Game 1: Pong
    pong: {
      ball: { x: 300, y: 150, dx: 4, dy: 3, radius: 7 },
      playerPaddle: { x: 20, y: 110, width: 10, height: 80, speed: 6 },
      aiPaddle: { x: 570, y: 110, width: 10, height: 80, speed: 4 },
      keys: { up: false, down: false },
    },

    // Game 2: Breakout
    breakout: {
      ball: { x: 300, y: 200, dx: 3, dy: -4, radius: 7 },
      paddle: { x: 260, y: 280, width: 85, height: 10, speed: 6 },
      bricks: [] as any[],
      keys: { left: false, right: false },
    },

    // Game 3: Cosmo Dodger & Shooter
    cosmo: {
      ship: { x: 300, y: 270, width: 22, height: 18, speed: 7 },
      asteroids: [] as any[],
      gems: [] as any[],
      lasers: [] as any[],
      keys: { left: false, right: false, shoot: false },
      spawnTimer: 0,
      shootCooldown: 0,
    }
  })

  // Retro Sound Generator using browser native Web Audio API
  const playSoundSynth = useCallback((type: "bounce" | "brick" | "laser" | "powerup" | "explosion" | "fail") => {
    if (!soundEnabled) return
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      if (!AudioContextClass) return
      const ctx = new AudioContextClass()
      
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      
      osc.connect(gain)
      gain.connect(ctx.destination)
      
      const now = ctx.currentTime

      if (type === "bounce") {
        osc.type = "sine"
        osc.frequency.setValueAtTime(320, now)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)
        osc.start(now)
        osc.stop(now + 0.08)
      } else if (type === "brick") {
        osc.type = "triangle"
        osc.frequency.setValueAtTime(520, now)
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.12)
        gain.gain.setValueAtTime(0.08, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12)
        osc.start(now)
        osc.stop(now + 0.12)
      } else if (type === "laser") {
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(880, now)
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.1)
        gain.gain.setValueAtTime(0.04, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)
        osc.start(now)
        osc.stop(now + 0.1)
      } else if (type === "powerup") {
        osc.type = "sine"
        osc.frequency.setValueAtTime(440, now)
        osc.frequency.setValueAtTime(660, now + 0.06)
        osc.frequency.setValueAtTime(880, now + 0.12)
        gain.gain.setValueAtTime(0.06, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)
        osc.start(now)
        osc.stop(now + 0.25)
      } else if (type === "explosion") {
        // Noise generation simulation with deep sawtooth sweep
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(220, now)
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.2)
        gain.gain.setValueAtTime(0.09, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2)
        osc.start(now)
        osc.stop(now + 0.2)
      } else if (type === "fail") {
        osc.type = "sawtooth"
        osc.frequency.setValueAtTime(180, now)
        osc.frequency.linearRampToValueAtTime(60, now + 0.35)
        gain.gain.setValueAtTime(0.1, now)
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)
        osc.start(now)
        osc.stop(now + 0.35)
      }
    } catch (e) {
      // Audio bounds guarded
    }
  }, [soundEnabled])

  // Spark Generator Helper
  const createSparks = (x: number, y: number, color: string, count: number = 8) => {
    const particles = gameRef.current.particles
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 1,
        alpha: 1.0,
        decay: Math.random() * 0.03 + 0.02,
        color,
      })
    }
  }

  // Breakout: Reset Bricks Grid
  const resetBreakoutBricks = useCallback(() => {
    const breakoutRef = gameRef.current.breakout
    const rows = 3
    const cols = 8
    const width = 60
    const height = 15
    const gap = 8
    const topOffset = 40
    const leftOffset = (600 - (cols * (width + gap) - gap)) / 2

    const bricks = []
    const colors = [
      "rgba(6, 182, 212, 0.95)",  // Cyber Cyan
      "rgba(236, 72, 153, 0.95)", // Electric Pink
      "rgba(168, 85, 247, 0.95)"  // Neon Violet
    ]

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        bricks.push({
          x: leftOffset + c * (width + gap),
          y: topOffset + r * (height + gap),
          width,
          height,
          color: colors[r % colors.length],
          status: 1 // 1 = solid, 0 = broken
        })
      }
    }
    breakoutRef.bricks = bricks
    breakoutRef.ball.x = 300
    breakoutRef.ball.y = 200
    breakoutRef.ball.dx = (Math.random() - 0.5) * 4 || 2
    breakoutRef.ball.dy = -4
    breakoutRef.paddle.x = 260
    setCurrentBreakoutScore(0)
  }, [])

  // Cosmo: Reset ship, asteroids, gems
  const resetCosmoMode = useCallback(() => {
    const cosmo = gameRef.current.cosmo
    cosmo.ship.x = 300
    cosmo.ship.y = 270
    cosmo.asteroids = []
    cosmo.gems = []
    cosmo.lasers = []
    cosmo.spawnTimer = 0
    cosmo.shootCooldown = 0
    setCurrentCosmoScore(0)
  }, [])

  // Dual Purpose Reset
  const resetGame = useCallback(() => {
    const state = gameRef.current
    if (gameMode === "pong") {
      setScore(prev => ({ ...prev, player: 0, ai: 0 }))
      state.pong.ball.x = 300
      state.pong.ball.y = 150
      state.pong.ball.dx = 4
      state.pong.ball.dy = 2
      state.pong.playerPaddle.y = 110
      state.pong.aiPaddle.y = 110
      setGameStatus("ready")
    } else if (gameMode === "breakout") {
      resetBreakoutBricks()
      setGameStatus("ready")
    } else if (gameMode === "cosmo") {
      resetCosmoMode()
      setGameStatus("ready")
    }
    setIsPlaying(false)
  }, [gameMode, resetBreakoutBricks, resetCosmoMode])

  // Track Mode Changes
  useEffect(() => {
    resetGame()
  }, [gameMode, resetGame])

  // Game Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    // Keyboard Key listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = gameRef.current
      if (e.key === "ArrowUp" || e.key === "w") keys.pong.keys.up = true
      if (e.key === "ArrowDown" || e.key === "s") keys.pong.keys.down = true
      
      if (e.key === "ArrowLeft" || e.key === "a") {
        keys.breakout.keys.left = true
        keys.cosmo.keys.left = true
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        keys.breakout.keys.right = true
        keys.cosmo.keys.right = true
      }
      if (e.key === " " || e.key === "f") {
        keys.cosmo.keys.shoot = true
        e.preventDefault() // prevent page index bump scrolling
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      const keys = gameRef.current
      if (e.key === "ArrowUp" || e.key === "w") keys.pong.keys.up = false
      if (e.key === "ArrowDown" || e.key === "s") keys.pong.keys.down = false
      
      if (e.key === "ArrowLeft" || e.key === "a") {
        keys.breakout.keys.left = false
        keys.cosmo.keys.left = false
      }
      if (e.key === "ArrowRight" || e.key === "d") {
        keys.breakout.keys.right = false
        keys.cosmo.keys.right = false
      }
      if (e.key === " " || e.key === "f") {
        keys.cosmo.keys.shoot = false
      }
    }

    // Touch / Pointer tracking
    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      // Map click/touch coordinates relative to local original canvas coordinate space (600x300)
      const mouseX = ((e.clientX - rect.left) / rect.width) * 600
      const mouseY = ((e.clientY - rect.top) / rect.height) * 300
      
      const mouse = gameRef.current.mouse
      mouse.x = mouseX
      mouse.y = mouseY
      mouse.active = true

      // Interactively drag sliders/paddles directly under cursor/finger!
      if (gameMode === "pong") {
        // Player paddle follows vertical Y coordinate directly for maximum ease of touch on phones
        const pong = gameRef.current.pong
        pong.playerPaddle.y = Math.max(0, Math.min(220, mouseY - 40))
      } else if (gameMode === "breakout") {
        // Paddle follows horizontal X coordinate directly
        const breakout = gameRef.current.breakout
        breakout.paddle.x = Math.max(0, Math.min(600 - breakout.paddle.width, mouseX - breakout.paddle.width / 2))
      } else if (gameMode === "cosmo") {
        // Ship follows horizontal X coordinate directly
        const cosmo = gameRef.current.cosmo
        cosmo.ship.x = Math.max(10, Math.min(590, mouseX))
      }
    }

    const handlePointerUp = () => {
      gameRef.current.mouse.active = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerdown", handlePointerMove)
    canvas.addEventListener("pointerup", handlePointerUp)

    // Game Core Engine Logic
    const updateGame = () => {
      const state = gameRef.current

      // Particle update
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= p.decay
        if (p.alpha <= 0) {
          state.particles.splice(i, 1)
        }
      }

      // Mode Handler
      if (gameMode === "pong") {
        const { ball, playerPaddle, aiPaddle, keys } = state.pong

        // Move Player via Keyboard if no pointer hover takes place
        if (!state.mouse.active) {
          if (keys.up && playerPaddle.y > 0) playerPaddle.y -= playerPaddle.speed
          if (keys.down && playerPaddle.y < 300 - playerPaddle.height) playerPaddle.y += playerPaddle.speed
        }

        // AI automated response
        const aiCenter = aiPaddle.y + aiPaddle.height / 2
        const targetPaddleY = ball.y
        if (aiCenter < targetPaddleY - 15) {
          aiPaddle.y += aiPaddle.speed
        } else if (aiCenter > targetPaddleY + 15) {
          aiPaddle.y -= aiPaddle.speed
        }
        aiPaddle.y = Math.max(0, Math.min(300 - aiPaddle.height, aiPaddle.y))

        // Ball Mechanics
        ball.x += ball.dx
        ball.y += ball.dy

        // Bounce ceiling & floor
        if (ball.y - ball.radius <= 0 || ball.y + ball.radius >= 300) {
          ball.dy = -ball.dy
          playSoundSynth("bounce")
          createSparks(ball.x, ball.y, "#00f0ff", 3)
        }

        // Left Player paddle collision
        if (
          ball.x - ball.radius <= playerPaddle.x + playerPaddle.width &&
          ball.x + ball.radius >= playerPaddle.x &&
          ball.y >= playerPaddle.y &&
          ball.y <= playerPaddle.y + playerPaddle.height
        ) {
          ball.dx = Math.abs(ball.dx) * 1.05 // boost velocity over time
          const normalizeDelta = (ball.y - playerPaddle.y) / playerPaddle.height
          ball.dy = (normalizeDelta - 0.5) * 7
          playSoundSynth("bounce")
          createSparks(ball.x, ball.y, "#00f0ff", 6)
        }

        // Right AI paddle collision
        if (
          ball.x + ball.radius >= aiPaddle.x &&
          ball.x - ball.radius <= aiPaddle.x + aiPaddle.width &&
          ball.y >= aiPaddle.y &&
          ball.y <= aiPaddle.y + aiPaddle.height
        ) {
          ball.dx = -Math.abs(ball.dx) * 1.05
          const normalizeDelta = (ball.y - aiPaddle.y) / aiPaddle.height
          ball.dy = (normalizeDelta - 0.5) * 7
          playSoundSynth("bounce")
          createSparks(ball.x, ball.y, "#ffffff", 6)
        }

        // Pong score boundaries
        if (ball.x < 0) {
          setScore(prev => ({ ...prev, ai: prev.ai + 1 }))
          playSoundSynth("fail")
          // resetting ball
          ball.x = 300
          ball.y = 150
          ball.dx = 4
          ball.dy = (Math.random() - 0.5) * 4
        }
        if (ball.x > 600) {
          setScore(prev => ({ ...prev, player: prev.player + 1 }))
          playSoundSynth("powerup")
          createSparks(580, ball.y, "#00f0ff", 15)
          ball.x = 300
          ball.y = 150
          ball.dx = -4
          ball.dy = (Math.random() - 0.5) * 4
        }

      } else if (gameMode === "breakout") {
        const { ball, paddle, bricks, keys } = state.breakout

        // Keyboard navigation override
        if (!state.mouse.active) {
          if (keys.left && paddle.x > 0) paddle.x -= paddle.speed
          if (keys.right && paddle.x < 600 - paddle.width) paddle.x += paddle.speed
        }

        ball.x += ball.dx
        ball.y += ball.dy

        // Left/Right walls bounce
        if (ball.x - ball.radius <= 0 || ball.x + ball.radius >= 600) {
          ball.dx = -ball.dx
          playSoundSynth("bounce")
          createSparks(ball.x, ball.y, "#ffffff", 2)
        }
        // Ceiling bounce
        if (ball.y - ball.radius <= 0) {
          ball.dy = -ball.dy
          playSoundSynth("bounce")
          createSparks(ball.x, ball.y, "#ffffff", 2)
        }

        // Paddle collision
        if (
          ball.y + ball.radius >= paddle.y &&
          ball.y - ball.radius <= paddle.y + paddle.height &&
          ball.x >= paddle.x &&
          ball.x <= paddle.x + paddle.width &&
          ball.dy > 0
        ) {
          ball.dy = -Math.abs(ball.dy)
          const offsetRatio = (ball.x - paddle.x) / paddle.width
          ball.dx = (offsetRatio - 0.5) * 8
          playSoundSynth("bounce")
          createSparks(ball.x, ball.y, "#00f0ff", 5)
        }

        // Bricks Collision detection
        let activeBricks = 0
        bricks.forEach((brick) => {
          if (brick.status === 0) return
          activeBricks++

          // Bounding box bounce check
          if (
            ball.x + ball.radius >= brick.x &&
            ball.x - ball.radius <= brick.x + brick.width &&
            ball.y + ball.radius >= brick.y &&
            ball.y - ball.radius <= brick.y + brick.height
          ) {
            brick.status = 0
            ball.dy = -ball.dy
            playSoundSynth("brick")
            createSparks(brick.x + brick.width / 2, brick.y + brick.height / 2, brick.color, 12)
            
            // Increment score
            setCurrentBreakoutScore((prev) => {
              const next = prev + 100
              setScore((s) => ({
                ...s,
                breakoutHighScore: Math.max(s.breakoutHighScore, next)
              }))
              return next
            })
          }
        })

        // Defeat condition
        if (ball.y > 300) {
          playSoundSynth("fail")
          setIsPlaying(false)
          setGameStatus("gameover")
        }

        // Victory condition
        if (activeBricks === 0 && bricks.length > 0) {
          playSoundSynth("powerup")
          setIsPlaying(false)
          setGameStatus("victory")
        }

      } else if (gameMode === "cosmo") {
        const { ship, asteroids, gems, lasers, keys } = state.cosmo

        // Move keyboard ship override
        if (!state.mouse.active) {
          if (keys.left && ship.x > 15) ship.x -= ship.speed
          if (keys.right && ship.x < 585) ship.x += ship.speed
        }

        // Spawn timer asteroid meshes
        state.cosmo.spawnTimer++
        if (state.cosmo.spawnTimer > 45) {
          state.cosmo.spawnTimer = 0
          
          // Speed scale as game advances
          const speedFactor = 1.6 + Math.random() * 2

          // Spawn asteroid
          if (Math.random() < 0.75) {
            asteroids.push({
              x: Math.random() * 560 + 20,
              y: -20,
              dy: speedFactor,
              size: Math.random() * 15 + 10,
              rotation: Math.random() * Math.PI,
              rotationSpeed: (Math.random() - 0.5) * 0.05
            })
          }

          // Spawn Gem points
          if (Math.random() < 0.45) {
            gems.push({
              x: Math.random() * 560 + 20,
              y: -20,
              dy: 2.0,
              size: 8,
              pulse: 0
            })
          }
        }

        // Auto Fire or Manual keys fire laser
        state.cosmo.shootCooldown++
        const shouldShoot = keys.shoot || (state.mouse.active && Math.random() < 0.12)
        if (shouldShoot && state.cosmo.shootCooldown > 15) {
          state.cosmo.shootCooldown = 0
          lasers.push({
            x: ship.x,
            y: ship.y - 12,
            dy: -6
          })
          playSoundSynth("laser")
        }

        // Update Lasers
        for (let l = lasers.length - 1; l >= 0; l--) {
          const laser = lasers[l]
          laser.y += laser.dy
          
          if (laser.y < 0) {
            lasers.splice(l, 1)
            continue
          }

          // Check hit against asteroids
          let hit = false
          for (let a = asteroids.length - 1; a >= 0; a--) {
            const astr = asteroids[a]
            const dist = Math.hypot(astr.x - laser.x, astr.y - laser.y)
            if (dist < astr.size + 6) {
              playSoundSynth("explosion")
              createSparks(astr.x, astr.y, "#ec4899", 14)
              asteroids.splice(a, 1)
              lasers.splice(l, 1)
              hit = true
              
              // Points for blasting asteroids
              setCurrentCosmoScore((prev) => {
                const next = prev + 150
                setScore((s) => ({
                  ...s,
                  cosmoHighScore: Math.max(s.cosmoHighScore, next)
                }))
                return next
              })
              break
            }
          }
        }

        // Update Asteroid position and collide with Player ship mesh
        for (let a = asteroids.length - 1; a >= 0; a--) {
          const astr = asteroids[a]
          astr.y += astr.dy
          astr.rotation += astr.rotationSpeed

          if (astr.y > 320) {
            asteroids.splice(a, 1)
            continue
          }

          // Ship crash vector
          const distanceToShip = Math.hypot(astr.x - ship.x, astr.y - ship.y)
          if (distanceToShip < astr.size + 10) {
            playSoundSynth("fail")
            createSparks(ship.x, ship.y, "#00f0ff", 22)
            setIsPlaying(false)
            setGameStatus("gameover")
          }
        }

        // Update Gems collectables
        for (let g = gems.length - 1; g >= 0; g--) {
          const gem = gems[g]
          gem.y += gem.dy
          gem.pulse += 0.1

          if (gem.y > 320) {
            gems.splice(g, 1)
            continue
          }

          // Collection trigger
          const distanceToShip = Math.hypot(gem.x - ship.x, gem.y - ship.y)
          if (distanceToShip < gem.size + 15) {
            playSoundSynth("powerup")
            createSparks(gem.x, gem.y, "#22c55e", 10)
            gems.splice(g, 1)

            // Increment Scores
            setCurrentCosmoScore((prev) => {
              const next = prev + 300
              setScore((s) => ({
                ...s,
                cosmoHighScore: Math.max(s.cosmoHighScore, next)
              }))
              return next
            })
          }
        }
      }
    }

    // Canvas Graphics Painter
    const drawGame = () => {
      ctx.fillStyle = "#09090b"
      ctx.fillRect(0, 0, 600, 300)

      // Draw Grid mesh vectors background
      ctx.strokeStyle = "rgba(63, 63, 70, 0.12)"
      ctx.lineWidth = 0.5
      const gridSize = 30
      for (let x = 0; x < 600; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, 300)
        ctx.stroke()
      }
      for (let y = 0; y < 300; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(600, y)
        ctx.stroke()
      }

      // Draw active mode entities
      const state = gameRef.current

      if (gameMode === "pong") {
        const { ball, playerPaddle, aiPaddle } = state.pong
        
        // Midfield net dash
        ctx.setLineDash([6, 6])
        ctx.strokeStyle = "rgba(63,63,63,0.3)"
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.moveTo(300, 0)
        ctx.lineTo(300, 300)
        ctx.stroke()
        ctx.setLineDash([])

        // Player cyan paddle glow
        ctx.shadowColor = "#00f0ff"
        ctx.shadowBlur = 12
        ctx.fillStyle = "#00f0ff"
        ctx.fillRect(playerPaddle.x, playerPaddle.y, playerPaddle.width, playerPaddle.height)

        // AI Paddle simple slate
        ctx.shadowColor = "transparent"
        ctx.shadowBlur = 0
        ctx.fillStyle = "#a1a1aa"
        ctx.fillRect(aiPaddle.x, aiPaddle.y, aiPaddle.width, aiPaddle.height)

        // Glow Ball vector
        ctx.shadowColor = "#00f0ff"
        ctx.shadowBlur = 18
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()

      } else if (gameMode === "breakout") {
        const { ball, paddle, bricks } = state.breakout

        // Draw Paddle
        ctx.shadowColor = "#00f0ff"
        ctx.shadowBlur = 10
        ctx.fillStyle = "#00f0ff"
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)

        // Draw bricks
        bricks.forEach((brick) => {
          if (brick.status === 0) return
          ctx.shadowColor = brick.color
          ctx.shadowBlur = 8
          ctx.fillStyle = brick.color
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height)
        })

        // Draw ball vector
        ctx.shadowColor = "#ffffff"
        ctx.shadowBlur = 10
        ctx.fillStyle = "#ffffff"
        ctx.beginPath()
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
        ctx.fill()

      } else if (gameMode === "cosmo") {
        const { ship, asteroids, gems, lasers } = state.cosmo

        // Draw Ship (Cool neon triangle spacecraft)
        ctx.save()
        ctx.translate(ship.x, ship.y)
        ctx.shadowColor = "#00f0ff"
        ctx.shadowBlur = 14
        ctx.strokeStyle = "#00f0ff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(0, -ship.height / 2)
        ctx.lineTo(ship.width / 2, ship.height / 2)
        ctx.lineTo(0, ship.height * 0.2)
        ctx.lineTo(-ship.width / 2, ship.height / 2)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()

        // Draw asteroids (Faceted shapes)
        asteroids.forEach((astr) => {
          ctx.save()
          ctx.translate(astr.x, astr.y)
          ctx.rotate(astr.rotation)
          ctx.shadowColor = "#ec4899"
          ctx.shadowBlur = 10
          ctx.strokeStyle = "#ec4899"
          ctx.lineWidth = 1.5
          ctx.beginPath()
          const steps = 6
          for (let i = 0; i < steps; i++) {
            const angle = (i / steps) * Math.PI * 2
            const r = astr.size * (0.85 + Math.random() * 0.15 * Math.sin(angle * 5))
            const ax = Math.cos(angle) * r
            const ay = Math.sin(angle) * r
            if (i === 0) ctx.moveTo(ax, ay)
            else ctx.lineTo(ax, ay)
          }
          ctx.closePath()
          ctx.stroke()
          ctx.restore()
        })

        // Draw flashing star Gems
        gems.forEach((gem) => {
          ctx.save()
          ctx.translate(gem.x, gem.y)
          const scale = 1 + Math.sin(gem.pulse) * 0.25
          ctx.shadowColor = "#22c55e"
          ctx.shadowBlur = 12
          ctx.fillStyle = "#22c55e"
          ctx.beginPath()
          // draw simple four pointed star
          ctx.moveTo(0, -gem.size * scale)
          ctx.lineTo(gem.size * 0.3 * scale, -gem.size * 0.3 * scale)
          ctx.lineTo(gem.size * scale, 0)
          ctx.lineTo(gem.size * 0.3 * scale, gem.size * 0.3 * scale)
          ctx.moveTo(0, -gem.size * scale)
          ctx.lineTo(0, gem.size * scale)
          ctx.lineTo(-gem.size * 0.3 * scale, gem.size * 0.3 * scale)
          ctx.lineTo(-gem.size * scale, 0)
          ctx.lineTo(-gem.size * 0.3 * scale, -gem.size * 0.3 * scale)
          ctx.closePath()
          ctx.fill()
          ctx.restore()
        })

        // Draw Lasers
        lasers.forEach((laser) => {
          ctx.shadowColor = "#00f0ff"
          ctx.shadowBlur = 8
          ctx.fillStyle = "#00f0ff"
          ctx.fillRect(laser.x - 1.5, laser.y, 3, 10)
        })
      }

      // Draw Sparks for hit visual impact events
      state.particles.forEach((p) => {
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      })

      // Standard shadow blur reset
      ctx.shadowBlur = 0
    }

    const frameLoop = () => {
      if (isPlaying && gameStatus === "playing") {
        updateGame()
      }
      drawGame()
      animationId = requestAnimationFrame(frameLoop)
    }

    frameLoop()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerdown", handlePointerMove)
      canvas.removeEventListener("pointerup", handlePointerUp)
    }
  }, [isPlaying, gameMode, gameStatus, playSoundSynth])

  // Custom start game trigger
  const startGame = () => {
    setGameStatus("playing")
    setIsPlaying(true)
    if (gameMode === "breakout") {
      resetBreakoutBricks()
    } else if (gameMode === "cosmo") {
      resetCosmoMode()
    }
  }

  return (
    <section className="py-20 md:py-32 bg-background relative" id="arcade">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10">
          <p className="text-primary font-mono text-xs md:text-sm mb-2 uppercase tracking-[0.2em]">Take a Break</p>
          <AnimatedHeading className="text-3xl md:text-4xl font-bold text-foreground mb-3 flex items-center justify-center gap-3">
            <Gamepad2 className="h-8 w-8 text-primary animate-pulse" />
            Mohsin's Retro Arcade
          </AnimatedHeading>

        </div>

        {/* Console Hub Cabinet */}
        <div className="max-w-3xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-950/80 backdrop-blur-md p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle neon indicator lights */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-80" />
          
          {/* Top Panel - Mode Toggles */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            <button
              onClick={() => { setGameMode("pong"); setIsPlaying(false); }}
              className={`py-3 px-2 sm:px-4 rounded-xl border text-xs sm:text-sm font-mono transition-all flex flex-col md:flex-row items-center justify-center gap-2 ${
                gameMode === "pong"
                  ? "bg-primary/10 border-primary text-primary shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>[1] Pong</span>
            </button>
            <button
              onClick={() => { setGameMode("breakout"); setIsPlaying(false); }}
              className={`py-3 px-2 sm:px-4 rounded-xl border text-xs sm:text-sm font-mono transition-all flex flex-col md:flex-row items-center justify-center gap-2 ${
                gameMode === "breakout"
                  ? "bg-pink-500/10 border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.15)]"
                  : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <Sparkles className="h-4 w-4" />
              <span>[2] Breakout</span>
            </button>
            <button
              onClick={() => { setGameMode("cosmo"); setIsPlaying(false); }}
              className={`py-3 px-2 sm:px-4 rounded-xl border text-xs sm:text-sm font-mono transition-all flex flex-col md:flex-row items-center justify-center gap-2 ${
                gameMode === "cosmo"
                  ? "bg-violet-500/10 border-violet-500 text-violet-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                  : "bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
              }`}
            >
              <Trophy className="h-4 w-4" />
              <span>[3] Space Fleet</span>
            </button>
          </div>

          {/* Core Interactive Screen Frame */}
          <div className="relative mb-6 flex flex-col items-center">
            
            <div className="relative w-full aspect-[2/1] bg-[#09090b] rounded-xl overflow-hidden border border-zinc-800 shadow-inner flex items-center justify-center group">
              <canvas
                ref={canvasRef}
                width={600}
                height={300}
                className="w-full h-full block cursor-crosshair touch-none"
                style={{ imageRendering: "pixelated" }}
              />

              {/* Start Overlay screens */}
              {gameStatus === "ready" && !isPlaying && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
                  <Gamepad2 className="h-12 w-12 text-primary mb-3 animate-bounce" />
                  <h3 className="text-lg font-mono font-bold text-foreground uppercase tracking-wider mb-2">
                    {gameMode === "pong" && "Classic Neon Pong"}
                    {gameMode === "breakout" && "Neon Brick Breaker"}
                    {gameMode === "cosmo" && "Space Fleet Invaders"}
                  </h3>
                  <p className="text-xs text-muted-foreground max-w-xs mb-4 leading-relaxed font-light">
                    {gameMode === "pong" && "Dodge, calculate collision dynamics, and scores. Drag/hover finger vertically on the left screen or use W/S keys."}
                    {gameMode === "breakout" && "Collect power by bouncing off the paddle to break colored glowing bricks. Drag horizontally or use A/D keys."}
                    {gameMode === "cosmo" && "Steer horizontal coordinate to avoid asteroids. Shoot lasers and collect blinking points gems."}
                  </p>
                  <Button onClick={startGame} variant="default" className="font-mono text-xs tracking-wider">
                    Insert Coin & Play
                  </Button>
                </div>
              )}

              {/* Game Over Screen */}
              {gameStatus === "gameover" && !isPlaying && (
                <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
                  <Trophy className="h-10 w-10 text-red-500/80 mb-3" />
                  <h3 className="text-xl font-mono font-bold text-red-500 uppercase tracking-widest mb-1">
                    Game Over
                  </h3>
                  <p className="text-xs text-muted-foreground font-light mb-4">
                    {gameMode === "breakout" ? `Final Score: ${currentBreakoutScore}` : `Final Score: ${currentCosmoScore}`}
                  </p>
                  <Button onClick={startGame} variant="destructive" className="font-mono text-xs">
                    Try Again
                  </Button>
                </div>
              )}

              {/* Victory Screen */}
              {gameStatus === "victory" && !isPlaying && (
                <div className="absolute inset-0 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
                  <Sparkles className="h-12 w-12 text-green-400 mb-3 animate-pulse" />
                  <h3 className="text-xl font-mono font-bold text-green-400 uppercase tracking-widest mb-1">
                    Victory Achieved
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4">
                    Excellent reflexes! You successfully cleared all neon brick block layers!
                  </p>
                  <Button onClick={startGame} variant="default" className="font-mono text-xs">
                    Play Again
                  </Button>
                </div>
              )}

              {/* Real-time score dashboards */}
              {isPlaying && gameStatus === "playing" && (
                <div className="absolute top-3 left-4 right-4 pointer-events-none flex items-center justify-between font-mono text-xs font-semibold select-none">
                  {gameMode === "pong" ? (
                    <>
                      <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/50 py-1.5 px-3 rounded-md text-[#00f0ff] uppercase tracking-wider text-[10px]">
                        <span>Player:</span>
                        <span className="font-bold text-sm leading-none">{score.player}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/50 py-1.5 px-3 rounded-md text-zinc-400 uppercase tracking-wider text-[10px]">
                        <span>AI:</span>
                        <span className="font-bold text-sm leading-none">{score.ai}</span>
                      </div>
                    </>
                  ) : gameMode === "breakout" ? (
                    <>
                      <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/50 py-1.5 px-3 rounded-md text-pink-500 uppercase tracking-wider text-[10px]">
                        <span>Score:</span>
                        <span className="font-bold text-sm leading-none">{currentBreakoutScore}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/50 py-1.5 px-3 rounded-md text-yellow-500 uppercase tracking-wider text-[10px]">
                        <span>High:</span>
                        <span className="font-bold text-sm leading-none">{score.breakoutHighScore}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/50 py-1.5 px-3 rounded-md text-violet-400 uppercase tracking-wider text-[10px]">
                        <span>Score:</span>
                        <span className="font-bold text-sm text-[#00f0ff] leading-none">{currentCosmoScore}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-zinc-950/80 border border-zinc-900/50 py-1.5 px-3 rounded-md text-emerald-400 uppercase tracking-wider text-[10px]">
                        <span>High:</span>
                        <span className="font-bold text-sm leading-none">{score.cosmoHighScore}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Bottom Controls Panel */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-zinc-900/30 border border-zinc-900 p-4 rounded-xl">
            <div className="flex gap-2">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                variant="default"
                size="default"
                disabled={gameStatus === "ready" || gameStatus === "gameover" || gameStatus === "victory"}
                className="font-mono"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isPlaying ? "Pause" : "Resume"}
              </Button>
              <Button
                onClick={resetGame}
                variant="outline"
                size="default"
                className="font-mono border-zinc-800 text-zinc-300 hover:bg-zinc-900 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Record
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2.5 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                title={soundEnabled ? "Mute audio" : "Enable syntesizer audio"}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4 text-emerald-500" /> : <VolumeX className="h-4 w-4 text-zinc-500" />}
              </button>

              <div className="text-right">
                <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  Controls Helper
                </p>
                <p className="text-[10px] text-zinc-400 font-light max-w-[200px] leading-tight">
                  {gameMode === "pong" && "Drag/slide anywhere on the left screen or press W / S"}
                  {gameMode === "breakout" && "Slide horizontally under the screen or press Arrow keys"}
                  {gameMode === "cosmo" && "Slide horizontally to move, Spacebar / tap screen to shoot lasers"}
                </p>
              </div>
            </div>
          </div>



        </div>
      </div>
    </section>
  )
}
