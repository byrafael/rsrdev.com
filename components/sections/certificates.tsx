"use client"

import { Award } from "lucide-react"
import Container from "@/components/container"
import { useTranslation } from "@/hooks/use-translation"
import {
	sortCertificatesByDate,
	type TranslationCertificate,
	transformTranslationToCertificates,
} from "@/lib/content-data"

export default function Certificates() {
	const t = useTranslation()

	// Transform and sort certificates dynamically
	const rawCertificates = t.certificates.list as unknown as TranslationCertificate[]
	const certificatesData = transformTranslationToCertificates(rawCertificates)
	const certs = sortCertificatesByDate(certificatesData)

	return (
		<section id="certificates" className="py-16">
			<Container>
				<h2 className="mb-8 flex items-center gap-3 font-bold text-3xl">
					<Award className="h-8 w-8 text-brand-accent" />
					{t.certificates.title}
				</h2>

				<div className="grid gap-6 md:grid-cols-2">
					{certs.map((cert) => (
						<div key={cert.id}>
							<h3 className="font-medium text-sm">{cert.title}</h3>
							<p className="mt-1 text-muted-foreground text-xs">{cert.issuer}</p>
							<p className="mt-1 text-muted-foreground/70 text-xs">{cert.year}</p>
						</div>
					))}
				</div>
			</Container>
		</section>
	)
}
