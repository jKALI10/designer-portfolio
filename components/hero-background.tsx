"use client"

import { useEffect, useRef } from "react"

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()

      canvas.width = rect.width * devicePixelRatio
      canvas.height = rect.height * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle class
    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      originalX: number
      originalY: number

      constructor(x: number, y: number, size: number, speedX: number, speedY: number, color: string) {
        this.x = x
        this.y = y
        this.originalX = x
        this.originalY = y
        this.size = size
        this.speedX = speedX
        this.speedY = speedY
        this.color = color
      }

      update(mouseX: number, mouseY: number) {
        // Move particles
        this.x += this.speedX
        this.y += this.speedY

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const angle = Math.atan2(dy, dx)
          const force = (120 - distance) / 800
          this.speedX -= Math.cos(angle) * force
          this.speedY -= Math.sin(angle) * force
        }

        // Return to original position slowly
        const dxOrigin = this.originalX - this.x
        const dyOrigin = this.originalY - this.y
        this.speedX += dxOrigin * 0.003
        this.speedY += dyOrigin * 0.003

        // Slow down particles
        this.speedX *= 0.98
        this.speedY *= 0.98
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []

    const createParticles = () => {
      particles.length = 0
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height

      // Create a grid of particles
      const cols = 10
      const rows = 8
      const cellWidth = width / cols
      const cellHeight = height / rows

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellWidth + cellWidth / 2
          const y = j * cellHeight + cellHeight / 2

          const size = Math.random() * 3 + 1
          const speedX = (Math.random() - 0.5) * 0.5
          const speedY = (Math.random() - 0.5) * 0.5

          // Light mode colors: purples and pinks
          const hue = Math.random() * 60 + 280
          const color = `hsla(${hue}, 70%, 60%, 0.4)`

          particles.push(new Particle(x, y, size, speedX, speedY, color))
        }
      }
    }

    createParticles()

    // Mouse position
    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    canvas.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationFrameId: number

    const render = () => {
      // Clear canvas with semi-transparent background for trail effect
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update(mouseX, mouseY)
        particle.draw(ctx)
      })

      // Connect particles with lines
      connectParticles(ctx)

      animationFrameId = requestAnimationFrame(render)
    }

    const connectParticles = (ctx: CanvasRenderingContext2D) => {
      const maxDistance = 150

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            // Gradient opacity based on distance
            const opacity = 1 - distance / maxDistance

            ctx.strokeStyle = `rgba(180, 120, 255, ${opacity * 0.15})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    // Start animation
    render()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", setCanvasDimensions)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
