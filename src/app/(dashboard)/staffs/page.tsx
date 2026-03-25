"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, Users } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Staff { id: number; name: string; email: string; role: string; department: string; status: string; }

const DEMO: Staff[] = [
  { id: 1, name: "Alice Johnson", email: "alice@company.com", role: "Manager", department: "Sales", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@company.com", role: "Developer", department: "Engineering", status: "Active" },
  { id: 3, name: "Carol White", email: "carol@company.com", role: "Designer", department: "Creative", status: "On Leave" },
  { id: 4, name: "Dave Brown", email: "dave@company.com", role: "Analyst", department: "Finance", status: "Active" },
];
const COLORS = ["bg-violet-500","bg-emerald-500","bg-blue-500","bg-amber-500"];
const schema = z.object({ name: z.string().min(1), email: z.string().email(), role: z.string().min(1), department: z.string().min(1) });
type FormData = z.infer<typeof schema>;

export default function StaffsPage() {
  const [items, setItems] = useState<Staff[]>(DEMO);
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });
  function onSubmit(data: FormData) { setItems((p) => [...p, { id: Date.now(), status: "Active", ...data }]); reset(); setOpen(false); }
  const columns: ColumnDef<Staff, unknown>[] = [
    { accessorKey: "name", header: "Staff Member", cell: ({ row }) => {
      const s = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className={`h-8 w-8 rounded-full ${COLORS[s.id % COLORS.length]} flex items-center justify-center text-xs font-bold text-white`}>{getInitials(s.name)}</div>
          <div><p className="font-medium text-sm">{s.name}</p><p className="text-xs text-muted-foreground">{s.email}</p></div>
        </div>
      );
    }},
    { accessorKey: "role", header: "Role" },
    { accessorKey: "department", header: "Department" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s==="Active"?"bg-emerald-100 text-emerald-700":"bg-amber-100 text-amber-700"}`}>{s}</span>;
    }},
  ];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="crm-page-title">Staff</h1><p className="text-sm text-muted-foreground mt-1">{items.length} members</p></div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger render={<Button id="add-staff-btn" className="gap-2"><Plus className="h-4 w-4"/>Add Staff</Button>} />
          <SheetContent>
            <SheetHeader><SheetTitle className="flex gap-2 items-center"><Users className="h-5 w-5"/>New Staff Member</SheetTitle></SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {[{k:"name",l:"Full Name"},{k:"email",l:"Email"},{k:"role",l:"Role"},{k:"department",l:"Department"}].map(({k,l})=>(
                <div key={k} className="space-y-1.5"><Label htmlFor={`staff-${k}`}>{l}</Label><Input id={`staff-${k}`} {...register(k as keyof FormData)} />{errors[k as keyof FormData]&&<p className="text-xs text-destructive">{errors[k as keyof FormData]?.message}</p>}</div>
              ))}
              <Button id="staff-save" type="submit" className="w-full mt-2">Save</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card"><DataTable columns={columns} data={items} searchKey="name" searchPlaceholder="Search staff…" /></div>
    </div>
  );
}
