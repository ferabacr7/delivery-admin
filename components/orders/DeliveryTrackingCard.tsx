"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import {
  Activity,
  Clock3,
  Gauge,
  MapPin,
  Radio,
  Satellite,
} from "lucide-react";

import type { RealtimeChannel } from "@supabase/supabase-js";

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
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <Radio size={16} className="animate-pulse" />
          Cargando mapa...
        </div>
      </div>
    ),
  },
);

type DeliveryTrackingCardProps = {
  deliveryId: string | null;
  tracking: AdminTrackingLocation | null;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-CR", {
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
    return "Sin información";
  }

  return `${speed.toFixed(1)} m/s`;
}

function formatAccuracy(accuracy: number | null) {
  if (accuracy == null || accuracy < 0) {
    return "Sin información";
  }

  return `${accuracy.toFixed(1)} m`;
}

export function DeliveryTrackingCard({
  deliveryId,
  tracking,
}: DeliveryTrackingCardProps) {
  const { effectiveStatus } = useOrderStatusRealtime();

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

  const trackingLabel = isDelivered
    ? "Tracking finalizado"
    : currentTracking
      ? "Tracking activo"
      : "Sin señal";

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
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <MapPin size={19} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
              GPS en vivo
            </p>

            <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
              Seguimiento en tiempo real
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isDelivered
                ? "Última ubicación registrada durante la entrega."
                : "Última ubicación reportada por el repartidor."}
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
            className={[
              "h-2 w-2 rounded-full",
              trackingDotStyles,
            ].join(" ")}
          />

          {trackingLabel}
        </span>
      </div>

      {/* Sin tracking */}
      {!currentTracking ? (
        <div className="p-6">
          <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
              <Satellite size={24} />
            </div>

            <h3 className="mt-5 text-sm font-semibold text-slate-800">
              Todavía no hay información de seguimiento
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              La ubicación aparecerá aquí cuando el repartidor inicie la
              entrega desde su aplicación y comience a transmitir su posición.
            </p>

            {!deliveryId ? (
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                <Clock3 size={14} />
                Entrega pendiente de creación
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <>
          {/* Mapa */}
          <div className="p-4 sm:p-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <DeliveryTrackingMap
                latitude={currentTracking.latitude}
                longitude={currentTracking.longitude}
              />
            </div>
          </div>

          {/* Métricas */}
          <div className="grid gap-px border-t border-slate-200 bg-slate-200 sm:grid-cols-3">
            <div className="bg-white p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500">
                  <Clock3 size={16} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                    Última actualización
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
                    Velocidad
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
                    Precisión GPS
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