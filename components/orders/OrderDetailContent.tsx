"use client";

import { useContext } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  MapPin,
  Package,
  Phone,
  UserRound,
} from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

import { AdminNotesCard } from "@/components/orders/AdminNotesCard";
import { DeliveryManagementCard } from "@/components/orders/DeliveryManagementCard";
import { DeliveryTrackingCard } from "@/components/orders/DeliveryTrackingCard";
import { DriverAssignmentCard } from "@/components/orders/DriverAssignmentCard";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderTimeline } from "@/components/orders/OrderTimeline";

import type { AdminDriver } from "@/services/adminDriverService";
import type { AdminTrackingLocation } from "@/services/adminTrackingService";

type QuoteData = {
  subtotal: number | string | null;
  service_fee: number | string | null;
  delivery_fee: number | string | null;
  commission: number | string | null;
  surcharges: number | string | null;
  total: number | string | null;
  currency: string | null;

  subtotal_crc: number | string | null;
  service_fee_crc: number | string | null;
  delivery_fee_crc: number | string | null;
  total_crc: number | string | null;
} | null;

type OrderDetailContentProps = {
  order: {
    id: string;
    description: string;
    status: string;
    created_at: string;
    admin_notes: string | null;

    estimated_purchase_amount: number | string | null;
    estimated_purchase_currency: string | null;
    payment_method: string | null;
    cash_payment_amount: number | string | null;
    cash_payment_currency: string | null;

    profiles?: {
      full_name: string;
      phone: string | null;
    } | null;

    addresses?: {
      label: string | null;
      address_line: string | null;
      reference: string | null;
    } | null;
  };

  latestQuote: QuoteData;

  delivery: {
    id: string;
    status: string;
    driver_id: string | null;
    started_at: string | null;
    delivered_at: string | null;

    driver?: {
      full_name: string;
      phone: string | null;
    } | null;
  } | null;

  drivers: AdminDriver[];
  tracking: AdminTrackingLocation | null;
};

