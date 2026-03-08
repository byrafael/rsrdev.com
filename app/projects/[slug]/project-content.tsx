"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { HTMLAttributes, ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import Container from "@/components/container"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/lib/language-context"
import type { ProjectData } from "@/lib/projects"
import { formatDate, getProjectDemoUrl, getProjectGithubUrl, getTagStyles } from "@/lib/utils"

interface ProjectContentProps {
	projectEn: ProjectData | null
	projectEs: ProjectData | null
}

export function ProjectContent({ projectEn, projectEs }: ProjectContentProps) {
	const { language } = useLanguage()

	// Fallback logic if one language is missing
	const project = language === "es" ? projectEs || projectEn : projectEn || projectEs

	if (!project) {
		return <Container className="py-20 text-center">Project not found</Container>
	}

	const githubUrl = getProjectGithubUrl(project.github)
	const demoUrl = getProjectDemoUrl(project.demo)

	return (
		<Container className="py-12">
			<motion.article
				className="mx-auto"
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Link href="/projects">
					<Button
						variant="ghost"
						className="group mb-8 text-muted-foreground hover:bg-primary/5 hover:text-primary dark:hover:bg-muted dark:hover:text-primary"
					>
						<ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
						{language === "en" ? "Back to Projects" : "Volver a Proyectos"}
					</Button>
				</Link>

				<div className="relative mb-8 aspect-1200/630 w-full overflow-hidden rounded-xl border border-border/50 bg-background shadow-lg">
					{project.image ? (
						<Image
							src={project.image}
							alt={project.title}
							fill
							className="object-cover dark:brightness-75"
							priority
						/>
					) : (
						<div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
							No Image
						</div>
					)}
				</div>

				<h1 className="mb-6 font-bold text-4xl text-brand-accent md:text-5xl">{project.title}</h1>

				<div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center">
					<div className="flex items-center font-mono text-muted-foreground text-sm">
						<Calendar className="mr-2 h-4 w-4" />
						<time dateTime={project.date}>{formatDate(project.date, language)}</time>
					</div>
					<div className="flex gap-4">
						{githubUrl && (
							<a
								href={githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-brand-accent transition-transform hover:scale-110"
								aria-label="GitHub"
							>
								<Github className="h-4 w-4" />
							</a>
						)}
						{demoUrl && (
							<a
								href={demoUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="text-brand-accent transition-transform hover:scale-110"
								aria-label={language === "en" ? "View Project" : "Ver Proyecto"}
							>
								<ExternalLink className="h-4 w-4" />
							</a>
						)}
					</div>
				</div>
				<div className="mb-8 flex flex-wrap gap-2">
					{project.tags.map((tag) => (
						<Badge
							key={tag}
							variant="secondary"
							className="bg-secondary/50 px-3 py-1 font-mono text-[hsl(var(--tag-hue),70%,35%)] text-sm hover:bg-secondary/70 dark:text-[hsl(var(--tag-hue),70%,75%)]"
							style={getTagStyles(tag)}
						>
							{tag.toLowerCase()}
						</Badge>
					))}
				</div>
				<Separator className="my-8" />
				<div className="text-foreground">
					<ReactMarkdown
						remarkPlugins={[remarkGfm, remarkMath]}
						rehypePlugins={[rehypeRaw, rehypeKatex]}
						components={{
							h1: ({ ...props }) => (
								<h1 className="mt-8 mb-4 font-bold text-3xl text-brand-accent" {...props} />
							),
							h2: ({ ...props }) => (
								<h2 className="mt-6 mb-3 font-bold text-2xl text-brand-accent" {...props} />
							),
							h3: ({ ...props }) => (
								<h3 className="mt-4 mb-2 font-bold text-brand-accent text-xl" {...props} />
							),
							p: ({ ...props }) => (
								<p className="mb-4 text-muted-foreground leading-relaxed" {...props} />
							),
							ul: ({ ...props }) => (
								<ul
									className="mb-4 list-inside list-disc space-y-1 text-muted-foreground"
									{...props}
								/>
							),
							ol: ({ ...props }) => (
								<ol
									className="mb-4 list-inside list-decimal space-y-1 text-muted-foreground"
									{...props}
								/>
							),
							li: ({ ...props }) => <li className="" {...props} />,
							a: ({ ...props }) => (
								<a
									className="font-medium text-brand-accent underline-offset-4 hover:underline"
									{...props}
								/>
							),
							blockquote: ({ ...props }) => (
								<blockquote
									className="my-4 border-brand-accent border-l-4 pl-4 text-muted-foreground italic"
									{...props}
								/>
							),
							code: ({
								className,
								children,
								...props
							}: {
								node?: unknown
								className?: string
								children?: ReactNode
							} & HTMLAttributes<HTMLElement>) => {
								const match = /language-(\w+)/.exec(className || "")
								return match ? (
									<code className={`${className} font-mono`} {...props}>
										{children}
									</code>
								) : (
									<code
										className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-sm"
										{...props}
									>
										{children}
									</code>
								)
							},
							pre: ({ ...props }) => (
								<pre
									className="mb-4 overflow-x-auto rounded-lg bg-muted p-4 font-mono text-foreground text-sm"
									{...props}
								/>
							),
						}}
					>
						{project.content}
					</ReactMarkdown>
				</div>
			</motion.article>
		</Container>
	)
}
