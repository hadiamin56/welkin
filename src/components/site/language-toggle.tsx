"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/site/language-provider";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <button
      onClick={() => setLang(lang === "en" ? "ur" : "en")}
      className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
      aria-label="Toggle language"
    >
      <Languages className="h-3.5 w-3.5" />
      {lang === "en" ? "اردو" : "EN"}
    </button>
  );
}
