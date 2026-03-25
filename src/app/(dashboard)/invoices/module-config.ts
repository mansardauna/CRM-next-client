import { Receipt } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const invoicesModule: ModuleConfig = {
  id: "invoices",
  name: "Invoices",
  description: "Manage and generate invoices",
  icon: Receipt,
  enabled: true,
  navGroups: [
    {
      id: "finance",
      label: "FINANCE",
      position: 3,
      items: [
        { id: "invoices", title: "Invoices", href: "/invoices", icon: Receipt, position: 1 },
      ],
    },
  ],
};
