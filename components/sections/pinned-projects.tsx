"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Globe, Pin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Container from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import { useLanguage } from "@/lib/language-context"
import type { ProjectData } from "@/lib/projects"

interface PinnedProjectsProps {
	projectsEn: ProjectData[]
	projectsEs: ProjectData[]
}

export default function PinnedProjects({ projectsEn, projectsEs }: PinnedProjectsProps) {
	const { language } = useLanguage()
	const t = useTranslation()

	const allProjects = language === "es" ? projectsEs : projectsEn
	const pinnedProjects = allProjects
		.filter((p) => p.pinned)
		.sort((a, b) => (a.order || 99) - (b.order || 99))
		.slice(0, 2)

	return (
		<section className="relative overflow-hidden py-16">
			{/* Background decoration */}
			<div className="-z-10 pointer-events-none absolute top-0 left-0 h-full w-full overflow-hidden">
				<div className="absolute top-1/4 right-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
				<div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-3xl" />
			</div>

			<Container>
				<div className="mb-8 flex flex-col items-end justify-between gap-4 md:flex-row">
					<div className="space-y-1">
						<h2 className="flex items-center gap-3 font-bold text-3xl tracking-tight">
							<Pin className="h-6 w-6 text-primary" />
							Featured Projects
						</h2>
					</div>
					<Button
						variant="ghost"
						asChild
						className="group text-muted-foreground hover:text-primary"
					>
						<Link href="/projects">
							{t.projects.viewAll}
							<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
						</Link>
					</Button>
				</div>

				<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
					{pinnedProjects.map((project, index) => (
						<FeaturedProjectCard key={project.slug} project={project} index={index} />
					))}
				</div>
			</Container>
		</section>
	)
}

function FeaturedProjectCard({ project, index }: { project: ProjectData; index: number }) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			className="h-full"
		>
			<Card className="group hover:-translate-y-1 flex h-full flex-col overflow-hidden border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/50 hover:shadow-lg">
				{/* Image Section */}
				<div className="relative h-48 w-full overflow-hidden">
					<Link href={`/projects/${project.slug}`} className="block h-full w-full cursor-pointer">
						<div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
						{project.image ? (
							<Image
								src={project.image}
								alt={project.title}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
							/>
						) : (
							<div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
								No Image
							</div>
						)}
					</Link>

					{/* Floating Action Buttons */}
					<div className="absolute top-3 right-3 z-20 flex translate-y-2 transform gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
						{project.github && (
							<Button
								variant="secondary"
								size="icon"
								asChild
								className="group/btn h-8 w-8 rounded-full bg-background/80 backdrop-blur-md hover:bg-background/80"
							>
								<Link
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
									title="View Source"
								>
									<Github className="h-4 w-4 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:text-brand-accent" />
									<span className="sr-only">GitHub</span>
								</Link>
							</Button>
						)}
						{project.demo && (
							<Button
								variant="secondary"
								size="icon"
								asChild
								className="group/btn h-8 w-8 rounded-full bg-background/80 backdrop-blur-md hover:bg-background/80"
							>
								<Link
									href={project.demo}
									target="_blank"
									rel="noopener noreferrer"
									title="View Demo"
								>
									<Globe className="h-4 w-4 transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:text-brand-accent" />
									<span className="sr-only">Demo</span>
								</Link>
							</Button>
						)}
					</div>
				</div>

				{/* Content Section */}
				<div className="flex flex-1 flex-col p-5">
					<div className="mb-3">
						<Link
							href={`/projects/${project.slug}`}
							className="decoration-primary underline-offset-4 hover:underline"
						>
							<h3 className="line-clamp-1 font-bold text-foreground text-xl tracking-tight transition-colors">
								{project.title}
							</h3>
						</Link>
					</div>

					<p className="mb-4 line-clamp-2 flex-1 text-muted-foreground text-sm leading-relaxed">
						{project.description}
					</p>

					<div className="mt-auto flex items-center justify-between border-border/50 border-t pt-4">
						<div className="flex flex-wrap gap-2">
							{project.tags?.slice(0, 3).map((tag) => (
								<Badge
									key={tag}
									variant="secondary"
									className="bg-secondary/50 px-2 py-0.5 font-normal text-xs"
								>
									{tag}
								</Badge>
							))}
							{project.tags && project.tags.length > 3 && (
								<Badge variant="outline" className="px-2 py-0.5 font-normal text-xs">
									+{project.tags.length - 3}
								</Badge>
							)}
						</div>

						<Link
							href={`/projects/${project.slug}`}
							className="flex items-center gap-1 font-medium text-primary text-xs underline-offset-4 hover:underline"
						>
							Details <ArrowRight className="h-3 w-3" />
						</Link>
					</div>
				</div>
			</Card>
		</motion.div>
	)
}
