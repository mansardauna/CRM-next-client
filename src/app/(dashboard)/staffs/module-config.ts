import { Users } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const staffsModule: ModuleConfig = {
  id: "staffs",
  name: "Staff",
  description: "Manage your team members",
  icon: Users,
  enabled: true,
  navGroups: [
    {
      id: "workspace",
      label: "WORKSPACE",
      position: 1,
      items: [
        { id: "staffs", title: "Staff", href: "/staffs", icon: Users, position: 3 },
      ],
    },
  ],
};
