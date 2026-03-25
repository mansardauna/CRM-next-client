"use client";

import { Bell, Search, Moon, Sun, Plus, CheckSquare, Calendar, HelpCircle, Grid, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function CrmHeader() {
  const [dark, setDark] = useState(false);

  function toggleDark() {
    setDark((d) => {
      document.documentElement.classList.toggle("dark", !d);
      return !d;
    });
  }

  return (
    <header className="flex h-16 shrink-0 items-center bg-white dark:bg-card px-8 gap-6 border-b border-border/10">
      
      {/* Search & Quick Action */}
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <Input
            id="global-search"
            placeholder="Search Project, Tasks, etc..."
            className="pl-10 h-10 text-sm bg-muted/30 border-border/40 focus-visible:ring-zarah-primary-blue rounded-xl"
          />
        </div>
        <Button size="icon" className="h-10 w-10 rounded-xl bg-[#00003C] hover:bg-[#00002C] shadow-lg shadow-blue-900/10">
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1.5 text-muted-foreground/80">
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted/50">
          <CheckSquare className="h-4.5 w-4.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted/50">
          <Calendar className="h-4.5 w-4.5" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted/50">
          <HelpCircle className="h-4.5 w-4.5" />
        </Button>
        
        <div className="w-px h-4 bg-border/20 mx-1" />

        <Button variant="ghost" size="icon" onClick={toggleDark} className="h-9 w-9 rounded-lg hover:bg-muted/50">
          {dark ? <Sun className="h-4.5 w-4.5 text-amber-500" /> : <Moon className="h-4.5 w-4.5" />}
        </Button>
        
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted/50">
          <Grid className="h-4.5 w-4.5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-muted/50 relative">
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-red-500 border border-white" />
        </Button>
      </div>
    </header>
  );
}
