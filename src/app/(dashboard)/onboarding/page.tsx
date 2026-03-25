import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

const STEPS = [
  { id: 1, title: "Create your account", done: true },
  { id: 2, title: "Set up your company profile", done: true },
  { id: 3, title: "Invite your first team member", done: false },
  { id: 4, title: "Import your contacts", done: false },
  { id: 5, title: "Create your first invoice", done: false },
  { id: 6, title: "Explore the dashboard", done: false },
];

export default function OnboardingPage() {
  const done = STEPS.filter((s) => s.done).length;
  const pct = Math.round((done / STEPS.length) * 100);
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="crm-page-title">Getting Started</h1>
        <p className="text-sm text-muted-foreground mt-1">Complete these steps to get the most from ERP Suite</p>
      </div>
      <div className="crm-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{done}/{STEPS.length} completed</span>
          <span className="text-sm font-bold text-primary">{pct}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-6">
          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="space-y-2">
          {STEPS.map((step) => (
            <div key={step.id} className={`flex items-center gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${step.done ? "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/30 dark:bg-emerald-900/10" : "border-border hover:bg-muted/50"}`}>
              {step.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />}
              <span className={`flex-1 text-sm ${step.done ? "line-through text-muted-foreground" : "font-medium"}`}>{step.title}</span>
              {!step.done && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