export function OrderDetailContent({
  order,
  latestQuote,
  delivery,
  drivers,
  tracking,
}: OrderDetailContentProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const locale = language === "es" ? "es-CR" : "en-US";

  function formatQuoteAmount(value: number | string | null | undefined) {
    if (value == null) {
      return t.adminOrderNoQuote;
    }

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
      return t.adminOrderNoQuote;
    }

    const currency = latestQuote?.currency?.toUpperCase() ?? "CRC";

    if (currency === "USD") {
      return `$${amount.toFixed(2)}`;
    }

    return `₡${Math.round(amount).toLocaleString("es-CR")}`;
  }

  function formatOperationalAmount(
    value: number | string | null | undefined,
    currency: string | null | undefined,
  ) {
    if (value == null) {
      return t.adminOrderNotProvided;
    }

    const amount = Number(value);

    if (!Number.isFinite(amount)) {
      return t.adminOrderNotProvided;
    }

    if (currency?.toUpperCase() === "USD") {
      return `$${amount.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      })}`;
    }

    if (currency?.toUpperCase() === "CRC") {
      return `₡${Math.round(amount).toLocaleString("es-CR")}`;
    }

    return amount.toLocaleString(locale);
  }

  function getPaymentMethodLabel(paymentMethod: string | null) {
    if (!paymentMethod) {
      return t.adminOrderNotProvided;
    }

    const normalizedPaymentMethod = paymentMethod.toUpperCase();

    if (normalizedPaymentMethod === "CASH") {
      return t.adminOrderCash;
    }

    if (normalizedPaymentMethod === "SINPE") {
      return "SINPE";
    }

    return paymentMethod;
  }

  const normalizedPaymentMethod = order.payment_method?.toUpperCase() ?? null;

  const shouldShowCashPaymentAmount =
    normalizedPaymentMethod === "CASH" &&
    order.cash_payment_amount !== null &&
    order.cash_payment_amount !== undefined;

  const formattedCreatedAt = new Intl.DateTimeFormat(locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(order.created_at));

  const hasCommission = Number(latestQuote?.commission ?? 0) > 0;

  const hasSurcharges = Number(latestQuote?.surcharges ?? 0) > 0;

  return (
    <section className="space-y-7">
      <header className="flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
          >
            <ArrowLeft size={16} />
            {t.adminOrderBackDashboard}
          </Link>

          <div className="mt-5 flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
              <Package size={22} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                {t.adminOrderOperationalManagement}
              </p>

              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px]">
                {t.adminOrderDetailTitle}
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                {t.adminOrderNumber} #{order.id.slice(0, 8)}
              </p>
            </div>
          </div>
        </div>

        <OrderStatusBadge />
      </header>

      <OrderTimeline />

      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-3">
          {/* Customer */}
          <article className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <UserRound size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {t.adminOrderCustomer}
                </p>

                <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
                  {t.adminOrderCustomerInformation}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderName}
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {order.profiles?.full_name ?? t.adminOrderNoName}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderPhone}
                </p>

                <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700">
                  <Phone size={15} className="text-slate-400" />
                  {order.profiles?.phone ?? t.adminOrderNoPhone}
                </div>
              </div>
            </div>
          </article>

          {/* Order */}
          <article className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ClipboardList size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {t.adminOrderRequest}
                </p>

                <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
                  {t.adminOrderInformation}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderDescription}
                </p>

                <p className="mt-1.5 text-sm leading-6 text-slate-700">
                  {order.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderEstimatedPurchaseAmount}
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {formatOperationalAmount(
                    order.estimated_purchase_amount,
                    order.estimated_purchase_currency,
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderPaymentMethod}
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {getPaymentMethodLabel(order.payment_method)}
                </p>
              </div>

              {shouldShowCashPaymentAmount ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {t.adminOrderPayingWith}
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {formatOperationalAmount(
                      order.cash_payment_amount,
                      order.cash_payment_currency,
                    )}
                  </p>
                </div>
              ) : null}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderCreatedAt}
                </p>

                <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700">
                  <CalendarDays size={15} className="text-slate-400" />
                  {formattedCreatedAt}
                </div>
              </div>
            </div>
          </article>

          {/* Address */}
          <article className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <MapPin size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                  {t.adminOrderDestination}
                </p>

                <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
                  {t.adminOrderDeliveryAddress}
                </h2>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderLabel}
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-900">
                  {order.addresses?.label ?? t.adminOrderNoLabel}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderAddress}
                </p>

                <p className="mt-1.5 text-sm leading-6 text-slate-700">
                  {order.addresses?.address_line ?? t.adminOrderNoAddress}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                  {t.adminOrderReference}
                </p>

                <p className="mt-1.5 text-sm leading-6 text-slate-700">
                  {order.addresses?.reference ?? t.adminOrderNoReference}
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="grid gap-6 xl:grid-cols-3 xl:items-stretch">
          {/* Delivery */}
          <article className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
                {t.adminOrderOperation}
              </p>

              <h2 className="mt-1 text-lg font-semibold text-slate-950">
                {t.adminOrderDeliveryInformation}
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {t.adminOrderAssignDriverDescription}
              </p>
            </div>

            <div className="mt-6">
              <DriverAssignmentCard
                orderId={order.id}
                orderStatus={order.status}
                drivers={drivers}
                currentDriverId={delivery?.driver_id ?? null}
              />
            </div>
          </article>

          {/* Monitoring */}
          <article className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <DeliveryManagementCard
              deliveryStatus={delivery?.status ?? null}
              orderStatus={order.status}
              hasAssignedDriver={Boolean(delivery?.driver_id)}
              driverName={delivery?.driver?.full_name ?? null}
              startedAt={delivery?.started_at ?? null}
              deliveredAt={delivery?.delivered_at ?? null}
            />
          </article>

          {/* Quote + Notes */}
          <div className="flex h-full flex-col gap-4">
            <article className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <CircleDollarSign size={17} />
                </div>

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {t.adminOrderFinances}
                  </p>

                  <h2 className="mt-0.5 text-base font-semibold text-slate-950">
                    {t.adminOrderQuote}
                  </h2>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    {t.adminOrderSubtotal}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {formatQuoteAmount(latestQuote?.subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    {t.adminOrderServiceFee}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {formatQuoteAmount(latestQuote?.service_fee)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                  <span className="text-sm text-slate-500">
                    {t.adminOrderDeliveryFee}
                  </span>

                  <span className="text-sm font-semibold text-slate-900">
                    {formatQuoteAmount(latestQuote?.delivery_fee)}
                  </span>
                </div>

                {hasCommission ? (
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      {t.adminOrderCommission}
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {formatQuoteAmount(latestQuote?.commission)}
                    </span>
                  </div>
                ) : null}

                {hasSurcharges ? (
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                    <span className="text-sm text-slate-500">
                      {t.adminOrderSurcharges}
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                      {formatQuoteAmount(latestQuote?.surcharges)}
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between gap-4 bg-slate-50 px-4 py-4">
                  <span className="font-semibold text-slate-950">
                    {t.adminOrderTotal}
                  </span>

                  <span className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                    {formatQuoteAmount(latestQuote?.total)}
                  </span>
                </div>
              </div>
            </article>

            <AdminNotesCard
              orderId={order.id}
              initialNotes={order.admin_notes}
            />
          </div>
        </div>

        <DeliveryTrackingCard
          deliveryId={delivery?.id ?? null}
          tracking={tracking}
        />
      </div>
    </section>
  );
}
