"use client"

import { Award, ExternalLink } from "lucide-react"
import Container from "@/components/container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortCertificatesByDate,
	type TranslationCertificate,
	transformTranslationToCertificates,
} from "@/lib/content-data"

export function CredentialsList() {
	const t = useTranslation()

	// Transform and sort certificates dynamically
	const rawCertificates = t.certificates.list as unknown as TranslationCertificate[]
	const certificatesData = transformTranslationToCertificates(rawCertificates)
	const certs = sortCertificatesByDate(certificatesData)

	return (
		<Container className="py-12">
			<h1 className="mb-12 flex items-center gap-3 font-bold text-3xl">
				<Award className="h-8 w-8 text-brand-accent" />
				{t.certificates.title}
			</h1>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{certs.map((cert) => (
					<Card
						key={cert.id}
						className="flex h-full flex-col transition-colors hover:border-brand-accent/50"
					>
						<CardHeader className="flex flex-row gap-4 space-y-0">
							<Avatar className="h-12 w-12 shrink-0 border bg-background shadow-sm">
								<AvatarImage src={cert.logo} alt={cert.issuer} className="object-contain p-1" />
								<AvatarFallback className="font-bold text-muted-foreground text-xs">
									{cert.issuer.substring(0, 2).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div className="flex flex-col gap-1">
								<CardTitle className="text-base leading-snug">{cert.title}</CardTitle>
								<CardDescription>{cert.issuer}</CardDescription>
							</div>
						</CardHeader>
						<CardContent className="mt-auto flex items-center justify-between pt-0">
							<p className="font-mono text-muted-foreground/70 text-sm">{cert.year}</p>
							{cert.link && (
								<a
									href={cert.link}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 font-medium text-muted-foreground text-xs transition-colors hover:bg-accent hover:text-accent-foreground"
									aria-label="View Credential"
								>
									View Credential
									<ExternalLink className="h-3 w-3" />
								</a>
							)}
						</CardContent>
					</Card>
				))}
			</div>
		</Container>
	)
}
