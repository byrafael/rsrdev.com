"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"

export default function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const [activeSection, setActiveSection] = useState("")
	const t = useTranslation()
	const pathname = usePathname()
	const _isHome = pathname === "/"

	useEffect(() => {
		setActiveSection("")

		if (["/projects", "/experience", "/education", "/credentials"].includes(pathname)) {
			return
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id)
					}
				})
			},
			{ rootMargin: "-50% 0px -50% 0px" }
		)

		const observeSections = () => {
			const sections = document.querySelectorAll("section[id]")
			sections.forEach((section) => {
				observer.observe(section)
			})
		}

		observeSections()

		// Retry to catch dynamically rendered sections
		const timeout = setTimeout(observeSections, 100)

		return () => {
			clearTimeout(timeout)
			observer.disconnect()
		}
	}, [pathname])

	const links = [
		{ label: t.nav.about, href: "#about" },
		{ label: t.nav.experience, href: "#experience" },
		{ label: t.nav.projects, href: "#projects" },
		{ label: t.nav.education, href: "#education" },
		// { label: t.nav.research, href: "#research" },
		{ label: t.nav.contact, href: "#contact" },
	]

	return (
		<nav className="sticky top-0 z-50 border-border border-b bg-background/95 backdrop-blur-sm">
			<Container className="flex items-center justify-between py-4">
				<div className="flex items-center gap-2 font-mono font-semibold text-lg tracking-tight">
					<Link
						href="/"
						className="text-base text-muted-foreground transition-colors hover:text-brand-accent"
					>
						rsrdev
					</Link>
					<span className="text-muted-foreground/40">/</span>
					{pathname
						.split("/")
						.filter(Boolean)
						.map((segment, index, array) => {
							const href = `/${array.slice(0, index + 1).join("/")}`
							return (
								<div key={href} className="flex items-center gap-2">
									<Link href={href} className="group transition-colors">
										<span className="font-normal text-base text-muted-foreground transition-colors group-hover:text-brand-accent">
											{segment}
										</span>
									</Link>
									<span className="text-muted-foreground/40">/</span>
								</div>
							)
						})}
					{activeSection && activeSection !== "hero" ? (
						<>
							<Link
								href={`${pathname}#${activeSection}`}
								className="font-normal text-base text-muted-foreground transition-colors hover:text-brand-accent"
							>
								{activeSection}
							</Link>
							<span className="text-muted-foreground/40">/</span>
						</>
					) : (
						<span className="text-muted-foreground/40"></span>
					)}
				</div>

				<div className="hidden gap-6 text-sm md:flex">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-muted-foreground transition-colors hover:text-brand-accent"
						>
							{link.label}
						</Link>
					))}
				</div>

				<button
					type="button"
					className="text-muted-foreground hover:text-brand-accent md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label="Toggle menu"
				>
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<title>Menu</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</Container>

			{mobileMenuOpen && (
				<div className="border-border border-t md:hidden">
					<Container className="py-3">
						<div className="flex flex-wrap gap-x-5 gap-y-2 px-1">
							{links.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									className="text-muted-foreground text-xs transition-colors hover:text-brand-accent"
									onClick={() => setMobileMenuOpen(false)}
								>
									{link.label}
								</Link>
							))}
						</div>
					</Container>
				</div>
			)}
		</nav>
	)
}
