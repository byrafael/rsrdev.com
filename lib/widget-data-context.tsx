"use client"

import { createContext, type ReactNode, useContext, useEffect, useState } from "react"

interface WakaTimeData {
	text: string
	range: string
	languages: Array<{
		name: string
		percent: number
		seconds: number
	}>
}

interface WeatherData {
	temperature: number
	weatherCode: number
}

interface Commit {
	id: string
	url: string
	repo: string
	message: string
	additions?: number
	deletions?: number
}

interface BuildStatus {
	status: string
	conclusion: string | null
	branch: string
	updated_at: string
	name?: string
	url?: string
	commit_message?: string
}

interface OpsStats {
	connections: number
	ping: number
	status: string
	statusText?: string
	statusTextEs?: string
	uptime?: string
}

interface WidgetData {
	wakatime: WakaTimeData | null
	weather: WeatherData | null
	commits: Commit[] | null
	buildStatus: BuildStatus | null
	opsStats: OpsStats | null
	loading: {
		wakatime: boolean
		weather: boolean
		commits: boolean
		buildStatus: boolean
		opsStats: boolean
	}
}

const WidgetDataContext = createContext<WidgetData | undefined>(undefined)

export function WidgetDataProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<WidgetData>({
		wakatime: null,
		weather: null,
		commits: null,
		buildStatus: null,
		opsStats: null,
		loading: {
			wakatime: true,
			weather: true,
			commits: true,
			buildStatus: true,
			opsStats: true,
		},
	})

	useEffect(() => {
		// Fetch WakaTime data
		const fetchWakaTime = async () => {
			try {
				const response = await fetch("/api/wakatime")
				if (response.ok) {
					const wakatime = await response.json()
					setData((prev) => ({
						...prev,
						wakatime,
						loading: { ...prev.loading, wakatime: false },
					}))
				} else {
					setData((prev) => ({
						...prev,
						loading: { ...prev.loading, wakatime: false },
					}))
				}
			} catch (_error) {
				setData((prev) => ({
					...prev,
					loading: { ...prev.loading, wakatime: false },
				}))
			}
		}

		// Fetch Weather data
		const fetchWeather = async () => {
			try {
				const response = await fetch("/api/weather")
				if (response.ok) {
					const weather = await response.json()
					setData((prev) => ({
						...prev,
						weather,
						loading: { ...prev.loading, weather: false },
					}))
				} else {
					setData((prev) => ({
						...prev,
						loading: { ...prev.loading, weather: false },
					}))
				}
			} catch (_error) {
				setData((prev) => ({
					...prev,
					loading: { ...prev.loading, weather: false },
				}))
			}
		}

		// Fetch GitHub commits
		const fetchCommits = async () => {
			try {
				const response = await fetch("/api/github")
				if (response.ok) {
					const commits = await response.json()
					setData((prev) => ({
						...prev,
						commits,
						loading: { ...prev.loading, commits: false },
					}))
				} else {
					setData((prev) => ({
						...prev,
						loading: { ...prev.loading, commits: false },
					}))
				}
			} catch (_error) {
				setData((prev) => ({
					...prev,
					loading: { ...prev.loading, commits: false },
				}))
			}
		}

		// Fetch Build Status
		const fetchBuildStatus = async () => {
			try {
				const response = await fetch("/api/github/status")
				if (response.ok) {
					const buildStatus = await response.json()
					setData((prev) => ({
						...prev,
						buildStatus,
						loading: { ...prev.loading, buildStatus: false },
					}))
				} else {
					setData((prev) => ({
						...prev,
						loading: { ...prev.loading, buildStatus: false },
					}))
				}
			} catch (_error) {
				setData((prev) => ({
					...prev,
					loading: { ...prev.loading, buildStatus: false },
				}))
			}
		}

		// Fetch Ops Stats
		const fetchOpsStats = async () => {
			try {
				const response = await fetch("/api/ops/stats")
				if (response.ok) {
					const opsStats = await response.json()
					setData((prev) => ({
						...prev,
						opsStats,
						loading: { ...prev.loading, opsStats: false },
					}))
				} else {
					setData((prev) => ({
						...prev,
						loading: { ...prev.loading, opsStats: false },
					}))
				}
			} catch (_error) {
				setData((prev) => ({
					...prev,
					loading: { ...prev.loading, opsStats: false },
				}))
			}
		}

		// Fetch all data on mount
		fetchWakaTime()
		fetchWeather()
		fetchCommits()
		fetchBuildStatus()
		fetchOpsStats()
	}, [])

	return <WidgetDataContext.Provider value={data}>{children}</WidgetDataContext.Provider>
}

export function useWidgetData() {
	const context = useContext(WidgetDataContext)
	if (context === undefined) {
		throw new Error("useWidgetData must be used within a WidgetDataProvider")
	}
	return context
}
