import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isLoginRoute = pathname.startsWith("/login");

  const isPublicRoute =
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/account-deletion") ||
    pathname.startsWith("/terms") ||
    pathname.startsWith("/auth/email-confirmed") ||
    pathname.startsWith("/auth/email-change-confirmed");

  if (!user) {
    if (isLoginRoute || isPublicRoute) {
      return response;
    }

    const loginUrl = request.nextUrl.clone();

    loginUrl.pathname = "/login";
    loginUrl.search = "";

    return NextResponse.redirect(loginUrl);
  }

  // Consultar el rol asociado al usuario autenticado.
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = !profileError && profile?.role === "admin";

  // Una sesión sin rol admin no puede acceder al panel.
  if (!isAdmin) {
    await supabase.auth.signOut();

    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("error", "unauthorized");

    const redirectResponse = NextResponse.redirect(loginUrl);

    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie);
    });

    return redirectResponse;
  }

  // Un administrador autenticado no debe volver a ver el login.
  if (isLoginRoute) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/";
    dashboardUrl.search = "";

    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}
