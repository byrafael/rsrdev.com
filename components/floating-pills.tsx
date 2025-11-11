"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";

export default function FloatingPills() {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const t = translations[language];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Joined oval pill container */}
      <div className="inline-flex items-center rounded-full bg-background/60 dark:bg-background/60 border border-gray-300 dark:border-zinc-700 shadow-md backdrop-blur-sm overflow-hidden">
        {/* Language Selector (left half) */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-l-full bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800 border-none shadow-none transition-all duration-200 active:scale-95"
          onClick={() => {
            setLanguage(language === "en" ? "es" : "en");
          }}
          title={
            language === "en"
              ? t.floatingPills.switchToSpanish
              : t.floatingPills.switchToEnglish
          }
        >
          <span
            className="text-base"
            role="img"
            aria-label={language === "en" ? "UK Flag" : "Spain Flag"}
          >
            {language === "en" ? "🇬🇧" : "🇪🇸"}
          </span>
        </Button>

        {/* Separator */}
        <div
          className="h-6 w-px bg-gray-200 dark:bg-zinc-600"
          aria-hidden="true"
        />

        {/* Theme Toggle (right half) */}
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-r-full bg-transparent hover:bg-gray-100 dark:hover:bg-zinc-800 border-none shadow-none transition-all duration-200 active:scale-95"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={
            theme === "dark"
              ? t.floatingPills.lightMode
              : t.floatingPills.darkMode
          }
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4 text-foreground" />
          ) : (
            <Moon className="h-4 w-4 text-foreground" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  );
}
