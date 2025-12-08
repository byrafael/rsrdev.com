"use client"

import { useEffect, useRef, useState } from "react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"

function AnimatedCounter({
	value,
	suffix = "",
	prefix = "",
	duration = 1000,
	className = "",
}: {
	value: number
	suffix?: string
	prefix?: string
	duration?: number
	className?: string
}) {
	const [count, setCount] = useState(0)
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLSpanElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsVisible(true)
				}
			},
			{ threshold: 0.2 }
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => observer.disconnect()
	}, [])

	useEffect(() => {
		if (!isVisible) {
			return
		}

		let startTime: number
		let animationFrame: number

		const animate = (currentTime: number) => {
			if (!startTime) {
				startTime = currentTime
			}
			const progress = Math.min((currentTime - startTime) / duration, 1)

			// Easing function for smooth animation
			const easeOutCubic = 1 - (1 - progress) ** 3
			setCount(Math.floor(easeOutCubic * value))

			if (progress < 1) {
				animationFrame = requestAnimationFrame(animate)
			} else {
				setCount(value)
			}
		}

		animationFrame = requestAnimationFrame(animate)

		return () => cancelAnimationFrame(animationFrame)
	}, [isVisible, value, duration])

	return (
		<span ref={ref} className={className}>
			{prefix}
			{count}
			{suffix}
		</span>
	)
}

export default function About() {
	const t = useTranslation()

	return (
		<section id="about" className="py-16">
			<Container className="space-y-12">
				<p className="text-foreground/85 text-lg leading-relaxed">{t.about.paragraph}</p>

				{/* Stats Counters */}
				<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
					{t.about.stats.map(
						(
							stat: { value: number; suffix?: string; label: string; prefix?: string },
							index: number
						) => (
							<div
								key={stat.label}
								className="fade-in slide-in-from-bottom-4 flex animate-in flex-col items-center justify-center fill-mode-backwards p-4 text-center"
								style={{ animationDelay: `${index * 150}ms` }}
							>
								<div className="mb-2 bg-linear-to-br from-foreground to-foreground/50 bg-clip-text font-bold text-5xl text-transparent tracking-tight md:text-6xl">
									<AnimatedCounter
										value={stat.value}
										suffix={stat.suffix || ""}
										prefix={stat.prefix || ""}
										className="tabular-nums"
									/>
								</div>
								<p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
									{stat.label}
								</p>
							</div>
						)
					)}
				</div>
			</Container>
		</section>
	)
}
