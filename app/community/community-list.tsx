"use client"

import { HeartHandshake } from "lucide-react"
import Container from "@/components/container"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortExperiences,
	type TranslationJob,
	transformTranslationToExperiences,
} from "@/lib/experience-data"

export function CommunityList() {
	const t = useTranslation()

	const rawEntries = t.communityPage.entries as unknown as TranslationJob[]
	const entries = sortExperiences(transformTranslationToExperiences(rawEntries), "date")

	return (
		<Container className="py-6 md:py-12">
			<h1 className="mb-4 flex items-center gap-3 font-bold text-3xl">
				<HeartHandshake className="h-8 w-8 text-brand-accent" />
				{t.communityPage.title}
			</h1>
			<p className="mb-10 max-w-3xl text-lg text-muted-foreground leading-relaxed">
				{t.communityPage.subtitle}
			</p>

			{/* Stats strip */}
			<div className="mb-12 grid gap-4 sm:grid-cols-3">
				{t.communityPage.stats.map((stat) => (
					<Card key={stat.label}>
						<CardContent className="py-6 text-center">
							<div className="font-bold text-3xl text-brand-accent">{stat.value}</div>
							<div className="mt-1 text-muted-foreground text-sm">{stat.label}</div>
						</CardContent>
					</Card>
				))}
			</div>

			<ExperienceTimeline
				experiences={entries}
				presentLabel={t.experience.present}
				ongoingLabel={t.communityPage.ongoing}
			/>
		</Container>
	)
}
