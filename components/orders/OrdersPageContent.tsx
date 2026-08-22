"use client";

import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Filter,
  MapPin,
  PackageOpen,
  Phone,
  Search,
  X,
} from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { AdminOrder, OrderStatus } from "@/types/order";

type OrdersPageContentProps = {
  orders: AdminOrder[];
};

type StatusFilter = "ALL" | OrderStatus;

function normalizeStatus(status: string): OrderStatus {
  return status.toUpperCase() as OrderStatus;
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase() || "U";
}

function getOrderNumber(orderId: string) {
  return orderId.slice(-6).toUpperCase();
}

function formatCurrency(
  amount: number | string,
  currency?: string | null,
) {
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
  IN_PROGRESS:
    "border-orange-200 bg-orange-50 text-orange-700",
  ON_ROUTE:
    "border-violet-200 bg-violet-50 text-violet-700",
  DELIVERED:
    "border-emerald-200 bg-emerald-50 text-emerald-700",
  CANCELLED:
    "border-slate-200 bg-slate-100 text-slate-600",
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

export function OrdersPageContent({
  orders,
}: OrdersPageContentProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("ALL");

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

  const statusOptions: Array<{
    value: StatusFilter;
    label: string;
  }> = [
    {
      value: "ALL",
      label: t.ordersPageAllStatuses,
    },
    {
      value: "VALIDATION",
      label: t.statusValidation,
    },
    {
      value: "QUOTED",
      label: t.statusQuoted,
    },
    {
      value: "ACCEPTED",
      label: t.statusAccepted,
    },
    {
      value: "IN_PROGRESS",
      label: t.statusInProgress,
    },
    {
      value: "ON_ROUTE",
      label: t.statusOnRoute,
    },
    {
      value: "DELIVERED",
      label: t.statusDelivered,
    },
    {
      value: "REJECTED",
      label: t.statusRejected,
    },
    {
      value: "CANCELLED",
      label: t.statusCancelled,
    },
  ];

  const filteredOrders = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return orders.filter((order) => {
      const normalizedStatus = normalizeStatus(order.status);

      const matchesStatus =
        statusFilter === "ALL" ||
        normalizedStatus === statusFilter;

      if (!matchesStatus) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const orderNumber =
        getOrderNumber(order.id).toLowerCase();

      const searchableValues = [
        order.id,
        orderNumber,
        order.description,
        order.profiles?.full_name,
        order.profiles?.phone,
        order.addresses?.label,
        order.addresses?.address_line,
        order.addresses?.reference,
      ];

      return searchableValues.some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(normalizedSearch),
      );
    });
  }, [orders, search, statusFilter]);

  const hasFilters =
    search.trim().length > 0 || statusFilter !== "ALL";

  function clearFilters() {
    setSearch("");
    setStatusFilter("ALL");
  }

  return (
    <section className="space-y-7">
      {/* Page header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand shadow-sm">
            <PackageOpen size={22} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              {t.ordersPageEyebrow}
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px]">
              {t.ordersPageTitle}
            </h1>

            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
              {t.ordersPageDescription}
            </p>
          </div>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
          <PackageOpen size={16} className="text-brand" />

          <span className="text-sm font-semibold text-slate-700">
            {orders.length}
          </span>
        </div>
      </div>

      {/* Search and filters */}
      <div className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px_auto]">
          <div>
            <div className="relative">
              <Search
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder={t.ordersPageSearchPlaceholder}
                className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-soft"
              />
            </div>
          </div>

          <div className="relative">
            <Filter
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              aria-label={t.ordersPageFilter}
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value as StatusFilter,
                )
              }
              className="min-h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-slate-700 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-soft"
            >
              {statusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>

            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              <svg
                aria-hidden="true"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <X size={16} />
              {t.ordersPageClearFilters}
            </button>
          ) : (
            <div className="hidden lg:block" />
          )}
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-400">
            {t.ordersPageShowing}{" "}
            <span className="font-semibold text-slate-600">
              {filteredOrders.length}
            </span>{" "}
            {t.ordersPageOf}{" "}
            <span className="font-semibold text-slate-600">
              {orders.length}
            </span>{" "}
            {t.ordersPageOrders}
          </p>
        </div>
      </div>

      {/* Empty states */}
      {orders.length === 0 ? (
        <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <PackageOpen size={25} />
            </div>

            <p className="mt-4 font-semibold text-slate-800">
              {t.ordersPageNoOrdersTitle}
            </p>

            <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
              {t.ordersPageNoOrdersDescription}
            </p>
          </div>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)]">
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <Search size={24} />
            </div>

            <p className="mt-4 font-semibold text-slate-800">
              {t.ordersPageNoResultsTitle}
            </p>

            <p className="mt-1 max-w-md text-sm leading-6 text-slate-500">
              {t.ordersPageNoResultsDescription}
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              <X size={15} />
              {t.ordersPageClearFilters}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile order cards */}
          <div className="space-y-4 lg:hidden">
            {filteredOrders.map((order) => {
              const normalizedStatus =
                normalizeStatus(order.status);

              const latestQuote =
                order.quotes?.[0] ?? null;

              const customerName =
                order.profiles?.full_name ??
                t.customerWithoutName;

              const customerPhone =
                order.profiles?.phone ??
                t.customerWithoutPhone;

              const formattedTotal =
                latestQuote?.total !== null &&
                latestQuote?.total !== undefined
                  ? formatCurrency(
                      latestQuote.total,
                      latestQuote.currency,
                    )
                  : null;

              return (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(15,23,42,0.05)]"
                >
                  <div className="p-5">
                    {/* Order number + status */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/orders/${order.id}`}
                        className="inline-flex whitespace-nowrap rounded-lg bg-brand-soft px-2.5 py-1.5 font-mono text-xs font-bold tracking-[0.06em] text-brand"
                      >
                        #{getOrderNumber(order.id)}
                      </Link>

                      <span
                        className={[
                          "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold",
                          statusStyles[normalizedStatus],
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "h-1.5 w-1.5 rounded-full",
                            statusDotStyles[
                              normalizedStatus
                            ],
                          ].join(" ")}
                        />

                        {statusLabels[normalizedStatus] ??
                          normalizedStatus}
                      </span>
                    </div>

                    {/* Customer */}
                    <div className="mt-5 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-white shadow-[0_6px_15px_rgba(247,95,42,0.18)]">
                        {getInitial(customerName)}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-900">
                          {customerName}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                          <Phone
                            size={12}
                            className="shrink-0"
                          />

                          <span className="truncate">
                            {customerPhone}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order description */}
                    <div className="mt-5 border-t border-slate-100 pt-4">
                      <p className="text-sm font-medium leading-6 text-slate-800">
                        {order.description}
                      </p>

                      <div className="mt-2 flex items-start gap-2 text-xs leading-5 text-slate-400">
                        <MapPin
                          size={14}
                          className="mt-0.5 shrink-0"
                        />

                        <span>
                          {order.addresses?.address_line ??
                            t.orderWithoutAddress}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                      <span className="text-xs font-medium text-slate-400">
                        {t.tableTotal}
                      </span>

                      {formattedTotal ? (
                        <span className="text-base font-semibold text-slate-950">
                          {formattedTotal}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">
                          {t.orderWithoutQuote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Detail button */}
                  <div className="border-t border-slate-100 bg-slate-50/60 p-3">
                    <Link
                      href={`/orders/${order.id}`}
                      className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-brand-soft hover:text-brand hover:ring-brand/20"
                    >
                      {t.ordersPageViewDetail}
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.05)] lg:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[980px] border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70">
                    <th className="px-5 py-3.5 text-left text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      #
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

                    <th className="px-5 py-3.5 text-right text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                      {t.tableAction}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredOrders.map((order) => {
                    const normalizedStatus =
                      normalizeStatus(order.status);

                    const latestQuote =
                      order.quotes?.[0] ?? null;

                    const customerName =
                      order.profiles?.full_name ??
                      t.customerWithoutName;

                    const customerPhone =
                      order.profiles?.phone ??
                      t.customerWithoutPhone;

                    const formattedTotal =
                      latestQuote?.total !== null &&
                      latestQuote?.total !== undefined
                        ? formatCurrency(
                            latestQuote.total,
                            latestQuote.currency,
                          )
                        : null;

                    return (
                      <tr
                        key={order.id}
                        className="border-b border-slate-100 transition-colors last:border-b-0 hover:bg-slate-50/60"
                      >
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
                            <MapPin
                              size={13}
                              className="mt-0.5 shrink-0"
                            />

                            <span className="line-clamp-1">
                              {order.addresses
                                ?.address_line ??
                                t.orderWithoutAddress}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4 align-middle">
                          <span
                            className={[
                              "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold",
                              statusStyles[
                                normalizedStatus
                              ],
                            ].join(" ")}
                          >
                            <span
                              className={[
                                "h-1.5 w-1.5 rounded-full",
                                statusDotStyles[
                                  normalizedStatus
                                ],
                              ].join(" ")}
                            />

                            {statusLabels[
                              normalizedStatus
                            ] ?? normalizedStatus}
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

                        <td className="px-5 py-4 text-right align-middle">
                          <Link
                            href={`/orders/${order.id}`}
                            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-brand/30 hover:bg-brand-soft hover:text-brand"
                          >
                            {t.ordersPageViewDetail}
                            <ArrowUpRight size={14} />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}