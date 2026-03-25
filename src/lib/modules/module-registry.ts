import { NavGroup, NavItem } from "../nav-config";

export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  icon: any;
  navGroups: NavGroup[];
  enabled: boolean;
  settings?: any;
}

class ModuleRegistry {
  private modules: Map<string, ModuleConfig> = new Map();

  register(config: ModuleConfig) {
    this.modules.set(config.id, config);
  }

  toggleModule(id: string, enabled: boolean) {
    const mod = this.modules.get(id);
    if (mod) {
      mod.enabled = enabled;
      this.modules.set(id, { ...mod });
    }
  }

  getModule(id: string): ModuleConfig | undefined {
    return this.modules.get(id);
  }

  getAllModules(): ModuleConfig[] {
    return Array.from(this.modules.values());
  }

  getActiveModules(): ModuleConfig[] {
    return this.getAllModules().filter((m) => m.enabled);
  }

  getNavGroups(): NavGroup[] {
    const active = this.getActiveModules();
    const groupMap: Map<string, NavGroup> = new Map();

    active.forEach((mod) => {
      mod.navGroups.forEach((group) => {
        if (!groupMap.has(group.id || group.label)) {
          groupMap.set(group.id || group.label, {
            id: group.id || group.label,
            label: group.label,
            items: [],
            position: group.position || 99,
          });
        }
        const existing = groupMap.get(group.id || group.label)!;
        existing.items.push(...group.items);
      });
    });

    // Sort groups by position
    const sortedGroups = Array.from(groupMap.values()).sort(
      (a, b) => (a.position || 99) - (b.position || 99)
    );

    // Sort items within each group
    sortedGroups.forEach((group) => {
      group.items.sort((a, b) => (a.position || 99) - (b.position || 99));
    });

    return sortedGroups;
  }
}

export const moduleRegistry = new ModuleRegistry();
