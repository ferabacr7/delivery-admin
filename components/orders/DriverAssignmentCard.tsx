"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  LoaderCircle,
  Phone,
  Save,
  UserCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";
import type { AdminDriver } from "@/services/adminDriverService";

type DriverAssignmentCardProps = {
  orderId: string;
  orderStatus: string;
  drivers: AdminDriver[];
  currentDriverId: string | null;
};

type FeedbackMessage = {
  type: "success" | "error";
  text: string;
} | null;

export function DriverAssignmentCard({
  orderId,
  orderStatus,
  drivers,
  currentDriverId,
}: DriverAssignmentCardProps) {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const isSpanish = language === "es";

  const [selectedDriverId, setSelectedDriverId] = useState(
    currentDriverId ?? "",
  );

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] =
    useState<FeedbackMessage>(null);

  const selectedDriver =
    drivers.find((driver) => driver.id === selectedDriverId) ?? null;

  const isInitialAssignment = !currentDriverId;

  const canAssign =
    !isInitialAssignment || orderStatus === "ACCEPTED";

  const hasChanges =
    canAssign &&
    Boolean(selectedDriverId) &&
    selectedDriverId !== currentDriverId;

  async function handleSave() {
    if (!selectedDriverId || isSaving || !canAssign) {
      return;
    }

    try {
      setIsSaving(true);
      setFeedback(null);

      const response = await fetch("/api/deliveries/assign", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          driverId: selectedDriverId,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setFeedback({
          type: "error",
          text:
            isSpanish && data?.error
              ? data.error
              : t.driverAssignmentError,
        });

        return;
      }

      setFeedback({
        type: "success",
        text: selectedDriver
          ? `${selectedDriver.full_name} ${t.driverAssignmentToDelivery}`
          : t.driverAssignmentSuccess,
      });

      router.refresh();
    } catch (error) {
      console.error(
        "Unexpected driver assignment error:",
        error,
      );

      setFeedback({
        type: "error",
        text: t.driverAssignmentUnexpectedError,
      });
    } finally {
      setIsSaving(false);
    }
  }

  function handleDriverChange(driverId: string) {
    setSelectedDriverId(driverId);
    setFeedback(null);
  }

  return (
    <section>
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
              <UsersRound size={18} />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-semibold text-slate-950">
                {t.driverAssignmentTitle}
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                {t.driverAssignmentDescription}
              </p>
            </div>
          </div>
        </div>

        <span
          className={[
            "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold",
            currentDriverId
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-amber-200 bg-amber-50 text-amber-700",
          ].join(" ")}
        >
          <span
            className={[
              "h-1.5 w-1.5 rounded-full",
              currentDriverId
                ? "bg-emerald-500"
                : "bg-amber-500",
            ].join(" ")}
          />

          {currentDriverId
            ? t.driverAssignmentAssigned
            : t.driverAssignmentPending}
        </span>
      </div>

      {!canAssign ? (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3.5 text-sm font-medium text-amber-700">
          <AlertCircle
            className="mt-0.5 shrink-0"
            size={17}
          />

          <p className="leading-5">
            {t.driverAssignmentOrderMustBeAccepted}
          </p>
        </div>
      ) : null}

      {feedback ? (
        <div
          role="status"
          className={[
            "mt-5 flex items-start gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium",
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {feedback.type === "success" ? (
            <CheckCircle2
              className="mt-0.5 shrink-0"
              size={17}
            />
          ) : (
            <AlertCircle
              className="mt-0.5 shrink-0"
              size={17}
            />
          )}

          <p className="leading-5">{feedback.text}</p>
        </div>
      ) : null}

      {drivers.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
            <UserRound size={18} />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-800">
            {t.driverAssignmentNoActiveDrivers}
          </p>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            {t.driverAssignmentNoActiveDriversDescription}
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <div>
            <label
              htmlFor="driver"
              className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400"
            >
              {t.driverAssignmentDriver}
            </label>

            <div className="relative mt-2">
              <select
                id="driver"
                value={selectedDriverId}
                onChange={(event) =>
                  handleDriverChange(event.target.value)
                }
                disabled={isSaving || !canAssign}
                className="min-h-12 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 pr-10 text-sm font-medium text-slate-900 outline-none transition focus:border-brand focus:ring-4 focus:ring-brand-soft disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">
                  {t.driverAssignmentSelectDriver}
                </option>

                {drivers.map((driver) => (
                  <option
                    key={driver.id}
                    value={driver.id}
                  >
                    {driver.full_name}
                    {driver.phone
                      ? ` — ${driver.phone}`
                      : ""}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 7.22a.75.75 0 0 1 1.06 0L10 10.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 8.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {selectedDriver ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-sm font-bold text-white shadow-[0_6px_15px_rgba(247,95,42,0.18)]">
                  {selectedDriver.full_name
                    .trim()
                    .charAt(0)
                    .toUpperCase() || "R"}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-slate-950">
                      {selectedDriver.full_name}
                    </p>

                    {selectedDriver.id === currentDriverId ? (
                      <UserCheck
                        size={15}
                        className="shrink-0 text-emerald-600"
                      />
                    ) : null}
                  </div>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                    <Phone size={13} />

                    <span className="truncate">
                      {selectedDriver.phone ??
                        t.driverAssignmentNoPhone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-slate-200/80 pt-3">
                <p className="text-xs text-slate-500">
                  {selectedDriver.id === currentDriverId
                    ? t.driverAssignmentAlreadyAssigned
                    : t.driverAssignmentWillBeAssigned}
                </p>
              </div>
            </div>
          ) : null}

          <button
            type="button"
            onClick={handleSave}
            disabled={
              !hasChanges ||
              isSaving ||
              !canAssign
            }
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(247,95,42,0.20)] transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
          >
            {isSaving ? (
              <>
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
                {t.driverAssignmentSaving}
              </>
            ) : (
              <>
                <Save size={17} />
                {t.driverAssignmentSave}
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}