import { connection } from "next/server";

import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AutoRefresh } from "@/components/dashboard/AutoRefresh";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { getAdminOrders } from "@/services/adminOrderService";

export default async function HomePage() {
  await connection();

  const orders = await getAdminOrders();

  return (
    <>
      <AutoRefresh />

      <AdminLayout>
        <section className="space-y-7">
          <DashboardHeader />

          <StatsGrid orders={orders} />

          <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
            <RecentOrders orders={orders} />

            <div className="xl:sticky xl:top-32">
              <ActivityFeed orders={orders} />
            </div>
          </div>
        </section>
      </AdminLayout>
    </>
  );
}