import { Package } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const saasModule: ModuleConfig = {
  id: "saas",
  name: "SaaS Management",
  description: "Manage tenants and system modules",
  icon: Package,
  enabled: true,
  navGroups: [
    {
      id: "setup",
      label: "Setup",
      position: 100,
      items: [
        {
          id: "saas-mgmt",
          title: "SaaS Management",
          icon: Package,
          position: 1,
          subMenu: [
            { id: "tenants", title: "Tenants", href: "/saas", position: 1 },
            { id: "packages", title: "Packages", href: "#", position: 2 },
            { id: "affiliate", title: "Affiliate", href: "#", position: 3 },
            { id: "discounts", title: "Discounts", href: "#", position: 4 },
          ],
        },
      ],
    },
  ],
};
