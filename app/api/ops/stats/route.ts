import { NextResponse } from "next/server"

export const revalidate = 300 // Cache for 5 minutes

export async function GET() {
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 25000)

	try {
		const token = process.env.BETTERUPTIME
		if (!token) {
			return NextResponse.json({ error: "Missing BETTERUPTIME token" }, { status: 500 })
		}

		const [opsResponse, monitorsResponse, betterStackPageResponse] = await Promise.all([
			fetch("https://cdn.rsrdev.com/ops/core/status", {
				next: { revalidate: 300 },
				signal: controller.signal,
			}),
			fetch("https://uptime.betterstack.com/api/v2/monitors", {
				headers: { Authorization: `Bearer ${token}` },
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
			try {
				opsData = await opsResponse.json()
			} catch {
				opsData = { connections: 0, ping: 0 }
			}
		}

		let upCount = 0
		let downCount = 0
		let totalCount = 0
		let status = "issue"
		let uptime = "0%"

		if (monitorsResponse.ok) {
			try {
				const monitorsData = await monitorsResponse.json()
				const monitors = monitorsData.data || []
				totalCount = monitors.length
				upCount = monitors.filter((m: any) => m.attributes?.status === "up").length
				downCount = monitors.filter((m: any) => m.attributes?.status === "down").length

				if (downCount > 0) {
					status = "issue"
				} else if (upCount === totalCount && totalCount > 0) {
					status = "ok"
				} else if (totalCount > 0) {
					status = "degraded"
				}
			} catch {
				/* ignore malformed monitor response */
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
			uptime,
		})
	} catch (error) {
		console.error("[api/ops/stats] Failed to fetch stats:", error)
		return NextResponse.json(
			{ error: "Failed to fetch stats", details: error instanceof Error ? error.message : String(error) },
			{ status: 500 }
		)
	}
}
