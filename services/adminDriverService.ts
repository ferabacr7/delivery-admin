import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminDriver = {
  id: string;
  full_name: string;
  phone: string | null;
  is_active: boolean;
};

export async function getActiveDrivers(): Promise<AdminDriver[]> {
  const { data, error } = await supabaseAdmin
    .from("profiles")
    .select(`
      id,
      full_name,
      phone,
      is_active
    `)
    .eq("role", "driver")
    .eq("is_active", true)
    .order("full_name", { ascending: true });

  if (error) {
    console.error("Error fetching active drivers:", error.message);

    throw new Error(
      `Could not fetch active drivers: ${error.message}`
    );
  }

  return (data ?? []) as AdminDriver[];
}