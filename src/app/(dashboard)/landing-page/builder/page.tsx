"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function GrapesBuilder() {
  const editorRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const pageId = searchParams.get("id") ?? "new-page";

  useEffect(() => {
    if (!editorRef.current) return;

    // Dynamically load GrapesJS and plugins to avoid SSR issues
    const loadGrapes = async () => {
      const [grapesjs, blocksBasic, tailwind] = await Promise.all([
        import("grapesjs"),
        import("grapesjs-blocks-basic"),
        import("grapesjs-tailwind"),
      ]);

      // Destroy any existing instance
      const existing = (window as unknown as { grapesEditor?: { destroy: () => void } }).grapesEditor;
      if (existing) existing.destroy();

      const editor = grapesjs.default.init({
        container: editorRef.current!,
        height: "calc(100vh - 64px)",
        width: "100%",
        storageManager: false,
        plugins: [blocksBasic.default, tailwind.default],
        pluginsOpts: {
          [blocksBasic.default]: {
            blocks: ["column1", "column2", "column3", "text", "link", "image", "video"],
          },
          [tailwind.default]: { blockCategory: "Tailwind" },
        },
        canvas: { allowScripts: true },
      });

      // Save command
      editor.Commands.add("save-page", {
        run: async () => {
          const data = {
            id: pageId,
            content: editor.getHtml(),
            css: editor.getCss({ avoidProtected: true }),
          };
          console.log("Saving page:", data);
          // TODO: POST to /api/landing-pages/save
          alert("Page saved (connect to backend API to persist)!");
        },
      });

      // Add save button to panel
      editor.Panels.addButton("options", {
        id: "save-btn",
        className: "fa fa-save",
        command: "save-page",
        attributes: { title: "Save Page" },
      });

      // Load saved content from localStorage for demo
      const saved = localStorage.getItem(`grapes-page-${pageId}`);
      if (saved) {
        try {
          const { html, css } = JSON.parse(saved);
          editor.setComponents(html);
          editor.setStyle(css);
        } catch {/* ignore */}
      }

      // Auto-save to localStorage on change
      editor.on("update", () => {
        localStorage.setItem(
          `grapes-page-${pageId}`,
          JSON.stringify({ html: editor.getHtml(), css: editor.getCss({ avoidProtected: true }) })
        );
      });

      (window as unknown as Record<string, unknown>).grapesEditor = editor;
    };

    loadGrapes();

    return () => {
      const existing = (window as unknown as { grapesEditor?: { destroy: () => void } }).grapesEditor;
      if (existing) { existing.destroy(); }
    };
  }, [pageId]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <a href="/landing-page" className="text-sm text-muted-foreground hover:text-foreground transition-colors">← Back</a>
          <span className="text-sm font-medium text-foreground">Editing: {pageId}</span>
        </div>
        <p className="text-xs text-muted-foreground">GrapesJS Page Builder — changes auto-saved locally</p>
      </div>
      <div ref={editorRef} id="gjs" className="flex-1" />
    </div>
  );
}

export default function BuilderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted-foreground">Loading builder…</div>}>
      <GrapesBuilder />
    </Suspense>
  );
}
