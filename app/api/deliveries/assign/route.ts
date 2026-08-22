import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(request: Request) {
  try {
    /*
     * Verificar usuario autenticado.
     */
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    /*
     * Verificar rol administrador.
     */
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "DRIVER ASSIGNMENT PROFILE LOOKUP ERROR:",
        profileError,
      );

      return NextResponse.json(
        { error: "Unable to verify administrator permissions" },
        { status: 500 },
      );
    }

    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 },
      );
    }

    const body = await request.json();

    const orderId = body.orderId as string;
    const driverId = body.driverId as string;

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 },
      );
    }

    if (!driverId) {
      return NextResponse.json(
        { error: "Missing driverId" },
        { status: 400 },
      );
    }

    const { data: driver, error: driverError } = await supabaseAdmin
      .from("profiles")
      .select("id, role, is_active")
      .eq("id", driverId)
      .maybeSingle();

    if (driverError) {
      return NextResponse.json(
        { error: driverError.message },
        { status: 500 },
      );
    }

    if (!driver || driver.role !== "driver" || !driver.is_active) {
      return NextResponse.json(
        { error: "Driver is invalid or inactive" },
        { status: 400 },
      );
    }

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("id, status")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      return NextResponse.json(
        { error: orderError.message },
        { status: 500 },
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 },
      );
    }

    const { data: existingDelivery, error: existingDeliveryError } =
      await supabaseAdmin
        .from("deliveries")
        .select("id, driver_id, status")
        .eq("order_id", orderId)
        .maybeSingle();

    if (existingDeliveryError) {
      return NextResponse.json(
        { error: existingDeliveryError.message },
        { status: 500 },
      );
    }

    const isInitialAssignment =
      !existingDelivery || !existingDelivery.driver_id;

    if (isInitialAssignment && order.status !== "ACCEPTED") {
      return NextResponse.json(
        {
          error:
            "El repartidor solo puede asignarse cuando la orden está aceptada.",
        },
        { status: 400 },
      );
    }

    if (existingDelivery) {
      const { error: updateError } = await supabaseAdmin
        .from("deliveries")
        .update({
          driver_id: driverId,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingDelivery.id);

      if (updateError) {
        return NextResponse.json(
          { error: updateError.message },
          { status: 500 },
        );
      }
    } else {
      const { error: insertError } = await supabaseAdmin
        .from("deliveries")
        .insert({
          order_id: orderId,
          driver_id: driverId,
          status: "PENDING",
        });

      if (insertError) {
        return NextResponse.json(
          { error: insertError.message },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({
      success: true,
      orderId,
      driverId,
    });
  } catch (error) {
    console.error("Driver assignment API error:", error);

    return NextResponse.json(
      { error: "Unexpected driver assignment error" },
      { status: 500 },
    );
  }
}