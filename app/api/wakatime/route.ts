import { NextResponse } from "next/server"

async function fetchSummariesRange(apiKey: string) {
	const response = await fetch(`https://wakapi.dev/api/summary?interval=30_days`, {
		headers: {
			Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
		},
		next: { revalidate: 3600 },
	})
	return response
}

export async function GET() {
	const apiKey = process.env.WAKA_KEY

	if (!apiKey) {
		return NextResponse.json({ error: "WAKA_KEY is not defined" }, { status: 500 })
	}

	try {
		const response = await fetchSummariesRange(apiKey)

		if (!response.ok) {
			return NextResponse.json({ error: "Failed to fetch WakaTime stats" }, { status: 500 })
		}

		const data = await response.json()

		// Debug: Log the raw response to see the structure
		// console.log("Raw API Response:", JSON.stringify(data, null, 2))

		// Calculate total seconds from languages array
		const totalSeconds = (data.languages || []).reduce(
			(acc: number, lang: { total: number }) => acc + (lang.total || 0),
			0
		)

		// Language stats are already aggregated in the summary
		const languages = (data.languages || [])
			.map((lang: { key: string; total: number }) => ({
				name: lang.key,
				percent: totalSeconds > 0 ? (lang.total / totalSeconds) * 100 : 0,
				seconds: lang.total,
			}))
			.sort((a: { seconds: number }, b: { seconds: number }) => b.seconds - a.seconds)
			.filter((l: { percent: number }) => l.percent > 1)

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
