import { getAllProjects } from "@/lib/projects"
import { ProjectList } from "./project-list"

export default function ProjectsPage() {
	const projectsEn = getAllProjects("en")
	const projectsEs = getAllProjects("es")

	return (
		<main className="flex flex-1 flex-col bg-background">
			<div className="grow pt-10 md:pt-20">
				<ProjectList projectsEn={projectsEn} projectsEs={projectsEs} />
			</div>
		</main>
	)
}
