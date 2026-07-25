import { CommunityList } from "./community-list"

export default function CommunityPage() {
	return (
		<main className="flex flex-1 flex-col bg-background">
			<div className="grow pt-10 md:pt-20">
				<CommunityList />
			</div>
		</main>
	)
}
