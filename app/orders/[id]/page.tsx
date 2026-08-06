import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  CircleDollarSign,
  ClipboardList,
  MapPin,
  NotebookPen,
  Package,
  Phone,
  UserRound,
} from "lucide-react";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { DeliveryManagementCard } from "@/components/orders/DeliveryManagementCard";
import { DeliveryTrackingCard } from "@/components/orders/DeliveryTrackingCard";
import { DriverAssignmentCard } from "@/components/orders/DriverAssignmentCard";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";
import { OrderStatusRealtimeProvider } from "@/components/orders/OrderStatusRealtimeProvider";
import { OrderTimeline } from "@/components/orders/OrderTimeline";

import { getActiveDrivers } from "@/services/adminDriverService";
import { getAdminOrderById } from "@/services/adminOrderService";
import { getLatestTrackingLocation } from "@/services/adminTrackingService";

import type { OrderStatus } from "@/types/order";

type DeliveryStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "ON_ROUTE"
  | "DELIVERED"
  | "CANCELLED";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function normalizeStatus(status: string): OrderStatus {
  return status.toUpperCase() as OrderStatus;
}

function formatAmount(value: number | string | null | undefined) {
  if (value == null) {
    return "Sin cotización";
  }

  return `₡${Number(value).toLocaleString("es-CR")}`;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;

  const [order, drivers] = await Promise.all([
    getAdminOrderById(id),
    getActiveDrivers(),
  ]);

  if (!order) {
    notFound();
  }

  const latestQuote = order.quotes?.[0] ?? null;
  const delivery = order.deliveries ?? null;

  const tracking = delivery
    ? await getLatestTrackingLocation(delivery.id)
    : null;

  const normalizedOrderStatus = normalizeStatus(order.status);

  const normalizedDeliveryStatus =
    (delivery?.status as DeliveryStatus | null) ?? null;

  const formattedCreatedAt = new Intl.DateTimeFormat("es-CR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(order.created_at));

  return (
    <AdminLayout>
      <OrderStatusRealtimeProvider
        orderId={order.id}
        initialOrderStatus={normalizedOrderStatus}
        initialDeliveryStatus={normalizedDeliveryStatus}
      >
        <section className="space-y-7">
          {/* Header */}
          <header className="flex flex-col gap-5 rounded-[28px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand transition hover:text-brand-dark"
              >
                <ArrowLeft size={16} />
                Volver al dashboard
              </Link>

              <div className="mt-5 flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                  <Package size={22} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                    Gestión operativa
                  </p>

                  <h1 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-[30px]">
                    Detalle del pedido
                  </h1>

                  <p className="mt-2 text-sm text-slate-500">
                    Pedido #{order.id.slice(0, 8)}
                  </p>
                </div>
              </div>
            </div>

            <OrderStatusBadge />
          </header>

          {/* Timeline Realtime */}
          <OrderTimeline />

          {/* Main content */}
          <div className="space-y-6">
            {/* Fila 1: Cliente + Pedido + Dirección */}
            <div className="grid gap-6 xl:grid-cols-3">
              {/* Cliente */}
              <article className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <UserRound size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                      Cliente
                    </p>

                    <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
                      Información del cliente
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Nombre
                    </p>

                    <p className="mt-1.5 text-sm font-semibold text-slate-900">
                      {order.profiles?.full_name ?? "Sin nombre"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Teléfono
                    </p>

                    <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700">
                      <Phone size={15} className="text-slate-400" />
                      {order.profiles?.phone ?? "Sin teléfono"}
                    </div>
                  </div>
                </div>
              </article>

              {/* Pedido */}
              <article className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <ClipboardList size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                      Solicitud
                    </p>

                    <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
                      Información del pedido
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Descripción
                    </p>

                    <p className="mt-1.5 text-sm leading-6 text-slate-700">
                      {order.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Fecha de creación
                    </p>

                    <div className="mt-1.5 flex items-center gap-2 text-sm text-slate-700">
                      <CalendarDays size={15} className="text-slate-400" />
                      {formattedCreatedAt}
                    </div>
                  </div>
                </div>
              </article>

              {/* Dirección */}
              <article className="rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                      Destino
                    </p>

                    <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
                      Dirección de entrega
                    </h2>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Etiqueta
                    </p>

                    <p className="mt-1.5 text-sm font-semibold text-slate-900">
                      {order.addresses?.label ?? "Sin etiqueta"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Dirección
                    </p>

                    <p className="mt-1.5 text-sm leading-6 text-slate-700">
                      {order.addresses?.address_line ?? "Sin dirección"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Referencia
                    </p>

                    <p className="mt-1.5 text-sm leading-6 text-slate-700">
                      {order.addresses?.reference ?? "Sin referencia"}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Fila 2: columnas alineadas */}
            <div className="grid gap-6 xl:grid-cols-3 xl:items-stretch">
              {/* Columna izquierda: Información de entrega */}
              <article className="h-full rounded-[26px] border border-slate-200/80 bg-white p-6 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
                    Operación
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-slate-950">
                    Información de entrega
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Asigna el repartidor responsable de esta entrega.
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

              {/* Columna central: Monitoreo */}
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

              {/* Columna derecha: Cotización + Notas */}
              <div className="flex h-full flex-col gap-4">
                {/* Cotización */}
                <article className="rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                      <CircleDollarSign size={17} />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Finanzas
                      </p>

                      <h2 className="mt-0.5 text-base font-semibold text-slate-950">
                        Cotización
                      </h2>
                    </div>
                  </div>

                  <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                      <span className="text-sm text-slate-500">
                        Subtotal
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {formatAmount(latestQuote?.subtotal)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-3">
                      <span className="text-sm text-slate-500">
                        Tarifa de entrega
                      </span>

                      <span className="text-sm font-semibold text-slate-900">
                        {formatAmount(latestQuote?.delivery_fee)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-4 bg-slate-50 px-4 py-4">
                      <span className="font-semibold text-slate-950">
                        Total
                      </span>

                      <span className="text-lg font-semibold tracking-[-0.03em] text-slate-950">
                        {formatAmount(latestQuote?.total)}
                      </span>
                    </div>
                  </div>
                </article>

                {/* Notas administrativas */}
                <article className="flex flex-1 flex-col rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                      <NotebookPen size={17} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                        Interno
                      </p>

                      <h2 className="mt-0.5 text-base font-semibold text-slate-950">
                        Notas administrativas
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        Observaciones internas del pedido.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-1 flex-col">
                    <textarea
                      rows={3}
                      placeholder="Escribe una nota..."
                      className="min-h-[86px] w-full flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/10"
                    />

                    <button
                      type="button"
                      className="mt-3 w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
                    >
                      Guardar nota
                    </button>
                  </div>
                </article>
              </div>
            </div>

            {/* Fila 3: Tracking */}
            <DeliveryTrackingCard
              deliveryId={delivery?.id ?? null}
              tracking={tracking}
            />
          </div>
        </section>
      </OrderStatusRealtimeProvider>
    </AdminLayout>
  );
}