import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function isValidUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function POST(request: Request) {
  try {
    /*
     * Verificar que exista un usuario autenticado.
     */
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    /*
     * Verificar que el usuario autenticado tenga rol admin.
     */
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error(
        "ADMIN NOTES PROFILE LOOKUP ERROR:",
        profileError,
      );

      return NextResponse.json(
        {
          error: "Unable to verify administrator permissions",
        },
        { status: 500 },
      );
    }

    if (!profile || profile.role !== "admin") {
      return NextResponse.json(
        {
          error: "Forbidden",
        },
        { status: 403 },
      );
    }

    /*
     * Obtener y validar el orderId de la URL.
     */
    const url = new URL(request.url);

    const pathSegments = url.pathname.split("/").filter(Boolean);

    const adminNotesIndex = pathSegments.lastIndexOf("admin-notes");

    const orderId =
      adminNotesIndex > 0
        ? pathSegments[adminNotesIndex - 1]
        : null;

    if (!orderId) {
      return NextResponse.json(
        {
          error: "Missing orderId",
        },
        { status: 400 },
      );
    }

    if (!isValidUuid(orderId)) {
      return NextResponse.json(
        {
          error: "Invalid orderId",
        },
        { status: 400 },
      );
    }

    const body = await request.json();

    const adminNotes =
      typeof body.adminNotes === "string"
        ? body.adminNotes.trim()
        : "";

    /*
     * Verificar que el pedido exista.
     */
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .maybeSingle();

    if (orderError) {
      console.error(
        "ADMIN NOTES ORDER LOOKUP ERROR:",
        orderError,
      );

      return NextResponse.json(
        {
          error: orderError.message,
        },
        { status: 500 },
      );
    }

    if (!order) {
      return NextResponse.json(
        {
          error: "Order not found",
        },
        { status: 404 },
      );
    }

    /*
     * Actualizar únicamente admin_notes.
     */
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({
        admin_notes: adminNotes || null,
      })
      .eq("id", orderId);

    if (updateError) {
      console.error(
        "ADMIN NOTES UPDATE ERROR:",
        updateError,
      );

      return NextResponse.json(
        {
          error: updateError.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      adminNotes: adminNotes || null,
    });
  } catch (error) {
    console.error("ADMIN NOTES API ERROR:", error);

    return NextResponse.json(
      {
        error:
          "Unexpected error while saving administrative notes.",
      },
      { status: 500 },
    );
  }
}