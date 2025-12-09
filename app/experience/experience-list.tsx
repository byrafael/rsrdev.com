"use client"

import { Briefcase } from "lucide-react"
import Container from "@/components/container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export function ExperienceList() {
	const t = useTranslation()
	const { language } = useLanguage()

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

			<div className="space-y-8">
				{jobs.map((job) => (
					<section
						key={job.id}
						id={job.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
						className="relative"
					>
						<div className="flex flex-col gap-6 md:flex-row md:items-start">
							<div className="shrink-0">
								<Avatar className="h-16 w-16 border bg-background shadow-sm">
									<AvatarImage src={job.logo} alt={job.company} className="object-contain p-1" />
									<AvatarFallback className="font-bold text-lg text-muted-foreground">
										{job.company.substring(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</div>

							<div className="flex-1">
								{/* Multi-role company (LinkedIn style) */}
								{job.roles ? (
									<div>
										<div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
											<h3 className="font-bold text-xl">{job.company}</h3>
											{(() => {
												const companyRange = getCompanyDateRange(job)
												return companyRange ? (
													<span className="whitespace-nowrap rounded-full bg-secondary/50 px-3 py-1 font-medium text-muted-foreground text-sm">
														{formatDateRange(companyRange, language, t.experience.present)}
													</span>
												) : null
											})()}
										</div>

										<div className="relative space-y-10 border-border border-l-2 pl-6">
											{job.roles.map((role) => (
												<div key={role.id} className="relative">
													{/* Timeline dot for role */}
													<div className="-left-[29px] absolute top-2.5 h-2 w-2 rounded-full border border-background bg-muted-foreground/50" />

													<div className="mb-3 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
														<h4 className="font-semibold text-lg">{role.title}</h4>
														<span className="whitespace-nowrap text-muted-foreground text-sm">
															{formatDateRange(role.period, language, t.experience.present)}
														</span>
													</div>
													{Array.isArray(role.description) ? (
														<ul className="mb-4 list-disc space-y-1 pl-4 text-muted-foreground leading-relaxed">
															{role.description.map((item, i) => (
																<li key={i}>{item}</li>
															))}
														</ul>
													) : (
														<p className="mb-4 text-muted-foreground leading-relaxed">
															{role.description}
														</p>
													)}
													{role.highlights && (
														<div className="flex flex-wrap gap-2">
															{role.highlights.map((highlight) => (
																<span
																	key={highlight}
																	className="rounded-full border border-secondary-foreground/10 bg-secondary px-2.5 py-1 font-medium text-secondary-foreground text-xs"
																>
																	{highlight}
																</span>
															))}
														</div>
													)}
												</div>
											))}
										</div>
									</div>
								) : (
									/* Single role company */
									<div>
										<div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
											<div>
												<h3 className="font-bold text-xl">{job.company}</h3>
												<h4 className="mt-1 font-semibold text-lg text-muted-foreground">
													{job.title}
												</h4>
											</div>
											{job.period && (
												<span className="whitespace-nowrap rounded-full bg-secondary/50 px-3 py-1 font-medium text-muted-foreground text-sm">
													{formatDateRange(job.period, language, t.experience.present)}
												</span>
											)}
										</div>
										{Array.isArray(job.description) ? (
											<ul className="mb-4 list-disc space-y-1 pl-4 text-muted-foreground leading-relaxed">
												{job.description.map((item, i) => (
													<li key={i}>{item}</li>
												))}
											</ul>
										) : (
											<p className="mb-4 text-muted-foreground leading-relaxed">
												{job.description}
											</p>
										)}
										{job.highlights && (
											<div className="flex flex-wrap gap-2">
												{job.highlights.map((highlight) => (
													<span
														key={highlight}
														className="rounded-full border border-secondary-foreground/10 bg-secondary px-2.5 py-1 font-medium text-secondary-foreground text-xs"
													>
														{highlight}
													</span>
												))}
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</section>
				))}
			</div>
		</Container>
	)
}
