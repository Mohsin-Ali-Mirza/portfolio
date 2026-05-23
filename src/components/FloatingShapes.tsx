import { useEffect, useState } from "react"

interface Shape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  type: "circle" | "square" | "triangle"
  speed: number
  direction: number
}

export function FloatingShapes() {
  const [shapes, setShapes] = useState<Shape[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const initialShapes: Shape[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 15,
      rotation: Math.random() * 360,
      type: (["circle", "square", "triangle"] as const)[Math.floor(Math.random() * 3)],
      speed: Math.random() * 0.3 + 0.1,
      direction: Math.random() * Math.PI * 2,
    }))
    setShapes(initialShapes)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setShapes(prev =>
        prev.map(shape => {
          const dx = mousePosition.x - shape.x
          const dy = mousePosition.y - shape.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          let newX = shape.x + Math.cos(shape.direction) * shape.speed
          let newY = shape.y + Math.sin(shape.direction) * shape.speed
          
          if (distance < 20) {
            newX -= (dx / distance) * 0.5
            newY -= (dy / distance) * 0.5
          }
          
          if (newX < -5) newX = 105
          if (newX > 105) newX = -5
          if (newY < -5) newY = 105
          if (newY > 105) newY = -5

          return {
            ...shape,
            x: newX,
            y: newY,
            rotation: shape.rotation + shape.speed * 2,
          }
        })
      )
    }, 50)
    return () => clearInterval(interval)
  }, [mousePosition])

  const renderShape = (shape: Shape) => {
    const baseStyle = {
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: shape.size,
      height: shape.size,
      transform: `translate(-50%, -50%) rotate(${shape.rotation}deg)`,
      opacity: 0.15,
    }

    if (shape.type === "circle") {
      return (
        <div
          key={shape.id}
          className="absolute rounded-full border border-primary/30 bg-primary/5"
          style={baseStyle}
        />
      )
    }
    if (shape.type === "square") {
      return (
        <div
          key={shape.id}
          className="absolute border border-primary/30 bg-primary/5"
          style={baseStyle}
        />
      )
    }
    return (
      <div
        key={shape.id}
        className="absolute"
        style={{
          ...baseStyle,
          width: 0,
          height: 0,
          borderLeft: `${shape.size / 2}px solid transparent`,
          borderRight: `${shape.size / 2}px solid transparent`,
          borderBottom: `${shape.size}px solid hsla(var(--primary) / 0.1)`,
          backgroundColor: "transparent",
        }}
      />
    )
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {shapes.map(renderShape)}
    </div>
  )
}
