import { FileText, ClipboardList } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const contractsModule: ModuleConfig = {
  id: "contracts",
  name: "Contracts",
  description: "Manage business contracts and types",
  icon: FileText,
  enabled: true,
  navGroups: [
    {
      id: "crm",
      label: "CRM",
      position: 2,
      items: [
        { id: "contracts", title: "Contract", href: "/contracts", icon: FileText, position: 10 },
        { id: "contract-types", title: "Contract Type", href: "/contracts/types", icon: ClipboardList, position: 11 },
      ],
    },
  ],
};
