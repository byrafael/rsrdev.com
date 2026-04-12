"use client"

import { GitCommit, Heart } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"

export default function Footer() {
	const t = useTranslation()
	const [commit, setCommit] = useState<{ sha: string; url: string } | null>(null)
	const [views, setViews] = useState<number | null>(null)
	const [mounted, setMounted] = useState(false)
	const initialized = useRef(false)

	useEffect(() => {
		setMounted(true)

		if (initialized.current) {
			return
		}
		initialized.current = true

		// Fetch latest commit
		fetch("https://api.github.com/repos/byrafael/rsrdev.com/commits?per_page=1")
			.then((res) => res.json())
			.then((data) => {
				if (Array.isArray(data) && data.length > 0) {
					setCommit({
						sha: data[0].sha.substring(0, 7),
						url: data[0].html_url,
					})
				}
			})
			.catch((_err) => {})

		// Fetch page views
		fetch("https://abacus.jasoncameron.dev/hit/rsrdev.com/main")
			.then((res) => res.json())
			.then((data) => {
				if (data && typeof data.value === "number") {
					setViews(data.value)
				}
			})
			.catch((_err) => {})
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<footer className="mt-12 w-full py-8">
			<Container>
				<div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-muted/50 p-6 text-muted-foreground text-sm md:flex-row">
					{/* Left: Copyright */}
					<div className="order-1 flex items-center">
						<span>{t.footer.copyright}</span>
					</div>

					{/* Center: Made with */}
					<div className="order-2 flex items-center gap-1.5">
						<span>{t.footer.madeWith}</span>
						<Heart className="h-3.5 w-3.5" />
						<span>
							{t.footer.and} {t.footer.nextjs}
						</span>
					</div>

					{/* Right: Stats */}
					<div className="order-3 flex items-center gap-3">
						<div className="flex items-center gap-1">
							{views === null ? (
								<span className="animate-pulse">...</span>
							) : (
								<Link
									href="https://abacus.jasoncameron.dev/"
									target="_blank"
									rel="noopener noreferrer"
									className="transition-colors hover:text-foreground"
								>
									<span>{views.toLocaleString("en-US")} views</span>
								</Link>
							)}
						</div>

						{commit && views !== null && <div className="hidden h-4 w-px bg-border md:block" />}

						{commit && (
							<Link
								href={commit.url}
								target="_blank"
								rel="noopener noreferrer"
								className="flex items-center gap-1 transition-colors hover:text-foreground"
							>
								<GitCommit className="h-3.5 w-3.5" />
								<span className="font-mono text-xs">{commit.sha}</span>
							</Link>
						)}
					</div>
				</div>
			</Container>
		</footer>
	)
}
