import { ExperienceList } from "./experience-list"

export default function ExperiencePage() {
	return (
		<main className="flex flex-1 flex-col bg-background">
			<div className="grow pt-10 md:pt-20">
				<ExperienceList />
			</div>
		</main>
	)
}
