import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown, ChevronRight } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  lastPeriod?: string;
  icon?: LucideIcon;
  iconColor?: string;
  href?: string;
}

export function MetricCard({
  title,
  value,
  change,
  trend = "neutral",
  lastPeriod,
  icon: Icon,
  iconColor = "bg-primary/10 text-primary",
}: MetricCardProps) {
  return (
    <div className="crm-card group hover:shadow-lg transition-all duration-300 border border-transparent hover:border-[#00005C]/10">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 group/title cursor-pointer">
            <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 group-hover/title:text-[#00005C] transition-colors">{title}</p>
            <ChevronRight className="h-3 w-3 text-zinc-300 group-hover/title:text-[#00005C] opacity-0 group-hover:opacity-100 transition-all ml-1" />
          </div>
          <p className="mt-2 text-[28px] font-black text-[#00003C] dark:text-white leading-none tracking-tight">{value}</p>
          
          {(change !== undefined || lastPeriod) && (
            <div className="mt-3 flex items-center gap-2">
              {change !== undefined && (
                <span
                  className={cn(
                    "flex items-center gap-1 text-[10px] font-black rounded-lg px-2 py-0.5",
                    trend === "up"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-600"
                  )}
                >
                  {trend === "up" ? (
                    <TrendingUp className="h-2.5 w-2.5 stroke-[3]" />
                  ) : (
                    <TrendingDown className="h-2.5 w-2.5 stroke-[3]" />
                  )}
                  {change}%
                </span>
              )}
              {lastPeriod && (
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                  vs the last month: <span className="text-zinc-900 dark:text-zinc-300">{lastPeriod}</span>
                </span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn("h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110", iconColor)}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
    </div>
  );
}
