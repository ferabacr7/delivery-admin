import type { RealtimeChannel } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";
import type { AdminTrackingLocation } from "./adminTrackingService";

const supabase = createClient();

export function subscribeToTracking(
  deliveryId: string,
  onLocation: (location: AdminTrackingLocation) => void,
): RealtimeChannel {
  const channel = supabase
    .channel(`delivery-tracking-${deliveryId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "delivery_tracking",
        filter: `delivery_id=eq.${deliveryId}`,
      },
      (payload: { new: Record<string, unknown> }) => {
        onLocation(payload.new as AdminTrackingLocation);
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribeTracking(
  channel: RealtimeChannel | null,
) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}