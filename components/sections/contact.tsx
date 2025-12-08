"use client"

import { Mail } from "lucide-react"
import Container from "@/components/container"
import SocialIcons from "@/components/ui/social-icons"
import { useTranslation } from "@/hooks/use-translation"

export default function Contact() {
	const t = useTranslation()

	return (
		<section id="contact" className="py-12">
			<Container>
				<div className="space-y-6">
					<div>
						<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
							<Mail className="h-8 w-8 text-brand-accent" />
							{t.footer.contactTitle}
						</h2>
						<div className="text-sm">
							<SocialIcons />
						</div>
					</div>
				</div>
			</Container>
		</section>
	)
}
