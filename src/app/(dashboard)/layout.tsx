"use client";

import { CrmSidebar } from "@/components/layout/crm-sidebar";
import { CrmHeader } from "@/components/layout/crm-header";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { useState } from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F9FD] dark:bg-background">
      <CrmSidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <CrmHeader />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-8 lg:px-12">
          <Breadcrumbs />
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
