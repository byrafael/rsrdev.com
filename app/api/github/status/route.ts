import { NextResponse } from "next/server"

export async function GET() {
	const token = process.env.GITHUB

	if (!token) {
		return NextResponse.json({ error: "GITHUB token is not defined" }, { status: 500 })
	}

	try {
		// Fetch both workflow runs and deployments to get the truest "latest build"
		const [runsResponse, deploymentsResponse] = await Promise.all([
			fetch("https://api.github.com/repos/byrafael/rsrdev.com/actions/runs?per_page=1", {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github+json",
				},
				next: { revalidate: 60 },
			}),
			fetch("https://api.github.com/repos/byrafael/rsrdev.com/deployments?per_page=1", {
				headers: {
					Authorization: `Bearer ${token}`,
					Accept: "application/vnd.github+json",
				},
				next: { revalidate: 60 },
			}),
		])

		if (!runsResponse.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch workflow runs" },
				{ status: runsResponse.status }
			)
		}

		const runsData = await runsResponse.json()
		const latestRun = runsData.workflow_runs?.[0]

		let latestDeployment = null
		if (deploymentsResponse.ok) {
			const deploymentsData = await deploymentsResponse.json()
			if (deploymentsData?.[0]) {
				const dep = deploymentsData[0]
				// Fetch the status of this deployment to get conclusion and timestamps
				const statusResponse = await fetch(dep.statuses_url, {
					headers: {
						Authorization: `Bearer ${token}`,
						Accept: "application/vnd.github+json",
					},
					next: { revalidate: 60 },
				})
				if (statusResponse.ok) {
					const statuses = await statusResponse.json()
					latestDeployment = {
						...dep,
						latest_status: statuses[0],
					}
				}
			}
		}

		// Determine which one is actually the latest
		const runTime = latestRun ? new Date(latestRun.updated_at).getTime() : 0
		const depTime = latestDeployment?.latest_status
			? new Date(latestDeployment.latest_status.created_at).getTime()
			: 0

		if (latestDeployment && depTime > runTime) {
			// Format deployment as a "build"
			const status = latestDeployment.latest_status
			return NextResponse.json({
				status: status.state === "success" ? "completed" : "in_progress",
				conclusion: status.state,
				name: `rsrdev.com/vercel-${latestDeployment.environment.toLowerCase()}`,
				url: status.target_url || latestDeployment.url,
				created_at: latestDeployment.created_at,
				updated_at: status.created_at,
				branch: latestDeployment.ref,
				commit_message: latestDeployment.ref,
			})
		}

		if (!latestRun) {
			return NextResponse.json({ error: "No activity found" }, { status: 404 })
		}

		const formattedRunName = latestRun.name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "")

		return NextResponse.json({
			status: latestRun.status,
			conclusion: latestRun.conclusion,
			name: `rsrdev.com/${formattedRunName}`,
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
