import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AdminOrder, AdminOrderDetail } from "@/types/order";

const quoteFields = `
  id,
  subtotal,
  delivery_fee,
  total,
  status,
  service_type,
  zone,
  estimated_distance_km,
  quote_source,
  calculation_version,
  service_fee,
  commission,
  surcharges,
  currency,
  service_fee_crc,
  delivery_fee_crc,
  subtotal_crc,
  total_crc
`;

const orderPaymentFields = `
  estimated_purchase_amount,
  estimated_purchase_currency,
  payment_method,
  cash_payment_amount,
  cash_payment_currency
`;

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      description,
      status,
      created_at,
      profile_id,
      address_id,
      ${orderPaymentFields},

      profiles (
        full_name,
        phone
      ),

      addresses (
        label,
        address_line,
        reference
      ),

      quotes (
        ${quoteFields}
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin orders:", error.message);

    throw new Error(
      `Could not fetch admin orders: ${error.message}`,
    );
  }

  return (data ?? []) as unknown as AdminOrder[];
}

export async function getAdminOrderById(
  orderId: string,
): Promise<AdminOrderDetail | null> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(
      `
      id,
      description,
      status,
      created_at,
      profile_id,
      address_id,
      admin_notes,
      ${orderPaymentFields},

      profiles (
        full_name,
        phone
      ),

      addresses (
        label,
        address_line,
        reference
      ),

      quotes (
        ${quoteFields}
      ),

      deliveries (
        id,
        status,
        driver_id,
        started_at,
        delivered_at,
        updated_at,

        driver:profiles!deliveries_driver_id_fkey (
          full_name,
          phone
        )
      )
    `,
    )
    .eq("id", orderId)
    .maybeSingle();

  if (error) {
    console.error(
      "Error fetching admin order detail:",
      error.message,
    );

    throw new Error(
      `Could not fetch order detail: ${error.message}`,
    );
  }

  return data as unknown as AdminOrderDetail | null;
}