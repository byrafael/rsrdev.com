"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

export default function Certificates() {
  const t = useTranslation();
  const certs = [
    {
      title: "Next Gen Data Science",
      issuer: "INCAE Business School",
      year: "2025",
    },
    {
      title: "ISC2 Candidate",
      issuer: "ISC2",
      year: "2025",
    },
    {
      title: "Data Visualization with Python",
      issuer: "IBM's Cognitive Class",
      year: "2024",
    },
    {
      title: "Python & Statistics for Financial Analysis",
      issuer: "The Hong Kong University of Science and Technology",
      year: "2024",
    },
  ];

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
