"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";

export default function Experience() {
  const t = useTranslation();
  const jobs = [
    {
      title: t.experience.jobs[0].title,
      company: t.experience.jobs[0].company,
      period: "2025 – Present",
      description: t.experience.jobs[0].description,
      highlights: t.experience.jobs[0].highlights,
    },
    {
      title: t.experience.jobs[1].title,
      company: t.experience.jobs[1].company,
      period: "2024 - Present",
      description: t.experience.jobs[1].description,
      highlights: t.experience.jobs[1].highlights,
    },
    {
      title: t.experience.jobs[2].title,
      company: t.experience.jobs[2].company,
      period: "Jul 2025",
      description: t.experience.jobs[2].description,
      highlights: t.experience.jobs[2].highlights,
    },
    // {
    //   title: "Senior Quantitative Engineer",
    //   company: "Citadel Securities",
    //   period: "2022 – Present",
    //   description:
    //     "Led ML-powered market microstructure models. Improved trade execution by 23% through latency optimization.",
    //   highlights: ["Machine Learning", "Market Microstructure", "Python/C++"],
    // },
    // {
    //   title: "Quantitative Researcher",
    //   company: "Two Sigma",
    //   period: "2020 – 2022",
    //   description:
    //     "Researched and deployed systematic trading strategies across equity and derivatives markets. Managed $500M AUM.",
    //   highlights: ["Statistical Arbitrage", "Research", "Backtesting"],
    // },
    // {
    //   title: "Full-Stack Engineer",
    //   company: "Goldman Sachs",
    //   period: "2019 – 2020",
    //   description:
    //     "Built real-time risk management systems and trading dashboards. Reduced calculation time by 40%.",
    //   highlights: ["System Design", "React", "Java"],
    // },
  ];
  return (
    <section id="experience" className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.experience.title}</h2>

        <div className="space-y-8">
          {jobs.map((job, index) => (
            <div key={index}>
              <div className="flex justify-between items-baseline gap-4 mb-2">
                <div>
                  <h3 className="font-medium">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {job.period}
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                {job.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {job.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
              {index < jobs.length - 1 && (
                <div className="mt-8 border-t border-border/50" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
