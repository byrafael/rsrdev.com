import { NextResponse } from "next/server"

export async function GET() {
	const token = process.env.GITHUB

	if (!token) {
		return NextResponse.json({ error: "GITHUB token is not defined" }, { status: 500 })
	}

	try {
		const response = await fetch(
			"https://katib.jasoncameron.dev/v2/commits/latest?username=byrafael",
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
				cache: "no-store",
			}
		)

		if (!response.ok) {
			const _errorText = await response.text()
			return NextResponse.json({ error: "Failed to fetch commits" }, { status: response.status })
		}

		const data = await response.json()
		const commits = data.commits || []

		interface Commit {
			oid: string
			repo: string
			messageHeadline: string
			committedDate: string
			commitUrl: string
			additions: number
			deletions: number
		}

		const formattedCommits = commits.slice(0, 5).map((commit: Commit) => ({
			id: commit.oid,
			repo: commit.repo,
			message: commit.messageHeadline,
			date: new Date(commit.committedDate).toLocaleDateString(),
			url: commit.commitUrl,
			additions: commit.additions,
			deletions: commit.deletions,
		}))

		return NextResponse.json(formattedCommits)
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch GitHub commits" }, { status: 500 })
	}
}
