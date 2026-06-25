import {
  Home,
  ClipboardList,
  Users,
  Truck,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: Home },
  { label: "Pedidos", icon: ClipboardList },
  { label: "Clientes", icon: Users },
  { label: "Entregas", icon: Truck },
  { label: "Configuración", icon: Settings },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col justify-between bg-[#052B35] text-white">
      <div>
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12BFAE]">
            <MapPin size={22} />
          </div>

          <span className="text-2xl font-bold tracking-tight">
            Delivery
          </span>
        </div>

        <nav className="mt-6 space-y-2 px-4">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = index === 0;

            return (
              <button
                key={item.label}
                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  active
                    ? "bg-[#12BFAE] text-white shadow-lg"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-4 pb-6">
        <button className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white">
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}