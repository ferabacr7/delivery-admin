import { createBrowserClient } from "@supabase/ssr";

type BrowserSupabaseClient =
  ReturnType<typeof createBrowserClient>;

type SupabaseWindow = Window & {
  __orbitSupabaseClient?: BrowserSupabaseClient;
};

export function createClient(): BrowserSupabaseClient {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  if (typeof window === "undefined") {
    return createBrowserClient(
      supabaseUrl,
      supabaseAnonKey,
    );
  }

  const browserWindow = window as SupabaseWindow;

  if (!browserWindow.__orbitSupabaseClient) {
    browserWindow.__orbitSupabaseClient =
      createBrowserClient(
        supabaseUrl,
        supabaseAnonKey,
      );
  }

  return browserWindow.__orbitSupabaseClient;
}