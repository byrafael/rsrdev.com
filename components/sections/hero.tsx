"use client";

import Container from "@/components/container";
import SocialIcons from "@/components/ui/social-icons";
import { useTranslation } from "@/hooks/use-translation";

export default function Hero() {
  const t = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 pb-12">
      <Container className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold mb-2">Rafael Soley</h1>
            <p className="text-muted-foreground">{t.hero.subtitle}</p>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed max-w-xl mb-6">
            {t.hero.description}
          </p>

          <div className="text-sm">
            <SocialIcons />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="aspect-square bg-linear-to-br from-[oklch(0.52_0.18_265)]/20 to-muted rounded-lg border border-border/50 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-mono font-bold text-[oklch(0.52_0.18_265)] mb-4">
                {"{ }"}
              </div>
              <p className="text-muted-foreground">{t.hero.tagline}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
