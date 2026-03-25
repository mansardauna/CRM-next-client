"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Building2, Pencil, Trash2 } from "lucide-react";
import { formatDate, getInitials } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Customer {
  id: number;
  company_name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  created_at: string;
}

const DEMO: Customer[] = [
  { id: 1, company_name: "Acme Corp", email: "billing@acme.com", phone: "+1 555-0201", source: "Referral", status: "Active", created_at: "2023-11-01" },
  { id: 2, company_name: "Globex Inc", email: "accounts@globex.com", phone: "+1 555-0202", source: "Paid Search", status: "Active", created_at: "2023-12-15" },
  { id: 3, company_name: "Initech", email: "info@initech.com", phone: "+1 555-0203", source: "Website", status: "Inactive", created_at: "2024-01-20" },
  { id: 4, company_name: "Umbrella Ltd", email: "corp@umbrella.io", phone: "+1 555-0204", source: "Email", status: "Active", created_at: "2024-02-28" },
];

const schema = z.object({
  company_name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Invalid phone"),
  source: z.string().min(1, "Required"),
});
type FormData = z.infer<typeof schema>;
const COLORS = ["bg-violet-500","bg-emerald-500","bg-blue-500","bg-amber-500","bg-pink-500"];

export default function CustomersPage() {
  const [items, setItems] = useState<Customer[]>(DEMO);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Customer | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    values: editingItem ? { company_name: editingItem.company_name, email: editingItem.email, phone: editingItem.phone, source: editingItem.source } : undefined
  });

  function onSubmit(data: FormData) {
    if (editingItem) {
      setItems((prev) => prev.map((i) => i.id === editingItem.id ? { ...i, ...data } : i));
      setEditingItem(null);
    } else {
      setItems((p) => [...p, { id: Date.now(), status: "Active", created_at: new Date().toISOString(), ...data }]);
    }
    reset(); setOpen(false);
  }

  function deleteItem(id: number) {
    if (confirm("Are you sure you want to delete this customer?")) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  }

  const columns: ColumnDef<Customer, unknown>[] = [
    {
      accessorKey: "company_name", header: "Company",
      cell: ({ row }) => {
        const c = row.original;
        return (
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-lg ${COLORS[c.id % COLORS.length]} flex items-center justify-center text-xs font-bold text-white`}>{getInitials(c.company_name)}</div>
            <span className="font-medium text-sm">{c.company_name}</span>
          </div>
        );
      }
    },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "source", header: "Source" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>{s}</span>;
    }},
    { accessorKey: "created_at", header: "Since", cell: ({ getValue }) => formatDate(getValue() as string) },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setEditingItem(item); setOpen(true); }}><Pencil className="h-4 w-4 text-muted-foreground" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={() => deleteItem(item.id)}><Trash2 className="h-4 w-4" /></Button>
          </div>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="crm-page-title">Customers</h1><p className="text-sm text-muted-foreground mt-1">{items.length} accounts</p></div>
        <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditingItem(null); }}>
          <SheetTrigger render={<Button id="add-customer-btn" className="gap-2"><Plus className="h-4 w-4" />Add Customer</Button>} />
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                {editingItem ? <Pencil className="h-5 w-5" /> : <Building2 className="h-5 w-5" />}
                {editingItem ? "Edit Customer" : "New Customer"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {[{ k: "company_name", l: "Company Name" }, { k: "email", l: "Email" }, { k: "phone", l: "Phone" }, { k: "source", l: "Source" }].map(({ k, l }) => (
                <div key={k} className="space-y-1.5">
                  <Label htmlFor={`cust-${k}`}>{l}</Label>
                  <Input id={`cust-${k}`} {...register(k as keyof FormData)} className={errors[k as keyof FormData] ? "border-destructive" : ""} />
                  {errors[k as keyof FormData] && <p className="text-xs text-destructive">{errors[k as keyof FormData]?.message}</p>}
                </div>
              ))}
              <Button id="customer-save" type="submit" className="w-full mt-2">Save Customer</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card"><DataTable columns={columns} data={items} searchKey="company_name" searchPlaceholder="Search customers…" /></div>
    </div>
  );
}
