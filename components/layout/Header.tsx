import { Bell, CalendarDays, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-10 py-6">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">
          ¡Hola, Admin! 👋
        </h1>

        <p className="mt-2 text-slate-500">
          Bienvenido al panel de Delivery App.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
          <CalendarDays size={18} />

          <span>Hoy</span>

          <ChevronDown size={16} />
        </button>

        <button className="relative">
          <Bell size={24} />

          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#12BFAE] text-xs text-white">
            3
          </span>
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#12BFAE] text-lg font-bold text-white">
          F
        </div>
      </div>
    </header>
  );
}