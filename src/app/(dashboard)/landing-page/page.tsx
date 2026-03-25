"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ExternalLink, Globe, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface LandingPage { id: string; name: string; status: string; updated: string; }

const DEMO_PAGES: LandingPage[] = [
  { id: "home-2024", name: "Home Page", status: "Published", updated: "Mar 20, 2024" },
  { id: "product-launch", name: "Product Launch", status: "Draft", updated: "Mar 22, 2024" },
  { id: "promo-spring", name: "Spring Promo", status: "Draft", updated: "Mar 24, 2024" },
];

export default function LandingPageModule() {
  const [pages, setPages] = useState<LandingPage[]>(DEMO_PAGES);
  const [newName, setNewName] = useState("");

  function createPage() {
    if (!newName.trim()) return;
    const id = newName.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setPages((p) => [...p, { id, name: newName, status: "Draft", updated: "Just now" }]);
    setNewName("");
  }

  function deletePage(id: string) {
    setPages((p) => p.filter((pg) => pg.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="crm-page-title">Landing Pages</h1>
          <p className="text-sm text-muted-foreground mt-1">{pages.length} pages</p>
        </div>
      </div>

      {/* Create new */}
      <div className="crm-card">
        <h2 className="text-sm font-semibold mb-4">Create New Page</h2>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="page-name" className="sr-only">Page name</Label>
            <Input
              id="page-name"
              placeholder="Enter page name…"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createPage()}
            />
          </div>
          <Button id="create-page-btn" onClick={createPage} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" /> Create Page
          </Button>
        </div>
      </div>

      {/* Pages list */}
      <div className="crm-card">
        <h2 className="text-sm font-semibold mb-4">All Pages</h2>
        <div className="space-y-2">
          {pages.map((page) => (
            <div key={page.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Globe className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground">{page.name}</p>
                <p className="text-xs text-muted-foreground">Updated {page.updated}</p>
              </div>
              <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${page.status === "Published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                {page.status}
              </span>
              <div className="flex gap-1">
                <Link href={`/landing-page/builder?id=${page.id}`}>
                  <Button variant="outline" size="icon" className="h-8 w-8" title="Open Builder">
                    <Pencil className="h-3.5 w-3.5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => deletePage(page.id)} title="Delete">
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
