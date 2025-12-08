import { notFound } from "next/navigation"
import { getProjectData } from "@/lib/projects"
import { ProjectContent } from "./project-content"

interface ProjectPageProps {
	params: Promise<{
		slug: string
	}>
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const { slug } = await params
	const projectEn = getProjectData(slug, "en")
	const projectEs = getProjectData(slug, "es")

	if (!projectEn && !projectEs) {
		notFound()
	}

	return (
		<main className="flex flex-1 flex-col bg-background">
			<div className="grow pt-20">
				<ProjectContent projectEn={projectEn} projectEs={projectEs} />
			</div>
		</main>
	)
}
