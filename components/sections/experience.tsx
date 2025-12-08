"use client"

import { Briefcase } from "lucide-react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"
import { type DateRange, formatDateRange, normalizeDate } from "@/lib/date-formatter"
import {
	type Experience as ExperienceType,
	type SortStrategy,
	sortExperiences,
	type TranslationJob,
	transformTranslationToExperiences,
} from "@/lib/experience-data"
import { useLanguage } from "@/lib/language-context"

// Default sorting strategy for experiences
const EXPERIENCE_SORT_STRATEGY: SortStrategy = "date"

/**
 * Calculate the overall date range for a company with multiple roles
 * Returns the earliest start date and latest end date (or undefined if any role is current)
 */
function getCompanyDateRange(job: ExperienceType): DateRange | null {
	if (!job.roles || job.roles.length === 0) {
		return null
	}

	// Find earliest start date using normalized date comparison
	const earliestStart = job.roles.reduce((earliest, role) => {
		return normalizeDate(role.period.start) < normalizeDate(earliest) ? role.period.start : earliest
	}, job.roles[0].period.start)

	// Find latest end date (undefined means "Present")
	const hasCurrentRole = job.roles.some((role) => !role.period.end)
	const latestEnd = hasCurrentRole
		? undefined
		: job.roles.reduce((latest, role) => {
				if (!role.period.end) {
					return latest
				}
				if (!latest) {
					return role.period.end
				}
				return normalizeDate(role.period.end) > normalizeDate(latest) ? role.period.end : latest
			}, job.roles[0].period.end)

	return {
		start: earliestStart,
		end: latestEnd,
	}
}

export default function Experience() {
	const t = useTranslation()
	const { language } = useLanguage()

	// Transform and sort experiences dynamically
	const rawJobs = t.experience.jobs as unknown as TranslationJob[]
	const experiences = transformTranslationToExperiences(rawJobs)
	const jobs = sortExperiences(experiences, EXPERIENCE_SORT_STRATEGY)

	return (
		<section id="experience" className="py-16">
			<Container>
				<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
					<Briefcase className="h-8 w-8 text-brand-accent" />
					{t.experience.title}
				</h2>

				<div className="space-y-8">
					{jobs.map((job, jobIndex) => (
						<div key={job.id}>
							{/* Multi-role company (LinkedIn style) */}
							{job.roles ? (
								<div>
									<div className="mb-4 flex items-baseline justify-between gap-4">
										<h3 className="font-medium">{job.company}</h3>
										{(() => {
											const companyRange = getCompanyDateRange(job)
											return companyRange ? (
												<span className="whitespace-nowrap text-muted-foreground text-xs">
													{formatDateRange(companyRange, language, t.experience.present)}
												</span>
											) : null
										})()}
									</div>
									<div className="space-y-6">
										{job.roles.map((role) => (
											<div key={role.id} className="border-border border-l-2 pl-4">
												<div className="mb-2 flex items-baseline justify-between gap-4">
													<div>
														<h4 className="font-medium text-sm">{role.title}</h4>
													</div>
													<span className="whitespace-nowrap text-muted-foreground text-xs">
														{formatDateRange(role.period, language, t.experience.present)}
													</span>
												</div>
												{Array.isArray(role.description) ? (
													<ul className="mb-3 list-disc pl-4 space-y-1 text-foreground/80 text-sm leading-relaxed">
														{role.description.map((item, i) => (
															<li key={i}>{item}</li>
														))}
													</ul>
												) : (
													<p className="mb-3 text-foreground/80 text-sm leading-relaxed">
														{role.description}
													</p>
												)}
												<div className="flex flex-wrap gap-2">
													{role.highlights.map((highlight) => (
														<span
															key={highlight}
															className="rounded bg-muted px-2 py-1 text-muted-foreground text-xs"
														>
															{highlight}
														</span>
													))}
												</div>
											</div>
										))}
									</div>
								</div>
							) : (
								/* Single-role company */
								<div>
									<div className="mb-2 flex items-baseline justify-between gap-4">
										<div>
											<h3 className="font-medium">{job.title}</h3>
											<p className="text-muted-foreground text-sm">{job.company}</p>
										</div>
										<span className="whitespace-nowrap text-muted-foreground text-xs">
											{job.period && formatDateRange(job.period, language, t.experience.present)}
										</span>
									</div>
									{Array.isArray(job.description) ? (
										<ul className="mb-3 list-disc pl-4 space-y-1 text-foreground/80 text-sm leading-relaxed">
											{job.description.map((item, i) => (
												<li key={i}>{item}</li>
											))}
										</ul>
									) : (
										<p className="mb-3 text-foreground/80 text-sm leading-relaxed">
											{job.description}
										</p>
									)}
									{job.highlights && (
										<div className="flex flex-wrap gap-2">
											{job.highlights.map((highlight) => (
												<span
													key={highlight}
													className="rounded bg-muted px-2 py-1 text-muted-foreground text-xs"
												>
													{highlight}
												</span>
											))}
										</div>
									)}
								</div>
							)}
							{jobIndex < jobs.length - 1 && <div className="mt-8 border-border/50 border-t" />}
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
