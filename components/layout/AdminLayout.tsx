"use client";

import { useState } from "react";

import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export function AdminLayout({
  children,
}: AdminLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F5F8F9] text-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="min-h-screen lg:ml-64">
        <Header
          onMenuOpen={() => setIsSidebarOpen(true)}
        />

        <main className="relative min-h-[calc(100vh-6rem)] overflow-hidden">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#F75F2A]/[0.05] blur-3xl" />

            <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#D3481C]/[0.04] blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10 xl:py-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}