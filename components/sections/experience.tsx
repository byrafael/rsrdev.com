"use client";

import Container from "@/components/container";
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/lib/language-context";
import { formatDateRange, type DateRange } from "@/lib/date-formatter";
import {
  transformTranslationToExperiences,
  sortExperiences,
  type Experience as ExperienceType,
  type SortStrategy,
  type TranslationJob,
} from "@/lib/experience-data";

// Default sorting strategy for experiences
const EXPERIENCE_SORT_STRATEGY: SortStrategy = 'date';

/**
 * Normalize date string to ISO format for comparison (YYYY-MM-DD)
 * Handles both "YYYY" and "YYYY-MM" formats
 */
function normalizeDate(dateStr: string): string {
  // If it's just a year, use January 1st
  if (/^\d{4}$/.test(dateStr)) {
    return `${dateStr}-01-01`;
  }
  
  // If it's YYYY-MM, use the first day of that month
  if (/^\d{4}-\d{1,2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const paddedMonth = month.padStart(2, '0');
    return `${year}-${paddedMonth}-01`;
  }
  
  return dateStr;
}

/**
 * Calculate the overall date range for a company with multiple roles
 * Returns the earliest start date and latest end date (or undefined if any role is current)
 */
function getCompanyDateRange(job: ExperienceType): DateRange | null {
  if (!job.roles || job.roles.length === 0) {
    return null;
  }
  
  // Find earliest start date using normalized date comparison
  const earliestStart = job.roles.reduce((earliest, role) => {
    return normalizeDate(role.period.start) < normalizeDate(earliest) 
      ? role.period.start 
      : earliest;
  }, job.roles[0].period.start);
  
  // Find latest end date (undefined means "Present")
  const hasCurrentRole = job.roles.some(role => !role.period.end);
  const latestEnd = hasCurrentRole ? undefined : job.roles.reduce((latest, role) => {
    if (!role.period.end) return latest;
    if (!latest) return role.period.end;
    return normalizeDate(role.period.end) > normalizeDate(latest) 
      ? role.period.end 
      : latest;
  }, job.roles[0].period.end);
  
  return {
    start: earliestStart,
    end: latestEnd
  };
}

export default function Experience() {
  const t = useTranslation();
  const { language } = useLanguage();
  
  // Transform and sort experiences dynamically
  const rawJobs = t.experience.jobs as unknown as TranslationJob[];
  const experiences = transformTranslationToExperiences(rawJobs);
  const jobs = sortExperiences(experiences, EXPERIENCE_SORT_STRATEGY);

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
                  <div className="flex justify-between items-baseline gap-4 mb-4">
                    <h3 className="font-medium">{job.company}</h3>
                    {(() => {
                      const companyRange = getCompanyDateRange(job);
                      return companyRange ? (
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatDateRange(companyRange, language, t.experience.present)}
                        </span>
                      ) : null;
                    })()}
                  </div>
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
