"use client";

import { CheckCircle, AlertTriangle, Zap } from "lucide-react";
import { moduleRegistry } from "@/lib/modules/module-registry";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ModulesManagementPage() {
  const [modules, setModules] = useState(() => moduleRegistry.getAllModules());
  const [loading, setLoading] = useState(false);

  const handleToggle = (id: string, currentStatus: boolean) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      moduleRegistry.toggleModule(id, !currentStatus);
      setModules([...moduleRegistry.getAllModules()]);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="crm-page-title">Module Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Enable or disable features for your organization</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
          <Zap className="h-3 w-3" />
          Enterprise Plan
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {modules.map((mod) => (
          <div key={mod.id} className={cn(
            "crm-card flex items-start gap-4 transition-all duration-200",
            !mod.enabled && "opacity-60 bg-muted/20 border-dashed"
          )}>
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center shrink-0",
              mod.enabled ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              <mod.icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-sm truncate">{mod.name}</span>
                <button 
                  onClick={() => handleToggle(mod.id, mod.enabled)}
                  disabled={loading || mod.id === "dashboard"}
                  className={cn(
                    "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none",
                    mod.enabled ? "bg-primary" : "bg-muted-foreground/30",
                    (loading || mod.id === "dashboard") && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <span className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    mod.enabled ? "translate-x-4" : "translate-x-0"
                  )} />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{mod.description}</p>
              <div className="flex items-center gap-1.5 mt-3">
                {mod.enabled ? (
                  <div className="flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                    <CheckCircle className="h-3 w-3" />
                    Active
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] font-medium text-amber-500">
                    <AlertTriangle className="h-3 w-3" />
                    Inactive
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
