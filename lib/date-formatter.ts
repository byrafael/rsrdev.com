/**
 * Date formatting utilities for localizing date ranges
 */

export interface DateRange {
  start: string; // Format: "YYYY-MM" or "YYYY"
  end?: string; // Format: "YYYY-MM" or "YYYY" or undefined for "Present"
}

const MONTH_NAMES = {
  en: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ],
  es: [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
  ]
};

/**
 * Formats a date string (YYYY-MM or YYYY) according to the locale
 */
function formatDate(dateStr: string, locale: "en" | "es"): string {
  // Check if it's just a year
  if (dateStr.match(/^\d{4}$/)) {
    return dateStr;
  }
  
  // Parse YYYY-MM format
  const match = dateStr.match(/^(\d{4})-(\d{1,2})$/);
  if (match) {
    const year = match[1];
    const monthIndex = parseInt(match[2], 10) - 1;
    const monthName = MONTH_NAMES[locale][monthIndex];
    return `${monthName} ${year}`;
  }
  
  return dateStr;
}

/**
 * Formats a date range according to the locale
 */
export function formatDateRange(
  range: DateRange,
  locale: "en" | "es",
  presentLabel: string
): string {
  const startFormatted = formatDate(range.start, locale);
  
  if (!range.end) {
    return `${startFormatted} – ${presentLabel}`;
  }
  
  const endFormatted = formatDate(range.end, locale);
  return `${startFormatted} – ${endFormatted}`;
}
