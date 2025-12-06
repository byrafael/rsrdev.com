"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";
import {
  transformTranslationToCertificates,
  sortCertificatesByDate,
  type TranslationCertificate,
} from "@/lib/content-data";

export default function Certificates() {
  const t = useTranslation();

  // Transform and sort certificates dynamically
  const rawCertificates = t.certificates
    .list as unknown as TranslationCertificate[];
  const certificatesData = transformTranslationToCertificates(rawCertificates);
  const certs = sortCertificatesByDate(certificatesData);

  return (
    <section className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.certificates.title}</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {certs.map((cert, index) => (
            <div key={index}>
              <h3 className="font-medium text-sm">{cert.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {cert.issuer}
              </p>
              <p className="text-xs text-muted-foreground/70 mt-1">
                {cert.year}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
