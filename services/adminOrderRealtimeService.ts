import type { RealtimeChannel } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

export type AdminOrderRealtimeEvent = {
  id: string;
  description: string;
  status: string;
  created_at: string;
  profile_id: string;
  address_id: string | null;
};

const supabase = createClient();

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
      (payload: { new: Record<string, unknown> }) => {
        onOrder(payload.new as AdminOrderRealtimeEvent);
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribeNewOrders(channel: RealtimeChannel | null) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}
