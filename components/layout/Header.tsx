"use client";

import { Bell, CalendarDays, ChevronDown } from "lucide-react";
import { useContext } from "react";

import { LanguageSelector } from "./LanguageSelector";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function Header() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const { currentUser, isLoading, error } = useCurrentUser();

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-10 py-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          {t.headerGreeting}
        </h1>

        <p className="mt-2 text-slate-500">{t.headerSubtitle}</p>
      </div>

      <div className="flex items-center gap-6">
        <LanguageSelector />

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm"
        >
          <CalendarDays size={18} />

          <span>{t.today}</span>

          <ChevronDown size={16} />
        </button>

        <button type="button" className="relative">
          <Bell size={24} />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#12BFAE] text-xs text-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-5">
          {" "}
          <div className="hidden text-right lg:block">
            {isLoading ? (
              <>
                <div className="ml-auto h-4 w-28 animate-pulse rounded bg-slate-200" />
                <div className="ml-auto mt-2 h-3 w-36 animate-pulse rounded bg-slate-100" />
              </>
            ) : currentUser ? (
              <>
                <p className="text-sm font-semibold text-slate-900">
                  {currentUser.fullName}
                </p>

                <p className="mt-1 max-w-52 truncate text-xs text-slate-500">
                  {currentUser.email}
                </p>
              </>
            ) : (
              <>
                <p className="text-sm font-semibold text-slate-900">Admin</p>

                <p className="mt-1 text-xs text-red-500">
                  {error ??
                    (language === "es"
                      ? "Usuario no disponible"
                      : "User unavailable")}
                </p>
              </>
            )}
          </div>
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#12BFAE] text-lg font-bold text-white"
            aria-label={
              currentUser?.fullName ??
              (language === "es" ? "Administrador" : "Administrator")
            }
          >
            {isLoading ? "…" : (currentUser?.initial ?? "A")}
          </div>
        </div>
      </div>
    </header>
  );
}
