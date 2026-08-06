import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

export type AdminOrderRealtimeEvent = {
  id: string;
  description: string;
  status: string;
  created_at: string;
  profile_id: string;
  address_id: string | null;
};

export function subscribeToNewOrders(
  onOrder: (order: AdminOrderRealtimeEvent) => void,
): RealtimeChannel {
  const channel = supabase
    .channel("admin-new-orders")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "orders",
      },
      (payload) => {
        onOrder(payload.new as AdminOrderRealtimeEvent);
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribeNewOrders(
  channel: RealtimeChannel | null,
) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}