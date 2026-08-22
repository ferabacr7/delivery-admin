"use client";

import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { Activity, Clock3, Gauge, MapPin, Satellite } from "lucide-react";

import type { RealtimeChannel } from "@supabase/supabase-js";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import {
  subscribeToTracking,
  unsubscribeTracking,
} from "@/services/adminTrackingRealtimeService";
import type { AdminTrackingLocation } from "@/services/adminTrackingService";
import { useOrderStatusRealtime } from "@/components/orders/OrderStatusRealtimeProvider";

const DeliveryTrackingMap = dynamic(
  () =>
    import("@/components/maps/DeliveryTrackingMap").then(
      (mod) => mod.DeliveryTrackingMap,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[360px] items-center justify-center rounded-2xl bg-slate-100">
        <div className="h-7 w-7 animate-spin rounded-full border-2 border-slate-300 border-t-brand" />
      </div>
    ),
  },
);

type DeliveryTrackingCardProps = {
  deliveryId: string | null;
  tracking: AdminTrackingLocation | null;
};

export function DeliveryTrackingCard({
  deliveryId,
  tracking,
}: DeliveryTrackingCardProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { effectiveStatus } = useOrderStatusRealtime();

  const locale = language === "es" ? "es-CR" : "en-US";

  const [currentTracking, setCurrentTracking] =
    useState<AdminTrackingLocation | null>(tracking);

  const isDelivered = effectiveStatus === "DELIVERED";

  useEffect(() => {
    setCurrentTracking(tracking);
  }, [tracking]);

  useEffect(() => {
    if (!deliveryId) {
      return;
    }

    const channel: RealtimeChannel = subscribeToTracking(
      deliveryId,
      (location) => {
        setCurrentTracking(location);
      },
    );

    return () => {
      unsubscribeTracking(channel);
    };
  }, [deliveryId]);

  function formatDate(date: string) {
    return new Intl.DateTimeFormat(locale, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));
  }

  function formatSpeed(speed: number | null) {
    if (speed == null || speed < 0) {
      return t.deliveryTrackingNoInformation;
    }

    return `${speed.toFixed(1)} m/s`;
  }

  function formatAccuracy(accuracy: number | null) {
    if (accuracy == null || accuracy < 0) {
      return t.deliveryTrackingNoInformation;
    }

    return `${accuracy.toFixed(1)} m`;
  }

  const trackingLabel = isDelivered
    ? t.deliveryTrackingFinished
    : currentTracking
      ? t.deliveryTrackingActive
      : t.deliveryTrackingNoSignal;

  const trackingBadgeStyles = isDelivered
    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
    : currentTracking
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-slate-200 bg-slate-50 text-slate-500";

  const trackingDotStyles = isDelivered
    ? "bg-emerald-500"
    : currentTracking
      ? "animate-pulse bg-emerald-500"
      : "bg-slate-400";

  return (
    <article className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <MapPin size={19} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
              {t.deliveryTrackingLiveGps}
            </p>

            <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
              {t.deliveryTrackingRealtimeTracking}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isDelivered
                ? t.deliveryTrackingDeliveredLocation
                : t.deliveryTrackingCurrentLocation}
            </p>
          </div>
        </div>

        <span
          className={[
            "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
            trackingBadgeStyles,
          ].join(" ")}
        >
          <span
            className={["h-2 w-2 rounded-full", trackingDotStyles].join(" ")}
          />

          {trackingLabel}
        </span>
      </div>

      {!currentTracking ? (
        <div className="p-6">
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <Satellite size={24} />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-slate-800">
              {t.deliveryTrackingNoTrackingTitle}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {t.deliveryTrackingNoTrackingDescription}
            </p>

            {!deliveryId ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <Clock3 size={14} />
                {t.deliveryTrackingPendingCreation}
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          <div className="p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <DeliveryTrackingMap
                latitude={currentTracking.latitude}
                longitude={currentTracking.longitude}
              />
            </div>
          </div>

          <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-3">
            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <Clock3 size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {t.deliveryTrackingLastUpdate}
                  </p>

                  <p className="mt-1.5 text-sm font-semibold leading-5 text-slate-900">
                    {formatDate(currentTracking.recorded_at)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Gauge size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {t.deliveryTrackingSpeed}
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {formatSpeed(currentTracking.speed)}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <Activity size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                    {t.deliveryTrackingGpsAccuracy}
                  </p>

                  <p className="mt-1.5 text-sm font-semibold text-slate-900">
                    {formatAccuracy(currentTracking.accuracy)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </article>
  );
}
