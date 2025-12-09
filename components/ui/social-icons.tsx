"use client"

import type React from "react"
import { BsEnvelope, BsGithub, BsLinkedin } from "react-icons/bs"
import { FaOrcid } from "react-icons/fa"
import { Email } from "react-obfuscate-email"
import { useTranslation } from "@/hooks/use-translation"

export type SocialItem = Readonly<{
	id: string
	href: string
	label?: string
	icon?: React.ReactNode
}>

export default function SocialIcons({
	items,
	size = 18,
	className = "flex gap-4 items-center",
}: Readonly<{
	items?: SocialItem[]
	size?: number
	className?: string
}>) {
	const t = useTranslation()

	const defaults: SocialItem[] = [
		{
			id: "linkedin",
			href: "https://www.linkedin.com/in/rafael-soley-9832a5327/",
			label: t.social.linkedin,
			icon: <BsLinkedin size={size} />,
		},
		{
			id: "github",
			href: "https://github.com/byrafael",
			label: t.social.github,
			icon: <BsGithub size={size} />,
		},
		// {
		//   id: "x",
		//   href: "https://x.com/rsoleyyy",
		//   label: t.social.x,
		//   icon: <BsTwitterX size={size} />,
		// },
		{
			id: "email",
			href: "mailto:hello@rsrdev.com",
			label: t.social.email,
			icon: <BsEnvelope size={size} />,
		},
		{
			id: "orcid",
			href: "https://orcid.org/0009-0003-0702-7601",
			label: t.social.orcid,
			icon: <FaOrcid size={size} />,
		},
	]

	const list = items?.length ? items : defaults

	return (
		<div className={className}>
			{list.map((item) => {
				const isMail = item.href.startsWith("mailto:")

				if (isMail) {
					return (
						<Email
							key={item.id}
							email={item.href.replace("mailto:", "")}
							aria-label={item.label ?? item.id}
							className="text-muted-foreground transition-colors hover:text-accent"
						>
							{item.icon}
						</Email>
					)
				}

				return (
					<a
						key={item.id}
						href={item.href}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={item.label ?? item.id}
						className="text-muted-foreground transition-colors hover:text-accent"
					>
						{item.icon}
					</a>
				)
			})}
		</div>
	)
}
