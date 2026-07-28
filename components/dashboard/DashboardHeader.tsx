"use client";

import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export function DashboardHeader() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        {t.dashboardTitle}
      </h2>

      <p className="mt-2 text-slate-500">
        {t.dashboardSubtitle}
      </p>
    </div>
  );
}