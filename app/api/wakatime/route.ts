import { NextResponse } from "next/server"

async function fetchSummariesRange(apiKey: string, start: string, end: string) {
	const response = await fetch(
		`https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${end}`,
		{
			headers: {
				Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
			},
			next: { revalidate: 3600 },
		}
	)
	return response
}

export async function GET() {
	const apiKey = process.env.WAKA_KEY

	if (!apiKey) {
		return NextResponse.json({ error: "WAKA_KEY is not defined" }, { status: 500 })
	}

	try {
		const now = new Date()
		const chunks = []

		// Break 30 days into 5 chunks of 6 days to avoid hitting limits per request
		// We want 30 days total: 0-29
		for (let i = 0; i < 30; i += 6) {
			const endDaysAgo = i
			const startDaysAgo = Math.min(i + 5, 29) // 6 day chunks: 0-5, 6-11, 12-17, 18-23, 24-29

			const endDate = new Date(now)
			endDate.setDate(now.getDate() - endDaysAgo)

			const startDate = new Date(now)
			startDate.setDate(now.getDate() - startDaysAgo)

			chunks.push({
				start: startDate.toISOString().split("T")[0],
				end: endDate.toISOString().split("T")[0],
			})
		}

		const responses = await Promise.all(
			chunks.map((chunk) => fetchSummariesRange(apiKey, chunk.start, chunk.end))
		)

		let combinedData: unknown[] = []
		let hasData = false

		for (const response of responses) {
			if (response.status === 402) {
				// Skip chunks that require premium
				continue
			}
			if (!response.ok) {
				continue
			}

			const data = await response.json()
			if (data.data && Array.isArray(data.data)) {
				combinedData = [...combinedData, ...data.data]
				hasData = true
			}
		}

		if (!hasData) {
			return NextResponse.json({ error: "Failed to fetch any data" }, { status: 500 })
		}

		// Deduplicate days just in case
		const uniqueDays = new Map()
		combinedData.forEach((day) => {
			if (day.range?.date) {
				uniqueDays.set(day.range.date, day)
			}
		})

		const allDays = Array.from(uniqueDays.values())

		const totalSeconds = allDays.reduce(
			(acc: number, day: { grand_total?: { total_seconds: number } }) =>
				acc + (day.grand_total?.total_seconds || 0),
			0
		)

		// Aggregate language stats
		const languageStats: Record<string, number> = {}
		allDays.forEach((day: { languages?: { name: string; total_seconds: number }[] }) => {
			if (Array.isArray(day.languages)) {
				day.languages.forEach((lang) => {
					languageStats[lang.name] = (languageStats[lang.name] || 0) + lang.total_seconds
				})
			}
		})

		const languages = Object.entries(languageStats)
			.map(([name, seconds]) => ({
				name,
				percent: totalSeconds > 0 ? (seconds / totalSeconds) * 100 : 0,
				seconds,
			}))
			.sort((a, b) => b.seconds - a.seconds)
			.filter((l) => l.percent > 1)

		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)

		return NextResponse.json({
			text: `${hours} hrs ${minutes} mins`,
			total_seconds: totalSeconds,
			languages,
			range: "last_30_days",
		})
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch WakaTime stats" }, { status: 500 })
	}
}
