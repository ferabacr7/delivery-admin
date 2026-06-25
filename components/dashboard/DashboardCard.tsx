import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type DashboardCardProps = {
  title: string;
  value: number;
  description: string;
  icon: LucideIcon;
};

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
}: DashboardCardProps) {
  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#12BFAE]/10 text-[#12BFAE]">
          <Icon size={24} />
        </div>
      </CardContent>
    </Card>
  );
}