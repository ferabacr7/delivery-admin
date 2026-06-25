import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { AutoRefresh } from "@/components/dashboard/AutoRefresh";
import { getAdminOrders } from "@/services/adminOrderService";

export default async function HomePage() {
  const orders = await getAdminOrders();

  return (
    <>
      <AutoRefresh />

      <AdminLayout>
        <section className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Dashboard
            </h2>

            <p className="mt-2 text-slate-500">
              Resumen operativo de Delivery App.
            </p>
          </div>

          <StatsGrid orders={orders} />

          <div className="grid gap-8 xl:grid-cols-[1fr_360px]">
            <RecentOrders orders={orders} />
            <ActivityFeed />
          </div>
        </section>
      </AdminLayout>
    </>
  );
}