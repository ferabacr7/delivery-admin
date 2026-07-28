"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  ClipboardList,
  Users,
  Truck,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { createClient } from "@/lib/supabase/client";

export function Sidebar() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const router = useRouter();
  const supabase = createClient();

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const menuItems = [
    {
      label: t.sidebarDashboard,
      icon: Home,
      active: true,
      comingSoon: false,
    },
    {
      label: t.sidebarOrders,
      icon: ClipboardList,
      active: false,
      comingSoon: false,
    },
    {
      label: t.sidebarCustomers,
      icon: Users,
      active: false,
      comingSoon: true,
    },
    {
      label: t.sidebarDeliveries,
      icon: Truck,
      active: false,
      comingSoon: true,
    },
    {
      label: t.sidebarSettings,
      icon: Settings,
      active: false,
      comingSoon: true,
    },
  ];

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      setLogoutError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      setLogoutError(
        language === "es"
          ? "No se pudo cerrar la sesión. Inténtalo nuevamente."
          : "Unable to sign out. Please try again.",
      );
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col justify-between bg-[#052B35] text-white">
      <div>
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12BFAE]">
            <MapPin size={22} />
          </div>

          <div>
            <span className="block text-2xl font-bold tracking-tight">
              Delivery
            </span>

            <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
              Admin
            </span>
          </div>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                disabled={item.comingSoon}
                className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  item.active
                    ? "bg-[#12BFAE] text-white shadow-lg"
                    : item.comingSoon
                      ? "cursor-not-allowed text-white/40"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-4">
                  <Icon size={20} />
                  {item.label}
                </span>

                {item.comingSoon && (
                  <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/50">
                    {t.comingSoon}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4 px-4 pb-6">
        <div className="rounded-2xl bg-white/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
            {t.betaVersion}
          </p>

          <p className="mt-1 text-sm font-medium text-white">v0.1</p>
        </div>

        {logoutError ? (
          <p className="px-4 text-xs leading-5 text-red-300">
            {logoutError}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <LogOut size={20} />

          {isLoggingOut
            ? language === "es"
              ? "Cerrando sesión..."
              : "Signing out..."
            : t.sidebarLogout}
        </button>
      </div>
    </aside>
  );
}