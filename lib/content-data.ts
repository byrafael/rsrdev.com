/**
 * Content data structures for Projects, Education, Certificates, and Research
 * Separates data from translations for better maintainability
 */

/**
 * ============================================================================
 * PROJECTS
 * ============================================================================
 */

export interface TranslationProject {
	title?: string
	description: string
	tags?: string[]
	source?: string
	preview?: string
}

export interface Project {
	id: string
	title?: string
	description: string
	tags: string[]
	source?: string
	preview?: string
	sortDate?: string // Optional: for future date-based sorting
}

export function transformTranslationToProjects(
	projects: TranslationProject[],
	defaultTitles: string[] = []
): Project[] {
	return projects.map((project, index) => ({
		id: `project-${index}`,
		title: project.title || defaultTitles[index] || `Project ${index + 1}`,
		description: project.description,
		tags: project.tags || [],
		source: project.source,
		preview: project.preview,
	}))
}

/**
 * ============================================================================
 * EDUCATION
 * ============================================================================
 */

export interface TranslationEducation {
	degree: string
	school: string
	year: string
	details?: string | string[]
}

export interface Education {
	id: string
	degree: string
	school: string
	year: string
	details?: string | string[]
	sortDate: string // ISO date string for sorting
}

/**
 * Parse year or year range to sortable date
 * Examples: "2025", "2025 - 2026", "2023 - 2024"
 */
function parseEducationYear(year: string): string {
	// Extract the last year in the range (most recent)
	const matches = year.match(/\d{4}/g)
	if (matches && matches.length > 0) {
		const lastYear = matches[matches.length - 1]
		return `${lastYear}-01-01`
	}
	return "1900-01-01" // fallback
}

export function transformTranslationToEducation(education: TranslationEducation[]): Education[] {
	return education.map((edu, index) => ({
		id: `edu-${index}`,
		degree: edu.degree,
		school: edu.school,
		year: edu.year,
		details: edu.details,
		sortDate: parseEducationYear(edu.year),
	}))
}

/**
 * Sort education by year (most recent first)
 */
export function sortEducationByDate(education: Education[]): Education[] {
	return [...education].sort((a, b) => b.sortDate.localeCompare(a.sortDate))
}

/**
 * ============================================================================
 * CERTIFICATES
 * ============================================================================
 */

export interface TranslationCertificate {
	title: string
	issuer: string
	year: string
	link?: string
	logo?: string
}

export interface Certificate {
	id: string
	title: string
	issuer: string
	year: string
	link?: string
	logo?: string
	sortDate: string // ISO date string for sorting
}

/**
 * Parse certificate year to sortable date
 */
function parseCertificateYear(year: string): string {
	const match = year.match(/\d{4}/)
	if (match) {
		return `${match[0]}-01-01`
	}
	return "1900-01-01" // fallback
}

export function transformTranslationToCertificates(
	certificates: TranslationCertificate[]
): Certificate[] {
	return certificates.map((cert, index) => ({
		id: `cert-${index}`,
		title: cert.title,
		issuer: cert.issuer,
		year: cert.year,
		link: cert.link,
		logo: cert.logo,
		sortDate: parseCertificateYear(cert.year),
	}))
}

/**
 * Sort certificates by year (most recent first)
 */
export function sortCertificatesByDate(certificates: Certificate[]): Certificate[] {
	return [...certificates].sort((a, b) => b.sortDate.localeCompare(a.sortDate))
}

/**
 * ============================================================================
 * RESEARCH / BLOG POSTS
 * ============================================================================
 */

export interface TranslationResearchPost {
	title: string
	excerpt: string
	date: string
	link: string
}

export interface ResearchPost {
	id: string
	title: string
	excerpt: string
	date: string
	link: string
	sortDate: string // ISO date string for sorting
}

/**
 * Parse research post date to sortable format
 * Handles formats like "Nov 15, 2024" or "2024-11-15"
 */
function parseResearchDate(dateStr: string): string {
	const date = new Date(dateStr)
	if (!Number.isNaN(date.getTime())) {
		return date.toISOString().split("T")[0]
	}
	return "1900-01-01" // fallback
}

export function transformTranslationToResearchPosts(
	posts: TranslationResearchPost[]
): ResearchPost[] {
	return posts.map((post, index) => ({
		id: `research-${index}`,
		title: post.title,
		excerpt: post.excerpt,
		date: post.date,
		link: post.link,
		sortDate: parseResearchDate(post.date),
	}))
}

/**
 * Sort research posts by date (most recent first)
 */
export function sortResearchByDate(posts: ResearchPost[]): ResearchPost[] {
	return [...posts].sort((a, b) => b.sortDate.localeCompare(a.sortDate))
}
