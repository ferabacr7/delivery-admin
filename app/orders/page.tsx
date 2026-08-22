import { connection } from "next/server";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { OrdersPageContent } from "@/components/orders/OrdersPageContent";
import { getAdminOrders } from "@/services/adminOrderService";
import { AutoRefresh } from "@/components/dashboard/AutoRefresh";

export default async function OrdersPage() {
  await connection();

  const orders = await getAdminOrders();

  return (
    <>
      <AutoRefresh />

      <AdminLayout>
        <OrdersPageContent orders={orders} />
      </AdminLayout>
    </>
  );
}
