import { CredentialsList } from "./credentials-list"

export default function CredentialsPage() {
	return (
		<main className="flex flex-1 flex-col bg-background">
			<div className="grow pt-20">
				<CredentialsList />
			</div>
		</main>
	)
}
