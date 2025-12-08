"use client"

import { FlaskConical } from "lucide-react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortResearchByDate,
	type TranslationResearchPost,
	transformTranslationToResearchPosts,
} from "@/lib/content-data"

export default function Research() {
	const t = useTranslation()

	// Transform and sort research posts dynamically
	const rawPosts = t.research.list as unknown as TranslationResearchPost[]
	const postsData = transformTranslationToResearchPosts(rawPosts)
	const posts = sortResearchByDate(postsData)

	return (
		<section id="research" className="py-16">
			<Container>
				<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
					<FlaskConical className="h-8 w-8 text-brand-accent" />
					{t.research.title}
				</h2>

				{posts.length === 0 ? (
					<p className="text-muted-foreground text-sm">{t.research.noResearch}</p>
				) : (
					<div className="space-y-6">
						{posts.map((post) => (
							<a
								key={post.link}
								href={post.link}
								className="group block transition-opacity hover:opacity-75"
							>
								<div className="mb-2 flex items-baseline justify-between gap-4">
									<h3 className="font-medium transition-colors group-hover:text-accent">
										{post.title}
									</h3>
									<span className="whitespace-nowrap text-muted-foreground text-xs">
										{post.date}
									</span>
								</div>
								<p className="text-muted-foreground text-sm leading-relaxed">{post.excerpt}</p>
								{index < posts.length - 1 && <div className="mt-6 border-border/50 border-t" />}
							</a>
						))}
					</div>
				)}
			</Container>
		</section>
	)
}
