"use client";

import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  PackageOpen,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { RealtimeChannel } from "@supabase/supabase-js";

import { LanguageSelector } from "./LanguageSelector";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import {
  subscribeToNewOrders,
  unsubscribeNewOrders,
  type AdminOrderRealtimeEvent,
} from "@/services/adminOrderRealtimeService";

type OrderNotification = AdminOrderRealtimeEvent;

function getOrderNumber(orderId?: string | null) {
  if (!orderId) {
    return "------";
  }

  return orderId.slice(-6).toUpperCase();
}

function formatNotificationTime(
  date: string,
  language: "es" | "en",
) {
  return new Intl.DateTimeFormat(
    language === "es" ? "es-CR" : "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  ).format(new Date(date));
}

function isSameDay(firstDate: Date, secondDate: Date) {
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
}

function getCalendarDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startingDay = (firstDay.getDay() + 6) % 7;

  const days: Array<Date | null> = [];

  for (let index = 0; index < startingDay; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    days.push(new Date(year, month, day));
  }

  return days;
}

type HeaderProps = {
  onMenuOpen: () => void;
};

export function Header({
  onMenuOpen,
}: HeaderProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const { currentUser, isLoading, error } = useCurrentUser();

  const [notifications, setNotifications] =
    useState<OrderNotification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const receivedOrderIds = useRef<Set<string>>(new Set());
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const notificationSoundIntervalRef = useRef<ReturnType<
    typeof setInterval
  > | null>(null);

  useEffect(() => {
    return () => {
      if (notificationSoundIntervalRef.current) {
        clearInterval(notificationSoundIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    function unlockAudio() {
      if (!audioContextRef.current) {
        const AudioContextClass =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext?: typeof AudioContext;
            }
          ).webkitAudioContext;

        if (AudioContextClass) {
          audioContextRef.current = new AudioContextClass();
        }
      }

      if (audioContextRef.current?.state === "suspended") {
        void audioContextRef.current.resume();
      }
    }

    window.addEventListener("pointerdown", unlockAudio, {
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
    };
  }, []);

  async function playNotificationSound() {
    if (!audioContextRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextClass) {
        return;
      }

      audioContextRef.current = new AudioContextClass();
    }

    const audioContext = audioContextRef.current;

    if (audioContext.state === "suspended") {
      try {
        await audioContext.resume();
      } catch {
        return;
      }
    }

    if (audioContext.state !== "running") {
      return;
    }

    const now = audioContext.currentTime;

    function playTone(
      frequency: number,
      startTime: number,
      duration: number,
      volume: number,
    ) {
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        frequency,
        startTime,
      );

      gain.gain.setValueAtTime(0.001, startTime);

      gain.gain.exponentialRampToValueAtTime(
        volume,
        startTime + 0.03,
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + duration,
      );

      oscillator.connect(gain);
      gain.connect(audioContext.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    }

    playTone(523.25, now, 0.45, 0.08);
    playTone(659.25, now + 0.18, 0.55, 0.065);
  }

  function startNotificationSound() {
    if (notificationSoundIntervalRef.current !== null) {
      return;
    }

    void playNotificationSound();

    notificationSoundIntervalRef.current = setInterval(() => {
      void playNotificationSound();
    }, 3000);
  }

  function stopNotificationSound() {
    if (notificationSoundIntervalRef.current !== null) {
      clearInterval(notificationSoundIntervalRef.current);
      notificationSoundIntervalRef.current = null;
    }
  }

  useEffect(() => {
    let channel: RealtimeChannel | null = null;

    function handleNewOrder(
      order: AdminOrderRealtimeEvent,
    ) {
      if (receivedOrderIds.current.has(order.id)) {
        return;
      }

      receivedOrderIds.current.add(order.id);

      setNotifications((currentNotifications) => [
        order,
        ...currentNotifications,
      ]);

      setNotificationCount(
        (currentCount) => currentCount + 1,
      );

      startNotificationSound();
    }

    channel = subscribeToNewOrders(handleNewOrder);

    return () => {
      unsubscribeNewOrders(channel);
    };
  }, []);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const target = event.target as Node;

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(target)
      ) {
        setIsNotificationsOpen(false);
      }

      if (
        calendarRef.current &&
        !calendarRef.current.contains(target)
      ) {
        setIsCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );
    };
  }, []);

  function handleNotificationsToggle() {
    setIsCalendarOpen(false);

    setIsNotificationsOpen((current) => {
      const nextValue = !current;

      if (nextValue) {
        setNotificationCount(0);
        stopNotificationSound();
      }

      return nextValue;
    });
  }

  function handleCalendarToggle() {
    setIsNotificationsOpen(false);
    setIsCalendarOpen((current) => !current);
  }

  function goToPreviousMonth() {
    setCalendarMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1,
        ),
    );
  }

  function goToNextMonth() {
    setCalendarMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1,
        ),
    );
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setCalendarMonth(date);
    setIsCalendarOpen(false);
  }

  function handleToday() {
    const today = new Date();

    setSelectedDate(today);
    setCalendarMonth(today);
    setIsCalendarOpen(false);
  }

  const formattedDate = new Intl.DateTimeFormat(
    language === "es" ? "es-CR" : "en-US",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
    },
  ).format(selectedDate);

  const calendarMonthLabel = new Intl.DateTimeFormat(
    language === "es" ? "es-CR" : "en-US",
    {
      month: "long",
      year: "numeric",
    },
  ).format(calendarMonth);

  const weekDays =
    language === "es"
      ? ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]
      : ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const calendarDays = getCalendarDays(calendarMonth);
  const today = new Date();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="flex min-h-20 min-w-0 items-center justify-between gap-2 px-4 sm:min-h-24 sm:gap-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Left section */}
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onMenuOpen}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 lg:hidden"
            aria-label={t.headerOpenMenu}
          >
            <Menu size={20} />
          </button>

          <div className="hidden min-w-0 sm:block">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-2xl font-semibold tracking-[-0.03em] text-slate-950 xl:text-[28px]">
                {t.headerGreeting}
              </h1>

              <span
                className="hidden text-2xl sm:inline"
                aria-hidden="true"
              >
                👋
              </span>
            </div>

            <p className="mt-1 truncate text-sm text-slate-500">
              {t.headerSubtitle}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5 xl:gap-3">
          <LanguageSelector />

          {/* Calendar */}
          <div
            className="relative hidden md:block"
            ref={calendarRef}
          >
            <button
              type="button"
              onClick={handleCalendarToggle}
              className="flex h-11 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand/30 hover:bg-brand-soft/30"
              aria-expanded={isCalendarOpen}
              aria-label={t.headerOpenCalendar}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <CalendarDays size={17} strokeWidth={2} />
              </span>

              <span className="capitalize">{formattedDate}</span>

              <ChevronDown
                size={15}
                className={[
                  "text-slate-400 transition-transform",
                  isCalendarOpen ? "rotate-180" : "",
                ].join(" ")}
              />
            </button>

            {isCalendarOpen ? (
              <div className="absolute right-0 top-14 z-50 w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousMonth}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label={t.headerPreviousMonth}
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <p className="capitalize text-sm font-semibold text-slate-900">
                    {calendarMonthLabel}
                  </p>

                  <button
                    type="button"
                    onClick={goToNextMonth}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label={t.headerNextMonth}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-7 gap-1">
                  {weekDays.map((day) => (
                    <div
                      key={day}
                      className="flex h-8 items-center justify-center text-[11px] font-semibold uppercase text-slate-400"
                    >
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (!day) {
                      return (
                        <div
                          key={`empty-${index}`}
                          className="h-9 w-9"
                        />
                      );
                    }

                    const selected = isSameDay(
                      day,
                      selectedDate,
                    );

                    const isToday = isSameDay(day, today);

                    return (
                      <button
                        key={day.toISOString()}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        className={[
                          "relative flex h-9 w-9 items-center justify-center rounded-xl text-xs font-medium transition",
                          selected
                            ? "bg-brand text-white shadow-sm"
                            : "text-slate-700 hover:bg-brand-soft hover:text-brand",
                          isToday && !selected
                            ? "font-bold text-brand"
                            : "",
                        ].join(" ")}
                      >
                        {day.getDate()}

                        {isToday && !selected ? (
                          <span className="absolute bottom-1 h-1 w-1 rounded-full bg-brand" />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-slate-100 pt-3">
                  <button
                    type="button"
                    onClick={handleToday}
                    className="w-full rounded-xl bg-brand-soft px-3 py-2.5 text-xs font-semibold text-brand transition hover:bg-brand/10"
                  >
                    {t.headerGoToday}
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Notifications */}
          <div
            className="relative"
            ref={notificationsRef}
          >
            <button
              type="button"
              onClick={handleNotificationsToggle}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-brand/30 hover:bg-brand-soft/40 hover:text-brand"
              aria-label={t.headerNotifications}
              aria-expanded={isNotificationsOpen}
            >
              <Bell size={20} strokeWidth={2} />

              {notificationCount > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-brand px-1 text-[10px] font-bold text-white">
                  {notificationCount > 99
                    ? "99+"
                    : notificationCount}
                </span>
              ) : null}
            </button>

            {isNotificationsOpen ? (
              <div className="absolute right-0 top-14 z-50 w-[calc(100vw-2rem)] max-w-[360px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.16)]">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-950">
                      {t.headerNotifications}
                    </p>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {t.headerNewOrdersReceived}
                    </p>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-soft text-brand">
                    <Bell size={17} />
                  </div>
                </div>

                {notifications.length === 0 ? (
                  <div className="flex min-h-44 flex-col items-center justify-center px-6 py-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-400">
                      <PackageOpen size={20} />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-800">
                      {t.headerNoNewNotifications}
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      {t.headerNewOrdersAppearHere}
                    </p>
                  </div>
                ) : (
                  <div className="max-h-[420px] overflow-y-auto">
                    {notifications
                      .filter((order) => Boolean(order?.id))
                      .map((order) => (
                        <Link
                          key={order.id}
                          href={`/orders/${order.id}`}
                          onClick={() =>
                            setIsNotificationsOpen(false)
                          }
                          className="flex items-start gap-3 border-b border-slate-100 px-5 py-4 transition last:border-b-0 hover:bg-slate-50"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                            <PackageOpen size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p className="text-sm font-semibold text-slate-900">
                                {t.headerNewOrder} #
                                {getOrderNumber(order.id)}
                              </p>

                              <span className="shrink-0 text-[10px] font-medium text-slate-400">
                                {formatNotificationTime(
                                  order.created_at,
                                  language,
                                )}
                              </span>
                            </div>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                              {order.description}
                            </p>

                            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand">
                              {t.headerViewOrder}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* User */}
          <div className="ml-1 hidden items-center gap-3 rounded-2xl border border-transparent px-2 py-1.5 transition hover:border-slate-200 hover:bg-slate-50 sm:flex">
            <div className="hidden min-w-0 text-right lg:block">
              {isLoading ? (
                <>
                  <div className="ml-auto h-4 w-28 animate-pulse rounded-md bg-slate-200" />
                  <div className="ml-auto mt-2 h-3 w-36 animate-pulse rounded-md bg-slate-100" />
                </>
              ) : currentUser ? (
                <>
                  <p className="max-w-44 truncate text-sm font-semibold text-slate-900">
                    {currentUser.fullName}
                  </p>

                  <p className="mt-0.5 max-w-44 truncate text-xs text-slate-500">
                    {currentUser.email}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold text-slate-900">
                    Admin
                  </p>

                  <p className="mt-0.5 max-w-44 truncate text-xs text-red-500">
                    {error ?? t.headerUserUnavailable}
                  </p>
                </>
              )}
            </div>

            <div
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-white shadow-[0_8px_20px_rgba(247,95,42,0.25)]"
              aria-label={
                currentUser?.fullName ??
                t.headerAdministrator
              }
            >
              {isLoading
                ? "…"
                : (currentUser?.initial ?? "A")}

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}