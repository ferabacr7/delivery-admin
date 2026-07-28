"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createQuote } from "@/services/quoteService";
import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type QuoteFormProps = {
  orderId: string;
};

export function QuoteForm({ orderId }: QuoteFormProps) {
  const router = useRouter();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [subtotal, setSubtotal] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotalNumber = Number(subtotal || 0);
  const deliveryFeeNumber = Number(deliveryFee || 0);
  const total = subtotalNumber + deliveryFeeNumber;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await createQuote({
        orderId,
        subtotal: subtotalNumber,
        deliveryFee: deliveryFeeNumber,
        total,
        notes,
      });

      router.refresh();
    } catch (error) {
      console.error("Create quote error:", error);

      const message =
        error instanceof Error ? error.message : t.quoteCreateError;

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
    >
      <p className="text-sm font-semibold text-slate-900">
        {t.quoteFormTitle}
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-slate-500">
            {t.quoteSubtotalLabel}
          </label>

          <input
            type="number"
            min="0"
            value={subtotal}
            onChange={(event) => setSubtotal(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#12BFAE]"
            placeholder={t.quoteSubtotalPlaceholder}
            required
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-500">
            {t.quoteDeliveryFeeLabel}
          </label>

          <input
            type="number"
            min="0"
            value={deliveryFee}
            onChange={(event) => setDeliveryFee(event.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#12BFAE]"
            placeholder={t.quoteDeliveryFeePlaceholder}
            required
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-slate-500">
          {t.quoteNotesLabel}
        </label>

        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#12BFAE]"
          placeholder={t.quoteNotesPlaceholder}
          rows={2}
        />
      </div>

      <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
        <span className="text-sm text-slate-500">{t.quoteTotalLabel}</span>

        <span className="text-base font-bold text-slate-900">
          ₡{total.toLocaleString()}
        </span>
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-[#12BFAE] text-white hover:bg-[#0EA89A]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t.quoteCreatingButton}
          </>
        ) : (
          t.quoteSubmitButton
        )}
      </Button>
    </form>
  );
}