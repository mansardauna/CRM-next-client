import { LayoutDashboard } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const dashboardModule: ModuleConfig = {
  id: "dashboard",
  name: "Dashboard",
  description: "Analytics and overview metrics",
  icon: LayoutDashboard,
  enabled: true,
  navGroups: [
    {
      id: "main",
      label: "MAIN",
      position: 0,
      items: [
        { id: "dashboard", title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, position: 1 },
      ],
    },
    {
      id: "report-and-data",
      label: "REPORT AND DATA",
      position: 4,
      items: [
        { id: "rd-dashboard", title: "Dashboard", href: "/dashboard", position: 1 },
      ],
    },
  ],
};
