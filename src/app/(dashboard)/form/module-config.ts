import { PenTool } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const formModule: ModuleConfig = {
  id: "form",
  name: "Page Builder",
  description: "Build and share custom pages/forms",
  icon: PenTool,
  enabled: true,
  navGroups: [
    {
      id: "crm",
      label: "CRM",
      position: 2,
      items: [
        { id: "page-builder", title: "Page Builder", href: "/form", icon: PenTool, position: 20 },
      ],
    },
  ],
};
