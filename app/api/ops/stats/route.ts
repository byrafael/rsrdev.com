import { NextResponse } from "next/server"

export async function GET() {
	try {
		const [opsResponse, betterStackResponse] = await Promise.all([
			fetch("https://cdn.rsrdev.com/ops/core/status", {
				next: { revalidate: 60 },
			}),
			fetch("https://rsrdev.betteruptime.com", {
				next: { revalidate: 60 },
			}),
		])

		let opsData = { connections: 0, ping: 0 }
		if (opsResponse.ok) {
			opsData = await opsResponse.json()
		}

		let status = "issue"
		let statusText = "System issues detected"
		let uptime = "0%"

		if (betterStackResponse.ok) {
			const text = await betterStackResponse.text()
			if (text.includes("All services are online")) {
				status = "ok"
				statusText = "All systems operational"
			} else {
				// Try to extract the actual status message from the H1 tag
				const h1Match = text.match(/<h1[^>]*class='[^']*heading-large[^']*'[^>]*>(.*?)<\/h1>/)
				if (h1Match?.[1]) {
					statusText = h1Match[1].trim()
				}
			}

			// Extract uptime percentages
			const uptimeRegex = /(\d{1,3}\.\d+)% uptime/g
			let match: RegExpExecArray | null
			let totalUptime = 0
			let count = 0
			// biome-ignore lint/suspicious/noAssignInExpressions: regex loop
			while ((match = uptimeRegex.exec(text)) !== null) {
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
			uptime,
		})
	} catch (_error) {
		return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
	}
}
