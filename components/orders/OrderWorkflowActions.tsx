"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ORDER_WORKFLOW_ACTIONS } from "@/constants/workflow";
import { updateDeliveryWorkflow } from "@/services/deliveryService";
import type { OrderStatus } from "@/types/order";

type OrderWorkflowActionsProps = {
  orderId: string;
  status: OrderStatus;
};

export function OrderWorkflowActions({
  orderId,
  status,
}: OrderWorkflowActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const action = ORDER_WORKFLOW_ACTIONS[status];

  if (!action) {
    return <span className="text-sm text-slate-400">Sin acción</span>;
  }

  const workflowAction = action;

  async function handleClick() {
    try {
      setLoading(true);

      await updateDeliveryWorkflow(orderId, workflowAction.nextStatus);

      router.refresh();
    } catch (error) {
      console.error("Workflow update error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "No se pudo actualizar el estado del pedido.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className="rounded-xl bg-[#12BFAE] text-white hover:bg-[#0EA89A]"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Actualizando
        </>
      ) : (
        workflowAction.label
      )}
    </Button>
  );
}