"use client";

import { useContext } from "react";
import { LanguageContext } from "@/i18n/LanguageContext";

export function LanguageSelector() {
  const { language, setLanguage } = useContext(LanguageContext);

  return (
    <select
      value={language}
      onChange={(event) => setLanguage(event.target.value as "es" | "en")}
      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm outline-none transition hover:border-emerald-300 focus:border-emerald-500"
    >
      <option value="es">ES</option>
      <option value="en">EN</option>
    </select>
  );
}