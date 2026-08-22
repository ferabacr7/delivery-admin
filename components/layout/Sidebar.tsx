"use client";

import { useContext, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ClipboardList,
  Home,
  LogOut,
  MapPin,
  Rocket,
  Settings,
  Truck,
  Users,
} from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { createClient } from "@/lib/supabase/client";

type MenuItem = {
  label: string;
  icon: typeof Home;
  href?: string;
  comingSoon: boolean;
};

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const router = useRouter();
  const pathname = usePathname();

  const supabase = useMemo(() => createClient(), []);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      label: t.sidebarDashboard,
      icon: Home,
      href: "/",
      comingSoon: false,
    },
    {
      label: t.sidebarOrders,
      icon: ClipboardList,
      href: "/orders",
      comingSoon: false,
    },
    {
      label: t.sidebarCustomers,
      icon: Users,
      comingSoon: true,
    },
    {
      label: t.sidebarDeliveries,
      icon: Truck,
      comingSoon: true,
    },
    {
      label: t.sidebarSettings,
      icon: Settings,
      href: "/settings",
      comingSoon: false,
    },
  ];

  function isItemActive(item: MenuItem) {
    if (!item.href) {
      return false;
    }

    if (item.href === "/") {
      return pathname === "/";
    }

    if (item.href === "/orders") {
      return pathname === "/orders" || pathname.startsWith("/orders/");
    }

    return pathname.startsWith(item.href);
  }

  function handleNavigation(item: MenuItem) {
    if (!item.href || item.comingSoon) {
      return;
    }

    onClose();
    router.push(item.href);
  }

  async function handleLogout() {
    try {
      setIsLoggingOut(true);
      setLogoutError(null);

      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      onClose();
      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("LOGOUT ERROR:", error);

      setLogoutError(t.sidebarLogoutError);
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-[2px] lg:hidden"
        />
      ) : null}

      <aside
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden border-r border-white/10 bg-sidebar-brand text-white shadow-[12px_0_35px_rgba(6,27,58,0.18)] transition-transform duration-300 ease-out",
          isOpen
            ? "translate-x-0"
            : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 -top-28 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-sidebar-brand-light/35 blur-3xl" />
        </div>

        {/* Brand */}
        <div className="relative flex items-center gap-3.5 px-5 pb-7 pt-6">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-[0_10px_25px_rgba(247,95,42,0.28)]">
            <MapPin size={22} strokeWidth={2.4} />

            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-sidebar-brand bg-white" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-xl font-semibold tracking-[-0.03em] text-white">
              ORBIT
            </p>

            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-brand">
              Admin
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="px-5">
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40">
              {t.sidebarNavigation}
            </p>
          </div>

          <nav className="space-y-1.5 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isItemActive(item);

              return (
                <button
                  key={item.label}
                  type="button"
                  disabled={item.comingSoon}
                  onClick={() => handleNavigation(item)}
                  className={[
                    "group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200",
                    active
                      ? "bg-sidebar-brand-light text-white shadow-[0_10px_24px_rgba(0,0,0,0.18)]"
                      : item.comingSoon
                        ? "cursor-not-allowed text-white/35"
                        : "text-white/75 hover:bg-white/[0.07] hover:text-white",
                  ].join(" ")}
                >
                  {active ? (
                    <span className="absolute -left-3 h-8 w-1 rounded-r-full bg-brand" />
                  ) : null}

                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200",
                      active
                        ? "bg-white/10 text-brand"
                        : item.comingSoon
                          ? "bg-white/[0.04] text-white/30"
                          : "bg-white/[0.06] text-white/70 group-hover:bg-white/10 group-hover:text-brand",
                    ].join(" ")}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </span>

                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {item.label}
                  </span>

                  {item.comingSoon ? (
                    <span className="rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-[8px] font-bold uppercase tracking-[0.08em] text-white/45">
                      {t.comingSoon}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="mx-5 mt-6 border-t border-white/10" />
        </div>

        {/* Bottom section */}
        <div className="relative space-y-3 px-3 pb-4">
          {/* Beta card */}
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.10)] backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/15 text-brand">
                <Rocket size={19} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/50">
                  {t.betaVersion}
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  v0.1
                </p>
              </div>
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-brand to-brand-dark" />
            </div>

            <p className="mt-2 text-[10px] leading-4 text-white/45">
              {t.sidebarBetaDescription}
            </p>
          </div>

          {logoutError ? (
            <div className="rounded-xl border border-red-300/15 bg-red-300/10 px-3 py-2.5">
              <p className="text-xs leading-5 text-red-200">
                {logoutError}
              </p>
            </div>
          ) : null}

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="group flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.07] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] transition group-hover:bg-white/10 group-hover:text-brand">
              <LogOut size={18} />
            </span>

            <span>
              {isLoggingOut
                ? t.sidebarLoggingOut
                : t.sidebarLogout}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}