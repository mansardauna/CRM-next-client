"use client";

export default function BillingPage() {
  const plans = [
    { name: "Free", price: "$0", features: ["Up to 5 users", "Basic CRM", "Email support"], current: false },
    { name: "Pro", price: "$49/mo", features: ["Unlimited users", "Full CRM suite", "Priority support", "API access"], current: true },
    { name: "Enterprise", price: "Custom", features: ["Custom deployment", "SLA guarantee", "Dedicated support", "SSO"], current: false },
  ];
  return (
    <div className="space-y-6">
      <h1 className="crm-page-title">Billing</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div key={plan.name} className={`crm-card flex flex-col gap-4 ${plan.current ? "ring-2 ring-primary" : ""}`}>
            {plan.current && <span className="self-start inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground">Current Plan</span>}
            <div>
              <p className="text-lg font-bold">{plan.name}</p>
              <p className="text-3xl font-bold mt-1">{plan.price}</p>
            </div>
            <ul className="space-y-1.5 flex-1">
              {plan.features.map((f) => <li key={f} className="text-sm text-muted-foreground flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{f}</li>)}
            </ul>
            <button id={`billing-${plan.name.toLowerCase()}-btn`} className={`w-full rounded-lg py-2 text-sm font-medium transition-colors ${plan.current ? "bg-primary/10 text-primary cursor-default" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}>
              {plan.current ? "Active" : "Upgrade"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
