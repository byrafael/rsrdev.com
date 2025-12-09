"use client"

import { Dumbbell, HeartHandshake, Music, Tent, User } from "lucide-react"
import Image from "next/image"
import Container from "@/components/container"
import TechStack from "@/components/sections/tech-stack"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SocialIcons from "@/components/ui/social-icons"
import { useTranslation } from "@/hooks/use-translation"
import { WidgetDataProvider } from "@/lib/widget-data-context"

export default function AboutPage() {
	const t = useTranslation()

	return (
		<WidgetDataProvider>
			<main className="flex flex-1 flex-col bg-background">
				<div className="grow pt-10 md:pt-20">
					{/* Hero Section */}
					<section id="hero" className="py-6 md:py-12">
						<Container>
							<div className="grid items-center gap-12 md:grid-cols-[2fr_1fr]">
								<div className="space-y-6">
									<h1 className="flex items-center gap-3 font-bold text-4xl tracking-tight">
										<User className="h-8 w-8 text-brand-accent" />
										{t.aboutPage.title}
									</h1>
									<div className="space-y-4 text-lg leading-relaxed">
										<p>{t.aboutPage.paragraph1}</p>
										<p>{t.aboutPage.paragraph2}</p>
									</div>
									<SocialIcons />
								</div>
								<div className="flex justify-center md:justify-end">
									<div className="relative aspect-square w-full max-w-xs">
										<Image
											src="/rafael.svg"
											alt="Rafael Soley"
											fill
											className="object-contain"
											priority
										/>
									</div>
								</div>
							</div>
						</Container>
					</section>

					{/* Outside the Terminal */}
					<section id="outside-the-terminal" className="py-8 md:py-16">
						<Container>
							<h2 className="mb-12 flex items-center gap-3 font-bold text-3xl">
								<Tent className="h-8 w-8 text-brand-accent" />
								{t.aboutPage.outsideTerminal.title}
							</h2>
							<div className="grid gap-6 md:grid-cols-3">
								{/* Sound Engineering */}
								<Card className="flex h-full flex-col">
									<CardHeader>
										<Music className="mb-4 h-10 w-10 text-brand-accent" />
										<CardTitle>{t.aboutPage.outsideTerminal.sound.title}</CardTitle>
									</CardHeader>
									<CardContent className="flex-1">
										<p className="text-muted-foreground">
											{t.aboutPage.outsideTerminal.sound.description}
										</p>
									</CardContent>
								</Card>

								{/* Physical Training */}
								<Card className="flex h-full flex-col">
									<CardHeader>
										<Dumbbell className="mb-4 h-10 w-10 text-brand-accent" />
										<CardTitle>{t.aboutPage.outsideTerminal.training.title}</CardTitle>
									</CardHeader>
									<CardContent className="flex-1">
										<p className="text-muted-foreground">
											{t.aboutPage.outsideTerminal.training.description}
										</p>
									</CardContent>
								</Card>

								{/* Community Service */}
								<Card className="flex h-full flex-col">
									<CardHeader>
										<HeartHandshake className="mb-4 h-10 w-10 text-brand-accent" />
										<CardTitle>{t.aboutPage.outsideTerminal.community.title}</CardTitle>
									</CardHeader>
									<CardContent className="flex-1">
										<p className="text-muted-foreground">
											{t.aboutPage.outsideTerminal.community.description}
										</p>
									</CardContent>
								</Card>
							</div>
						</Container>
					</section>

					{/* Tech Stack */}
					<TechStack />
				</div>
			</main>
		</WidgetDataProvider>
	)
}
