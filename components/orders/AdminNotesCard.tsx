"use client";

import { useContext, useState } from "react";
import { NotebookPen } from "lucide-react";

import { LanguageContext } from "@/i18n/LanguageContext";
import { translations } from "@/i18n/translations";

type AdminNotesCardProps = {
  orderId: string;
  initialNotes: string | null;
};

type FeedbackType = "success" | "error" | null;

export function AdminNotesCard({ orderId, initialNotes }: AdminNotesCardProps) {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [savedNote, setSavedNote] = useState(initialNotes ?? "");
  const [newNote, setNewNote] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const hasNewNote = newNote.trim().length > 0;

  async function handleSave() {
    if (!hasNewNote || isSaving) {
      return;
    }

    try {
      setIsSaving(true);
      setFeedback(null);

      const normalizedNote = newNote.trim();

      const response = await fetch(`/api/orders/${orderId}/admin-notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminNotes: normalizedNote,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);

        console.error(
          "Error saving admin notes:",
          result?.error ?? response.statusText,
        );

        setFeedback("error");
        return;
      }

      setSavedNote(normalizedNote);
      setNewNote("");
      setFeedback("success");
    } catch (error) {
      console.error("Unexpected admin notes error:", error);
      setFeedback("error");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <article className="flex flex-1 flex-col rounded-[26px] border border-slate-200/80 bg-white p-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
          <NotebookPen size={17} />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-400">
            {t.adminNotesInternal}
          </p>

          <h2 className="mt-0.5 text-base font-semibold text-slate-950">
            {t.adminNotesTitle}
          </h2>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            {t.adminNotesDescription}
          </p>
        </div>
      </div>

      {savedNote ? (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
            {t.adminNotesSavedLabel}
          </p>

          <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {savedNote}
          </p>
        </div>
      ) : null}

      <div className="mt-4 flex flex-1 flex-col">
        <textarea
          value={newNote}
          onChange={(event) => {
            setNewNote(event.target.value);
            setFeedback(null);
          }}
          rows={3}
          placeholder={t.adminNotesPlaceholder}
          className="min-h-[86px] w-full flex-1 resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand/50 focus:ring-4 focus:ring-brand/10"
        />

        {feedback ? (
          <p
            className={[
              "mt-2 text-xs font-medium",
              feedback === "success" ? "text-emerald-600" : "text-red-600",
            ].join(" ")}
          >
            {feedback === "success"
              ? t.adminNotesSaveSuccess
              : t.adminNotesSaveError}
          </p>
        ) : null}

        <button
          type="button"
          onClick={handleSave}
          disabled={!hasNewNote || isSaving}
          className="mt-3 w-full rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSaving ? t.adminNotesSaving : t.adminNotesSave}
        </button>
      </div>
    </article>
  );
}
