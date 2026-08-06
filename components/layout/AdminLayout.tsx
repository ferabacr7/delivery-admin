import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F8F9] text-slate-900">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Header />

        <main className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
          {/* Decorative background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#F75F2A]/[0.05] blur-3xl" />
            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#D3481C]/[0.04] blur-3xl" />
          </div>

          {/* Page content */}
          <div className="relative mx-auto w-full max-w-[1600px] px-8 py-8 xl:px-10 xl:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}