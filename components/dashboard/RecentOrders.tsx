import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderWorkflowActions } from "@/components/orders/OrderWorkflowActions";
import type { AdminOrder } from "@/types/order";

type RecentOrdersProps = {
  orders: AdminOrder[];
};

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    VALIDATION: "Nuevo",
    QUOTED: "Cotizado",
    ACCEPTED: "Aceptado",
    REJECTED: "Rechazado",
    IN_PROGRESS: "En preparación",
    ON_ROUTE: "En ruta",
    DELIVERED: "Entregado",
    CANCELLED: "Cancelado",
  };

  return labels[status] ?? status;
}

function getBadgeClass(status: string) {
  const styles: Record<string, string> = {
    VALIDATION: "bg-blue-50 text-blue-700",
    QUOTED: "bg-amber-50 text-amber-700",
    ACCEPTED: "bg-emerald-50 text-emerald-700",
    REJECTED: "bg-red-50 text-red-700",
    IN_PROGRESS: "bg-purple-50 text-purple-700",
    ON_ROUTE: "bg-cyan-50 text-cyan-700",
    DELIVERED: "bg-green-50 text-green-700",
    CANCELLED: "bg-slate-100 text-slate-600",
  };

  return styles[status] ?? "bg-slate-100 text-slate-600";
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const recentOrders = orders.slice(0, 8);

  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold text-slate-900">
          Pedidos recientes
        </CardTitle>

        <span className="text-sm font-medium text-[#12BFAE]">
          Ver todos
        </span>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Pedido</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Acción</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {recentOrders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-10 text-center text-slate-500"
                >
                  No hay pedidos todavía.
                </TableCell>
              </TableRow>
            ) : (
              recentOrders.map((order) => {
                const total = order.quotes?.[0]?.total ?? 0;

                return (
                  <TableRow key={order.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">
                      {order.profiles?.full_name ?? "Cliente sin nombre"}
                    </TableCell>

                    <TableCell className="max-w-[260px] truncate text-slate-500">
                      {order.description}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={`rounded-full px-3 py-1 ${getBadgeClass(
                          order.status
                        )}`}
                      >
                        {formatStatus(order.status)}
                      </Badge>
                    </TableCell>

                    <TableCell className="font-medium text-slate-700">
                      ₡{total.toLocaleString("es-CR")}
                    </TableCell>

                    <TableCell>
                      <OrderWorkflowActions
                        orderId={order.id}
                        status={order.status}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}