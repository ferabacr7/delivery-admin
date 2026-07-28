"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import type { RealtimeChannel } from "@supabase/supabase-js";

import {
  subscribeToTracking,
  unsubscribeTracking,
} from "@/services/adminTrackingRealtimeService";
import type { AdminTrackingLocation } from "@/services/adminTrackingService";

const DeliveryTrackingMap = dynamic(
  () =>
    import("@/components/maps/DeliveryTrackingMap").then(
      (mod) => mod.DeliveryTrackingMap,
    ),
  {
    ssr: false,
  },
);

type DeliveryTrackingCardProps = {
  deliveryId: string | null;
  tracking: AdminTrackingLocation | null;
};

function formatDate(date: string) {
  return new Date(date).toLocaleString("es-CR");
}

export function DeliveryTrackingCard({
  deliveryId,
  tracking,
}: DeliveryTrackingCardProps) {
  const [currentTracking, setCurrentTracking] =
    useState<AdminTrackingLocation | null>(tracking);

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

  return (
    <article className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Seguimiento en tiempo real
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Última ubicación reportada por el repartidor.
        </p>
      </div>

      {!currentTracking ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-8 text-center">
          <p className="text-sm font-medium text-slate-700">
            Todavía no hay información de seguimiento.
          </p>

          <p className="mt-2 text-sm text-slate-500">
            La ubicación aparecerá cuando el repartidor inicie la entrega desde
            la aplicación.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-6">
          <DeliveryTrackingMap
            latitude={currentTracking.latitude}
            longitude={currentTracking.longitude}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Última actualización
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {formatDate(currentTracking.recorded_at)}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Velocidad
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {currentTracking.speed != null &&
                currentTracking.speed >= 0
                  ? `${currentTracking.speed.toFixed(1)} m/s`
                  : "Sin información"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Precisión GPS
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {currentTracking.accuracy != null &&
                currentTracking.accuracy >= 0
                  ? `${currentTracking.accuracy.toFixed(1)} m`
                  : "Sin información"}
              </p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}