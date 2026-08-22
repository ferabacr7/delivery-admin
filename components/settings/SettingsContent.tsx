"use client";

import { useContext } from "react";

import { ExchangeRateCard } from "@/components/settings/ExchangeRateCard";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

export function SettingsContent() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <section className="space-y-7">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          {t.settingsEyebrow}
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px]">
          {t.settingsTitle}
        </h1>

        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
          {t.settingsDescription}
        </p>
      </div>

      <div className="max-w-2xl">
        <ExchangeRateCard />
      </div>
    </section>
  );
}