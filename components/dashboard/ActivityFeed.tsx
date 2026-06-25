import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const activities = [
  "Nuevo pedido recibido",
  "Cotización pendiente de aprobación",
  "Pedido aceptado por cliente",
  "Entrega lista para iniciar",
];

export function ActivityFeed() {
  return (
    <Card className="rounded-3xl border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-900">
          Actividad reciente
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {activities.map((activity) => (
          <div key={activity} className="flex items-start gap-3">
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#12BFAE]" />
            <p className="text-sm text-slate-600">{activity}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}