import type { OrderStatus } from "@/types/order";

export type DeliveryWorkflowStatus = "IN_PROGRESS" | "ON_ROUTE" | "DELIVERED";

export const DELIVERY_WORKFLOW_STATUSES: DeliveryWorkflowStatus[] = [
  "IN_PROGRESS",
  "ON_ROUTE",
  "DELIVERED",
];

export const ORDER_WORKFLOW_ACTIONS: Partial<
  Record<
    OrderStatus,
    {
      label: string;
      nextStatus: DeliveryWorkflowStatus;
    }
  >
> = {
  ACCEPTED: {
    label: "Iniciar preparación",
    nextStatus: "IN_PROGRESS",
  },
  IN_PROGRESS: {
    label: "Marcar en ruta",
    nextStatus: "ON_ROUTE",
  },
  ON_ROUTE: {
    label: "Marcar entregado",
    nextStatus: "DELIVERED",
  },
};