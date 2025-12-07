"use client";

import Container from "@/components/container";
import { GraduationCap } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import {
  transformTranslationToEducation,
  sortEducationByDate,
  type TranslationEducation,
} from "@/lib/content-data";

export default function Education() {
  const t = useTranslation();

  // Transform and sort education dynamically
  const rawEducation = t.education.list as unknown as TranslationEducation[];
  const educationData = transformTranslationToEducation(rawEducation);
  const education = sortEducationByDate(educationData);

  return (
    <section id="education" className="py-16">
      <Container>
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap className="w-8 h-8 text-primary" />
          {t.education.title}
        </h2>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline gap-4 mb-1">
                <h3 className="font-medium">{edu.degree}</h3>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {edu.year}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{edu.school}</p>
              <p className="text-xs text-foreground/70">{edu.details}</p>
              {index < education.length - 1 && (
                <div className="mt-6 border-t border-border/50" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
