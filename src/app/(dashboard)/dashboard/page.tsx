"use client";

import { MetricCard } from "@/components/ui/metric-card";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Users, DollarSign, TrendingDown, Globe, Badge, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SalesOverviewChart } from "@/components/dashboard/sales-overview-chart";
import { CustomerSourceChart } from "@/components/dashboard/customer-source-chart";
import { DealsChart } from "@/components/dashboard/deals-chart";
import { CalendarWidget, TasksWidget } from "@/components/dashboard/dashboard-widgets";

const metrics = [
  { title: "Total Customers", value: "5,800", change: 12, trend: "up" as const, lastPeriod: "7,400", icon: Users, iconColor: "bg-blue-100 text-blue-700" },
  { title: "Net Revenue", value: "$346,000", change: 11, trend: "up" as const, lastPeriod: "$300,000", icon: DollarSign, iconColor: "bg-emerald-100 text-emerald-700" },
  { title: "Total Expenses", value: "$24,000", change: 8, trend: "down" as const, lastPeriod: "$18,000", icon: TrendingDown, iconColor: "bg-red-100 text-red-700" },
  { title: "Page Visits", value: "378", change: 15, trend: "up" as const, lastPeriod: "267", icon: Globe, iconColor: "bg-amber-100 text-amber-700" },
  { title: "Successful Signups", value: "18", change: 16, trend: "down" as const, lastPeriod: "15", icon: Badge, iconColor: "bg-violet-100 text-violet-700" },
];

const activityColumns: ColumnDef<any, unknown>[] = [
  { accessorKey: "id", header: "#" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "clicks", header: "Clicks" },
  { accessorKey: "signups", header: "Signups" },
  { accessorKey: "subscriptions", header: "Subscriptions" },
  { accessorKey: "earnings", header: "Earnings ($)" },
];

const DEMO_ACTIVITY = [
  { id: 1, date: "2025-01-01", clicks: 6, signups: 3, subscriptions: 1, earnings: 100 },
  { id: 2, date: "2025-01-01", clicks: 8, signups: 3, subscriptions: 1, earnings: 50 },
  { id: 3, date: "2025-01-01", clicks: 7, signups: 4, subscriptions: 2, earnings: 40 },
  { id: 4, date: "2025-01-01", clicks: 3, signups: 0, subscriptions: 0, earnings: 60 },
  { id: 5, date: "2025-01-01", clicks: 1, signups: 0, subscriptions: 0, earnings: 35 },
  { id: 6, date: "2025-01-01", clicks: 3, signups: 1, subscriptions: 0, earnings: 40 },
];

const invoiceColumns: ColumnDef<any, unknown>[] = [
  { accessorKey: "id", header: "Invoice #" },
  { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => `$${getValue()}` },
  { accessorKey: "created", header: "Created" },
  { accessorKey: "expires", header: "Expires" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold",
          status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-zinc-100 text-zinc-500"
        )}>
          {status}
        </span>
      );
    }
  },
];

const DEMO_INVOICES = [
  { id: "0001", amount: "1,000", created: "2024-05-07", expires: "2024-11-07", status: "Active" },
  { id: "0001", amount: "1,000", created: "2024-05-07", expires: "2024-11-07", status: "Inactive" },
  { id: "0001", amount: "1,000", created: "2024-05-07", expires: "2024-11-07", status: "Active" },
  { id: "0001", amount: "1,000", created: "2024-05-07", expires: "2024-11-07", status: "Active" },
  { id: "0001", amount: "1,000", created: "2024-05-07", expires: "2024-11-07", status: "Active" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-[#00003C]">Dashboard</h1>
          <p className="text-sm font-bold text-zinc-400">Welcome back, Admin! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-zinc-200 rounded-xl text-xs font-bold text-[#00003C] hover:bg-zinc-50 transition-colors">
            Monthly <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {metrics.map((m) => (
          <MetricCard key={m.title} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Section */}
        <div className="xl:col-span-3 space-y-6">
          {/* Sales Overview */}
          <div className="crm-card">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-black text-[#00003C]">Sales Overview</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 text-xs font-bold bg-[#00003C] text-white rounded-lg hover:bg-[#00002C]">Export</button>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">
                  Monthly <ChevronDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <SalesOverviewChart />
          </div>

          {/* Activity */}
          <div className="crm-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-[#00003C]">Activity</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 text-xs font-bold bg-[#00003C] text-white rounded-lg">Import</button>
                <button className="px-4 py-1.5 text-xs font-bold bg-zinc-100 text-[#00003C] rounded-lg">Export</button>
              </div>
            </div>
            <DataTable columns={activityColumns} data={DEMO_ACTIVITY} searchKey="date" searchPlaceholder="Search activity…" />
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6 h-fit">
          <CalendarWidget />
          <TasksWidget />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Customer Source */}
        <div className="crm-card h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-[#00003C]">Customer Source</h2>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">
              Weekly <ChevronDown className="h-3 w-3" />
            </div>
          </div>
          <CustomerSourceChart />
        </div>

        {/* Invoice & Deals */}
        <div className="xl:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deals */}
          <div className="crm-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-[#00003C]">Deals</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">
                Weekly <ChevronDown className="h-3 w-3" />
              </div>
            </div>
            <DealsChart />
          </div>

          {/* Invoice Table */}
          <div className="crm-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black text-[#00003C]">Invoice</h2>
              <div className="flex items-center gap-2">
                <button className="px-4 py-1.5 text-xs font-bold bg-[#00003C] text-white rounded-lg">Export</button>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-100 rounded-lg text-[10px] font-bold text-zinc-600">
                  Monthly <ChevronDown className="h-3 w-3" />
                </div>
              </div>
            </div>
            <DataTable columns={invoiceColumns} data={DEMO_INVOICES} searchKey="id" searchPlaceholder="Search invoice…" />
          </div>
        </div>
      </div>
    </div>
  );
}
