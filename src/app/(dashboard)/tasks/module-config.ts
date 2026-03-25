import { CheckSquare } from "lucide-react";
import { ModuleConfig } from "@/lib/modules/module-registry";

export const tasksModule: ModuleConfig = {
  id: "tasks",
  name: "Tasks",
  description: "Manage and assign tasks",
  icon: CheckSquare,
  enabled: true,
  navGroups: [
    {
      id: "workspace",
      label: "WORKSPACE",
      position: 1,
      items: [
        { id: "tasks", title: "Tasks", href: "/tasks", icon: CheckSquare, position: 1 },
      ],
    },
  ],
};
