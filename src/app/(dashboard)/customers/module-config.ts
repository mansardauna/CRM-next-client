import { Users } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const customersModule: ModuleConfig = {
  id: "customers",
  name: "Customers",
  description: "Manage your customer accounts",
  icon: Users,
  enabled: true,
  navGroups: [
    {
      id: "crm",
      label: "CRM",
      position: 2,
      items: [
        { id: "customers", title: "Customers", href: "/customers", icon: Users, position: 1 },
      ],
    },
  ],
};
