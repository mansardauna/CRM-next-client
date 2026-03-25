import { DollarSign } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const billingModule: ModuleConfig = {
  id: "billing",
  name: "Billing",
  description: "Manage billing and subscriptions",
  icon: DollarSign,
  enabled: true,
  navGroups: [
    {
      id: "finance",
      label: "FINANCE",
      position: 3,
      items: [
        { id: "billing", title: "Billing", href: "/billing", icon: DollarSign, position: 2 },
      ],
    },
  ],
};
