"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navGroups, NavItem } from "@/lib/nav-config";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Search,
  Plus,
  Calendar,
  Bell,
  HelpCircle,
  Sun,
  Grid,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function SidebarItem({
  item,
  level = 0,
  isCollapsed,
}: {
  item: NavItem;
  level?: number;
  isCollapsed?: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const items = item.items || item.subMenu;
  const hasChildren = items && items.length > 0;

  const isActive =
    pathname === item.href ||
    (item.href && item.href !== "/dashboard" && pathname.startsWith(item.href));
  const Icon = item.icon;

  if (hasChildren && !isCollapsed) {
    return (
      <div className="flex flex-col">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
            "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          )}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0 opacity-70" />}
          <span className="flex-1 text-left truncate">
            {item.title || item.label}
          </span>
          {isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 opacity-50" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          )}
        </button>
        {isOpen && (
          <div className="flex flex-col ml-4 mt-1 border-l border-sidebar-border/50 pl-2 gap-1">
            {items.map((child) => (
              <SidebarItem
                key={child.id || child.title}
                item={child}
                level={level + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-[#00003C]  font-medium transition-all duration-150",
        isCollapsed && "justify-center px-0 text-[#00003C]  ",
        isActive
          ? "bg-[#00003C]/10 text-[#00003C] dark:bg-primary/20 dark:text-primary shadow-sm"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
      title={isCollapsed ? item.title || item.label : undefined}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-4 w-4 shrink-0 transition-colors",
            isActive
              ? "text-[#00003C] dark:text-primary"
              : "text-[#00003C]  group-hover:text-sidebar-accent-foreground",
          )}
        />
      )}
      {!isCollapsed && (
        <span className="flex-1 truncate text-[#00003C]/80 ">
          {item.title || item.label}
        </span>
      )}
      {!isCollapsed && isActive && (
        <div className="h-1.5 w-1.5 rounded-full bg-[#00003C] dark:bg-primary" />
      )}
    </Link>
  );
}

export function CrmSidebar({
  isCollapsed,
  onToggle,
}: {
  isCollapsed?: boolean;
  onToggle?: () => void;
}) {
  const [activeAccount, setActiveAccount] = useState("Zarah");

  return (
    <aside
      className={cn(
        "flex h-screen flex-col bg-[#F8F9FD] dark:bg-sidebar border-r shrink-0 transition-all duration-300 relative",
        isCollapsed ? "w-[72px]" : "w-64",
      )}
    >
      {/* Brand & Account Switcher */}
      <div
        className={cn(
          "bg-[#00003C] text-white transition-all",
          isCollapsed ? "px-3 py-4" : "px-0",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 px-6 py-4 border-b border-white/10",
            isCollapsed && "px-0 border-none justify-center",
          )}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#00003C] shadow-sm font-bold text-xl shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          {!isCollapsed && (
            <div className="flex-1 flex items-center justify-between">
              <span className="font-bold text-sm tracking-tight">ZARAH</span>
              <ChevronDown className="h-4 w-4 opacity-70" />
            </div>
          )}
        </div>

        {!isCollapsed && (
          <div className="px-4 py-3 space-y-1">
            {["Zarah", "Tems"].map((acc) => (
              <button
                key={acc}
                onClick={() => setActiveAccount(acc)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors",
                  activeAccount === acc
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                <div
                  className={cn(
                    "h-4 w-4 rounded-full border-2",
                    activeAccount === acc
                      ? "border-white bg-white"
                      : "border-white/20",
                  )}
                />
                {acc}
              </button>
            ))}
            <button className="flex w-full items-center gap-3 px-3 py-2 rounded-lg text-xs font-bold text-white bg-[#00003C]/80 hover:bg-[#00003C] transition-colors mt-2">
              <Plus className="h-4 w-4" />
              Add Business
            </button>
          </div>
        )}
      </div>

      {/* Nav Groups */}
      <ScrollArea className="flex-1 pt-6 pb-4">
        <nav
          className={cn("flex flex-col gap-6", isCollapsed ? "px-2" : "px-4")}
        >
          {navGroups.map((group) => (
            <div key={group.id || group.label} className="space-y-1">
              {!isCollapsed && (
                <p className="px-3 py-2 text-[11px] font-bold text-zinc-800 select-none">
                  {group.label}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <SidebarItem
                    key={item.id || item.title}
                    item={item}
                    isCollapsed={isCollapsed}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Toggle Button - Relocated to Bottom */}
      <button
        onClick={onToggle}
        className="absolute -right-3 bottom-24 flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-sidebar border border-sidebar-border shadow-md transition-transform hover:scale-110 z-50 group"
      >
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-transform",
            !isCollapsed && "rotate-180",
          )}
        />
      </button>

      {/* Profile Footer */}
      <div
        className={cn(
          "border-t border-sidebar-border/10 p-4 transition-all",
          isCollapsed && "p-2 items-center",
        )}
      >
        <div
          className={cn(
            "flex items-center gap-3 cursor-pointer hover:bg-zinc-100 dark:hover:bg-white/5 rounded-xl p-2 transition-colors",
            isCollapsed && "justify-center px-0",
          )}
        >
          <div className="relative shrink-0">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-slate-200 ring-2 ring-white">
              <img
                src="https://ui-avatars.com/api/?name=John+Doe&background=random"
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                  John Doe
                </p>
                <span className="px-1.5 py-0.5 rounded-md bg-[#00003C]/10 text-[#00003C] text-[10px] font-black uppercase tracking-wider">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 truncate">
                johndoe@mail.com
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
