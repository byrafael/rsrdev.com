"use client"

import { Briefcase, ExternalLink } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortExperiences,
	type TranslationJob,
	transformTranslationToExperiences,
} from "@/lib/experience-data"

interface Employer {
	id: string
	name: string
	shortName: string
	logo: string
	isCurrent: boolean
	role: string
	period: string
	description: string[]
	highlights: string[]
}

function formatShortPeriod(start: string, end: string | undefined, presentLabel: string): string {
	// Extract year from start date (handles "2025", "2025-07", "2025-07-01")
	const startYear = start.split("-")[0]

	if (!end) {
		// Current role - show "2025 - Present"
		return `${startYear} - ${presentLabel}`
	}

	// Past role - show just the year range
	const endYear = end.split("-")[0]
	if (startYear === endYear) {
		return startYear
	}
	return `${startYear} - ${endYear}`
}

function getCompanyLogo(companyName: string): string {
	const slug = companyName
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "")
	return `/logos/${slug}.png`
}

function getShortName(companyName: string): string {
	const normalizedName = companyName.trim().replace(/\s+/g, " ")
	if (!normalizedName) {
		return normalizedName
	}

	const normalizeToken = (token: string) => token.toLowerCase().replace(/[^a-z0-9]/g, "")
	const getTokenInitial = (token: string) => {
		const match = token.match(/[A-Za-z0-9]/)
		return match?.[0]?.toUpperCase() ?? ""
	}

	const STOPWORDS = new Set([
		"a",
		"an",
		"and",
		"at",
		"de",
		"del",
		"for",
		"in",
		"la",
		"of",
		"on",
		"the",
		"to",
		"y",
	])

	const LEGAL_SUFFIXES = new Set([
		"co",
		"corp",
		"corporation",
		"inc",
		"incorporated",
		"llc",
		"ltd",
		"limited",
		"plc",
	])

	const GENERIC_TAIL_WORDS = new Set([
		"agency",
		"associates",
		"consulting",
		"company",
		"group",
		"holdings",
		"partners",
		"services",
		"solutions",
		"studio",
		"studios",
	])

	const EDUCATION_TAIL_WORDS = new Set(["academy", "college", "institute", "school", "university"])

	const titleizeStopwords = (tokens: string[]) =>
		tokens.map((token, index) => {
			const normalized = normalizeToken(token)
			const isMiddle = index > 0 && index < tokens.length - 1
			if (isMiddle && STOPWORDS.has(normalized)) {
				return token.toLowerCase()
			}
			return token
		})

	const originalTokens = normalizedName.split(" ").filter(Boolean)
	if (originalTokens.length <= 1) {
		return normalizedName
	}

	const tokens = [...originalTokens]

	// Strip legal suffixes at the end (Ltd., Inc., LLC, ...)
	while (tokens.length > 1 && LEGAL_SUFFIXES.has(normalizeToken(tokens[tokens.length - 1]))) {
		tokens.pop()
	}

	// Strip education-type tails (e.g., "International School" -> drop both)
	if (tokens.length > 1 && EDUCATION_TAIL_WORDS.has(normalizeToken(tokens[tokens.length - 1]))) {
		tokens.pop()
		if (tokens.length > 1 && normalizeToken(tokens[tokens.length - 1]) === "international") {
			tokens.pop()
		}
	}

	// Strip generic company descriptor tails (e.g., "Consulting Group" -> drop both)
	while (tokens.length > 1 && GENERIC_TAIL_WORDS.has(normalizeToken(tokens[tokens.length - 1]))) {
		tokens.pop()
	}

	if (tokens.length === 1) {
		return tokens[0]
	}

	const hasStopwords = tokens.some((t) => STOPWORDS.has(normalizeToken(t)))
	const formatted = titleizeStopwords(tokens).join(" ")

	// Acronymize longer, multi-word names without stopwords (e.g., "Global Youth Congress" -> "GYC")
	if (tokens.length >= 3 && !hasStopwords && formatted.length > 18) {
		const acronym = tokens.map(getTokenInitial).filter(Boolean).join("").slice(0, 5)
		return acronym || formatted
	}

	return formatted
}

