"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { type DateRange, formatDateRange, normalizeDate } from "@/lib/date-formatter"
import type { Experience } from "@/lib/experience-data"
import { useLanguage } from "@/lib/language-context"

/**
 * Calculate the overall date range for an entry with multiple roles
 * Returns the earliest start date and latest end date (or undefined if any role is current)
 */
function getEntryDateRange(entry: Experience): DateRange | null {
	if (!entry.roles || entry.roles.length === 0) {
		return null
	}

	// Find earliest start date using normalized date comparison
	const earliestStart = entry.roles.reduce((earliest, role) => {
		return normalizeDate(role.period.start) < normalizeDate(earliest) ? role.period.start : earliest
	}, entry.roles[0].period.start)

	// Find latest end date (undefined means "Present")
	const hasCurrentRole = entry.roles.some((role) => !role.period.end)
	const latestEnd = hasCurrentRole
		? undefined
		: entry.roles.reduce((latest, role) => {
				if (!role.period.end) {
					return latest
				}
				if (!latest) {
					return role.period.end
				}
				return normalizeDate(role.period.end) > normalizeDate(latest) ? role.period.end : latest
			}, entry.roles[0].period.end)

	return {
		start: earliestStart,
		end: latestEnd,
	}
}

/**
 * An entry is ongoing when any of its roles (or its own period) has no end date
 */
function isOngoing(entry: Experience): boolean {
	if (entry.roles && entry.roles.length > 0) {
		return entry.roles.some((role) => !role.period.end)
	}
	return Boolean(entry.period && !entry.period.end)
}

interface ExperienceTimelineProps {
	experiences: Experience[]
	presentLabel: string
	/** When set, entries without an end date get this badge next to their name */
	ongoingLabel?: string
}

export function ExperienceTimeline({
	experiences,
	presentLabel,
	ongoingLabel,
}: ExperienceTimelineProps) {
	const { language } = useLanguage()

	const ongoingBadge = (entry: Experience) =>
		ongoingLabel && isOngoing(entry) ? (
			<span className="whitespace-nowrap rounded-full bg-brand-accent/15 px-3 py-1 font-medium text-brand-accent text-sm">
				{ongoingLabel}
			</span>
		) : null

	return (
		<div className="space-y-8">
			{experiences.map((entry) => (
				<section
					key={entry.id}
					id={entry.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
					className="relative"
				>
					<div className="flex flex-col gap-6 md:flex-row md:items-start">
						<div className="shrink-0">
							<Avatar className="h-16 w-16 bg-background shadow-sm">
								<AvatarImage src={entry.logo} alt={entry.company} className="object-cover" />
								<AvatarFallback className="font-bold text-lg text-muted-foreground">
									{entry.company.substring(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
						</div>

						<div className="flex-1">
							{/* Multi-role entry (LinkedIn style) */}
							{entry.roles ? (
								<div>
									<div className="mb-6 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
										<h3 className="flex flex-wrap items-center gap-3 font-bold text-xl">
											{entry.company}
											{ongoingBadge(entry)}
										</h3>
										{(() => {
											const entryRange = getEntryDateRange(entry)
											return entryRange ? (
												<span className="whitespace-nowrap rounded-full bg-secondary/50 px-3 py-1 font-medium text-muted-foreground text-sm">
													{formatDateRange(entryRange, language, presentLabel)}
												</span>
											) : null
										})()}
									</div>

									<div className="relative space-y-10 border-border border-l-2 pl-6">
										{entry.roles.map((role) => (
											<div key={role.id} className="relative">
												{/* Timeline dot for role */}
												<div className="absolute top-2.5 -left-[29px] h-2 w-2 rounded-full border border-background bg-muted-foreground/50" />

												<div className="mb-3 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
													<h4 className="font-semibold text-lg">{role.title}</h4>
													<span className="whitespace-nowrap text-muted-foreground text-sm">
														{formatDateRange(role.period, language, presentLabel)}
													</span>
												</div>
												{Array.isArray(role.description) ? (
													<ul className="mb-4 list-disc space-y-1 pl-4 text-muted-foreground leading-relaxed">
														{role.description.map((item, i) => (
															// biome-ignore lint/suspicious/noArrayIndexKey: List is static and order doesn't change
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
								/* Single role entry */
								<div>
									<div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
										<div>
											<h3 className="flex flex-wrap items-center gap-3 font-bold text-xl">
												{entry.company}
												{ongoingBadge(entry)}
											</h3>
											<h4 className="mt-1 font-semibold text-lg text-muted-foreground">
												{entry.title}
											</h4>
										</div>
										{entry.period && (
											<span className="whitespace-nowrap rounded-full bg-secondary/50 px-3 py-1 font-medium text-muted-foreground text-sm">
												{formatDateRange(entry.period, language, presentLabel)}
											</span>
										)}
									</div>
									{Array.isArray(entry.description) ? (
										<ul className="mb-4 list-disc space-y-1 pl-4 text-muted-foreground leading-relaxed">
											{entry.description.map((item, i) => (
												// biome-ignore lint/suspicious/noArrayIndexKey: List is static and order doesn't change
												<li key={i}>{item}</li>
											))}
										</ul>
									) : (
										<p className="mb-4 text-muted-foreground leading-relaxed">
											{entry.description}
										</p>
									)}
									{entry.highlights && (
										<div className="flex flex-wrap gap-2">
											{entry.highlights.map((highlight) => (
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
	)
}
