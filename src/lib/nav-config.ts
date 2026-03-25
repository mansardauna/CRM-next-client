import { moduleRegistry } from "./modules/module-registry";
import { registerAllModules } from "./modules/register-all";

// Initialize registry
registerAllModules();

export interface NavItem {
  id: string;
  title: string;
  label?: string; // Some legacy items use label
  href?: string;
  icon?: any;
  position?: number;
  items?: NavItem[]; // Nested children
  subMenu?: NavItem[]; // Legacy subMenu support
  parentId?: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
  position?: number;
}

// Generate navGroups from registry
export const navGroups: NavGroup[] = moduleRegistry.getNavGroups();
