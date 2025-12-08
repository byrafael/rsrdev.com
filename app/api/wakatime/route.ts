import { NextResponse } from "next/server"

export async function GET() {
	const apiKey = process.env.WAKA_KEY

	if (!apiKey) {
		return NextResponse.json({ error: "WAKA_KEY is not defined" }, { status: 500 })
	}

	try {
		const now = new Date()
		const sevenDaysAgo = new Date(now)
		sevenDaysAgo.setDate(now.getDate() - 7)

		const today = now.toISOString().split("T")[0]
		const start = sevenDaysAgo.toISOString().split("T")[0]

		const response = await fetch(
			`https://wakatime.com/api/v1/users/current/summaries?start=${start}&end=${today}`,
			{
				headers: {
					Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
				},
				next: { revalidate: 3600 },
			}
		)

		if (!response.ok) {
			return NextResponse.json(
				{ error: `WakaTime API error: ${response.status}` },
				{ status: response.status }
			)
		}

		const data = await response.json()

		const totalSeconds = data.data.reduce(
			(acc: number, day: { grand_total: { total_seconds: number } }) =>
				acc + day.grand_total.total_seconds,
			0
		)

		const hours = Math.floor(totalSeconds / 3600)
		const minutes = Math.floor((totalSeconds % 3600) / 60)

		return NextResponse.json({
			text: `${hours} hrs ${minutes} mins`,
			total_seconds: totalSeconds,
		})
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch WakaTime stats" }, { status: 500 })
	}
}
