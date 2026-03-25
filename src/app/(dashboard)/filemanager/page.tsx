import { FolderOpen, File, Image, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

const FILES = [
  { name: "contracts/", type: "folder", size: "", date: "Mar 20, 2024" },
  { name: "invoices/", type: "folder", size: "", date: "Mar 18, 2024" },
  { name: "company-logo.png", type: "image", size: "142 KB", date: "Mar 15, 2024" },
  { name: "Q1-report.pdf", type: "pdf", size: "1.2 MB", date: "Mar 10, 2024" },
  { name: "onboarding-guide.docx", type: "doc", size: "540 KB", date: "Mar 5, 2024" },
  { name: "sales-data.xlsx", type: "doc", size: "88 KB", date: "Feb 28, 2024" },
];

function FileIcon({ type }: { type: string }) {
  if (type === "folder") return <FolderOpen className="h-5 w-5 text-amber-500" />;
  if (type === "image") return <Image className="h-5 w-5 text-blue-500" />;
  if (type === "pdf") return <FileText className="h-5 w-5 text-red-500" />;
  return <File className="h-5 w-5 text-muted-foreground" />;
}

export default function FileManagerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="crm-page-title">File Manager</h1>
        <Button id="upload-file-btn" className="gap-2"><Upload className="h-4 w-4" />Upload File</Button>
      </div>

      <div className="crm-card">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <span className="text-primary font-medium cursor-pointer hover:underline">Root</span>
          <span>/</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {FILES.map((file) => (
            <div key={file.name} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/50 cursor-pointer transition-colors group">
              <FileIcon type={file.type} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{file.name}</p>
                <p className="text-xs text-muted-foreground">{file.size ? `${file.size} · ` : ""}{file.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
