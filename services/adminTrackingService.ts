import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminTrackingLocation = {
  id: string;
  delivery_id: string;
  latitude: number;
  longitude: number;
  heading: number | null;
  speed: number | null;
  accuracy: number | null;
  recorded_at: string;
  created_at: string;
};

export async function getLatestTrackingLocation(
  deliveryId: string,
): Promise<AdminTrackingLocation | null> {
  const { data, error } = await supabaseAdmin
    .from("delivery_tracking")
    .select(
      `
      id,
      delivery_id,
      latitude,
      longitude,
      heading,
      speed,
      accuracy,
      recorded_at,
      created_at
    `,
    )
    .eq("delivery_id", deliveryId)
    .order("recorded_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "Error fetching latest delivery tracking location:",
      error.message,
    );

    throw new Error(
      `Could not fetch latest tracking location: ${error.message}`,
    );
  }


  return data as AdminTrackingLocation | null;
}