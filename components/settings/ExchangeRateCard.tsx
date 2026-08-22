"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ArrowRightLeft,
  CalendarDays,
  CircleCheckBig,
  RefreshCw,
} from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type ExchangeRate = {
  id: string;
  currency_from: string;
  currency_to: string;
  crc_per_usd: number;
  effective_date: string;
  source: string;
  created_at: string;
  updated_at: string;
};

export function ExchangeRateCard() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [exchangeRate, setExchangeRate] =
    useState<ExchangeRate | null>(null);

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [errorKey, setErrorKey] = useState<
    "load" | "save" | "invalid" | null
  >(null);

  const [success, setSuccess] = useState(false);

  const loadExchangeRate = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorKey(null);

      const response = await fetch(
        "/api/settings/exchange-rate",
        {
          method: "GET",
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "Exchange rate API error:",
          result?.error ?? response.statusText,
        );

        setErrorKey("load");
        return;
      }

      setExchangeRate(result.exchangeRate ?? null);
    } catch (error) {
      console.error(
        "LOAD EXCHANGE RATE ERROR:",
        error,
      );

      setErrorKey("load");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadExchangeRate();
  }, [loadExchangeRate]);

  async function handleSave() {
    const crcPerUsd = Number(value);

    if (
      !Number.isFinite(crcPerUsd) ||
      crcPerUsd <= 0
    ) {
      setErrorKey("invalid");
      setSuccess(false);
      return;
    }

    try {
      setIsSaving(true);
      setErrorKey(null);
      setSuccess(false);

      const response = await fetch(
        "/api/settings/exchange-rate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            crcPerUsd,
          }),
        },
      );

      const result = await response.json();

      if (!response.ok) {
        console.error(
          "Exchange rate save API error:",
          result?.error ?? response.statusText,
        );

        setErrorKey("save");
        return;
      }

      setExchangeRate(result.exchangeRate);
      setValue("");
      setSuccess(true);
    } catch (error) {
      console.error(
        "SAVE EXCHANGE RATE ERROR:",
        error,
      );

      setErrorKey("save");
    } finally {
      setIsSaving(false);
    }
  }

  const errorMessage =
    errorKey === "invalid"
      ? t.exchangeRateInvalid
      : errorKey === "load"
        ? t.exchangeRateLoadError
        : errorKey === "save"
          ? t.exchangeRateSaveError
          : null;

  const dateLocale =
    language === "es" ? "es-CR" : "en-US";

  return (
    <article className="overflow-hidden rounded-[26px] border border-slate-200/80 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      {/* Header */}
      <div className="border-b border-slate-100 p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
            <ArrowRightLeft size={19} />
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-brand">
              {t.exchangeRatePair}
            </p>

            <h2 className="mt-0.5 text-lg font-semibold text-slate-950">
              {t.exchangeRateTitle}
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              {t.exchangeRateDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="flex min-h-32 items-center justify-center">
            <RefreshCw
              size={20}
              className="animate-spin text-slate-400"
            />
          </div>
        ) : (
          <>
            {/* Current rate */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                {t.exchangeRateCurrent}
              </p>

              {exchangeRate ? (
                <>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-sm font-medium text-slate-500">
                      1 USD =
                    </span>

                    <span className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                      ₡
                      {Number(
                        exchangeRate.crc_per_usd,
                      ).toLocaleString("es-CR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays size={14} />

                      {new Intl.DateTimeFormat(
                        dateLocale,
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        },
                      ).format(
                        new Date(
                          `${exchangeRate.effective_date}T12:00:00`,
                        ),
                      )}
                    </span>

                    <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 font-semibold">
                      {exchangeRate.source}
                    </span>
                  </div>
                </>
              ) : (
                <p className="mt-2 text-sm text-amber-700">
                  {t.exchangeRateNotConfigured}
                </p>
              )}
            </div>

            {/* New rate */}
            <div className="mt-6">
              <label
                htmlFor="exchange-rate"
                className="text-sm font-semibold text-slate-800"
              >
                {t.exchangeRateNew}
              </label>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {t.exchangeRateNewDescription}
              </p>

              <div className="mt-3 flex items-center rounded-2xl border border-slate-200 bg-white px-4 focus-within:border-brand/50 focus-within:ring-4 focus-within:ring-brand/10">
                <span className="mr-2 text-lg font-semibold text-slate-400">
                  ₡
                </span>

                <input
                  id="exchange-rate"
                  type="number"
                  min="0"
                  step="0.01"
                  inputMode="decimal"
                  value={value}
                  onChange={(event) => {
                    setValue(event.target.value);
                    setErrorKey(null);
                    setSuccess(false);
                  }}
                  placeholder="505.00"
                  className="min-w-0 flex-1 bg-transparent py-3.5 text-base font-semibold text-slate-900 outline-none placeholder:text-slate-300"
                />

                <span className="ml-2 text-xs font-semibold text-slate-400">
                  / USD
                </span>
              </div>
            </div>

            {/* Success */}
            {success ? (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                <CircleCheckBig
                  size={17}
                  className="shrink-0"
                />

                {t.exchangeRateSaveSuccess}
              </div>
            ) : null}

            {/* Error */}
            {errorMessage ? (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {errorMessage}
              </div>
            ) : null}

            {/* Save */}
            <button
              type="button"
              onClick={handleSave}
              disabled={!value || isSaving}
              className="mt-5 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving
                ? t.exchangeRateSaving
                : t.exchangeRateSave}
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-slate-400">
              {t.exchangeRateFooter}
            </p>
          </>
        )}
      </div>
    </article>
  );
}