"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Shield, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Role { id: number; name: string; description: string; users: number; permissions: string; }
const DEMO: Role[] = [
  { id: 1, name: "Admin", description: "Full system access", users: 2, permissions: "All" },
  { id: 2, name: "Manager", description: "CRM & reports access", users: 5, permissions: "CRM, Finance, Reports" },
  { id: 3, name: "Sales Rep", description: "Leads and contacts only", users: 12, permissions: "Leads, Contacts" },
  { id: 4, name: "Viewer", description: "Read-only access", users: 8, permissions: "Read Only" },
];
const columns: ColumnDef<Role, unknown>[] = [
  { accessorKey: "name", header: "Role", cell: ({ getValue }) => (
    <span className="flex items-center gap-2 font-medium"><Shield className="h-4 w-4 text-primary" />{getValue() as string}</span>
  )},
  { accessorKey: "description", header: "Description" },
  { accessorKey: "users", header: "Users" },
  { accessorKey: "permissions", header: "Permissions" },
];
export default function RolesPage() {
  const [items] = useState<Role[]>(DEMO);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="crm-page-title">Roles & Permissions</h1><p className="text-sm text-muted-foreground mt-1">{items.length} roles defined</p></div>
        <Button id="add-role-btn" className="gap-2"><Plus className="h-4 w-4" />Add Role</Button>
      </div>
      <div className="crm-card"><DataTable columns={columns} data={items} searchKey="name" searchPlaceholder="Search roles…" /></div>
    </div>
  );
}
