import { NextResponse } from "next/server"

export async function GET() {
	const token = process.env.GITHUB

	if (!token) {
		return NextResponse.json({ error: "GITHUB token is not defined" }, { status: 500 })
	}

	try {
		const username = "byrafael"

		// Use GitHub's Commit Search API instead of events to guarantee 10 recent public commits 
		// (Events API truncates past 90 days and often merges commits in payloads).
		const searchResponse = await fetch(
			`https://api.github.com/search/commits?q=author:${username}&sort=author-date&order=desc&per_page=10`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github.v3+json",
				},
				cache: "no-store",
			}
		)

		if (!searchResponse.ok) {
			const _errorText = await searchResponse.text()
			return NextResponse.json(
				{ error: "Failed to search commits from GitHub" },
				{ status: searchResponse.status }
			)
		}

		const searchResult = await searchResponse.json()

		if (!searchResult.items || searchResult.items.length === 0) {
			return NextResponse.json([])
		}

		// Extract the 10 commits with tracking
		const commitMap = new Map<string, { repo: string; sha: string }>()

		for (const item of searchResult.items) {
			const sha = item.sha
			if (!commitMap.has(sha) && item.repository?.full_name) {
				commitMap.set(sha, {
					repo: item.repository.full_name,
					sha: sha,
				})
			}
			if (commitMap.size >= 10) {
				break
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
			.slice(0, 10)
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
