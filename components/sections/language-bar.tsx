"use client"

import { motion } from "framer-motion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"
import { useWidgetData } from "@/lib/widget-data-context"

const LANGUAGE_COLORS: Record<string, string> = {
	Python: "#3572A5",
	TypeScript: "#3178C6",
	JavaScript: "#F1E05A",
	HTML: "#E34C26",
	CSS: "#563D7C",
	Rust: "#DEA584",
	Go: "#00ADD8",
	Java: "#B07219",
	"C++": "#F34B7D",
	C: "#555555",
	Lua: "#000080",
	SQL: "#e38c00",
	React: "#61dafb",
	Vue: "#42b883",
	Svelte: "#ff3e00",
	Shell: "#89e051",
	Dockerfile: "#384d54",
	Makefile: "#427819",
	JSON: "#292929",
	Markdown: "#083fa1",
	YAML: "#cb171e",
	TOML: "#9c4221",
	XML: "#0060ac",
	SVG: "#ff9900",
	Git: "#f14e32",
	"Jupyter Notebook": "#DA5B0B",
}

const FALLBACK_COLORS = [
	"#10b981", // emerald-500
	"#6366f1", // indigo-500
	"#ec4899", // pink-500
	"#14b8a6", // teal-500
	"#8b5cf6", // violet-500
	"#d946ef", // fuchsia-500
]

export default function LanguageBar() {
	const t = useTranslation()
	const { wakatime, loading } = useWidgetData()

	const languages = wakatime?.languages || []
	const range = wakatime?.range || "last_30_days"
	const totalTime = wakatime?.text

	if (loading.wakatime) {
		return (
			<div className="mt-12 w-full space-y-4 rounded-xl border bg-card/50 p-6">
				<div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
				<div className="h-3 w-full animate-pulse rounded-full bg-muted" />
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
					{[...Array(4)].map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: Skeleton loader
						<div key={i} className="h-8 w-full animate-pulse rounded bg-muted" />
					))}
				</div>
			</div>
		)
	}

	if (languages.length === 0) {
		return null
	}

	const rangeLabel = range === "last_30_days" ? t.wakatime.last30Days : t.wakatime.last7Days

	const getColor = (name: string, index: number) => {
		return LANGUAGE_COLORS[name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mt-12 space-y-6 rounded-xl border bg-card/50 p-6 backdrop-blur-sm"
		>
			<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
				<h3 className="font-semibold text-sm tracking-tight">{t.wakatime.mostUsedLanguages}</h3>
				<div className="flex items-center gap-2 text-muted-foreground text-xs">
					<span>{rangeLabel}</span>
					{totalTime && (
						<>
							<span>•</span>
							<span>{totalTime}</span>
						</>
					)}
				</div>
			</div>

			{/* The Bar */}
			<div className="flex h-4 w-full overflow-hidden rounded-full bg-muted/20">
				<TooltipProvider>
					{languages.map((lang, index) => {
						const color = getColor(lang.name, index)
						return (
							<Tooltip key={lang.name} delayDuration={0}>
								<TooltipTrigger asChild>
									<motion.div
										initial={{ width: 0 }}
										animate={{ width: `${lang.percent}%` }}
										transition={{
											duration: 1,
											delay: index * 0.1,
											ease: "easeOut",
										}}
										className="h-full transition-all hover:opacity-80"
										style={{ backgroundColor: color }}
									/>
								</TooltipTrigger>
								<TooltipContent
									className="border-border bg-popover p-2 shadow-lg"
									showArrow={false}
								>
									<div className="flex items-center gap-2">
										<div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
										<div className="flex flex-col">
											<span className="font-bold text-popover-foreground text-xs">{lang.name}</span>
											<span className="text-[10px] text-muted-foreground">
												{lang.percent.toFixed(1)}%
												{lang.seconds && (
													<span className="ml-1 opacity-70">
														({Math.round(lang.seconds / 3600)}h)
													</span>
												)}
											</span>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						)
					})}
				</TooltipProvider>
			</div>
		</motion.div>
	)
}
