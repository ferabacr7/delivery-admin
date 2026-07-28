import { NextResponse } from "next/server";
import {
  DELIVERY_WORKFLOW_STATUSES,
  type DeliveryWorkflowStatus,
} from "@/constants/workflow";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    const orderId = body.orderId as string;
    const nextStatus = body.nextStatus as DeliveryWorkflowStatus;

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    if (!DELIVERY_WORKFLOW_STATUSES.includes(nextStatus)) {
      return NextResponse.json(
        { error: "Invalid delivery status" },
        { status: 400 },
      );
    }

    const { data: existingDelivery, error: existingError } = await supabaseAdmin
      .from("deliveries")
      .select("id")
      .eq("order_id", orderId)
      .maybeSingle();

    if (existingError) {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 },
      );
    }

    if (!existingDelivery) {
      const newDelivery: {
        order_id: string;
        status: DeliveryWorkflowStatus;
        started_at?: string;
        delivered_at?: string;
      } = {
        order_id: orderId,
        status: nextStatus,
      };

      if (nextStatus === "IN_PROGRESS") {
        newDelivery.started_at = new Date().toISOString();
      }

      if (nextStatus === "DELIVERED") {
        newDelivery.delivered_at = new Date().toISOString();
      }

      const { error: createDeliveryError } = await supabaseAdmin
        .from("deliveries")
        .insert(newDelivery);

      if (createDeliveryError) {
        return NextResponse.json(
          { error: createDeliveryError.message },
          { status: 500 },
        );
      }
    } else {
      const deliveryUpdate: {
        status: DeliveryWorkflowStatus;
        started_at?: string;
        delivered_at?: string;
      } = {
        status: nextStatus,
      };

      if (nextStatus === "IN_PROGRESS") {
        deliveryUpdate.started_at = new Date().toISOString();
      }

      if (nextStatus === "DELIVERED") {
        deliveryUpdate.delivered_at = new Date().toISOString();
      }

      const { error: updateDeliveryError } = await supabaseAdmin
        .from("deliveries")
        .update(deliveryUpdate)
        .eq("order_id", orderId);

      if (updateDeliveryError) {
        return NextResponse.json(
          { error: updateDeliveryError.message },
          { status: 500 },
        );
      }
    }

    const { error: updateOrderError } = await supabaseAdmin
      .from("orders")
      .update({
        status: nextStatus,
      })
      .eq("id", orderId);

    if (updateOrderError) {
      return NextResponse.json(
        { error: updateOrderError.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      nextStatus,
    });
  } catch (error) {
    console.error("Workflow API error:", error);

    return NextResponse.json(
      { error: "Unexpected workflow error" },
      { status: 500 },
    );
  }
}
