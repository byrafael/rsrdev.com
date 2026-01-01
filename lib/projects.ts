import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"

const projectsDirectory = path.join(process.cwd(), "content/projects")

export interface ProjectData {
	slug: string
	title: string
	description: string
	date: string
	tags: string[]
	image: string
	content: string
	language: string
	github?: string
	demo?: string
	pinned?: boolean
	order?: number
}

export function getProjectSlugs() {
	if (!fs.existsSync(projectsDirectory)) {
		return []
	}
	return fs.readdirSync(projectsDirectory).filter((file) => {
		return (
			!file.startsWith(".") && // Ignore hidden directories
			fs.statSync(path.join(projectsDirectory, file)).isDirectory()
		)
	})
}

export function getProjectData(slug: string, language: "en" | "es" = "en"): ProjectData | null {
	const fullPath = path.join(projectsDirectory, slug, `${language}.md`)

	// Fallback logic could be added here, but for now we try to get the exact language
	// If it doesn't exist, we could fallback to 'en'
	let fileContents: string
	let usedLanguage = language

	if (fs.existsSync(fullPath)) {
		fileContents = fs.readFileSync(fullPath, "utf8")
	} else {
		const fallbackPath = path.join(projectsDirectory, slug, "en.md")
		if (fs.existsSync(fallbackPath)) {
			fileContents = fs.readFileSync(fallbackPath, "utf8")
			usedLanguage = "en"
		} else {
			return null
		}
	}

	const { data, content } = matter(fileContents)

	return {
		slug,
		content,
		language: usedLanguage,
		title: data.title || "",
		description: data.description || "",
		date: data.date || "",
		tags: data.tags || [],
		image: data.image || "",
		github: data.github,
		demo: data.demo,
		pinned: data.pinned || false,
		order: data.order || 99,
	}
}

export function getAllProjects(language: "en" | "es" = "en"): ProjectData[] {
	const slugs = getProjectSlugs()
	const projects = slugs
		.map((slug) => getProjectData(slug, language))
		.filter((project): project is ProjectData => project !== null)
		.sort((a, b) => {
			// 1. Pinned projects first, sorted by order
			if (a.pinned && !b.pinned) {
				return -1
			}
			if (!a.pinned && b.pinned) {
				return 1
			}

			// 2. If both are pinned, sort by order
			if (a.pinned && b.pinned) {
				const orderA = a.order ?? 99
				const orderB = b.order ?? 99
				if (orderA !== orderB) {
					return orderA - orderB
				}
			}

			// 3. If both are unpinned, but one or both have an explicit order, sort those next
			const aHasOrder = !a.pinned && typeof a.order === "number" && a.order !== 99
			const bHasOrder = !b.pinned && typeof b.order === "number" && b.order !== 99
			if (aHasOrder && !bHasOrder) {
				return -1
			}
			if (!aHasOrder && bHasOrder) {
				return 1
			}
			if (aHasOrder && bHasOrder) {
				const orderA = a.order ?? 99
				const orderB = b.order ?? 99
				if (orderA !== orderB) {
					return orderA - orderB
				}
			}

			// 4. Otherwise, sort by date (most recent first)
			return a.date > b.date ? -1 : 1
		})
	return projects
}
