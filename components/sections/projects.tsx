"use client"

import { Code } from "lucide-react"
import { BsBoxArrowUpRight, BsGithub } from "react-icons/bs"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"
import { type TranslationProject, transformTranslationToProjects } from "@/lib/content-data"

export default function Projects() {
	const t = useTranslation()

	// Transform and get projects dynamically
	const rawProjects = t.projects.list as unknown as TranslationProject[]
	const projects = transformTranslationToProjects(rawProjects)

	return (
		<section id="projects" className="py-16">
			<Container>
				<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
					<Code className="h-8 w-8 text-brand-accent" />
					{t.projects.title}
				</h2>
				<p className="mb-8 text-muted-foreground text-sm leading-relaxed">
					{t.projects.disclaimer}
				</p>

				<div className="space-y-6">
					{projects.map((project, index) => (
						<div key={project.id} className="group">
							<div className="mb-1 flex items-center justify-between gap-3">
								<h3 className="font-medium">{project.title}</h3>
								<div className="flex shrink-0 gap-2">
									{project.preview && (
										<a
											href={project.preview}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
											aria-label="View live preview"
										>
											<BsBoxArrowUpRight className="h-4 w-4" />
										</a>
									)}
									{project.source && (
										<a
											href={project.source}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
											aria-label="View source code"
										>
											<BsGithub className="h-4 w-4" />
										</a>
									)}
								</div>
							</div>
							<p className="mb-3 text-muted-foreground text-sm leading-relaxed">
								{project.description}
							</p>
							<div className="flex flex-wrap gap-2">
								{project.tags.map((tag) => (
									<span
										key={tag}
										className="rounded bg-muted px-2 py-1 text-muted-foreground text-xs"
									>
										{tag}
									</span>
								))}
							</div>
							{index < projects.length - 1 && <div className="mt-6 border-border/50 border-t" />}
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
