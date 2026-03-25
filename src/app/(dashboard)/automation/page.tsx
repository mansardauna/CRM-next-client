import { Zap, Play, Pause } from "lucide-react";

const RULES = [
  { id: 1, name: "New Lead → Notify Sales", trigger: "Lead Created", action: "Send Email", status: "active" },
  { id: 2, name: "Invoice Overdue → Follow Up", trigger: "Invoice Overdue 7 days", action: "Create Task", status: "active" },
  { id: 3, name: "Contract Signed → New Customer", trigger: "Contract Status = Signed", action: "Create Customer", status: "paused" },
  { id: 4, name: "Task Complete → Notify Manager", trigger: "Task Status = Done", action: "Send Notification", status: "active" },
];

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="crm-page-title">Automation</h1>
        <button id="add-rule-btn" className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
          <Zap className="h-4 w-4" /> New Rule
        </button>
      </div>
      <div className="crm-card space-y-3">
        {RULES.map((rule) => (
          <div key={rule.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${rule.status === "active" ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
              <Zap className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">{rule.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">When: {rule.trigger} → {rule.action}</p>
            </div>
            <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${rule.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>
              {rule.status}
            </span>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              {rule.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
