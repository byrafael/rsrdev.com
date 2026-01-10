"use client"

import { X } from "lucide-react"
import Image from "next/image"
import * as React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useIsMobile } from "@/hooks/use-mobile"
import { useTranslation } from "@/hooks/use-translation"
import { type DateRange, formatDateRange } from "@/lib/date-formatter"
import {
	type Experience,
	sortExperiencesByDate,
	transformTranslationToExperiences,
} from "@/lib/experience-data"
import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

export default function ExperienceTimeline() {
	const t = useTranslation()
	const { language } = useLanguage()

	const experiences = React.useMemo(() => {
		// @ts-expect-error - The structure matches but TS might complain about deep types
		const rawExperiences = transformTranslationToExperiences(t.experience.jobs)
		return sortExperiencesByDate(rawExperiences).slice(0, 5)
	}, [t.experience.jobs])

	return (
		<div className="flex flex-wrap items-center justify-start gap-8 py-8 relative">
			<TooltipProvider delayDuration={0}>
				{experiences.map((exp, index) => (
					<TimelineNode
						key={exp.id}
						experience={exp}
						language={language as "en" | "es"}
						presentLabel={t.experience.present}
						isLast={index === experiences.length - 1}
					/>
				))}
			</TooltipProvider>
		</div>
	)
}

function TimelineNode({
	experience,
	language,
	presentLabel,
	isLast,
}: {
	experience: Experience
	language: "en" | "es"
	presentLabel: string
	isLast: boolean
}) {
	const isMobile = useIsMobile()
	const [isOpen, setIsOpen] = React.useState(false)

	const isPast = React.useMemo(() => {
		// Check if any role is current (no end date)
		if (experience.roles && experience.roles.length > 0) {
			return !experience.roles.some((r) => !r.period.end)
		}
		// Check main period
		if (!experience.period?.end) return false

		return true
	}, [experience])

	const period: DateRange = React.useMemo(() => {
		if (experience.roles && experience.roles.length > 0) {
			// Find earliest start date and latest end date
			let start = experience.roles[0].period.start
			let end: string | undefined // optimize for "Present" check

			// Find alphabetical min/max might not be enough if format varies, but they should be YYYY or YYYY-MM
			const starts = experience.roles.map((r) => r.period.start).sort()
			start = starts[0]

			const ends = experience.roles.map((r) => r.period.end)
			if (ends.some((e) => e === undefined)) {
				end = undefined
			} else {
				// sort strings works for ISO date components
				end = ends.sort().pop()
			}

			return { start, end }
		}
		return experience.period || { start: "2020" }
	}, [experience])

	const formattedPeriod = formatDateRange(period, language, presentLabel)

	const nodeContent = (
		<div className="flex flex-col items-center gap-2 relative group">
			{!isLast && (
				<div className="hidden sm:block absolute top-[2rem] left-[calc(100%)] w-8 h-[2px] bg-primary/20 -translate-y-1/2 pointer-events-none" />
			)}
			<div
				className={cn(
					"relative h-16 w-16 cursor-pointer overflow-hidden rounded-full border-2 border-background shadow-sm transition-all hover:scale-110 hover:border-brand-accent hover:shadow-md z-10",
					"bg-background",
					isPast ? "grayscale opacity-50 hover:grayscale-0 hover:opacity-100" : ""
				)}
			>
				{experience.logo ? (
					<Image
						src={experience.logo}
						alt={experience.company}
						fill
						className={cn(
							"object-contain",
							experience.company === "MUSCLE"
								? "border-[6px] border-transparent bg-white bg-clip-padding rounded-full p-1"
								: "p-1"
						)}
						sizes="64px"
					/>
				) : (
					<div className="flex h-full w-full items-center justify-center bg-muted text-[10px] font-bold text-muted-foreground text-center leading-none p-1">
						{experience.company.substring(0, 3).toUpperCase()}
					</div>
				)}
			</div>
		</div>
	)

	const tooltipContent = (
		<div className="flex flex-col gap-1 items-center text-center">
			{experience.roles ? (
				<>
					<p className="font-bold text-sm">{experience.roles[0].title}</p>
					<p className="text-xs text-muted-foreground">{experience.company}</p>
				</>
			) : (
				<>
					<p className="font-bold text-sm">{experience.title}</p>
					<p className="text-xs text-muted-foreground">{experience.company}</p>
				</>
			)}
			<p className="text-xs font-mono mt-1 opacity-80">{formattedPeriod}</p>
		</div>
	)

	if (isMobile) {
		return (
			<Popover open={isOpen} onOpenChange={setIsOpen}>
				<PopoverTrigger asChild>{nodeContent}</PopoverTrigger>
				<PopoverContent
					className="max-w-xs bg-popover text-popover-foreground border-2 border-primary/20 relative pt-6"
					side="bottom"
				>
					<button
						type="button"
						onClick={() => setIsOpen(false)}
						className="absolute top-2 right-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
					>
						<X className="h-4 w-4" />
						<span className="sr-only">Close</span>
					</button>
					{tooltipContent}
				</PopoverContent>
			</Popover>
		)
	}

	return (
		<Tooltip>
			<TooltipTrigger asChild>{nodeContent}</TooltipTrigger>
			<TooltipContent
				className="max-w-xs bg-popover text-popover-foreground border-2 border-primary/20"
				side="bottom"
				showArrow={false}
			>
				{tooltipContent}
			</TooltipContent>
		</Tooltip>
	)
}
