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
	let status = "issue"
	let uptime = "0%"

	const token = process.env.BETTERUPTIME
	if (!token) {
		errors.push({ source: "monitors", reason: "Missing BETTERUPTIME token" })
	} else {
		try {
			const res = await fetch("https://uptime.betterstack.com/api/v2/monitors", {
				headers: { Authorization: `Bearer ${token}` },
				cache: "no-store",
			})
			if (!res.ok) {
				errors.push({
					source: "monitors",
					reason: `HTTP ${res.status}`,
					status: res.status,
				})
			} else {
				const data = await res.json()
				const monitors = data.data || []
				// Treat paused monitors as up — they're intentionally offline, not degraded
				const upCount = monitors.filter(
					(m: any) => m.attributes?.status === "up" || m.attributes?.status === "paused",
				).length
				const downCount = monitors.filter((m: any) => m.attributes?.status === "down").length
				const totalCount = monitors.length

				if (downCount > 0) {
					status = "issue"
				} else if (upCount === totalCount && totalCount > 0) {
					status = "ok"
				} else if (totalCount > 0) {
					status = "degraded"
				}
			}
		} catch (err) {
			const msg = errorMessage(err)
			console.error("[ops/monitors] BetterStack fetch failed:", msg)
			errors.push({ source: "monitors", reason: msg })
		}
	}

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
		console.error("[ops/monitors] Status page fetch failed:", msg)
		errors.push({ source: "uptime", reason: msg })
	}

	return NextResponse.json({
		status,
		uptime,
		errors: errors.length > 0 ? errors : undefined,
	})
}
