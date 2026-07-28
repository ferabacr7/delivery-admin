import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const orderId = body.orderId as string;
    const subtotal = Number(body.subtotal);
    const deliveryFee = Number(body.deliveryFee);
    const total = Number(body.total);
    const notes = body.notes as string | undefined;

    if (!orderId) {
      return NextResponse.json(
        { error: "Missing orderId" },
        { status: 400 }
      );
    }

    if (
      Number.isNaN(subtotal) ||
      Number.isNaN(deliveryFee) ||
      Number.isNaN(total)
    ) {
      return NextResponse.json(
        { error: "Invalid quote amounts" },
        { status: 400 }
      );
    }

    if (subtotal < 0 || deliveryFee < 0 || total < 0) {
      return NextResponse.json(
        { error: "Amounts cannot be negative" },
        { status: 400 }
      );
    }

    const { error: quoteError } = await supabaseAdmin.from("quotes").insert({
      order_id: orderId,
      subtotal,
      delivery_fee: deliveryFee,
      total,
      notes: notes ?? null,
      status: "PENDING",
    });

    if (quoteError) {
      return NextResponse.json(
        { error: quoteError.message },
        { status: 500 }
      );
    }

    const { error: orderError } = await supabaseAdmin
      .from("orders")
      .update({
        status: "QUOTED",
      })
      .eq("id", orderId);

    if (orderError) {
      return NextResponse.json(
        { error: orderError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
    });
  } catch (error) {
    console.error("Quote API error:", error);

    return NextResponse.json(
      { error: "Unexpected quote error" },
      { status: 500 }
    );
  }
}
