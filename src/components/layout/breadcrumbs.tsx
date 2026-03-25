"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/60 mb-6">
      <Link href="/dashboard" className="hover:text-foreground transition-colors">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");

        return (
          <div key={href} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 opacity-40" />
            {isLast ? (
              <span className="text-foreground/80 font-bold">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors uppercase tracking-wider text-[10px]">
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
