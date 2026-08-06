import { supabaseAdmin } from "@/lib/supabase/admin";
import type { AdminOrder, AdminOrderDetail } from "@/types/order";

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
        id,
        subtotal,
        delivery_fee,
        total,
        status
      )
    `,
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin orders:", error.message);
    throw new Error(`Could not fetch admin orders: ${error.message}`);
  }

  console.log("ADMIN ORDERS:", data);
  
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
        id,
        subtotal,
        delivery_fee,
        total,
        status
      ),

      deliveries (
  id,
  status,
  driver_id,
  started_at,
  delivered_at,
  created_at,
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
    console.error("Error fetching admin order detail:", error.message);

    throw new Error(`Could not fetch order detail: ${error.message}`);
  }

  return data as AdminOrderDetail | null;
}
