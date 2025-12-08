"use client"

import Container from "@/components/container"
import SocialIcons from "@/components/ui/social-icons"
import { useTranslation } from "@/hooks/use-translation"

export default function Hero() {
	const t = useTranslation()

	return (
		<section id="hero" className="flex items-center justify-center py-24">
			<Container>
				<div className="space-y-6">
					<div className="mb-4">
						<h1 className="mb-2 font-bold text-5xl">
							{t.hero.greeting} <span className="text-brand-accent">Rafael Soley</span>
						</h1>
						<p className="text-muted-foreground">{t.hero.subtitle}</p>
					</div>

					<p className="mb-6 max-w-2xl text-foreground/80 text-lg leading-relaxed">
						{t.hero.description}
					</p>

					<div className="text-sm">
						<SocialIcons />
					</div>
				</div>
			</Container>
		</section>
	)
}
