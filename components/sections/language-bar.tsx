"use client"

import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

interface Language {
	name: string
	percent: number
	seconds: number
}

const LANGUAGE_COLORS: Record<string, string> = {
	Python: "bg-[#3572A5]",
	TypeScript: "bg-[#3178C6]",
	JavaScript: "bg-[#F1E05A]",
	HTML: "bg-[#E34C26]",
	CSS: "bg-[#563D7C]",
	Rust: "bg-[#DEA584]",
	Go: "bg-[#00ADD8]",
	Java: "bg-[#B07219]",
	"C++": "bg-[#F34B7D]",
	C: "bg-[#555555]",
	Lua: "bg-[#000080]",
	SQL: "bg-[#e38c00]",
	React: "bg-[#61dafb]",
	Vue: "bg-[#42b883]",
	Svelte: "bg-[#ff3e00]",
	Shell: "bg-[#89e051]",
	Dockerfile: "bg-[#384d54]",
	Makefile: "bg-[#427819]",
	JSON: "bg-[#292929]",
	Markdown: "bg-[#083fa1]",
	YAML: "bg-[#cb171e]",
	TOML: "bg-[#9c4221]",
	XML: "bg-[#0060ac]",
	SVG: "bg-[#ff9900]",
	Git: "bg-[#f14e32]",
	"Jupyter Notebook": "bg-[#DA5B0B]",
}

const FALLBACK_COLORS = [
	"bg-emerald-500",
	"bg-indigo-500",
	"bg-pink-500",
	"bg-teal-500",
	"bg-violet-500",
	"bg-fuchsia-500",
]

export default function LanguageBar() {
	const t = useTranslation()
	const [languages, setLanguages] = useState<Language[]>([])
	const [loading, setLoading] = useState(true)
	const [range, setRange] = useState("last_30_days")

	useEffect(() => {
		fetch("/api/wakatime")
			.then((res) => res.json())
			.then((data) => {
				if (data.languages) {
					setLanguages(data.languages)
				}
				if (data.range) {
					setRange(data.range)
				}
			})
			.catch((_err) => {})
			.finally(() => setLoading(false))
	}, [])

	if (loading) {
		return <div className="h-2 w-full animate-pulse rounded-full bg-muted" />
	}

	if (languages.length === 0) {
		return (
			<div className="mt-8 w-full text-center text-muted-foreground text-xs">
				{t.wakatime.noData}
			</div>
		)
	}

	const rangeLabel = range === "last_30_days" ? t.wakatime.last30Days : t.wakatime.last7Days

	return (
		<div className="mt-8 w-full space-y-3">
			<div className="flex items-center justify-between text-muted-foreground text-xs">
				<span className="font-medium">
					{t.wakatime.mostUsedLanguages} ({rangeLabel})
				</span>
			</div>
			<div className="flex h-2.5 w-full overflow-hidden rounded-full bg-muted/30">
				<TooltipProvider>
					{languages.map((lang, index) => {
						const colorClass =
							LANGUAGE_COLORS[lang.name] || FALLBACK_COLORS[index % FALLBACK_COLORS.length]
						return (
							<Tooltip key={lang.name} delayDuration={0}>
								<TooltipTrigger asChild>
									<div
										className={cn("h-full transition-all hover:opacity-80", colorClass)}
										style={{ width: `${lang.percent}%` }}
									/>
								</TooltipTrigger>
								<TooltipContent
									className="border-border bg-popover p-2 shadow-lg"
									showArrow={false}
								>
									<div className="flex items-center gap-2">
										<div className={cn("h-2 w-2 rounded-full", colorClass)} />
										<div className="flex flex-col">
											<span className="font-bold text-popover-foreground text-xs">{lang.name}</span>
											<span className="text-[10px] text-muted-foreground">
												{lang.percent.toFixed(1)}%
											</span>
										</div>
									</div>
								</TooltipContent>
							</Tooltip>
						)
					})}
				</TooltipProvider>
			</div>
		</div>
	)
}
