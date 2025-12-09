"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import Container from "@/components/container"
import { Button } from "@/components/ui/button"

const AsciiRocket = () => {
	const preRef = useRef<HTMLPreElement>(null)

	useEffect(() => {
		let animationFrameId: number
		let mouseX = 0

		const handleMouseMove = (e: MouseEvent) => {
			mouseX = (e.clientX / window.innerWidth) * 2 - 1
		}

		window.addEventListener("mousemove", handleMouseMove)

		const width = 60
		const height = 30

		const rocketBody = [
			"   ^   ",
			"  / \\  ",
			" /   \\ ",
			" |   | ",
			" |   | ",
			"/|   |\\",
			" |___| ",
		]

		const stars: { x: number; y: number; speed: number }[] = []
		for (let i = 0; i < 40; i++) {
			stars.push({
				x: Math.random() * width,
				y: Math.random() * height,
				speed: 0.1 + Math.random() * 0.3,
			})
		}

		const particles: { x: number; y: number; life: number }[] = []

		const render = () => {
			if (!preRef.current) {
				return
			}

			const b: string[] = new Array(width * height).fill(" ")

			// Update and draw stars
			stars.forEach((star) => {
				star.y += star.speed
				if (star.y >= height) {
					star.y = 0
					star.x = Math.random() * width
				}
				const idx = Math.floor(star.x) + Math.floor(star.y) * width
				if (idx >= 0 && idx < b.length) {
					b[idx] = "."
				}
			})

			// Calculate rocket position
			const rocketX = Math.floor(width / 2 + mouseX * 20)
			const rocketY = Math.floor(height / 2) - 3

			// Draw Rocket
			rocketBody.forEach((line, i) => {
				const y = rocketY + i
				if (y >= 0 && y < height) {
					for (let j = 0; j < line.length; j++) {
						const x = rocketX + j - Math.floor(line.length / 2)
						if (x >= 0 && x < width && line[j] !== " ") {
							b[x + y * width] = line[j]
						}
					}
				}
			})

			// Exhaust
			if (Math.random() > 0.3) {
				particles.push({
					x: rocketX + (Math.random() - 0.5) * 2,
					y: rocketY + rocketBody.length,
					life: 1.0,
				})
			}

			for (let i = particles.length - 1; i >= 0; i--) {
				const p = particles[i]
				p.y += 0.5
				p.life -= 0.15

				if (p.life <= 0 || p.y >= height) {
					particles.splice(i, 1)
					continue
				}

				const idx = Math.floor(p.x) + Math.floor(p.y) * width
				if (idx >= 0 && idx < b.length) {
					b[idx] = p.life > 0.5 ? "!" : "*"
				}
			}

			let output = ""
			for (let k = 0; k < width * height; k++) {
				output += k % width === width - 1 ? "\n" : b[k]
			}

			preRef.current.innerText = output
			animationFrameId = requestAnimationFrame(render)
		}

		render()

		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			cancelAnimationFrame(animationFrameId)
		}
	}, [])

	return (
		<div className="flex items-center justify-center overflow-hidden rounded-lg bg-black/80 p-8 backdrop-blur-sm">
			<pre
				ref={preRef}
				className="select-none whitespace-pre font-[family-name:var(--font-mono)] text-[#00ff41] text-[12px] leading-[12px]"
				aria-hidden="true"
			/>
		</div>
	)
}

export default function NotFound() {
	return (
		<Container className="grid min-h-[calc(100vh-200px)] grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
			<div className="flex flex-col items-start space-y-6 text-left">
				<div className="space-y-2">
					<h1 className="font-bold text-8xl text-foreground tracking-tighter">404</h1>
					<h2 className="font-medium text-3xl text-muted-foreground">Page Not Found</h2>
				</div>
				<p className="max-w-[400px] text-lg text-muted-foreground">
					The page you are looking for doesn't exist or has been moved.
				</p>
				<Button asChild size="lg" className="rounded-full px-8">
					<Link href="/">Return Home</Link>
				</Button>
			</div>

			<div className="flex w-full items-center justify-center">
				<AsciiRocket />
			</div>
		</Container>
	)
}
