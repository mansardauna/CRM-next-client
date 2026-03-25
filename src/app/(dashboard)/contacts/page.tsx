"use client";

import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Plus, UserCircle, Phone, Mail, Pencil, Trash2 } from "lucide-react";
import { formatDate, getInitials } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Contact {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  company_name: string;
  position: string;
  status: string;
  created_at: string;
}

const DEMO: Contact[] = [
  { id: 1, full_name: "Alice Johnson", email: "alice@acme.com", phone_number: "+1 555-0101", company_name: "Acme Corp", position: "CEO", status: "Active", created_at: "2024-01-15" },
  { id: 2, full_name: "Bob Smith", email: "bob@globex.com", phone_number: "+1 555-0102", company_name: "Globex Inc", position: "CTO", status: "Active", created_at: "2024-02-10" },
  { id: 3, full_name: "Carol White", email: "carol@init.io", phone_number: "+1 555-0103", company_name: "Init.io", position: "COO", status: "Inactive", created_at: "2024-02-20" },
  { id: 4, full_name: "Dave Brown", email: "dave@startup.co", phone_number: "+1 555-0104", company_name: "Startup.co", position: "VP Sales", status: "Active", created_at: "2024-03-05" },
];

const contactSchema = z.object({
  full_name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone_number: z.string().min(7, "Invalid phone"),
  company_name: z.string().min(1, "Required"),
  position: z.string().optional(),
});
type ContactForm = z.infer<typeof contactSchema>;

const AVATAR_COLORS = ["bg-violet-500","bg-emerald-500","bg-blue-500","bg-amber-500","bg-pink-500"];

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(DEMO);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Contact | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactForm>({ 
    resolver: zodResolver(contactSchema),
    values: editingItem ? { full_name: editingItem.full_name, email: editingItem.email, phone_number: editingItem.phone_number, company_name: editingItem.company_name, position: editingItem.position } : undefined
  });

  function onSubmit(data: ContactForm) {
    if (editingItem) {
      setContacts((prev) => prev.map((c) => c.id === editingItem.id ? { ...c, ...data } : c));
      setEditingItem(null);
    } else {
      setContacts((prev) => [...prev, { id: Date.now(), position: data.position ?? "", status: "Active", created_at: new Date().toISOString(), ...data }]);
    }
    reset(); setOpen(false);
  }

  function deleteItem(id: number) {
    if (confirm("Are you sure you want to delete this contact?")) {
      setContacts((prev) => prev.filter((c) => c.id !== id));
    }
  }

  const columns: ColumnDef<Contact, unknown>[] = [
    {
      accessorKey: "full_name",
      header: "Contact",
      cell: ({ row }) => {
        const c = row.original;
        const color = AVATAR_COLORS[c.id % AVATAR_COLORS.length];
        return (
          <div className="flex items-center gap-3">
            <div className={`h-8 w-8 rounded-full ${color} flex items-center justify-center text-xs font-bold text-white shrink-0`}>{getInitials(c.full_name)}</div>
            <div>
              <p className="font-medium text-sm">{c.full_name}</p>
              <p className="text-xs text-muted-foreground">{c.position}</p>
            </div>
          </div>
        );
      },
    },
    { accessorKey: "email", header: "Email", cell: ({ getValue }) => <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-muted-foreground" />{getValue() as string}</span> },
    { accessorKey: "phone_number", header: "Phone", cell: ({ getValue }) => <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-muted-foreground" />{getValue() as string}</span> },
    { accessorKey: "company_name", header: "Company" },
    { accessorKey: "status", header: "Status", cell: ({ getValue }) => {
      const s = getValue() as string;
      return <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${s === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>{s}</span>;
    }},
    { accessorKey: "created_at", header: "Added", cell: ({ getValue }) => formatDate(getValue() as string) },
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
        <div>
          <h1 className="crm-page-title">Contacts</h1>
          <p className="text-sm text-muted-foreground mt-1">{contacts.length} contacts</p>
        </div>
        <Sheet open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditingItem(null); }}>
          <SheetTrigger render={<Button id="add-contact-btn" className="gap-2"><Plus className="h-4 w-4" />Add Contact</Button>} />
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex gap-2 items-center">
                {editingItem ? <Pencil className="h-5 w-5" /> : <UserCircle className="h-5 w-5" />}
                {editingItem ? "Edit Contact" : "New Contact"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
              {[
                { key: "full_name", label: "Full Name" },
                { key: "email", label: "Email" },
                { key: "phone_number", label: "Phone" },
                { key: "company_name", label: "Company" },
                { key: "position", label: "Position (optional)" },
              ].map(({ key, label }) => (
                <div key={key} className="space-y-1.5">
                  <Label htmlFor={`contact-${key}`}>{label}</Label>
                  <Input id={`contact-${key}`} {...register(key as keyof ContactForm)} className={errors[key as keyof ContactForm] ? "border-destructive" : ""} />
                  {errors[key as keyof ContactForm] && <p className="text-xs text-destructive">{errors[key as keyof ContactForm]?.message}</p>}
                </div>
              ))}
              <Button id="contact-save" type="submit" className="w-full mt-2">Save Contact</Button>
            </form>
          </SheetContent>
        </Sheet>
      </div>
      <div className="crm-card">
        <DataTable columns={columns} data={contacts} searchKey="full_name" searchPlaceholder="Search contacts…" />
      </div>
    </div>
  );
}
