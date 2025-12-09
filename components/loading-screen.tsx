"use client"

import { useTheme } from "next-themes"
import { useEffect, useRef, useState } from "react"

export default function LoadingScreen() {
	const [isLoading, setIsLoading] = useState(true)
	const [opacity, setOpacity] = useState(1)

	useEffect(() => {
		// Prevent scrolling while loading
		document.body.style.overflow = "hidden"

		const handleLoad = () => {
			setOpacity(0)
			setTimeout(() => {
				setIsLoading(false)
				document.body.style.overflow = "auto"
			}, 300)
		}

		if (document.readyState === "complete") {
			handleLoad()
		} else {
			window.addEventListener("load", handleLoad)
		}

		return () => {
			window.removeEventListener("load", handleLoad)
			document.body.style.overflow = "auto"
		}
	}, [])

	if (!isLoading) {
		return null
	}

	return (
		<div
			className="fixed inset-0 z-[100] bg-background transition-opacity duration-300"
			style={{ opacity }}
		>
			<AsciiCanvas />

			{/* Main Content */}
			<div className="absolute right-8 bottom-8 left-8 flex items-end justify-between">
				{/* Status Text */}
				<div className="font-medium font-mono text-muted-foreground text-sm uppercase tracking-widest">
					<span className="mr-3 inline-block h-2 w-2 animate-pulse rounded-full bg-primary" />
					SYSTEM_LOADING
				</div>
			</div>
		</div>
	)
}

function AsciiCanvas() {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { theme } = useTheme()
	const mouseRef = useRef({ x: 0, y: 0 })

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) {
			return
		}

		const ctx = canvas.getContext("2d")
		if (!ctx) {
			return
		}

		// Use hex characters for a more "data" feel
		const chars = "0123456789ABCDEF"
		const charArray = chars.split("")

		class Particle {
			x: number
			y: number
			char: string
			size: number
			vx: number
			vy: number
			baseX: number
			baseY: number
			density: number

			constructor(x: number, y: number) {
				this.x = x
				this.y = y
				this.baseX = x
				this.baseY = y
				this.char = charArray[Math.floor(Math.random() * charArray.length)]
				this.size = Math.random() * 10 + 10 // 10-20px
				this.vx = (Math.random() - 0.5) * 2
				this.vy = (Math.random() - 0.5) * 2
				this.density = Math.random() * 30 + 1
			}

			draw() {
				if (!ctx) {
					return
				}
				ctx.font = `${this.size}px "JetBrains Mono", monospace`
				// Even lower opacity for background effect
				ctx.fillStyle = theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)"
				ctx.fillText(this.char, this.x, this.y)
			}

			update() {
				const dx = mouseRef.current.x - this.x
				const dy = mouseRef.current.y - this.y
				const distance = Math.sqrt(dx * dx + dy * dy)
				const forceDirectionX = dx / distance
				const forceDirectionY = dy / distance
				const maxDistance = 150
				const force = (maxDistance - distance) / maxDistance
				const directionX = forceDirectionX * force * this.density
				const directionY = forceDirectionY * force * this.density

				if (distance < maxDistance) {
					this.x -= directionX
					this.y -= directionY
				} else {
					if (this.x !== this.baseX) {
						const dx = this.x - this.baseX
						this.x -= dx / 10
					}
					if (this.y !== this.baseY) {
						const dy = this.y - this.baseY
						this.y -= dy / 10
					}
				}

				// Add some random jitter
				if (Math.random() > 0.95) {
					this.char = charArray[Math.floor(Math.random() * charArray.length)]
				}
			}
		}

		let animationFrameId: number
		let particles: Particle[] = []

		const resize = () => {
			canvas.width = window.innerWidth
			canvas.height = window.innerHeight
			initParticles()
		}

		const initParticles = () => {
			particles = []
			const numberOfParticles = (canvas.width * canvas.height) / 5000 // Density
			for (let i = 0; i < numberOfParticles; i++) {
				const x = Math.random() * canvas.width
				const y = Math.random() * canvas.height
				particles.push(new Particle(x, y))
			}
		}

		const animate = () => {
			ctx.clearRect(0, 0, canvas.width, canvas.height)

			particles.forEach((particle) => {
				particle.update()
				particle.draw()
			})

			animationFrameId = requestAnimationFrame(animate)
		}

		const handleMouseMove = (e: MouseEvent) => {
			mouseRef.current = { x: e.clientX, y: e.clientY }
		}

		window.addEventListener("resize", resize)
		window.addEventListener("mousemove", handleMouseMove)

		resize()
		animate()

		return () => {
			window.removeEventListener("resize", resize)
			window.removeEventListener("mousemove", handleMouseMove)
			cancelAnimationFrame(animationFrameId)
		}
	}, [theme])

	return <canvas ref={canvasRef} className="absolute inset-0" />
}
