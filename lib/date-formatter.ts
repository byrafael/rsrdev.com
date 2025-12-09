/**
 * Date formatting utilities for localizing date ranges
 */

export interface DateRange {
	start: string // Format: "YYYY-MM" or "YYYY"
	end?: string // Format: "YYYY-MM" or "YYYY" or undefined for "Present"
}

/**
 * Normalize date string to ISO format for comparison (YYYY-MM-DD)
 * Handles both "YYYY" and "YYYY-MM" formats
 * @param dateStr - Date string in format "YYYY" or "YYYY-MM"
 * @returns Normalized date string in ISO format (YYYY-MM-DD)
 */
export function normalizeDate(dateStr: string): string {
	// If it's just a year, use January 1st
	if (/^\d{4}$/.test(dateStr)) {
		return `${dateStr}-01-01`
	}

	// If it's YYYY-MM, use the first day of that month
	if (/^\d{4}-\d{1,2}$/.test(dateStr)) {
		const [year, month] = dateStr.split("-")
		const paddedMonth = month.padStart(2, "0")
		return `${year}-${paddedMonth}-01`
	}

	return dateStr
}

const MONTH_NAMES = {
	en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
}

/**
 * Formats a date string (YYYY-MM or YYYY) according to the locale
 * @param dateStr - Date string in format "YYYY" or "YYYY-MM" (e.g., "2025" or "2025-11")
 * @param locale - Language locale, either "en" for English or "es" for Spanish
 * @returns Formatted date string (e.g., "2025" or "Nov 2025")
 */
function formatDate(dateStr: string, locale: "en" | "es"): string {
	// Check if it's just a year
	if (dateStr.match(/^\d{4}$/)) {
		return dateStr
	}

	// Parse YYYY-MM format
	const match = dateStr.match(/^(\d{4})-(\d{1,2})$/)
	if (match) {
		const year = match[1]
		const monthIndex = parseInt(match[2], 10) - 1

		// Validate month is in valid range (0-11 after subtracting 1)
		if (monthIndex < 0 || monthIndex > 11) {
			return dateStr // Return original if invalid
		}

		const monthName = MONTH_NAMES[locale][monthIndex]
		return `${monthName} ${year}`
	}

	return dateStr
}

/**
 * Parses a date string to a Date object
 * @param dateStr - Date string in format "YYYY" or "YYYY-MM"
 * @returns Date object (defaults to January for year-only dates)
 */
function parseDate(dateStr: string): Date {
	const yearMatch = dateStr.match(/^(\d{4})$/)
	if (yearMatch) {
		return new Date(parseInt(yearMatch[1], 10), 0, 1) // January 1st of the year
	}

	const yearMonthMatch = dateStr.match(/^(\d{4})-(\d{1,2})$/)
	if (yearMonthMatch) {
		const year = parseInt(yearMonthMatch[1], 10)
		const monthNum = parseInt(yearMonthMatch[2], 10)

		// Validate month is in range 1-12
		if (monthNum < 1 || monthNum > 12) {
			return new Date(year, 0, 1) // Default to January if invalid
		}

		return new Date(year, monthNum - 1, 1)
	}

	return new Date()
}

/**
 * Calculates the duration between two dates
 * @param start - Start date string
 * @param end - End date string (optional, uses current date if not provided)
 * @param locale - Language locale
 * @returns Formatted duration string (e.g., "1 yr 2 mos" or "1 año 2 meses")
 */
function calculateDuration(start: string, end: string | undefined, locale: "en" | "es"): string {
	const startDate = parseDate(start)
	let endDate: Date

	if (end) {
		// If end is just a year, assume it means "through the end of the year" (December)
		if (/^\d{4}$/.test(end)) {
			endDate = new Date(parseInt(end, 10), 11, 1) // December 1st
		} else {
			endDate = parseDate(end)
		}
	} else {
		endDate = new Date()
	}

	// Calculate total months difference
	let totalMonths =
		(endDate.getFullYear() - startDate.getFullYear()) * 12 +
		(endDate.getMonth() - startDate.getMonth())

	// Add 1 month to make it inclusive (e.g., Jan to Jan is 1 month of work)
	totalMonths += 1

	// Handle negative duration (shouldn't happen with valid data)
	if (totalMonths < 1) {
		totalMonths = 1
	}

	const years = Math.floor(totalMonths / 12)
	const months = totalMonths % 12

	const parts: string[] = []

	if (years > 0) {
		if (locale === "es") {
			parts.push(years === 1 ? "1 año" : `${years} años`)
		} else {
			parts.push(years === 1 ? "1 yr" : `${years} yrs`)
		}
	}

	if (months > 0) {
		if (locale === "es") {
			parts.push(months === 1 ? "1 mes" : `${months} meses`)
		} else {
			parts.push(months === 1 ? "1 mo" : `${months} mos`)
		}
	}

	// If both are 0, show "1 mo" / "1 mes"
	if (parts.length === 0) {
		return locale === "es" ? "1 mes" : "1 mo"
	}

	return parts.join(" ")
}

/**
 * Formats a date range according to the locale with duration
 */
export function formatDateRange(
	range: DateRange,
	locale: "en" | "es",
	presentLabel: string
): string {
	const startFormatted = formatDate(range.start, locale)
	const duration = calculateDuration(range.start, range.end, locale)

	if (!range.end) {
		return `${startFormatted} – ${presentLabel} • ${duration}`
	}

	if (range.start === range.end) {
		return `${startFormatted} • ${duration}`
	}

	const endFormatted = formatDate(range.end, locale)
	return `${startFormatted} – ${endFormatted} • ${duration}`
}
