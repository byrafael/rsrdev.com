"use client"

import { Briefcase } from "lucide-react"
import Container from "@/components/container"
import { ExperienceTimeline } from "@/components/sections/experience-timeline"
import { useTranslation } from "@/hooks/use-translation"
import {
	type SortStrategy,
	sortExperiences,
	type TranslationJob,
	transformTranslationToExperiences,
} from "@/lib/experience-data"

// Default sorting strategy for experiences
const EXPERIENCE_SORT_STRATEGY: SortStrategy = "date"

export function ExperienceList() {
	const t = useTranslation()

	// Transform and sort experiences dynamically
	const rawJobs = t.experience.jobs as unknown as TranslationJob[]
	const experiences = transformTranslationToExperiences(rawJobs)
	const jobs = sortExperiences(experiences, EXPERIENCE_SORT_STRATEGY)

	return (
		<Container className="py-6 md:py-12">
			<h1 className="mb-8 flex items-center gap-3 font-bold text-3xl">
				<Briefcase className="h-8 w-8 text-brand-accent" />
				{t.experience.title}
			</h1>

			<ExperienceTimeline experiences={jobs} presentLabel={t.experience.present} />
		</Container>
	)
}