function EmployerItem({ employer }: { employer: Employer }) {
	const t = useTranslation()

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					type="button"
					className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 transition-all duration-200 cursor-pointer ${
						employer.isCurrent
							? "bg-secondary/60 hover:bg-secondary"
							: "bg-muted/40 opacity-60 hover:bg-muted/70 hover:opacity-100"
					}`}
				>
					<div className="relative shrink-0">
						<Avatar className={`h-6 w-6 bg-background ${employer.isCurrent ? "" : "grayscale"}`}>
							<AvatarImage src={employer.logo} alt={employer.name} className="object-cover" />
							<AvatarFallback className="font-bold text-[10px]">
								{employer.shortName.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex flex-col">
						<span className="font-medium text-foreground text-xs leading-tight">
							{employer.shortName}
						</span>
						<span className="text-[10px] text-muted-foreground leading-tight">
							{employer.period}
						</span>
					</div>
				</button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-80 p-0">
				<div className="p-4">
					<div className="mb-3 flex items-start gap-3">
						<Avatar className="h-12 w-12 border bg-background">
							<AvatarImage src={employer.logo} alt={employer.name} className="object-cover" />
							<AvatarFallback className="font-bold text-xs">
								{employer.shortName.substring(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
						<div className="min-w-0 flex-1">
							<p className="font-semibold text-sm">{employer.name}</p>
							<div className="mt-1 flex items-center gap-1.5 text-muted-foreground text-xs">
								<Briefcase className="h-3 w-3 shrink-0" />
								<span className="truncate">{employer.role}</span>
							</div>
						</div>
					</div>

					{/* Description bullets */}
					<div className="mb-3">
						<ul className="space-y-1.5">
							{employer.description.slice(0, 2).map((item) => (
								<li key={item} className="flex gap-2 text-muted-foreground text-xs leading-relaxed">
									<span className="mt-1 text-brand-accent">•</span>
									<span>{item}</span>
								</li>
							))}
						</ul>
					</div>

					{/* Highlights */}
					<div className="flex flex-wrap gap-1.5">
						{employer.highlights.slice(0, 4).map((highlight) => (
							<span
								key={highlight}
								className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 font-medium text-[10px] text-secondary-foreground"
							>
								{highlight}
							</span>
						))}
					</div>
				</div>

				<div className="border-t bg-muted/30 px-4 py-3">
					<Link
						href={`/experience#${employer.id}`}
						className="flex items-center justify-center gap-2 font-medium text-foreground text-xs transition-colors hover:text-brand-accent"
					>
						<span>
							{(t.experience as { viewFull?: string }).viewFull || "View full experience"}
						</span>
						<ExternalLink className="h-3 w-3" />
					</Link>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default function EmployerBar() {
	const t = useTranslation()

	// Transform and sort using the same logic as experience list
	const rawJobs = t.experience.jobs as unknown as TranslationJob[]
	const experiences = transformTranslationToExperiences(rawJobs)
	const sortedExperiences = sortExperiences(experiences, "date")

	// Deduplicate by company - keep only the first (most recent) occurrence
	const seenCompanies = new Set<string>()
	const uniqueExperiences = sortedExperiences.filter((exp) => {
		if (seenCompanies.has(exp.company)) {
			return false
		}
		seenCompanies.add(exp.company)
		return true
	})

	// Map to employer format - limit to 4
	const employers: Employer[] = uniqueExperiences.slice(0, 4).map((exp) => {
		const id = exp.company.toLowerCase().replace(/[^a-z0-9]+/g, "-")
		const shortName = getShortName(exp.company)

		// Handle multi-role companies (use most recent role)
		if (exp.roles && exp.roles.length > 0) {
			const currentRole = exp.roles[0] // Already sorted by date descending
			const isCurrent = !currentRole.period.end
			// Use short year format for trigger
			const period = formatShortPeriod(
				currentRole.period.start,
				currentRole.period.end,
				t.experience.present
			)
			const description = Array.isArray(currentRole.description)
				? currentRole.description
				: [currentRole.description]

			return {
				id,
				name: exp.company,
				shortName,
				logo: exp.logo || getCompanyLogo(exp.company),
				isCurrent,
				role: currentRole.title,
				period,
				description,
				highlights: currentRole.highlights,
			}
		}

		// Handle single-role companies
		const isCurrent = !exp.period?.end
		// Use short year format for trigger
		const period = exp.period
			? formatShortPeriod(exp.period.start, exp.period.end, t.experience.present)
			: ""
		const description = exp.description
			? Array.isArray(exp.description)
				? exp.description
				: [exp.description]
			: []

		return {
			id,
			name: exp.company,
			shortName,
			logo: exp.logo || getCompanyLogo(exp.company),
			isCurrent,
			role: exp.title || "",
			period,
			description,
			highlights: exp.highlights || [],
		}
	})

	return (
		<div className="flex flex-wrap items-center gap-1.5">
			{employers.map((employer) => (
				<EmployerItem key={employer.id} employer={employer} />
			))}
		</div>
	)
}
