import { EducationList } from "./education-list"

export default function EducationPage() {
	return (
		<main className="flex flex-1 flex-col bg-background">
			<div className="grow pt-20">
				<EducationList />
			</div>
		</main>
	)
}
