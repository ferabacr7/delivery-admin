import { notFound } from "next/navigation";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrderDetailContent } from "@/components/orders/OrderDetailContent";
import { OrderStatusRealtimeProvider } from "@/components/orders/OrderStatusRealtimeProvider";

import { getActiveDrivers } from "@/services/adminDriverService";
import { getAdminOrderById } from "@/services/adminOrderService";
import { getLatestTrackingLocation } from "@/services/adminTrackingService";

import type { OrderStatus } from "@/types/order";

import { AutoRefresh } from "@/components/dashboard/AutoRefresh";

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

  return (
    <>
      <AutoRefresh />

      <AdminLayout>
        <OrderStatusRealtimeProvider
          orderId={order.id}
          initialOrderStatus={normalizedOrderStatus}
          initialDeliveryStatus={normalizedDeliveryStatus}
        >
          <OrderDetailContent
            order={order}
            latestQuote={latestQuote}
            delivery={delivery}
            drivers={drivers}
            tracking={tracking}
          />
        </OrderStatusRealtimeProvider>
      </AdminLayout>
    </>
  );
}
