"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, UserPlus, MoreHorizontal, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  source: string;
  status: string;
  created_at: string;
}

const DEMO: Lead[] = [
  { id: 1, name: "James Carter", email: "james@venture.io", company: "Venture Labs", source: "Website", status: "New", created_at: "2024-03-01" },
  { id: 2, name: "Sara Patel", email: "sara@blooming.co", company: "Blooming Co", source: "Referral", status: "Contacted", created_at: "2024-03-05" },
  { id: 3, name: "Mike Lee", email: "mlee@techwave.com", company: "TechWave", source: "Paid Search", status: "Qualified", created_at: "2024-03-10" },
  { id: 4, name: "Anna Kim", email: "anna@solaris.dev", company: "Solaris Dev", source: "Email", status: "Lost", created_at: "2024-03-15" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Contacted: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  Qualified: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Lost: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

const leadSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Required"),
  source: z.string().min(1, "Required"),
});
type LeadForm = z.infer<typeof leadSchema>;

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(DEMO);
  const [open, setOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<LeadForm>({ 
    resolver: zodResolver(leadSchema),
    values: editingLead ? { name: editingLead.name, email: editingLead.email, company: editingLead.company, source: editingLead.source } : undefined
  });

  function onSubmit(data: LeadForm) {
    if (editingLead) {
      setLeads((prev) => prev.map((l) => l.id === editingLead.id ? { ...l, ...data } : l));
      setEditingLead(null);
    } else {
      setLeads((prev) => [...prev, { id: Date.now(), ...data, status: "New", created_at: new Date().toISOString() }]);
    }
    reset();
    setOpen(false);
  }

  function deleteLead(id: number) {
    if (confirm("Are you sure you want to delete this lead?")) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  }

  const columns: ColumnDef<Lead, unknown>[] = [
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "company", header: "Company" },
    { accessorKey: "source", header: "Source" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[s] ?? "bg-muted text-muted-foreground"}`}>{s}</span>;
    }},
    { accessorKey: "created_at", header: "Created", cell: ({ getValue }) => formatDate(getValue() as string) },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const lead = row.original;
        return (
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => { setEditingLead(lead); setOpen(true); }}
            >
              <Pencil className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => deleteLead(lead.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="crm-page-title">Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">{leads.length} total leads</p>
        </div>
        <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditingLead(null); }}>
          <SheetTrigger render={<Button id="add-lead-btn" className="gap-2"><Plus className="h-4 w-4" />Add Lead</Button>} />
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                {editingLead ? <Pencil className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
                {editingLead ? "Edit Lead" : "New Lead"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {(["name","email","company","source"] as const).map((field) => (
                <div key={field} className="space-y-1.5">
                  <Label htmlFor={`lead-${field}`} className="capitalize">{field}</Label>
                  <Input id={`lead-${field}`} {...register(field)} className={errors[field] ? "border-destructive" : ""} />
                  {errors[field] && <p className="text-xs text-destructive">{errors[field]?.message}</p>}
                </div>
              ))}
              <Button id="lead-save" type="submit" className="w-full mt-2">Save Lead</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card">
        <DataTable columns={columns} data={leads} searchKey="name" searchPlaceholder="Search leads…" />
      </div>
    </div>
  );
}
