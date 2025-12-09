/**
 * Experience data structure with sorting metadata
 * Separates data from translations for better maintainability
 */

import type { DateRange } from "./date-formatter"

export interface Role {
	id: string
	title: string
	period: DateRange
	description: string | string[]
	highlights: string[]
	sortDate: string // ISO date string for sorting (YYYY-MM-DD or YYYY-01-01)
}

export interface Experience {
	id: string
	company: string
	logo?: string
	title?: string
	period?: DateRange
	description?: string | string[]
	highlights?: string[]
	roles?: Role[]
	sortDate: string // ISO date string for sorting (YYYY-MM-DD or YYYY-01-01)
}

/**
 * Get the logo path for a company
 */
function getCompanyLogo(companyName: string): string {
	// Simple slugify to create a filename from the company name
	const slug = companyName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "")
	return `/logos/${slug}.png`
}

/**
 * Translation data structure for roles (matches structure in translations.ts)
 */
export interface TranslationRole {
	title: string
	period: DateRange
	description: string | string[]
	highlights: string[]
}

/**
 * Translation data structure for jobs/experiences (matches structure in translations.ts)
 */
export interface TranslationJob {
	title?: string
	company: string
	period?: DateRange
	description?: string | string[]
	highlights?: string[]
	roles?: TranslationRole[]
}

/**
 * Default fallback date for experiences without a period
 */
const DEFAULT_FALLBACK_DATE = "1900-01-01"

/**
 * Regex patterns for date parsing (cached for performance)
 */
const YEAR_ONLY_REGEX = /^\d{4}$/
const YEAR_MONTH_REGEX = /^\d{4}-\d{1,2}$/

/**
 * Parse a date string (YYYY or YYYY-MM) to an ISO date string for sorting
 */
function toSortDate(dateStr: string): string {
	// If it's just a year, use January 1st
	if (YEAR_ONLY_REGEX.test(dateStr)) {
		return `${dateStr}-01-01`
	}

	// If it's YYYY-MM, use the first day of that month
	if (YEAR_MONTH_REGEX.test(dateStr)) {
		const [year, month] = dateStr.split("-")
		const paddedMonth = month.padStart(2, "0")
		return `${year}-${paddedMonth}-01`
	}

	return dateStr
}

/**
 * Get the sort date for an experience based on its most recent role/period
 */
export function getExperienceSortDate(exp: Experience): string {
	// If it has roles, use the most recent role's start date
	if (exp.roles && exp.roles.length > 0) {
		// Find the most recent date (max) efficiently
		return exp.roles.reduce(
			(maxDate, role) => (role.sortDate > maxDate ? role.sortDate : maxDate),
			exp.roles[0].sortDate
		)
	}

	// Otherwise use the experience's own sort date
	return exp.sortDate
}

/**
 * Companies that should be pinned to the top of the experience list
 */
const PINNED_COMPANIES = ["Futuryze Consulting Group Ltd."]

/**
 * Sort experiences by date (most recent first)
 * Pinned companies will always appear at the top, regardless of date
 */
export function sortExperiencesByDate(experiences: Experience[]): Experience[] {
	return [...experiences].sort((a, b) => {
		// Check if either experience is pinned
		const aIsPinned = PINNED_COMPANIES.includes(a.company)
		const bIsPinned = PINNED_COMPANIES.includes(b.company)

		// If one is pinned and the other isn't, pinned comes first
		if (aIsPinned && !bIsPinned) {
			return -1
		}
		if (!aIsPinned && bIsPinned) {
			return 1
		}

		// If both are pinned or neither is pinned, sort by date
		const dateA = getExperienceSortDate(a)
		const dateB = getExperienceSortDate(b)
		return dateB.localeCompare(dateA) // Descending (most recent first)
	})
}

/**
 * Sort experiences by duration (longest first)
 */
export function sortExperiencesByDuration(experiences: Experience[]): Experience[] {
	const calculateDuration = (exp: Experience): number => {
		const getDuration = (start: string, end?: string): number => {
			const startDate = new Date(toSortDate(start))
			const endDate = end ? new Date(toSortDate(end)) : new Date()
			return endDate.getTime() - startDate.getTime()
		}

		if (exp.roles && exp.roles.length > 0) {
			// Sum all role durations
			return exp.roles.reduce((total, role) => {
				return total + getDuration(role.period.start, role.period.end)
			}, 0)
		}

		if (exp.period) {
			return getDuration(exp.period.start, exp.period.end)
		}

		return 0
	}

	return [...experiences].sort((a, b) => {
		return calculateDuration(b) - calculateDuration(a) // Descending (longest first)
	})
}

/**
 * Sort experiences by custom priority order (if provided in the data)
 */
export type SortStrategy = "date" | "duration" | "custom"

export function sortExperiences(
	experiences: Experience[],
	strategy: SortStrategy = "date"
): Experience[] {
	switch (strategy) {
		case "duration":
			return sortExperiencesByDuration(experiences)
		case "custom":
			// For custom sorting, maintain the original order
			return [...experiences]
		default:
			return sortExperiencesByDate(experiences)
	}
}

/**
 * Transform translation data to Experience objects with sorting metadata
 */
export function transformTranslationToExperiences(jobs: TranslationJob[]): Experience[] {
	return jobs.map((job, index) => {
		const exp: Experience = {
			id: `exp-${index}`,
			company: job.company,
			logo: getCompanyLogo(job.company),
			title: job.title,
			period: job.period,
			description: job.description,
			highlights: job.highlights,
			sortDate: job.period?.start ? toSortDate(job.period.start) : DEFAULT_FALLBACK_DATE,
		}

		// Handle roles if present
		if (job.roles) {
			exp.roles = job.roles.map((role: TranslationRole, roleIndex: number) => ({
				id: `role-${index}-${roleIndex}`,
				title: role.title,
				period: role.period,
				description: role.description,
				highlights: role.highlights,
				sortDate: toSortDate(role.period.start),
			}))

			// Sort roles within the experience by date (most recent first)
			exp.roles.sort((a, b) => b.sortDate.localeCompare(a.sortDate))
		}

		return exp
	})
}
