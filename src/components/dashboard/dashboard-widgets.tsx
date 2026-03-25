"use client";

import { ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export function CalendarWidget() {
  return (
    <div className="crm-card">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-bold text-[#00003C]">November 2024</p>
        <div className="flex items-center gap-1">
          <button className="p-1 hover:bg-zinc-100 rounded-md transition-colors"><ChevronLeft className="h-4 w-4 text-zinc-400" /></button>
          <button className="p-1 hover:bg-zinc-100 rounded-md transition-colors"><ChevronRight className="h-4 w-4 text-zinc-400" /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <span key={d} className="text-[10px] font-bold text-zinc-400 py-1">{d}</span>
        ))}
        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
          <div 
            key={d} 
            className={cn(
              "text-xs font-bold py-2 rounded-lg cursor-pointer transition-all hover:bg-zinc-100",
              d === 8 ? "bg-[#00003C] text-white shadow-lg shadow-[#00003C]/20" : "text-zinc-600",
              [2, 9, 16, 23, 30].includes(d) && "bg-slate-50 text-slate-400"
            )}
          >
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TasksWidget() {
  const tasks = [
    { id: 1, title: "Create a new pipeline", time: "Thu, 07 Nov 11:00 AM", done: true },
    { id: 2, title: "Renew contract with material supplier", time: "Fri, 08 Nov 10:00 AM", done: true },
    { id: 3, title: "Rebrand business identity", time: "Sat, 09 Nov 11:00 AM", done: false },
    { id: 4, title: "Send out bulk SMS", time: "Sun, 10 Nov 02:00 PM", done: false },
    { id: 5, title: "Renew contract with material supplier", time: "Mon, 12 Nov 11:00 AM", done: false },
  ];

  return (
    <div className="crm-card">
      <h2 className="text-sm font-bold text-[#00003C] mb-6">Tasks</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3 group cursor-pointer">
            <div className="mt-0.5">
              {task.done ? (
                <CheckCircle2 className="h-5 w-5 text-[#00003C]" />
              ) : (
                <Circle className="h-5 w-5 text-zinc-300 group-hover:text-zinc-400 transition-colors" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className={cn("text-xs font-bold truncate", task.done ? "text-zinc-400" : "text-zinc-700")}>{task.title}</p>
              <p className="text-[10px] text-zinc-400 mt-1">{task.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
