import { NextResponse } from "next/server"

export async function GET() {
	const token = process.env.GITHUB

	if (!token) {
		return NextResponse.json({ error: "GITHUB token is not defined" }, { status: 500 })
	}

	try {
		const username = "byrafael"

		// Get recent events from the user
		const eventsResponse = await fetch(
			`https://api.github.com/users/${username}/events/public?per_page=100`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github.v3+json",
				},
				cache: "no-store",
			}
		)

		if (!eventsResponse.ok) {
			const _errorText = await eventsResponse.text()
			return NextResponse.json(
				{ error: "Failed to fetch events from GitHub" },
				{ status: eventsResponse.status }
			)
		}

		const events = await eventsResponse.json()

		// Extract unique commits from push events
		const commitMap = new Map<string, { repo: string; sha: string }>()

		for (const event of events) {
			if (event.type === "PushEvent" && event.payload?.head) {
				const sha = event.payload.head
				if (!commitMap.has(sha)) {
					commitMap.set(sha, {
						repo: event.repo.name,
						sha: sha,
					})
				}
				if (commitMap.size >= 10) {
					break
				}
			}
		}

		if (commitMap.size === 0) {
			return NextResponse.json([])
		}

		// Fetch detailed commit information with stats
		const commitPromises = Array.from(commitMap.values()).map(({ repo, sha }) =>
			fetch(`https://api.github.com/repos/${repo}/commits/${sha}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github.v3+json",
				},
				cache: "no-store",
			})
				.then((res) => res.json())
				.then((data) => ({ ...data, repoName: repo }))
				.catch((_err) => {
					return null
				})
		)

		const commitDetails = await Promise.all(commitPromises)

		interface GitHubCommit {
			sha: string
			commit: {
				message: string
				author: {
					date: string
				}
			}
			html_url: string
			stats: {
				additions: number
				deletions: number
				total: number
			}
			repoName: string
		}

		const formattedCommits = commitDetails
			.filter((commit): commit is GitHubCommit => commit?.sha)
			.slice(0, 5)
			.map((commit) => ({
				id: commit.sha,
				repo: commit.repoName.split("/")[1] || commit.repoName,
				message: commit.commit.message.split("\n")[0],
				date: new Date(commit.commit.author.date).toLocaleDateString(),
				url: commit.html_url,
				additions: commit.stats?.additions || 0,
				deletions: commit.stats?.deletions || 0,
			}))

		return NextResponse.json(formattedCommits)
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch GitHub commits" }, { status: 500 })
	}
}
