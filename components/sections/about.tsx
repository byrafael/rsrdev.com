"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

export default function About() {
  const t = useTranslation();

  return (
    <section id="about" className="py-16 border-t border-border">
      <Container className="space-y-4">
        <p className="text-foreground/85 leading-relaxed">
          {t.about.paragraph1}
        </p>
        <p className="text-foreground/85 leading-relaxed">
          {t.about.paragraph2}
        </p>
        <p className="text-foreground/85 leading-relaxed">
          {t.about.paragraph3}
        </p>
      </Container>
    </section>
  );
}
