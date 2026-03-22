import { translate } from "google-translate-api-x"
import { NextResponse } from "next/server"

export const revalidate = 300 // Cache for 5 minutes

export async function GET() {
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 25000)

	try {
		const [opsResponse, betterStackOverviewResponse, betterStackPageResponse] = await Promise.all([
			fetch("https://cdn.rsrdev.com/ops/core/status", {
				next: { revalidate: 300 },
				signal: controller.signal,
			}),
			fetch("https://status.rsrdev.com/overview", {
				next: { revalidate: 300 },
				signal: controller.signal,
			}),
			fetch("https://status.rsrdev.com", {
				next: { revalidate: 300 },
				signal: controller.signal,
			}),
		])
		clearTimeout(timeoutId)

		let opsData = { connections: 0, ping: 0 }
		if (opsResponse.ok) {
			opsData = await opsResponse.json()
		}

		let status = "issue"
		let statusText: string | undefined
		let statusTextEs: string | undefined
		let uptime = "0%"

		if (betterStackOverviewResponse.ok) {
			const overviewText = await betterStackOverviewResponse.text()
			if (overviewText.includes("All services are online")) {
				status = "ok"
			} else {
				// Try to extract the actual status message from the H1 tag
				const h1Match = overviewText.match(/<h1[^>]*class='[^']*heading-large[^']*'[^>]*>(.*?)<\/h1>/)
				if (h1Match?.[1]) {
					statusText = h1Match[1].trim()
					try {
						const res = await translate(statusText, { to: "es" })
						statusTextEs = res.text
					} catch (_e) {}
				}
			}
		}

		if (betterStackPageResponse.ok) {
			const pageText = await betterStackPageResponse.text()

			// Match both "100% uptime" and "99.995% uptime".
			const uptimeRegex = /(\d{1,3}(?:\.\d+)?)% uptime/g
			let match: RegExpExecArray | null
			let totalUptime = 0
			let count = 0
			// biome-ignore lint/suspicious/noAssignInExpressions: regex loop
			while ((match = uptimeRegex.exec(pageText)) !== null) {
				totalUptime += parseFloat(match[1])
				count++
			}

			if (count > 0) {
				uptime = `${(totalUptime / count).toFixed(3)}%`
			}
		}

		return NextResponse.json({
			connections: opsData.connections,
			ping: opsData.ping,
			status,
			statusText,
			statusTextEs,
			uptime,
		})
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
	}
}
