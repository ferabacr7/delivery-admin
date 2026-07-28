"use client";

import { useContext } from "react";
import { Clock, FileText, PackageCheck, Signal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { AdminOrder } from "@/types/order";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type ActivityFeedProps = {
  orders: AdminOrder[];
};

export function ActivityFeed({ orders }: ActivityFeedProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const latestOrder = orders[0] ?? null;
  const latestQuote = orders.find((order) => order.quotes?.[0]?.total);
  const deliveredOrders = orders.filter(
    (order) => order.status === "DELIVERED"
  ).length;

  const activeOrders = orders.filter((order) =>
    ["ACCEPTED", "IN_PROGRESS", "ON_ROUTE"].includes(order.status)
  ).length;

  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">
          {t.operationalSummaryTitle}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <Clock className="text-[#12BFAE]" size={20} />
            <p className="text-sm font-semibold text-slate-900">
              {t.latestOrderReceived}
            </p>
          </div>

          <p className="mt-2 text-sm text-slate-600">
            {latestOrder?.profiles?.full_name ?? t.noRecentOrders}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <div className="flex items-center gap-3">
            <FileText className="text-[#12BFAE]" size={20} />
            <p className="text-sm font-semibold text-slate-900">
              {t.latestQuoteSent}
            </p>
          </div>

          <p className="mt-2 text-sm font-bold text-slate-900">
            {latestQuote?.quotes?.[0]?.total
              ? `₡${Number(latestQuote.quotes[0].total).toLocaleString()}`
              : t.noQuotesYet}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <PackageCheck className="text-[#12BFAE]" size={20} />
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {deliveredOrders}
            </p>
            <p className="text-xs text-slate-500">{t.deliveredOrders}</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
            <Signal className="text-[#12BFAE]" size={20} />
            <p className="mt-3 text-2xl font-bold text-slate-900">
              {activeOrders}
            </p>
            <p className="text-xs text-slate-500">{t.activeOrders}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}