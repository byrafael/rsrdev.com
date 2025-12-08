import Hero from "@/components/sections/hero"
import PinnedProjects from "@/components/sections/pinned-projects"
import WidgetsGrid from "@/components/sections/widgets-grid"
import { getAllProjects } from "@/lib/projects"

export default function NewHome() {
	const projectsEn = getAllProjects("en")
	const projectsEs = getAllProjects("es")

	return (
		<main className="flex-1 bg-background text-foreground">
			<Hero />
			<WidgetsGrid />
			<PinnedProjects projectsEn={projectsEn} projectsEs={projectsEs} />
		</main>
	)
}
