import { Package, Users, TrendingUp, CreditCard } from "lucide-react";

const TENANTS = [
  { id: 1, name: "Acme Corp", plan: "Pro", users: 12, status: "Active", mrr: 588 },
  { id: 2, name: "Globex Inc", plan: "Enterprise", users: 48, status: "Active", mrr: 1200 },
  { id: 3, name: "Init.io", plan: "Free", users: 3, status: "Trial", mrr: 0 },
  { id: 4, name: "Umbrella Ltd", plan: "Pro", users: 8, status: "Active", mrr: 392 },
];

const summary = [
  { label: "Total Tenants", value: TENANTS.length, icon: Package },
  { label: "Active Subscriptions", value: TENANTS.filter(t => t.status === "Active").length, icon: TrendingUp },
  { label: "Total Users", value: TENANTS.reduce((s, t) => s + t.users, 0), icon: Users },
  { label: "MRR", value: `$${TENANTS.reduce((s, t) => s + t.mrr, 0).toLocaleString()}`, icon: CreditCard },
];

import { ModuleTabs } from "@/components/layout/module-tabs";

const TABS = [
  { label: "Dashboard", href: "/saas" },
  { label: "Affiliate", href: "#" },
  { label: "Payouts", href: "#" },
  { label: "Settings", href: "#" },
  { label: "Groups", href: "#" },
];

export default function SaasPage() {
  return (
    <div className="space-y-6">
      <h1 className="crm-page-title">SaaS Management</h1>
      <ModuleTabs tabs={TABS} />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {summary.map((s) => (
          <div key={s.label} className="crm-card flex items-center gap-4">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <s.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className="text-2xl font-bold">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="crm-card">
        <h2 className="text-sm font-semibold mb-4">Tenants</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground border-b border-border">
              <th className="py-2 pr-4">Tenant</th>
              <th className="py-2 pr-4">Plan</th>
              <th className="py-2 pr-4">Users</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2">MRR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {TENANTS.map((t) => (
              <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                <td className="py-3 font-medium pr-4">{t.name}</td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${t.plan === "Enterprise" ? "bg-violet-100 text-violet-700" : t.plan === "Pro" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>{t.plan}</span>
                </td>
                <td className="py-3 pr-4">{t.users}</td>
                <td className="py-3 pr-4">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${t.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{t.status}</span>
                </td>
                <td className="py-3 font-medium">{t.mrr > 0 ? `$${t.mrr}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
