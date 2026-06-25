import {
  ClipboardList,
  FileText,
  PackageCheck,
  Truck,
} from "lucide-react";
import { DashboardCard } from "./DashboardCard";
import type { AdminOrder } from "@/types/order";

type StatsGridProps = {
  orders: AdminOrder[];
};

export function StatsGrid({ orders }: StatsGridProps) {
  const validation = orders.filter(
    (order) => order.status === "VALIDATION"
  ).length;

  const quoted = orders.filter(
    (order) => order.status === "QUOTED"
  ).length;

  const inProgress = orders.filter(
    (order) => order.status === "IN_PROGRESS"
  ).length;

  const onRoute = orders.filter(
    (order) => order.status === "ON_ROUTE"
  ).length;

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <DashboardCard
        title="Pedidos nuevos"
        value={validation}
        description="Esperando revisión"
        icon={ClipboardList}
      />

      <DashboardCard
        title="Cotizaciones"
        value={quoted}
        description="Pendientes de respuesta"
        icon={FileText}
      />

      <DashboardCard
        title="En preparación"
        value={inProgress}
        description="Pedidos aceptados"
        icon={PackageCheck}
      />

      <DashboardCard
        title="En ruta"
        value={onRoute}
        description="Pedidos activos"
        icon={Truck}
      />
    </section>
  );
}