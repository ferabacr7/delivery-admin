"use client";

import { useContext } from "react";
import {
  CircleDollarSign,
  CircleX,
  ClipboardList,
  PackageCheck,
  Sparkles,
} from "lucide-react";

import type { AdminOrder } from "@/types/order";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type ActivityFeedProps = {
  orders: AdminOrder[];
};

function isToday(date: string) {
  const orderDate = new Date(date);
  const today = new Date();

  return (
    orderDate.getFullYear() === today.getFullYear() &&
    orderDate.getMonth() === today.getMonth() &&
    orderDate.getDate() === today.getDate()
  );
}

export function ActivityFeed({ orders }: ActivityFeedProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const todayOrders = orders.filter((order) =>
    isToday(order.created_at),
  );

  const totalOrdersToday = todayOrders.length;

  const totalSalesToday = todayOrders.reduce((total, order) => {
    const quoteTotal = order.quotes?.[0]?.total;

    if (!quoteTotal) {
      return total;
    }

    return total + Number(quoteTotal);
  }, 0);

  const deliveredOrdersToday = todayOrders.filter(
    (order) => order.status === "DELIVERED",
  ).length;

  const cancelledOrRejectedToday = todayOrders.filter((order) =>
    ["CANCELLED", "REJECTED"].includes(order.status),
  ).length;

  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
            {t.operationalSummaryTitle}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {language === "es"
              ? "Información clave de la operación actual."
              : "Key information about the current operation."}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-soft text-brand">
          <Sparkles size={18} />
        </div>
      </div>

      <div className="space-y-4 p-5">
        <article className="group rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-brand/30 hover:bg-brand-soft/40">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-brand shadow-sm">
<ClipboardList size={18} />            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                {language === "es"
                  ? "Total de pedidos hoy"
                  : "Total orders today"}
              </p>

              <p className="mt-1.5 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                {totalOrdersToday}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {language === "es"
                  ? "Pedidos registrados durante el día."
                  : "Orders registered today."}
              </p>
            </div>
          </div>
        </article>

        <article className="group rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-blue-200 hover:bg-blue-50/40">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
<CircleDollarSign size={18} />            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                {language === "es"
                  ? "Total de ventas hoy"
                  : "Total sales today"}
              </p>

              <p className="mt-1.5 text-lg font-semibold tracking-[-0.03em] text-slate-950">
                ₡{totalSalesToday.toLocaleString("es-CR")}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {language === "es"
                  ? "Monto total cotizado durante el día."
                  : "Total quoted amount today."}
              </p>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-2 gap-3">
          <article className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
<PackageCheck size={18} />            </div>

            <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              {deliveredOrdersToday}
            </p>

            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
              {language === "es"
                ? "Pedidos entregados hoy"
                : "Orders delivered today"}
            </p>
          </article>

          <article className="rounded-2xl border border-red-100 bg-red-50/50 p-4 transition hover:-translate-y-0.5 hover:shadow-sm">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm">
<CircleX size={18} />  </div>

            <p className="mt-4 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
              {cancelledOrRejectedToday}
            </p>

            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
              {language === "es"
                ? "Cancelados / rechazados hoy"
                : "Cancelled / rejected today"}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}