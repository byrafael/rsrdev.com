import Hero from "@/components/sections/hero"
import PinnedProjects from "@/components/sections/pinned-projects"
import WidgetsGrid from "@/components/sections/widgets-grid"
import { getAllProjects } from "@/lib/projects"
import { WidgetDataProvider } from "@/lib/widget-data-context"

export default function NewHome() {
	const projectsEn = getAllProjects("en")
	const projectsEs = getAllProjects("es")

	return (
		<WidgetDataProvider>
			<main className="flex-1 bg-background text-foreground">
				<Hero />
				<WidgetsGrid />
				<PinnedProjects projectsEn={projectsEn} projectsEs={projectsEs} />
			</main>
		</WidgetDataProvider>
	)
}
