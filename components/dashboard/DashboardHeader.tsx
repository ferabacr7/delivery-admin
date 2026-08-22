"use client";

import { useContext } from "react";
import { LayoutDashboard } from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export function DashboardHeader() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <section>
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-sm">
          <LayoutDashboard size={22} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
            {t.dashboardEyebrow}
          </p>

          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px]">
            {t.dashboardTitle}
          </h2>

          <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
            {t.dashboardSubtitle}
          </p>
        </div>
      </div>
    </section>
  );
}