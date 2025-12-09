import { NextResponse } from "next/server"

export async function GET() {
	const token = process.env.GITHUB

	if (!token) {
		return NextResponse.json({ error: "GITHUB token is not defined" }, { status: 500 })
	}

	try {
		// Fetch all workflow runs for the repository
		// We use the actions/runs endpoint to get the latest build status
		const response = await fetch(
			"https://api.github.com/repos/byrafael/rsrdev.com/actions/runs?per_page=1",
			{
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github+json",
				},
				next: { revalidate: 60 }, // Cache for 1 minute
			}
		)

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch workflow runs" },
				{ status: response.status }
			)
		}

		const data = await response.json()
		const latestRun = data.workflow_runs?.[0]

		if (!latestRun) {
			return NextResponse.json({ error: "No workflow runs found" }, { status: 404 })
		}

		return NextResponse.json({
			status: latestRun.status,
			conclusion: latestRun.conclusion,
			name: latestRun.name,
			url: latestRun.html_url,
			created_at: latestRun.created_at,
			updated_at: latestRun.updated_at,
			branch: latestRun.head_branch,
			commit_message: latestRun.head_commit?.message,
		})
	} catch (_error) {
		return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
	}
}
