"use client";

import Container from "@/components/container";
import SocialIcons from "@/components/ui/social-icons";
import { Mail } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function Contact() {
  const t = useTranslation();

  return (
    <section id="contact" className="py-12">
      <Container>
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <Mail className="w-8 h-8 text-primary" />
              {t.footer.contactTitle}
            </h2>
            <div className="text-sm">
              <SocialIcons />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
