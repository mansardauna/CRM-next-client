import { Settings } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const settingsModule: ModuleConfig = {
  id: "settings",
  name: "Settings",
  description: "Configure system settings",
  icon: Settings,
  enabled: true,
  navGroups: [
    {
      id: "setup",
      label: "Setup",
      position: 100,
      items: [
        { id: "settings", title: "Settings", href: "/settings", icon: Settings, position: 2 },
      ],
    },
  ],
};
