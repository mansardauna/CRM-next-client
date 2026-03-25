"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Briefcase } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Contract {
  id: number;
  title: string;
  client: string;
  amount: number;
  status: string;
  start_date: string;
  end_date: string;
}

const DEMO: Contract[] = [
  { id: 1, title: "Annual SaaS License", client: "Acme Corp", amount: 48000, status: "Active", start_date: "2024-01-01", end_date: "2024-12-31" },
  { id: 2, title: "Consulting Retainer", client: "Globex Inc", amount: 12000, status: "Active", start_date: "2024-02-01", end_date: "2024-07-31" },
  { id: 3, title: "Dev Services Q1", client: "Init.io", amount: 9500, status: "Completed", start_date: "2024-01-01", end_date: "2024-03-31" },
  { id: 4, title: "Support Contract", client: "Umbrella Ltd", amount: 6000, status: "Pending", start_date: "2024-04-01", end_date: "2025-03-31" },
];

const statusColors: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700",
  Completed: "bg-blue-100 text-blue-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-600",
};

const schema = z.object({
  title: z.string().min(1, "Required"),
  client: z.string().min(1, "Required"),
  amount: z.string().min(1, "Required"),
  start_date: z.string().min(1, "Required"),
  end_date: z.string().min(1, "Required"),
});
type FormData = z.infer<typeof schema>;

export default function ContractsPage() {
  const [items, setItems] = useState<Contract[]>(DEMO);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  function onSubmit(data: FormData) {
    setItems((p) => [...p, { id: Date.now(), status: "Pending", title: data.title, client: data.client, amount: Number(data.amount), start_date: data.start_date, end_date: data.end_date }]);
    reset(); setOpen(false);
  }

  const totalValue = items.reduce((s, c) => s + c.amount, 0);

  const columns: ColumnDef<Contract, unknown>[] = [
    { accessorKey: "title", header: "Contract" },
    { accessorKey: "client", header: "Client" },
    { accessorKey: "amount", header: "Value", cell: ({ getValue }) => formatCurrency(getValue() as number) },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[s] ?? "bg-muted text-muted-foreground"}`}>{s}</span>;
    }},
    { accessorKey: "start_date", header: "Start", cell: ({ getValue }) => formatDate(getValue() as string) },
    { accessorKey: "end_date", header: "End", cell: ({ getValue }) => formatDate(getValue() as string) },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="crm-page-title">Contracts</h1>
          <p className="text-sm text-muted-foreground mt-1">{items.length} contracts · Total: {formatCurrency(totalValue)}</p>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button id="add-contract-btn" className="gap-2"><Plus className="h-4 w-4" />New Contract</Button>} />
          <SheetContent>
            <SheetHeader><SheetTitle className="flex gap-2 items-center"><Briefcase className="h-5 w-5" />New Contract</SheetTitle></SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {[{ k: "title", l: "Title", t: "text" }, { k: "client", l: "Client", t: "text" }, { k: "amount", l: "Amount ($)", t: "number" }, { k: "start_date", l: "Start Date", t: "date" }, { k: "end_date", l: "End Date", t: "date" }].map(({ k, l, t }) => (
                <div key={k} className="space-y-1.5">
                  <Label htmlFor={`contract-${k}`}>{l}</Label>
                  <Input id={`contract-${k}`} type={t} {...register(k as keyof FormData)} className={errors[k as keyof FormData] ? "border-destructive" : ""} />
                  {errors[k as keyof FormData] && <p className="text-xs text-destructive">{errors[k as keyof FormData]?.message}</p>}
                </div>
              ))}
              <Button id="contract-save" type="submit" className="w-full mt-2">Save Contract</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card"><DataTable columns={columns} data={items} searchKey="title" searchPlaceholder="Search contracts…" /></div>
    </div>
  );
}
