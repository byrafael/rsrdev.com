import { NextResponse } from "next/server"

export const revalidate = 300 // Cache for 5 minutes

interface FetchError {
	source: string
	reason: string
	status?: number
}

function errorMessage(err: unknown): string {
	if (err instanceof Error) return err.message
	return String(err)
}

export async function GET() {
	const errors: FetchError[] = []

	try {
		// Fetch CDN ops data (always public, lightweight)
		let opsData = { connections: 0, ping: 0 }
		try {
			const opsRes = await fetch("https://cdn.rsrdev.com/ops/core/status", {
				headers: {
					Accept: "application/json",
					"User-Agent": "rsrdev-ops-stats/1.0",
				},
				// Don't cache external CDN responses — a bad HTML response could get stuck
				cache: "no-store",
			})
			if (!opsRes.ok) {
				errors.push({ source: "cdn", reason: `HTTP ${opsRes.status}`, status: opsRes.status })
			} else {
				const contentType = opsRes.headers.get("content-type") || ""
				if (!contentType.includes("application/json")) {
					const body = await opsRes.text()
					const preview = body.slice(0, 120).replace(/\s+/g, " ")
					errors.push({
						source: "cdn",
						reason: `Expected JSON, got ${contentType || "unknown"} (body: ${preview})`,
						status: opsRes.status,
					})
				} else {
					opsData = await opsRes.json()
				}
			}
		} catch (err) {
			const msg = errorMessage(err)
			console.error("[ops/stats] CDN fetch failed:", msg)
			errors.push({ source: "cdn", reason: msg })
		}

		// Fetch BetterStack monitor status
		let upCount = 0
		let downCount = 0
		let totalCount = 0
		let status = "issue"
		const token = process.env.BETTERUPTIME

		if (!token) {
			errors.push({ source: "monitors", reason: "Missing BETTERUPTIME token" })
		} else {
			try {
				const monitorsRes = await fetch("https://uptime.betterstack.com/api/v2/monitors", {
					headers: { Authorization: `Bearer ${token}` },
					cache: "no-store",
				})
				if (!monitorsRes.ok) {
					errors.push({
						source: "monitors",
						reason: `HTTP ${monitorsRes.status}`,
						status: monitorsRes.status,
					})
				} else {
					const monitorsData = await monitorsRes.json()
					const monitors = monitorsData.data || []
					totalCount = monitors.length
					upCount = monitors.filter((m: any) => m.attributes?.status === "up").length
					downCount = monitors.filter((m: any) => m.attributes?.status === "down").length
				}
			} catch (err) {
				const msg = errorMessage(err)
				console.error("[ops/stats] BetterStack monitors fetch failed:", msg)
				errors.push({ source: "monitors", reason: msg })
			}
		}

		if (downCount > 0) {
			status = "issue"
		} else if (upCount === totalCount && totalCount > 0) {
			status = "ok"
		} else if (totalCount > 0) {
			status = "degraded"
		}

		// Scrape uptime percentage from status page
		let uptime = "0%"
		try {
			const pageRes = await fetch("https://status.rsrdev.com", {
				cache: "no-store",
			})
			if (!pageRes.ok) {
				errors.push({
					source: "uptime",
					reason: `HTTP ${pageRes.status}`,
					status: pageRes.status,
				})
			} else {
				const pageText = await pageRes.text()
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
		} catch (err) {
			const msg = errorMessage(err)
			console.error("[ops/stats] Status page fetch failed:", msg)
			errors.push({ source: "uptime", reason: msg })
		}

		return NextResponse.json({
			connections: opsData.connections,
			ping: opsData.ping,
			status,
			uptime,
			errors: errors.length > 0 ? errors : undefined,
		})
	} catch (err) {
		const msg = errorMessage(err)
		console.error("[ops/stats] Unhandled error:", msg)
		errors.push({ source: "general", reason: msg })
		return NextResponse.json(
			{ error: "Failed to fetch stats", details: errors },
			{ status: 500 },
		)
	}
}
