import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

import type { AdminTrackingLocation } from "./adminTrackingService";

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
      (payload) => {
        onLocation(payload.new as AdminTrackingLocation);
      },
    )
    .subscribe();

  return channel;
}

export function unsubscribeTracking(channel: RealtimeChannel | null) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}
