"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/lib/language-context";
import { formatDateRange } from "@/lib/date-formatter";
import {
  transformTranslationToExperiences,
  sortExperiences,
  type Experience as ExperienceType,
  type SortStrategy,
} from "@/lib/experience-data";

export default function Experience() {
  const t = useTranslation();
  const { language } = useLanguage();
  
  // Transform and sort experiences dynamically
  const rawJobs = t.experience.jobs as unknown as any[];
  const experiences = transformTranslationToExperiences(rawJobs);
  const sortStrategy: SortStrategy = 'date'; // Can be 'date', 'duration', or 'custom'
  const jobs = sortExperiences(experiences, sortStrategy) as ExperienceType[];

  return (
    <section id="experience" className="py-16 border-t border-border">
      <Container>
        <h2 className="text-lg font-semibold mb-8">{t.experience.title}</h2>

        <div className="space-y-8">
          {jobs.map((job, jobIndex) => (
            <div key={jobIndex}>
              {/* Multi-role company (LinkedIn style) */}
              {job.roles ? (
                <div>
                  <h3 className="font-medium mb-4">{job.company}</h3>
                  <div className="space-y-6">
                    {job.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="pl-4 border-l-2 border-border">
                        <div className="flex justify-between items-baseline gap-4 mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{role.title}</h4>
                          </div>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDateRange(role.period, language, t.experience.present)}
                          </span>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                          {role.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {role.highlights.map((highlight) => (
                            <span
                              key={highlight}
                              className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Single-role company */
                <div>
                  <div className="flex justify-between items-baseline gap-4 mb-2">
                    <div>
                      <h3 className="font-medium">{job.title}</h3>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {job.period && formatDateRange(job.period, language, t.experience.present)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 leading-relaxed mb-3">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.highlights?.map((highlight) => (
                      <span
                        key={highlight}
                        className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {jobIndex < jobs.length - 1 && (
                <div className="mt-8 border-t border-border/50" />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
