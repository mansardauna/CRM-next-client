export default function CalendarPage() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const events: Record<number, string[]> = {
    5: ["Client Call"],
    12: ["Team Standup", "Invoice Review"],
    18: ["Demo Day"],
    24: ["Sprint Planning"],
    28: ["Q1 Debrief"],
  };
  return (
    <div className="space-y-6">
      <h1 className="crm-page-title">Calendar</h1>
      <div className="crm-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold">April 2024</h2>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((d) => (
            <div key={d} className="text-xs font-semibold text-muted-foreground py-1">{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {/* Start offset for April 2024 (Monday = 1) */}
          {Array.from({ length: 1 }, (_, i) => <div key={`empty-${i}`} />)}
          {days.map((day) => (
            <div
              key={day}
              className={`relative aspect-square flex flex-col items-center justify-start pt-1.5 rounded-lg text-sm cursor-pointer transition-colors hover:bg-muted ${events[day] ? "bg-primary/5 border border-primary/20" : ""}`}
            >
              <span className={`h-6 w-6 flex items-center justify-center rounded-full text-xs font-medium ${day === 15 ? "bg-primary text-primary-foreground" : "text-foreground"}`}>{day}</span>
              {events[day] && (
                <div className="mt-0.5 px-1 w-full">
                  {events[day].map((e) => (
                    <div key={e} className="text-[10px] truncate text-primary font-medium leading-3">{e}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
