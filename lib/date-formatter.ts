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
