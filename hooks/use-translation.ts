import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export function useTranslation() {
  const { language } = useLanguage();
  return translations[language];
}
