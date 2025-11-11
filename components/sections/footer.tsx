"use client";

import Container from "@/components/container";
import SocialIcons from "@/components/ui/social-icons";
import { Heart } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function Footer() {
  const t = useTranslation();

  return (
    <footer id="contact" className="py-12 border-t border-border">
      <Container>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">{t.footer.contactTitle}</h3>
            <div className="text-sm">
              <SocialIcons />
            </div>
          </div>

          <div className="border-t border-border pt-6 text-xs text-muted-foreground">
            <p>
              {t.footer.copyright}{" "}
              <Heart className="inline-block h-3 w-3 align-middle mx-1" />{" "}
              {t.footer.and} {t.footer.nextjs}.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
