import { UserPlus } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const leadsModule: ModuleConfig = {
  id: "leads",
  name: "Leads",
  description: "Track and manage potential customers",
  icon: UserPlus,
  enabled: true,
  navGroups: [
    {
      id: "crm",
      label: "CRM",
      position: 2,
      items: [
        { id: "leads", title: "Leads", href: "/leads", icon: UserPlus, position: 2 },
      ],
    },
  ],
};
