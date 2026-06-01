import { NextResponse } from "next/server"

export const revalidate = 300 // Cache for 5 minutes

async function fetchWithLog(
	url: string,
	init?: RequestInit,
	label?: string
): Promise<Response | null> {
	try {
		const res = await fetch(url, init)
		console.log(`[api/ops/stats] ${label || url} — status: ${res.status} ${res.statusText}`)
		return res
	} catch (err) {
		console.error(`[api/ops/stats] ${label || url} — fetch error:`, err)
		return null
	}
}

export async function GET() {
	const token = process.env.BETTERUPTIME
	if (!token) {
		console.error("[api/ops/stats] Missing BETTERUPTIME env var")
		return NextResponse.json({ error: "Missing BETTERUPTIME token" }, { status: 500 })
	}

	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), 25000)

	const [opsResponse, monitorsResponse, betterStackPageResponse] = await Promise.all([
		fetchWithLog("https://cdn.rsrdev.com/ops/core/status", { signal: controller.signal }, "ops/core/status"),
		fetchWithLog("https://uptime.betterstack.com/api/v2/monitors", {
			headers: { Authorization: `Bearer ${token}` },
			signal: controller.signal,
		}, "betterstack/monitors"),
		fetchWithLog("https://status.rsrdev.com", { signal: controller.signal }, "status page"),
	])
	clearTimeout(timeoutId)

	let opsData = { connections: 0, ping: 0 }
	if (opsResponse?.ok) {
		try {
			opsData = await opsResponse.json()
		} catch (err) {
			console.error("[api/ops/stats] ops JSON parse error:", err)
		}
	}

	let status: "ok" | "degraded" | "issue" = "issue"
	let uptime = "0%"

	if (monitorsResponse?.ok) {
		try {
			const monitorsData = await monitorsResponse.json()
			const monitors = monitorsData.data || []
			const totalCount = monitors.length
			const upCount = monitors.filter((m: any) => m.attributes?.status === "up").length
			const downCount = monitors.filter((m: any) => m.attributes?.status === "down").length

			if (downCount > 0) {
				status = "issue"
			} else if (upCount === totalCount && totalCount > 0) {
				status = "ok"
			} else if (totalCount > 0) {
				status = "degraded"
			}
		} catch (err) {
			console.error("[api/ops/stats] monitors JSON parse error:", err)
		}
	}

	if (betterStackPageResponse?.ok) {
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
}
