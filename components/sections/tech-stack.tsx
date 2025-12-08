"use client"

import katex from "katex"
import { Terminal } from "lucide-react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"

interface TechStackProps {
	excludeCategories?: string[]
}

const Latex = () => {
	const html = katex.renderToString("\\LaTeX", { throwOnError: false })
	// biome-ignore lint/security/noDangerouslySetInnerHtml: KaTeX rendering
	return <span dangerouslySetInnerHTML={{ __html: html }} />
}

export default function TechStack({ excludeCategories = [] }: TechStackProps) {
	const t = useTranslation()

	const categories: { id: string; name: string; skills: (string | React.ReactNode)[] }[] = [
		{
			id: "languages",
			name: t.techStack.categories.languages,
			skills: ["Python", "Javascript", "Typescript", "LuaU", "SQL", <Latex key="latex" />],
		},
		{
			id: "mlData",
			name: t.techStack.categories.mlData,
			skills: [
				"PyTorch",
				"TensorFlow",
				"Pandas",
				"NumPy",
				"Scikit-learn",
				"XGBoost",
				"Matplotlib/Pygwalker",
			],
		},
		{
			id: "trading",
			name: t.techStack.categories.trading,
			skills: ["Backtrader", "YFinance", "Real-time feeds"],
		},
		{
			id: "infrastructure",
			name: t.techStack.categories.infrastructure,
			skills: ["AWS", "Docker", "Kubernetes", "MySQL", "Redis", "Colab"],
		},
		{
			id: "web",
			name: t.techStack.categories.web,
			skills: ["React", "Tailwind", "Next.js", "Node.js", "Express", "Django"],
		},
		{
			id: "tools",
			name: t.techStack.categories.tools,
			skills: ["Git", "Linux", "VSCode", "Jupyter", "Grafana"],
		},
		{
			id: "sound",
			name: t.techStack.categories.sound,
			skills: [
				"Yamaha DM3 Series",
				"Bose Professional Sound Systems",
				"Surge Management",
				"Handheld Wireless Microphones",
				"Lavalier Wireless Microphones",
			],
		},
	]

	const filteredCategories = categories.filter(
		(category) => !excludeCategories.includes(category.id)
	)

	return (
		<section id="tech-stack" className="py-16">
			<Container>
				<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
					<Terminal className="h-8 w-8 text-brand-accent" />
					{t.techStack.title}
				</h2>

				<div className="grid gap-6 md:grid-cols-2">
					{filteredCategories.map((category) => (
						<div
							key={category.name}
							className={`space-y-2 ${category.id === "sound" ? "md:col-span-2" : ""}`}
						>
							<h3 className="font-medium text-foreground text-sm">{category.name}</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								{category.skills.map((skill, index) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: Static list with mixed types
									<span key={index}>
										{skill}
										{index < category.skills.length - 1 && " • "}
									</span>
								))}
							</p>
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
