"use client";

import { useContext } from "react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useOrderStatusRealtime } from "./OrderStatusRealtimeProvider";

const statusStyles = {
  VALIDATION: "border-amber-200 bg-amber-50 text-amber-700",
  QUOTED: "border-blue-200 bg-blue-50 text-blue-700",
  ACCEPTED: "border-teal-200 bg-teal-50 text-teal-700",
  REJECTED: "border-red-200 bg-red-50 text-red-700",
  IN_PROGRESS: "border-orange-200 bg-orange-50 text-orange-700",
  ON_ROUTE: "border-violet-200 bg-violet-50 text-violet-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-slate-200 bg-slate-100 text-slate-600",
} as const;

export function OrderStatusBadge() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { effectiveStatus } = useOrderStatusRealtime();

  const statusLabels = {
    VALIDATION: t.statusValidation,
    QUOTED: t.statusQuoted,
    ACCEPTED: t.statusAccepted,
    REJECTED: t.statusRejected,
    IN_PROGRESS: t.statusInProgress,
    ON_ROUTE: t.statusOnRoute,
    DELIVERED: t.statusDelivered,
    CANCELLED: t.statusCancelled,
  } as const;

  return (
    <span
      className={[
        "inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold",
        statusStyles[effectiveStatus],
      ].join(" ")}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-70" />

      {statusLabels[effectiveStatus]}
    </span>
  );
}