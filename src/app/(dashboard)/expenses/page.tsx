"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, FileText } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Expense { id: number; description: string; category: string; amount: number; date: string; status: string; }

const DEMO: Expense[] = [
  { id: 1, description: "AWS Hosting", category: "Infrastructure", amount: 320, date: "2024-03-01", status: "Approved" },
  { id: 2, description: "Office Supplies", category: "Operations", amount: 85, date: "2024-03-05", status: "Approved" },
  { id: 3, description: "Sales Conference", category: "Travel", amount: 1200, date: "2024-03-10", status: "Pending" },
  { id: 4, description: "Software Subscriptions", category: "Technology", amount: 450, date: "2024-03-15", status: "Approved" },
];

const schema = z.object({ description: z.string().min(1), category: z.string().min(1), amount: z.string().min(1), date: z.string().min(1) });
type FormData = z.infer<typeof schema>;

export default function ExpensesPage() {
  const [items, setItems] = useState<Expense[]>(DEMO);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  function onSubmit(data: FormData) { setItems((p) => [...p, { id: Date.now(), status: "Pending", description: data.description, category: data.category, amount: Number(data.amount), date: data.date }]); reset(); setOpen(false); }
  const total = items.reduce((s, e) => s + e.amount, 0);
  const columns: ColumnDef<Expense, unknown>[] = [
    { accessorKey: "description", header: "Description" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => formatCurrency(getValue() as number) },
    { accessorKey: "date", header: "Date", cell: ({ getValue }) => formatDate(getValue() as string) },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s === "Approved" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{s}</span>;
    }},
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="crm-page-title">Expenses</h1><p className="text-sm text-muted-foreground mt-1">Total: <strong>{formatCurrency(total)}</strong></p></div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button id="add-expense-btn" className="gap-2"><Plus className="h-4 w-4" />Add Expense</Button>} />
          <SheetContent>
            <SheetHeader><SheetTitle className="flex gap-2 items-center"><FileText className="h-5 w-5" />New Expense</SheetTitle></SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {[{k:"description",l:"Description",t:"text"},{k:"category",l:"Category",t:"text"},{k:"amount",l:"Amount",t:"number"},{k:"date",l:"Date",t:"date"}].map(({k,l,t})=>(
                <div key={k} className="space-y-1.5"><Label htmlFor={`exp-${k}`}>{l}</Label><Input id={`exp-${k}`} type={t} {...register(k as keyof FormData)} />{errors[k as keyof FormData]&&<p className="text-xs text-destructive">{errors[k as keyof FormData]?.message}</p>}</div>
              ))}
              <Button id="expense-save" type="submit" className="w-full mt-2">Save Expense</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card"><DataTable columns={columns} data={items} searchKey="description" searchPlaceholder="Search expenses…" /></div>
    </div>
  );
}
