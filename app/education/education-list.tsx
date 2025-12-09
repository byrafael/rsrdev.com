"use client"

import { GraduationCap } from "lucide-react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortEducationByDate,
	type TranslationEducation,
	transformTranslationToEducation,
} from "@/lib/content-data"

export function EducationList() {
	const t = useTranslation()

	// Transform and sort education dynamically
	const rawEducation = t.education.list as unknown as TranslationEducation[]
	const educationData = transformTranslationToEducation(rawEducation)
	const education = sortEducationByDate(educationData)

	return (
		<Container className="py-6 md:py-12">
			<h1 className="mb-12 flex items-center gap-3 font-bold text-3xl">
				<GraduationCap className="h-8 w-8 text-brand-accent" />
				{t.education.title}
			</h1>

			<div className="relative ml-3 space-y-12 border-border border-l">
				{education.map((edu) => (
					<section
						key={edu.id}
						id={edu.school.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
						className="relative pl-8"
					>
						{/* Timeline dot - discrete and modern */}
						<div className="-left-[5px] absolute top-2 h-2.5 w-2.5 rounded-full bg-muted-foreground ring-4 ring-background" />

						<div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
							<h3 className="font-bold text-xl">{edu.degree}</h3>
							<span className="font-medium font-mono text-muted-foreground text-sm">
								{edu.year}
							</span>
						</div>
						<p className="mb-2 font-medium text-foreground/90 text-lg">{edu.school}</p>
						{Array.isArray(edu.details) ? (
							<ul className="list-disc space-y-1 pl-4 text-muted-foreground leading-relaxed">
								{edu.details.map((item, i) => (
									<li key={i}>{item}</li>
								))}
							</ul>
						) : (
							<p className="text-muted-foreground leading-relaxed">{edu.details}</p>
						)}
					</section>
				))}
			</div>
		</Container>
	)
}
