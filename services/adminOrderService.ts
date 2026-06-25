import { supabaseAdmin } from "@/lib/supabaseAdmin";
import type { AdminOrder } from "@/types/order";

export async function getAdminOrders(): Promise<AdminOrder[]> {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select(`
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
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching admin orders:", error.message);
    throw new Error(`Could not fetch admin orders: ${error.message}`);
  }

  return (data ?? []) as unknown as AdminOrder[];
}