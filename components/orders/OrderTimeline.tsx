"use client";

import {
  Check,
  CircleCheckBig,
  PackageCheck,
  Route,
  Truck,
} from "lucide-react";

import { useOrderStatusRealtime } from "./OrderStatusRealtimeProvider";

const steps = [
  {
    status: "ACCEPTED",
    label: "Aceptado",
    icon: CircleCheckBig,
  },
  {
    status: "IN_PROGRESS",
    label: "En progreso",
    icon: PackageCheck,
  },
  {
    status: "ON_ROUTE",
    label: "En ruta",
    icon: Truck,
  },
  {
    status: "DELIVERED",
    label: "Entregado",
    icon: Check,
  },
] as const;

const statusOrder = [
  "ACCEPTED",
  "IN_PROGRESS",
  "ON_ROUTE",
  "DELIVERED",
] as const;

export function OrderTimeline() {
  const { operationalStatus } = useOrderStatusRealtime();

  if (!operationalStatus) {
    return null;
  }

  const currentIndex = statusOrder.indexOf(operationalStatus);

  return (
    <section className="rounded-[26px] border border-slate-200/80 bg-white px-6 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <Route size={18} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
            Progreso
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-slate-950">
            Estado de la entrega
          </h2>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon;

          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isReached = index <= currentIndex;

          return (
            <div
              key={step.status}
              className="relative flex flex-col items-center"
            >
              {index > 0 ? (
                <div
                  className={[
                    "absolute right-1/2 top-5 h-0.5 w-full",
                    isReached ? "bg-brand" : "bg-slate-200",
                  ].join(" ")}
                />
              ) : null}

              <div
                className={[
                  "relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                  isCompleted
                    ? "border-brand bg-brand text-white"
                    : isCurrent
                      ? "border-brand bg-brand-soft text-brand shadow-sm"
                      : "border-slate-200 bg-white text-slate-400",
                ].join(" ")}
              >
                {isCompleted ? (
                  <Check size={17} strokeWidth={2.5} />
                ) : (
                  <Icon size={17} strokeWidth={2} />
                )}
              </div>

              <p
                className={[
                  "mt-3 text-center text-xs font-semibold",
                  isCurrent || isCompleted
                    ? "text-slate-900"
                    : "text-slate-400",
                ].join(" ")}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}