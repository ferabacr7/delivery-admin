"use client";

import { useContext } from "react";
import {
  ClipboardList,
  PackageOpen,
  ReceiptText,
  Truck,
} from "lucide-react";

import { DashboardCard } from "./DashboardCard";
import type { AdminOrder } from "@/types/order";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type StatsGridProps = {
  orders: AdminOrder[];
};

export function StatsGrid({ orders }: StatsGridProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const validation = orders.filter(
    (order) => order.status === "VALIDATION",
  ).length;

  const quoted = orders.filter(
    (order) => order.status === "QUOTED",
  ).length;

  const inProgress = orders.filter(
    (order) => order.status === "IN_PROGRESS",
  ).length;

  const onRoute = orders.filter(
    (order) => order.status === "ON_ROUTE",
  ).length;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title={t.statsNewOrders}
        value={validation}
        description={t.statsNewOrdersDescription}
        icon={ClipboardList}
        tone="teal"
      />

      <DashboardCard
        title={t.statsQuotes}
        value={quoted}
        description={t.statsQuotesDescription}
        icon={ReceiptText}
        tone="blue"
      />

      <DashboardCard
        title={t.statsInPreparation}
        value={inProgress}
        description={t.statsInPreparationDescription}
        icon={PackageOpen}
        tone="amber"
      />

      <DashboardCard
        title={t.statsOnRoute}
        value={onRoute}
        description={t.statsOnRouteDescription}
        icon={Truck}
        tone="violet"
      />
    </section>
  );
}