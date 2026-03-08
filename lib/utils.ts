import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getTagStyles(tag: string) {
	let hash = 0
	for (let i = 0; i < tag.length; i++) {
		hash = tag.charCodeAt(i) + ((hash << 5) - hash)
	}

	const hue = Math.abs(hash % 360)

	return {
		"--tag-hue": hue,
	} as React.CSSProperties
}

export function formatDate(dateString: string, locale: string = "en") {
	const date = new Date(dateString)

	if (locale === "es") {
		return date.toLocaleDateString("es-ES", {
			day: "numeric",
			month: "long",
			year: "numeric",
		})
	}

	const day = date.getDate()
	const month = date.toLocaleString("en-US", { month: "long" })
	const year = date.getFullYear()

	const suffix = (day: number) => {
		if (day > 3 && day < 21) {
			return "th"
		}
		switch (day % 10) {
			case 1:
				return "st"
			case 2:
				return "nd"
			case 3:
				return "rd"
			default:
				return "th"
		}
	}

	return `${month} ${day}${suffix(day)}, ${year}`
}

export function getProjectGithubUrl(github?: string | null) {
	if (!github) {
		return null
	}

	if (github.startsWith("http://") || github.startsWith("https://")) {
		return github
	}

	if (github.startsWith("github.com/")) {
		return `https://${github}`
	}

	return `https://github.com/${github.replace(/^\/+/, "")}`
}

export function getProjectDemoUrl(demo?: string | null) {
	if (!demo) {
		return null
	}

	if (demo.startsWith("http://") || demo.startsWith("https://")) {
		return demo
	}

	return `https://${demo.replace(/^\/+/, "")}`
}
