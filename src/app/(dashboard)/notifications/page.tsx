import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react";

const NOTIFICATIONS = [
  { id: 1, type: "success", title: "Invoice Paid", message: "Acme Corp paid INV-001 ($4,800)", time: "2 hours ago" },
  { id: 2, type: "warning", title: "Contract Expiring", message: "Globex Inc contract ends in 14 days", time: "5 hours ago" },
  { id: 3, type: "info", title: "New Lead Assigned", message: "James Carter has been assigned to you", time: "Yesterday" },
  { id: 4, type: "success", title: "Task Completed", message: "Q1 Report finalized by Alice", time: "Yesterday" },
  { id: 5, type: "warning", title: "Payment Overdue", message: "Initech INV-003 is 10 days overdue", time: "2 days ago" },
];

const iconMap = { success: CheckCircle, warning: AlertTriangle, info: Info };
const colorMap = {
  success: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20",
  warning: "bg-amber-100 text-amber-600 dark:bg-amber-900/20",
  info: "bg-blue-100 text-blue-600 dark:bg-blue-900/20",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="crm-page-title">Notifications</h1><p className="text-sm text-muted-foreground mt-1">{NOTIFICATIONS.length} notifications</p></div>
      </div>
      <div className="crm-card space-y-3">
        {NOTIFICATIONS.map((n) => {
          const Icon = iconMap[n.type as keyof typeof iconMap];
          return (
            <div key={n.id} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${colorMap[n.type as keyof typeof colorMap]}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{n.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{n.message}</p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0 mt-0.5">{n.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
