"use client";

import Link from "next/link";
import { Fragment, useContext } from "react";
import { ArrowUpRight, MapPin, PackageOpen, Phone } from "lucide-react";

import type { AdminOrder, OrderStatus } from "@/types/order";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type RecentOrdersProps = {
  orders: AdminOrder[];
};

function normalizeStatus(status: string): OrderStatus {
  return status.toUpperCase() as OrderStatus;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U";
}

function getOrderNumber(orderId: string) {
  return orderId.slice(-6).toUpperCase();
}

function formatCurrency(amount: number | string, currency?: string | null) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return null;
  }

  if (currency?.toUpperCase() === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  if (currency?.toUpperCase() === "CRC") {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  return null;
}

const statusStyles: Record<OrderStatus, string> = {
  VALIDATION: "border-amber-200 bg-amber-50 text-amber-700",
  QUOTED: "border-blue-200 bg-blue-50 text-blue-700",
  ACCEPTED: "border-teal-200 bg-teal-50 text-teal-700",
  REJECTED: "border-rose-200 bg-rose-50 text-rose-700",
  IN_PROGRESS: "border-orange-200 bg-orange-50 text-orange-700",
  ON_ROUTE: "border-violet-200 bg-violet-50 text-violet-700",
  DELIVERED: "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED: "border-slate-200 bg-slate-100 text-slate-600",
};

const statusDotStyles: Record<OrderStatus, string> = {
  VALIDATION: "bg-amber-500",
  QUOTED: "bg-blue-500",
  ACCEPTED: "bg-teal-500",
  REJECTED: "bg-rose-500",
  IN_PROGRESS: "bg-orange-500",
  ON_ROUTE: "bg-violet-500",
  DELIVERED: "bg-emerald-500",
  CANCELLED: "bg-slate-400",
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const statusLabels: Record<OrderStatus, string> = {
    VALIDATION: t.statusValidation,
    QUOTED: t.statusQuoted,
    ACCEPTED: t.statusAccepted,
    REJECTED: t.statusRejected,
    IN_PROGRESS: t.statusInProgress,
    ON_ROUTE: t.statusOnRoute,
    DELIVERED: t.statusDelivered,
    CANCELLED: t.statusCancelled,
  };

  return (
    <section className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
            {t.recentOrdersTitle}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t.recentOrdersDescription}
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-brand-soft px-3 py-2 text-sm font-semibold text-brand sm:flex">
          <PackageOpen size={17} />
          {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="p-6">
          <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <PackageOpen size={25} />
            </div>

            <p className="mt-4 font-semibold text-slate-800">
              {t.recentOrdersEmptyTitle}
            </p>

            <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
              {t.recentOrdersEmptyDescription}
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/70">
                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.recentOrdersNumber}
                </th>

                <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.tableCustomer}
                </th>

                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.tableOrder}
                </th>

                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.tableStatus}
                </th>

                <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.tableTotal}
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const latestQuote = order.quotes?.[0] ?? null;
                const normalizedStatus = normalizeStatus(order.status);

                const customerName =
                  order.profiles?.full_name ?? t.customerWithoutName;

                const customerPhone =
                  order.profiles?.phone ?? t.customerWithoutPhone;

                const formattedTotal =
                  latestQuote?.total !== null &&
                  latestQuote?.total !== undefined
                    ? formatCurrency(latestQuote.total, latestQuote.currency)
                    : null;

                return (
                  <Fragment key={order.id}>
                    <tr className="group border-b border-slate-100 transition-colors hover:bg-slate-50/60">
                      <td className="px-5 py-4 align-middle">
                        <Link
                          href={`/orders/${order.id}`}
                          className="inline-flex whitespace-nowrap rounded-lg bg-brand-soft px-2.5 py-1.5 font-mono text-xs font-bold tracking-[0.06em] text-brand transition hover:bg-brand hover:text-white"
                        >
                          #{getOrderNumber(order.id)}
                        </Link>
                      </td>

                      <td className="px-6 py-4 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-white shadow-[0_6px_15px_rgba(247,95,42,0.18)]">
                            {getInitial(customerName)}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-48 truncate text-sm font-semibold text-slate-900">
                              {customerName}
                            </p>

                            <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                              <Phone size={12} />

                              <span className="max-w-40 truncate">
                                {customerPhone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="max-w-[330px] px-5 py-4 align-middle">
                        <p className="line-clamp-1 text-sm font-medium text-slate-800">
                          {order.description}
                        </p>

                        <div className="mt-1.5 flex items-start gap-1.5 text-xs text-slate-400">
                          <MapPin size={13} className="mt-0.5 shrink-0" />

                          <span className="line-clamp-1">
                            {order.addresses?.address_line ??
                              t.orderWithoutAddress}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4 align-middle">
                        <span
                          className={[
                            "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold",
                            statusStyles[normalizedStatus],
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "h-1.5 w-1.5 rounded-full",
                              statusDotStyles[normalizedStatus],
                            ].join(" ")}
                          />

                          {statusLabels[normalizedStatus] ?? normalizedStatus}
                        </span>
                      </td>

                      <td className="px-5 py-4 align-middle">
                        {formattedTotal ? (
                          <span className="whitespace-nowrap text-sm font-semibold text-slate-950">
                            {formattedTotal}
                          </span>
                        ) : (
                          <span className="text-sm text-slate-400">
                            {t.orderWithoutQuote}
                          </span>
                        )}
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {orders.length > 0 ? (
        <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4">
          <p className="text-xs text-slate-400">
            {`${t.recentOrdersShowing} ${orders.length} ${t.recentOrdersShowingSuffix}`}
          </p>

          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            {t.recentOrdersViewAll}

            <ArrowUpRight size={15} />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
