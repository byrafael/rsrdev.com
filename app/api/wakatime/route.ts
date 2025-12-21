import { NextResponse } from "next/server"

// Fetch all stats from Hackatime
async function fetchHackatimeStats(apiKey: string) {
	const response = await fetch("https://hackatime.hackclub.com/api/v1/stats", {
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
		next: { revalidate: 3600 },
	})
	return response
}

export async function GET() {
	const apiKey = process.env.WAKA_KEY
	if (!apiKey) {
		return NextResponse.json({ error: "HACKATIME_KEY is not defined" }, { status: 500 })
	}
	try {
		const response = await fetchHackatimeStats(apiKey)
		if (!response.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch Hackatime stats", status: response.status },
				{ status: 500 },
			)
		}
		const data = await response.json()
		// Debug: log the data structure
		console.log("Hackatime raw data", data)

		// Example: try to extract total_seconds, languages, etc. from Hackatime data
		// Adjust this mapping as needed based on actual Hackatime response
		const totalSeconds = data.total_seconds || 0
		type Language = { name: string; percent?: number; total_seconds?: number }
		const languages = Array.isArray(data.languages)
			? (data.languages as Language[]).map((lang) => ({
					name: lang.name,
					percent: lang.percent || 0,
					seconds: lang.total_seconds || 0,
			  }))
			: []
		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)

		return NextResponse.json({
			text: `${hours} hrs ${minutes} mins`,
			total_seconds: totalSeconds,
			languages,
			range: data.range || "last_30_days",
			debug: data, // include raw data for debugging
		})
	} catch (error) {
		console.error("Hackatime API error", error)
		return NextResponse.json({ error: "Failed to fetch Hackatime stats" }, { status: 500 })
	}
}
