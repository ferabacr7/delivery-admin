"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminDriver } from "@/services/adminDriverService";

type DriverAssignmentCardProps = {
  orderId: string;
  drivers: AdminDriver[];
  currentDriverId: string | null;
};

type FeedbackMessage = {
  type: "success" | "error";
  text: string;
} | null;

export function DriverAssignmentCard({
  orderId,
  drivers,
  currentDriverId,
}: DriverAssignmentCardProps) {
  const router = useRouter();

  const [selectedDriverId, setSelectedDriverId] = useState(
    currentDriverId ?? "",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackMessage>(null);

  const selectedDriver =
    drivers.find((driver) => driver.id === selectedDriverId) ?? null;

  async function handleSave() {
    if (!selectedDriverId || isSaving) {
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

      const data = await response.json();

      if (!response.ok) {
        setFeedback({
          type: "error",
          text: data.error ?? "No se pudo asignar el repartidor.",
        });

        return;
      }

      setFeedback({
        type: "success",
        text: selectedDriver
          ? `${selectedDriver.full_name} fue asignado correctamente a esta entrega.`
          : "Repartidor asignado correctamente.",
      });

      router.refresh();
    } catch (error) {
      console.error("Unexpected driver assignment error:", error);

      setFeedback({
        type: "error",
        text: "Ocurrió un error inesperado al guardar la asignación.",
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
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Asignación de repartidor
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Selecciona el repartidor responsable de esta entrega.
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${
            currentDriverId
              ? "bg-emerald-50 text-emerald-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {currentDriverId ? "Repartidor asignado" : "Pendiente de asignación"}
        </span>
      </div>

      {feedback ? (
        <div
          role="status"
          className={`mt-5 rounded-2xl border px-4 py-3 text-sm font-medium ${
            feedback.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {feedback.text}
        </div>
      ) : null}

      {drivers.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-200 p-5">
          <p className="text-sm font-medium text-slate-700">
            No hay repartidores activos disponibles.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Activa o registra un perfil con el rol driver para continuar.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <label
              htmlFor="driver"
              className="text-sm font-semibold text-slate-700"
            >
              Repartidor
            </label>

            <select
              id="driver"
              value={selectedDriverId}
              onChange={(event) => handleDriverChange(event.target.value)}
              disabled={isSaving}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:cursor-not-allowed disabled:bg-slate-50"
            >
              <option value="">Selecciona un repartidor</option>

              {drivers.map((driver) => (
                <option key={driver.id} value={driver.id}>
                  {driver.full_name}
                  {driver.phone ? ` — ${driver.phone}` : ""}
                </option>
              ))}
            </select>

            {selectedDriver ? (
              <div className="mt-3 rounded-xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">
                  {selectedDriver.full_name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedDriver.phone ?? "Sin teléfono registrado"}
                </p>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={
              isSaving ||
              !selectedDriverId ||
              selectedDriverId === currentDriverId
            }
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isSaving ? "Guardando..." : "Guardar asignación"}
          </button>
        </div>
      )}
    </article>
  );
}
