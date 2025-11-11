"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

export default function Education() {
  const t = useTranslation();
  const education = [
    // {
    //   degree: "Master of Science in Financial Engineering",
    //   school: "Carnegie Mellon University",
    //   year: "2019",
    //   details: "GPA: 3.9/4.0 • Thesis: Machine Learning in Options Pricing",
    // },
    // {
    //   degree: "Bachelor of Science in Computer Science & Mathematics",
    //   school: "MIT",
    //   year: "2017",
    //   details: "Summa Cum Laude • Minor: Physics • Dean's List all semesters",
    // },
    {
      degree: "GCE AS & A Levels",
      school: "Cambridge International Education",
      year: "2025 - 2026",
      details:
        "Mathematics (AL), Computer Science (AL), Global Perspectives and Research (AS)",
    },
    {
      degree: "High School Diploma (STEM Focus)",
      school: "Tree Of Life International School",
      year: "2026",
      details:
        "GPA: 4.0/4.0 • Accelerated Programme • Secretary General/President of MUN Team",
    },
    {
      degree: "GCE IGCSEs",
      school: "Cambridge International Education",
      year: "2023 - 2024",
      details: "Mathematics, Computer Science, English Language, & History",
    },
  ];

  return (
    <section id="education" className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.education.title}</h2>

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
