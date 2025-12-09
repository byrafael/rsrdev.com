"use client"

import { Check, Paintbrush, RotateCcw } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { useTranslation } from "@/hooks/use-translation"
import { cn } from "@/lib/utils"

const ACCENT_COLORS = [
	{ id: "purple", hue: "260", class: "bg-[oklch(0.65_0.2_260)]" },
	{ id: "blue", hue: "250", class: "bg-[oklch(0.65_0.2_250)]" },
	{ id: "cyan", hue: "200", class: "bg-[oklch(0.65_0.2_200)]" },
	{ id: "green", hue: "142", class: "bg-[oklch(0.65_0.2_142)]" },
	{ id: "orange", hue: "45", class: "bg-[oklch(0.65_0.2_45)]" },
	{ id: "red", hue: "25", class: "bg-[oklch(0.65_0.2_25)]" },
	{ id: "pink", hue: "340", class: "bg-[oklch(0.65_0.2_340)]" },
]

const BACKGROUND_PRESETS = [
	{ id: "white", hue: "0", chroma: "0" },
	{ id: "ocean", hue: "240", chroma: "0.02" },
	{ id: "forest", hue: "150", chroma: "0.02" },
	{ id: "rose", hue: "10", chroma: "0.02" },
	{ id: "slate", hue: "260", chroma: "0.02" },
]

export function ThemeCustomizer() {
	const [mounted, setMounted] = useState(false)
	const t = useTranslation()
	const [accentHue, setAccentHue] = useState("260")
	const [bgConfig, setBgConfig] = useState({ hue: "0", chroma: "0" })

	const updateAccent = useCallback((hue: string) => {
		const root = document.documentElement
		root.style.setProperty("--brand-accent-hue", hue)
	}, [])

	const updateBackground = useCallback((config: { hue: string; chroma: string }) => {
		const root = document.documentElement
		root.style.setProperty("--bg-hue", config.hue)
		root.style.setProperty("--bg-chroma", config.chroma)
	}, [])

	useEffect(() => {
		setMounted(true)
		// Load saved preferences
		const savedAccent = localStorage.getItem("theme-accent-hue")
		const savedBg = localStorage.getItem("theme-bg-config")

		if (savedAccent) {
			setAccentHue(savedAccent)
			updateAccent(savedAccent)
		}

		if (savedBg) {
			try {
				const config = JSON.parse(savedBg)
				setBgConfig(config)
				updateBackground(config)
			} catch (_e) {}
		}
	}, [updateAccent, updateBackground])

	const handleAccentChange = (hue: string) => {
		setAccentHue(hue)
		localStorage.setItem("theme-accent-hue", hue)
		updateAccent(hue)
	}

	const handleBgChange = (config: { hue: string; chroma: string }) => {
		setBgConfig(config)
		localStorage.setItem("theme-bg-config", JSON.stringify(config))
		updateBackground(config)
	}

	const resetTheme = () => {
		handleAccentChange("260")
		handleBgChange({ hue: "0", chroma: "0" })
	}

	if (!mounted) {
		return null
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="h-9 w-9 rounded-none border-none bg-transparent shadow-none transition-all duration-200 hover:bg-gray-100 active:scale-95 dark:hover:bg-zinc-800"
					title={t.floatingPills.customize}
				>
					<Paintbrush className="h-4 w-4 text-foreground" />
					<span className="sr-only">{t.floatingPills.customize}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="w-[calc(100vw-2rem)] max-w-xs sm:w-80"
				align="center"
				side="top"
				sideOffset={20}
			>
				<div className="grid gap-4">
					<div className="space-y-2">
						<p className="font-medium text-sm leading-none">{t.floatingPills.customize}</p>
					</div>
					<Separator />
					<div className="space-y-2">
						<Label>{t.floatingPills.accentColor}</Label>
						<div className="grid grid-cols-7 gap-2">
							{ACCENT_COLORS.map((color) => (
								<button
									type="button"
									key={color.id}
									onClick={() => handleAccentChange(color.hue)}
									className={cn(
										"flex h-8 w-8 items-center justify-center rounded-full border border-muted transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
										color.class,
										accentHue === color.hue && "ring-2 ring-ring ring-offset-2"
									)}
									title={t.floatingPills.colors[color.id as keyof typeof t.floatingPills.colors]}
								>
									{accentHue === color.hue && <Check className="h-4 w-4 text-white" />}
									<span className="sr-only">
										{t.floatingPills.colors[color.id as keyof typeof t.floatingPills.colors]}
									</span>
								</button>
							))}
						</div>
					</div>
					<div className="space-y-2">
						<Label>{t.floatingPills.backgroundTint}</Label>
						<div className="grid grid-cols-3 gap-2">
							{BACKGROUND_PRESETS.map((preset) => (
								<Button
									key={preset.id}
									variant="outline"
									size="sm"
									onClick={() => handleBgChange(preset)}
									className={cn(
										"justify-start transition-all dark:hover:text-foreground",
										bgConfig.hue === preset.hue &&
											bgConfig.chroma === preset.chroma &&
											"border-brand-accent bg-brand-accent/10 text-brand-accent ring-1 ring-brand-accent"
									)}
								>
									{t.floatingPills.tints[preset.id as keyof typeof t.floatingPills.tints]}
								</Button>
							))}
						</div>
					</div>
					<Separator />
					<Button variant="ghost" size="sm" className="w-full" onClick={resetTheme}>
						<RotateCcw className="mr-2 h-4 w-4" />
						{t.floatingPills.reset}
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}
