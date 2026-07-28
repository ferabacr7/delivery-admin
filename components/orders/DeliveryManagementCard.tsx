"use client";

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
    return "Pendiente de inicio por el repartidor";
  }

  if (!deliveryStatus) {
    return "Sin entrega activa";
  }

  return deliveryStatus;
}

function getStatusStyles(deliveryStatus: string | null, orderStatus: string) {
  if (deliveryStatus === "DELIVERED" || orderStatus === "DELIVERED") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    deliveryStatus === "IN_PROGRESS" ||
    orderStatus === "IN_PROGRESS" ||
    orderStatus === "ON_ROUTE"
  ) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (deliveryStatus === "PENDING") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function formatDate(date: string | null | undefined) {
  if (!date) {
    return "No disponible";
  }

  return new Date(date).toLocaleString("es-CR");
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

  return (
    <article className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      {" "}
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          Monitoreo de entrega
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Supervisa el estado operativo de la entrega asignada.
        </p>
      </div>
      <div className={`mt-5 rounded-2xl border px-4 py-4 ${statusStyles}`}>
        <p className="text-xs font-semibold uppercase tracking-wide opacity-70">
          Estado actual
        </p>

        <p className="mt-1 text-sm font-bold">{statusLabel}</p>
      </div>
      {!hasAssignedDriver ? (
        <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-sm font-medium text-amber-800">
            Debes asignar un repartidor para continuar con el flujo operativo.
          </p>
        </div>
      ) : deliveryStatus === "PENDING" ? (
        <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-3">
          <p className="text-sm font-medium text-blue-800">
            La entrega está esperando que el repartidor la inicie desde su
            aplicación.
          </p>
        </div>
      ) : null}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Repartidor
          </p>

          <p className="mt-1 text-sm font-semibold text-slate-900">
            {driverName ?? "Sin repartidor asignado"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Inicio de entrega
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {startedAt ? formatDate(startedAt) : "Pendiente"}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4 sm:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Entrega completada
          </p>

          <p className="mt-1 text-sm font-medium text-slate-700">
            {deliveredAt ? formatDate(deliveredAt) : "Pendiente"}
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <p className="text-sm text-slate-600">
          El inicio y la finalización de la entrega se realizan desde la
          aplicación del repartidor. El panel administrativo funciona como
          herramienta de asignación y supervisión.
        </p>
      </div>
    </article>
  );
}
