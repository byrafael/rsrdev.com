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
 * @param dateStr - Date string in format "YYYY" or "YYYY-MM" (e.g., "2025" or "2025-11")
 * @param locale - Language locale, either "en" for English or "es" for Spanish
 * @returns Formatted date string (e.g., "2025" or "Nov 2025")
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
    
    // Validate month is in valid range (0-11 after subtracting 1)
    if (monthIndex < 0 || monthIndex > 11) {
      return dateStr; // Return original if invalid
    }
    
    const monthName = MONTH_NAMES[locale][monthIndex];
    return `${monthName} ${year}`;
  }
  
  return dateStr;
}

/**
 * Parses a date string to a Date object
 * @param dateStr - Date string in format "YYYY" or "YYYY-MM"
 * @returns Date object (defaults to January for year-only dates)
 */
function parseDate(dateStr: string): Date {
  const yearMatch = dateStr.match(/^(\d{4})$/);
  if (yearMatch) {
    return new Date(parseInt(yearMatch[1]), 0, 1); // January 1st of the year
  }
  
  const yearMonthMatch = dateStr.match(/^(\d{4})-(\d{1,2})$/);
  if (yearMonthMatch) {
    const year = parseInt(yearMonthMatch[1]);
    const month = parseInt(yearMonthMatch[2]) - 1;
    return new Date(year, month, 1);
  }
  
  return new Date();
}

/**
 * Calculates the duration between two dates
 * @param start - Start date string
 * @param end - End date string (optional, uses current date if not provided)
 * @param locale - Language locale
 * @returns Formatted duration string (e.g., "1 yr 2 mos" or "1 año 2 meses")
 */
function calculateDuration(start: string, end: string | undefined, locale: "en" | "es"): string {
  const startDate = parseDate(start);
  const endDate = end ? parseDate(end) : new Date();
  
  let years = endDate.getFullYear() - startDate.getFullYear();
  let months = endDate.getMonth() - startDate.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const parts: string[] = [];
  
  if (years > 0) {
    if (locale === "es") {
      parts.push(years === 1 ? "1 año" : `${years} años`);
    } else {
      parts.push(years === 1 ? "1 yr" : `${years} yrs`);
    }
  }
  
  if (months > 0) {
    if (locale === "es") {
      parts.push(months === 1 ? "1 mes" : `${months} meses`);
    } else {
      parts.push(months === 1 ? "1 mo" : `${months} mos`);
    }
  }
  
  // If both are 0, show "1 mo" / "1 mes"
  if (parts.length === 0) {
    return locale === "es" ? "1 mes" : "1 mo";
  }
  
  return parts.join(" ");
}

/**
 * Formats a date range according to the locale with duration
 */
export function formatDateRange(
  range: DateRange,
  locale: "en" | "es",
  presentLabel: string
): string {
  const startFormatted = formatDate(range.start, locale);
  const duration = calculateDuration(range.start, range.end, locale);
  
  if (!range.end) {
    return `${startFormatted} – ${presentLabel} • ${duration}`;
  }
  
  const endFormatted = formatDate(range.end, locale);
  return `${startFormatted} – ${endFormatted} • ${duration}`;
}
