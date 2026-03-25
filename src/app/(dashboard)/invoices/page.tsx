"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Receipt, Download, FileText, Settings as UISettings, Check, Copy, Trash2 } from "lucide-react";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Invoice {
  id: number;
  invoice_number: string;
  client: string;
  amount: number;
  due_date: string;
  status: string;
  issued_at: string;
}

interface InvoiceTemplate { id: string; name: string; primaryColor: string; showLogo: boolean; footerText: string; }

const DEMO_TEMPLATES: InvoiceTemplate[] = [
  { id: "t1", name: "Modern Blue", primaryColor: "oklch(0.42 0.18 264)", showLogo: true, footerText: "Thank you for your business!" },
  { id: "t2", name: "Classic Gray", primaryColor: "oklch(0.45 0.05 264)", showLogo: false, footerText: "Payment due within 30 days." },
];

const DEMO: Invoice[] = [
  { id: 1, invoice_number: "INV-001", client: "Acme Corp", amount: 4800, due_date: "2024-02-15", status: "Paid", issued_at: "2024-01-15" },
  { id: 2, invoice_number: "INV-002", client: "Globex Inc", amount: 3200, due_date: "2024-03-01", status: "Pending", issued_at: "2024-02-01" },
  { id: 3, invoice_number: "INV-003", client: "Initech", amount: 1500, due_date: "2024-02-20", status: "Overdue", issued_at: "2024-01-20" },
  { id: 4, invoice_number: "INV-004", client: "Umbrella Ltd", amount: 6000, due_date: "2024-04-30", status: "Paid", issued_at: "2024-03-30" },
];

const statusColors: Record<string, string> = {
  Paid: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Overdue: "bg-red-100 text-red-600",
  Draft: "bg-muted text-muted-foreground",
};

const schema = z.object({
  client: z.string().min(1, "Required"),
  amount: z.string().min(1, "Required"),
  due_date: z.string().min(1, "Required"),
});
type FormData = z.infer<typeof schema>;

export default function InvoicesPage() {
  const [activeTab, setActiveTab] = useState<"invoices" | "templates">("invoices");
  const [items, setItems] = useState<Invoice[]>(DEMO);
  const [templates, setTemplates] = useState<InvoiceTemplate[]>(DEMO_TEMPLATES);
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("t1");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  function onSubmit(data: FormData) {
    const num = `INV-${String(items.length + 1).padStart(3, "0")}`;
    setItems((p) => [...p, { id: Date.now(), invoice_number: num, status: "Draft", issued_at: new Date().toISOString(), client: data.client, amount: Number(data.amount), due_date: data.due_date }]);
    reset(); setOpen(false);
  }

  const total = items.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const outstanding = items.filter((i) => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);

  const columns: ColumnDef<Invoice, unknown>[] = [
    { accessorKey: "invoice_number", header: "Invoice #" },
    { accessorKey: "client", header: "Client" },
    { accessorKey: "amount", header: "Amount", cell: ({ getValue }) => formatCurrency(getValue() as number) },
    { accessorKey: "due_date", header: "Due Date", cell: ({ getValue }) => formatDate(getValue() as string) },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[s] ?? "bg-muted text-muted-foreground"}`}>{s}</span>;
    }},
    {
      id: "actions",
      header: "Actions",
      cell: () => (
        <Button variant="ghost" size="icon" className="h-8 w-8" title="Download PDF">
          <Download className="h-4 w-4 text-muted-foreground" />
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="crm-page-title">Invoices</h1>
          <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
            <span>Collected: <strong className="text-emerald-600">{formatCurrency(total)}</strong></span>
            <span>Outstanding: <strong className="text-amber-600">{formatCurrency(outstanding)}</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === "invoices" ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger render={<Button id="add-invoice-btn" className="gap-2"><Plus className="h-4 w-4" />New Invoice</Button>} />
              <SheetContent>
                <SheetHeader><SheetTitle className="flex gap-2 items-center"><Receipt className="h-5 w-5" />New Invoice</SheetTitle></SheetHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                  <div className="space-y-1.5">
                    <Label>Template</Label>
                    <select 
                      className="w-full rounded-lg border border-input px-3 py-2 text-sm bg-background"
                      value={selectedTemplate}
                      onChange={(e) => setSelectedTemplate(e.target.value)}
                    >
                      {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                  </div>
                  {[{ k: "client", l: "Client", t: "text" }, { k: "amount", l: "Amount ($)", t: "number" }, { k: "due_date", l: "Due Date", t: "date" }].map(({ k, l, t }) => (
                    <div key={k} className="space-y-1.5">
                      <Label htmlFor={`inv-${k}`}>{l}</Label>
                      <Input id={`inv-${k}`} type={t} {...register(k as keyof FormData)} className={errors[k as keyof FormData] ? "border-destructive" : ""} />
                      {errors[k as keyof FormData] && <p className="text-xs text-destructive">{errors[k as keyof FormData]?.message}</p>}
                    </div>
                  ))}
                  <Button id="invoice-save" type="submit" className="w-full mt-2">Create Invoice</Button>
                </form>
              </SheetContent>
            </Sheet>
          ) : (
            <Button className="gap-2"><Plus className="h-4 w-4" />New Template</Button>
          )}
        </div>
      </div>

      <div className="flex gap-1 p-1 bg-muted/30 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab("invoices")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            activeTab === "invoices" ? "bg-background shadow-sm" : "hover:bg-background/50 text-muted-foreground"
          )}
        >
          All Invoices
        </button>
        <button
          onClick={() => setActiveTab("templates")}
          className={cn(
            "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
            activeTab === "templates" ? "bg-background shadow-sm" : "hover:bg-background/50 text-muted-foreground"
          )}
        >
          Templates
        </button>
      </div>

      {activeTab === "invoices" ? (
        <div className="crm-card"><DataTable columns={columns} data={items} searchKey="client" searchPlaceholder="Search invoices…" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="crm-card group relative overflow-hidden flex flex-col gap-4">
              <div 
                className="absolute top-0 left-0 w-full h-1" 
                style={{ backgroundColor: template.primaryColor }}
              />
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{template.name}</h3>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><UISettings className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </div>
              <div className="aspect-[3/4] rounded-lg border border-border bg-muted/20 p-4 flex flex-col gap-2">
                <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
                <div className="h-8 w-1/4 bg-muted/50 rounded ml-auto" />
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-full bg-muted/30 rounded" />
                  <div className="h-2 w-full bg-muted/30 rounded" />
                  <div className="h-2 w-2/3 bg-muted/30 rounded" />
                </div>
                <div className="mt-auto pt-4 border-t border-border/50">
                  <p className="text-[10px] text-muted-foreground italic text-center">{template.footerText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
