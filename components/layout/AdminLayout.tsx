import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F4F7F8]">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Header />

        <main className="p-10">{children}</main>
      </div>
    </div>
  );
}