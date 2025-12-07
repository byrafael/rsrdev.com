"use client";

import Container from "@/components/container";
import SocialIcons from "@/components/ui/social-icons";
import { useTranslation } from "@/hooks/use-translation";

export default function Hero() {
  const t = useTranslation();

  return (
    <section id="hero" className="flex items-center justify-center py-24">
      <Container>
        <div className="space-y-6">
          <div className="mb-4">
            <h1 className="text-5xl font-bold mb-2">
              Hello! I&apos;m{" "}
              <span className="bg-linear-to-r from-slate-500 to-zinc-500 bg-clip-text text-transparent">
                Rafael Soley
              </span>
            </h1>
            <p className="text-muted-foreground">{t.hero.subtitle}</p>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-6 max-w-xl">
            {t.hero.description}
          </p>

          <div className="text-sm">
            <SocialIcons />
          </div>
        </div>
      </Container>
    </section>
  );
}
