import { UserCircle } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const contactsModule: ModuleConfig = {
  id: "contacts",
  name: "Contacts",
  description: "Manage individual contacts",
  icon: UserCircle,
  enabled: true,
  navGroups: [
    {
      id: "crm",
      label: "CRM",
      position: 2,
      items: [
        { id: "contacts", title: "Contacts", href: "/contacts", icon: UserCircle, position: 3 },
      ],
    },
  ],
};
