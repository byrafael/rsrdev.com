"use client"

import createGlobe from "cobe"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import {
	Activity,
	Clock,
	Cloud,
	CloudMoon,
	CloudRain,
	CloudSun,
	ExternalLink,
	Github,
	Info,
	MapPin,
	Moon,
	Snowflake,
	Sun,
	Thermometer,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
// import { fetchGithubCommits, fetchWakaTimeStats, fetchWeatherData } from "@/app/actions/widget-data"
import Container from "@/components/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { useWidgetData } from "@/lib/widget-data-context"

interface WidgetProps {
	className?: string
}

// WakaTime Widget
function WakaTimeWidget({ className }: WidgetProps) {
	const t = useTranslation()
	const { wakatime, loading } = useWidgetData()

	const hours = wakatime?.text || "0hrs 0mins" // "37hrs 19mins"
	const range = wakatime?.range || "last_30_days"
	const rangeLabel = range === "last_30_days" ? t.wakatime.last30Days : t.wakatime.last7Days

	return (
		<Card className={cn("flex h-full flex-col", className)}>
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 font-medium text-sm">
					<Clock className="h-4 w-4" /> {t.widgets.codingTime}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col items-center justify-center">
				{loading.wakatime ? (
					<div className="h-8 w-24 animate-pulse rounded bg-muted" />
				) : (
					<>
						<div className="font-bold text-2xl">{hours}</div>
						<p className="mt-1 text-muted-foreground text-xs">{rangeLabel}</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}

// Location Widget with Globe
function LocationWidget({ className }: WidgetProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const pointerInteracting = useRef<number | null>(null)
	const pointerInteractionMovement = useRef(0)
	const [time, setTime] = useState<string>("")
	const [isNight, setIsNight] = useState(false)
	const { weather: weatherData } = useWidgetData()
	const weather = weatherData
		? { temp: weatherData.temperature, code: weatherData.weatherCode }
		: null
	const phi = useRef(0)

	useEffect(() => {
		// Time
		const updateTime = () => {
			const now = new Date()
			const crTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Costa_Rica" }))
			const hour = crTime.getHours()
			setIsNight(hour >= 17 || hour < 5)

			setTime(
				now.toLocaleTimeString("en-US", {
					hour: "numeric",
					minute: "2-digit",
					hour12: false,
					timeZone: "America/Costa_Rica",
				})
			)
		}
		updateTime()
		const timer = setInterval(updateTime, 1000)

		// Globe
		// biome-ignore lint/suspicious/noExplicitAny: cobe types
		let globe: any

		if (!canvasRef.current) {
			return
		}

		const onResize = () => {
			if (globe) {
				globe.destroy()
			}

			if (!canvasRef.current) {
				return
			}

			// Use offsetWidth/Height for better accuracy or fallback to a default
			const width = canvasRef.current.offsetWidth || 200
			const height = canvasRef.current.offsetHeight || 200

			globe = createGlobe(canvasRef.current, {
				devicePixelRatio: 2,
				width: width * 2,
				height: height * 2,
				phi: 0,
				theta: 0.25,
				dark: 1,
				diffuse: 1.2,
				mapSamples: 16000,
				mapBrightness: 6,
				baseColor: [0.3, 0.3, 0.3],
				markerColor: [0.1, 0.8, 1],
				glowColor: [1, 1, 1],
				markers: [{ location: [9.9281, -84.0907], size: 0.1 }],
				onRender: (state) => {
					// Called on every animation frame.
					if (!pointerInteracting.current) {
						phi.current += 0.005
					}
					state.phi = phi.current + pointerInteractionMovement.current
				},
			})
		}

		// Initial resize with a slight delay to ensure layout is computed
		const timeoutId = setTimeout(onResize, 100)

		const resizeObserver = new ResizeObserver(() => {
			// Debounce resize
			if (globe) {
				globe.destroy()
			}
			onResize()
		})
		resizeObserver.observe(canvasRef.current)

		return () => {
			clearInterval(timer)
			clearTimeout(timeoutId)
			if (globe) {
				globe.destroy()
			}
			resizeObserver.disconnect()
		}
	}, [])

	const getWeatherIcon = (code: number) => {
		if (isNight) {
			if (code <= 1) {
				return <Moon className="h-4 w-4 text-blue-200" />
			}
			if (code <= 3) {
				return <CloudMoon className="h-4 w-4 text-blue-200" />
			}
		}

		if (code <= 1) {
			return <Sun className="h-4 w-4 text-yellow-500" />
		}
		if (code <= 3) {
			return <CloudSun className="h-4 w-4 text-yellow-500" />
		}
		if (code <= 48) {
			return <Cloud className="h-4 w-4 text-gray-400" />
		}
		if (code <= 67) {
			return <CloudRain className="h-4 w-4 text-blue-400" />
		}
		if (code <= 77) {
			return <Snowflake className="h-4 w-4 text-white" />
		}
		return <Cloud className="h-4 w-4 text-gray-400" />
	}

	const getWeatherLabel = (code: number) => {
		if (code <= 1) {
			return "Clear"
		}
		if (code <= 3) {
			return "Partly Cloudy"
		}
		if (code <= 48) {
			return "Cloudy"
		}
		if (code <= 67) {
			return "Rain"
		}
		if (code <= 77) {
			return "Snow"
		}
		return "Cloudy"
	}

	const getTemperatureColor = (temp: number) => {
		if (temp < 15) {
			return "text-blue-500"
		}
		if (temp < 22) {
			return "text-green-500"
		}
		if (temp < 28) {
			return "text-orange-500"
		}
		return "text-red-500"
	}

	return (
		<Card className={cn("relative flex h-full flex-row gap-0 overflow-hidden p-0", className)}>
			<div className="relative aspect-square h-3/4 shrink-0 self-center overflow-hidden md:h-full">
				<div className="absolute inset-0 h-full w-full">
					<canvas
						ref={canvasRef}
						style={{ width: "100%", height: "100%", cursor: "grab" }}
						className="opacity-100"
						onPointerDown={(e) => {
							pointerInteracting.current = e.clientX - pointerInteractionMovement.current
							if (canvasRef.current) {
								canvasRef.current.style.cursor = "grabbing"
							}
						}}
						onPointerUp={() => {
							pointerInteracting.current = null
							if (canvasRef.current) {
								canvasRef.current.style.cursor = "grab"
							}
						}}
						onPointerOut={() => {
							pointerInteracting.current = null
							if (canvasRef.current) {
								canvasRef.current.style.cursor = "grab"
							}
						}}
						onMouseMove={(e) => {
							if (pointerInteracting.current !== null) {
								const delta = e.clientX - pointerInteracting.current
								pointerInteractionMovement.current = delta
							}
						}}
						onTouchMove={(e) => {
							if (pointerInteracting.current !== null && e.touches[0]) {
								const delta = e.touches[0].clientX - pointerInteracting.current
								pointerInteractionMovement.current = delta
							}
						}}
					/>
				</div>
			</div>
			<div className="flex flex-1 flex-col justify-center gap-4 bg-card p-4 font-mono">
				<div className="flex items-center gap-2 font-bold text-xs">
					<MapPin className="h-4 w-4 shrink-0 text-red-500" />
					<span className="hidden sm:inline md:hidden lg:inline">San José, Costa Rica</span>
					<span className="inline sm:hidden md:inline lg:hidden">San José, CR</span>
				</div>
				<div className="flex items-center gap-2 font-bold text-xs tabular-nums">
					{isNight ? (
						<Moon className="h-4 w-4 text-blue-200" />
					) : (
						<Sun className="h-4 w-4 text-yellow-500" />
					)}
					{time}
				</div>
				{weather && (
					<div className="flex flex-col gap-4">
						<div className="flex items-center gap-2 font-bold text-xs">
							<Thermometer className={cn("h-4 w-4", getTemperatureColor(weather.temp))} />
							<span>{weather.temp}°C</span>
						</div>
						<div className="flex items-center gap-2 font-bold text-xs">
							{getWeatherIcon(weather.code)}
							<span>{getWeatherLabel(weather.code)}</span>
						</div>
					</div>
				)}
			</div>
		</Card>
	)
}

// GitHub Widget
function GithubWidget({ className }: WidgetProps) {
	const t = useTranslation()
	const { commits, loading } = useWidgetData()
	const commitsList = commits || []

	return (
		<Card className={cn("flex h-full flex-col", className)}>
			<div className="flex h-full flex-col px-4">
				<div className="mb-4 flex items-center justify-between">
					<h3 className="flex items-center gap-2 font-semibold text-sm">
						<Activity className="h-4 w-4 text-primary" />
						<span>{t.widgets.recentCommits}</span>
					</h3>
					<div className="flex items-center gap-2">
						<a
							href="https://github.com/byrafael"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground transition-colors hover:text-primary"
						>
							<Github className="h-4 w-4" />
							<span className="sr-only">{t.social.github}</span>
						</a>
						<Popover>
							<PopoverTrigger asChild>
								<button
									type="button"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									<Info className="h-4 w-4" />
									<span className="sr-only">Info</span>
								</button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-2 text-xs" align="end">
								<p>
									{t.widgets.inspiredBy}{" "}
									<a
										href="https://jasoncameron.dev"
										target="_blank"
										rel="noopener noreferrer"
										className="underline hover:text-primary"
									>
										Jason Cameron
									</a>
									.
								</p>
							</PopoverContent>
						</Popover>
					</div>
				</div>

				{loading.commits ? (
					<div className="space-y-3">
						{[1, 2, 3, 4, 5].map((i) => (
							<div key={i} className="h-6 animate-pulse rounded-md bg-muted/50" />
						))}
					</div>
				) : commitsList.length > 0 ? (
					<ul className="flex-1 space-y-2 text-sm">
						{commitsList.slice(0, 5).map((commit) => (
							<li key={commit.id}>
								<a
									href={commit.url}
									target="_blank"
									rel="noopener noreferrer"
									className="group flex items-center gap-2.5"
									title={`${commit.repo}: ${commit.message}`}
								>
									<span className="shrink-0 rounded bg-muted/50 px-1.5 py-0.5 font-medium text-foreground/80 text-xs transition-colors group-hover:text-primary">
										{commit.repo.includes("/") ? commit.repo.split("/")[1] : commit.repo}
									</span>
									<span className="flex-1 truncate text-muted-foreground text-xs transition-colors group-hover:text-foreground">
										{commit.message}
									</span>
									{commit.additions !== undefined && commit.deletions !== undefined && (
										<span className="shrink-0 whitespace-nowrap font-mono text-[10px] opacity-70 transition-opacity group-hover:opacity-100">
											<span className="text-green-500">+{commit.additions}</span>
											<span className="mx-1 text-muted-foreground">/</span>
											<span className="text-red-500">-{commit.deletions}</span>
										</span>
									)}
								</a>
							</li>
						))}
					</ul>
				) : (
					<div className="flex flex-1 items-center justify-center text-muted-foreground text-sm italic">
						{t.widgets.noCommits}
					</div>
				)}
			</div>
		</Card>
	)
}

// Build Status Widget
function BuildStatusWidget({ className }: WidgetProps) {
	const t = useTranslation()
	const { language } = useLanguage()
	const { buildStatus, loading } = useWidgetData()
	const status = buildStatus

	const isSuccess = status?.conclusion === "success"
	const isFailure = status?.conclusion === "failure"
	const isInProgress = status?.status === "in_progress" || status?.status === "queued"

	return (
		<Card className={cn("flex h-full flex-col", className)}>
			<CardHeader className="pb-2">
				<CardTitle className="flex items-center gap-2 font-medium text-sm">
					<Activity className="h-4 w-4" /> {t.widgets.latestBuild}
				</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col items-center justify-center pt-2">
				{loading.buildStatus ? (
					<div className="flex flex-col items-center gap-3">
						<div className="h-4 w-4 animate-pulse rounded-full bg-muted" />
						<div className="h-3 w-32 animate-pulse rounded bg-muted" />
					</div>
				) : status ? (
					<div className="flex w-full flex-col items-center gap-3">
						<div className="relative flex">
							{isInProgress && (
								<span className="absolute -inset-1 inline-flex h-6 w-6 animate-ping rounded-full bg-yellow-400 opacity-75" />
							)}
							<div
								className={cn(
									"h-4 w-4 rounded-full",
									isSuccess ? "bg-green-500" : isFailure ? "bg-red-500" : "bg-yellow-500"
								)}
							/>
						</div>

						<div className="flex flex-col items-center gap-1.5">
							<a
								href={status.url}
								target="_blank"
								rel="noopener noreferrer"
								className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
							>
								{status.name || "unknown-build"}
							</a>

							<div className="flex flex-col gap-0.5 text-center">
								<span className="text-muted-foreground/60 text-[11px]">
									{formatDistanceToNow(new Date(status.updated_at), {
										addSuffix: true,
										locale: language === "es" ? es : undefined,
									})}
								</span>
							</div>
						</div>
					</div>
				) : (
					<div className="text-muted-foreground text-sm">No build data</div>
				)}
			</CardContent>
		</Card>
	)
}

// Uptime Widget
function UptimeWidget({ className }: WidgetProps) {
	const t = useTranslation()
	const { language } = useLanguage()
	const { opsStats, loading } = useWidgetData()
	const stats = opsStats

	// Default to "ok" when no data yet so the widget doesn't flash red on load
	const status = stats?.status ?? "ok"
	const isOperational = status === "ok"
	const isDegraded = status === "degraded"
	const isDown = status === "issue"

	const pulseColor = isOperational
		? "bg-green-400"
		: isDegraded
			? "bg-amber-400"
			: "bg-red-400"
	const dotColor = isOperational
		? "bg-green-500"
		: isDegraded
			? "bg-amber-500"
			: "bg-red-500"

	const statusLabel =
		(language === "es" ? stats?.statusTextEs : stats?.statusText) ||
		stats?.statusText ||
		(isOperational
			? t.widgets.allSystemsOperational
			: isDegraded
				? t.widgets.someSystemsDegraded
				: t.widgets.systemIssuesDetected)

	return (
		<Card className={cn("flex h-full flex-col", className)}>
			<CardHeader className="pb-2">
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center gap-2 font-medium text-sm">
						<Activity className="h-4 w-4" /> {t.widgets.systemStatus}
					</CardTitle>
					<div className="flex items-center gap-2">
						<a
							href="https://status.rsrdev.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-muted-foreground transition-colors hover:text-primary"
						>
							<ExternalLink className="h-4 w-4" />
							<span className="sr-only">{t.widgets.viewStatus}</span>
						</a>
						<Popover>
							<PopoverTrigger asChild>
								<button
									type="button"
									className="text-muted-foreground transition-colors hover:text-primary"
								>
									<Info className="h-4 w-4" />
									<span className="sr-only">Info</span>
								</button>
							</PopoverTrigger>
							<PopoverContent className="w-auto max-w-[220px] p-2 text-xs" align="end">
								<p>
									{t.widgets.poweredBy}{" "}
									<a
										href="https://betterstack.com/uptime"
										target="_blank"
										rel="noopener noreferrer"
										className="underline hover:text-primary"
									>
										BetterStack
									</a>
									.
								</p>
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex flex-1 flex-col justify-between gap-4">
				<div className="flex items-center gap-2">
					<div className="relative flex h-3 w-3">
						<span
							className={cn(
								"absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
								pulseColor
							)}
						/>
						<span
							className={cn(
								"relative inline-flex h-3 w-3 rounded-full",
								dotColor
							)}
						/>
					</div>
					<span className="font-medium text-sm">{statusLabel}</span>
				</div>

				<div className="grid grid-cols-3 gap-4">
					<div className="flex flex-col gap-1">
						<span className="text-muted-foreground text-xs">{t.widgets.connections}</span>
						{loading.opsStats ? (
							<div className="h-6 w-16 animate-pulse rounded bg-muted" />
						) : (
							<span className="font-bold text-xl">{stats?.connections || 0}</span>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-muted-foreground text-xs">{t.widgets.latency}</span>
						{loading.opsStats ? (
							<div className="h-6 w-16 animate-pulse rounded bg-muted" />
						) : (
							<TooltipProvider delayDuration={100}>
								<Tooltip>
									<TooltipTrigger asChild>
										<span className="decoration-foreground/30 cursor-help font-bold text-xl underline decoration-dashed underline-offset-4">
											{stats?.ping || 0}ms
										</span>
									</TooltipTrigger>
									<TooltipContent
										side="top"
										sideOffset={6}
										showArrow={false}
										className="max-w-[220px] border bg-popover text-center text-popover-foreground"
									>
										<p>{t.widgets.latencyTooltip}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						)}
					</div>
					<div className="flex flex-col gap-1">
						<span className="text-muted-foreground text-xs">{t.widgets.uptime}</span>
						{loading.opsStats ? (
							<div className="h-6 w-16 animate-pulse rounded bg-muted" />
						) : (
							<a
								href="https://status.rsrdev.com/"
								target="_blank"
								rel="noopener noreferrer"
								className="font-bold text-xl transition-colors hover:text-primary"
							>
								{stats?.uptime ? `${Number.parseFloat(stats.uptime).toFixed(2)}%` : t.widgets.viewStatus}
							</a>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}

export default function WidgetsGrid() {
	const gridRef = useRef<HTMLDivElement>(null)
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		if (!isMounted) {
			return
		}

		// biome-ignore lint/suspicious/noExplicitAny: packery types
		let pckry: any
		// biome-ignore lint/suspicious/noExplicitAny: draggabilly types
		const draggie: any[] = []

		const initPackery = async () => {
			if (!gridRef.current) {
				return
			}

			// Dynamic import to avoid SSR issues
			const Packery = (await import("packery")).default
			const Draggabilly = (await import("draggabilly")).default

			pckry = new Packery(gridRef.current, {
				itemSelector: ".grid-item",
				columnWidth: ".grid-sizer",
				percentPosition: true,
				gutter: 0,
			})

			// Initialize Draggabilly for each item
			const gridItems = gridRef.current.querySelectorAll(".grid-item")
			gridItems.forEach((item) => {
				const d = new Draggabilly(item)
				draggie.push(d)
				pckry.bindDraggabillyEvents(d)
			})
		}

		initPackery()

		return () => {
			if (pckry) {
				pckry.destroy()
			}
			draggie.forEach((d) => {
				d.destroy()
			})
		}
	})

	if (!isMounted) {
		return null
	}

	return (
		<section className="py-8 md:py-16">
			<Container>
				<div ref={gridRef} className="-m-2 min-h-[400px] w-full">
					{/* Grid Sizer for Packery - 25% width (4 columns) */}
					<div className="grid-sizer w-full md:w-1/4" />

					{/* Widgets */}
					{/* WakaTime - 1 unit */}
					<div className="grid-item mb-0 h-[236px] w-full p-2 md:w-1/4">
						<WakaTimeWidget />
					</div>

					{/* Location - 2 units */}
					<div className="grid-item mb-0 h-[236px] w-full p-2 md:w-1/2">
						<LocationWidget />
					</div>

					{/* Build Status - 1 unit */}
					<div className="grid-item mb-0 h-[236px] w-full p-2 md:w-1/4">
						<BuildStatusWidget />
					</div>

					{/* GitHub - 2 units */}
					<div className="grid-item mb-0 h-59 w-full p-2 md:w-1/2">
						<GithubWidget />
					</div>

					{/* Uptime - 2 units */}
					<div className="grid-item mb-0 h-59 w-full p-2 md:w-1/2">
						<UptimeWidget />
					</div>
				</div>
			</Container>
		</section>
	)
}
