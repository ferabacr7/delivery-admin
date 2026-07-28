import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { DeliveryManagementCard } from "@/components/orders/DeliveryManagementCard";
import { DeliveryTrackingCard } from "@/components/orders/DeliveryTrackingCard";
import { DriverAssignmentCard } from "@/components/orders/DriverAssignmentCard";
import { getActiveDrivers } from "@/services/adminDriverService";
import { getAdminOrderById } from "@/services/adminOrderService";
import { getLatestTrackingLocation } from "@/services/adminTrackingService";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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

  return (
    <AdminLayout>
      <section className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-teal-600 transition hover:text-teal-700"
            >
              ← Volver al Dashboard
            </Link>

            <h1 className="mt-3 text-2xl font-bold text-slate-900">
              Detalle del pedido
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Pedido #{order.id.slice(0, 8)}
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
            {order.status}
          </span>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Información del cliente
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Nombre
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {order.profiles?.full_name ?? "Sin nombre"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Teléfono
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {order.profiles?.phone ?? "Sin teléfono"}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Información del pedido
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Descripción
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {order.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Fecha de creación
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {new Date(order.created_at).toLocaleString("es-CR")}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Dirección de entrega
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Etiqueta
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {order.addresses?.label ?? "Sin etiqueta"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Dirección
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {order.addresses?.address_line ?? "Sin dirección"}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Referencia
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  {order.addresses?.reference ?? "Sin referencia"}
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">Cotización</h2>

            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">Subtotal</span>

                <span className="text-sm font-medium text-slate-900">
                  {latestQuote?.subtotal != null
                    ? `₡${Number(latestQuote.subtotal).toLocaleString("es-CR")}`
                    : "Sin cotización"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-slate-500">
                  Tarifa de entrega
                </span>

                <span className="text-sm font-medium text-slate-900">
                  {latestQuote?.delivery_fee != null
                    ? `₡${Number(latestQuote.delivery_fee).toLocaleString(
                        "es-CR",
                      )}`
                    : "Sin cotización"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <span className="font-semibold text-slate-900">Total</span>

                <span className="text-lg font-bold text-slate-900">
                  {latestQuote?.total != null
                    ? `₡${Number(latestQuote.total).toLocaleString("es-CR")}`
                    : "Sin cotización"}
                </span>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
            <h2 className="text-lg font-bold text-slate-900">
              Información de entrega
            </h2>

            <div className="mt-5 space-y-6">
              <DriverAssignmentCard
                orderId={order.id}
                drivers={drivers}
                currentDriverId={delivery?.driver_id ?? null}
              />

              <DeliveryManagementCard
                deliveryStatus={delivery?.status ?? null}
                orderStatus={order.status}
                hasAssignedDriver={Boolean(delivery?.driver_id)}
                driverName={delivery?.driver?.full_name ?? null}
                startedAt={delivery?.started_at ?? null}
                deliveredAt={delivery?.delivered_at ?? null}
              />
            </div>
          </article>

          <div className="xl:col-span-2">
            <DeliveryTrackingCard
              deliveryId={delivery?.id ?? null}
              tracking={tracking}
            />
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
