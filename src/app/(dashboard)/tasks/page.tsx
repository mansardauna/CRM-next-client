"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, CheckSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Task { id: number; title: string; assignee: string; priority: string; status: string; due_date: string; }

const DEMO: Task[] = [
  { id: 1, title: "Prepare Q2 Report", assignee: "Alice", priority: "High", status: "In Progress", due_date: "2024-04-15" },
  { id: 2, title: "Client Follow-up Call", assignee: "Bob", priority: "Medium", status: "Todo", due_date: "2024-04-10" },
  { id: 3, title: "Update CRM Fields", assignee: "Carol", priority: "Low", status: "Done", due_date: "2024-04-05" },
  { id: 4, title: "Invoice Review", assignee: "Dave", priority: "High", status: "Todo", due_date: "2024-04-20" },
];

const priorityColors: Record<string, string> = { High: "bg-red-100 text-red-700", Medium: "bg-amber-100 text-amber-700", Low: "bg-blue-100 text-blue-700" };
const statusColors: Record<string, string> = { "In Progress": "bg-violet-100 text-violet-700", "Todo": "bg-muted text-muted-foreground", "Done": "bg-emerald-100 text-emerald-700" };

const schema = z.object({ title: z.string().min(1), assignee: z.string().min(1), priority: z.string().min(1), due_date: z.string().min(1) });
type FormData = z.infer<typeof schema>;

export default function TasksPage() {
  const [items, setItems] = useState<Task[]>(DEMO);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  function onSubmit(data: FormData) { setItems((p) => [...p, { id: Date.now(), status: "Todo", ...data }]); reset(); setOpen(false); }
  const columns: ColumnDef<Task, unknown>[] = [
    { accessorKey: "title", header: "Task" },
    { accessorKey: "assignee", header: "Assignee" },
    { accessorKey: "priority", header: "Priority", cell: ({ getValue }) => { const s = getValue() as string; return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[s]}`}>{s}</span>; } },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => { const s = getValue() as string; return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[s]}`}>{s}</span>; } },
    { accessorKey: "due_date", header: "Due", cell: ({ getValue }) => formatDate(getValue() as string) },
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="crm-page-title">Tasks</h1><p className="text-sm text-muted-foreground mt-1">{items.filter(t=>t.status!=="Done").length} open · {items.filter(t=>t.status==="Done").length} done</p></div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button id="add-task-btn" className="gap-2"><Plus className="h-4 w-4" />Add Task</Button>} />
          <SheetContent>
            <SheetHeader><SheetTitle className="flex gap-2 items-center"><CheckSquare className="h-5 w-5" />New Task</SheetTitle></SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {[{k:"title",l:"Title",t:"text"},{k:"assignee",l:"Assignee",t:"text"},{k:"priority",l:"Priority (High/Medium/Low)",t:"text"},{k:"due_date",l:"Due Date",t:"date"}].map(({k,l,t})=>(
                <div key={k} className="space-y-1.5"><Label htmlFor={`task-${k}`}>{l}</Label><Input id={`task-${k}`} type={t} {...register(k as keyof FormData)} />{errors[k as keyof FormData]&&<p className="text-xs text-destructive">{errors[k as keyof FormData]?.message}</p>}</div>
              ))}
              <Button id="task-save" type="submit" className="w-full mt-2">Save Task</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card"><DataTable columns={columns} data={items} searchKey="title" searchPlaceholder="Search tasks…" /></div>
    </div>
  );
}
