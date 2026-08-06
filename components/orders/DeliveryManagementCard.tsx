"use client";

import {
  AlertTriangle,
  CalendarCheck2,
  CalendarClock,
  CircleCheckBig,
  Clock3,
  Info,
  Route,
  UserRound,
} from "lucide-react";

type DeliveryManagementCardProps = {
  deliveryStatus: string | null;
  orderStatus: string;
  hasAssignedDriver: boolean;
  driverName?: string | null;
  startedAt?: string | null;
  deliveredAt?: string | null;
};

function getStatusLabel(deliveryStatus: string | null, orderStatus: string) {
  if (deliveryStatus === "DELIVERED" || orderStatus === "DELIVERED") {
    return "Entregada";
  }

  if (
    deliveryStatus === "IN_PROGRESS" ||
    orderStatus === "IN_PROGRESS" ||
    orderStatus === "ON_ROUTE"
  ) {
    return "En progreso";
  }

  if (deliveryStatus === "PENDING") {
    return "Pendiente de inicio";
  }

  if (!deliveryStatus) {
    return "Sin entrega activa";
  }

  return deliveryStatus;
}

function getStatusStyles(deliveryStatus: string | null, orderStatus: string) {
  if (deliveryStatus === "DELIVERED" || orderStatus === "DELIVERED") {
    return {
      container: "border-emerald-200 bg-emerald-50 text-emerald-700",
      icon: "bg-white text-emerald-600",
      dot: "bg-emerald-500",
    };
  }

  if (
    deliveryStatus === "IN_PROGRESS" ||
    orderStatus === "IN_PROGRESS" ||
    orderStatus === "ON_ROUTE"
  ) {
    return {
      container: "border-blue-200 bg-blue-50 text-blue-700",
      icon: "bg-white text-blue-600",
      dot: "bg-blue-500",
    };
  }

  if (deliveryStatus === "PENDING") {
    return {
      container: "border-amber-200 bg-amber-50 text-amber-700",
      icon: "bg-white text-amber-600",
      dot: "bg-amber-500",
    };
  }

  return {
    container: "border-slate-200 bg-slate-50 text-slate-700",
    icon: "bg-white text-slate-500",
    dot: "bg-slate-400",
  };
}

function formatDate(date: string | null | undefined) {
  if (!date) {
    return "No disponible";
  }

  return new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export function DeliveryManagementCard({
  deliveryStatus,
  orderStatus,
  hasAssignedDriver,
  driverName,
  startedAt,
  deliveredAt,
}: DeliveryManagementCardProps) {
  const statusLabel = getStatusLabel(deliveryStatus, orderStatus);
  const statusStyles = getStatusStyles(deliveryStatus, orderStatus);

  const isDelivered =
    deliveryStatus === "DELIVERED" || orderStatus === "DELIVERED";

  const isInProgress =
    deliveryStatus === "IN_PROGRESS" ||
    orderStatus === "IN_PROGRESS" ||
    orderStatus === "ON_ROUTE";

  return (
    <section>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Route size={18} />
        </div>

        <div>
          <h3 className="text-base font-semibold text-slate-950">
            Monitoreo de entrega
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Supervisa el estado operativo de la entrega asignada.
          </p>
        </div>
      </div>

      <div
        className={[
          "mt-5 rounded-2xl border p-4",
          statusStyles.container,
        ].join(" ")}
      >
        <div className="flex items-start gap-3">
          <div
            className={[
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl shadow-sm",
              statusStyles.icon,
            ].join(" ")}
          >
            {isDelivered ? (
              <CircleCheckBig size={18} />
            ) : isInProgress ? (
              <Route size={18} />
            ) : (
              <Clock3 size={18} />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] opacity-70">
              Estado actual
            </p>

            <div className="mt-1.5 flex items-center gap-2">
              <span
                className={[
                  "h-2 w-2 shrink-0 rounded-full",
                  statusStyles.dot,
                ].join(" ")}
              />

              <p className="text-sm font-semibold">{statusLabel}</p>
            </div>
          </div>
        </div>
      </div>

      {!hasAssignedDriver ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-amber-800">
          <AlertTriangle className="mt-0.5 shrink-0" size={17} />

          <p className="text-sm font-medium leading-5">
            Debes asignar un repartidor para continuar con el flujo operativo.
          </p>
        </div>
      ) : deliveryStatus === "PENDING" ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3.5 text-blue-800">
          <Info className="mt-0.5 shrink-0" size={17} />

          <p className="text-sm font-medium leading-5">
            La entrega está esperando que el repartidor la inicie desde su
            aplicación.
          </p>
        </div>
      ) : null}

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
              <UserRound size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                Repartidor
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-900">
                {driverName ?? "Sin repartidor asignado"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
              <CalendarClock size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                Inicio de entrega
              </p>

              <p className="mt-1 text-sm font-medium leading-5 text-slate-700">
                {startedAt ? formatDate(startedAt) : "Pendiente"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm">
              <CalendarCheck2 size={16} />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                Entrega completada
              </p>

              <p className="mt-1 text-sm font-medium leading-5 text-slate-700">
                {deliveredAt ? formatDate(deliveredAt) : "Pendiente"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
        <Info className="mt-0.5 shrink-0 text-slate-400" size={17} />

        <p className="text-xs leading-5 text-slate-500">
          El inicio y la finalización de la entrega se realizan desde la
          aplicación del repartidor. El panel administrativo se utiliza para
          asignar y supervisar la operación.
        </p>
      </div>
    </section>
  );
}