import { moduleRegistry } from "./module-registry";
import { dashboardModule } from "@/app/(dashboard)/dashboard/module-config";
import { customersModule } from "@/app/(dashboard)/customers/module-config";
import { leadsModule } from "@/app/(dashboard)/leads/module-config";
import { invoicesModule } from "@/app/(dashboard)/invoices/module-config";
import { formModule } from "@/app/(dashboard)/form/module-config";

import { contactsModule } from "@/app/(dashboard)/contacts/module-config";
import { billingModule } from "@/app/(dashboard)/billing/module-config";
import { tasksModule } from "@/app/(dashboard)/tasks/module-config";
import { settingsModule } from "@/app/(dashboard)/settings/module-config";
import { staffsModule } from "@/app/(dashboard)/staffs/module-config";
import { saasModule } from "@/app/(dashboard)/saas/module-config";
import { contractsModule } from "@/app/(dashboard)/contracts/module-config";

export function registerAllModules() {
  moduleRegistry.register(dashboardModule);
  moduleRegistry.register(customersModule);
  moduleRegistry.register(leadsModule);
  moduleRegistry.register(invoicesModule);
  moduleRegistry.register(formModule);
  moduleRegistry.register(contactsModule);
  moduleRegistry.register(billingModule);
  moduleRegistry.register(tasksModule);
  moduleRegistry.register(settingsModule);
  moduleRegistry.register(staffsModule);
  moduleRegistry.register(saasModule);
  moduleRegistry.register(contractsModule);
  
  // More modules will be registered here
}
