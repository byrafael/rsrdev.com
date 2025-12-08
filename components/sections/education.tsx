"use client"

import { GraduationCap } from "lucide-react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortEducationByDate,
	type TranslationEducation,
	transformTranslationToEducation,
} from "@/lib/content-data"

export default function Education() {
	const t = useTranslation()

	// Transform and sort education dynamically
	const rawEducation = t.education.list as unknown as TranslationEducation[]
	const educationData = transformTranslationToEducation(rawEducation)
	const education = sortEducationByDate(educationData)

	return (
		<section id="education" className="py-16">
			<Container>
				<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
					<GraduationCap className="h-8 w-8 text-brand-accent" />
					{t.education.title}
				</h2>

				<div className="space-y-6">
					{education.map((edu, index) => (
						<div key={edu.id}>
							<div className="mb-1 flex items-baseline justify-between gap-4">
								<h3 className="font-medium">{edu.degree}</h3>
								<span className="whitespace-nowrap text-muted-foreground text-xs">{edu.year}</span>
							</div>
							<p className="mb-2 text-muted-foreground text-sm">{edu.school}</p>
							<p className="text-foreground/70 text-xs">{edu.details}</p>
							{index < education.length - 1 && <div className="mt-6 border-border/50 border-t" />}
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
