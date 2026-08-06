import type { LucideIcon } from "lucide-react";

type DashboardCardTone = "teal" | "blue" | "amber" | "violet";

type DashboardCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
  tone?: DashboardCardTone;
};

const toneStyles: Record<
  DashboardCardTone,
  {
    iconBackground: string;
    iconColor: string;
    glow: string;
    progress: string;
  }
> = {
  teal: {
    iconBackground: "bg-[#FFF0E9]",
    iconColor: "text-[#F75F2A]",
    glow: "bg-[#F75F2A]/10",
    progress: "from-[#F75F2A] to-[#D3481C]",
  },
  blue: {
    iconBackground: "bg-blue-50",
    iconColor: "text-blue-600",
    glow: "bg-blue-400/10",
    progress: "from-blue-500 to-cyan-400",
  },
  amber: {
    iconBackground: "bg-amber-50",
    iconColor: "text-amber-600",
    glow: "bg-amber-400/10",
    progress: "from-amber-500 to-orange-400",
  },
  violet: {
    iconBackground: "bg-violet-50",
    iconColor: "text-violet-600",
    glow: "bg-violet-400/10",
    progress: "from-violet-500 to-fuchsia-400",
  },
};

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  tone = "teal",
}: DashboardCardProps) {
  const styles = toneStyles[tone];

  return (
    <article className="group relative overflow-hidden rounded-[20px] border border-slate-200/80 bg-white p-4 shadow-[0_6px_24px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/80 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
      <div
        className={`pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-3xl ${styles.glow}`}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-500">
              {title}
            </p>

            <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-0.05em] text-slate-950">
              {value}
            </p>
          </div>

          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconBackground} ${styles.iconColor} transition-transform duration-300 group-hover:scale-105`}
          >
            <Icon size={19} strokeWidth={2} />
          </div>
        </div>

        <p className="mt-3 min-h-8 text-xs leading-4 text-slate-400">
          {description}
        </p>

        <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full w-[42%] rounded-full bg-gradient-to-r ${styles.progress}`}
          />
        </div>
      </div>
    </article>
  );
}